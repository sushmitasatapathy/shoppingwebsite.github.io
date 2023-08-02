import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = ({ filteredCategory, sortedOption, searchQuery, addItemToCart }) => {
  const [products, setProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Fetch the product list from the API
    axios.get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const filterAndSortProducts = () => {
    // Ensure products array is not empty
    if (!products || products.length === 0) {
      return [];
    }

    // Filter by category
    let filteredProducts = products;
    if (filteredCategory && filteredCategory !== 'all') {
      filteredProducts = products.filter((product) => product.category === filteredCategory);
    }

    // Sort by price or title
    if (sortedOption === 'price') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortedOption === 'title') {
      filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Search by title
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredProducts;
  };

  const filteredAndSortedProducts = filterAndSortProducts();

  const handleAddToCart = (product) => {
    addItemToCart({ ...product, image: product.image });
    setSelectedItem(product);
  };

  const handleViewDetails = (product) => {
    setSelectedItem(product);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      <h2>Product List</h2>
      <div className="product-grid">
        {filteredAndSortedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-info">
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <div className="product-buttons">
              <button
                className="product-button add-to-cart"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="product-button view-details"
                onClick={() => handleViewDetails(product)}
                style={{
                  backgroundColor: selectedItem && selectedItem.id === product.id ? 'blue' : 'white',
                  color: selectedItem && selectedItem.id === product.id ? 'white' : 'blue',
                }}
              >
                View Details
              </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ... (previous code) */}
      {selectedItem && (
        <div className="overlay">
          <div className="modal">
            <div className="selected-item-container">
              <button className="close-button" onClick={handleClose}>Close</button>
              <img src={selectedItem.image} alt={selectedItem.title} className="selected-item-image" />
              <div className="selected-item-info">
                <h3>{selectedItem.title}</h3>
                <p>Price: ${selectedItem.price}</p>
                <p>Description: {selectedItem.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
