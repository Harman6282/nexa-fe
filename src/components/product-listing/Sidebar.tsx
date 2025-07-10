"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Dummy Data
const categories = [
  "Shirts",
  "T-Shirts",
  "Jeans",
  "Trousers",
  "Sweatshirts",
  "Shorts",
  "Jackets",
  "Kurta Sets",
];

const brands = [
  "Roadster",
  "HIGHLANDER",
  "WOOSTRO",
  "Campus Sutra",
  "Mast & Harbour",
  "HRX by Hrithik Roshan",
];

export default function Sidebar() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([500, 5000]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color === selectedColor ? null : color);
  };

  return (
    <aside className="w-80 p-5 border-r bg-white shadow-lg space-y-8">
      <h1 className="text-xl font-bold text-gray-800">Filters</h1>

      {/* Categories */}
      <div className="border-b-[1px] pb-5">
        <h2 className="font-semibold mb-3">Categories</h2>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label htmlFor={category} className="text-gray-700">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="border-b-[1px] pb-5">
        <h2 className="font-semibold mb-3">Price Range</h2>
        <Slider min={100} max={10000} step={100} value={priceRange} />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      {/* Brands */}
      <div>
        <h2 className="font-semibold mb-3">Brands</h2>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <Label htmlFor={brand} className="text-gray-700">
                {brand}
              </Label>
            </div>
          ))}
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
