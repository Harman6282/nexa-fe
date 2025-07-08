"use client";

import React from "react";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail } from "lucide-react";

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
                        <li><a href="#" className="hover:text-gray-400">My Account</a></li>
                        <li><a href="#" className="hover:text-gray-400">Login</a></li>
                        <li><a href="#" className="hover:text-gray-400">My Order</a></li>
                        <li><a href="#" className="hover:text-gray-400">My Cart</a></li>
                        <li><a href="#" className="hover:text-gray-400">Check Out</a></li>
                    </ul>
                </div>

                {/* Service Links */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Service</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gray-400">About Us</a></li>
                        <li><a href="#" className="hover:text-gray-400">Delivery Policy</a></li>
                        <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-gray-400">Refund Policy</a></li>
                        <li><a href="#" className="hover:text-gray-400">Terms & Conditions</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Social Media</h2>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-gray-400"><Facebook /></a>
                        <a href="#" className="hover:text-gray-400"><Instagram /></a>
                        <a href="#" className="hover:text-gray-400"><Linkedin /></a>
                        <a href="#" className="hover:text-gray-400"><Twitter /></a>
                        <a href="#" className="hover:text-gray-400"><Youtube /></a>
                        <a href="#" className="hover:text-gray-400"><Mail /></a>
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
