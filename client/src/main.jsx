import React from 'react';
   import ReactDOM from 'react-dom/client';
   import App from './App.jsx';
   import { BlogProvider } from './context/BlogContext.jsx';
   import { AuthProvider } from './context/AuthContext.jsx';
   import './index.css';

   ReactDOM.createRoot(document.getElementById('root')).render(
     <React.StrictMode>
       <AuthProvider>
         <BlogProvider>
           <App />
         </BlogProvider>
       </AuthProvider>
     </React.StrictMode>,
   );