import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMugHot, faGlassWhiskey, faBlender, faUtensils, 
  faIceCream, faCookie, faSpinner, faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import Layout from '../../components/Layout';
import { getCategories } from '../../services/api';

const HomePage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map of category names to corresponding FontAwesome icons
  const categoryIcons = {
    'hot-drinks': faMugHot,
    'cold-drinks': faGlassWhiskey,
    'smoothies': faBlender,
    'food': faUtensils,
    'desserts': faIceCream,
    'snacks': faCookie,
    // Default icon if no match is found
    'default': faMugHot
  };

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await getCategories();
        
        // Transform the categories into the format we need
        const formattedCategories = data.map(category => ({
          id: category,
          name: formatCategoryName(category),
          icon: categoryIcons[category] || categoryIcons['default']
        }));
        
        setCategories(formattedCategories);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories. Please try again.');
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Helper function to format category names
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
          <p className="text-gray-600">Loading categories...</p>
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
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Categories</h2>
      
      {categories.length === 0 ? (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md">
          No categories found. Please add some products to the database.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center cursor-pointer"
              onClick={() => navigate(`/category/${category.id}`)}
            >
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={category.icon} className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">{category.name}</h3>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default HomePage;