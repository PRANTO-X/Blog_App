import React from 'react'

const Loader = () => {
  return (
     <div className="animate-pulse bg-slate-50  flex-grow flex flex-col p-6 max-w-7xl mx-auto min-h-[calc(100vh-10rem-10rem)]">
      {/* Replace 4rem with your actual navbar and footer height */}

      {/* Title skeleton */}
      <div className="h-10 bg-gray-300  rounded w-3/4 mb-8"></div>

      {/* Image skeleton */}
      <div className="relative w-full aspect-video bg-gray-300 rounded mb-8"></div>

      {/* Paragraph skeletons */}
      <div className="space-y-4 flex-grow">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  )
}

export default Loader