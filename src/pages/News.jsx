// src/pages/News.jsx
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import CategoryBlogs from '../components/blog/CategoryBlogs';
import BlogDetail from '../components/blog/BlogDetail';

const News = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  if (id) {
    return <BlogDetail />;
  }

  if (category) {
    return <CategoryBlogs />;
  }

  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold">Please select a category</h2>
    </div>
  );
};

export default News;
