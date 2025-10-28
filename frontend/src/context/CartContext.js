import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload };
    
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return { ...state, items: [] };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    loading: false
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (drink) => {
    dispatch({ type: 'ADD_TO_CART', payload: drink });
  };

  const removeFromCart = (drinkId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: drinkId });
  };

  const updateQuantity = (drinkId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(drinkId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: drinkId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const checkout = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Check if user is logged in
      const token = localStorage.getItem('token');
      if (!token) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return { success: false, message: 'Please login to complete checkout.' };
      }
      
      // Simulate checkout process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful checkout
      const orderNumber = 'ORD-' + Date.now();
      const total = getCartTotal();
      
      // Store order in localStorage for order history
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const newOrder = {
        id: orderNumber,
        items: [...state.items],
        total: total,
        date: new Date().toISOString(),
        status: 'confirmed'
      };
      orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(orders));
      
      // Update sales tracking
      const salesData = JSON.parse(localStorage.getItem('salesData') || '{}');
      state.items.forEach(item => {
        if (salesData[item._id]) {
          salesData[item._id].totalSold += item.quantity;
          salesData[item._id].totalRevenue += (item.price * item.quantity);
          salesData[item._id].orderCount += 1;
        } else {
          salesData[item._id] = {
            productId: item._id,
            title: item.title,
            price: item.price,
            image: item.image,
            category: item.category || 'Beverage',
            details: item.details,
            totalSold: item.quantity,
            totalRevenue: (item.price * item.quantity),
            orderCount: 1,
            lastSold: new Date().toISOString()
          };
        }
      });
      localStorage.setItem('salesData', JSON.stringify(salesData));
      
      // Clear cart after successful checkout
      clearCart();
      
      dispatch({ type: 'SET_LOADING', payload: false });
      return { 
        success: true, 
        message: `Order ${orderNumber} placed successfully! Total: ₹${total.toFixed(2)}` 
      };
      
    } catch (error) {
      console.error('Checkout error:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, message: 'Checkout failed. Please try again.' };
    }
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart: state.items,
    loading: state.loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    checkout,
    getCartTotal,
    getCartItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};