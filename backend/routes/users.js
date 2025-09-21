const express = require('express');
const router = express.Router();

// Middleware para verificar autenticación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de acceso requerido' });
  }

  const jwt = require('jsonwebtoken');
  jwt.verify(token, process.env.JWT_SECRET || 'tu-jwt-secreto', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Obtener perfil del usuario
router.get('/profile', authenticateToken, (req, res) => {
  const userProfile = {
    id: req.user.userId,
    email: req.user.email,
    name: 'Usuario Demo',
    avatar: 'https://via.placeholder.com/150',
    joinDate: '2024-01-01',
    orders: 0,
    wishlist: []
  };
  
  res.json(userProfile);
});

// Actualizar perfil del usuario
router.put('/profile', authenticateToken, (req, res) => {
  const { name, phone, address } = req.body;
  
  const updatedProfile = {
    id: req.user.userId,
    email: req.user.email,
    name: name || 'Usuario Demo',
    phone: phone || '',
    address: address || '',
    updatedAt: new Date().toISOString()
  };
  
  res.json({ message: 'Perfil actualizado correctamente', user: updatedProfile });
});

// Obtener historial de pedidos
router.get('/orders', authenticateToken, (req, res) => {
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Entregado',
      total: 1299.99,
      items: [
        { name: 'Refrigerador Samsung RF28K9070SG', quantity: 1, price: 1299.99 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'En tránsito',
      total: 1649.98,
      items: [
        { name: 'Lavadora LG WM3900HWA', quantity: 1, price: 899.99 },
        { name: 'Secadora Whirlpool WED4815EW', quantity: 1, price: 649.99 }
      ]
    }
  ];
  
  res.json(orders);
});

// Obtener lista de deseos
router.get('/wishlist', authenticateToken, (req, res) => {
  const wishlist = [
    {
      id: 1,
      name: "Refrigerador Samsung RF28K9070SG",
      price: 1299.99,
      image: "/images/refrigerador-samsung.jpg",
      addedDate: '2024-01-01'
    },
    {
      id: 5,
      name: "Lavavajillas Bosch SHPM88Z75N",
      price: 1099.99,
      image: "/images/lavavajillas-bosch.jpg",
      addedDate: '2024-01-05'
    }
  ];
  
  res.json(wishlist);
});

module.exports = router;
