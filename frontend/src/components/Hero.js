import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiHeadphones } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Los Mejores <span className="highlight">Electrodomésticos</span> de Línea Blanca
          </h1>
          <p className="hero-description">
            Descubre nuestra amplia selección de refrigeradores, lavadoras, secadoras y más. 
            Calidad premium con garantía extendida y envío gratis.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary hero-btn">
              Ver Productos
              <FiArrowRight className="btn-icon" />
            </Link>
            <Link to="/categories" className="btn btn-outline hero-btn">
              Explorar Categorías
            </Link>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="hero-image-placeholder">
            <div className="appliance-icon">🏠</div>
            <div className="appliance-icon">❄️</div>
            <div className="appliance-icon">🧺</div>
            <div className="appliance-icon">🔥</div>
          </div>
        </div>
      </div>
      
      <div className="hero-features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <FiTruck className="feature-icon" />
              <div className="feature-content">
                <h3>Envío Gratis</h3>
                <p>En compras superiores a $500</p>
              </div>
            </div>
            <div className="feature-item">
              <FiShield className="feature-icon" />
              <div className="feature-content">
                <h3>Garantía Extendida</h3>
                <p>Hasta 3 años de garantía</p>
              </div>
            </div>
            <div className="feature-item">
              <FiHeadphones className="feature-icon" />
              <div className="feature-content">
                <h3>Soporte 24/7</h3>
                <p>Atención al cliente especializada</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
