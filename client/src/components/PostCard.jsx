import { Link } from 'react-router-dom';

function PostCard({ post }) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      {post.featuredImage && (
        <img src={post.featuredImage} alt={post.title} className="w-full h-48 object-cover rounded mb-4" />
      )}
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p className="text-gray-600">By {post.author}</p>
      <p className="text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
      <Link to={`/post/${post._id}`} className="text-blue-500 hover:underline">Read More</Link>
    </div>
  );
}

export default PostCard;