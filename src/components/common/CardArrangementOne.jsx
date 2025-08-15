import React from "react";
import { Link } from "react-router-dom";

export default function CardArrangementOne ({blogs=[], loading=false, error=null, refetch, title=""}) {

// Loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 mb-10">
        <div className="animate-pulse bg-gray-300 h-64 rounded-lg"></div>
        <div className="flex flex-col gap-3">
          <div className="animate-pulse bg-gray-300 h-28 rounded-lg"></div>
          <div className="animate-pulse bg-gray-300 h-28 rounded-lg"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 mb-2">
          <svg
            className="w-12 h-12 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Failed to Load Trending Blogs
        </h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={refetch}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty state
  if (blogs.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <div className="text-gray-400 mb-2">
          <svg
            className="w-12 h-12 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          No Trending Blogs Available
        </h3>
        <p className="text-gray-500">Check back later for trending content.</p>
      </div>
    );
  }
    return(
        <div>
            <div className="flex items-center gap-3.5  border-l-4 border-indigo-600 pl-2 mb-6">
              <h2 className='text-2xl md:text-3xl font-bold'>{title}</h2>
              <span className='border-1 flex-1 border-indigo-600'></span>
            </div>
            <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 mb-10">
                    {/* Left Side */}
                    {blogs[0] && (
                      <div className="">
                        <Link
                          to={`/news/${blogs[0].slug}`}
                          className="relative overflow-hidden block h-full group"
                        >
                          <div className=" h-full">
                            <div className="h-full overflow-hidden">
                              <img
                                src={blogs[0].imageUrl}
                                alt={blogs[0].imageAlt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 bg-black/50"
                                loading="lazy"
                                onError={(e) => {
                                  e.target.src =
                                    "https://images.unsplash.com/photo-1516321310762-0c623066013b";
                                }}
                              />
                            </div>
                            <div className="absolute bottom-0 left-0 z-10 w-full p-6 text-white sm:p-8 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                              <span className="bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                                {blogs[0].categoryName}
                              </span>
                              <h2 className="text-white font-bold my-2 text-xl md:text-2xl line-clamp-2">
                                {blogs[0].title}
                              </h2>
                              <p className="text-white text-sm md:text-[16px]">
                                {blogs[0].publishedDate}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    )}
                    {/* Right Side*/}
                    {blogs.length > 1 && (
                      <div className="flex flex-col gap-5 md:gap-3 h-full">
                        {blogs.slice(1, 3).map((item) => (
                          <Link
                            key={item.id}
                            to={`/news/${item.slug}`}
                            className="flex flex-col md:flex-row gap-2 flex-1 group"
                          >
                            {/* Image Section */}
                            <div className="w-full md:w-1/2 h-52 md:h-auto overflow-hidden flex items-center">
                              <img
                                src={item.imageUrl}
                                alt={item.imageAlt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                                onError={(e) => {
                                  e.target.src =
                                    "https://images.unsplash.com/photo-1516321310762-0c623066013b";
                                }}
                              />
                            </div>
                            {/* Text Section */}
                            <div className="w-full md:w-2/3 flex flex-col justify-center">
                              <span className="bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full self-start">
                                {item.categoryName}
                              </span>
                              <h2 className="text-slate-900 font-bold my-2 md:text-xl line-clamp-2">
                                {item.title}
                              </h2>
                              <p className="text-slate-900 text-sm md:text-[16px]">
                                {item.publishedDate}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
            </div>
        </div>
    )
}