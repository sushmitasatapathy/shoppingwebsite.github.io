import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FilterSort.css'; // Create a CSS file named "FilterSort.css" for styling

const FilterSort = ({ onFilterSort }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    // Fetch categories from the API
    axios
      .get('https://fakestoreapi.com/products/categories')
      .then((response) => {
        setCategories(['all', ...response.data]);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilterSort(category, sortOption);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    onFilterSort(selectedCategory, option);
  };

  return (
    <div className="filter-sort-container"> {/* Add a class for styling */}
      <h2>Filters & Sorting</h2>
      <div className="filter-sort-row"> {/* Use flexbox to display category and sort by in one line */}
        <div className="filter-sort-item">
          <label>Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="rounded-dropdown" // Add a class for rounded corners
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-sort-item">
          <label>Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
            className="rounded-dropdown" // Add a class for rounded corners
          >
            <option value="">Select</option>
            <option value="price">Price</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSort;
