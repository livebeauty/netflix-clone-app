"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import HomePage from "@/components/HomePage";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { login, logout } from "@/features/userSlice";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  // Memoized dispatch function to prevent unnecessary re-renders
  const handleAuthStateChange = useCallback(
    (userAuth) => {
      if (userAuth) {
        console.log("User is signed in", userAuth);
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        console.log("User is signed out");
        dispatch(logout());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChange);
    return () => unsubscribe();
  }, [handleAuthStateChange]);

  useEffect(() => {
    if (user) {
      router.push("/browse");
    }
  }, [user, router]);

  if (user) return null;

  return <HomePage />;
}
