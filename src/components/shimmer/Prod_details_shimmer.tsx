"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsSkeleton() {
  return (
    <div className=" w-3/4 mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 animate-pulse">
      {/* Left: Product Image + thumbnails */}
      <div>
        <Skeleton className="w-full h-[500px] rounded-2xl" />
        <div className="flex gap-3 mt-4">
          <Skeleton className="w-20 h-20 rounded-md" />
          <Skeleton className="w-20 h-20 rounded-md" />
          <Skeleton className="w-20 h-20 rounded-md" />
          <Skeleton className="w-20 h-20 rounded-md" />
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="flex flex-col gap-4">
        <Skeleton className="h-6 w-28 rounded-md" /> {/* category tag */}
        <Skeleton className="h-8 w-3/4 rounded-md" /> {/* product title */}
        <Skeleton className="h-7 w-32 rounded-md" /> {/* price */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex gap-3 mt-4">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
        <div className="flex items-center gap-3 mt-6">
          <Skeleton className="h-10 w-10 rounded-md" /> {/* qty - */}
          <Skeleton className="h-10 w-16 rounded-md" /> {/* qty num */}
          <Skeleton className="h-10 w-10 rounded-md" /> {/* qty + */}
        </div>
        <Skeleton className="h-12 w-full mt-6 rounded-lg" /> {/* add to cart */}
        <Skeleton className="h-10 w-full rounded-lg" /> {/* wishlist */}
      </div>
    </div>
  );
}
