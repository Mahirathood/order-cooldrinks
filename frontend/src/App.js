import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Contact from './pages/Contact';
import AddDrink from './pages/AddDrink';
import AdminPanel from './pages/AdminPanel';
import Trending from './pages/Trending';
import Orders from './pages/Orders';
import Shipping from './pages/Shipping';
import Promotion from './pages/Promotion';
import Sell from './pages/Sell';
import Support from './pages/Support';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/add-drink" element={<AddDrink />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/promotion" element={<Promotion />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
