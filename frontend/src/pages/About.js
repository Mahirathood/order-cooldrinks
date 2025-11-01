import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <h1>About Us</h1>
      <p>Welcome to CoolDrink, your premier destination for refreshing beverages!</p>
      <p>We offer a wide selection of quality drinks delivered right to your doorstep.</p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default About;