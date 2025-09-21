import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit3, FiSave, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const { data: profile, isLoading } = useQuery(
    'userProfile',
    authService.getProfile,
    {
      enabled: !!user,
      onSuccess: (data) => {
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
          address: data.address || ''
        });
      }
    }
  );

  const { data: orders = [] } = useQuery(
    'userOrders',
    () => authService.getOrders?.() || Promise.resolve([]),
    {
      enabled: !!user,
    }
  );

  const { data: wishlist = [] } = useQuery(
    'userWishlist',
    () => authService.getWishlist?.() || Promise.resolve([]),
    {
      enabled: !!user,
    }
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: profile?.name || '',
      phone: profile?.phone || '',
      address: profile?.address || ''
    });
  };

  const handleSave = async () => {
    try {
      await authService.updateProfile(formData);
      toast.success('Perfil actualizado correctamente');
      setIsEditing(false);
    } catch (error) {
      toast.error('Error al actualizar el perfil');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="profile">
      <div className="container">
        <div className="profile-header">
          <h1>Mi Perfil</h1>
          <p>Gestiona tu información personal y preferencias</p>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="profile-card">
              <div className="profile-avatar">
                <img
                  src={user?.avatar || 'https://via.placeholder.com/150'}
                  alt="Avatar"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
              </div>
              <h3>{user?.name || 'Usuario'}</h3>
              <p>{user?.email}</p>
            </div>

            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">{orders.length}</span>
                <span className="stat-label">Pedidos</span>
              </div>
              <div className="stat">
                <span className="stat-number">{wishlist.length}</span>
                <span className="stat-label">Favoritos</span>
              </div>
            </div>
          </div>

          <div className="profile-main">
            <div className="profile-section">
              <div className="section-header">
                <h2>Información Personal</h2>
                {!isEditing ? (
                  <button onClick={handleEdit} className="btn btn-outline">
                    <FiEdit3 />
                    Editar
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button onClick={handleCancel} className="btn btn-secondary">
                      <FiX />
                      Cancelar
                    </button>
                    <button onClick={handleSave} className="btn btn-primary">
                      <FiSave />
                      Guardar
                    </button>
                  </div>
                )}
              </div>

              <div className="profile-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <FiUser className="form-icon" />
                    Nombre completo
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  ) : (
                    <div className="form-value">{profile?.name || 'No especificado'}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <FiMail className="form-icon" />
                    Correo electrónico
                  </label>
                  <div className="form-value">{user?.email}</div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    <FiPhone className="form-icon" />
                    Teléfono
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="+1 (555) 123-4567"
                    />
                  ) : (
                    <div className="form-value">{profile?.phone || 'No especificado'}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="address" className="form-label">
                    <FiMapPin className="form-icon" />
                    Dirección
                  </label>
                  {isEditing ? (
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="form-textarea"
                      rows="3"
                      placeholder="Ingresa tu dirección completa"
                    />
                  ) : (
                    <div className="form-value">{profile?.address || 'No especificada'}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h2>Pedidos Recientes</h2>
              {orders.length > 0 ? (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order.id} className="order-item">
                      <div className="order-info">
                        <h4>Pedido #{order.id}</h4>
                        <p>Fecha: {new Date(order.date).toLocaleDateString()}</p>
                        <p>Total: ${order.total.toLocaleString()}</p>
                      </div>
                      <div className="order-status">
                        <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No tienes pedidos aún</p>
                </div>
              )}
            </div>

            <div className="profile-section">
              <h2>Lista de Favoritos</h2>
              {wishlist.length > 0 ? (
                <div className="wishlist-grid">
                  {wishlist.map((item) => (
                    <div key={item.id} className="wishlist-item">
                      <img src={item.image} alt={item.name} />
                      <div className="wishlist-info">
                        <h4>{item.name}</h4>
                        <p>${item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No tienes productos en favoritos</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
