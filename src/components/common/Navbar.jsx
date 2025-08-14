import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import {
  FaFacebook,
  FaTwitter,
  FaInstagramSquare,
  FaYoutube,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Fetch categories from API
  const { categories, loading, error } = useCategories();

  // Scroll logic
  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 150;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobileMenu);
    return () => document.body.classList.remove("overflow-hidden");
  }, [mobileMenu]);

  return (
    <header className="py-5 flex flex-col gap-5 md:gap-8">
      {/* Top Navbar */}
      <nav className="container mx-auto px-4 max-w-7xl sm:px-6 lg:px-8 flex justify-between items-center">
        <ul className="hidden md:flex gap-5 items-center">
          <li>
            <a href="" className="social-icon">
              <FaFacebook />
            </a>
          </li>
          <li>
            <a href="" className="social-icon">
              <FaInstagramSquare />
            </a>
          </li>
          <li>
            <a href="" className="social-icon">
              <FaTwitter />
            </a>
          </li>
          <li>
            <a href="" className="social-icon">
              <FaYoutube />
            </a>
          </li>
        </ul>
        <div>
          <Link
            to="/"
            className="text-slate-800 text-2xl md:text-3xl lg:text-4xl font-bold"
          >
            Blog<span className="text-indigo-600">App</span>
          </Link>
        </div>
        <Link
          className="md:text-xl bg-indigo-600 text-white px-5 py-2 rounded-lg"  
        >
          Log in
        </Link>
      </nav>

      {/* Categories Bar */}
      <div className="border-y border-indigo-600">
        <div className="container mx-auto px-4 max-w-7xl sm:px-6 lg:px-8 relative">
          <RiMenu2Fill
            onClick={() => setMobileMenu(true)}
            className="sm:hidden my-2.5 size-6 text-indigo-600"
          />

          {/* Arrows */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="lg:hidden absolute top-1/2 -translate-y-1/2 left-0 size-6 rounded-full bg-indigo-600 flex justify-center items-center z-10"
            >
              <FaArrowLeft className="text-white text-sm" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="lg:hidden absolute top-1/2 -translate-y-1/2 right-0 size-6 rounded-full bg-indigo-600 flex justify-center items-center z-10"
            >
              <FaArrowRight className="text-white text-sm" />
            </button>
          )}

          {loading ? (
            <div className="hidden sm:flex py-3.5 items-center justify-center">
              <div className="animate-spin w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
              <span className="ml-2 text-gray-600">Loading categories...</span>
            </div>
          ) : error ? (
            <div className="hidden sm:flex py-3.5 items-center justify-center">
              <span className="text-red-600">Failed to load categories</span>
            </div>
          ) : (
            <ul
              ref={scrollRef}
              className="gap-6 lg:gap-0 hidden sm:flex lg:justify-between py-3.5 overflow-x-auto items-center whitespace-nowrap no-scrollbar scroll-smooth"
            >
              {(categories || []).map((category) => (
                <li key={category.id}>
                  <Link
                    className="font-bold hover:text-indigo-600 transition duration-300"
                    to={`/news?category=${encodeURIComponent(category.slug)}`}
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300" />
      )}

      <div
        className={`${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        } sm:hidden transition-transform duration-300 ease-in-out fixed left-0 top-0 bottom-0 w-80 max-h-[100vh] bg-white z-[100] flex flex-col`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between pb-5 p-5">
            <h3 className="text-xl text-indigo-600 font-bold">Menu</h3>
            <RxCross2
              onClick={() => setMobileMenu(false)}
              className="text-2xl"
            />
          </div>

          <div className="border-t border-gray-300 p-6 flex-1 overflow-y-auto">
            <h4 className="uppercase text-gray-600 mb-4">Categories</h4>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
                <span className="ml-2 text-gray-600">Loading...</span>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <span className="text-red-600">Failed to load categories</span>
              </div>
            ) : (
              <ul className="flex flex-col gap-4.5 pl-2.5 overflow-y-auto max-h-[calc(100vh-150px)]">
                {categories.map((category, index) => (
                  <li key={category.id || index}>
                    <Link
                      className="font-bold hover:text-indigo-600 transition duration-300"
                      to={`/news?category=${encodeURIComponent(
                        category.slug
                      )}`}
                      onClick={() => setMobileMenu(false)}
                    >
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
