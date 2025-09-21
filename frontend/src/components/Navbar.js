import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX, FiUser, FiShoppingCart, FiHeart, FiSearch } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-text">Línea Blanca Pro</span>
          </Link>

          {/* Search Bar */}
          <form className="navbar-search" onSubmit={handleSearch}>
            <div className="search-input-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Buscar electrodomésticos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </form>

          {/* Desktop Menu */}
          <div className="navbar-menu desktop-menu">
            <Link to="/" className="navbar-link">Inicio</Link>
            <Link to="/products" className="navbar-link">Productos</Link>
            <Link to="/categories" className="navbar-link">Categorías</Link>
            
            {isAuthenticated ? (
              <div className="navbar-user">
                <Link to="/profile" className="navbar-link">
                  <FiUser className="navbar-icon" />
                  {user?.name || 'Mi Perfil'}
                </Link>
                <button className="navbar-link" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="navbar-auth">
                <Link to="/login" className="btn btn-outline">
                  Iniciar Sesión
                </Link>
              </div>
            )}

            <div className="navbar-actions">
              <button className="navbar-action-btn">
                <FiHeart className="navbar-icon" />
              </button>
              <button className="navbar-action-btn">
                <FiShoppingCart className="navbar-icon" />
                <span className="cart-badge">0</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              <Link to="/" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
                Inicio
              </Link>
              <Link to="/products" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
                Productos
              </Link>
              <Link to="/categories" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
                Categorías
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
                    <FiUser className="mobile-menu-icon" />
                    Mi Perfil
                  </Link>
                  <button className="mobile-menu-link" onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}>
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link to="/login" className="mobile-menu-link" onClick={() => setIsMenuOpen(false)}>
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
