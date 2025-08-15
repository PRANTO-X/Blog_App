import React from "react";

const BlogCardSkeleton = () => {
  return (
    <div className="group bg-white shadow-md rounded-xl overflow-hidden animate-pulse">
      {/* Image Section */}
      <div className="relative h-50 w-full bg-gray-200">
        <div className="absolute top-4 left-4 bg-gray-300 rounded-full h-6 w-20"></div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Metadata Skeleton */}
        <div className="flex justify-between items-center text-sm mb-3">
          <div className="flex items-center gap-2">
            <div className="bg-gray-300 h-4 w-16 rounded"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-gray-300 h-4 w-12 rounded"></div>
          </div>
        </div>

        {/* Title Skeleton */}
        <div className="bg-gray-300 h-6 w-3/4 rounded mb-2"></div>

        {/* Excerpt Skeleton */}
        <div className="bg-gray-200 h-4 w-full rounded mb-1"></div>
        <div className="bg-gray-200 h-4 w-5/6 rounded"></div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
