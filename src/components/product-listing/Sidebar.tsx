"use client";

import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filters } from "@/app/products/page";
import { ChevronUp, ChevronDown } from "lucide-react";

const categories = [
  { name: "Dresses", count: 42 },
  { name: "Tops & T-Shirts", count: 18 },
  { name: "Jackets", count: 12 },
  { name: "Pants & Jeans", count: 24 },
];

const sizes = ["XS", "S", "M", "L", "XL"];

export default function Sidebar({
  className,
  setFilters,
  filters,
}: {
  className?: string;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filters: Filters;
}) {
  const [priceRange, setPriceRange] = useState<number[]>([0, 99999]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    color: true,
    size: true,
  });

  useEffect(() => {
    if (filters.priceRange) {
      setPriceRange(filters.priceRange);
    }
    if (filters.category) {
      setSelectedCategories([filters.category]);
    }
    if (filters.size) {
      setSelectedSizes(filters.size);
    }
    if (filters.color) {
      setSelectedColors(filters.color);
    }
  }, [filters]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [category]
    );
    setFilters((prev) => ({
      ...prev,
      category: prev.category === category ? "" : category,
    }));
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
    setFilters((prev) => ({
      ...prev,
      size: prev.size?.includes(size)
        ? prev.size.filter((s) => s !== size)
        : [...(prev.size || []), size],
    }));
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
    setFilters((prev) => ({
      ...prev,
      color: prev.color?.includes(color)
        ? prev.color.filter((c) => c !== color)
        : [...(prev.color || []), color],
    }));
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    setFilters((prev) => ({ ...prev, priceRange: values }));
  };

  const resetAll = () => {
    setPriceRange([0, 99999]);
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setFilters({
      priceRange: [0, 99999],
      category: "",
      size: [],
      color: [],
    });
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <aside
      className={`space-y-6 bg-surface-light p-4 rounded-xl h-fit border border-accent/20 shadow-sm ${className}`}
    >
      {/* Mobile Header */}
      <div className="lg:hidden flex justify-between items-center pb-4 border-b border-accent/20">
        <h3 className="font-bold text-lg text-text-main">Filters</h3>
        <Button
          variant="ghost"
          onClick={resetAll}
          className="text-accent font-bold text-sm hover:underline hover:text-primary p-0 h-auto"
        >
          Reset All
        </Button>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("categories")}
          className="font-bold text-text-main flex items-center justify-between w-full"
        >
          Categories
          {expandedSections.categories ? (
            <ChevronUp className="text-text-secondary text-sm h-4 w-4" />
          ) : (
            <ChevronDown className="text-text-secondary text-sm h-4 w-4" />
          )}
        </button>
        {expandedSections.categories && (
          <div className="space-y-1">
            {categories.map((cat) => (
              <label
                key={cat.name}
                className="flex items-center gap-3 cursor-pointer group hover:bg-background-light p-1 rounded transition-colors"
              >
                <Checkbox
                  checked={selectedCategories.includes(cat.name)}
                  onCheckedChange={() => handleCategoryChange(cat.name)}
                  className="size-4 rounded border-accent/40 bg-white text-primary focus:ring-primary focus:ring-offset-surface-light"
                />
                <span
                  className={`text-sm font-medium transition-colors ${
                    selectedCategories.includes(cat.name)
                      ? "text-text-main font-bold"
                      : "text-text-secondary group-hover:text-primary"
                  }`}
                >
                  {cat.name}
                </span>
                <span className="text-xs text-text-secondary/70 ml-auto font-medium">
                  ({cat.count})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="space-y-3 pt-4 border-t border-accent/20">
        <button
          onClick={() => toggleSection("price")}
          className="font-bold text-text-main flex items-center justify-between w-full"
        >
          Price Range
          {expandedSections.price ? (
            <ChevronUp className="text-text-secondary text-sm h-4 w-4" />
          ) : (
            <ChevronDown className="text-text-secondary text-sm h-4 w-4" />
          )}
        </button>
        {expandedSections.price && (
          <div className="px-1 py-2">
            <Slider
              min={0}
              max={99999}
              step={100}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="w-full [&_[data-slot=slider-track]]:h-1.5 [&_[data-slot=slider-track]]:bg-background-light [&_[data-slot=slider-track]]:border [&_[data-slot=slider-track]]:border-accent/10 [&_[data-slot=slider-range]]:bg-primary [&_[data-slot=slider-thumb]]:size-4 [&_[data-slot=slider-thumb]]:bg-primary [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-surface-light [&_[data-slot=slider-thumb]]:shadow [&_[data-slot=slider-thumb]]:hover:scale-110"
            />
            <div className="flex justify-between mt-3 text-xs font-bold text-text-secondary">
              <span>₹0</span>
              <span>₹{priceRange[1]}</span>
              <span>₹99999+</span>
            </div>
          </div>
        )}
      </div>

    
      {/* Size */}
      <div className="space-y-3 pt-4 border-t border-accent/20">
        <button
          onClick={() => toggleSection("size")}
          className="font-bold text-text-main flex items-center justify-between w-full"
        >
          Size
          {expandedSections.size ? (
            <ChevronUp className="text-text-secondary text-sm h-4 w-4" />
          ) : (
            <ChevronDown className="text-text-secondary text-sm h-4 w-4" />
          )}
        </button>
        {expandedSections.size && (
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`h-8 rounded border text-sm font-semibold transition-all shadow-sm hover:bg-white ${
                  selectedSizes.includes(size)
                    ? "border-primary bg-primary text-surface-light"
                    : "border-accent/30 bg-background-light text-text-secondary hover:border-primary hover:text-primary"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
