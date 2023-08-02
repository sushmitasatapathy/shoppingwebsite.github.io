import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import axios from 'axios';
import FilterSort from './components/FilterSort';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [filteredCategory, setFilteredCategory] = useState('all');
  const [sortedOption, setSortedOption] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming the user is logged in initially

  const handleFilterSort = (category, sortOption, query) => {
    setFilteredCategory(category);
    setSortedOption(sortOption);
    setSearchQuery(query);
  };

  const addItemToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCartItems([]); // Clear cart items on logout
  };

  return (
    <Router>
      <div>
        <nav className="App-navbar">
          <div>
            {/* Add your logo and title here */}
            <span className="logo">E-Commerce Website</span>
            <span className="title">Your Title</span>
          </div>
          <div>
            {/* Links to Products and Cart */}
            <input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <NavLink to="/" activeClassName="active-link" className="nav-link">
              Products
            </NavLink>
            <NavLink to="/cart" activeClassName="active-link" className="nav-link">
              Cart ({cartItems.length})
            </NavLink>
            {/* Add the search input */}
            {isLoggedIn ? (
              // Show logout button if the user is logged in
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            ) : (
              // Show login button if the user is logged out (you can implement login functionality)
              <button onClick={() => setIsLoggedIn(true)} className="login-button">
                Login
              </button>
            )}
          </div>
        </nav>
        <div className="App-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="filter-sort-section">
                    <FilterSort onFilterSort={handleFilterSort} />
                  </div>
                  <div className="product-list-section">
                    <ProductList
                      filteredCategory={filteredCategory}
                      sortedOption={sortedOption}
                      searchQuery={searchQuery}
                      addItemToCart={addItemToCart}
                    />
                  </div>
                </>
              }
            />
            <Route
              path="/cart"
              element={
                <div className="cart-section">
                  <Cart cartItems={cartItems} setCartItems={setCartItems} />
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

