// backend/models/productModel.js

import mongoose from 'mongoose';

// A Mongoose schema defines the structure of the document,
// default values, validators, etc.
const productSchema = mongoose.Schema(
  {
    // The name of the product.
    // It's a string, and it's required.
    name: {
      type: String,
      required: [true, 'Please add a product name'],
    },
    // A detailed description of the product.
    description: {
      type: String,
      required: [true, 'Please add a product description'],
    },
    // The price of the product.
    // It's a number and it's required.
    price: {
      type: Number,
      required: [true, 'Please add a product price'],
    },
    // The genre or category of the product.
    // This will be used for sorting.
    genre: {
      type: String,
      required: [true, 'Please add a product genre'],
    },
    // The image of the product.
    // We will store the image as a Base64 encoded string.
    // This makes it easy to embed directly in API responses.
    productImage: {
      type: String,
      required: [true, 'Please add a product image'],
    },
  },
  {
    // This option automatically adds two fields to our schema:
    // createdAt and updatedAt.
    timestamps: true,
  }
);

// We then create a Mongoose "model" from the schema.
// A model is a class with which we construct documents. In this case,
// each document will be a product with the properties declared in our schema.
// mongoose.model('ModelName', schema)
const Product = mongoose.model('Product', productSchema);

// We export the model so we can use it in other files (like our controllers).
export default Product;
