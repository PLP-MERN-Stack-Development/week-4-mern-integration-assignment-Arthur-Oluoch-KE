import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
  import { useAuth } from './context/AuthContext';
  import PostList from './pages/PostList';
  import PostForm from './pages/PostForm';
  import Login from './pages/Login';
  import Register from './pages/Register';
  import NavBar from './components/NavBar';

  function App() {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    return (
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={user ? <PostList /> : <Navigate to="/login" />} />
          <Route path="/create" element={user ? <PostForm /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
           <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    );
  }

  export default App;