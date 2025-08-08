import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import { BlogContext } from '../../contexts/BlogProvider';

const TrendingBlogs = () => {
      const { blogs } = useContext(BlogContext);
      const trendingBlogs = blogs.filter(blog => blog.trending).slice(0, 3);
  return (
    <div>
        {trendingBlogs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 mb-10">
            {/* Left Side */}
            {trendingBlogs[0] && (
            <div className="">
                <Link
                to={`/news/${trendingBlogs[0].id}`}
                className="relative overflow-hidden block h-full group"
                >
                    <div className=" h-full">
                        <div className="h-full overflow-hidden">
                            <img
                            src={trendingBlogs[0].img}
                            alt={trendingBlogs[0].title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 bg-black/50"
                            loading="lazy"
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 z-10 w-full p-6 text-white sm:p-8 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                            <span className="bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                            {trendingBlogs[0].category}
                            </span>
                            <h2 className="text-white font-bold my-2 text-xl md:text-2xl">
                            {trendingBlogs[0].title}
                            </h2>
                            <p className="text-white text-sm md:text-[16px]">{trendingBlogs[0].createdAt}</p>
                        </div>
                    </div>
                </Link>
            </div>
            )}
            {/* Right Side*/}
            {trendingBlogs.length > 1 && (
                <div className="flex flex-col gap-5 md:gap-3 h-full">
                    {trendingBlogs.slice(1, 3).map((item) => (
                        <Link
                        key={item.id}
                        to={`/news/${item.id}`}
                        className="flex flex-col md:flex-row gap-2 flex-1 group"
                        >
                        {/* Image Section */}
                        <div className="w-full md:w-1/2 h-52 md:h-auto overflow-hidden flex items-center">
                            <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                            />
                        </div>
                        {/* Text Section */}
                        <div className="w-full md:w-2/3 flex flex-col justify-center">
                            <span className="bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full self-start">
                            {item.category}
                            </span>
                            <h2 className="text-slate-900 font-bold my-2 md:text-xl">
                            {item.title}
                            </h2>
                            <p className="text-slate-900 text-sm md:text-[16px]">{item.createdAt}</p>
                        </div>
                        </Link>
                    ))}
                </div>

            )}
        </div>
        )}
    </div>
  )
}

export default TrendingBlogs