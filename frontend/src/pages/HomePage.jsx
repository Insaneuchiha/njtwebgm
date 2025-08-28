// frontend/src/pages/HomePage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import productService from '../services/productService';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
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

  const genres = useMemo(() => {
    const allGenres = products.map(p => p.genre);
    return ['All', ...new Set(allGenres)];
  }, [products]);

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
    flexWrap: 'wrap', // Allow controls to stack vertically on small screens
  },
  searchInput: {
    padding: '10px 15px',
    fontSize: '1rem',
    width: '300px',
    maxWidth: '100%', // Ensure it doesn't overflow its container
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px',
  },
};

export default HomePage;
