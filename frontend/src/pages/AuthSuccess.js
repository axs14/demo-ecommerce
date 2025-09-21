import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import './AuthSuccess.css';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      // Simular datos del usuario (en una app real vendrían del backend)
      const userData = {
        id: '1',
        name: 'Usuario Demo',
        email: 'usuario@demo.com',
        avatar: 'https://via.placeholder.com/150'
      };

      login(userData, token);
      
      // Redirigir después de un breve delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      // Si no hay token, redirigir al login
      navigate('/login');
    }
  }, [token, login, navigate]);

  if (!token) {
    return null;
  }

  return (
    <div className="auth-success">
      <div className="success-container">
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4"/>
            <circle cx="12" cy="12" r="10"/>
          </svg>
        </div>
        <h1 className="success-title">¡Bienvenido!</h1>
        <p className="success-message">
          Has iniciado sesión correctamente. Te estamos redirigiendo a la página principal...
        </p>
        <LoadingSpinner />
      </div>
    </div>
  );
};

export default AuthSuccess;
