import React, { createContext, useEffect, useState } from 'react';
import blogs from '../assets/assets';

const BlogContext = createContext();

 const BlogProvider = ({ children }) => {
  const [blogsState, setBlogsState] = useState(()=>{
    const savedBlogs = localStorage.getItem('blogs');
    return savedBlogs ? JSON.parse(savedBlogs) : blogs;
  });

  useEffect(()=>{
    localStorage.setItem('blogs',JSON.stringify(blogsState));
  },[blogsState]);

  const addBlog = (newBlog) => {
    setBlogsState(prev => [
      ...prev,
      { ...newBlog, id: Date.now(), createdAt: new Date().toLocaleString() }
    ]);
  };

  const deleteBlog = (id)=>{
    setBlogsState(prev=>prev.filter(blog=> blog.id !== id));
  }

  return (
    <BlogContext.Provider value={{ blogs: blogsState, addBlog,deleteBlog }}>
      {children}
    </BlogContext.Provider>
  );
};
export { BlogContext, BlogProvider };