import { Router } from "express";
import Stripe from "stripe";
import { db } from "@workspace/db";
import { callersTable, callCodesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { generateCallCode } from "../lib/callCodeGenerator.js";
import { logActivity } from "../lib/activityLogger.js";

const router = Router();

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY not set");
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

const PRODUCTS = {
  "leave-rant": { name: "Leave a Rant", amount: 299, description: "Leave your rant on America's Rant Line" },
  "skip-line":  { name: "Skip the Line", amount: 999, description: "Jump to the front of the queue" },
  "featured":   { name: "Featured Rant", amount: 1999, description: "Get your rant featured on the homepage" },
} as const;

type ProductKey = keyof typeof PRODUCTS;

router.post("/payments/create-session", async (req, res) => {
  try {
    const stripe = getStripe();
    const { product, category, successUrl, cancelUrl } = req.body as {
      product: ProductKey;
      category?: string;
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
      metadata: { product, category: category ?? "" },
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
    const product = session.metadata?.product ?? "leave-rant";
    const category = session.metadata?.category;

    let callerId: string | undefined;

    if (phone) {
      const existing = await db.select().from(callersTable).where(eq(callersTable.phone, phone)).limit(1);
      if (existing.length > 0) {
        callerId = existing[0].id;
        if (email) await db.update(callersTable).set({ email }).where(eq(callersTable.phone, phone));
      } else {
        const [newCaller] = await db.insert(callersTable).values({ phone, email }).returning({ id: callersTable.id });
        callerId = newCaller.id;
      }
    } else if (email) {
      const existing = await db.select().from(callersTable).where(eq(callersTable.email, email)).limit(1);
      if (existing.length > 0) {
        callerId = existing[0].id;
      } else {
        const [newCaller] = await db.insert(callersTable).values({ email }).returning({ id: callersTable.id });
        callerId = newCaller.id;
      }
    }

    let code = generateCallCode();
    let attempts = 0;
    while (attempts < 5) {
      const existing = await db.select().from(callCodesTable).where(eq(callCodesTable.code, code)).limit(1);
      if (existing.length === 0) break;
      code = generateCallCode();
      attempts++;
    }

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await db.insert(callCodesTable).values({
      code,
      plan: product,
      category: category || undefined,
      callerId,
      stripeSessionId: session.id,
      expiresAt,
    });

    const PRICES: Record<string, number> = { "leave-rant": 2.99, "skip-line": 9.99, "featured": 19.99 };
    await logActivity("payment_received", `Payment $${PRICES[product] ?? 0} received for ${product}`, {
      sessionId: session.id,
      product,
      amount: PRICES[product] ?? 0,
      callCode: code,
      callerPhone: phone,
    });
  }

  res.json({ received: true });
});

export default router;
