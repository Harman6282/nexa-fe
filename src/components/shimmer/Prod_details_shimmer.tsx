"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsSkeleton() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
      {/* Breadcrumb Skeleton */}
      <div className="flex mb-6 gap-2">
        <Skeleton className="h-4 w-16 rounded" />
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 w-20 rounded" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Product Image + thumbnails */}
        <div className="space-y-4">
          <Skeleton className="w-full aspect-square rounded-lg" />
          <div className="flex gap-3 overflow-x-auto pb-2">
            <Skeleton className="w-20 h-20 rounded-lg flex-shrink-0" />
            <Skeleton className="w-20 h-20 rounded-lg flex-shrink-0" />
            <Skeleton className="w-20 h-20 rounded-lg flex-shrink-0" />
            <Skeleton className="w-20 h-20 rounded-lg flex-shrink-0" />
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <Skeleton className="h-6 w-28 rounded-lg" /> {/* brand tag */}
            <Skeleton className="h-10 w-3/4 rounded-lg" /> {/* product title */}
            <Skeleton className="h-6 w-32 rounded" /> {/* rating */}
          </div>
          <Skeleton className="h-12 w-40 rounded-lg" /> {/* price */}
          <div className="space-y-2 pt-4 border-t border-[#D6C0B3]/20">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
            <Skeleton className="h-4 w-4/6 rounded" />
          </div>
          <div className="pt-4 border-t border-[#D6C0B3]/20 space-y-3">
            <Skeleton className="h-6 w-16 rounded" /> {/* Size label */}
            <div className="flex gap-3">
              <Skeleton className="h-12 w-16 rounded-lg" />
              <Skeleton className="h-12 w-16 rounded-lg" />
              <Skeleton className="h-12 w-16 rounded-lg" />
              <Skeleton className="h-12 w-16 rounded-lg" />
            </div>
          </div>
          <div className="pt-4 border-t border-[#D6C0B3]/20 space-y-4">
            <div className="space-y-3">
              <Skeleton className="h-6 w-24 rounded" /> {/* Quantity label */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-lg" /> {/* qty - */}
                <Skeleton className="h-6 w-12 rounded" /> {/* qty num */}
                <Skeleton className="h-10 w-10 rounded-lg" /> {/* qty + */}
              </div>
            </div>
            <Skeleton className="h-14 w-full rounded-lg" /> {/* add to cart */}
            <Skeleton className="h-14 w-full rounded-lg" /> {/* wishlist */}
          </div>
        </div>
      </div>
    </div>
  );
}
