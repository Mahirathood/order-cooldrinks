import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckFast, faWineBottle, faRectangleAd, faHandshake, faHeadset } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useCart } from '../context/CartContext';
import ServiceCard from '../components/ServiceCard';

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Featured products data
  const featuredProducts = [
    {
      _id: 'featured-1',
      title: 'Coca Cola Classic',
      price: 50,
      image: '/coca-cola.jpeg',
      category: 'Featured'
    },
    {
      _id: 'featured-2',
      title: 'Red Bull Energy',
      price: 100,
      image: '/redbull.webp',
      category: 'Popular'
    },
    {
      _id: 'featured-3',
      title: 'Frooti Fresh Mango',
      price: 20,
      image: '/frooti.jpg',
      category: 'New'
    }
  ];

  // Services data
  const services = [
    {
      id: 'service-1',
      title: 'Shipping',
      icon: <FontAwesomeIcon icon={faTruckFast} />,
      price: 'Free',
      link: '/shipping',
      buttonIcon: '📦'
    },
    {
      id: 'service-2',
      title: 'Wine Bottle',
      icon: <FontAwesomeIcon icon={faWineBottle} />,
      price: 'Save 20%',
      link: '/promotion',
      buttonIcon: '🍷'
    },
    {
      id: 'service-3',
      title: 'Advertisement',
      icon: <FontAwesomeIcon icon={faRectangleAd} />,
      price: 'New',
      link: '/promotion',
      buttonIcon: '📢'
    },
    {
      id: 'service-4',
      title: 'Handshake',
      icon: <FontAwesomeIcon icon={faHandshake} />,
      price: 'Special',
      link: '/support',
      buttonIcon: '🤝'
    }
  ];

  // Generate random quantity for products
  const generateQuantity = (productId) => {
    const quantities = [200, 250, 300, 330, 500, 750, 1000];
    return quantities[Math.floor(Math.random() * quantities.length)];
  };

  // Render star ratings
  const renderStars = () => {
    const stars = [];
    const rating = Math.floor(Math.random() * 2) + 4; // 4 or 5 stars
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'star filled' : 'star'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="section-p1">
        <div className="hero-content">
          <h4>Trade-in-offer</h4>
          <h1>Super value deals</h1>
          <h1>On all products</h1>
          <p>Discover exclusive cool drinks curated for every taste – delivered fresh to your door.</p>
          <button className="explore-btn" onClick={() => navigate('/shop')}>Explore Now</button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-p1">
        <div className="services-container">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Promotional Banners */}
      <section id="banners" className="section-p1">
        <div className="banner-container">
          <div
            className="banner banner-left"
            style={{
              backgroundImage: `url('/coca-cola add.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="banner-content">
              <h4>Crazy deals</h4>
              <h2>Buy 4 get 1 free</h2>
              <span>The best classic drink is on sale at CoolDrink</span>
              <button className="banner-btn" onClick={() => navigate('/shop')}>Learn more</button>
            </div>
          </div>

          <div
            className="banner banner-right"
            style={{
              backgroundImage: `url('/redbull add.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="banner-content">
              <h4>Spring/Summer</h4>
              <h2>Upcoming Season</h2>
              <span>Charge Up with Every Sip</span>
              <button className="banner-btn" onClick={() => navigate('/shop')}>Collection</button>
            </div>
          </div>
        </div>
      </section>

      <section id="products1" className="section-p1">
        <div className="container">
          <h2>Featured Products</h2>
          <p>Signature Sips of the Season</p>
          <div className="home-pro-container">
            {featuredProducts.map((product) => (
              <div className="home-product-card" key={product._id}>
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.title}
                    onError={(e) => { e.target.src = '/cool1.png' }}
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.title}</h3>
                  <p className="product-quantity">Quantity {generateQuantity(product._id)} ML</p>
                  <div className="product-rating">
                    {renderStars()}
                  </div>
                  <div className="product-price-section">
                    <span className="product-price">Price: ₹{product.price}</span>
                  </div>
                </div>
                <button className="home-cart-button" onClick={() => navigate('/shop')}>
                  View More Products
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="section-p1">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h2>Sign Up For NewsLetters</h2>
            <p>Get E-mail updates about our latest shop and <span className="highlight">special offers.</span></p>
          </div>
          <div className="newsletter-form">
            <input type="email" placeholder="Your Email address" />
            <button>Sign Up</button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer id="footer" className="section-p1">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact</h3>
            <p><strong>Address:</strong> Hyderabad, Telangana</p>
            <p><strong>Phone:</strong> (+91) 1234567890</p>
            <p><strong>Email:</strong> support@cooldrink.com</p>
          </div>

          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>About</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/shipping">Delivery Information</a></li>
              <li><a href="/contact">Privacy Policy</a></li>
              <li><a href="/contact">Terms & Conditions</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>My Account</h3>
            <ul>
              <li><a href="/login">Sign In</a></li>
              <li><a href="/cart">View Cart</a></li>
              <li><a href="/orders">My Wishlist</a></li>
              <li><a href="/orders">Track My Order</a></li>
              <li><a href="/support">Help</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 CoolDrink Online. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;