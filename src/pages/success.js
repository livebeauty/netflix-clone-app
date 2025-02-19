"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const planName = searchParams.get("plan") || "Unknown Plan";
  const amount = searchParams.get("amount") || "0.00";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center">
      <h1 className="text-4xl font-bold text-red-600">Subscription Successful!</h1>
      <p className="mt-4 text-lg">Thank you for subscribing to the <span className="font-semibold">{planName}</span> plan.</p>
      <p className="mt-2">You have been charged <span className="font-semibold">${amount}</span>.</p>

      <Image
        src="/netflix logo.png" 
        alt="Success" 
        width={120}
        height={40}
        className="w-96 mt-6 rounded-lg shadow-lg"
      />

      <Link href="/" className="mt-6 bg-red-600 px-6 py-2 rounded-md text-white text-lg hover:bg-red-500 transition">
        Go to Home
      </Link>
    </div>
  );
}
