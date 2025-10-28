import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../config/api';
import SearchBar from '../components/SearchBar';

// Generate random rating between 3-5 stars
const generateRating = (id) => {
  const seed = parseInt(id) || 1;
  const rating = 3 + (seed % 3); // Generates 3, 4, or 5
  return rating;
};

// Render star rating
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <i
        key={i}
        className={i <= rating ? "fas fa-star" : "far fa-star"}
      ></i>
    );
  }
  return stars;
};

const Trending = () => {
  const [trendingDrinks, setTrendingDrinks] = useState([]);
  const [filteredTrending, setFilteredTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

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

  useEffect(() => {
    const fetchTrendingDrinks = () => {
      try {
        // Get sales data from localStorage
        let salesData = JSON.parse(localStorage.getItem('salesData') || '{}');

        // Always refresh with new pricing data
        const initialSalesData = {
          '1': {
            productId: '1',
            title: 'Coca Cola',
            price: 50,
            image: '/coca-cola.jpeg',
            category: 'Cola',
            details: 'Classic refreshing cola drink',
            totalSold: 3,
            totalRevenue: 150.00,
            orderCount: 45,
            lastSold: new Date(Date.now() - 86400000).toISOString() // 1 day ago
          },
          '10': {
            productId: '10',
            title: 'Red Bull',
            price: 100,
            image: '/redbull.webp',
            category: 'Energy',
            details: 'Energy drink that gives you wings',
            totalSold: 120,
            totalRevenue: 12000.00,
            orderCount: 38,
            lastSold: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
          },
          '3': {
            productId: '3',
            title: 'Sprite',
            price: 40,
            image: '/sprite.jpg',
            category: 'Lemon-Lime',
            details: 'Crisp lemon-lime soda',
            totalSold: 95,
            totalRevenue: 3800.00,
            orderCount: 32,
            lastSold: new Date(Date.now() - 21600000).toISOString() // 6 hours ago
          },
          '13': {
            productId: '13',
            title: 'Frooti',
            price: 20,
            image: '/frooti.jpg',
            category: 'Fruit',
            details: 'Fresh mango drink',
            totalSold: 85,
            totalRevenue: 1700.00,
            orderCount: 28,
            lastSold: new Date(Date.now() - 10800000).toISOString() // 3 hours ago
          },
          '4': {
            productId: '4',
            title: 'Fanta',
            price: 40,
            image: '/fanta.jpg',
            category: 'Orange',
            details: 'Orange flavored soda',
            totalSold: 75,
            totalRevenue: 3000.00,
            orderCount: 25,
            lastSold: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
          },
          '2': {
            productId: '2',
            title: 'Pepsi',
            price: 50,
            image: '/pepsi.webp',
            category: 'Cola',
            details: 'Bold and refreshing cola',
            totalSold: 68,
            totalRevenue: 3400.00,
            orderCount: 22,
            lastSold: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
          },
          '9': {
            productId: '9',
            title: 'Mountain Dew',
            price: 70,
            image: '/Mountain Dew.jpeg',
            category: 'Energy',
            details: 'Citrus charged energy drink',
            totalSold: 55,
            totalRevenue: 3850.00,
            orderCount: 18,
            lastSold: new Date(Date.now() - 1800000).toISOString() // 30 minutes ago
          },
          '14': {
            productId: '14',
            title: 'Maaza',
            price: 20,
            image: '/maaza.jpg',
            category: 'Fruit',
            details: 'Real mango taste',
            totalSold: 42,
            totalRevenue: 840.00,
            orderCount: 15,
            lastSold: new Date(Date.now() - 900000).toISOString() // 15 minutes ago
          }
        };

        // Always use fresh data with correct pricing
        localStorage.setItem('salesData', JSON.stringify(initialSalesData));
        salesData = initialSalesData;

        // Convert to array and sort by total sold (highest first)
        const salesArray = Object.values(salesData);
        const sortedBySales = salesArray.sort((a, b) => b.totalSold - a.totalSold);

        // Take top 10 trending items
        const topTrending = sortedBySales.slice(0, 10);

        setTrendingDrinks(topTrending);
        setFilteredTrending(topTrending);

        // If still no data (shouldn't happen now), show fallback
        if (topTrending.length === 0) {
          const defaultTrending = [
            {
              productId: '1',
              title: 'Coca Cola',
              price: 2.99,
              image: '/coca-cola.jpeg',
              category: 'Cola',
              details: 'Classic refreshing cola drink',
              totalSold: 150,
              totalRevenue: 448.50,
              orderCount: 45
            },
            {
              productId: '10',
              title: 'Red Bull',
              price: 4.99,
              image: '/redbull.webp',
              category: 'Energy',
              details: 'Energy drink that gives you wings',
              totalSold: 120,
              totalRevenue: 598.80,
              orderCount: 38
            },
            {
              productId: '3',
              title: 'Sprite',
              price: 2.49,
              image: '/sprite.jpg',
              category: 'Lemon-Lime',
              details: 'Crisp lemon-lime soda',
              totalSold: 95,
              totalRevenue: 236.55,
              orderCount: 32
            },
            {
              productId: '13',
              title: 'Frooti',
              price: 1.99,
              image: '/frooti.jpg',
              category: 'Fruit',
              details: 'Fresh mango drink',
              totalSold: 85,
              totalRevenue: 169.15,
              orderCount: 28
            },
            {
              productId: '4',
              title: 'Fanta',
              price: 2.49,
              image: '/fanta.jpg',
              category: 'Orange',
              details: 'Orange flavored soda',
              totalSold: 75,
              totalRevenue: 186.75,
              orderCount: 25
            }
          ];
          setTrendingDrinks(defaultTrending);
        } else {
          setTrendingDrinks(topTrending);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error loading trending drinks:', error);
        setLoading(false);
      }
    };

    fetchTrendingDrinks();
  }, []);

  const handleAddToCart = (drink) => {
    const drinkData = {
      _id: drink.productId,
      title: drink.title,
      price: drink.price,
      image: drink.image,
      category: drink.category,
      details: drink.details
    };
    addToCart(drinkData);
    alert('Item added to cart!');
  };

  const handleImageError = (e) => {
    e.target.src = '/cool1.png';
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredTrending(trendingDrinks);
      return;
    }

    const filtered = trendingDrinks.filter(drink =>
      drink.title.toLowerCase().includes(term.toLowerCase()) ||
      drink.category.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTrending(filtered);
  };

  return (
    <section id="products1" className="section-p1">
      <div className="container">
        <h2>Trending Drinks</h2>
        <p>Our most popular drinks that customers love the most!</p>

        {/* Search Bar for Trending Page */}
        <div className="shop-search">
          <SearchBar onSearch={handleSearch} placeholder="Search trending drinks..." />
        </div>

        {searchTerm && (
          <div className="search-results-count">
            {filteredTrending.length} trending result{filteredTrending.length !== 1 ? 's' : ''} found for "{searchTerm}"
          </div>
        )}

        {loading ? (
          <div className="loading">Loading trending drinks...</div>
        ) : filteredTrending.length === 0 && searchTerm ? (
          <div className="no-results">
            <h3>No trending drinks found</h3>
            <p>Try searching for different keywords or browse all trending drinks</p>
            <button onClick={() => handleSearch('')}>Show All Trending</button>
          </div>
        ) : (
          <div className="pro-container">
            {filteredTrending.length > 0 ? (
              filteredTrending.map((drink, index) => {
                const rating = generateRating(drink.productId);
                return (
                  <div className="pro trending-item" key={drink.productId}>
                    <div className="trending-badge">#{index + 1}</div>
                    <img
                      src={getDisplayImageUrl(drink)}
                      alt={drink.title}
                      onError={handleImageError}
                    />
                    <div className="des">
                      <span>{drink.category}</span>
                      <h5>{drink.title}</h5>
                      <div className="star">
                        {renderStars(rating)}
                      </div>
                      <div className="sales-info">
                        <small>{drink.totalSold} sold | ₹{drink.totalRevenue.toFixed(2)} revenue</small>
                      </div>
                      <h4>₹{drink.price.toFixed(2)}</h4>
                    </div>
                    <button onClick={() => handleAddToCart(drink)}>Add to Cart</button>
                  </div>
                );
              })
            ) : (
              <div className="empty-trending">
                <h3>No trending data available yet</h3>
                <p>Start shopping to see trending items!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Trending;