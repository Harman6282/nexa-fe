"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp.trim()) {
      toast.info("Please enter the otp");
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

      if (response.data.success === false)
        throw new Error("Verification failed");
      console.log(response);

      toast.success("email verified successfuly");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Invalid otp");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      <Card className="w-full max-w-md border-slate-700 bg-slate-900 shadow-2xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Verify Email
          </CardTitle>
          <CardDescription className="text-slate-400">
            Enter the verification code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                disabled={loading}
                maxLength={6}
                className="border-slate-600 bg-slate-800 text-center text-2xl tracking-[0.5em] font-semibold text-white placeholder-slate-500 focus:border-slate-400 focus:ring-slate-400"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-700 text-white hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 font-semibold py-2 transition-colors"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
