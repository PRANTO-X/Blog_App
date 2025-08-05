import React ,{useEffect} from 'react';
import { Helmet } from 'react-helmet';
import BlogList from '../components/blog/BlogList';

const Home = () => {

  useEffect(() => {
  document.title = 'Home | My Blog App';
}, []);

  return (
    <>    
      <div className='bg-purple-700 min-h-[70vh] flex justify-center items-center'>
        <div className="container px-6 mx-auto text-center space-y-3.5">
          <h1 className='uppercase text-3xl md:text-5xl text-white font-bold'>Welcome to our blog app</h1>
          <p className='text-white md:text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quisquam quae magni facilis sapiente reprehenderit.</p>
        </div>
      </div>

     {/* Blog list */}
     <BlogList/>
    </>
  );
};

export default Home;
