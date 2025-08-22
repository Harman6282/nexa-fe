import React from "react";

const ProfileShimmer = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          {/* Profile Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-gray-100 animate-pulse"></div>

              {/* Profile Info */}
              <div className="space-y-2">
                <div className="h-6 w-20 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="h-10 w-24 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>

          {/* Navigation Pills */}
          <div className="flex gap-4 md:gap-8">
            <div className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-lg border border-gray-100">
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2 px-6 py-3">
              <div className="w-4 h-4 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-gray-100 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2 px-6 py-3">
              <div className="w-4 h-4 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-100 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Order History Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="h-8 w-36 bg-gray-100 rounded animate-pulse"></div>
            <div className="h-6 w-20 bg-gray-100 rounded animate-pulse"></div>
          </div>

          {/* Order Cards */}
          <div className="space-y-6">
            {[1, 2, 3].map((orderIndex) => (
              <div
                key={orderIndex}
                className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    {/* Order Icon */}
                    <div className="w-8 h-8 bg-gray-100 rounded animate-pulse"></div>

                    {/* Order Info */}
                    <div className="space-y-2">
                      <div className="h-5 w-64 bg-gray-100 rounded animate-pulse"></div>
                      <div className="h-4 w-20 bg-gray-100 rounded animate-pulse"></div>
                    </div>
                  </div>

                  {/* Order Status and Actions */}
                  <div className="flex items-center gap-4">
                    <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse"></div>
                    <div className="h-6 w-16 bg-gray-100 rounded animate-pulse"></div>
                    <div className="h-8 w-24 bg-gray-100 rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Product Items */}
                <div className="space-y-4">
                  {[1, 2, 3].map((itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-4">
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-gray-100 rounded-lg animate-pulse flex-shrink-0"></div>

                      {/* Product Info */}
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-full max-w-xs bg-gray-100 rounded animate-pulse"></div>
                        <div className="h-4 w-16 bg-gray-100 rounded animate-pulse"></div>
                        <div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileShimmer;
