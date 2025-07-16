import { Link, Outlet } from 'react-router-dom';
export default function Layout({ children }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <nav className="mb-6 flex gap-4">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
        <Link to="/create" className="text-blue-600 hover:underline">Create Post</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}