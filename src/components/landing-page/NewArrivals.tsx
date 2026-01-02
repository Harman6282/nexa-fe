"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ShoppingCart, ArrowRight } from "lucide-react";

export default function NewArrivals() {
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products/collection`,
          { withCredentials: true }
        );
        const fetchedProducts = data.data || [];
        setProducts(fetchedProducts.slice(0, 5));
      } catch (_error) {
        setProducts([]);
      }
    }
    getData();
  }, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 px-4 md:px-8 max-w-[1600px] mx-auto mb-2">
      <div className="flex justify-between items-end border-b border-[#D6C0B3] pb-6 mb-8">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-text-main uppercase">
            New Arrivals
          </h2>
          <p className="text-text-muted text-sm mt-2 font-medium">
            Check out the latest additions to our store
          </p>
        </div>
        <Link
          href="/products"
          className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-text-main font-bold text-sm hover:bg-[#E4E0E1] hover:shadow-sm transition-all border border-[#D6C0B3]"
        >
          View all <ArrowRight className="text-sm h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {products.map((product: any) => {
          const badgeText = product?.badge
            ? product.badge
            : product?.discountPercentage
            ? `-${product.discountPercentage}%`
            : product?.isNew
            ? "NEW"
            : null;

          const originalPrice = product?.price || 0;
          const discount = product?.discountPercentage || 0;
          const discountedPrice =
            discount > 0 ? originalPrice * (1 - discount / 100) : originalPrice;

          // Extract colors from variants
          const colors = Array.from(
            new Set(
              (product.variants || [])
                .map((v: any) => v.color)
                .filter(Boolean)
            )
          ).slice(0, 2);

          const colorMap: Record<string, string> = {
            blue: "#1e3a8a",
            black: "#000000",
            white: "#ffffff",
            beige: "#F5DEB3",
            brown: "#8B4513",
            lightblue: "#93c5fd",
          };

          return (
            <div
              key={product.id}
              className="group cursor-pointer bg-white p-3 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#D6C0B3]"
              onClick={() => router.push(`/products/${product.slug}`)}
            >
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-[#E4E0E1] mb-4">
                <Image
                  src={product?.images?.[0]?.url || "/card1.jpg"}
                  alt={product.name || "Product"}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                <button
                  className="absolute bottom-3 right-3 size-10 rounded-lg bg-white shadow-lg flex items-center justify-center text-text-main opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/products/${product.slug}`);
                  }}
                >
                  <ShoppingCart className="h-5 w-5" />
                </button>
                {badgeText && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-text-main rounded-lg text-[10px] font-bold text-white tracking-wider uppercase">
                    {badgeText}
                  </div>
                )}
                {discount > 0 && !badgeText && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#D9534F] rounded-lg text-[10px] font-bold text-white uppercase">
                    -{discount}%
                  </div>
                )}
              </div>

              <div className="px-1 pb-1">
                <h3 className="text-base font-bold text-text-main">
                  {product.name || "Product Name"}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  {discount > 0 ? (
                    <p className="text-[#D9534F] font-bold text-sm">
                      <span className="line-through text-text-muted/50 mr-2 text-xs font-normal">
                        ${originalPrice.toFixed(2)}
                      </span>
                      ${discountedPrice.toFixed(2)}
                    </p>
                  ) : (
                    <p className="text-text-muted font-semibold text-sm">
                      ${originalPrice.toFixed(2)}
                    </p>
                  )}
                  {colors.length > 0 && (
                    <div className="flex gap-1.5">
                      {colors.map((color: string, idx: number) => {
                        const colorValue =
                          colorMap[color.toLowerCase()] || "#d6c0b3";
                        return (
                          <div
                            key={idx}
                            className="size-3 rounded-full border border-[#D6C0B3]"
                            style={{ backgroundColor: colorValue }}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
