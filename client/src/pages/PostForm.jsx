import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

export default function PostForm() {
  const { id } = useParams();
  const editing = !!id;
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('/posts/categories').then((res) => setCategories(res.data)).catch((err) => setError('Failed to fetch categories'));
  }, []);

  useEffect(() => {
    if (editing) {
      api.get(`/posts/${id}`).then((res) => {
        const { title, content, category, image } = res.data;
        setTitle(title);
        setContent(content);
        setCategory(category?._id || '');
        setImage(image || '');
      }).catch((err) => setError('Failed to fetch post'));
    }
  }, [editing, id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = { title, content, category, image };
      editing ? await api.put(`/posts/${id}`, payload) : await api.post('/posts', payload);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center">{editing ? 'Edit' : 'Create'} Post</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border px-2 py-1 rounded"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="w-full border px-2 py-1 rounded"
        rows="6"
        required
      />
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL (optional)"
        className="w-full border px-2 py-1 rounded"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border px-2 py-1 rounded"
      >
        <option value="">-- Select a category --</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      <button className="w-full bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
        {editing ? 'Update' : 'Create'}
      </button>
    </form>
  );
}