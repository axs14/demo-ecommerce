import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { FiHeart, FiShoppingCart, FiStar, FiTruck, FiShield, FiArrowLeft } from 'react-icons/fi';
import { productService } from '../services/productService';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { data: product, isLoading, error } = useQuery(
    ['product', id],
    () => productService.getProductById(id),
    {
      enabled: !!id,
    }
  );

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para agregar al carrito');
      return;
    }

    toast.success(`Se agregaron ${quantity} unidades al carrito`);
  };

  const handleAddToWishlist = () => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para agregar a favoritos');
      return;
    }

    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Eliminado de favoritos' : 'Agregado a favoritos');
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe o ha sido eliminado.</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FiArrowLeft />
          Volver
        </button>

        <div className="product-detail-content">
          <div className="product-images">
            <div className="main-image">
              <img
                src={product.image || '/images/placeholder-product.jpg'}
                alt={product.name}
                onError={(e) => {
                  e.target.src = '/images/placeholder-product.jpg';
                }}
              />
            </div>
          </div>

          <div className="product-info">
            <div className="product-breadcrumb">
              <span>{product.category}</span>
              <span>•</span>
              <span>{product.brand}</span>
            </div>

            <h1 className="product-title">{product.name}</h1>

            <div className="product-rating">
              <div className="stars">
                {renderStars(product.rating)}
              </div>
              <span className="rating-text">({product.rating})</span>
              <span className="reviews-count">• 128 reseñas</span>
            </div>

            <div className="product-price">
              <span className="price-currency">$</span>
              <span className="price-amount">{product.price.toLocaleString()}</span>
            </div>

            <div className="product-description">
              <h3>Descripción</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-features">
              <h3>Características principales</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Cantidad:</label>
                <div className="quantity-controls">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button
                  onClick={handleAddToWishlist}
                  className={`btn btn-outline wishlist-btn ${isWishlisted ? 'active' : ''}`}
                >
                  <FiHeart />
                  {isWishlisted ? 'En favoritos' : 'Agregar a favoritos'}
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="btn btn-primary cart-btn"
                >
                  <FiShoppingCart />
                  {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
                </button>
              </div>
            </div>

            <div className="product-benefits">
              <div className="benefit">
                <FiTruck className="benefit-icon" />
                <div>
                  <h4>Envío gratis</h4>
                  <p>En compras superiores a $500</p>
                </div>
              </div>
              <div className="benefit">
                <FiShield className="benefit-icon" />
                <div>
                  <h4>Garantía extendida</h4>
                  <p>Hasta 3 años de garantía</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
