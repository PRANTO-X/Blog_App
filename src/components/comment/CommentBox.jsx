import React from "react";
import { FaCommentDots, FaArrowAltCircleRight } from "react-icons/fa";
import useComment from "../../hooks/useComment";
import Comment from "./Comment";

const CommentBox = ({ blogId }) => {
  const { loading, error, comments, reFetch, postComment } = useComment({
    id: blogId,
  });

  return (
    <div className="mt-8  border-t border-gray-200">
      <div className="my-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-slate-900">
            Comments
            <span className="text-gray-500 font-normal text-lg ml-0.5">
              ({comments.length})
            </span>
          </h3>
          <button
            onClick={reFetch}
            className="text-sm text-gray-500 hover:text-indigo-600 cursor-pointer transition-colors flex items-center disabled:opacity-50"
          >
            <svg
              class="w-4 h-4 mr-1 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            Refresh
          </button>
        </div>

        <p class=" text-gray-600 mt-2 mb-1">
          Share your thoughts respectfully. All comments are moderated and will
          appear after approval.
        </p>
        <div className="flex items-center space-x-4 text-gray-600 mb-4">
          <div className="flex items-center gap-1.5">
            <FaCommentDots /> ({comments.length}) comments
          </div>
          <div className="flex items-center gap-1.5">
            <FaArrowAltCircleRight /> join the discussion
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className=" border border-gray-200 rounded-lg p-6 mb-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Leave a comment
            </h3>
            <p className=" text-gray-600 mt-1">
              Your comment will be reviewed before being published.
            </p>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none   focus:border-indigo-600 border-gray-300"
                  required=""
                  name="name"
                  value=""
                ></input>
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Comment *
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your email"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-indigo-600 border-gray-300"
                  required=""
                  name="name"
                  value=""
                ></input>
              </div>
            </div>

            <div>
              <label
                for="content"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Comment *
              </label>
              <textarea
                id="content"
                name="content"
                rows="4"
                placeholder="Share your thoughts..."
                class="w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-indigo-600 resize-vertical border-gray-300"
                required=""
              ></textarea>
              <p className="mt-1 text-xs text-gray-500">0/1000 characters</p>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-3">
                <button
                  type="submit"
                  className="bg-indigo-600 cursor-pointer text-white px-6 py-2 rounded-md font-medium 
                                                            hover:opacity-90 focus:outline-none focus:ring-2 transition-opacity
                                                            disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-8">
        {loading && <p>Loading comments...</p>}
        {error && <p className="text-red-600">{error}</p>}
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((c) => <Comment key={c.id} comment={c} />)
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
