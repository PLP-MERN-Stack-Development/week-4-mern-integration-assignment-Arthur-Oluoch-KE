import { createContext, useState, useEffect, useContext } from 'react';
  import axios from 'axios';

  export const AuthContext = createContext();

  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get('/api/auth/me');
          setUser(response.data);
        } catch (err) {
          console.error('Auth check failed:', err.response?.data?.message || err.message);
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
          setUser(null);
        } finally {
          setLoading(false);
        }
      };
      checkAuth();
    }, []);

    const login = async ({ email, password }) => {
      try {
        const response = await axios.post('/api/auth/login', { email, password });
        const { token } = response.data;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const userResponse = await axios.get('/api/auth/me');
        setUser(userResponse.data);
        return true;
      } catch (err) {
        throw new Error(err.response?.data?.message || 'Login failed');
      }
    };

    const register = async ({ username, email, password }) => {
      try {
        const response = await axios.post('/api/auth/register', { username, email, password });
        const { token } = response.data;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const userResponse = await axios.get('/api/auth/me');
        setUser(userResponse.data);
        return true;
      } catch (err) {
        throw new Error(err.response?.data?.message || 'Registration failed');
      }
    };

    const logout = () => {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    };

    return (
      <AuthContext.Provider value={{ user, loading, login, register, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };