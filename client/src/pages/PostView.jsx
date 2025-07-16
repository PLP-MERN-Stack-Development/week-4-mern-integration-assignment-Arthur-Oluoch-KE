import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';

function PostView() {
  const { id } = useParams();
  const { fetchData, loading, error } = useApi();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await fetchData(`/api/posts/${id}`);
      if (data) setPost(data);
    };
    fetchPost();
  }, [fetchData, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-2">By {post.author} | {new Date(post.createdAt).toLocaleDateString()}</p>
      {post.featuredImage && (
        <img src={post.featuredImage} alt={post.title} className="w-full h-64 object-cover rounded mb-4" />
      )}
      <div className="prose max-w-none">{post.content}</div>
    </div>
  );
}

export default PostView;