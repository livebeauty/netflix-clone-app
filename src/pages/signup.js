"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";


const SignUpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  useEffect(() => {
    const emailFromQuery = searchParams.get("email");
    if (emailFromQuery) setEmail(emailFromQuery);
  }, [searchParams]);

  const handleSignUp = async () => {
    if (email.trim() !== "" && password.trim() !== "") {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User created:", userCredential.user);
        router.push("/browse");
      } catch (error) {
        console.error("Error creating user:", error.message);
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      {/* Navbar */}
      <div className="w-full flex justify-between px-10 py-4">
        <Image src="/Netflix.svg" alt="Netflix Logo" width={150} height={150} />
        <button
          className="text-black font-semibold underline"
          onClick={() => router.push("/login")}
        >
          Sign In
        </button>
      </div>

      {/* Form Section */}
      <div className="max-w-lg w-full p-6 border rounded shadow-md text-center">
        <h2 className="text-lg font-medium text-gray-600">STEP 1 OF 3</h2>
        <h1 className="text-3xl font-bold mt-2">Welcome back!</h1>
        <p className="text-gray-500 mt-1">Rejoining Netflix is easy.</p>

        <p className="text-left font-medium mt-5">Email</p>
        <input
          type="email"
          className="w-full border p-3 mt-2 rounded bg-gray-100 text-black"
          value={email}
          disabled
        />

        <p className="text-left font-medium mt-5">Enter your password</p>
        <input
          type="password"
          className="w-full border p-3 mt-2 rounded bg-gray-100 text-black"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 mt-2">{error}</p>}

        <button
          onClick={handleSignUp}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded mt-6 font-bold text-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
