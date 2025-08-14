// src/components/blog/CategoryBlogs.jsx
import React, { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import BlogCard from "./BlogCard";
import { IoMdHome } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { TfiFaceSad } from "react-icons/tfi";
import { RxCross2 } from "react-icons/rx";
import useCategories from "../../hooks/useCategories";
import useBlogs from "../../hooks/useBlogs";

const CategoryBlogs = ({ categorySlug: propCategorySlug }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categorySlug = propCategorySlug || searchParams.get("category");
  const tagsFilter = searchParams.get("tags");

  const [showBreaking, setShowBreaking] = useState(false);
  const [showTrending, setShowTrending] = useState(false);
  const [mobileFilter, setMobileFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch categories for sidebar
  const { categories } = useCategories();

  // Build dynamic filters for API
  const filters = useMemo(() => {
    const apiFilters = {
      limit: 12,
      offset: 0,
    };

    // Add tags filter (takes priority over category)
    if (tagsFilter) {
      apiFilters.tags = tagsFilter;
    } else if (categorySlug && categorySlug !== "All") {
      // Add category filter if not 'All' and no tags filter
      const category = categories.find((cat) => cat.slug === categorySlug);
      if (category) {
        apiFilters.category = category.id;
      }
    }

    // Add breaking news filter
    if (showBreaking) {
      apiFilters.is_breaking_news = true;
    }

    // Add trending filter
    if (showTrending) {
      apiFilters.is_trending = true;
    }

    // Add search filter
    if (searchTerm.trim()) {
      apiFilters.search = searchTerm.trim();
    }

    return apiFilters;
  }, [
    categorySlug,
    categories,
    showBreaking,
    showTrending,
    searchTerm,
    tagsFilter,
  ]);

  // Fetch blogs with dynamic filters
  const { blogs, loading, error, refetch } = useBlogs(filters);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobileFilter);
    return () => document.body.classList.remove("overflow-hidden");
  }, [mobileFilter]);

  // Get current category info
  const currentCategory = useMemo(() => {
    if (!categorySlug || categorySlug === "All")
      return { title: "All", slug: "All" };
    return (
      categories.find((cat) => cat.slug === categorySlug) || {
        title: categorySlug,
        slug: categorySlug,
      }
    );
  }, [categorySlug, categories]);

  // Count blogs for filter display (from API data)
  const breakingCount = useMemo(() => {
    return blogs.filter((b) => b.is_breaking_news).length;
  }, [blogs]);

  const trendingCount = useMemo(() => {
    return blogs.filter((b) => b.is_trending).length;
  }, [blogs]);

  // Since filtering is now handled by API, we use blogs directly
  const filteredBlogs = blogs;

  const headerTitle = useMemo(() => {
    let title = "";

    if (tagsFilter) {
      title = `Tagged Posts`;
    } else {
      title = currentCategory.title;
    }

    if (showBreaking) title += " - Breaking News";
    if (showTrending) title += " - Trending";

    return title;
  }, [currentCategory.title, showBreaking, showTrending, tagsFilter]);

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-8 py-5 md:py-8">
        {/* Left side */}
        <main className="w-full md:w-2/3 lg:w-3/4">
          <ul className="inline-flex items-center space-x-1 md:space-x-3 mb-8">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="flex gap-1.5 items-center text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                <IoMdHome /> Home
              </Link>
            </li>

            <li className="flex gap-2 items-center text-gray-700">
              <FaAngleRight />
              <Link className=" hover:text-indigo-600 transition-colors duration-200">
                News
              </Link>
            </li>

            <li className="flex gap-2 items-center text-gray-700">
              <FaAngleRight />
              <span>{headerTitle}</span>
            </li>
          </ul>

          <header className="flex justify-between  items-center pb-6 mb-6 md:mb-8 border-b border-gray-200">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl md:text-3xl font-bold text-gray-900 ">
                {headerTitle}
              </h1>
              {tagsFilter && (
                <Link
                  to="/news?category=All"
                  className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                >
                  ← Clear tags filter
                </Link>
              )}
            </div>

            <div className="pl-2">
              <button
                onClick={() => setMobileFilter(true)}
                className="md:hidden px-2 py-1 border rounded-md flex items-center gap-1"
              >
                <CiFilter className="size-5" />
                Filters
              </button>
            </div>
          </header>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-gray-300 h-64 rounded-lg"
                ></div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Failed to Load Blogs
              </h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={refetch}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : filteredBlogs?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center text-center items-center gap-2.5 md:gap-3.5 pt-6 sm:pt-12">
              <TfiFaceSad className="size-18 md:size-24 lg:size-28" />
              <h1 className="text-xl md:text-3xl ">No Blog found</h1>
              <p>
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
            </div>
          )}
        </main>

        {/* Right side */}
        <aside className="hidden md:block w-full md:w-1/3 lg:w-1/4 border-l pl-5">
          <div className="sticky top-8 mt-3.5">
            <div className="flex flex-col gap-5">
              <div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search news..."
                  className="border p-2 rounded-md focus:outline-indigo-600"
                />
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Filter by Type</h3>

                <div className="flex flex-col gap-2.5 mb-6">
                  <label
                    htmlFor="breaking"
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      onChange={(e) => setShowBreaking(e.target.checked)}
                      id="breaking"
                      type="checkbox"
                      className="mr-3 w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 cursor-pointer hover:ring-indigo-600 focus:ring-indigo-600"
                    />
                    <span
                      className={`${
                        showBreaking
                          ? "font-bold text-indigo-600"
                          : "hover:text-indigo-600"
                      } text-lg transition duration-300`}
                    >
                      Breaking News ({breakingCount})
                    </span>
                  </label>

                  <label
                    htmlFor="trending"
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      onChange={(e) => setShowTrending(e.target.checked)}
                      id="trending"
                      type="checkbox"
                      className=" mr-3 w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 cursor-pointer hover:ring-indigo-600 focus:ring-indigo-600"
                    />
                    <span
                      className={`${
                        showTrending
                          ? "font-bold text-indigo-600"
                          : "hover:text-indigo-600"
                      } text-lg transition duration-300`}
                    >
                      Trending Blogs ({trendingCount})
                    </span>
                  </label>
                </div>

                <div className="">
                  <h3 className="text-lg font-semibold mb-2.5">Category</h3>
                  <ul className="flex flex-col gap-3">
                    {/* All Categories Option */}
                    <li>
                      <Link
                        className={`transition duration-300 text-lg ${
                          !categorySlug || categorySlug === "All"
                            ? "font-bold text-indigo-600"
                            : "hover:text-indigo-600"
                        }`}
                        to="/news?category=All"
                      >
                        All
                      </Link>
                    </li>
                    {/* Dynamic Categories from API */}
                    {categories.map((category) => {
                      const isActive = categorySlug === category.slug;
                      return (
                        <li key={category.id}>
                          <Link
                            className={`transition duration-300 text-lg ${
                              isActive
                                ? "font-bold text-indigo-600"
                                : "hover:text-indigo-600"
                            }`}
                            to={`/news?category=${encodeURIComponent(
                              category.slug
                            )}`}
                          >
                            {category.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Menu */}
      {mobileFilter && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300" />
      )}

      <div
        className={`${
          mobileFilter ? "translate-x-0" : "translate-x-full"
        } md:hidden transition-transform duration-300 ease-in-out fixed right-0 top-0 bottom-0 w-[80%] bg-white z-[100] flex flex-col`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5">
            <h3 className="text-xl text-indigo-600 font-bold">Filter</h3>
            <RxCross2
              onClick={() => setMobileFilter(false)}
              className="text-2xl"
            />
          </div>

          <div className="flex flex-col gap-5 border-t pt-4 flex-1">
            <div className="px-5">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search news..."
                className="w-full border p-2 rounded-md focus:outline-indigo-600"
              />
            </div>

            <div className="px-5 pb-3">
              <h3 className="text-lg font-semibold mb-2">Filter by Type</h3>

              <div className="flex flex-col gap-2 mb-5">
                <label
                  htmlFor="breaking"
                  className="flex items-center cursor-pointer"
                >
                  <input
                    onChange={(e) => setShowBreaking(e.target.checked)}
                    id="breaking"
                    type="checkbox"
                    className="mr-3 w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 cursor-pointer hover:ring-indigo-600 focus:ring-indigo-600"
                  />
                  <span
                    className={`${
                      showBreaking
                        ? "font-bold text-indigo-600"
                        : "hover:text-indigo-600"
                    } text-lg`}
                  >
                    Breaking News ({breakingCount})
                  </span>
                </label>

                <label
                  htmlFor="trending"
                  className="flex items-center cursor-pointer"
                >
                  <input
                    onChange={(e) => setShowTrending(e.target.checked)}
                    id="trending"
                    type="checkbox"
                    className="mr-3 w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 cursor-pointer hover:ring-indigo-600 focus:ring-indigo-600"
                  />
                  <span
                    className={`${
                      showTrending
                        ? "font-bold text-indigo-600"
                        : "hover:text-indigo-600"
                    } text-lg`}
                  >
                    Trending News ({trendingCount})
                  </span>
                </label>
              </div>

              <div className="flex flex-col">
                <h3 className="text-lg font-semibold mb-2.5">Category</h3>
                <ul className="flex flex-col gap-3 pb-8 overflow-y-auto max-h-[calc(100vh-400px)]">
                  {/* All Categories Option */}
                  <li>
                    <Link
                      className={`transition duration-300 text-lg ${
                        !categorySlug || categorySlug === "All"
                          ? "font-bold text-indigo-600"
                          : "hover:text-indigo-600"
                      }`}
                      to="/news?category=All"
                      onClick={() => setMobileFilter(false)}
                    >
                      All
                    </Link>
                  </li>
                  {/* Dynamic Categories from API */}
                  {categories.map((category) => {
                    const isActive = categorySlug === category.slug;
                    return (
                      <li key={category.id}>
                        <Link
                          className={`transition duration-300 text-lg ${
                            isActive
                              ? "font-bold text-indigo-600"
                              : "hover:text-indigo-600"
                          }`}
                          to={`/news?category=${encodeURIComponent(
                            category.slug
                          )}`}
                          onClick={() => setMobileFilter(false)}
                        >
                          {category.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBlogs;
