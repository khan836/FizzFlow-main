import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, faMugHot, faSpinner, faExclamationTriangle,
  faGlassWhiskey, faCoffee, faBacon, faUtensils, faIceCream
} from '@fortawesome/free-solid-svg-icons';
import Layout from '../../components/Layout';
import { getItemsByCategory, getCategories } from '../../services/api';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  
  // State for product data
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Category to icon mapping
  const categoryIcons = {
    'hot-drinks': faMugHot,
    'cold-drinks': faGlassWhiskey,
    'coffee': faCoffee,
    'food': faUtensils,
    'desserts': faIceCream,
    'default': faMugHot
  };

  // Get icon based on item category or name
  const getItemIcon = (item) => {
    if (item.category && categoryIcons[item.category]) {
      return categoryIcons[item.category];
    }
    
    // Try to match by name
    const name = item.name.toLowerCase();
    if (name.includes('coffee') || name.includes('latte') || name.includes('espresso')) {
      return faCoffee;
    } else if (name.includes('tea')) {
      return faMugHot;
    } else if (name.includes('food') || name.includes('sandwich') || name.includes('bacon')) {
      return faBacon;
    }
    
    return categoryIcons['default'];
  };

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [itemsData, categoriesData] = await Promise.all([
          getItemsByCategory(categoryId),
          getCategories()
        ]);
        
        setCategories(categoriesData);
        setItems(itemsData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load items. Please try again.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  const formatCategoryName = (category) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64">
          <FontAwesomeIcon icon={faSpinner} className="text-blue-600 text-4xl animate-spin mb-4" />
          <p className="text-gray-600">Loading items...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64">
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 text-4xl mb-4" />
          <p className="text-red-600 font-medium">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 mb-6">
            {categories.length === 0 ? (
              <li className="text-gray-500 p-2">No categories available</li>
            ) : (
              categories.map(category => (
                <li 
                  key={category}
                  className={`rounded-md ${category === categoryId ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-blue-100'}`}
                >
                  <button 
                    className="w-full text-left px-3 py-2"
                    onClick={() => navigate(`/category/${category}`)}
                  >
                    {formatCategoryName(category)}
                  </button>
                </li>
              ))
            )}
          </ul>
          <div className="pt-4 border-t border-gray-200">
            <button 
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => navigate('/home')}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> 
              Back to Home
            </button>
          </div>
        </aside>

        {/* Product List */}
        <section className="flex-1 bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-6">
            {formatCategoryName(categoryId || '')}
          </h2>
          
          {items.length === 0 ? (
            <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md">
              No items found in this category. Please add some products.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map(item => (
                <div 
                  key={item.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/personalize/${item.id}`)}
                >
                  <div className="h-32 bg-gray-200 flex items-center justify-center">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <FontAwesomeIcon icon={getItemIcon(item)} className="text-gray-400 text-4xl" />
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-blue-600 font-semibold">£{parseFloat(item.price).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default CategoryPage;