import React from "react";

const BlogCardSkeleton = () => {
  return (
    <div className="group bg-white shadow-md rounded-xl overflow-hidden animate-pulse">
      {/* Image Section */}
      <div className="relative h-50 w-full overflow-hidden bg-gray-200">
        {/* Category Tag Placeholder */}
        <span className="absolute top-4 left-4 w-20 h-6 bg-gray-300 rounded-full"></span>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Metadata */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <div className="w-20 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <div className="w-16 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Title */}
        <div className="w-full h-5 bg-gray-300 rounded mb-2"></div>
        <div className="w-3/4 h-5 bg-gray-300 rounded mb-4"></div>

        {/* Content Preview */}
        <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
