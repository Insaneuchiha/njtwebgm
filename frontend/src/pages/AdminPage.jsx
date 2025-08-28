// frontend/src/pages/AdminPage.jsx

import React, { useState, useEffect } from 'react';
import productService from '../services/productService';

const AdminPage = () => {
  // State for the list of all products
  const [products, setProducts] = useState([]);
  // State for the form inputs
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    price: '',
    genre: '',
  });
  // State for the selected image file
  const [file, setFile] = useState(null);

  // Fetch all products when the component loads
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await productService.getProducts();
    setProducts(data);
  };

  // Handle changes in the text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission to create a new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select an image file.');
      return;
    }

    // Convert image to Base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const newProductData = {
        ...formState,
        productImage: reader.result, // The Base64 string
      };

      try {
        await productService.createProduct(newProductData);
        alert('Product created successfully!');
        // Reset form and refetch products
        setFormState({ name: '', description: '', price: '', genre: '' });
        setFile(null);
        document.getElementById('fileInput').value = ''; // Clear file input
        fetchProducts();
      } catch (error) {
        console.error('Failed to create product:', error);
        alert('Failed to create product.');
      }
    };
  };

  // Handle product deletion
  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(productId);
        alert('Product deleted successfully!');
        fetchProducts(); // Refresh the product list
      } catch (error) {
        console.error('Failed to delete product:', error);
        alert('Failed to delete product.');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Panel</h1>

      {/* Form for creating new products */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Add New Product</h2>
        <input
          name="name"
          value={formState.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          style={styles.input}
          required
        />
        <textarea
          name="description"
          value={formState.description}
          onChange={handleInputChange}
          placeholder="Product Description"
          style={styles.input}
          required
        />
        <input
          name="price"
          type="number"
          value={formState.price}
          onChange={handleInputChange}
          placeholder="Price"
          style={styles.input}
          required
        />
        <input
          name="genre"
          value={formState.genre}
          onChange={handleInputChange}
          placeholder="Genre"
          style={styles.input}
          required
        />
        <input
          id="fileInput"
          type="file"
          onChange={handleFileChange}
          style={styles.input}
          accept="image/*"
          required
        />
        <button type="submit" style={styles.button}>Add Product</button>
      </form>

      {/* List of existing products */}
      <div style={{ marginTop: '40px' }}>
        <h2>Existing Products</h2>
        {products.map((product) => (
          <div key={product._id} style={styles.productItem}>
            <span>{product.name} - ${product.price}</span>
            <button onClick={() => handleDelete(product._id)} style={styles.deleteButton}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Basic styling for the component
const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  productItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #eee',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default AdminPage;
