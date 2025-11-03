"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { FiLogOut, FiUser } from "react-icons/fi";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    return () => {
      unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-pink-600 to-rose-600 shadow-xl"
          : "bg-gradient-to-r from-pink-500 to-rose-500"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link href="/calendar" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center overflow-hidden">
              <img
                src="https://img.favpng.com/4/9/13/google-calendar-mobile-app-app-store-ios-png-favpng-44giKFf40Lfzsk4nWxxir6mXw.jpg"
                alt="Calendar Logo"
                className="w-8 h-8 object-cover rounded-lg"
              />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              SmartCalendar
            </span>
          </Link>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* User Badge */}
                <div className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-xl transition-all duration-200 shadow-lg">
                  <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                    <FiUser className="text-blue-950" />
                  </div>
                  <span className="hidden text-blue-950 sm:block max-w-[120px] truncate font-medium">
                    {user.displayName || "User"}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-xl transition-all duration-200 shadow-lg"
                >
                  <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                    <FiLogOut className="text-blue-950" />
                  </div>
                  <span className="hidden text-blue-950 sm:block font-medium">
                    Logout
                  </span>
                </button>
              </>
            ) : (
              <>
                {/* Sign In */}
                <Link
                  href="/login"
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-xl transition-all duration-200 shadow-lg"
                >
                  <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                    <FiUser className="text-blue-950" />
                  </div>
                  <span className="hidden text-blue-950 sm:block font-medium">
                    Sign In
                  </span>
                </Link>

                {/* Register */}
                <Link
                  href="/register"
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-xl transition-all duration-200 shadow-lg"
                >
                  <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                    <FiUser className="text-blue-950" />
                  </div>
                  <span className="hidden text-blue-950 sm:block font-medium">
                    Register
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
