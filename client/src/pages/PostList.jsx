import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/posts').then((res) => setPosts(res.data.posts)).catch((err) => console.error('Failed to fetch posts:', err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.content}</p>
            {post.category && <p>Category: {post.category.name}</p>}
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="max-w-full h-auto mt-2 rounded"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/150')} // Fallback for invalid URLs
              />
            )}
            <Link to={`/edit/${post._id}`} className="text-blue-500 hover:underline">Edit</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;