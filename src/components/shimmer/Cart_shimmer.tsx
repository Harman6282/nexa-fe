export default function CartShimmer() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="h-6 w-6 bg-gray-200 rounded animate-pulse mr-4" />
          <div className="h-7 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-16 bg-gray-200 rounded animate-pulse ml-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items shimmer */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-600 mb-6">
                  <div className="h-4 w-4 bg-gray-200 rounded animate-pulse mr-2" />
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                </div>

                <div className="space-y-6">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 pb-6 border-b border-gray-100 last:border-b-0 "
                    >
                      <div className="w-20 h-28 bg-gray-200 rounded-lg animate-pulse flex-shrink-0" />

                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                            <div className="h-3 w-56 bg-gray-200 rounded animate-pulse" />
                            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                          </div>
                          <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
                        </div>

                        <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-gray-100 rounded-lg">
                            <div className="h-8 w-8 bg-gray-200 animate-pulse" />
                            <div className="h-8 w-10 bg-gray-200 animate-pulse" />
                            <div className="h-8 w-8 bg-gray-200 animate-pulse" />
                          </div>
                          <div className="flex gap-4">
                            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
                            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
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
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="h-5 w-48 bg-gray-200 rounded animate-pulse mb-4" />

              <div className="space-y-3 mb-6">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
                <hr className="my-4 text-gray-300" />
                <div className="flex justify-between items-center">
                  <div className="h-5 w-28 bg-gray-200 rounded animate-pulse" />
                  <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>

              <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse mb-4" />
              <div className="h-4 w-56 mx-auto bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
