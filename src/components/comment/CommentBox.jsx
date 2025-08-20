import React, { useEffect, useRef, useState } from 'react'
import { FaCommentDots,FaArrowAltCircleRight } from "react-icons/fa";
import Comment from './comment';
import useComment from '../../hooks/useComment';
import { LuRefreshCw } from "react-icons/lu";
import { FaRegCommentDots } from "react-icons/fa6";

const CommentBox = ({blogId}) => {
    const { loading, error, comments, reFetch, postComment } = useComment({ blogId });
    const [formData,setFormData] = useState({
        name: "",
        email: "",
        content: ""
    });
    const[submitting,setSubmitting] = useState(false);

    const[replyTo,setReplyTo] = useState(null);
    const formRef = useRef(null);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setSubmitting(true);

        try{
          await postComment({
            ...formData,
            parent: replyTo ? replyTo.id : 0,
          });
           setFormData({name: "",email: "",content: ""});
           setReplyTo(null);
           reFetch();
        }catch(err){
            console.error("Failed to submit comment:", err);
        }finally{
            setSubmitting(false);
        }
    };

    useEffect(()=>{
        if(replyTo && formRef.current){
            formRef.current.scrollIntoView({behavior: "smooth",block: "center"});
        }
    },[replyTo])

  return (
    <div className='mt-8  border-t border-gray-200'>
        <div className="my-6">
            <div className="flex items-center justify-between">
                <h3 className='text-2xl font-bold text-slate-900'>Comments 
                    <span className='text-gray-500 font-normal text-lg ml-0.5'>
                        ({comments.length})
                    </span>
                </h3>
                <button onClick={reFetch} className={`${loading ? 'text-indigo-400' : 'text-gray-500'} text-sm hover:text-indigo-600 cursor-pointer transition-colors flex items-center disabled:opacity-50`}>
                    <LuRefreshCw className={`${loading ? 'animate-spin' : ''} w-3.5 h-3.5 mr-1`} />                    
                    Refresh
                </button>
            </div>

            <p className=" text-gray-600 mt-2 mb-1">Share your thoughts respectfully. All comments are moderated and will appear after approval.</p>
            <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <div className="flex items-center gap-1.5">
                    <FaCommentDots /> ({comments.length}) comments
                </div>
                <div className="flex items-center gap-1.5">
                    <FaArrowAltCircleRight /> join the discussion
                </div>
            </div>
        </div>

        {/* Comment form */}
        <div className="mb-8">
            <div ref={formRef} className={`${replyTo ? 'border-indigo-600' : 'border-gray-200'} border border-gray-200 rounded-lg p-6 mb-6`}>
                <div className="mb-4">
                    <h3 className='text-lg font-semibold text-gray-900'>
                        {replyTo ? `Reply to ${replyTo.name}` : "Leave a comment"}
                    </h3>
                    <p className=" text-gray-600 mt-1">
                        {replyTo
                            ? "Your reply will appear under this comment after approval."
                            : "Your comment will be reviewed before being published."
                        }
                    </p>
                </div>

                <form className='space-y-4'  onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                            <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-600 border-gray-300"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                            <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-600 border-gray-300"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Comment *</label>
                        <textarea 
                        id="content" 
                        name="content" 
                        rows="4" 
                        placeholder="Share your thoughts..."
                        onChange={handleChange}
                        value={formData.content} 
                        maxLength={1000}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none  focus:border-indigo-600 resize-vertical border-gray-300">
                        </textarea>
                        <p className='mt-1 text-xs text-gray-500'>{formData.content.length}/1000 characters</p>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center space-x-3">
                            <button
                            type="submit"
                            className='bg-indigo-600 cursor-pointer text-white px-6 py-2 rounded-md font-medium 
                                        hover:opacity-90 focus:outline-none focus:ring-2 transition-opacity
                                        disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                            disabled={submitting} 
                            >
                                {submitting && (
                                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                                )}
                                {submitting ? "Posting..." : replyTo ? "Reply" : "Post Comment"}
                            </button>

                            {replyTo && (
                                <button
                                type="button"
                                onClick={() => setReplyTo(null)}
                                className="cursor-pointer px-6 py-2 rounded-md font-medium border border-gray-300 text-gray-700 hover:bg-gray-100"
                                >
                                Cancel
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
        {/* Show comment */}
        <div className="mt-8 space-y-6">
            {loading ? (    
                Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse flex gap-4 items-start">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                    </div>
                </div>
                ))
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : comments.length > 0 ? (
                comments.map((c) => (
                <Comment key={c.id} comment={c} onReply={(id, name) => setReplyTo({ id, name })}/>
                ))
            ) : (
                <div className="flex flex-col justify-center items-center">
                    <FaRegCommentDots className='size-16 text-gray-500 mb-4'/>
                    <h3 className='text-lg font-medium text-gray-900 mb-2'>No Comments Yet</h3>
                    <p className='text-gray-600'>Be the first to share your thoughts on this article</p>
                </div>
            )}
        </div>

    </div>
  )
}

export default CommentBox