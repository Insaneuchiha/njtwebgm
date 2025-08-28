// frontend/src/components/ProductCard.jsx

import React from 'react';

// This component receives a 'product' object as a prop.
const ProductCard = ({ product }) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px',
        textAlign: 'center',
        maxWidth: '300px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      {/* The product image is a Base64 string, so it can be used directly in the src attribute */}
      <img
        src={product.productImage}
        alt={product.name}
        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
      />
      <h3 style={{ marginTop: '12px' }}>{product.name}</h3>
      <p style={{ color: '#555' }}>{product.description}</p>
      <p style={{ fontWeight: 'bold', fontSize: '1.2em' }}>${product.price}</p>
      <p style={{ fontStyle: 'italic', color: '#777' }}>Genre: {product.genre}</p>
    </div>
  );
};

export default ProductCard;
