// frontend/src/App.jsx

import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import authService from './services/authService';

function App() {
  // State to hold the logged-in user's data
  const [user, setUser] = useState(null);
  // State to switch between login and register forms
  const [showLogin, setShowLogin] = useState(true);
  // State for the main view (home or admin)
  const [currentView, setCurrentView] = useState('home');

  // Check for a logged-in user in local storage when the app loads
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogin = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setCurrentView('home'); // Reset to home view on logout
  };

  // If no user is logged in, show the Login/Register forms
  if (!user) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          {showLogin ? (
            <LoginPage onLoginSuccess={handleLogin} />
          ) : (
            <RegisterPage onRegisterSuccess={handleLogin} />
          )}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={() => setShowLogin(!showLogin)} style={styles.toggleButton}>
              {showLogin ? 'Need an account? Register' : 'Have an account? Login'}
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If a user IS logged in, show the main application
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1, width: '90%', maxWidth: '1200px', margin: '2rem auto' }}>
        <div style={styles.navContainer}>
          <button onClick={() => setCurrentView('home')} style={styles.navButton}>
            User View
          </button>
          <button onClick={() => setCurrentView('admin')} style={styles.navButton}>
            Admin Panel
          </button>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
        
        {currentView === 'home' ? <HomePage /> : <AdminPage />}
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '1rem',
  },
  navContainer: {
    textAlign: 'center',
    marginBottom: '2rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  navButton: {
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  logoutButton: {
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #dc3545',
    backgroundColor: '#dc3545',
    color: 'white',
  },
};

export default App;
