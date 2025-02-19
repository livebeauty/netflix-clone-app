import { buffer } from "micro";
import * as admin from "firebase-admin";
import Stripe from "stripe";

const serviceAccount = require("../../../permissions.json");

// Secure a connection to FIREBASE from the backend
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

  console.log(app);
  

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-11-20",
});
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

// Fulfill Order Function
const fulfillOrder = async (session) => {
  console.log("Fulfilling order:", session);

  if (!session.metadata || !session.metadata.email || !session.metadata.plan) {
    console.error("Missing metadata in session:", session.metadata);
    throw new Error("Missing metadata");
  }

  try {
    await app
      .firestore()
      .collection("users")
      .doc(session.metadata.email)
      .set(
        {
          plan: session.metadata.plan,
          price: session.amount_total ? session.amount_total / 100 : 0,
          subscriptionId: session.id,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    console.log("Order successfully fulfilled in Firestore.");
  } catch (error) {
    console.error("Error fulfilling order:", error);
    throw new Error("Firestore error");
  }
};

// Webhook Handler
const webhookHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const requestBuffer = await buffer(req);
  const payload = requestBuffer.toString();
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.error(`Error constructing event: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      await fulfillOrder(session);
      return res.status(200).json({ received: true });
    } catch (err) {
      console.error("Webhook handling error:", err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }
  }

  res.status(200).json({ received: true });
};

export default webhookHandler;

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};