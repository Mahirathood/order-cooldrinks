import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-panel-page">
      <h1>Admin Panel</h1>
      <p>Welcome to the admin panel. Manage your drinks and orders here.</p>
      <button onClick={() => navigate('/add-drink')}>Add New Drink</button>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default AdminPanel;