import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import './Login.css';

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/google';
  };

  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/facebook';
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-content">
          <div className="login-header">
            <h1 className="login-title">Bienvenido de vuelta</h1>
            <p className="login-subtitle">
              Inicia sesión para acceder a tu cuenta y disfrutar de todos nuestros servicios
            </p>
          </div>

          <div className="login-form">
            <div className="social-login">
              <button 
                className="social-btn google-btn"
                onClick={handleGoogleLogin}
              >
                <svg className="social-icon" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuar con Google
              </button>
              
              <button 
                className="social-btn facebook-btn"
                onClick={handleFacebookLogin}
              >
                <svg className="social-icon" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continuar con Facebook
              </button>
            </div>

            <div className="divider">
              <span>o</span>
            </div>

            <form className="email-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <div className="input-group">
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <div className="input-group">
                  <FiLock className="input-icon" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-input"
                    placeholder="••••••••"
                    required
                  />
                  <button type="button" className="password-toggle">
                    <FiEye />
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" name="remember" />
                  <span className="checkmark"></span>
                  Recordarme
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <button type="submit" className="btn btn-primary login-btn">
                Iniciar Sesión
              </button>
            </form>
          </div>

          <div className="login-footer">
            <p>
              ¿No tienes una cuenta?{' '}
              <Link to="/register" className="signup-link">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>

        <div className="login-image">
          <div className="image-content">
            <h2>Electrodomésticos Premium</h2>
            <p>Descubre nuestra amplia selección de productos de línea blanca con la mejor calidad y garantía.</p>
            <div className="features">
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <span>Envío gratis</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🛡️</span>
                <span>Garantía extendida</span>
              </div>
              <div className="feature">
                <span className="feature-icon">⭐</span>
                <span>Calidad premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
