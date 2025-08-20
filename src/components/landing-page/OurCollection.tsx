"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";

function CollectionSection() {
  const [products, setProducts] = React.useState<any[]>([]);

  async function getData() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products/collection`,
        { withCredentials: true }
      );
      const products = data.data;
      setProducts(products);
    } catch (_error) {
      setProducts([]);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    products && (
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* Title */}
        <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            OUR COLLECTION
          </h2>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-6 md:gap-8">
          {products.map((product: any) => {
            const badgeText =
              product?.badge ??
              (product?.discountPercentage
                ? `GET OFF ${product.discountPercentage}%`
                : product?.isNew
                ? "NEW ARRIVAL"
                : null);
            return (
              <div key={product.id} className="group">
                {/* Image tile */}
                <div className="relative rounded-3xl overflow-hidden bg-neutral-100 aspect-[4/5]">
                  <Image
                    src={product?.images?.[0]?.url}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover object-top"
                  />
                  {badgeText && (
                    <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-semibold shadow">
                      {badgeText}
                    </span>
                  )}

                  {/* Hover CTAs */}
                  <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                    <Link
                      href={`/products/${product.slug}`}
                      className="rounded-full bg-white text-black px-4 py-2 text-xs font-semibold shadow inline-flex items-center gap-2"
                    >
                      ADD TO CART
                      <ShoppingCart className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                {/* Text area */}
                <div className="mt-3">
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase">
                    {product.name}
                  </h3>
                  <p className="text-sm font-extrabold text-neutral-500">
                    ${product.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    )
  );
}

export default CollectionSection;
