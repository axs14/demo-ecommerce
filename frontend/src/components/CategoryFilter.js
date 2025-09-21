import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import './Filter.css';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="filter-group">
      <h4 className="filter-title">Categoría</h4>
      <div className="filter-options">
        {categories.map((category) => (
          <label key={category} className="filter-option">
            <input
              type="radio"
              name="category"
              value={category}
              checked={selectedCategory === category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="filter-radio"
            />
            <span className="filter-label">{category}</span>
          </label>
        ))}
        <label className="filter-option">
          <input
            type="radio"
            name="category"
            value=""
            checked={selectedCategory === ''}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="filter-radio"
          />
          <span className="filter-label">Todas las categorías</span>
        </label>
      </div>
    </div>
  );
};

export default CategoryFilter;
