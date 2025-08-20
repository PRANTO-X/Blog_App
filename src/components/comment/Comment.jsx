// components/comment/Comment.jsx
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";

const Comment = ({ comment,onReply }) => {
  const [showReply, setShowReply] = useState(false);

  const handleReply = () => setShowReply((prev) => !prev);

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    const initials = words.slice(0, 2).map(word => word[0].toUpperCase()).join("");
    return initials;
  };


  return (
    <div className="mb-6">
      <div className="flex space-x-3">
        {/* Logo */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-medium bg-indigo-600">
          {getInitials(comment.name)}
        </div>

        <div className="flex-1 min-w-0">
          {/* Detail*/}
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="text-sm font-semibold text-gray-900">{comment.name}</h4>
            <span className="text-xs text-gray-500">•</span>
            <time
              className="text-xs text-gray-500"
              dateTime={comment.created_at}
            >
              {new Date(comment.created_at).toLocaleDateString()}
            </time>
          </div>

          {/* Content */}
          <div className="text-gray-800 leading-relaxed mb-3">
            <p>{comment.content}</p>
          </div>

          {/* Reply */}
          <div className="flex items-center space-x-4">
            <button onClick={()=> onReply(comment.id,comment.name)} className="text-xs cursor-pointer text-gray-500 hover:text-indigo-600 transition-colors font-medium">
              Reply
            </button>
            {comment.replies?.length > 0 && (
              <button
                onClick={handleReply}
                className="gap-1.5 cursor-pointer text-xs text-gray-500 hover:text-gray-700 transition-colors font-medium flex items-center"
              >
                <FaChevronRight
                  className={`${
                    showReply ? "transform rotate-90" : ""
                  } transition duration-100`}
                  size={10}
                />
                {`${showReply ? "Hide" : "Show"} ${comment.replies.length} Reply${
                  comment.replies.length > 1 ? "ies" : ""
                }`}
              </button>
            )}
          </div>

          {/* Nested Replies */}
          {showReply && comment.replies?.length > 0 && (
            <div className="ml-8 mt-4 space-y-4">
              {comment.replies.map((reply) => (
                <Comment key={reply.id} comment={reply} onReply={onReply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
