// frontend/src/components/ProductCard.jsx

import React from 'react';

const ProductCard = ({ product }) => {
  // State to manage hover effect for the card
  const [isHovered, setIsHovered] = React.useState(false);

  const cardStyle = {
    ...styles.card,
    // Apply a subtle shadow lift on hover
    transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
    boxShadow: isHovered ? '0 12px 24px rgba(0,0,0,0.12)' : '0 6px 12px rgba(0,0,0,0.08)',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.imageContainer}>
        <img
          src={product.productImage}
          alt={product.name}
          style={styles.image}
        />
      </div>
      <div style={styles.content}>
        <p style={styles.genre}>{product.genre}</p>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.description}>{product.description}</p>
        <p style={styles.price}>${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

// Modern and professional styling for the ProductCard
const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  imageContainer: {
    width: '100%',
    paddingTop: '100%', // Creates a square aspect ratio
    position: 'relative',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  content: {
    padding: '20px',
    textAlign: 'left',
  },
  genre: {
    fontSize: '0.8rem',
    color: '#6c757d',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: '8px',
  },
  name: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    color: '#343a40',
  },
  description: {
    fontSize: '0.9rem',
    color: '#6c757d',
    lineHeight: '1.5',
    height: '40px', // Limit to approx 2 lines
    overflow: 'hidden',
  },
  price: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#007bff',
    marginTop: '16px',
  },
};

export default ProductCard;
