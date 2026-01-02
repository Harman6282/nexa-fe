"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ClearanceBanner() {
  return (
    <section className="py-12 px-4 md:px-8 bg-background-light">
      <div className="max-w-[1600px] mx-auto rounded-lg overflow-hidden relative bg-[#493628] border border-[#493628] text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-white/5 -skew-x-12 z-0 transform translate-x-20" />
        <div className="grid md:grid-cols-2 relative z-10">
          {/* Left Half - Dark Brown Background */}
          <div className="p-10 md:p-16 flex flex-col items-start justify-center gap-6">
            <span className="text-white font-bold tracking-widest uppercase text-xs bg-accent px-3 py-1 rounded-lg shadow-sm">
              Limited Time Offer
            </span>
            <h2 className="text-4xl md:text-6xl font-black leading-none text-white">
              End of Season
              <br />
              <span className="text-accent">Clearance</span>
            </h2>
            <p className="text-lg text-white/80 max-w-md font-medium leading-relaxed">
              Up to 70% Off on selected items. Don&apos;t miss out on the biggest
              sale of the year. Grab your favorites before they&apos;re gone.
            </p>
            <div className="flex gap-4 w-full mt-4">
              <Button
                asChild
                className="h-12 px-8 rounded-lg bg-white text-text-main font-bold hover:bg-primary hover:text-white transition-all shadow-lg transform hover:-translate-y-1"
              >
                <Link href="/products?category=sale">Shop Sale</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 px-8 rounded-lg border border-white/30 text-white font-bold hover:bg-white/10 hover:border-white transition-colors"
              >
                <Link href="/products?category=sale">View Details</Link>
              </Button>
            </div>
          </div>

          {/* Right Half - Image */}
          <div
            className="h-80 md:h-full min-h-[400px] w-full bg-cover bg-center md:rounded-l-[2rem] overflow-hidden shadow-2xl"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDlmFJEF_DsQS-p4z1hBnrxiHs-fDMFLAz2g0tjHUhNuVhA1SL0C9ax6zEKjlqqVoDhkr_wJ4jn7V92WeE-hEwTx5JDIXmXfJyudVKysyeVHMXqOlyOPKj73ycWDxwyFdgYNjSAcmBiDnFz8Izik8Ctp6pJIUk2THZJ8dKzNYGGkDXrA2O8LVEsjcfMs_Bh-Q1Ef0-ZydRRXy_XoB9gjCL2OUfwkSbLZ0zeRKAqxBKi2E3cUY-Mq3lR1Is5Z6PNnKAFyAM5OqrKysY6")',
            }}
          />
        </div>
      </div>
    </section>
  );
}
