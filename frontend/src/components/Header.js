import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faWineGlass, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { getCartItemCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // Redirect to home page
    window.location.href = '/';
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);

    // Prevent body scroll when sidebar is open
    if (!showMenu) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
  };

  return (
    <section id="header">
      <div className="logo">
        <h1>CoolDrink</h1>
      </div>

      {/* Search Bar */}
      <div className="header-search">
        <SearchBar />
      </div>

      <div>
        <ul id="navbar" className={showMenu ? 'active' : ''}>
          <li><Link className={location.pathname === '/' ? 'active' : ''} to="/">Home</Link></li>
          <li><Link className={location.pathname === '/shop' ? 'active' : ''} to="/shop">Shop</Link></li>
          <li><Link className={location.pathname === '/about' ? 'active' : ''} to="/about">About</Link></li>
          <li><Link className={location.pathname === '/contact' ? 'active' : ''} to="/contact">Contact</Link></li>
          <li id="wine"><Link className={location.pathname === '/admin' ? 'active' : ''} to="/admin"><FontAwesomeIcon icon={faWineGlass} />Admin</Link></li>
          <li>
            <Link to="/cart" className="cart-link">
              <FontAwesomeIcon icon={faShoppingCart} />
              {getCartItemCount() > 0 && (
                <span className="cart-count">{getCartItemCount()}</span>
              )}
            </Link>
          </li>
          <li><Link className={location.pathname === '/trending' ? 'active' : ''} to="/trending">Trending</Link></li>
          {isLoggedIn && (
            <li><Link className={location.pathname === '/orders' ? 'active' : ''} to="/orders">Orders</Link></li>
          )}

          {!isLoggedIn ? (
            <>
              <li><Link className={location.pathname === '/login' ? 'active' : ''} to="/login" id="login-link">Login</Link></li>
              <li><Link className={location.pathname === '/signup' ? 'active' : ''} to="/signup" id="signup-link">Sign Up</Link></li>
            </>
          ) : (
            <li><Link to="#" id="logout-link" onClick={handleLogout}>Logout</Link></li>
          )}

          <Link to="#" id="close" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faTimes} />
          </Link>
        </ul>
      </div>
      <div id="mobile">
        <Link to="/cart" className="cart-link">
          <FontAwesomeIcon icon={faShoppingCart} />
          {getCartItemCount() > 0 && (
            <span className="cart-count">{getCartItemCount()}</span>
          )}
        </Link>
        <Link to="/add-drink"><FontAwesomeIcon icon={faWineGlass} /></Link>
        <FontAwesomeIcon id="bar" icon={faBars} onClick={toggleMenu} />
      </div>
    </section>
  );
};

export default Header;