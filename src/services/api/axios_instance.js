import axios from "axios";
import { BASE_URL } from "./base_url";

// simple axios instance with base configuration for public API
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000, // 15 seconds timeout for public API
});

// reusable API methods
export const apiService = {
  // GET request
  get: async (url, params = {}) => {
    try {
      const response = await apiClient.get(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST request
  post: async (url, data = {}) => {
    try {
      const response = await apiClient.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PUT request
  put: async (url, data = {}) => {
    try {
      const response = await apiClient.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PATCH request
  patch: async (url, data = {}) => {
    try {
      const response = await apiClient.patch(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // DELETE request
  delete: async (url) => {
    try {
      const response = await apiClient.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;
