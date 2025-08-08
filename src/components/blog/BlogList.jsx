import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BlogContext } from '../../contexts/BlogProvider';
import BlogCard from './BlogCard';

const BlogList = () => {
  const { blogs } = useContext(BlogContext);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs?.length > 0 ? (
          blogs.map(blog => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;