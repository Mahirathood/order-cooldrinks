import { useNavigate } from 'react-router-dom';

const Support = () => {
  const navigate = useNavigate();

  const supportOptions = [
    {
      _id: 'support-1',
      title: 'Live Chat Support',
      description: 'Get instant help from our team',
      availability: '24/7 Available',
      icon: '💬',
      action: 'Start Chat'
    },
    {
      _id: 'support-2',
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      availability: 'Mon-Sun 9AM-9PM',
      icon: '📞',
      action: 'Call Now'
    },
    {
      _id: 'support-3',
      title: 'Email Support',
      description: 'Send us your queries via email',
      availability: 'Response in 2 hours',
      icon: '📧',
      action: 'Send Email'
    }
  ];

  return (
    <section id="products1" className="section-p1">
      <div className="container">
        <h2>24/7 Customer Support</h2>
        <p>We're here to help you anytime, anywhere</p>

        <div className="home-pro-container">
          {supportOptions.map((option) => (
            <div className="home-product-card" key={option._id}>
              <div className="product-image-container">
                <div className="service-icon">
                  {option.icon}
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{option.title}</h3>
                <p className="product-quantity">{option.description}</p>
                <div className="service-time">
                  <span>🕒 {option.availability}</span>
                </div>
                <div className="product-price-section">
                  <span className="product-price">Status: Online</span>
                </div>
              </div>
              <button className="home-cart-button" onClick={() => navigate('/contact')}>
                 {option.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Support;