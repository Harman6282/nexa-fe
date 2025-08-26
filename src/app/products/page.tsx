"use client";
import NoProductsFound from "@/components/product-listing/NoProductsFound";
import { ProductCard } from "@/components/product-listing/ProductCard";
import Sidebar from "@/components/product-listing/Sidebar";
import { ProductSchema, useProductStore } from "@/lib/store";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProdShimmer from "@/components/shimmer/Prod_shimmer";

export type Filters = {
  priceRange?: number[] | null;
  category?: string | null;
  size?: string[] | null;
};

export default function Products() {
  const products = useProductStore((state) => state.products);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [500, 5000],
    category: "",
    size: [],
  });

  const [filteredProducts, setFilteredProducts] = useState<ProductSchema[]>([]);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const isLoading = products.length === 0;
  useEffect(() => {
    console.log(products);
    const list: ProductSchema[] = Array.isArray(products) ? [...products] : [];

    let result = list;

    // Category: prefer sidebar category if set, otherwise use URL param
    const selectedCategory =
      filters.category && filters.category !== ""
        ? filters.category
        : category || "";

    if (selectedCategory && selectedCategory.toLowerCase() !== "all") {
      const catLower = selectedCategory.toLowerCase();
      result = result.filter((p) =>
        (p.categoryName || "").toLowerCase().startsWith(catLower)
      );
    }

    // Price range
    if (filters.priceRange && filters.priceRange.length === 2) {
      const [min, max] = filters.priceRange;
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    // Sizes via variants
    if (filters.size && filters.size.length > 0) {
      const sizesSet = new Set(filters.size);
      result = result.filter(
        (p) =>
          Array.isArray(p.variants) &&
          p.variants.some((v) => sizesSet.has(v.size))
      );
    }

    setFilteredProducts(result);
  }, [products, filters, category]);

  return (
    <div className="flex gap-1">
      <Sidebar
        className="hidden md:inline-block w-1/4"
        setFilters={setFilters}
      />

      <div className="flex-1 px-2 md:px-4 mx-auto my-3 pb-10 w-full">
        {isLoading ? (
          <ProdShimmer />
        ) : filteredProducts.length === 0 ? (
          <NoProductsFound className="mx-auto" category={category} />
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  slug={product.slug}
                  title={product.name}
                  image={product.images.map((img) => img.url)}
                  price={product.price}
                  discount={product.discount}
                  brand={product.brand}
                  className=""
                />
              ))}
            </div>

            <div className="flex justify-center mt-6"></div>
          </>
        )}
      </div>
    </div>
  );
}
