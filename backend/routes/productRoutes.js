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

router.route('/').get(getProducts).post(protect, setProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

export default router;

