import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header/Header';
import CartPage from './pages/cartPage/CartPage';
import ShopPage from './pages/shopPage/ShopPage';
import { CartProvider } from './cartContext';

export const App = () => {
  return (
    <Router>
      <CartProvider>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/shop" />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
};
