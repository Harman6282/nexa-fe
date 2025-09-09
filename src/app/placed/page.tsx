"use client";
import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  ShoppingBag,
  Package,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const OrderSuccess: React.FC = () => {
  const [orderId, setOrderId] = useState<string>("");
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const [isValidAccess, setIsValidAccess] = useState<boolean>(false);

  useEffect(() => {
    // Validate access to placed page
    const paymentSuccess = sessionStorage.getItem("paymentSuccess");
    
    if (!paymentSuccess) {
      // Redirect to home if accessed without valid payment
      window.location.href = "/";
      return;
    }

    // Mark as valid access and clear the flag
    setIsValidAccess(true);
    sessionStorage.removeItem("paymentSuccess");

    // Generate a random order ID for demo purposes
    const randomId = Math.random().toString(36).substring(2, 15).toUpperCase();
    setOrderId(randomId);

    // Calculate delivery date (3-5 business days from now)
    const today = new Date();
    const delivery = new Date(today);
    delivery.setDate(today.getDate() + 4); // 4 days from now
    setDeliveryDate(
      delivery.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  // Show loading or redirect if not valid access
  if (!isValidAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <Card className="text-center shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            {/* Success Icon with Animation */}
            <div className="relative mb-8">
              <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🎉 Order Placed Successfully!
            </h1>

            {/* Subheading */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Thank you for your order! We're excited to get your items ready
              for you. You'll receive a confirmation email shortly with all the
              details.
            </p>

            {/* Order Details Card */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-semibold text-gray-900">#{orderId}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-500">Estimated Delivery</p>
                    <p className="font-semibold text-gray-900">
                      {deliveryDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Shop More
                </Button>
              </Link>
              <Link href="/profile">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-full font-semibold transition-all duration-300"
                >
                  View Orders
                </Button>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Need help?{" "}
                <Link href="/contact" className="text-blue-600 hover:underline">
                  Contact our support team
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Don't miss out on our latest collections!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products?category=women"
              className="text-sm text-blue-600 hover:underline flex items-center"
            >
              Women's Collection <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
            <Link
              href="/products?category=men"
              className="text-sm text-blue-600 hover:underline flex items-center"
            >
              Men's Collection <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
            <Link
              href="/products?category=kids"
              className="text-sm text-blue-600 hover:underline flex items-center"
            >
              Kids' Collection <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
