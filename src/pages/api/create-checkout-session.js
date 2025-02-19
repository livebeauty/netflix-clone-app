import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { priceId,email  } = req.body;

    console.log(req.body);
    
    if (!priceId) {
      return res.status(400).json({ error: "Price ID is required" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.HOST}`,
      cancel_url: `${process.env.HOST}/profile`,
      metadata: {
        email: email,
        plan: priceId, 
      },
    });
    

    return res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe Checkout Session Error:", error.message, error);
    return res.status(500).json({ error: error.message });
  }
}
