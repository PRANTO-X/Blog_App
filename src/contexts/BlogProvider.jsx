import React, { createContext, useEffect, useState } from 'react';
import blogs from '../api/mockApi';

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
    { ...newBlog, id: Date.now(), createdAt: new Date().toLocaleString() },
    ...prev
  ]);
  };



  return (
    <BlogContext.Provider value={{ blogs: blogsState, addBlog}}>
      {children}
    </BlogContext.Provider>
  );
};
export { BlogContext, BlogProvider };