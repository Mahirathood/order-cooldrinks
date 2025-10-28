import { useNavigate } from 'react-router-dom';

const Sell = () => {
  const navigate = useNavigate();

  const sellingOptions = [
    {
      _id: 'sell-1',
      title: 'Become a Partner',
      description: 'Join our network of drink suppliers',
      benefit: 'High Commission',
      icon: 'P',
      action: 'Apply Now'
    },
    {
      _id: 'sell-2',
      title: 'Bulk Orders',
      description: 'Sell drinks in bulk quantities',
      benefit: 'Best Prices',
      icon: 'B',
      action: 'Get Quote'
    },
    {
      _id: 'sell-3',
      title: 'Franchise Opportunity',
      description: 'Open your own CoolDrink store',
      benefit: 'Full Support',
      icon: 'F',
      action: 'Learn More'
    }
  ];

  return (
    <section id="products1" className="section-p1">
      <div className="container">
        <h2>Sell With Us</h2>
        <p>Join our growing network and start earning today</p>

        <div className="home-pro-container">
          {sellingOptions.map((option) => (
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
                  <span>$ {option.benefit}</span>
                </div>
                <div className="product-price-section">
                  <span className="product-price">Opportunity: Available</span>
                </div>
              </div>
              <button 
                className="home-cart-button" 
                onClick={() => {
                  if (option.title === 'Become a Partner') {
                    navigate('/admin');
                  } else {
                    navigate('/contact');
                  }
                }}
              >
                {option.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sell;