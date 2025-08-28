// frontend/src/App.jsx

import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage'; // Import the AdminPage

function App() {
  // State to keep track of the current page
  const [currentPage, setCurrentPage] = useState('home');

  // Basic navigation styles
  const navStyle = {
    padding: '10px',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    borderBottom: '1px solid #ccc',
  };

  const buttonStyle = {
    margin: '0 10px',
    padding: '8px 16px',
    cursor: 'pointer',
  };

  return (
    <>
      {/* Simple navigation bar */}
      <nav style={navStyle}>
        <button onClick={() => setCurrentPage('home')} style={buttonStyle}>
          User View
        </button>
        <button onClick={() => setCurrentPage('admin')} style={buttonStyle}>
          Admin Panel
        </button>
      </nav>

      {/* Conditionally render the page based on state */}
      {currentPage === 'home' ? <HomePage /> : <AdminPage />}
    </>
  );
}

export default App;
