"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      router.push(user ? "/calendar" : "/login");
    }
  }, [user, loading, router]);

  return (
    <main className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-extrabold text-white tracking-wide animate-pulse text-center drop-shadow-lg">
        Loading<span className="text-blue-300">...</span>
      </h1>
    </main>
  );
}
