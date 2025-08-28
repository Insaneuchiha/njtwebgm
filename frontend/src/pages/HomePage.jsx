// frontend/src/pages/HomePage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // State for the search term input
  const [searchTerm, setSearchTerm] = useState('');
  // State for the selected genre filter
  const [selectedGenre, setSelectedGenre] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products for the page.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Get a list of unique genres from the products
  const genres = useMemo(() => {
    const allGenres = products.map(p => p.genre);
    return ['All', ...new Set(allGenres)];
  }, [products]);

  // Filter products based on search term and selected genre
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesGenre = selectedGenre === 'All' || product.genre === selectedGenre;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesGenre && matchesSearch;
    });
  }, [products, searchTerm, selectedGenre]);

  if (loading) {
    return <h2 style={{ textAlign: 'center' }}>Loading Products...</h2>;
  }

  return (
    <div>
      <h1 style={styles.header}>Our Products</h1>
      
      {/* Filter and Search Controls */}
      <div style={styles.controlsContainer}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          style={styles.genreSelect}
        >
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div style={styles.productGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

// Styling for the HomePage
const styles = {
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '2.5rem',
    color: '#343a40',
  },
  controlsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '2rem',
  },
  searchInput: {
    padding: '10px 15px',
    fontSize: '1rem',
    width: '300px',
    borderRadius: '8px',
    border: '1px solid #ced4da',
  },
  genreSelect: {
    padding: '10px 15px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ced4da',
    cursor: 'pointer',
  },
  productGrid: {
    display: 'grid',
    // Responsive grid: 1 column on small screens, 2 on medium, 3 on large
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px',
  },
};

export default HomePage;
