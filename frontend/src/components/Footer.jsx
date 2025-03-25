import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faHome, 
  faSignOutAlt,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../contexts/CartContext';

const Footer = ({ onClearOrder }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemCount, clearCart } = useCart();
  
  // Handle clear order - can be customized per page
  const handleClearOrder = () => {
    if (typeof onClearOrder === 'function') {
      onClearOrder();
    } else if (itemCount > 0) {
      if (window.confirm('Are you sure you want to clear your order?')) {
        clearCart();
      }
    }
  };

  // Don't show footer on login page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <footer className="bg-white shadow-inner p-4 print:hidden">
      <div className="flex justify-around">
        {/* Show checkout button except on checkout page */}
        {location.pathname !== '/checkout' && (
          <button 
            className="flex items-center justify-center px-4 py-2 bg-white hover:bg-blue-600 hover:text-white text-blue-600 rounded-md shadow transition-all duration-300"
            onClick={() => navigate('/checkout')}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
            Checkout
          </button>
        )}

        {/* Show home button except on home page */}
        {location.pathname !== '/home' && (
          <button 
            className="flex items-center justify-center px-4 py-2 bg-white hover:bg-blue-600 hover:text-white text-blue-600 rounded-md shadow transition-all duration-300"
            onClick={() => navigate('/home')}
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Home
          </button>
        )}

        {/* Logout button - always visible */}
        <button 
          className="flex items-center justify-center px-4 py-2 bg-white hover:bg-blue-600 hover:text-white text-blue-600 rounded-md shadow transition-all duration-300"
          onClick={() => navigate('/login')}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          Logout
        </button>

        {/* Clear order button - only on checkout page */}
        {location.pathname === '/checkout' && (
          <button 
            className="flex items-center justify-center px-4 py-2 bg-white hover:bg-red-600 hover:text-white text-red-600 rounded-md shadow transition-all duration-300"
            onClick={handleClearOrder}
            disabled={itemCount === 0}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
            Clear Order
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;