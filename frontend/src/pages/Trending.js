import React from 'react';
import { useNavigate } from 'react-router-dom';

const Trending = () => {
  const navigate = useNavigate();

  return (
    <div className="trending-page">
      <h1>Trending Drinks</h1>
      <p>Discover the most popular drinks right now!</p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default Trending;