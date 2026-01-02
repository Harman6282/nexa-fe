"use client";

import React from "react";
import Link from "next/link";
import { Shirt } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#493628] text-[#E4E0E1] pt-16 pb-8 border-t-8 border-accent">
      <div className="px-4 md:px-8 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Left Column - Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 rounded-lg bg-white flex items-center justify-center text-text-main">
                <Shirt className="h-5 w-5" />
              </div>
              <span className="font-black text-2xl text-white tracking-tight">
                Nexa Fashion
              </span>
            </div>
            <p className="text-sm text-[#D6C0B3] leading-relaxed max-w-sm font-medium">
              Redefining style for the modern era. Quality, comfort, and
              sustainability in every stitch. We bring the runway to your
              doorway.
            </p>
            <div className="flex gap-4 mt-6">
              <Link
                href="#"
                className="size-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-all text-white"
              >
                <span className="font-bold text-xs">FB</span>
              </Link>
              <Link
                href="#"
                className="size-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-all text-white"
              >
                <span className="font-bold text-xs">TW</span>
              </Link>
              <Link
                href="#"
                className="size-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-all text-white"
              >
                <span className="font-bold text-xs">IG</span>
              </Link>
            </div>
          </div>

          {/* SHOP Column */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-wide">
              Shop
            </h4>
            <ul className="space-y-3 text-sm text-[#D6C0B3] font-medium">
              <li>
                <Link
                  href="/products"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=sale"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Sale
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT Column */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-wide">
              Support
            </h4>
            <ul className="space-y-3 text-sm text-[#D6C0B3] font-medium">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* LEGAL Column */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-wide">
              Legal
            </h4>
            <ul className="space-y-3 text-sm text-[#D6C0B3] font-medium">
              <li>
                <Link
                  href="#"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-[#D6C0B3]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-[#D6C0B3] uppercase tracking-wider">
            © 2024 Nexa Fashion. All rights reserved.
          </p>
          <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="h-6 w-10 bg-white/20 rounded px-1" />
            <div className="h-6 w-10 bg-white/20 rounded px-1" />
            <div className="h-6 w-10 bg-white/20 rounded px-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
