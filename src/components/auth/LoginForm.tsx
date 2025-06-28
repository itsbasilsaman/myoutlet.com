"use client";

import type React from "react";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/useDispatch";
import { signinAdminAction } from "@/store/actions/auth/signinAdminAction";
import Cookies from "js-cookie";
import { setToken } from "@/store/slices/adminSlice";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await dispatch(signinAdminAction({ email, password }));

    console.log(response, "after sigin");

    if (response.meta.requestStatus === "fulfilled") {
      Cookies.set("accessToken", response.payload.access_token);
      dispatch(setToken(response.payload.access_token));
      router.replace("/admin");
    } else {
      console.error("Login failed");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="max-w-md w-full">
          <h1 className="text-[#393636] text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
            Welcome back!
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email/Username Field */}
            <div className="relative">
              <input
                type="text"
                placeholder="Email or Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-[#d8d8d8] focus:outline-none focus:ring-2 focus:ring-[#ff0000]/20 text-sm md:text-base placeholder-[#696868]"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-full border border-[#d8d8d8] focus:outline-none focus:ring-2 focus:ring-[#ff0000]/20 text-sm md:text-base placeholder-[#696868]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[#696868] hover:text-[#393636] transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full bg-[#fe0000] text-white font-medium hover:bg-[#ff0000]/90 transition-colors text-sm md:text-base disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Login now"
              )}
            </button>
            <div className="text-center text-sm mt-4">
              Don't have a account?{" "}
              <button
                type="button"
                onClick={() => router.push("/auth/signup")}
                className="text-[#fe0000] hover:underline font-medium"
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
