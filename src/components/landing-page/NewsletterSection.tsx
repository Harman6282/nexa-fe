"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto text-center bg-background-light">
      <div className="bg-white p-12 rounded-lg shadow-sm relative overflow-hidden">
        <div className="absolute -top-10 -left-10 size-40 bg-accent/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -right-10 size-40 bg-accent/10 rounded-full blur-2xl" />
        <div className="relative z-10">
          <div className="size-16 mx-auto bg-text-main rounded-lg flex items-center justify-center text-white mb-6 shadow-lg">
            <Mail className="text-3xl" />
          </div>
          <h2 className="text-3xl font-black mb-3 text-text-main">
            Stay in the Loop
          </h2>
          <p className="text-text-muted mb-8 text-base font-medium max-w-lg mx-auto leading-relaxed">
            Subscribe to our newsletter and get 10% off your first purchase plus
            exclusive access to new arrivals.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              // Handle newsletter subscription
            }}
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-3 rounded-lg border border-[#D6C0B3] bg-[#E4E0E1] text-text-main placeholder:text-text-muted/50 focus:bg-white focus:ring-1 focus:ring-accent focus:border-accent outline-none text-sm font-semibold shadow-inner transition-colors"
            />
            <Button
              type="submit"
              className="px-8 py-3 bg-text-main text-white font-bold rounded-lg hover:bg-accent transition-all text-sm shadow-md hover:shadow-lg transform active:scale-95"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
