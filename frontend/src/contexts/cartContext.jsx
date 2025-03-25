import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Create context
const CartContext = createContext();

// Initial state
const initialState = {
  items: [],
  total: 0,
  itemCount: 0
};

// Actions
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const CLEAR_CART = 'CLEAR_CART';

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const newItems = [...state.items, action.payload];
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: newItems.length
      };
    
    case REMOVE_ITEM:
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        total: calculateTotal(filteredItems),
        itemCount: filteredItems.length
      };
    
    case UPDATE_ITEM:
      const updatedItems = state.items.map(item => 
        item.id === action.payload.id ? action.payload : item
      );
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        itemCount: updatedItems.length
      };
    
    case CLEAR_CART:
      return initialState;
    
    default:
      return state;
  }
};

// Helper function to calculate total
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

// Provider component
export const CartProvider = ({ children }) => {
  // Check for cart data in localStorage on initial load
  const loadInitialState = () => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : initialState;
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return initialState;
    }
  };

  const [state, dispatch] = useReducer(cartReducer, null, loadInitialState);

  // Save to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  // Cart actions
  const addItem = (item) => {
    dispatch({ type: ADD_ITEM, payload: item });
  };

  const removeItem = (itemId) => {
    dispatch({ type: REMOVE_ITEM, payload: itemId });
  };

  const updateItem = (item) => {
    dispatch({ type: UPDATE_ITEM, payload: item });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  // Format total as currency
  const formattedTotal = `£${state.total.toFixed(2)}`;

  return (
    <CartContext.Provider value={{
      items: state.items,
      itemCount: state.itemCount,
      total: state.total,
      formattedTotal,
      addItem,
      removeItem,
      updateItem,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;