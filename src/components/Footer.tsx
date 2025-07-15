"use client";

import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo */}
        <div className="md:col-span-1">
          <h1 className=" text-5xl md:text-9xl font-extrabold bg-gradient-to-r from-gray-200 to-gray-700 text-transparent bg-clip-text">
            Nexa
          </h1>
        </div>

        {/* Information Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Information</h2>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-gray-400">
                My Account
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-400">
                Login
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-400">
                My Order
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-400">
                My Cart
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-400">
                Check Out
              </Link>
            </li>
          </ul>
        </div>

        {/* Service Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Service</h2>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-gray-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-400">
                Delivery Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-400">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-400">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Social Media</h2>
          <div className="flex space-x-4 flex-wrap gap-1">
            <Link href="#" className="hover:text-gray-400">
              <Facebook />
            </Link>
            <Link href="#" className="hover:text-gray-400">
              <Instagram />
            </Link>
            <Link href="#" className="hover:text-gray-400">
              <Linkedin />
            </Link>
            <Link href="#" className="hover:text-gray-400">
              <Twitter />
            </Link>
            <Link href="#" className="hover:text-gray-400">
              <Youtube />
            </Link>
            <Link href="#" className="hover:text-gray-400">
              <Mail />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © 2025 All Rights are Reserved by Nexa | Designed by Harman Singh
      </div>
    </footer>
  );
};

export default Footer;
