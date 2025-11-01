import React from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>Have questions or feedback? Reach out to us!</p>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" required />
        </div>
        <div>
          <label>Message:</label>
          <textarea required></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
      
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default Contact;