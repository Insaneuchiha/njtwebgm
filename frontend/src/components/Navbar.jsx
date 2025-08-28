// frontend/src/components/Navbar.jsx

import React from 'react';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <h1 style={styles.logo}>
          <a href="/#" style={{...styles.link, ...styles.logoLink}}>Nethaji Traders</a>
        </h1>
        <ul style={styles.navLinks}>
          <li style={styles.linkItem}><a href="/#" style={styles.link}>Home</a></li>
          <li style={styles.linkItem}><a href="#" style={styles.link}>About</a></li>
          <li style={styles.linkItem}><a href="#" style={styles.link}>Contact</a></li>
          {user ? (
            // If user is logged in, show Admin and Logout
            <>
              <li style={styles.linkItem}><a href="/#admin" style={styles.link}>Admin Panel</a></li>
              <li style={styles.linkItem}><button onClick={onLogout} style={styles.logoutButton}>Logout</button></li>
            </>
          ) : (
            // If not logged in, show the Admin Login link
            <li style={styles.linkItem}><a href="/#login" style={styles.link}>Admin Login</a></li>
          )}
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
    flexWrap: 'wrap',
    gap: '1rem',
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    margin: 0,
    color: '#2c3e50',
    flexShrink: 0,
  },
  logoLink: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
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
  logoutButton: {
    background: 'none',
    border: '1px solid #555',
    borderRadius: '5px',
    color: '#555',
    cursor: 'pointer',
    padding: '5px 10px',
    fontSize: '1rem',
    fontWeight: '500',
  }
};

export default Navbar;
