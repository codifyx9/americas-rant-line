import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

async function setupStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("❌ ERROR: STRIPE_SECRET_KEY is missing from environment secrets!");
    return;
  }

  console.log("🚀 Starting Stripe Setup for America's Rant Line...");

  const products = [
    {
      name: "Leave a Rant",
      description: "Basic recording session on the Rant Line",
      price: 299, // $2.99
      id: "leave-rant"
    },
    {
      name: "Skip the Line",
      description: "Get your rant approved and posted faster",
      price: 1299, // $12.99
      id: "skip-line"
    },
    {
      name: "Featured Rant",
      description: "Top of the feed placement + longer recording time",
      price: 3999, // $39.99
      id: "featured"
    }
  ];

  for (const p of products) {
    try {
      console.log(`📦 Creating Product: ${p.name}...`);
      const product = await stripe.products.create({
        name: p.name,
        description: p.description,
        metadata: { plan_key: p.id }
      });

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: p.price,
        currency: "usd",
        metadata: { plan_key: p.id }
      });

      console.log(`✅ Success! Product: ${p.id} | Price ID: ${price.id}`);
    } catch (err: any) {
      console.error(`❌ Failed to create ${p.id}:`, err.message);
    }
  }

  console.log("\n✨ Stripe Setup Complete! Copy the Price IDs above to use in your frontend.");
}

setupStripe();
