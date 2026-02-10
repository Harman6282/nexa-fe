"use client";

import { Wishlist } from "@/components/profile/Whishlist";
import Link from "next/link";
import { userStore } from "@/lib/store";

export default function Page() {
  const items = userStore((state) => state.wishlist);
  const count = items?.length ?? 0;

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-14 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                Your Wishlist
                <span className="ml-2 text-base font-medium text-gray-500 align-middle">
                  {count} items
                </span>
              </h1>
              <p className="mt-2 text-gray-600 max-w-2xl">
                Save products you love. Add them to your cart when you are ready.
              </p>
            </div>
            <div>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Continue shopping
              </Link>
            </div>
          </div>

          <div className="mt-10">
            {count > 0 ? (
              <Wishlist />
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-20 border rounded-xl border-gray-200 bg-gray-50">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-900 shadow-sm">
                  ❤
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Your wishlist is empty
                </h2>
                <p className="mt-2 text-gray-600 max-w-md">
                  Start exploring our collection and save items you love for later.
                </p>
                <Link
                  href="/products"
                  className="mt-6 inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Browse products
                </Link>
              </div>
            )}
          </div>
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-gray-100 blur-3xl"></div>
          <div className="absolute -bottom-24 left-[-10%] h-72 w-72 rounded-full bg-gray-100 blur-3xl"></div>
        </div>
      </section>
    </div>
  );
}
