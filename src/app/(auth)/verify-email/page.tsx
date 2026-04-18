"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { ArrowLeft, MailCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp.trim()) {
      toast.info("Please enter the OTP");
      return;
    }

    setLoading(true);

    const data = {
      email,
      token: otp,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`,
        data,
        { withCredentials: true }
      );

      if (response.data.success === false) {
        throw new Error("Verification failed");
      }

      toast.success("Email verified successfully");
      router.push("/");
    } catch (_error) {
      toast.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 md:py-14">
      <div className="mx-auto w-full max-w-md">
        <Link
          href="/login"
          className="inline-flex items-center text-sm text-neutral-600 hover:text-black"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to login
        </Link>

        <Card className="mt-4 rounded-3xl border border-black/10 shadow-lg">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto grid size-12 place-items-center rounded-full bg-black text-white">
              <MailCheck className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-extrabold text-black">
              Verify Email
            </CardTitle>
            <CardDescription className="text-neutral-600">
              Enter the 6-digit code sent to
              <span className="ml-1 font-semibold text-neutral-900">
                {email || "your email"}
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleVerify} className="space-y-5">
              <Input
                type="text"
                inputMode="numeric"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                disabled={loading}
                maxLength={6}
                className="h-12 border-neutral-300 bg-white text-center text-2xl font-semibold tracking-[0.45em] text-black placeholder:text-neutral-400 focus-visible:ring-0"
              />

              <Button
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-lg bg-black text-white hover:bg-black/90"
              >
                {loading ? "Verifying..." : "Verify Email"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
