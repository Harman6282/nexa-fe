"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filters } from "@/app/products/page";

export default function Sidebar({
  className,
  setFilters,
}: {
  className?: string;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}) {
  const [priceRange, setPriceRange] = useState<number[]>([500, 5000]);
  const [category, setCategory] = useState<string>("men");
  const [sizes, setSizes] = useState<string[]>([]);

  const handleSizeChange = (size: string) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleApplyFilters = () => {
    const filters = {
      priceRange,
      category,
      sizes,
    };
    console.log("Applied Filters:", filters);
    setFilters(filters);
  };

  return (
    <aside
      className={`lg:w-64 p-6 border-r border-gray-200 bg-white shadow-sm space-y-6 ${className}`}
    >
      {/* PRICE FILTER */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-lg font-semibold text-gray-900">Price Filter</h1>
      </div>
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

      {/* CATEGORY FILTER (RADIO) */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-lg font-semibold text-gray-900">Category</h1>
        <RadioGroup
          value={category}
          onValueChange={setCategory}
          className="mt-3 space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="men" id="men" />
            <Label htmlFor="men">Men</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="women" id="women" />
            <Label htmlFor="women">Women</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="kids" id="kids" />
            <Label htmlFor="kids">Kids</Label>
          </div>
        </RadioGroup>
      </div>

      {/* SIZE FILTER (CHECKBOX) */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-lg font-semibold text-gray-900">Size</h1>
        <div className="mt-3 space-y-2">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={size}
                checked={sizes.includes(size)}
                onCheckedChange={() => handleSizeChange(size)}
              />
              <Label htmlFor={size}>{size}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* APPLY & RESET BUTTONS */}
      <Button
        onClick={handleApplyFilters}
        className="w-full bg-black hover:bg-gray-800 text-white font-medium py-2"
      >
        Apply Filters
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          setPriceRange([500, 5000]);
          setCategory("men");
          setSizes([]);
        }}
        className="w-full border-black text-black hover:bg-gray-100"
      >
        Reset Filters
      </Button>
    </aside>
  );
}
