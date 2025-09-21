import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Línea Blanca Pro</h3>
            <p className="footer-description">
              Tu tienda de confianza para electrodomésticos de línea blanca. 
              Calidad, garantía y el mejor servicio al cliente.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">
                <FiFacebook />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <FiTwitter />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <FiInstagram />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Enlaces Rápidos</h4>
            <ul className="footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/products">Productos</Link></li>
              <li><Link to="/categories">Categorías</Link></li>
              <li><Link to="/about">Nosotros</Link></li>
              <li><Link to="/contact">Contacto</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Categorías</h4>
            <ul className="footer-links">
              <li><Link to="/category/refrigeradores">Refrigeradores</Link></li>
              <li><Link to="/category/lavadoras">Lavadoras</Link></li>
              <li><Link to="/category/secadoras">Secadoras</Link></li>
              <li><Link to="/category/hornos">Hornos</Link></li>
              <li><Link to="/category/microondas">Microondas</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Contacto</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <FiPhone className="contact-icon" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <FiMail className="contact-icon" />
                <span>info@lineablancapro.com</span>
              </div>
              <div className="contact-item">
                <FiMapPin className="contact-icon" />
                <span>123 Main St, Ciudad, Estado 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © 2024 Línea Blanca Pro. Todos los derechos reservados.
            </p>
            <div className="footer-legal">
              <Link to="/privacy">Política de Privacidad</Link>
              <Link to="/terms">Términos de Servicio</Link>
              <Link to="/cookies">Política de Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
