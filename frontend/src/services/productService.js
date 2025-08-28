// frontend/src/services/productService.js

import axios from 'axios';

// The base URL of our backend API.
const API_URL = 'http://localhost:5000/api/products/';

// Function to get all products from the backend.
const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Function to create a new product.
const createProduct = async (productData) => {
  try {
    // Make a POST request to the API with the new product data.
    const response = await axios.post(API_URL, productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    // Re-throw the error to be caught by the component.
    throw error;
  }
};

// Function to delete a product by its ID.
const deleteProduct = async (productId) => {
  try {
    // Make a DELETE request to the specific product's URL.
    const response = await axios.delete(API_URL + productId);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

const productService = {
  getProducts,
  createProduct,
  deleteProduct,
};

export default productService;
