"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, Clock, ShieldCheck } from "lucide-react";

const PromoAndNewsletter = () => {
  return (
    <div className="space-y-16 ">
      {/* Newsletter Section */}
      <section className="max-w-7xl  mx-auto rounded-3xl border border-black/10 bg-neutral-100 px-6 py-8 md:px-10 md:py-12 text-center shadow-sm mb-7">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          SUBSCRIBE OUR NEWSLETTER
        </h2>
        <p className="mt-3 text-neutral-600 max-w-2xl mx-auto text-sm md:text-base">
          Stay in the loop with exclusive drops, early access to collections,
          and curated stories. No spam — unsubscribe anytime.
        </p>

        {/* Benefits chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 md:gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow">
            <Sparkles className="h-4 w-4" /> Exclusive drops
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow">
            <Clock className="h-4 w-4" /> Early access
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow">
            <ShieldCheck className="h-4 w-4" /> No spam
          </span>
        </div>

        {/* Form */}
        <form
          className="relative max-w-xl mx-auto mt-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            required
            className="h-12 md:h-14 rounded-full pr-28 text-sm md:text-base"
          />
          <Button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-10 md:h-12 rounded-full px-5 bg-black text-white"
          >
            Subscribe
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </section>
    </div>
  );
};

export default PromoAndNewsletter;
