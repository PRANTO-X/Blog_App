// src/pages/News.jsx
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import CategoryBlogs from '../components/blog/CategoryBlogs';
import BlogDetail from '../components/blog/BlogDetail';

const News = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  if (slug) {
    return <BlogDetail blogSlug={slug} />;
  }

  if (category) {
    return <CategoryBlogs categorySlug={category} />;
  }

  return <CategoryBlogs categorySlug="All" />;
};

export default News;
