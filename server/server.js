import express from 'express';
  import mongoose from 'mongoose';
  import dotenv from 'dotenv';
  import authRoutes from './routes/auth.js';
  import postRoutes from './routes/postRoutes.js';
  import cors from 'cors';

  dotenv.config();

  const app = express();
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/posts', postRoutes);

  // MongoDB Connection
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));