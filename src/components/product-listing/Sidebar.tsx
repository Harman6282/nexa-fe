"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export default function Sidebar({ className }: { className?: string }) {
  const [priceRange, setPriceRange] = useState<number[]>([500, 5000]);

  const handleApplyFilters = () => {
    // Handle filter application logic here
    console.log("Applied price range:", priceRange);
  };

  return (
    <aside
      className={`lg:w-64 p-6 border-r border-gray-200 bg-white shadow-sm space-y-6 ${className}`}
    >
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-lg font-semibold text-gray-900">Price Filter</h1>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700">
            Price Range
          </label>
          <span className="text-xs text-gray-500">
            ₹{priceRange[0]} - ₹{priceRange[1]}
          </span>
        </div>

        <Slider
          min={100}
          max={10000}
          step={100}
          value={priceRange}
          onValueChange={setPriceRange}
          className="w-full [&_[data-slot=slider-track]]:bg-gray-400 [&_[data-slot=slider-range]]:bg-black [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-black [&_[data-slot=slider-thumb]]:shadow-lg"
        />

        <div className="flex justify-between text-sm text-gray-600">
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Apply Button */}
      <Button
        onClick={handleApplyFilters}
        className="w-full bg-black hover:bg-gray-800 text-white font-medium py-2"
      >
        Apply Price Filter
      </Button>

      {/* Reset Button */}
      <Button
        variant="outline"
        onClick={() => setPriceRange([500, 5000])}
        className="w-full border-black text-black hover:bg-gray-100"
      >
        Reset Filter
      </Button>
    </aside>
  );
}
