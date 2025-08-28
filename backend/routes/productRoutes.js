// backend/routes/productRoutes.js

import express from 'express';
const router = express.Router();
import {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

// Import our new protect middleware
import { protect } from '../middleware/authMiddleware.js';

// The GET route for all products remains public.
// For the POST route, we add 'protect' middleware. It will run BEFORE the setProduct controller.
router.route('/').get(getProducts).post(protect, setProduct);

// The PUT and DELETE routes are also protected.
router.route('/:id').put(protect, updateProduct).delete(protect, deleteProduct);

export default router;
