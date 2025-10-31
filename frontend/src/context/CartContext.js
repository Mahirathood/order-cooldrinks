import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  return <CartContext.Provider value={{}}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  return context || {};
};
