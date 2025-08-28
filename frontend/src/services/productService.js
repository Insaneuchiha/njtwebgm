// frontend/src/services/productService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products/';

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
  // 1. Get the logged-in user's data from local storage.
  const user = JSON.parse(localStorage.getItem('user'));

  // 2. Create the config object for the request headers.
  //    We need to include the user's token to authorize the request.
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  try {
    // 3. Pass the product data AND the config object to the POST request.
    const response = await axios.post(API_URL, productData, config);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Function to delete a product by its ID (this is a protected route)
const deleteProduct = async (productId) => {
  // 1. Get the user's token.
  const user = JSON.parse(localStorage.getItem('user'));

  // 2. Create the config object with the Authorization header.
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  try {
    // 3. Pass the config object to the DELETE request.
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
