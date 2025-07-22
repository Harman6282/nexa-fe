"use client";
import React from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const OrderSuccess: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black px-4">
      {/* Success Icon */}
      <CheckCircle className="w-20 h-20 text-green-500 animate-bounce" />

      {/* Heading */}
      <h1 className="text-3xl font-bold mt-6">Order Placed Successfully!</h1>

      {/* Subheading */}
      <p className="text-gray-600 mt-2 text-center">
        Thank you for shopping with us. Your order has been placed and will be
        processed shortly.
      </p>

      {/* Order Details */}
      <div className="bg-gray-100 rounded-xl p-4 mt-6 w-full max-w-md shadow">
        <p className="text-gray-700">
          <span className="font-semibold">Order ID:</span> #123456789
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Estimated Delivery:</span> 3-5
          business days
        </p>
      </div>

      {/* Continue Shopping Button */}
      <Link
        href="/products"
        className="mt-6 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
