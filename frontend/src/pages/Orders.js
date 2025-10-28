import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../config/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrders = () => {
      try {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Get orders from localStorage
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');

        // Filter out any orders with old pricing format (if any exist)
        const validOrders = savedOrders.filter(order => {
          return order.items && order.items.every(item =>
            typeof item.price === 'number' && item.price >= 20 && item.price <= 100
          );
        });

        // Sort orders by date (newest first)
        const sortedOrders = validOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

        setOrders(sortedOrders);
        setLoading(false);
      } catch (error) {
        console.error('Error loading orders:', error);
        setLoading(false);
      }
    };

    loadOrders();
  }, [navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'var(--success-color)';
      case 'processing':
        return 'var(--warning-color)';
      case 'delivered':
        return 'var(--primary-color)';
      default:
        return 'var(--text-secondary)';
    }
  };

  const handleImageError = (e) => {
    e.target.src = '/cool1.png';
  };

  const getDisplayImageUrl = (item) => {
    if (!item.image) {
      return '/cool1.png'; // Default fallback
    }
    
    // If image starts with /uploads, it's from API - use full URL
    if (item.image.startsWith('/uploads/')) {
      return getImageUrl(item.image);
    }
    
    // If image starts with /, it's a local image
    if (item.image.startsWith('/')) {
      return item.image;
    }
    
    // If it's already a full URL, use as is
    if (item.image.startsWith('http')) {
      return item.image;
    }
    
    // Default case - assume it's a local image
    return `/${item.image}`;
  };

  if (loading) {
    return (
      <div className="container section-p1">
        <div className="loading">Loading your orders...</div>
      </div>
    );
  }

  return (
    <section className="orders-section section-p1">
      <div className="container">
        <h2>Your Orders</h2>
        <p>Track and manage your drink orders</p>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <h3>No orders yet</h3>
            <p>Start shopping to see your orders here!</p>
            <button onClick={() => navigate('/shop')} className="btn">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-container">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.id}</h3>
                    <p className="order-date">{formatDate(order.date)}</p>
                  </div>
                  <div className="order-status">
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div className="order-item" key={index}>
                      <img
                        src={getDisplayImageUrl(item)}
                        alt={item.title}
                        onError={handleImageError}
                      />
                      <div className="item-details">
                        <h4>{item.title}</h4>
                        <div className="item-quantity-price">
                          <span>Qty: {item.quantity}</span>
                          <span>₹{item.price.toFixed(2)} each</span>
                        </div>
                      </div>
                      <div className="item-total">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-summary">
                    <div className="summary-row">
                      <span>Items ({order.items.reduce((sum, item) => sum + item.quantity, 0)}):</span>
                      <span>₹{order.total.toFixed(2)}</span>
                    </div>
                    <div className="summary-row total">
                      <strong>Total: ₹{order.total.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Orders;