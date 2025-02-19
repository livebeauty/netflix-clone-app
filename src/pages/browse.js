"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import HomeScreen from "@/components/HomeScreen";

export default function Browse() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Auth user:", user); 
    if (user === undefined) return; 
    if (!user) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  if (loading) return null;

  return <HomeScreen />;
}
