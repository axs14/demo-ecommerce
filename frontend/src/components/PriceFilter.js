import React, { useState } from 'react';
import './Filter.css';

const PriceFilter = ({ minPrice, maxPrice, onPriceChange }) => {
  const [localMinPrice, setLocalMinPrice] = useState(minPrice || '');
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice || '');

  const handleApply = () => {
    onPriceChange(localMinPrice, localMaxPrice);
  };

  const handleClear = () => {
    setLocalMinPrice('');
    setLocalMaxPrice('');
    onPriceChange('', '');
  };

  return (
    <div className="filter-group">
      <h4 className="filter-title">Precio</h4>
      <div className="price-filter">
        <div className="price-inputs">
          <div className="price-input-group">
            <label className="price-label">Mínimo</label>
            <input
              type="number"
              placeholder="0"
              value={localMinPrice}
              onChange={(e) => setLocalMinPrice(e.target.value)}
              className="price-input"
              min="0"
            />
          </div>
          <div className="price-separator">-</div>
          <div className="price-input-group">
            <label className="price-label">Máximo</label>
            <input
              type="number"
              placeholder="5000"
              value={localMaxPrice}
              onChange={(e) => setLocalMaxPrice(e.target.value)}
              className="price-input"
              min="0"
            />
          </div>
        </div>
        <div className="price-actions">
          <button onClick={handleApply} className="btn btn-primary price-btn">
            Aplicar
          </button>
          <button onClick={handleClear} className="btn btn-secondary price-btn">
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
