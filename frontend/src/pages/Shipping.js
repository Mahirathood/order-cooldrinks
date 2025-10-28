import { useNavigate } from 'react-router-dom';

const Shipping = () => {
  const navigate = useNavigate();

  const shippingOptions = [
    {
      _id: 'shipping-1',
      title: 'Standard Delivery',
      description: 'Free delivery in 3-5 business days',
      price: 'Free',
      icon: '🚚',
      time: '3-5 Days'
    },
    {
      _id: 'shipping-2',
      title: 'Express Delivery',
      description: 'Fast delivery in 1-2 business days',
      price: '₹50',
      icon: '⚡',
      time: '1-2 Days'
    },
    {
      _id: 'shipping-3',
      title: 'Same Day Delivery',
      description: 'Get your drinks delivered today',
      price: '₹100',
      icon: '🏃‍♂️',
      time: 'Same Day'
    }
  ];

  return (
    <section id="products1" className="section-p1">
      <div className="container">
        <h2>Shipping Options</h2>
        <p>Choose the delivery option that works best for you</p>

        <div className="home-pro-container">
          {shippingOptions.map((option) => (
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
                  <span>⏱️ {option.time}</span>
                </div>
                <div className="product-price-section">
                  <span className="product-price">Price: {option.price}</span>
                </div>
              </div>
              <button className="home-cart-button" onClick={() => navigate('/shop')}>
                 Select Option
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shipping;