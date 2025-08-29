import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  setProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

// Route for getting all products and creating a new one
router.route('/').get(getProducts).post(protect, setProduct);

// **THE FIX IS HERE**
// The path was missing a forward slash before the colon.
// It should be '/:id', not ':/id'.
router
  .route('/:id')
  .get(getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

export default router;

