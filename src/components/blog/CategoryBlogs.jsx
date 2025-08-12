// src/components/blog/CategoryBlogs.jsx
import React, { useContext, useMemo,useState,useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BlogContext } from '../../contexts/BlogProvider';
import BlogCard from './BlogCard'; 
import { IoMdHome } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { TfiFaceSad } from "react-icons/tfi";
import { RxCross2 } from 'react-icons/rx';
import { categoryList } from '../../assets/assets';
import BlogCardSkeleton from '../../loader/BlogCardSekleton';


const CategoryBlogs = () => {
  const { blogs } = useContext(BlogContext);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  const [showBreaking,setShowBreaking] = useState(false);
  const [showTrending,setShowTrending] = useState(false);
  const [mobileFilter,setMobileFilter] =useState(false);
  const [searchTerm,setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false); 

  // Simulate loading when category changes
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [category, showBreaking, showTrending, searchTerm]);

  useEffect(() => {
      document.body.classList.toggle('overflow-hidden', mobileFilter);
      return () => document.body.classList.remove('overflow-hidden');
  }, [mobileFilter]);

   const breakingCount = useMemo(() => {
    return blogs.filter(
      b => b.breaking && (category === 'All' || b.category === category)
    ).length;
  }, [blogs, category]);

  const trendingCount = useMemo(() => {
    return blogs.filter(
      b => b.trending && (category === 'All' || b.category === category)
    ).length;
  }, [blogs, category]);

 const filteredBlogs = useMemo(() => {
  let result = blogs;

  //  Search filter
  if (searchTerm.trim() !== "") {
    const words = searchTerm.toLowerCase().split(/\s+/).filter(Boolean);
    result = result.filter(blog => {
      const text = blog.title.toLowerCase();
      return words.some(word => text.includes(word));
    });
  } else {
    // Category filter 
    if (category !== 'All') {
      result = result.filter(blog => blog.category === category);
    }
  }

  //  Breaking/Trending filter
  if (showBreaking || showTrending) {
    result = result.filter(blog => {
      if (showBreaking && blog.breaking) return true;
      if (showTrending && blog.trending) return true;
      return false;
    });
  }

  return result;
}, [blogs, category, showBreaking, showTrending, searchTerm]);



  const headerTitle = `${category}${showBreaking ? ' - Breaking News' : ''}${showTrending ? ' - Trending' : ''}`;

  return (
      <div className='container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className="flex flex-col md:flex-row gap-8 py-5 md:py-8">
          {/* Left side */}
          <main className="w-full md:w-2/3 lg:w-3/4">
            
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
                  <span>{headerTitle}</span>
              </li>
            </ul>

            <header className="flex justify-between  items-center pb-6 mb-6 md:mb-8 border-b border-gray-200">
              <h1 className="text-xl md:text-3xl font-bold text-gray-900 ">{headerTitle}</h1>

              <div className='pl-2'>
                <button onClick={()=>setMobileFilter(true)} className='md:hidden px-2 py-1 border rounded-md flex items-center gap-1'>
                  <CiFilter className='size-5'/>Filters
                </button> 
              </div>
            </header>


           {
            loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredBlogs?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBlogs.map(blog => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center text-center items-center gap-2.5 md:gap-3.5 pt-6 sm:pt-12">
                <TfiFaceSad className='size-18 md:size-24 lg:size-28'/>
                <h1 className='text-xl md:text-3xl'>No Blog found</h1>
                <p>Try adjusting your search or filter to find what you're looking for.</p>
              </div>
            )
          }
   
        </main>
          {/* Right side */}
          <aside className="hidden md:block w-full md:w-1/3 lg:w-1/4 border-l pl-5">
              <div className="sticky top-8 mt-3.5">
                  <div className="flex flex-col gap-5">
                    <div>
                      <input 
                      type="text" 
                      value={searchTerm}
                      onChange={(e)=> setSearchTerm(e.target.value)}
                      placeholder='Search news...' 
                      className='border p-2 rounded-md focus:outline-indigo-600'/>
                    </div>

                    <div className="mb-6">
                      <h3 className='text-lg font-semibold mb-4'>Filter by Type</h3>

                      <div className="flex flex-col gap-2.5 mb-6">
                        <label htmlFor="breaking" className='flex items-center cursor-pointer'>
                          <input 
                          onChange={(e)=>setShowBreaking(e.target.checked)} 
                          id='breaking' 
                          type="checkbox" 
                          className='mr-3 w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 cursor-pointer hover:ring-indigo-600 focus:ring-indigo-600'
                          />
                          <span className={`${showBreaking ? 'font-bold text-indigo-600' : 'hover:text-indigo-600'} text-lg transition duration-300`}>Breaking News ({breakingCount})</span>
                        </label>

                        <label htmlFor="trending" className='flex items-center cursor-pointer'>
                          <input 
                          onChange={(e)=>setShowTrending(e.target.checked)}
                          id='trending' 
                          type="checkbox" 
                          className=' mr-3 w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 cursor-pointer hover:ring-indigo-600 focus:ring-indigo-600'
                          />
                          <span className={`${showTrending ? 'font-bold text-indigo-600' : 'hover:text-indigo-600'} text-lg transition duration-300`}>Trending Blogs ({trendingCount})</span>
                        </label>
                      </div>

                      <div className="">
                        <h3 className='text-lg font-semibold mb-2.5'>Category</h3>
                       <ul className="flex flex-col gap-3">
                         {categoryList.map((link, index) => {
                            const count = link === 'All' ?
                            null : blogs.filter( b => b.category === link).length

                            const isActive = category === link;
                            return (
                              <li key={index}>
                              <Link
                                className={`transition duration-300 text-lg ${
                                            isActive ? 'font-bold text-indigo-600' : 'hover:text-indigo-600'
                                          }`}
                                to={`/news?category=${encodeURIComponent(link)}`}
                              >
                                {link}{count !== null && ` (${count})`}
                              </Link>
                            </li>
                            )
                          })}
                       </ul>
                      </div>
                    </div>
                  </div>
              </div>
          </aside>
        </div>


        {/* Mobile Menu */}
          {mobileFilter && (
            <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300" />
          )}
    
        <div
          className={`${
            mobileFilter ? 'translate-x-0' : 'translate-x-full'
          } md:hidden transition-transform duration-300 ease-in-out fixed right-0 top-0 bottom-0 w-[80%] bg-white z-[100] flex flex-col`}
          >

          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-5">
              <h3 className="text-xl text-indigo-600 font-bold">Filter</h3>
              <RxCross2 onClick={() => setMobileFilter(false)} className="text-2xl" />
            </div>

            <div className="flex flex-col gap-5 border-t pt-4 flex-1">
              <div className="px-5">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e)=> setSearchTerm(e.target.value)}
                  placeholder="Search news..."
                  className="w-full border p-2 rounded-md focus:outline-indigo-600"
                />
              </div>

              <div className="px-5 pb-3">
                <h3 className="text-lg font-semibold mb-2">Filter by Type</h3>

                <div className="flex flex-col gap-2 mb-5">
                  <label htmlFor="breaking" className="flex items-center cursor-pointer">
                    <input
                      onChange={(e) => setShowBreaking(e.target.checked)}
                      id="breaking"
                      type="checkbox"
                      className="mr-3 w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 cursor-pointer hover:ring-indigo-600 focus:ring-indigo-600"
                    />
                    <span
                      className={`${
                        showBreaking ? 'font-bold text-indigo-600' : 'hover:text-indigo-600'
                      } text-lg`}
                    >
                      Breaking News ({breakingCount})
                    </span>
                  </label>

                  <label htmlFor="trending" className="flex items-center cursor-pointer">
                    <input
                      onChange={(e) => setShowTrending(e.target.checked)}
                      id="trending"
                      type="checkbox"
                      className="mr-3 w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 cursor-pointer hover:ring-indigo-600 focus:ring-indigo-600"
                    />
                    <span
                      className={`${
                        showTrending ? 'font-bold text-indigo-600' : 'hover:text-indigo-600'
                      } text-lg`}
                    >
                      Trending News ({trendingCount})
                    </span>
                  </label>
                </div>

                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold mb-2.5">Category</h3>
                  <ul className="flex flex-col gap-3 pb-8 overflow-y-auto max-h-[calc(100vh-400px)]">
                    {categoryList.map((link, index) => {
                      const count =
                        link === 'All' ? null : blogs.filter((b) => b.category === link).length;

                      const isActive = category === link;
                      return (
                        <li key={index}>
                          <Link
                            className={`transition duration-300 text-lg ${
                              isActive ? 'font-bold text-indigo-600' : 'hover:text-indigo-600'
                            }`}
                            to={`/news?category=${encodeURIComponent(link)}`}
                            onClick={()=> setMobileFilter(false)}
                          >
                            {link}
                            {count !== null && ` (${count})`}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
 
};

export default CategoryBlogs;
