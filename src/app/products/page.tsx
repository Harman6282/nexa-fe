"use client";
import NoProductsFound from "@/components/product-listing/NoProductsFound";
import { ProductCard } from "@/components/product-listing/ProductCard";
import Sidebar from "@/components/product-listing/Sidebar";
import { ProductSchema, useProductStore } from "@/lib/store";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Products() {
  const products = useProductStore((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState<ProductSchema[]>([]);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    if (products && category) {
      const filtered = products.filter(
        (product) => product.categoryName === category
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, category]);

  return (
    <div className="flex gap-1">
      <Sidebar className="hidden sm:inline-block w-1/4" />

      <div className="flex flex-wrap w-11/12 ps-2 md:gap-4 mx-auto justify-start my-3 pb-10">
        {filteredProducts.length === 0 ? (
          <NoProductsFound className="mx-auto" category={category} />
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slug={product.slug}
              title={product.name}
              image={product.images.map((img) => img.url)}
              price={product.price}
              discount={product.discount}
              brand={product.brand}
              className="w-1/2 sm:w-1/2 md:w-[30%] lg:w-1/5 p-2"
            />
          ))
        )}
      </div>
    </div>
  );
}
