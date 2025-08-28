// backend/routes/productRoutes.js

import express from 'express';
const router = express.Router();

// Import the controller functions we created earlier.
import {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

// This is a clean way to chain routes that go to the same URL.
// A GET request to '/api/products' will trigger the getProducts function.
// A POST request to '/api/products' will trigger the setProduct function.
router.route('/').get(getProducts).post(setProduct);

// A PUT request to '/api/products/:id' will trigger the updateProduct function.
// A DELETE request to '/api/products/:id' will trigger the deleteProduct function.
router.route('/:id').put(updateProduct).delete(deleteProduct);

// Export the router so our main server file can use it.
export default router;
