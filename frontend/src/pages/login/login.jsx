import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, faLock
} from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
  const [username, setUsername] = useState('safiullah');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('staff');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { username, password, loginType, rememberMe });
    
    // For demo purposes, just navigate to home
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-600 to-blue-400 p-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-6 text-center">
            <h1 className="text-3xl font-bold">FizzFlow</h1>
            <p className="text-blue-100 mt-1">For a bubbly and fast ordering experience</p>
          </div>

          {/* Form */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">Staff Login</h2>
            
            <form onSubmit={handleLogin}>
              <div className="mb-4 relative">
                <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                />
              </div>
              
              <div className="mb-4 relative">
                <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="password" 
                  className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <label className="flex items-center text-gray-600">
                  <input 
                    type="checkbox" 
                    className="mr-2 h-4 w-4 text-blue-600"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  Remember me
                </label>
                <a href="#" className="text-blue-600 hover:text-blue-800 text-sm">Forgot Password?</a>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              >
                Login
              </button>
            </form>
            
            {/* Login Type Selector */}
            <div className="mt-6 flex justify-center space-x-6">
              <label className={`flex items-center px-4 py-2 rounded-full cursor-pointer ${loginType === 'staff' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'}`}>
                <input 
                  type="radio" 
                  name="login-type" 
                  value="staff" 
                  className="hidden"
                  checked={loginType === 'staff'}
                  onChange={() => setLoginType('staff')}
                />
                <span>Staff</span>
              </label>
              <label className={`flex items-center px-4 py-2 rounded-full cursor-pointer ${loginType === 'admin' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-700'}`}>
                <input 
                  type="radio" 
                  name="login-type" 
                  value="admin" 
                  className="hidden"
                  checked={loginType === 'admin'}
                  onChange={() => setLoginType('admin')}
                />
                <span>Administrator</span>
              </label>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center text-white mt-6">
          <p>&copy; 2025 FizzFlow. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;