import React, { useEffect } from "react";
import BlogList from "../components/blog/BlogList";
import useBlogs from "../hooks/useBlogs";
import CardArrangementOne from "../components/common/CardArrangementOne";

const Home = () => {
  // Fetch trending blogs using the simplified hook
  const {
    blogs: trendingBlogs,
    loading: trendingLoading,
    error: trendingError,
    refetch: refetchTrending,
  } = useBlogs({
    is_trending: true,
    limit: 3,
  });

  // Fetch breaking news using the simplified hook
  const {
    blogs: breakingBlogs,
    loading: breakingLoading,
    error: breakingError,
    refetch: refetchBreaking,
  } = useBlogs({
    is_breaking_news: true,
    offset:3,
    limit: 3,
  });

  useEffect(() => {
    document.title = "Home | My Blog App";
  }, []);

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-10">
      {/* Trending Blogs */}
      <CardArrangementOne
        title="Trending Blogs"
        blogs={trendingBlogs}
        loading={trendingLoading}
        error={trendingError}
        refetch={refetchTrending}
      />

      {/* Breaking News */}
      <CardArrangementOne
        title="Breaking News"
        blogs={breakingBlogs}
        loading={breakingLoading}
        error={breakingError}
        refetch={refetchBreaking}
      />

      {/* Blog list */}
      <div>
        <BlogList />
      </div>
    </div>
  );
};

export default Home;
