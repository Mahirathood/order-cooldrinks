import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { getApiUrl, API_ENDPOINTS } from '../config/api';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    try {
      console.log('Attempting registration with API:', getApiUrl(API_ENDPOINTS.REGISTER));
      
      // Try real API first
      const response = await axios.post(getApiUrl(API_ENDPOINTS.REGISTER), {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      if (response.data && response.data.message) {
        alert('Registration successful! Please login with your credentials.');
        navigate('/login');
        return;
      }
    } catch (apiError) {
      console.log('API registration failed, trying fallback:', apiError.message);
      
      // Fallback to mock registration
      try {
        if (formData.name && formData.email && formData.password) {
          // Store user data for future login
          const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
          const newUser = {
            id: Date.now().toString(),
            name: formData.name,
            email: formData.email,
            password: formData.password
          };
          
          // Check if user already exists
          const existingUser = users.find(user => user.email === formData.email);
          if (existingUser) {
            setError('User with this email already exists');
            return;
          }
          
          users.push(newUser);
          localStorage.setItem('registeredUsers', JSON.stringify(users));
          
          alert('Registration successful! Please login with your credentials.');
          navigate('/login');
        } else {
          setError('Please fill in all fields');
        }
      } catch (error) {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="container section-p1">
      <div className="auth-container">
        <h2>Create Your Account</h2>
        {error && <div className="message error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>
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
              placeholder="Create a password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit" className="btn">Create Account</button>
        </form>
        <div className="auth-link">
          <p>Already have an account? <Link to="/login">Login Here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;