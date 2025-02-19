"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import SubscribeButton from "@/components/SubscribeButton";

import db from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export const plans = [
  {
    link: process.env.NEXT_PUBLIC_BASIC_PLAN_LINK || "",
    name: "Basic",
    quality: "480p",
    priceId: process.env.NEXT_PUBLIC_BASIC_PRICE_ID || "",
    price: 7.99,
  },
  {
    link: process.env.NEXT_PUBLIC_STANDARD_PLAN_LINK || "",
    name: "Standard",
    quality: "1080p",
    priceId: process.env.NEXT_PUBLIC_STANDARD_PRICE_ID || "",
    price: 17.99,
  },
  {
    link: process.env.NEXT_PUBLIC_PREMIUM_PLAN_LINK || "",
    name: "Premium",
    quality: "4K + HDR",
    priceId: process.env.NEXT_PUBLIC_PREMIUM_PRICE_ID || "",
    price: 24.99,
  },
];

export default function Profile() {
  const { user, logout } = useAuth();
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      const fetchPlan = async () => {
        try {
          const userRef = doc(db, "users", user.email);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const priceId = userSnap.data().plan || null;
            const matchedPlan = plans.find((plan) => plan.priceId === priceId);
            setCurrentPlan(matchedPlan ? matchedPlan.name : null);
          }
        } catch (error) {
          console.error("Error fetching plan:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPlan();
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Navbar */}
      <nav className="w-full bg-black border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/">
            <Image
              src="/netflix logo.png"
              alt="Netflix"
              width={120}
              height={40}
              className="cursor-pointer"
            />
          </Link>
          <Link href="/profile">
            <Image
              src="/avatar1.png"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-lg cursor-pointer"
            />
          </Link>
        </div>
      </nav>

      {/* Profile Section */}
      <div className="max-w-3xl mx-auto mt-10">
        <h1 className="text-5xl font-semibold">Edit Profile</h1>
        <hr className="w-20 h-1 bg-red-600 my-4" />

        <div className="bg-[#222] p-6 rounded-lg">
          {/* User Info */}
          <div className="flex items-center space-x-6">
            <Image
              src="/avatar1.png"
              alt="Profile"
              width={80}
              height={80}
              className="rounded-md"
            />
            <input
              type="email"
              value={user?.email || "Loading..."}
              readOnly
              className="bg-gray-700 text-white px-4 py-2 rounded-md w-full cursor-not-allowed"
            />
          </div>

          {/* Current Plan */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Current Plan</h2>
            <p className="text-gray-400 mb-4">
              {loading ? (
                "Loading..."
              ) : currentPlan ? (
                <span className="font-bold">{` ${currentPlan} plan.`}</span>
              ) : (
                "No active subscription."
              )}
            </p>

            {/* Subscription Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div key={plan.name} className="p-4 bg-gray-800 rounded-lg">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="text-gray-400">{plan.quality}</p>
                  <p className="text-white font-bold">${plan.price}/month</p>
                  <SubscribeButton priceId={plan.priceId} currentPlan={currentPlan} />
                </div>
              ))}
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="mt-6">
            <button
              onClick={logout}
              className="w-full bg-red-600 px-4 py-3 rounded-md text-lg font-semibold hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
