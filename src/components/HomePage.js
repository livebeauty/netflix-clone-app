"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleGetStarted = () => {
    if (email.trim() !== "") {
      router.push(`/signup?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-opacity-50"
        style={{
          backgroundImage:
            "url('https://assets.nflxext.com/ffe/siteui/vlv3/757ab38f-5d08-40bc-b3eb-eaba63ed8203/93c34f94-56c8-40a7-8b2e-b4aac6427977/GB-en-20210125-popsignuptwoweeks-perspective_alpha_website_medium.jpg')",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Navbar */}
      <div className="relative z-10 flex justify-between items-center px-10 py-5">
        <Image src="/Netflix.svg" alt="logo" width={150} height={150} />
        <button
          onClick={() => router.push("/login")}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold border-none 
          cursor-pointer px-4 py-1.5 rounded"
        >
          Sign In
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center text-center text-white mt-40 px-5">
        <h1 className="text-6xl md:text-6xl font-extrabold">
          Unlimited movies,<br /> TV shows, and more
        </h1>
        <p className="text-xl font-medium mt-2">Starts at ₹199. Cancel anytime.</p>
        <p className="mt-4">
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        {/* Email Input Section */}
        <div className="mt-4 flex flex-col md:flex-row gap-3">
          <input
            type="email"
            placeholder="Email address"
            className="px-4 py-3 w-80 rounded border-white border-2 bg-black opacity-55 text-white focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleGetStarted}
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded text-lg font-bold"
          >
            Get Started &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
