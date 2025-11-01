import React from 'react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();

  return (
    <div className="orders-page">
      <h1>Your Orders</h1>
      <p>You don't have any orders yet.</p>
      <button onClick={() => navigate('/shop')}>Start Shopping</button>
    </div>
  );
};

export default Orders;