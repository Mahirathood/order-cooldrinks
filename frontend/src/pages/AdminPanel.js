import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getApiUrl, API_ENDPOINTS } from '../config/api';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('seller');
  
  // Seller partnership form state
  const [sellerData, setSellerData] = useState({
    shopName: '',
    ownerName: '',
    email: '',
    phone: '',
    shopAddress: '',
    city: '',
    state: '',
    pincode: '',
    businessType: 'retail',
    yearsInBusiness: '',
    productsToSell: '',
    monthlyCapacity: '',
    gstNumber: '',
    message: ''
  });

  // Add drink form state
  const [drinkData, setDrinkData] = useState({
    title: '',
    price: '',
    details: '',
    location: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSellerChange = (e) => {
    const { name, value } = e.target;
    setSellerData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDrinkChange = (e) => {
    setDrinkData({
      ...drinkData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSellerSubmit = (e) => {
    e.preventDefault();
    alert('Seller Partnership request submitted successfully! Our team will review your application and contact you within 2-3 business days.');
    setSellerData({
      shopName: '',
      ownerName: '',
      email: '',
      phone: '',
      shopAddress: '',
      city: '',
      state: '',
      pincode: '',
      businessType: 'retail',
      yearsInBusiness: '',
      productsToSell: '',
      monthlyCapacity: '',
      gstNumber: '',
      message: ''
    });
  };

  const handleDrinkSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add a drink');
      navigate('/login');
      return;
    }

    // Validate form data
    if (!drinkData.title || !drinkData.price || !drinkData.details || !drinkData.location) {
      alert('Please fill in all fields');
      return;
    }

    if (!image) {
      alert('Please select an image');
      return;
    }

    try {
      setLoading(true);
      
      const data = new FormData();
      data.append('title', drinkData.title);
      data.append('price', drinkData.price);
      data.append('details', drinkData.details);
      data.append('location', drinkData.location);
      data.append('image', image);

      const response = await axios.post(getApiUrl(API_ENDPOINTS.DRINKS), data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      alert('Drink added successfully!');
      
      // Reset form
      setDrinkData({
        title: '',
        price: '',
        details: '',
        location: ''
      });
      setImage(null);
      
      // Reset file input
      const fileInput = document.getElementById('drink-image');
      if (fileInput) {
        fileInput.value = '';
      }
      
    } catch (error) {
      console.error('Error adding drink:', error);
      
      if (error.response) {
        const message = error.response.data.message || error.response.data.error || 'Failed to add drink';
        alert(`Error: ${message}`);
        
        if (error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } else if (error.request) {
        alert('Network error. Please check your connection and try again.');
      } else {
        alert('Failed to add drink. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <h1>Admin Panel</h1>
      <p>Manage your CoolDrink business operations</p>

      {/* Tab Navigation */}
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'seller' ? 'active' : ''}`}
          onClick={() => setActiveTab('seller')}
        >
          Seller Partnership
        </button>
        <button 
          className={`tab-btn ${activeTab === 'adddrink' ? 'active' : ''}`}
          onClick={() => setActiveTab('adddrink')}
        >
          Add Drink
        </button>
      </div>

      {/* Seller Partnership Form Tab */}
      {activeTab === 'seller' && (
        <div className="seller-partnership-section">
          <div className="section-header">
            <h2>Partner with CoolDrink</h2>
            <p>Join our network of sellers and expand your business reach</p>
          </div>

          <div className="partnership-benefits">
            <div className="benefit-card">
              <h3>Wide Customer Base</h3>
              <p>Access to thousands of customers across the region</p>
            </div>
            <div className="benefit-card">
              <h3>Easy Integration</h3>
              <p>Simple onboarding process and inventory management</p>
            </div>
            <div className="benefit-card">
              <h3>Marketing Support</h3>
              <p>Promotional campaigns and featured product listings</p>
            </div>
          </div>

          <form onSubmit={handleSellerSubmit} className="seller-form">
            <h3>Shop Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="shopName">Shop Name *</label>
                <input
                  type="text"
                  id="shopName"
                  name="shopName"
                  value={sellerData.shopName}
                  onChange={handleSellerChange}
                  placeholder="Enter your shop name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="ownerName">Owner Name *</label>
                <input
                  type="text"
                  id="ownerName"
                  name="ownerName"
                  value={sellerData.ownerName}
                  onChange={handleSellerChange}
                  placeholder="Enter owner's full name"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={sellerData.email}
                  onChange={handleSellerChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={sellerData.phone}
                  onChange={handleSellerChange}
                  placeholder="+91 1234567890"
                  required
                />
              </div>
            </div>

            <h3>Location Details</h3>
            <div className="form-group">
              <label htmlFor="shopAddress">Shop Address *</label>
              <textarea
                id="shopAddress"
                name="shopAddress"
                value={sellerData.shopAddress}
                onChange={handleSellerChange}
                placeholder="Enter complete shop address"
                rows="3"
                required
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={sellerData.city}
                  onChange={handleSellerChange}
                  placeholder="Enter city"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State *</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={sellerData.state}
                  onChange={handleSellerChange}
                  placeholder="Enter state"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="pincode">Pincode *</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={sellerData.pincode}
                  onChange={handleSellerChange}
                  placeholder="Enter pincode"
                  pattern="[0-9]{6}"
                  required
                />
              </div>
            </div>

            <h3>Business Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="businessType">Business Type *</label>
                <select
                  id="businessType"
                  name="businessType"
                  value={sellerData.businessType}
                  onChange={handleSellerChange}
                  required
                >
                  <option value="retail">Retail Shop</option>
                  <option value="wholesale">Wholesale Distributor</option>
                  <option value="manufacturer">Manufacturer</option>
                  <option value="cafe">Cafe/Restaurant</option>
                  <option value="supermarket">Supermarket</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="yearsInBusiness">Years in Business *</label>
                <input
                  type="number"
                  id="yearsInBusiness"
                  name="yearsInBusiness"
                  value={sellerData.yearsInBusiness}
                  onChange={handleSellerChange}
                  placeholder="e.g., 5"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="productsToSell">Products You Want to Sell *</label>
              <textarea
                id="productsToSell"
                name="productsToSell"
                value={sellerData.productsToSell}
                onChange={handleSellerChange}
                placeholder="List the drink brands and products you want to sell (e.g., Coca Cola, Pepsi, Fresh Juices, Energy Drinks, etc.)"
                rows="3"
                required
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="monthlyCapacity">Monthly Supply Capacity *</label>
                <input
                  type="text"
                  id="monthlyCapacity"
                  name="monthlyCapacity"
                  value={sellerData.monthlyCapacity}
                  onChange={handleSellerChange}
                  placeholder="e.g., 1000 units/month"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="gstNumber">GST Number (Optional)</label>
                <input
                  type="text"
                  id="gstNumber"
                  name="gstNumber"
                  value={sellerData.gstNumber}
                  onChange={handleSellerChange}
                  placeholder="Enter GST number if available"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Additional Information</label>
              <textarea
                id="message"
                name="message"
                value={sellerData.message}
                onChange={handleSellerChange}
                placeholder="Tell us more about your business, special requirements, or any questions you have..."
                rows="4"
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Submit Partnership Request
            </button>
          </form>
        </div>
      )}

      {/* Add Drink Form Tab */}
      {activeTab === 'adddrink' && (
        <div className="add-drink-section">
          <h2>Add New Drink</h2>
          <p>Add a refreshing new drink to our collection</p>
          
          <form onSubmit={handleDrinkSubmit} className="add-drink-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="drink-title">Drink Name *</label>
                <input 
                  type="text" 
                  id="drink-title" 
                  name="title" 
                  value={drinkData.title} 
                  onChange={handleDrinkChange} 
                  placeholder="e.g., Coca Cola"
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="drink-price">Price (₹) *</label>
                <input 
                  type="number" 
                  id="drink-price" 
                  name="price" 
                  value={drinkData.price} 
                  onChange={handleDrinkChange} 
                  placeholder="e.g., 50"
                  min="1"
                  required 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="drink-details">Description *</label>
              <textarea 
                id="drink-details" 
                name="details" 
                value={drinkData.details} 
                onChange={handleDrinkChange} 
                placeholder="Describe the drink's taste, ingredients, or special features..."
                required 
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="drink-location">Category/Location *</label>
              <input 
                type="text" 
                id="drink-location" 
                name="location" 
                value={drinkData.location} 
                onChange={handleDrinkChange} 
                placeholder="e.g., Cola, Energy Drink, Fruit Juice"
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="drink-image">Product Image *</label>
              <input 
                type="file" 
                id="drink-image" 
                name="image" 
                onChange={handleImageChange} 
                accept="image/*"
                required 
              />
              <div className="file-upload-info">
                Upload a clear image of the drink (JPG, PNG, WebP)
              </div>
            </div>
            
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Adding Drink...' : 'Add Drink to Collection'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;