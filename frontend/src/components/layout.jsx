import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ 
  children, 
  showOrderNumber = false, 
  orderNumber = null,
  onClearOrder = null
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header showOrderNumber={showOrderNumber} orderNumber={orderNumber} />
      
      <main className="flex-1 p-4 md:p-6">
        {children}
      </main>
      
      <Footer onClearOrder={onClearOrder} />
    </div>
  );
};

export default Layout;