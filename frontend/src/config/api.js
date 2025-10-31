// API Configuration
export const API_BASE_URL = 'https://soft-drink-e-commerce-demo.onrender.com';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',

  // Drinks endpoints
  DRINKS: '/api/drinks',
  TRENDING_DRINKS: '/api/drinks/trending',

  // Checkout endpoint
  CHECKOUT: '/api/checkout'
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

// Helper function to get image URL
export const getImageUrl = (imagePath) => `${API_BASE_URL}${imagePath}`;