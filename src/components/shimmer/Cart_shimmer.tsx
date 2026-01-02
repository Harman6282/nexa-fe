import { Skeleton } from "@/components/ui/skeleton";

export default function CartShimmer() {
  return (
    <main className="flex-1 bg-background-light min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {/* Breadcrumb Skeleton */}
        <div className="flex mb-6 gap-2">
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-32 rounded" />
        </div>

        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Skeleton className="h-10 w-48 rounded-lg mb-2" />
            <Skeleton className="h-5 w-24 rounded" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items shimmer */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-[#D6C0B3]/20">
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-6 pb-4 border-b border-[#D6C0B3]/20">
                  <Skeleton className="h-4 w-4 rounded mr-2" />
                  <Skeleton className="h-4 w-32 rounded" />
                </div>

                <div className="space-y-6">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 pb-6 border-b border-[#D6C0B3]/20 last:border-b-0"
                    >
                      <Skeleton className="w-24 h-32 md:w-28 md:h-36 rounded-lg flex-shrink-0" />

                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2 flex-1">
                            <Skeleton className="h-5 w-24 rounded" />
                            <Skeleton className="h-4 w-56 rounded" />
                            <Skeleton className="h-3 w-20 rounded" />
                          </div>
                          <Skeleton className="h-8 w-8 rounded-lg" />
                        </div>

                        <Skeleton className="h-6 w-24 rounded" />

                        <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
                          <Skeleton className="h-10 w-32 rounded-lg" />
                          <div className="flex gap-2">
                            <Skeleton className="h-9 w-24 rounded-lg" />
                            <Skeleton className="h-9 w-24 rounded-lg" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Price Summary shimmer */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-[#D6C0B3]/20 p-6 sticky top-8">
              <Skeleton className="h-6 w-40 rounded-lg mb-6" />
              <Skeleton className="h-4 w-24 rounded mb-4" />

              <div className="space-y-4 mb-6">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <Skeleton className="h-4 w-28 rounded" />
                    <Skeleton className="h-4 w-16 rounded" />
                  </div>
                ))}
                <div className="border-t border-[#D6C0B3]/20 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-32 rounded" />
                    <Skeleton className="h-8 w-24 rounded" />
                  </div>
                </div>
              </div>

              <Skeleton className="h-14 w-full rounded-lg mb-4" />
              <Skeleton className="h-3 w-56 mx-auto rounded" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
