import React from 'react';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';
import { BsArrowRight } from "react-icons/bs";
import useCategories from '../../hooks/useCategories';
import useBlogs from '../../hooks/useBlogs';

const BlogList = () => {
  // Fetch categories from API
  const { categories } = useCategories();
  
  // Fetch all blogs to organize by category
  const { blogs } = useBlogs({ limit: 50 }); // Get more blogs to distribute across categories
  

  return (
    <>
      {categories
        .filter(category => category.slug !== 'All')
        .map(category => {
          // Filter blogs by category and limit to 3
          const blogsByCategory = blogs
            .filter(blog => blog.category_name === category.title || blog.categoryName === category.title)
            .slice(0, 3);

          if (blogsByCategory.length === 0) return null;

          return (
            <section key={category.id} className="mb-10 md:mb-12">
              <div className="flex items-center gap-3.5 border-l-4 border-indigo-600 pl-2 mb-7">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{category.title}</h2>
                <span className="flex-1 border-t border-indigo-600"></span>
                <Link
                  to={`/news?category=${encodeURIComponent(category.slug)}`}
                  className="flex items-center gap-1  md:text-xl font-semibold text-gray-500 hover:text-indigo-600 duration-300 ease-in-out"
                >
                  View All <BsArrowRight />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogsByCategory.map(blog => (
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