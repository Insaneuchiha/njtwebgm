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
  const [user, setUser] = useState(null);
  // Read the current "route" from the URL hash (e.g., #login)
  const [route, setRoute] = useState(window.location.hash.substring(1));

  // Check for a logged-in user in local storage when the app first loads
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  // Listen for changes in the URL hash to update the view
  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash.substring(1));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogin = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedInUser);
    window.location.hash = 'admin'; // Go to the admin panel after login
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    window.location.hash = ''; // Go back to the home page after logout
  };

  // This function decides which page to show based on the URL hash
  const renderPage = () => {
    switch (route) {
      case 'login':
        return user ? <AdminPage /> : <LoginPage onLoginSuccess={handleLogin} />;
      case 'register':
        return user ? <AdminPage /> : <RegisterPage onRegisterSuccess={handleLogin} />;
      case 'admin':
        // This is a protected route. If no user, show login page.
        return user ? <AdminPage /> : <LoginPage onLoginSuccess={handleLogin} />;
      default:
        // By default, always show the HomePage
        return <HomePage />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar user={user} onLogout={handleLogout} />
      <main style={{ flex: 1, width: '90%', maxWidth: '1200px', margin: '2rem auto' }}>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
