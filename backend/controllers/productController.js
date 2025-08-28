// backend/controllers/productController.js

import Product from '../models/productModel.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    // Find all products in the database.
    // The .sort({ createdAt: -1 }) will sort them from newest to oldest.
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// @desc    Set a new product
// @route   POST /api/products
// @access  Private (we will add authentication later)
const setProduct = async (req, res) => {
  // Destructure the required fields from the request body.
  const { name, description, price, genre, productImage } = req.body;

  // Basic validation to ensure all fields are present.
  if (!name || !description || !price || !genre || !productImage) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    // Create a new product in the database using the Product model.
    const product = await Product.create({
      name,
      description,
      price,
      genre,
      productImage,
    });
    // Respond with the newly created product and a 201 status (Created).
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (we will add authentication later)
const updateProduct = async (req, res) => {
  try {
    // Find the product by its ID from the URL parameters.
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the product by its ID and update it with the new data from the request body.
    // { new: true } ensures that the updated document is returned.
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (we will add authentication later)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the product by its ID and remove it.
    await product.deleteOne();

    // Respond with the ID of the deleted product.
    res.status(200).json({ id: req.params.id, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

// Export all the controller functions.
export { getProducts, setProduct, updateProduct, deleteProduct };
