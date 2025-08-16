// hooks/useComment.js
import { useState, useEffect } from "react";
import apiService from "../services/api/axios_instance";

const useComment = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);

  const commentService = {
    getComment: async (id) => {
        try {
            let response = await apiService.get(`/news/public/comments/${id}/`);
        if (response?.data) {
            const commentsArray = [response.data]; 
            setComments(commentsArray);
            console.log("Comments: ",response.data);    
        }  
        // if (response?.data?.data) {
        //     setComments([response.data.data]); 
        //     console.log("Comments: ",response.data);
        // } use both but not working
        } catch (err) {
            if (err.response?.status === 404) {
                setComments([]); 
        } else {
            setError(err.message || "Failed to fetch comments");
        }
        }

    },

    postComment: async ({ news, name, email, content, parent = 0 }) => {
      try {
        const payload = { news, name, email, content, parent };
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
      const response = await commentService.getComment(id);
      if (response) {
        setComments(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch comments from API:", err);
      setError(err.message || "Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchComments();
  }, [id]);

  const reFetch = ()=>{
    fetchComments();
  };

  return {
    loading,
    error,
    comments,
    reFetch,
    postComment: commentService.postComment,
  };
};

export default useComment;
