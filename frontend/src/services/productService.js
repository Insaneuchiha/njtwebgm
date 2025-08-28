// frontend/src/services/productService.js

import axios from 'axios';

// The base URL will point to our live backend server in production
const API_URL = '/api/products/';

// Function to get all products from the backend (this is a public route)
const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Function to create a new product (this is a protected route)
const createProduct = async (productData) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  try {
    const response = await axios.post(API_URL, productData, config);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Function to delete a product by its ID (this is a protected route)
const deleteProduct = async (productId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  try {
    const response = await axios.delete(API_URL + productId, config);
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
