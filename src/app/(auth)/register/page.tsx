"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validator";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { userStore } from "@/lib/store";

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = userStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        data,
        { withCredentials: true }
      );

      // Try to set user immediately from response
      const immediateUser = response?.data?.user?.data ?? response?.data?.user;
      if (immediateUser) {
        setUser(immediateUser);
      } else {
        // Fallback to /api/me to hydrate user
        try {
          const me = await axios.get(`/api/me`, { validateStatus: () => true });
          if (me.status === 200 && me.data?.user) {
            const payload = me.data.user?.data ?? me.data.user;
            setUser(payload);
          }
        } catch {}
      }

      toast.success("Registered successfully!");
      router.push("/");
    } catch (error: any) {
      console.error(error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex  justify-center px-4 py-10 md:py-14">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-neutral-600 hover:text-black "
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to home
        </Link>

        <Card className="mt-4 rounded-3xl shadow-lg border border-black/10">
          <CardHeader>
            <CardTitle className="text-2xl font-extrabold text-center">
              Create Your Account 🚀
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {/* Name */}
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-neutral-700"
              >
                Full Name
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
                  <User className="h-4 w-4" />
                </span>
                <Input
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  className="pl-9 focus-visible:ring-0 focus:ring-0"
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}

              {/* Email */}
              <label
                htmlFor="email"
                className="mt-2 mb-1 block text-sm font-medium text-neutral-700"
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
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full bg-black mt-2 text-white my-6 hover:bg-black/90 rounded-lg cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
              <p className="text-center text-sm text-neutral-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-black font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
