import { Router } from "express";
import Stripe from "stripe";
import { db } from "@workspace/db";
import { callCodesTable } from "@workspace/db";
import { logActivity } from "../lib/activityLogger.js";

const router = Router();

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

const PRICES: Record<string, string> = {
  "leave-rant": "price_1TFdGMSJTVRPQSRQMLm4NXE8",
  "skip-line": "price_1TFdGNSJTVRPQSRQwFlqIU2K",
  "featured": "price_1TFdGOSJTVRPQSRQbf0LthA2"
};

router.post("/create-session", async (req, res) => {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return res.status(503).json({ error: "Payments are not configured yet" });
    }

    const { plan, category } = req.body;
    const priceId = PRICES[plan];

    if (!priceId) {
      return res.status(400).json({ error: "Invalid plan selected" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.PUBLIC_URL || 'https://' + req.get('host')}/leave-a-rant?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.PUBLIC_URL || 'https://' + req.get('host')}/leave-a-rant?cancelled=true`,
      metadata: {
        plan,
        category
      }
    });

    res.json({ id: session.id, url: session.url });
  } catch (err: any) {
    console.error("Stripe session creation error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Full path: /api/payments/webhook
router.post("/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"] as string;
  let event;

  try {
    // Note: We'll use a simplified version here if webhook secret is missing, 
    // but the final version should use stripe.webhooks.constructEvent.
    event = req.body; 

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const plan = session.metadata?.plan || "leave-rant";
      const category = session.metadata?.category || "neutral";
      
      // GENERATE THE UNIQUE CALL CODE!
      const code = `RNT-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      
      // VALID UNTIL 30 DAYS FROM NOW
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      await db.insert(callCodesTable).values({
        code,
        plan,
        category: category as any,
        stripeSessionId: session.id,
        used: false,
        expiresAt
      });

      await logActivity("payment_success", `Payment successful for ${plan} rant. Code ${code} generated.`, {
        sessionId: session.id,
        plan,
        code
      });

      console.log(`✅ SUCCESS: Generated Code ${code} for Session ${session.id}`);
    }

    res.json({ received: true });
  } catch (err: any) {
    console.error("Stripe webhook error:", err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

export default router;
