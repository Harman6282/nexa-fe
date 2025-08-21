"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validator";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

type LoginFormData = z.infer<typeof loginSchema>;

export default function page() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        data,
        { withCredentials: true }
      );
      console.log(response.data);
      router.push("/");
      toast.success("Logged in successfully!");
    } catch (error: any) {
      console.error(error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center px-4 py-10 md:py-14">
      <div className="w-full max-w-md ">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-neutral-600 hover:text-black"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to home
        </Link>

        <Card className="mt-4 rounded-3xl shadow-lg border border-black/10">
          <CardHeader>
            <CardTitle className="text-2xl font-extrabold text-center">
              Welcome Back 👋
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {/* Email */}
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-neutral-700"
              >
                Email
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
                  <Mail className="h-4 w-4" />
                </span>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="pl-9 focus-visible:ring-0 focus:ring-0"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}

              {/* Password */}
              <label
                htmlFor="password"
                className="mt-2 mb-1 block text-sm font-medium text-neutral-700"
              >
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
                  <Lock className="h-4 w-4" />
                </span>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="pl-9 pr-10 focus-visible:ring-0 focus:ring-0"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-black"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}

              <div className="flex items-center justify-between text-sm mt-5">
                <label className="inline-flex items-center gap-2 select-none">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-300"
                  />
                  Remember me
                </label>
                <Link href="#" className="text-neutral-700 hover:text-black">
                  Forgot password?
                </Link>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full bg-black mt-2 my-6 text-white hover:bg-black/90 rounded-lg cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
              <p className="text-center text-sm text-neutral-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-black font-semibold hover:underline"
                >
                  Register
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
