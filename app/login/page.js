"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../lib/firebase";
import { FcGoogle } from "react-icons/fc";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaCalendarAlt,
} from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/calendar");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/calendar");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20241126/pngtree-vintage-floral-textured-background-design-image_16637552.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>

      <div className="relative z-10 bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/50">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
        <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-purple-100 rounded-full opacity-50 blur-xl"></div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FaCalendarAlt className="text-2xl text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {isLogin ? "Welcome Back" : "Join Us"}
          </h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? "Sign in to your account" : "Create your account today"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-100 rounded-lg p-1 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
              ) : (
                <FaEye className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {isLogin ? "Signing in..." : "Creating account..."}
              </>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm font-medium">
            OR
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3.5 rounded-xl hover:bg-gray-50/80 transition-all duration-200 font-medium text-gray-700 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <FcGoogle className="text-2xl" />
          <span>Continue with Google</span>
        </button>

        {/* Toggle between Login/Signup */}
        <div className="text-center mt-6 pt-4 border-t border-gray-100">
          <p className="text-gray-600 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              disabled={isLoading}
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed underline hover:no-underline"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        {/* Additional decorative elements */}
        <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-yellow-200 rounded-full opacity-30"></div>
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-pink-200 rounded-full opacity-30"></div>
      </div>

      {/* Floating particles for extra visual interest */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-300 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-purple-300 rounded-full opacity-40 animate-pulse delay-75"></div>
      <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-pink-300 rounded-full opacity-30 animate-pulse delay-150"></div>
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-green-300 rounded-full opacity-40 animate-pulse delay-100"></div>
    </main>
  );
}
