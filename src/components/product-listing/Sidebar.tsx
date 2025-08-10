"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export default function Sidebar({ className }: { className?: string }) {
  const [priceRange, setPriceRange] = useState<number[]>([500, 5000]);

  return (
    <aside
      className={`lg:w-60 p-5 border-r bg-white shadow-lg space-y-8 ${className}`}
    >
      <h1 className="text-xl font-bold text-gray-800">Filters</h1>

      {/* Price Range */}
      <div>
        <h2 className="font-semibold mb-3">Price Range</h2>
        <Slider
          min={100}
          max={10000}
          step={100}
          value={priceRange}
          className="bg-gray-800 rounded-lg text-white cursor-pointer"
          onValueChange={setPriceRange}
        />

        <div className="flex justify-between text-sm text-gray-900 mt-2">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      <Button
        variant="default"
        className="w-full bg-gray-700 hover:bg-gray-900 text-white cursor-pointer"
      >
        Apply Filters
      </Button>
    </aside>
  );
}
