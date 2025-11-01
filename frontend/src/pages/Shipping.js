import React from 'react';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
  const navigate = useNavigate();

  return (
    <div className="shipping-page">
      <h1>Shipping Information</h1>
      <p>We offer fast and reliable shipping to your doorstep.</p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default Shipping;