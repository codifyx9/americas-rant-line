import { Router } from "express";
import Stripe from "stripe";
import { db } from "@workspace/db";
import { callersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY not set");
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

const PRODUCTS = {
  "leave-rant": { name: "Leave a Rant", amount: 299, description: "Leave your rant on America's Rant Line" },
  "skip-line":  { name: "Skip the Line", amount: 500, description: "Jump to the front of the queue" },
  "featured":   { name: "Featured Rant", amount: 2500, description: "Get your rant featured on the homepage" },
} as const;

type ProductKey = keyof typeof PRODUCTS;

router.post("/payments/create-session", async (req, res) => {
  try {
    const stripe = getStripe();
    const { product, successUrl, cancelUrl } = req.body as {
      product: ProductKey;
      successUrl?: string;
      cancelUrl?: string;
    };

    const p = PRODUCTS[product];
    if (!p) {
      res.status(400).json({ error: "Invalid product. Choose: leave-rant, skip-line, featured" });
      return;
    }

    const origin = req.headers.origin ?? "https://americasrantline.com";
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price_data: { currency: "usd", product_data: { name: p.name, description: p.description }, unit_amount: p.amount }, quantity: 1 }],
      mode: "payment",
      customer_creation: "always",
      customer_email: undefined,
      billing_address_collection: "auto",
      success_url: successUrl ?? `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl ?? `${origin}/`,
      metadata: { product },
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (err: any) {
    console.error("Stripe session error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/payments/webhook", async (req, res) => {
  const stripe = getStripe();
  const sig = req.headers["stripe-signature"] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;
  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(req.body as Buffer, sig, webhookSecret);
    } else {
      event = req.body as Stripe.Event;
    }
  } catch (err: any) {
    console.error("Stripe webhook signature error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email ?? session.customer_email;
    const phone = session.customer_details?.phone;

    if (email && phone) {
      const existing = await db.select().from(callersTable).where(eq(callersTable.phone, phone)).limit(1);
      if (existing.length > 0) {
        await db.update(callersTable).set({ email }).where(eq(callersTable.phone, phone));
      } else {
        await db.insert(callersTable).values({ phone, email });
      }
    } else if (email) {
      const existing = await db.select().from(callersTable).where(eq(callersTable.email, email)).limit(1);
      if (existing.length === 0) {
        await db.insert(callersTable).values({ email });
      }
    }
  }

  res.json({ received: true });
});

export default router;
