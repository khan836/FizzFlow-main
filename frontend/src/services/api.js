// src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
});

// Helper function to convert dictionary response to array with IDs
const dictToArray = (dict) => {
  if (!dict || typeof dict !== 'object') return [];
  return Object.keys(dict).map(id => ({
    id,
    ...dict[id]
  }));
};

// Items
export const getItems = async () => {
  try {
    const response = await api.get('/items/');
    // Check if response is an object (dictionary) or already an array
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      return dictToArray(response.data);
    }
  } catch (error) {
    console.error('Error fetching items:', error);
    return []; // Return empty array instead of throwing to avoid UI crashes
  }
};

export const getItemsByCategory = async (category) => {
  try {
    // First try the dedicated endpoint
    try {
      const response = await api.get(`/items/by-category/${category}/`);
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return dictToArray(response.data);
    } catch (categoryError) {
      console.warn('Category-specific endpoint failed, falling back to filter approach');
      
      // Fallback to getting all items and filtering client-side
      const allItems = await getItems();
      return allItems.filter(item => item.category === category);
    }
  } catch (error) {
    console.error(`Error fetching items for category ${category}:`, error);
    return []; // Return empty array instead of throwing
  }
};

export const getItemDetail = async (itemId) => {
  try {
    // First try the dedicated endpoint
    try {
      const response = await api.get(`/items/${itemId}/`);
      return response.data;
    } catch (detailError) {
      console.warn('Item detail endpoint failed, falling back to find approach');
      
      // Fallback: fetch all items and find the one we need
      const allItems = await getItems();
      const item = allItems.find(item => item.id === itemId);
      
      if (!item) {
        throw new Error(`Item with ID ${itemId} not found`);
      }
      
      return item;
    }
  } catch (error) {
    console.error(`Error fetching item ${itemId}:`, error);
    throw error;
  }
};

export const saveItem = async (itemData) => {
  try {
    const response = await api.post('/items/save/', itemData);
    return response.data;
  } catch (error) {
    console.error('Error saving item:', error);
    throw error;
  }
};

export const updateItem = async (itemId, itemData) => {
  try {
    const response = await api.put(`/items/update/${itemId}/`, itemData);
    return response.data;
  } catch (error) {
    console.error(`Error updating item ${itemId}:`, error);
    throw error;
  }
};

export const deleteItem = async (itemId) => {
  try {
    const response = await api.delete(`/items/delete/${itemId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting item ${itemId}:`, error);
    throw error;
  }
};

// Orders
export const getOrders = async () => {
  try {
    const response = await api.get('/orders/');
    // Check if response is an object (dictionary) or already an array
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      return dictToArray(response.data);
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    return []; // Return empty array instead of throwing
  }
};

export const saveOrder = async (orderData) => {
  try {
    const response = await api.post('/orders/save/', orderData);
    return response.data;
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
};

export const getOrderDetail = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    throw error;
  }
};

export const updateOrder = async (orderId, orderData) => {
  try {
    const response = await api.put(`/orders/update/${orderId}/`, orderData);
    return response.data;
  } catch (error) {
    console.error(`Error updating order ${orderId}:`, error);
    throw error;
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const response = await api.delete(`/orders/delete/${orderId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting order ${orderId}:`, error);
    throw error;
  }
};

// Categories
export const getCategories = async () => {
  try {
    // First try dedicated categories endpoint
    try {
      const response = await api.get('/categories/');
      return response.data || [];
    } catch (categoryError) {
      console.warn('Categories endpoint failed, falling back to extracting from items');
      
      // Fallback: Extract categories from items
      const allItems = await getItems();
      const uniqueCategories = [...new Set(allItems.map(item => item.category).filter(Boolean))];
      return uniqueCategories;
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    return []; // Return empty array instead of throwing
  }
};

export default api;