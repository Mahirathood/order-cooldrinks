import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faEye, faStar, faTruck, faDollarSign, faHeadset, faShieldAlt, faUsers } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>About CoolDrink</h1>
          <p>Your Premium Soft Drink Destination</p>
        </div>
      </div>

      {/* Story Section */}
      <div className="about-story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-image">
              <img src="/cool1.png" alt="CoolDrink Story" />
            </div>
            <div className="story-content">
              <h2><FontAwesomeIcon icon={faRocket} /> Our Story</h2>
              <p>
                Founded in 2023, CoolDrink started with a simple mission: to provide the best quality soft drinks 
                to our customers at affordable prices. What began as a small local store has now grown into 
                a trusted online marketplace for all your beverage needs.
              </p>
              <p>
                With a passion for refreshing beverages and customer satisfaction, we've built a platform that 
                connects drink lovers with their favorite brands and new discoveries from around the world. We also 
                partner with local shops within a 5km radius, ensuring fast delivery and supporting local businesses 
                in your community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="about-vision-section">
        <div className="container">
          <div className="vision-content">
            <FontAwesomeIcon icon={faEye} className="vision-icon" />
            <h2>Our Vision</h2>
            <p>
              We aim to be the leading soft drink marketplace, offering a wide variety of beverages from 
              around the world. We believe in quality, affordability, and excellent customer service.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="about-features-section">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FontAwesomeIcon icon={faStar} className="feature-icon" />
              <h3>Premium Selection</h3>
              <p>Wide selection of premium soft drinks from top brands worldwide</p>
            </div>
            <div className="feature-card">
              <FontAwesomeIcon icon={faDollarSign} className="feature-icon" />
              <h3>Competitive Pricing</h3>
              <p>Best prices in the market with regular discounts and offers</p>
            </div>
            <div className="feature-card">
              <FontAwesomeIcon icon={faTruck} className="feature-icon" />
              <h3>Fast Delivery</h3>
              <p>Quick and reliable delivery service to your doorstep</p>
            </div>
            <div className="feature-card">
              <FontAwesomeIcon icon={faHeadset} className="feature-icon" />
              <h3>24/7 Support</h3>
              <p>Excellent customer service always ready to assist you</p>
            </div>
            <div className="feature-card">
              <FontAwesomeIcon icon={faShieldAlt} className="feature-icon" />
              <h3>Secure Payment</h3>
              <p>Safe and secure payment options for peace of mind</p>
            </div>
            <div className="feature-card">
              <FontAwesomeIcon icon={faUsers} className="feature-icon" />
              <h3>Trusted by Thousands</h3>
              <p>Join our growing community of satisfied customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="about-team-section">
        <div className="container">
          <h2>Our Team</h2>
          <p className="team-description">
            Our dedicated team works tirelessly to ensure that you get the best products and service. 
            From our procurement specialists who source the finest beverages to our customer service 
            representatives who are always ready to assist you, we are committed to your satisfaction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;