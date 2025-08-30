"use client";
import NoProductsFound from "@/components/product-listing/NoProductsFound";
import { ProductCard } from "@/components/product-listing/ProductCard";
import Sidebar from "@/components/product-listing/Sidebar";
import { ProductSchema, useProductStore } from "@/lib/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProdShimmer from "@/components/shimmer/Prod_shimmer";
import axios from "axios";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export type Filters = {
  priceRange?: number[] | null;
  category?: string | null;
  size?: string[] | null;
};

export default function Products() {
  const { products, setProducts, totalPages, setTotalPages } =
    useProductStore();
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    priceRange: [500, 5000],
    category: "",
    size: [],
  });

  const [filteredProducts, setFilteredProducts] = useState<ProductSchema[]>([]);
  const searchParams = useSearchParams();
  const limit = searchParams.get("limit");
  const category = searchParams.get("category");
  const q = searchParams.get("q");
  console.log("rendered");

  const getProducts = async () => {
    try {
      setIsFetching(true);
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/products?page=${currentPage}&limit=${limit || 5}`
      );
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
      console.log(response.data?.data?.products);
      const searchedProducts = response.data?.data?.products;
      console.log("totalPages: ", response.data?.data?.totalPages);
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
      console.log(q);
      searchProducts();
    }
  }, [q]);

  useEffect(() => {
    if (currentPage) {
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

  const handlePageClick = (page: number) => {
    console.log(page);
    router.push(`/products?page=${page}`);
  };

  return (
    <div className="flex gap-1">
      <Sidebar
        className="hidden md:inline-block w-1/4"
        setFilters={setFilters}
      />

      <div className="flex-1 px-2 md:px-4 mx-auto my-3 pb-10 w-full">
        {isFetching ? (
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

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => handlePageClick(i + 1)}
                    href="#"
                    isActive={currentPage === i + 1}
                    className={`hover:bg-gray-200 ${
                      currentPage === i + 1 ? "bg-stone-800 text-white" : ""
                    }`}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
