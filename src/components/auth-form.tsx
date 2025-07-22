"use client";

import React, { useState } from "react";
import Link from "next/link";
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

interface AuthFormProps {
  type: "login" | "register";
}

export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [loading, setLoading] = useState(false);

  const isLogin = type === "login";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock API delay
    setTimeout(() => {
      setLoading(false);
      alert(`${isLogin ? "Logged in" : "Registered"} successfully!`);
    redirect("/")

    }, 1000);

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {isLogin ? "Welcome Back 👋" : "Create Your Account 🚀"}
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {!isLogin && (
              <Input
                type="text"
                placeholder="Full Name"
                required
                className="focus-visible:ring-black"
              />
            )}
            <Input
              type="email"
              placeholder="Email"
              required
              className="focus-visible:ring-black"
            />
            <Input
              type="password"
              placeholder="Password"
              required
              className="focus-visible:ring-black"
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full mt-4 bg-black text-white hover:bg-gray-800"
              disabled={loading}
            >
              {loading
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
