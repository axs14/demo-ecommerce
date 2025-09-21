import React from 'react';
import './Filter.css';

const BrandFilter = ({ brands, selectedBrand, onBrandChange }) => {
  return (
    <div className="filter-group">
      <h4 className="filter-title">Marca</h4>
      <div className="filter-options">
        {brands.map((brand) => (
          <label key={brand} className="filter-option">
            <input
              type="radio"
              name="brand"
              value={brand}
              checked={selectedBrand === brand}
              onChange={(e) => onBrandChange(e.target.value)}
              className="filter-radio"
            />
            <span className="filter-label">{brand}</span>
          </label>
        ))}
        <label className="filter-option">
          <input
            type="radio"
            name="brand"
            value=""
            checked={selectedBrand === ''}
            onChange={(e) => onBrandChange(e.target.value)}
            className="filter-radio"
          />
          <span className="filter-label">Todas las marcas</span>
        </label>
      </div>
    </div>
  );
};

export default BrandFilter;
