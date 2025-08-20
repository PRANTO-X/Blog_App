// hooks/useComment.js
import { useState, useEffect } from "react";
import apiService from "../services/api/axios_instance";

const useComment = ({ blogId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);

  const commentService = {
    getAllComments: async () => {
      try {
        return await apiService.get("/news/public/comments/");
      } catch (err) {
        throw err;
      }
    },

    postComment: async ({ name, email, content, parent = 0 }) => {
      try {
        const payload = { news: blogId, name, email, content, parent };
        return await apiService.post(
          "/news/public/comment-submissions/submit-comment/",
          payload
        );
      } catch (error) {
        console.error("Error posting comment:", error);
        throw error;
      }
    },
  };

  const fetchComments = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await commentService.getAllComments();
      if (response?.data) {
        console.log(response.data);
        
        const blogComments = response.data.results.filter(
          (comment) => String(comment.news) === String(blogId)
        );
        setComments(blogComments);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.error("Failed to fetch comments from API:", err);
      setError(err.message || "Failed to fetch comments");
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (blogId) fetchComments();
  }, [blogId]);

  return {
    loading,
    error,
    comments,
    reFetch: fetchComments,
    postComment: commentService.postComment,
  };
};

export default useComment;
