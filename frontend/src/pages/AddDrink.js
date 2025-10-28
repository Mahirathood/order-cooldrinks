import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getApiUrl, API_ENDPOINTS } from '../config/api';

const AddDrink = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    details: '',
    location: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add a drink');
      navigate('/login');
      return;
    }

    // Validate form data
    if (!formData.title || !formData.price || !formData.details || !formData.location) {
      alert('Please fill in all fields');
      return;
    }

    if (!image) {
      alert('Please select an image');
      return;
    }

    try {
      setLoading(true);
      
      console.log('Submitting drink with data:', {
        title: formData.title,
        price: formData.price,
        details: formData.details,
        location: formData.location,
        image: image?.name
      });
      console.log('Using token:', token);
      console.log('API URL:', getApiUrl(API_ENDPOINTS.DRINKS));
      
      const data = new FormData();
      data.append('title', formData.title);
      data.append('price', formData.price);
      data.append('details', formData.details);
      data.append('location', formData.location);
      data.append('image', image);

      const response = await axios.post(getApiUrl(API_ENDPOINTS.DRINKS), data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Drink added successfully:', response.data);
      alert('Drink added successfully!');
      
      // Reset form
      setFormData({
        title: '',
        price: '',
        details: '',
        location: ''
      });
      setImage(null);
      
      // Reset file input
      const fileInput = document.getElementById('image');
      if (fileInput) {
        fileInput.value = '';
      }
      
      navigate('/shop');
    } catch (error) {
      console.error('Error adding drink:', error);
      
      if (error.response) {
        // Server responded with error status
        const message = error.response.data.message || error.response.data.error || 'Failed to add drink';
        alert(`Error: ${message}`);
        
        if (error.response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          navigate('/login');
        }
      } else if (error.request) {
        // Network error
        alert('Network error. Please check your connection and try again.');
      } else {
        // Other error
        alert('Failed to add drink. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-drink-container">
      <h1>Add New Drink</h1>
      <p className="add-drink-subtitle">Add a refreshing new drink to our collection</p>
      
      <form onSubmit={handleSubmit} className="add-drink-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Drink Name *</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder="e.g., Coca Cola"
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="price">Price (₹) *</label>
            <input 
              type="number" 
              id="price" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              placeholder="e.g., 50"
              min="1"
              required 
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="details">Description *</label>
          <textarea 
            id="details" 
            name="details" 
            value={formData.details} 
            onChange={handleChange} 
            placeholder="Describe the drink's taste, ingredients, or special features..."
            required 
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Category/Location *</label>
          <input 
            type="text" 
            id="location" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            placeholder="e.g., Cola, Energy Drink, Fruit Juice"
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="image">Product Image *</label>
          <input 
            type="file" 
            id="image" 
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
  );
};

export default AddDrink;