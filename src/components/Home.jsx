import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaEye, FaTrash } from 'react-icons/fa';
import { BlogContext } from '../hooks/BlogProvider'
const Home = () => {
  const {blogs,deleteBlog} = useContext(BlogContext);

 const handleDelete = (id) => {
  if (confirm("Are you sure you want to delete this blog?")) {
    deleteBlog(id);
  }
};
  return (
    <>
      <div className='bg-purple-700 min-h-[70vh] flex justify-center items-center'>
        <div className="container px-6 mx-auto text-center space-y-3.5">
          <h1 className='uppercase text-3xl md:text-5xl text-white font-bold'>Welcome to out blog app</h1>
          <p className='text-white md:text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quisquam quae magni facilis sapiente reprehenderit.</p>
        </div>
      </div>

      <div className="container px-6 mx-auto py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((item) => (
                <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition hover:shadow-xl cursor-pointer">
                  {/* Image */}
                  <div className="h-60 w-full overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                        <span>✍️ {item.author}</span>
                        <span>🕒 {item.createdAt}</span>
                      </div>

                      <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h2>

                      <p className="text-gray-600 text-sm line-clamp-4 mb-4">
                        {item.content}
                      </p>

                      <div className="flex justify-end gap-4">
                        {/* View*/}
                        <Link to={`/blog/${item.id}`} title="View Blog">
                          <FaEye className="text-lg hover:scale-110 transition-transform" />
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(item.id)} 
                          title="Delete Blog"
                        >
                          <FaTrash className="text-lg hover:scale-110 transition-transform text-red-600 cursor-pointer" />
                        </button>
                      </div>
                  </div>
                </div>
            ))}

            </div>
      </div>
    </>

    
  )
}

export default Home