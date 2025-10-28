import { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl, API_ENDPOINTS, getImageUrl } from '../config/api';
import { useCart } from '../context/CartContext';
import SearchBar from '../components/SearchBar';

// Sample drinks data with real images from backend
const sampleDrinks = [
  {
    _id: '1',
    title: 'Coca Cola Classic',
    details: 'Classic refreshing cola drink',
    price: 50,
    image: '/coca-cola.jpeg',
    category: 'Cola'
  },
  {
    _id: '2',
    title: 'Pepsi Cola',
    details: 'Bold and refreshing cola',
    price: 50,
    image: '/pepsi.webp',
    category: 'Cola'
  },
  {
    _id: '3',
    title: 'Sprite Lemon Lime',
    details: 'Crisp lemon-lime soda',
    price: 40,
    image: '/sprite.jpg',
    category: 'Lemon-Lime'
  },
  {
    _id: '4',
    title: 'Fanta Orange',
    details: 'Orange flavored soda',
    price: 40,
    image: '/fanta.jpg',
    category: 'Orange'
  },
  {
    _id: '5',
    title: '7UP',
    details: 'Clear lemon-lime soda',
    price: 40,
    image: '/7up.jpeg',
    category: 'Lemon-Lime'
  },
  {
    _id: '6',
    title: 'Thums Up',
    details: 'Strong cola with a kick',
    price: 50,
    image: '/thumsup.jpg',
    category: 'Cola'
  },
  {
    _id: '7',
    title: 'Limca',
    details: 'Fresh lime and lemon drink',
    price: 30,
    image: '/limca.jpg',
    category: 'Lemon-Lime'
  },
  {
    _id: '8',
    title: 'Mirinda',
    details: 'Orange burst flavor',
    price: 40,
    image: '/mirinda.jpg',
    category: 'Orange'
  },
  {
    _id: '9',
    title: 'Mountain Dew',
    details: 'Citrus charged energy drink',
    price: 70,
    image: '/Mountain Dew.jpeg',
    category: 'Energy'
  },
  {
    _id: '10',
    title: 'Red Bull',
    details: 'Energy drink that gives you wings',
    price: 100,
    image: '/redbull.webp',
    category: 'Energy'
  },
  {
    _id: '11',
    title: 'Red Sting Energy',
    details: 'Power packed energy drink',
    price: 80,
    image: '/red-sting-energy.jpg',
    category: 'Energy'
  },
  {
    _id: '12',
    title: 'Monster Energy',
    details: 'Unleash the beast within',
    price: 90,
    image: '/Mega-Monster-2.jpg',
    category: 'Energy'
  },
  {
    _id: '13',
    title: 'Frooti',
    details: 'Fresh mango drink',
    price: 20,
    image: '/frooti.jpg',
    category: 'Fruit'
  },
  {
    _id: '14',
    title: 'Maaza',
    details: 'Real mango taste',
    price: 20,
    image: '/maaza.jpg',
    category: 'Fruit'
  },
  {
    _id: '15',
    title: 'Slice',
    details: 'Mango drink with pulp',
    price: 30,
    image: '/slice.jpg',
    category: 'Fruit'
  },
  {
    _id: '16',
    title: 'Appy Fizz',
    details: 'Sparkling apple drink',
    price: 60,
    image: '/appy fizz.jpg',
    category: 'Apple'
  },
  {
    _id: '17',
    title: 'Bisleri Limonata',
    details: 'The lime of life',
    price: 50,
    image: '/bisleri-limonata-the-lime-of-life.webp',
    category: 'Lime'
  },
  {
    _id: '18',
    title: 'H2OH!',
    details: 'Flavored water drink',
    price: 20,
    image: '/H2oh.webp',
    category: 'Water'
  },
  {
    _id: '19',
    title: 'Paper Boat',
    details: 'Traditional Indian drinks',
    price: 40,
    image: '/paperboat.jpg',
    category: 'Traditional'
  },
  {
    _id: '20',
    title: 'Amul Kool',
    details: 'Refreshing milk drink',
    price: 30,
    image: '/ammul.jpg',
    category: 'Milk'
  }
];

// Generate random rating between 3-5 stars with more variety
const generateRating = (id) => {
  // Create a more varied seed from the ID
  let seed = 0;
  if (typeof id === 'string') {
    // For string IDs (like MongoDB ObjectIds), use character codes
    for (let i = 0; i < id.length; i++) {
      seed += id.charCodeAt(i);
    }
  } else {
    seed = parseInt(id) || 1;
  }

  // Generate ratings from 3.0 to 5.0 with half-star precision
  const baseRating = 3 + ((seed * 7 + 13) % 5); // 0-4 range
  const halfStar = ((seed * 3 + 7) % 2) * 0.5; // 0 or 0.5
  const finalRating = Math.min(5, baseRating + halfStar); // Cap at 5.0

  return Math.max(3, finalRating); // Ensure minimum 3.0
};

// Generate random ML quantity for drinks
const generateQuantity = (id) => {
  const quantities = [150, 250, 500, 650];
  let seed = 0;
  if (typeof id === 'string') {
    for (let i = 0; i < id.length; i++) {
      seed += id.charCodeAt(i);
    }
  } else {
    seed = parseInt(id) || 1;
  }
  return quantities[seed % quantities.length];
};

// Render star rating with filled stars like in the design
const renderStars = () => {
  const stars = [];

  // Add full stars (always show 5 stars filled for the design)
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className="star-icon filled">★</span>
    );
  }

  return stars;
};

const Shop = () => {
  const [apiDrinks, setApiDrinks] = useState([]);
  const [allDrinks, setAllDrinks] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        console.log('Fetching drinks from API:', getApiUrl(API_ENDPOINTS.DRINKS));

        // Try to fetch from API with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await axios.get(getApiUrl(API_ENDPOINTS.DRINKS), {
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.data && response.data.length > 0) {
          console.log('Successfully fetched', response.data.length, 'drinks from API');
          setApiDrinks(response.data);
          // Combine sample drinks with API drinks
          const combinedDrinks = [...sampleDrinks, ...response.data];
          setAllDrinks(combinedDrinks);
          setFilteredDrinks(combinedDrinks);
        } else {
          console.log('API returned empty data, using sample drinks only');
          setApiDrinks([]);
          setAllDrinks(sampleDrinks);
          setFilteredDrinks(sampleDrinks);
        }

        setLoading(false);
      } catch (error) {
        console.error('API fetch failed, using sample data:', error.message);
        // Use sample data when API fails
        setApiDrinks([]);
        setAllDrinks(sampleDrinks);
        setFilteredDrinks(sampleDrinks);
        setLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  const handleAddToCart = (drink) => {
    addToCart(drink);
    alert('Item added to cart!');
  };

  const handleImageError = (e) => {
    // Fallback to a default image if the specific image fails to load
    e.target.src = '/cool1.png';
  };

  const getDisplayImageUrl = (drink) => {
    if (!drink.image) {
      return '/cool1.png'; // Default fallback
    }

    // If image starts with /uploads, it's from API - use full URL
    if (drink.image.startsWith('/uploads/')) {
      return getImageUrl(drink.image);
    }

    // If image starts with /, it's a local image
    if (drink.image.startsWith('/')) {
      return drink.image;
    }

    // If it's already a full URL, use as is
    if (drink.image.startsWith('http')) {
      return drink.image;
    }

    // Default case - assume it's a local image
    return `/${drink.image}`;
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredDrinks(allDrinks);
      return;
    }

    const filtered = allDrinks.filter(drink =>
      drink.title.toLowerCase().includes(term.toLowerCase()) ||
      (drink.category && drink.category.toLowerCase().includes(term.toLowerCase())) ||
      (drink.location && drink.location.toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredDrinks(filtered);
  };

  // Handle URL search parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      handleSearch(searchParam);
    }
  }, [allDrinks]);

  return (
    <section id="products1" className="section-p1">
      <div className="container">
        <h2>All Drinks</h2>
        <p>Refresh Your Day with Our Premium Selection</p>

        {/* Local Search Bar for Shop Page */}
        <div className="shop-search">
          <SearchBar onSearch={handleSearch} placeholder="Search drinks by name or category..." />
        </div>

        {searchTerm && (
          <div className="search-results-count">
            {filteredDrinks.length} result{filteredDrinks.length !== 1 ? 's' : ''} found for "{searchTerm}"
          </div>
        )}

        {loading ? (
          <div className="loading">Loading our refreshing collection...</div>
        ) : filteredDrinks.length === 0 && searchTerm ? (
          <div className="no-results">
            <h3>No drinks found</h3>
            <p>Try searching for different keywords or browse all drinks</p>
            <button onClick={() => handleSearch('')}>Show All Drinks</button>
          </div>
        ) : searchTerm ? (
          // Show search results in one section
          <div className="pro-container">
            {filteredDrinks.map((drink) => {
              return (
                <div className="shop-product-card" key={drink._id}>
                  <div className="product-image-container">
                    <img
                      src={getDisplayImageUrl(drink)}
                      alt={drink.title}
                      onError={handleImageError}
                    />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{drink.title}</h3>
                    <p className="product-quantity">Quantity {generateQuantity(drink._id)} ML</p>
                    <div className="product-rating">
                      {renderStars()}
                    </div>
                    <div className="product-price-cart">
                      <span className="product-price">Price: ₹{drink.price}</span>
                      <button className="cart-button" onClick={() => handleAddToCart(drink)}>
                        🛒
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Show separate sections for sample drinks and new drinks
          <>
            {/* Sample Drinks Section */}
            <div className="drinks-section">
              <h3 className="section-title">Our Collection</h3>
              <div className="pro-container">
                {sampleDrinks.map((drink) => {
                  return (
                    <div className="shop-product-card" key={drink._id}>
                      <div className="product-image-container">
                        <img
                          src={getDisplayImageUrl(drink)}
                          alt={drink.title}
                          onError={handleImageError}
                        />
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">{drink.title}</h3>
                        <p className="product-quantity">Quantity {generateQuantity(drink._id)} ML</p>
                        <div className="product-rating">
                          {renderStars()}
                        </div>
                        <div className="product-price-cart">
                          <span className="product-price">Price: ₹{drink.price}</span>
                          <button className="cart-button" onClick={() => handleAddToCart(drink)}>
                            🛒
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* New Drinks Section */}
            {apiDrinks.length > 0 && (
              <div className="drinks-section">
                <h3 className="section-title">New Drinks</h3>
                <div className="pro-container">
                  {apiDrinks.map((drink) => {
                    return (
                      <div className="shop-product-card" key={drink._id}>
                        <div className="product-image-container">
                          <img
                            src={getDisplayImageUrl(drink)}
                            alt={drink.title}
                            onError={handleImageError}
                          />
                        </div>
                        <div className="product-info">
                          <h3 className="product-name">{drink.title}</h3>
                          <p className="product-quantity">Quantity {generateQuantity(drink._id)} ML</p>
                          <div className="product-rating">
                            {renderStars()}
                          </div>
                          <div className="product-price-cart">
                            <span className="product-price">Price: ₹{drink.price}</span>
                            <button className="cart-button" onClick={() => handleAddToCart(drink)}>
                              🛒
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Shop;
