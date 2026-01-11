"use client";

import NoProductsFound from "@/components/product-listing/NoProductsFound";
import { ProductCard } from "@/components/product-listing/ProductCard";
import Sidebar from "@/components/product-listing/Sidebar";
import { ProductSchema, useProductStore } from "@/lib/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProdShimmer from "@/components/shimmer/Prod_shimmer";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Filters = {
  priceRange?: number[] | null;
  category?: string | null;
  size?: string[] | null;
  color?: string[] | null;
};

export default function Products() {
  const { products, setProducts, totalPages, setTotalPages } =
    useProductStore();
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 99999],
    category: "",
    size: [],
    color: [],
  });

  const [filteredProducts, setFilteredProducts] = useState<ProductSchema[]>([]);
  const [activeFilters, setActiveFilters] = useState<{
    category?: string;
    size?: string[];
  }>({});
  const searchParams = useSearchParams();
  const limit = searchParams.get("limit");
  const category = searchParams.get("category");
  const q = searchParams.get("q");

  const getProducts = async () => {
    try {
      setIsFetching(true);
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/products?page=${currentPage}&limit=${limit || 10}`
      );

      console.log(response.data)
      setProducts(response.data.data.products);
      setTotalPages(response.data.data.totalPages);
    } catch (_error) {
      
    } finally {
      setIsFetching(false);
    }
  };

  const searchProducts = async () => {
    try {
      setIsFetching(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products/search?q=${q}`
      );
      const searchedProducts = response.data?.data?.products;
      setTotalPages(response.data?.data?.totalPages);
      if (
        searchedProducts.length != 0 &&
        searchedProducts != null &&
        searchProducts != undefined
      ) {
        setProducts(searchedProducts);
      }
    } catch (_error) {
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const pageParam = Number(searchParams.get("page")) || 1;
    setCurrentPage(pageParam);
  }, [searchParams]);

  useEffect(() => {
    if (q != null) {
      searchProducts();
    }
  }, [q]);

  useEffect(() => {
    if (currentPage && !q) {
      getProducts();
    }
  }, [currentPage]);

  useEffect(() => {
    const list: ProductSchema[] = Array.isArray(products) ? [...products] : [];

    let result = list;

    // Category: prefer sidebar category if set, otherwise use URL param
    const selectedCategory =
      filters.category && filters.category !== ""
        ? filters.category
        : category || "";

    // Only filter by category if a category is actually selected (not empty and not "all")
    if (selectedCategory && selectedCategory.trim() !== "" && selectedCategory.toLowerCase() !== "all") {
      const catLower = selectedCategory.toLowerCase().trim();
      result = result.filter((p) => {
        const productCategory = (p.categoryName || "").toLowerCase();
        return productCategory.startsWith(catLower) || productCategory === catLower;
      });
    }

    // Price range
    if (filters.priceRange && filters.priceRange.length === 2) {
      const [min, max] = filters.priceRange;
      result = result.filter((p) => {
        const productPrice = typeof p.price === 'number' ? p.price : 0;
        return productPrice >= min && productPrice <= max;
      });
    }

    // Sizes via variants
    if (filters.size && filters.size.length > 0) {
      const sizesSet = new Set(filters.size);
      result = result.filter(
        (p) =>
          Array.isArray(p.variants) &&
          p.variants.some((v) => v.size && sizesSet.has(v.size))
      );
    }

    setFilteredProducts(result);

    // Update active filters for display
    setActiveFilters({
      category: selectedCategory && selectedCategory.trim() !== "" ? selectedCategory : undefined,
      size: filters.size || [],
    });
  }, [products, filters, category]);

  const handlePageClick = (page: number) => {
    router.push(`/products?page=${page}`);
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 99999],
      category: "",
      size: [],
      color: [],
    });
    setActiveFilters({});
  };

  const removeFilter = (type: "category" | "size", value?: string) => {
    if (type === "category") {
      setFilters((prev) => ({ ...prev, category: "" }));
      setActiveFilters((prev) => ({ ...prev, category: undefined }));
    } else if (type === "size" && value) {
      setFilters((prev) => ({
        ...prev,
        size: (prev.size || []).filter((s) => s !== value),
      }));
      setActiveFilters((prev) => ({
        ...prev,
        size: (prev.size || []).filter((s) => s !== value),
      }));
    }
  };

  return (
    <main className="flex-grow w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex mb-4">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-primary transition-colors"
            >
              Home
            </Link>
          </li>
          {category && (
            <li>
              <div className="flex items-center">
                <ChevronRight className="text-text-secondary text-sm mx-1 h-4 w-4" />
                <Link
                  href={`/products?category=${category}`}
                  className="text-sm font-medium text-text-secondary hover:text-primary transition-colors capitalize"
                >
                  {category}
                </Link>
              </div>
            </li>
          )}
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronRight className="text-text-secondary text-sm mx-1 h-4 w-4" />
              <span className="text-sm font-bold text-text-main">
                {category ? "New Arrivals" : "Products"}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Sidebar */}
        <Sidebar
          className="w-full lg:w-64 flex-shrink-0"
          setFilters={setFilters}
          filters={filters}
        />

        {/* Products Grid */}
        <div className="flex-1 flex flex-col">
          {/* Header with Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 bg-surface-light p-3 rounded-lg border border-accent/20 shadow-sm">
            <h2 className="text-xl font-bold text-text-main pl-2">
              New Arrivals{" "}
              <span className="text-text-secondary font-medium text-base ml-1">
                ({filteredProducts.length} items)
              </span>
            </h2>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-sm text-text-secondary hidden sm:inline font-medium">
                Sort by:
              </span>
              <div className="relative group w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="flex items-center justify-between gap-2 px-4 py-2 bg-background-light border border-accent/20 rounded-lg text-sm text-text-main font-bold min-w-[160px] hover:border-accent hover:bg-white transition-colors shadow-sm w-full sm:w-auto"
                >
                  <span>Most Popular</span>
                  <ChevronDown className="text-text-secondary text-lg h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(activeFilters.category ||
            (activeFilters.size && activeFilters.size.length > 0)) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {activeFilters.category && (
                <button
                  onClick={() => removeFilter("category")}
                  className="flex items-center gap-2 px-3 py-1.5 bg-primary text-surface-light border border-primary rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                >
                  {activeFilters.category}
                  <span className="text-sm">×</span>
                </button>
              )}
              {activeFilters.size?.map((size) => (
                <button
                  key={size}
                  onClick={() => removeFilter("size", size)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-background-dark text-text-main border border-background-dark rounded-full text-sm font-medium hover:bg-background-dark/80 transition-colors shadow-sm"
                >
                  Size: {size}
                  <span className="text-sm">×</span>
                </button>
              ))}
              <button
                onClick={clearAllFilters}
                className="text-sm text-text-secondary hover:text-primary font-semibold underline decoration-2 underline-offset-4 px-2 hover:bg-surface-light rounded transition-colors"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Products Grid */}
          {isFetching ? (
            <ProdShimmer />
          ) : filteredProducts.length === 0 ? (
            <NoProductsFound className="mx-auto" category={category || ""} />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-6 gap-y-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    slug={product.slug}
                    title={product.name}
                    image={Array.isArray(product.images) ? product.images.map((img) => img.url) : []}
                    price={product.price}
                    discount={product.discount || 0}
                    brand={product.brand}
                    className=""
                    isNew={(product as any).isNew}
                    variants={product.variants}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <nav className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handlePageClick(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="size-9 rounded-lg border border-accent/30 hover:border-primary hover:bg-surface-light text-primary transition-all shadow-sm bg-white"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: Math.min(totalPages, 8) }).map(
                      (_, i) => {
                        const pageNum = i + 1;
                        if (
                          i === 0 ||
                          i === Math.min(totalPages, 8) - 1 ||
                          Math.abs(pageNum - currentPage) <= 1
                        ) {
                          return (
                            <Button
                              key={i}
                              variant={
                                currentPage === pageNum ? "default" : "outline"
                              }
                              size="icon"
                              onClick={() => handlePageClick(pageNum)}
                              className={`size-9 rounded-lg ${
                                currentPage === pageNum
                                  ? "bg-primary text-surface-light font-bold shadow-md"
                                  : "border border-accent/30 hover:border-primary hover:bg-surface-light text-text-main font-medium transition-all shadow-sm bg-white"
                              }`}
                            >
                              {pageNum}
                            </Button>
                          );
                        } else if (Math.abs(pageNum - currentPage) === 2) {
                          return (
                            <span
                              key={i}
                              className="px-2 text-text-secondary font-bold"
                            >
                              ...
                            </span>
                          );
                        }
                        return null;
                      }
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handlePageClick(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="size-9 rounded-lg border border-accent/30 hover:border-primary hover:bg-surface-light text-primary transition-all shadow-sm bg-white"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
