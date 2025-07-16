import { body } from 'express-validator';

export const postSchema = [
  body('title').trim().isLength({ min: 3 }).withMessage('Title ≥ 3 chars'),
  body('content').trim().isLength({ min: 10 }).withMessage('Content ≥ 10 chars'),
  body('image').optional({ checkFalsy: true }).isURL().withMessage('Image must be URL'),
  body('category').optional({ checkFalsy: true }).isMongoId().withMessage('Invalid category id'),
];

export const categorySchema = [
  body('name').trim().isLength({ min: 2, max: 30 }).withMessage('Name 2-30 chars'),
];