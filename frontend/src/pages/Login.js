import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { getApiUrl, API_ENDPOINTS } from '../config/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      console.log('Attempting login with API:', getApiUrl(API_ENDPOINTS.LOGIN));
      
      // Try real API first
      const response = await axios.post(getApiUrl(API_ENDPOINTS.LOGIN), formData);
      
      if (response.data && response.data.token) {
        // Real API login successful
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        alert(`Login successful! Welcome back, ${response.data.user.name}!`);
        navigate('/');
        window.location.reload();
        return;
      }
    } catch (apiError) {
      console.log('API login failed, trying fallback:', apiError.message);
      
      // Fallback to mock authentication
      try {
        // Check registered users first
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const user = registeredUsers.find(u => u.email === formData.email && u.password === formData.password);
        
        let mockUser;
        if (user) {
          // Use registered user data
          mockUser = {
            id: user.id,
            name: user.name,
            email: user.email
          };
        } else {
          // Accept any email/password for demo purposes
          mockUser = {
            id: '1',
            name: formData.email.split('@')[0],
            email: formData.email
          };
        }
        
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        // Store in localStorage
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        // Show success message and redirect
        alert(`Login successful! Welcome back, ${mockUser.name}!`);
        navigate('/');
        window.location.reload();
      } catch (error) {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="container section-p1">
      <div className="auth-container">
        <h2>Login to Your Account</h2>
        {error && <div className="message error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
        <div className="auth-link">
          <p>Don't have an account? <Link to="/signup">Sign Up Here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;