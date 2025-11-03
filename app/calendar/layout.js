"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Navbar from "../../components/Navbar"; 

export default function CalendarLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
      else setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-700">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
    
      <Navbar />

     
      <main className="flex-grow">{children}</main>
    </div>
  );
}
