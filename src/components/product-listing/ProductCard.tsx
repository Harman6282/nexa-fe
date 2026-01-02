"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  id: string;
  slug: string;
  title: string;
  image: string[];
  brand: string;
  price: number;
  discount: number;
  className?: string;
  isNew?: boolean;
  variants?: Array<{ color?: string; size?: string }>;
};

export const ProductCard = ({
  slug,
  id,
  title,
  image,
  brand,
  price,
  discount,
  className,
  isNew = false,
  variants = [],
}: ProductCardProps) => {
  const router = useRouter();
  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;

  // Extract unique colors from variants
  const uniqueColors = Array.from(
    new Set(variants.map((v) => v.color).filter(Boolean))
  ).slice(0, 3);

  // Color mapping for display
  const colorMap: Record<string, string> = {
    white: "#ffffff",
    black: "#000000",
    blue: "#93c5fd",
    red: "#fca5a5",
    yellow: "#fcd34d",
    green: "#86efac",
    pink: "#fbcfe8",
    gray: "#e5e7eb",
    navy: "#1e3a8a",
    lightblue: "#bae6fd",
  };

  return (
    <div
      className={`group flex flex-col bg-white rounded-xl p-3 shadow-sm border border-accent/10 hover:shadow-lg hover:border-accent/40 transition-all duration-300 ${className}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-surface-light mb-3">
        <Image
          src={image[0] || "/card1.jpg"}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
        />

        {/* Badge */}
        {isNew && (
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 bg-primary/90 backdrop-blur-sm text-xs font-bold uppercase tracking-wider rounded text-surface-light shadow-sm">
              New
            </span>
          </div>
        )}
        {discount > 0 && !isNew && (
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded shadow-sm">
              -{discount}%
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          className="absolute top-2 right-2 p-2 rounded-full bg-white/90 backdrop-blur-sm text-text-main opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white shadow-md transform hover:scale-110"
          aria-label="Add to wishlist"
        >
          <Heart className="text-[20px] block" />
        </button>

        {/* Quick Add Button */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <Button
            onClick={(e) => {
              e.preventDefault();
              router.push(`/products/${slug}`);
            }}
            className="w-full py-2.5 bg-primary text-surface-light font-bold rounded-lg shadow-lg hover:bg-text-main hover:text-white transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <ShoppingCart className="text-lg" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex justify-between items-start px-1">
        <div className="flex-1">
          <h3 className="text-base font-bold text-text-main mb-0.5 line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-text-secondary font-medium mb-2">
            {brand}
          </p>
        </div>
        <div className="text-right">
          {discount > 0 ? (
            <>
              <p className="font-bold text-lg text-red-700">
                ${discountedPrice.toFixed(2)}
              </p>
              <p className="text-xs text-text-secondary line-through font-medium">
                ${price.toFixed(2)}
              </p>
            </>
          ) : (
            <p className="font-bold text-lg text-primary">
              ${price.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
