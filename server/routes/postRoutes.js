import express from 'express';
import jwt from 'jsonwebtoken';
import Post from '../models/Post.js';
import Category from '../models/Category.js';

const router = express.Router();

// Create a post
router.post('/', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { title, content, category, image } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Title and content are required' });

    const post = new Post({ title, content, category, image, author: decoded.userId });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error('Token verification error:', err.message); // Log error for debugging
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a category (for testing)
router.post('/categories', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;