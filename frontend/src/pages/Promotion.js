import React from 'react';
import { useNavigate } from 'react-router-dom';

const Promotion = () => {
  const navigate = useNavigate();

  return (
    <div className="promotion-page">
      <h1>Special Promotions</h1>
      <p>Check out our latest deals and discounts!</p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default Promotion;