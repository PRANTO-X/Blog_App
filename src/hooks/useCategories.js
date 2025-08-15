import { useState, useEffect } from "react";
import { blogService } from "../services/api/blogService";

const useCategories = (filters = {}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debug: Log categories state changes
  useEffect(() => {
    console.log("categories state updated:", categories);
  }, [categories]);

  // Fetch categories from API
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await blogService.getCategories(filters);
      console.log("category response", response);
      setCategories(response.data.results);
    } catch (err) {
      console.error("Failed to fetch categories from API:", err);
      setError(err.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories on mount or when filters change
  useEffect(() => {
    console.log("useCategories useEffect triggered with filters:", filters);
    fetchCategories();
  }, [JSON.stringify(filters)]);


  return {
    categories,
    loading,
    error,
  };
};

export default useCategories;
