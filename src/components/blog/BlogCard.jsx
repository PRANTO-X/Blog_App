import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <Link
      to={`/news/${blog.id}`}
      className="group bg-white shadow-md rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      {/* Image Section */}
      <div className="relative h-50 w-full overflow-hidden">
        <img
          loading="lazy"
          src={blog.img}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Category Tag */}
        <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full">
          {blog.category}
        </span>
      </div>
      {/* Content Section */}
      <div className="p-5">
        {/* Metadata */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{blog.createdAt}</span>
          </div>
        </div>
        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">{blog.title}</h2>
        {/* Content Preview */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{blog.content}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
