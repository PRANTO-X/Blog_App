import React ,{useEffect} from 'react';
import BlogList from '../components/blog/BlogList';
import TrendingBlogs from '../components/blog/TrendingBlogs';

const Home = () => {

  useEffect(() => {
  document.title = 'Home | My Blog App';
}, []);

  return (
  <div className='container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-10'>  
  {/* Trending BLogs */}  
    <div>
      <div className="flex items-center gap-3.5  border-l-4 border-indigo-600 pl-2 mb-6">
        <h2 className='text-2xl md:text-3xl font-bold'>Trending Blogs</h2>
        <span className='border-1 flex-1 border-indigo-600'></span>
      </div>
      <TrendingBlogs/>
    </div>
    

    {/* Blog list */}
    <div>
      

     <BlogList/>
    </div>
    </div>
  );
};

export default Home;
