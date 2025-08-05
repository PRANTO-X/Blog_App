import React, { useContext, useState } from 'react'
import { BlogContext } from '../contexts/BlogProvider'
import { useNavigate } from 'react-router-dom';
const CreateBlog = () => {

  const {addBlog} = useContext(BlogContext);
  const navigate = useNavigate();

  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [img, setImg] = useState('');

  const handleSubmit = (e)=>{
    e.preventDefault();

    addBlog({title,content,author,img});

    
    setTitle('');
    setContent('');
    setAuthor('');
    setImg('');

    navigate('/');
  }

  return (
    <div className="container mx-auto px-6 md:py-18 lg:py-24">
      <div className="flex flex-col justify-center items-center  max-w-3xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-8 w-full">Create New Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div>
            <label className="block mb-2 font-semibold" htmlFor="title">Title *</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Enter blog title"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold" htmlFor="content">Content *</label>
            <textarea
              id="content"
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={8}
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Write your blog content here"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold" htmlFor="author">Author *</label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Author name"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold" htmlFor="img">Image URL</label>
            <input
              id="img"
              type="url"
              value={img}
              onChange={e => setImg(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Optional image URL"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 py-3 rounded"
          >
            Create Blog
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateBlog