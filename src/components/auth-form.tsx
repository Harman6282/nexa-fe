"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { loginSchema, registerSchema } from "@/lib/validator";
import axios from "axios";

interface AuthFormProps {
  type: "login" | "register";
}

export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const isLogin = type === "login";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/${isLogin ? "login" : "register"}`, data,{
      withCredentials: true,
    });
    console.log(response.data);
    alert(`${isLogin ? "Logged in" : "Registered"} successfully!`);
    redirect("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {isLogin ? "Welcome Back 👋" : "Create Your Account 🚀"}
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* Full Name (only for register) */}
            {!isLogin && (
              <div>
                <Input
                  type="text"
                  placeholder="Full Name"
                  {...register("email")}
                  className="focus-visible:ring-black"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message?.toString()}
                  </p>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="focus-visible:ring-black"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message?.toString()}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="focus-visible:ring-black"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message?.toString()}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full mt-4 bg-black text-white hover:bg-gray-800"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? isLogin
                  ? "Logging in..."
                  : "Registering..."
                : isLogin
                ? "Login"
                : "Register"}
            </Button>
            <p className="text-center text-sm text-gray-600">
              {isLogin ? (
                <>
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-black font-medium hover:underline"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-black font-medium hover:underline"
                  >
                    Login
                  </Link>
                </>
              )}
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
