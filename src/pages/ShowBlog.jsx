import React, { useContext,useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BlogContext } from '../contexts/BlogProvider';

const ShowBlog = () => {
  const {blogs} = useContext(BlogContext);
  const { id } = useParams();
  const blog = blogs.find((item) => item.id === parseInt(id));

  useEffect(() => {
  if (blog?.title) {
    document.title = blog.title;
  }
}, [blog])

  if (!blog) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h2 className="text-2xl font-bold text-red-500">Blog not found</h2>
        <Link to="/" className="text-blue-600 underline mt-4 block">Go Back Home</Link>
      </div>
    );
  }

  return (
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="lg:h-[500px] w-full overflow-hidden rounded-lg mb-8">
            <img
              loading='lazy'
              src={blog.img}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-sm text-gray-500 flex justify-between mb-2">
            <span>✍️ {blog.author}</span>
            <span>🕒 {blog.createdAt}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {blog.content}
          </p>
          <div className="mt-6">
            <Link to="/" className="text-blue-600 underline hover:text-blue-800">← Back to Blog List</Link>
          </div>
        </div>
      </div>
  );
};

export default ShowBlog;
