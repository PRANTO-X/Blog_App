import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BlogContext } from '../../contexts/BlogProvider';
import BlogCard from './BlogCard';
import { BsArrowRight } from "react-icons/bs";
import { categoryList } from '../../assets/assets';

const BlogList = () => {
  const { blogs } = useContext(BlogContext);

  return (
    <>
      {categoryList
        .filter(category => category !== 'All')
        .map(category => {

          const blogsByCategory = blogs.filter(blog => blog.category === category).slice(0, 3);

          if (blogsByCategory.length === 0) return null;

          return (
            <section key={category} className="mb-10 md:mb-12">
              <div className="flex items-center gap-3.5 border-l-4 border-indigo-600 pl-2 mb-7">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{category}</h2>
                <span className="flex-1 border-t border-indigo-600"></span>
                <Link
                  to={`/news?category=${encodeURIComponent(category)}`}
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