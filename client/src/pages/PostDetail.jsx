import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import useApi from '../hooks/useApi';

export default function PostDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { data: post, loading, error } = useApi(() => api.get(`/posts/${id}`));

  const del = async () => {
    await api.delete(`/posts/${id}`);
    nav('/');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      {post.image && <img src={post.image} alt="" className="mb-4 rounded" />}
      <p className="mb-2 text-sm text-gray-500">{post.category?.name}</p>
      <p className="whitespace-pre-wrap">{post.content}</p>
      <div className="mt-6 flex gap-2">
        <button onClick={del} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
        <button onClick={() => nav(`/edit/${id}`)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
      </div>
    </div>
  );
}