import { useNavigate } from 'react-router-dom';

const Promotion = () => {
  const navigate = useNavigate();

  const promotions = [
    {
      _id: 'promo-1',
      title: 'Buy 2 Get 1 Free',
      description: 'On all cola drinks this week',
      discount: '33% OFF',
      icon: '🎉',
      code: 'COLA33'
    },
    {
      _id: 'promo-2',
      title: 'Energy Drink Special',
      description: 'Get 20% off on energy drinks',
      discount: '20% OFF',
      icon: '⚡',
      code: 'ENERGY20'
    },
    {
      _id: 'promo-3',
      title: 'Weekend Combo',
      description: 'Mix and match any 5 drinks',
      discount: '₹50 OFF',
      icon: '🛍️',
      code: 'WEEKEND50'
    }
  ];

  return (
    <section id="products1" className="section-p1">
      <div className="container">
        <h2>Special Promotions</h2>
        <p>Amazing deals and offers on your favorite drinks</p>

        <div className="home-pro-container">
          {promotions.map((promo) => (
            <div className="home-product-card" key={promo._id}>
              <div className="product-image-container">
                <div className="service-icon">
                  {promo.icon}
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{promo.title}</h3>
                <p className="product-quantity">{promo.description}</p>
                <div className="service-time">
                  <span> Code: {promo.code}</span>
                </div>
                <div className="product-price-section">
                  <span className="product-price">Save: {promo.discount}</span>
                </div>
              </div>
              <button className="home-cart-button" onClick={() => navigate('/shop')}>
                Shop Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotion;