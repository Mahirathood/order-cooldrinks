import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <p>Your cart is currently empty.</p>
      <button onClick={() => navigate('/shop')}>Continue Shopping</button>
    </div>
  );
};

export default Cart;