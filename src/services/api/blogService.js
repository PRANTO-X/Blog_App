import { apiService } from "./axios_instance";

// Blog service for API operations
export const blogService = {
  // Get all blogs with optional parameters
  getAllBlogs: async (params = {}) => {
    try {
      return await apiService.get("/news/public/news/", params);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      throw error;
    }
  },

  // Get single blog by ID
  getBlogById: async (id) => {
    try {
      return await apiService.get(`/news/public/news/${id}/`);
    } catch (error) {
      console.error("Error fetching blog:", error);
      throw error;
    }
  },

  // Get single blog by slug
  getBlogBySlug: async (slug) => {
    try {
      return await apiService.get(`/news/public/news/${slug}/`);
    } catch (error) {
      console.error("Error fetching blog by slug:", error);
      throw error;
    }
  },

  // Get breaking news
  getBreakingNews: async (params = {}) => {
    try {
      return await apiService.get("/news/public/news/", {
        ...params,
        is_breaking_news: true,
      });
    } catch (error) {
      console.error("Error fetching breaking news:", error);
      throw error;
    }
  },

  // Get trending blogs
  getTrendingBlogs: async (params = {}) => {
    try {
      return await apiService.get("/news/public/news/", {
        ...params,
        trending: true,
      });
    } catch (error) {
      console.error("Error fetching trending blogs:", error);
      throw error;
    }
  },

  // Get categories with optional filters
  getCategories: async (params = {}) => {
    try {
      return await apiService.get("/news/public/categories/", params);
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // Search blogs
  searchBlogs: async (query, params = {}) => {
    try {
      return await apiService.get("/news/public/news/", {
        ...params,
        search: query,
      });
    } catch (error) {
      console.error("Error searching blogs:", error);
      throw error;
    }
  },
};

export default blogService;
