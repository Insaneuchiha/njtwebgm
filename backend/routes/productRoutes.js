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

// This route gets all products and creates a new one
router.route('/').get(getProducts).post(protect, setProduct);

// This route handles operations for a single product by its ID
// THE FIX IS HERE: The path was ':/id' and has now been corrected to '/:id'
router
  .route('/:id')
  .get(getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

export default router;

