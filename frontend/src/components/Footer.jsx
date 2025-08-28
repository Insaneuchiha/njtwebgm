// frontend/src/components/Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p>&copy; {new Date().getFullYear()} Nethaji Traders. All Rights Reserved.</p>
        <div style={styles.socialLinks}>
          {/* Add social media links here later */}
        </div>
      </div>
    </footer>
  );
};

// Professional styling for the Footer
const styles = {
  footer: {
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '2rem 0',
    textAlign: 'center',
    marginTop: 'auto', // Pushes footer to the bottom
  },
  container: {
    width: '90%',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  socialLinks: {
    marginTop: '1rem',
  },
};

export default Footer;
