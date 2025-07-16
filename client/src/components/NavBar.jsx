import { Link } from 'react-router-dom';
  import { useAuth } from '../context/AuthContext';

  function NavBar() {
    const { user, logout } = useAuth();

    return (
      <nav className="bg-blue-500 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-xl font-bold">MERN Blog</Link>
          <div className="space-x-4">
            {user ? (
              <>
                <Link to="/create" className="text-white hover:underline">Create Post</Link>
                <button onClick={logout} className="text-white hover:underline">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:underline">Login</Link>
                <Link to="/register" className="text-white hover:underline">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  }

  export default NavBar;