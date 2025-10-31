import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          {/* Routes have been removed as requested */}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
