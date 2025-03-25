import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import page components
import LoginPage from './pages/login/Login';
import HomePage from './pages/home/Home';
import CategoryPage from './pages/category/Category';


// Import context providers
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />

          {/* Redirect to login if no path matches */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;