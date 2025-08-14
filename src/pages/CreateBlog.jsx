import React, { useContext, useState } from 'react';
import { BlogContext } from '../contexts/BlogProvider';
import { useNavigate } from 'react-router-dom';
import { categoryList } from '../assets/assets'; 

const CreateBlog = () => {
  const { addBlog, loading } = useContext(BlogContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [img, setImg] = useState('');
  const [category, setCategory] = useState('Technology'); 
  const [trending, setTrending] = useState(false);
  const [breaking, setBreaking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to format date as MM-DD-YYYY HH:mm
  const getFormattedDate = () => {
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const yyyy = now.getFullYear();
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    return `${mm}-${dd}-${yyyy} ${hh}:${min}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newBlog = {
      title,
      content,
      author,
      img,
      category,
      trending,
      breaking,
    };

    try {
      await addBlog(newBlog);

      // Reset form
      setTitle('');
      setContent('');
      setAuthor('');
      setImg('');
      setCategory('Technology');
      setTrending(false);
      setBreaking(false);

      navigate('/');
    } catch (error) {
      console.error('Failed to create blog:', error);
      alert('Failed to create blog. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-6 pb-10">
      <div className="flex flex-col justify-center items-center max-w-3xl mx-auto mt-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 w-full">Create New Blog</h1>

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

          <div>
            <label className="block mb-2 font-semibold" htmlFor="category">Category *</label>
            <select
              id="category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            >
              {categoryList.filter(cat => cat !== 'All').map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={trending}
                onChange={e => setTrending(e.target.checked)}
                className="mr-2"
              />
              Trending
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={breaking}
                onChange={e => setBreaking(e.target.checked)}
                className="mr-2"
              />
              Breaking News
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting || loading ? (
              <>
                <div className="animate-spin w-4 h-4 border border-white border-t-transparent rounded-full"></div>
                Creating...
              </>
            ) : (
              'Create Blog'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
