import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserCircle, 
  faClock, 
  faTicketAlt, 
  faShoppingCart,
  faSignOutAlt,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../contexts/CartContext';

const Header = ({ showOrderNumber, orderNumber }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemCount, formattedTotal } = useCart();
  const [currentTime, setCurrentTime] = useState('');
  const [staffName, setStaffName] = useState('Safiullah Khan');

  // Update time function
  const updateTime = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    setCurrentTime(timeString);
  };
  
  // Initialize time and set interval
  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 60000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Handle logout
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="bg-white shadow p-4 flex flex-col md:flex-row justify-between items-start md:items-center sticky top-0 z-10 print:hidden">
      {/* Left section with logo */}
      <div className="flex items-center space-x-3 mb-3 md:mb-0">
        <h1 
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate('/home')}
        >
          FizzFlow
        </h1>
      </div>

      {/* Middle section with user info and time */}
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
        <div className="flex items-center text-sm">
          <FontAwesomeIcon icon={faUserCircle} className="text-blue-600 mr-2" />
          <span>Staff: {staffName}</span>
        </div>
        <div className="flex items-center text-sm">
          <FontAwesomeIcon icon={faClock} className="text-blue-600 mr-2" />
          <span>{currentTime}</span>
        </div>
      </div>

      {/* Right section with cart/order and navigation */}
      <div className="flex items-center space-x-4">
        {showOrderNumber ? (
          <div className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm">
            <span>Order #: </span>
            <strong>{orderNumber || '000000'}</strong>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <button 
              className="flex items-center bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-2 rounded-md text-sm transition duration-300"
              onClick={() => alert('Voucher functionality to be implemented')}
            >
              <FontAwesomeIcon icon={faTicketAlt} className="mr-2" />
              Apply Voucher
            </button>
            <div 
              className="flex items-center text-sm cursor-pointer"
              onClick={() => navigate('/checkout')}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="text-blue-600 mr-2" />
              <span>Items: <strong>{itemCount || 0}</strong></span>
              <span className="ml-2">Total: <strong>{formattedTotal || '£0.00'}</strong></span>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        {location.pathname !== '/login' && (
          <div className="flex space-x-2 ml-4">
            {location.pathname !== '/home' && (
              <button 
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center px-2 py-1 border border-blue-200 rounded hover:bg-blue-50"
                onClick={() => navigate('/home')}
              >
                <FontAwesomeIcon icon={faHome} className="mr-1" />
                Home
              </button>
            )}
            <button 
              className="text-red-600 hover:text-red-800 text-sm flex items-center px-2 py-1 border border-red-200 rounded hover:bg-red-50"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;