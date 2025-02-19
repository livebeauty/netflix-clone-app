"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const stripePromise = loadStripe(process.env.stripe_public_key);

export default function SubscribeButton({ priceId, currentPlan }) {
  const { user:session } = useAuth();

  // console.log(session);
  

  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to initialize");
  
      const { data } = await axios.post("/api/create-checkout-session", { 
        priceId ,
        email:session.email
      });
  
      if (!data.sessionId) throw new Error("Failed to get session ID");
  
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      console.error("Error creating checkout session:", error.message || error);
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <button
      onClick={handleSubscribe}
      disabled={currentPlan === priceId || loading}
      className="bg-red-600 px-4 py-2 rounded-md text-white disabled:opacity-50"
    >
      {currentPlan === priceId ? "Current Package" : loading ? "Processing..." : "Subscribe"}
    </button>
  );
}
