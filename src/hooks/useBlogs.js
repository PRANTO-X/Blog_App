import { useState, useEffect } from "react";
import { blogService } from "../services/api/blogService";

const useBlogs = (filters = {}) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function for blog data formatting
  const formatBlogData = (blog) => ({
    ...blog,
    slug: blog.slug || blog.id, 
    imageUrl:
      blog.featured_image?.image ||
      blog.img ||
      "https://images.unsplash.com/photo-1516321310762-0c623066013b",
    imageAlt:
      blog.featured_image?.alt_text ||
      blog.featured_image?.title ||
      `Blog thumbnail for ${blog.title}`,
    categoryName: blog.category_name || blog.category || "General",
    excerpt: blog.excerpt || "",
    author: blog.author_name || blog.author || "Unknown",
    publishedDate: blog.published_date
      ? new Date(blog.published_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : blog.createdAt || "Recently",
    tags: blog.tags || [],
    source: blog.source || null,
    viewCount: blog.view_count || 0,
    isBreaking: blog.is_breaking_news || false,
    isTrending: blog.is_trending || false,
    isFeatured: blog.is_featured || false,
  });

  // Fetch blogs with any combination of filters
  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);

    try {
      let response;

      // If fetching by slug, use getBlogBySlug
      if (filters.slug) {
        response = await blogService.getBlogBySlug(filters.slug);
        // If single blog response, wrap in results array format
        if (response?.data && !response.data.results) {
          response = { data: { results: [response.data] } };
        }
      } else {
        // Use getAllBlogs with provided filters
        response = await blogService.getAllBlogs(filters);
      }

      if (response?.data?.results) {
        const formattedBlogs = response.data.results.map(formatBlogData);
        setBlogs(formattedBlogs);
      } else {
        setBlogs([]);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(err.message || "Failed to fetch blogs");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  // Refetch function for retry functionality
  const refetch = () => {
    fetchBlogs();
  };

  // Fetch on mount or when filters change
  useEffect(() => {
    fetchBlogs();
  }, [JSON.stringify(filters)]);

  return {
    blogs,
    loading,
    error,
    refetch,
  };
};

export default useBlogs;
