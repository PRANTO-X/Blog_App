import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";
import { TfiFaceSad } from "react-icons/tfi";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import useBlogs from '../../hooks/useBlogs';
import CommentBox from '../comment/CommentBox';

const BlogDetail = ({ blogSlug }) => {
  const { slug: paramSlug } = useParams();
  const actualSlug = blogSlug || paramSlug;
  
  // Fetch single blog by slug
  const { blogs, loading, error } = useBlogs({
    slug: actualSlug,
    limit: 1
  });

  const blog = blogs[0]; // Get the first (and only) blog from results

  // Fetch related blogs separately (only when we have a blog)
  const { blogs: allRelatedBlogs } = useBlogs({
    limit: 20, // Get more blogs to filter from
  });

  // Filter related blogs by same category, excluding current blog
  const relatedBlogs = useMemo(() => {
    if (!blog || !allRelatedBlogs.length) return [];
    
    return allRelatedBlogs
      .filter(item => 
        item.categoryName === blog.categoryName && 
        item.id !== blog.id
      )
      .slice(0, 5);
  }, [blog, allRelatedBlogs]);

  useEffect(() => {
    if (blog?.title) {
      document.title = blog.title;
    }
  }, [blog]);

  // Loading state
  if (loading) {
    return (
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-8"></div>
          <div className="h-12 bg-gray-300 rounded w-2/3 mb-4"></div>
          <div className="h-64 bg-gray-300 rounded mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Failed to Load Blog</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <Link to="/news" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  return blog ? (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-5 md:py-8">
        {/* Left */}
        <main className='lg:col-span-8'>
          {/* Blog detail */}
           <div>
              <ul className='inline-flex items-center space-x-1 md:space-x-3 mb-8'>
                <li className='inline-flex items-center'>
                  <Link to='/' className='flex gap-1.5 items-center text-gray-700 hover:text-indigo-600 transition-colors duration-200'>
                      <IoMdHome /> Home
                  </Link>
                </li>

                <li className='flex gap-2 items-center text-gray-700'>
                  <FaAngleRight />
                  <Link  className=' hover:text-indigo-600 transition-colors duration-200'>
                        News
                  </Link>
                </li>

                <li className='flex gap-2 items-center text-gray-700'>
                    <FaAngleRight />
                    <span>{blog.title}</span>
                </li>
              </ul>

              <header className='space-y-8'>
                <div>
                  <span className=" bg-indigo-600 text-white font-medium px-4 py-2 rounded-full">{blog.categoryName}</span>
                </div> 

                <h1 className='text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4'>{blog.title}</h1>

                <div className="flex flex-col sm:flex-row   gap-4  mb-6 pb-6 border-b">
                  <p className='  font-semibold  text-gray-800'>By <span className='ml-1 text-indigo-600'>{blog.author}</span></p>
                  <p className=" text-gray-600">Published: {blog.publishedDate}</p>
                </div>
              </header>
            
              <figure className='border-b pb-6 mb-4'>
                <div className="relative aspect-video overflow-hidden mb-4">
                  <img src={blog.imageUrl} alt={blog.imageAlt} loading='lazy' className="w-full h-full object-cover" />
                </div>
                <div 
                  className='text-slate-900 leading-relaxed prose prose-lg max-w-none'
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </figure>

              <footer>
                  <h2 className='text-xl font-bold text-slate-900'>Share this blog</h2>
                  <div className="flex space-x-6 mt-2">
                    <button
                      aria-label="Share on Facebook"
                      className="bg-blue-700 p-3 md:p-4 cursor-pointer rounded-full text-white"
                      title='share on facebook'
                    >
                      <FaFacebookF size={20} />
                    </button>

                    <button
                      aria-label="Share on Twitter"
                      className="bg-sky-400 p-3 md:p-4 cursor-pointer rounded-full text-white"
                      title='share on twitter'
                    >
                      <FaTwitter size={20} />
                    </button>

                    <button
                      aria-label="Share on LinkedIn"
                      className="bg-blue-400 p-3 md:p-4 cursor-pointer rounded-full text-white"
                      title='share on linkdin'
                    >
                      <FaLinkedinIn size={20} />
                    </button>
                  </div>
              </footer>
           </div>
          {/* Comment box */}
           <CommentBox blogId = {blog.id}/>
        </main>

        

        {/* Right */}
        <aside className='lg:col-span-4'>
            <div className="sticky top-8 flex flex-col gap-8">

              <div className="space-y-4">
                <h2 className='text-2xl font-bold border-b pb-2'>Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {/* API Tags */}
                  {blog.tags && blog.tags.length > 0 ? (
                    blog.tags.map(tag => (
                      <Link 
                        key={tag.id} 
                        to={`/news?tags=${tag.id}`}
                        className="bg-indigo-600 text-white font-medium px-3 py-1 rounded-full text-sm hover:bg-indigo-700 transition-colors duration-200"
                      >
                        {tag.name}
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No tags available</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className='text-2xl font-bold border-b pb-2'>Related Blogs</h2>
                <div className="flex flex-col gap-5">
                  {relatedBlogs.length === 0 ? (
                    <p>No related blog available</p>
                  ) : (
                    relatedBlogs.map(item => (
                      <Link
                      key={item.id}
                      to={`/news/${item.slug}`}
                      className="flex gap-2 hover:bg-gray-200 p-3 rounded-lg transition duration-300 ease-in-out group"
                      >
                        {/* Image Section */}
                        <div className="relative w-24 min-h-16  overflow-hidden">
                            <img
                            src={item.imageUrl}
                            alt={item.imageAlt}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                            />
                        </div>
                        {/* Text Section */}
                        <div className="w-full md:w-2/3 flex flex-col justify-center flex-1">
                            <span className="bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full self-start">
                            {item.categoryName}
                            </span>
                            <h2 className="text-slate-900 font-bold my-2 text-[1rem] group-hover:text-indigo-600 transition duration-300 ease-in-out">
                            {item.title}
                            </h2>
                            <p className="text-slate-900 text-sm">{item.publishedDate}</p>
                        </div>
                      </Link>
                    ))
                  )}
                </div>  
              </div>
            </div>
        </aside>
      </div>
    </div>
  ) : (
     <div className="flex flex-col justify-center text-center items-center gap-2.5 md:gap-3.5 pt-6 sm:pt-12">
                  <TfiFaceSad className='size-18 md:size-24 lg:size-28'/>
                  <h1 className='text-xl md:text-3xl '>No Blog found</h1>
                  <Link to="/" className="text-blue-600 underline mt-4 block">Go Back Home</Link>
      </div>
  );


};

export default BlogDetail;
