import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BlogContext } from '../../contexts/BlogProvider';
import { IoMdHome } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";
import { TfiFaceSad } from "react-icons/tfi";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';


const BlogDetail = () => {
  const { blogs } = useContext(BlogContext);
  const { id } = useParams();
  const blog = blogs.find((item) => item.id === parseInt(id));

  const relatedBlogs = blogs.filter(b => b.category === blog.category && b.id !== blog.id).slice(0, 5);

  useEffect(() => {
    if (blog?.title) {
      document.title = blog.title;
    }
  }, [blog]);

  return blog ? (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-5 md:py-8">
        {/* Left */}
        <main className='lg:col-span-8'>
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
                <span className=" bg-indigo-600 text-white font-medium px-4 py-2 rounded-full">{blog.category}</span>
              </div> 

              <h1 className='text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4'>{blog.title}</h1>

              <div className="flex flex-col sm:flex-row   gap-4  mb-6 pb-6 border-b">
                <p className='  font-semibold  text-gray-800'>By <span className='ml-1 text-indigo-600'>{blog.author}</span></p>
                <p className=" text-gray-600">Published: {blog.createdAt}</p>
              </div>
            </header>
            
            <figure className='border-b pb-6 mb-4'>
              <div className="relative aspect-video overflow-hidden mb-4">
                <img src={blog.img} alt={blog.title} loading='lazy' className="object-cover" />
              </div>
              <p className='text-slate-900 leading-relaxed'>{blog.content}</p>
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
        </main>

        {/* Right */}
        <aside className='lg:col-span-4'>
            <div className="sticky top-8 flex flex-col gap-8">

              <div className="space-y-4">
                <h2 className='text-2xl font-bold border-b pb-2'>Tags</h2>
                <div className="">
                  <Link to={`/news?category=${encodeURIComponent(blog.category)}`} className=" bg-indigo-600 text-white font-medium px-4 py-2 rounded-full">
                    {blog.category}
                  </Link>
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
                      to={`/news/${item.id}`}
                      className="flex gap-2 hover:bg-gray-200 p-3 rounded-lg transition duration-300 ease-in-out group"
                      >
                        {/* Image Section */}
                        <div className="relative w-24 min-h-16  overflow-hidden">
                            <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                            />
                        </div>
                        {/* Text Section */}
                        <div className="w-full md:w-2/3 flex flex-col justify-center flex-1">
                            <span className="bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full self-start">
                            {item.category}
                            </span>
                            <h2 className="text-slate-900 font-bold my-2 text-[1rem] group-hover:text-indigo-600 transition duration-300 ease-in-out">
                            {item.title}
                            </h2>
                            <p className="text-slate-900 text-sm">{item.createdAt}</p>
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
