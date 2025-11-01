import React from 'react';
import { useNavigate } from 'react-router-dom';

const Support = () => {
  const navigate = useNavigate();

  return (
    <div className="support-page">
      <h1>Customer Support</h1>
      <p>Our support team is here to help you with any questions or issues.</p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default Support;