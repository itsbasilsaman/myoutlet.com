"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { registerAdminAction } from "@/store/actions/auth/registerAdminAction";
import { useAppDispatch } from "@/hooks/useDispatch";

export default function RegisterForm() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await dispatch(registerAdminAction({email, password}));

      console.log(response,"response")

      setSuccess(true);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      router.replace('/auth/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <h1 className="text-[#393636] text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
          Create an Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded text-sm">
              Registered successfully! You can now log in.
            </div>
          )}

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-full border border-[#d8d8d8] focus:outline-none focus:ring-2 focus:ring-[#ff0000]/20 text-sm md:text-base placeholder-[#696868]"
              required
            />
          </div>

          {/* Password */}
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

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-full border border-[#d8d8d8] focus:outline-none focus:ring-2 focus:ring-[#ff0000]/20 text-sm md:text-base placeholder-[#696868]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-full bg-[#fe0000] text-white font-medium hover:bg-[#ff0000]/90 transition-colors text-sm md:text-base disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Registering...
              </div>
            ) : (
              "Register"
            )}
          </button>

          <div className="text-center text-sm mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/auth/login")}
              className="text-[#fe0000] hover:underline font-medium"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
