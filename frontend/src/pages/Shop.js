import React from 'react';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
  const navigate = useNavigate();

  return (
    <div className="shop-page">
      <h1>Shop Page</h1>
      <p>Welcome to our shop! Browse our collection of cool drinks.</p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default Shop;