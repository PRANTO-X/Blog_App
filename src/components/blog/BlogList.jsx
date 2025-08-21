import React from "react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import { BsArrowRight } from "react-icons/bs";
import useCategories from "../../hooks/useCategories";
import useBlogs from "../../hooks/useBlogs";

const BlogList = () => {
  // Fetch categories from API
  const { categories } = useCategories();

  // Fetch all blogs to organize by category
  const { loading, error, blogs, refetch } = useBlogs({ limit: 50 });

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

    if (loading) {
    // Skeletons in the same grid layout as BlogCard
    return (
      <section className="mb-10 md:mb-12">
        <div className="flex items-center gap-3.5 border-l-4 border-indigo-600 pl-2 mb-7">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Loading...</h2>
          <span className="flex-1 border-t border-indigo-600"></span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white  rounded-lg overflow-hidden shadow"
            >
              {/* Image placeholder */}
              <div className="h-48 bg-gray-300 "></div>

              <div className="p-4 space-y-3">
                {/* Title */}
                <div className="h-6 bg-gray-300  rounded w-3/4"></div>
                {/* Excerpt */}
                <div className="h-4 bg-gray-300  rounded w-full"></div>
                <div className="h-4 bg-gray-300  rounded w-5/6"></div>
                {/* Button */}
                <div className="h-8 bg-gray-300  rounded w-24 mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      {categories
        .filter((category) => category.slug !== "All")
        .map((category) => {
          // Filter blogs by category and limit to 3
          const blogsByCategory = blogs
            .filter(
              (blog) =>
                blog.category_name === category.title ||
                blog.categoryName === category.title
            )
            .slice(0, 3);

          if (blogsByCategory.length === 0) return null;

          return (
            <section key={category.id} className="mb-10 md:mb-12">
              <div className="flex items-center gap-3.5 border-l-4 border-indigo-600 pl-2 mb-7">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                  {category.title}
                </h2>
                <span className="flex-1 border-t border-indigo-600"></span>
                <Link
                  to={`/news?category=${encodeURIComponent(category.slug)}`}
                  className="flex items-center gap-1 md:text-xl font-semibold text-gray-500 hover:text-indigo-600 duration-300 ease-in-out"
                >
                  View All <BsArrowRight />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogsByCategory.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            </section>
          );
        })}
    </>
  );
};

export default BlogList;
