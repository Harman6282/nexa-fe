import React from 'react';

const AddressShimmer = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm m-4 animate-pulse">
      {/* Main title shimmer */}
      <div className="mb-4 h-6 bg-gray-300 rounded w-1/3"></div>
      
      {/* Content lines shimmer */}
      <div className="mb-2 h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="mb-2 h-4 bg-gray-200 rounded w-1/3"></div>
      <div className="mb-4 h-4 bg-gray-200 rounded w-1/4"></div>

      {/* Button placeholders */}
      <div className="flex space-x-4">
        <div className="px-4 py-2 bg-gray-300 rounded w-16 h-8"></div>
        <div className="px-4 py-2 bg-gray-300 rounded w-20 h-8"></div>
      </div>
    </div>
  );
};

export default AddressShimmer;
