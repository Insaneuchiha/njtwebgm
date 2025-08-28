// frontend/src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  // 'products' state will hold the array of products fetched from the API.
  const [products, setProducts] = useState([]);
  // 'loading' state to show a message while data is being fetched.
  const [loading, setLoading] = useState(true);

  // useEffect hook runs after the component mounts.
  // The empty dependency array [] means it will only run once.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products using our service.
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        // Error handling is done in the service, but we could add more here.
        console.error('Failed to fetch products for the page.');
      } finally {
        // Set loading to false once the data is fetched or an error occurs.
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h2>Loading Products...</h2>;
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Our Products</h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {/* Map through the 'products' array. If it's empty, show a message. */}
        {products.length > 0 ? (
          products.map((product) => (
            // For each product, render a ProductCard component.
            // The 'key' prop is important for React's rendering performance.
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found. The admin needs to add some!</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
