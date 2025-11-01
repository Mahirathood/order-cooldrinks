import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddDrink = () => {
  const navigate = useNavigate();

  return (
    <div className="add-drink-page">
      <h1>Add New Drink</h1>
      <p>Admin functionality to add new drinks to the collection.</p>
      <button onClick={() => navigate('/admin')}>Back to Admin Panel</button>
    </div>
  );
};

export default AddDrink;