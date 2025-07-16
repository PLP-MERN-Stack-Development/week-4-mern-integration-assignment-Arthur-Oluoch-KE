import Post from '../models/Post.js';
import { postSchema } from '../utils/validators.js';
import { validationResult } from 'express-validator';

// GET /api/posts?page=1
export const getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;
  const [posts, total] = await Promise.all([
    Post.find().skip(skip).limit(limit).populate('category', 'name'),
    Post.countDocuments(),
  ]);
  res.json({ posts, totalPages: Math.ceil(total / limit) });
};

// GET /api/posts/:id
export const getOne = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('category');
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// POST /api/posts
export const create = [
  ...postSchema,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const post = await Post.create(req.body);
      await post.populate('category');
      res.status(201).json(post);
    } catch (err) {
      next(err);
    }
  },
];

// PUT /api/posts/:id
export const update = [
  ...postSchema,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).populate('category');
      if (!post) return res.status(404).json({ message: 'Not found' });
      res.json(post);
    } catch (err) {
      next(err);
    }
  },
];

// DELETE /api/posts/:id
export const remove = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};