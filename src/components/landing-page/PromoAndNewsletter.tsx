"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const PromoAndNewsletter = () => {
  return (
    <div className="space-y-16">
      {/* Promo Section */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image */}
        <div className="rounded-lg overflow-hidden">
          <Image
            src="/model.jpg"
            alt="Woman wearing black hat"
            width={400}
            height={400}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Promo Text */}
        <div className="text-center md:text-left space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            30% OFF ON ALL <br /> NEW ARRIVAL
          </h2>
          <p className="text-gray-600">Offer Last Date 30 September</p>
          <Button className="mt-4">Explore Now</Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 rounded-lg max-w-full mx-auto mb-5 px-6 py-7 xl:py-12 text-center space-y-6">
        <h2 className="text-3xl md:text-5xl font-bold">SUBSCRIBE OUR NEWSLETTER</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm">
          Stay connected with the latest trends, exclusive offers, and behind-the-scenes updates by subscribing to our newsletter. Be the first to discover new collections and special promotions tailored just for you!
        </p>
        <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
          <Input
            type="email"
            placeholder="Enter Your Email address here"
            className="flex-1 rounded-full"
          />
          <Button type="submit" className="rounded-full px-6 bg-black text-white">
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      </section>
    </div>
  );
};

export default PromoAndNewsletter;
