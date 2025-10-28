import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../config/api';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, getCartTotal, checkout, loading } = useCart();
  const [checkoutMessage, setCheckoutMessage] = useState('');

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

  const handleCheckout = async () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to checkout');
      navigate('/login');
      return;
    }

    const result = await checkout();
    setCheckoutMessage(result.message);
    
    if (result.success) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  return (
    <section id="cart" className="section-p1">
      <h2>Your Cart</h2>
      
      {checkoutMessage && (
        <div className={`message ${checkoutMessage.includes('successful') ? 'success' : 'error'}`}>
          {checkoutMessage}
        </div>
      )}
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <h3>Your cart is empty</h3>
          <button onClick={() => navigate('/shop')}>Continue Shopping</button>
        </div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img 
                      src={getDisplayImageUrl(item)} 
                      alt={item.title}
                      onError={(e) => { e.target.src = '/cool1.png'; }}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                  </td>
                  <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeFromCart(item._id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="cart-total">
            <h3>Cart Total</h3>
            <p>Total: ₹{getCartTotal().toFixed(2)}</p>
            <button onClick={handleCheckout} disabled={loading}>
              {loading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;