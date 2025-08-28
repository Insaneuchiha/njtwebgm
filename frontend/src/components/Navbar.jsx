// frontend/src/components/Navbar.jsx

import React from 'react';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <h1 style={styles.logo}>Nethaji Traders</h1>
        <ul style={styles.navLinks}>
          <li style={styles.linkItem}><a href="/" style={styles.link}>Home</a></li>
          <li style={styles.linkItem}><a href="#" style={styles.link}>About</a></li>
          <li style={styles.linkItem}><a href="#" style={styles.link}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

// Professional styling for the Navbar
const styles = {
  nav: {
    backgroundColor: '#fff',
    color: '#333',
    padding: '1rem 0',
    borderBottom: '1px solid #e7e7e7',
    boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
  },
  container: {
    width: '90%',
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    margin: 0,
    color: '#2c3e50',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  linkItem: {
    marginLeft: '20px',
  },
  link: {
    color: '#555',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  },
};

export default Navbar;
