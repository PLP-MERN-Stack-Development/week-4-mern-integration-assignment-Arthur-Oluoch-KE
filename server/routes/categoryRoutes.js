import express from 'express';
import * as ctrl from '../controllers/categoryController.js';
const router = express.Router();
router.get('/', ctrl.getAll);
router.post('/', ctrl.create);
export default router;