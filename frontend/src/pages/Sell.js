import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sell = () => {
  const navigate = useNavigate();

  return (
    <div className="sell-page">
      <h1>Sell Your Drinks</h1>
      <p>Partner with us to sell your beverages.</p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default Sell;