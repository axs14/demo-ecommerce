import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiStar, FiEye } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para agregar a favoritos');
      return;
    }

    setIsLoading(true);
    try {
      // Aquí harías la llamada a la API
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulación
      setIsWishlisted(!isWishlisted);
      toast.success(isWishlisted ? 'Eliminado de favoritos' : 'Agregado a favoritos');
    } catch (error) {
      toast.error('Error al actualizar favoritos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para agregar al carrito');
      return;
    }

    toast.success('Producto agregado al carrito');
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FiStar key={i} className="star filled" />);
    }

    if (hasHalfStar) {
      stars.push(<FiStar key="half" className="star half" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FiStar key={`empty-${i}`} className="star empty" />);
    }

    return stars;
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img
            src={product.image || '/images/placeholder-product.jpg'}
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.target.src = '/images/placeholder-product.jpg';
            }}
          />
          <div className="product-overlay">
            <button className="overlay-btn" title="Vista rápida">
              <FiEye />
            </button>
            <button
              className={`overlay-btn wishlist-btn ${isWishlisted ? 'active' : ''}`}
              onClick={handleAddToWishlist}
              disabled={isLoading}
              title={isWishlisted ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
            >
              <FiHeart />
            </button>
          </div>
        </div>

        <div className="product-info">
          <div className="product-brand">{product.brand}</div>
          <h3 className="product-name">{product.name}</h3>
          
          <div className="product-rating">
            <div className="stars">
              {renderStars(product.rating)}
            </div>
            <span className="rating-text">({product.rating})</span>
          </div>

          <div className="product-features">
            {product.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="feature-tag">
                {feature}
              </span>
            ))}
          </div>

          <div className="product-footer">
            <div className="product-price">
              <span className="price-currency">$</span>
              <span className="price-amount">{product.price.toLocaleString()}</span>
            </div>
            
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <FiShoppingCart />
              {product.stock === 0 ? 'Sin stock' : 'Agregar'}
            </button>
          </div>

          {product.stock < 5 && product.stock > 0 && (
            <div className="low-stock">
              ¡Solo quedan {product.stock} unidades!
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
