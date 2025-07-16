import { createContext, useState, useEffect, useContext } from 'react';
     import axios from 'axios';

     export const BlogContext = createContext();

     export const BlogProvider = ({ children }) => {
       const [posts, setPosts] = useState([]);
       const [loading, setLoading] = useState(false);
       const [error, setError] = useState(null);

       const fetchPosts = async (query = '') => {
         setLoading(true);
         try {
           const response = await axios.get(`/api/posts${query}`);
           setPosts(response.data.posts || response.data);
           return response.data;
         } catch (err) {
           setError(err.response?.data?.message || 'Failed to fetch posts');
           return null;
         } finally {
           setLoading(false);
         }
       };

       const deletePost = async (id) => {
         try {
           await axios.delete(`/api/posts/${id}`, { withCredentials: true });
           setPosts(posts.filter(post => post._id !== id));
         } catch (err) {
           setError(err.response?.data?.message || 'Failed to delete post');
         }
       };

       return (
         <BlogContext.Provider value={{ posts, loading, error, fetchPosts, deletePost }}>
           {children}
         </BlogContext.Provider>
       );
     };

     export const useBlog = () => {
       const context = useContext(BlogContext);
       if (!context) {
         throw new Error('useBlog must be used within a BlogProvider');
       }
       return context;
     };