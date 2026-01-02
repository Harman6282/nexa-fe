"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full px-4 md:px-6 pt-6 pb-2 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 min-h-[500px] md:h-[600px]">
        {/* Main Promotional Banner - Left */}
        <div className="md:col-span-8 relative group overflow-hidden rounded-lg bg-white shadow-md">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDx7rgw7KJ-9vYWdjL1ax3_O-8z0xkDQDDFq5vdVMPQLqnO4RJZvRlUDfUQzs1v5TaK14NwS0OOj0yWNq7G0C768X7d0HKxMvCgpbdCpLOAGhXUr7ITUSmzGZrWhmEiMux3u49XJ9uZWKfZWq-XoBjulexh_0wnWqSWlJ903_k20xEMlF5Dlkyt7T3O0G0P9v4LFE9l4Ne9Pd8ZpfevZNg3WenaCxgIUAIhp8cuUHDgOWt8aSlS88oRIGcgRY1j4--slzAcseNS1ALo")',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#493628]/60 via-[#493628]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-3/4 flex flex-col gap-6 items-start">
            <div className="inline-flex items-center rounded-lg bg-white/90 backdrop-blur-sm px-4 py-1.5 text-xs font-bold text-text-main tracking-widest uppercase shadow-sm">
              Spring Collection 2024
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight text-white drop-shadow-md">
              Fresh Styles
              <br />
              <span className="text-[#D6C0B3]">New Horizons</span>
            </h1>
            <p className="text-lg text-white/90 font-medium max-w-lg leading-relaxed drop-shadow">
              Discover the latest trends in our Spring Collection. Quality
              fabrics, modern cuts, and timeless designs tailored for you.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                asChild
                className="flex items-center justify-center rounded-lg h-12 px-8 bg-white text-text-main font-bold shadow-lg hover:bg-[#E4E0E1] transition-all active:scale-95 text-sm uppercase tracking-wide"
              >
                <Link href="/products">Shop Collection</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex items-center justify-center rounded-lg h-12 px-8 bg-transparent border-2 border-white/80 text-white font-bold hover:bg-white hover:text-text-main transition-colors text-sm uppercase tracking-wide backdrop-blur-sm"
              >
                <Link href="/products">Lookbook</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Category Banners - Right */}
        <div className="md:col-span-4 flex flex-col gap-4 md:gap-6 h-full">
          {/* Women's Essentials */}
          <Link href="/products?category=women" className="flex-1 relative overflow-hidden rounded-lg group cursor-pointer bg-white shadow-md">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC-1Z9fk4i3z8h8HJoRmAuA18w-zZAIF_zWpOU1b3vMA0-yKw-FAMbAuSB2miDo1aGQZC8OYoxpFwIRiecpusvI3T-qBrOZFZ3QKOmUk2RpiLD_gQkQJdodd2pN9Lw66JHsir8Zv1OswlQPME0ttvbBpovmF-mPIdLzYNAL0BOzURwbvHJXiymDLlUQRwJ79_cEglzYlDJlNLHmvPs6IGUTX2UjVN-NOkl2MCcQ0y6Mgsi08-6azNQqljCTP5AtmYqamNrTqNfwD-nf")',
              }}
            />
            <div className="absolute inset-0 bg-[#493628]/10 group-hover:bg-[#493628]/20 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#493628]/80 to-transparent">
              <h3 className="text-2xl font-bold text-white">
                Women&apos;s Essentials
              </h3>
              <div className="inline-flex items-center gap-1 text-white/90 text-sm font-bold mt-2 group-hover:text-white transition-colors">
                Explore <ArrowRight className="text-sm h-4 w-4" />
              </div>
            </div>
          </Link>

          {/* Men's Urban Wear */}
          <Link href="/products?category=men" className="flex-1 relative overflow-hidden rounded-lg group cursor-pointer bg-white shadow-md">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCawr52ugL1hWgAWFL0tcAQNLC6sNetMkmEWRXBMdibvlIG7zY4C9UtbkIOcoZxTu3m9GD23AzPwZg8M8cY8MY7YuTktqS8nM_jOM_E9I0-0i3JqdFatnV6wRwoqLkQZNNOHpn5L_epihJJTxq7dvFhmZDeDTHo2d3AQpX1OEuxq2vdllz8aB_2Q2acwyyYpWiPg4_WN1V1N5-p89lXqfDoM1xMvGYLhRzIbMVpr8RA-PyeMthSioYCimdKNM4UgLzVu8R0iVxQGOc3")',
              }}
            />
            <div className="absolute inset-0 bg-[#493628]/10 group-hover:bg-[#493628]/20 transition-colors" />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#493628]/80 to-transparent">
              <h3 className="text-2xl font-bold text-white">
                Men&apos;s Urban Wear
              </h3>
              <div className="inline-flex items-center gap-1 text-white/90 text-sm font-bold mt-2 group-hover:text-white transition-colors">
                Explore <ArrowRight className="text-sm h-4 w-4" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
