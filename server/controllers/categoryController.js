import Category from '../models/Category.js';
import { categorySchema } from '../utils/validators.js';
import { validationResult } from 'express-validator';

// GET /api/categories
export const getAll = async (_req, res) => res.json(await Category.find());

// POST /api/categories
export const create = [
  ...categorySchema,                // express-validator rules
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const category = await Category.create(req.body);
      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  },
];