"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Men BLVCK Grey Hoodie",
    price: 180,
    img: "/card1.jpg",
  },
  {
    id: 2,
    name: "LHR London England Hoodie",
    price: 250,
    img: "/card2.jpg",
  },
  {
    id: 3,
    name: "Retro Rapper Tupac Hoodie",
    price: 100,
    img: "/card3.jpg",
  },
  {
    id: 4,
    name: "Hip Hop Street Wear Hoodie",
    price: 120,
    img: "/card4.jpg",
  },
];

const categories = ["Hoodie", "Caps & Bags", "Trending", "Out Wear", "Accessories"];

const CollectionSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Title */}
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <h2 className="text-4xl md:text-5xl font-extrabold">OUR COLLECTION</h2>

      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category, idx) => (
          <Button
            key={idx}
            variant="outline"
            className="rounded-md border-gray-300 text-black hover:bg-black hover:text-white"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative group rounded-lg overflow-hidden border border-gray-200"
          >
            <Image
              src={product.img}
              alt={product.name}
              width={400}
              height={400}
              className="object-cover object-top w-full h-64 lg:h-80 group-hover:scale-105 transition-transform duration-300"
            />
            {/* Hover Buttons */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
              <Button className="w-32">Add to Cart</Button>
              {/* <Button variant="outline" className="w-32 text-black bg-white hover:bg-gray-100">
                Buy Now
              </Button> */}
            </div>
            {/* Product Info */}
            <div className="px-4 py-2 flex justify-between items-center">
              <p className="text-sm">{product.name}</p>
              <p className="font-semibold">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionSection;
