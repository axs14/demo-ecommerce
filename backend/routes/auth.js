const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Configuración de Google OAuth
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

// Configurar Google OAuth
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || 'tu-google-client-id',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'tu-google-client-secret',
  callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      provider: 'google',
      avatar: profile.photos[0].value
    };
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Configurar Facebook OAuth
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID || 'tu-facebook-app-id',
  clientSecret: process.env.FACEBOOK_APP_SECRET || 'tu-facebook-app-secret',
  callbackURL: "/api/auth/facebook/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails ? profile.emails[0].value : null,
      provider: 'facebook',
      avatar: profile.photos ? profile.photos[0].value : null
    };
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Serializar usuario para la sesión
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Rutas de autenticación
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user.id, email: req.user.email },
      process.env.JWT_SECRET || 'tu-jwt-secreto',
      { expiresIn: '24h' }
    );
    res.redirect(`http://localhost:3001/auth/success?token=${token}`);
  }
);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user.id, email: req.user.email },
      process.env.JWT_SECRET || 'tu-jwt-secreto',
      { expiresIn: '24h' }
    );
    res.redirect(`http://localhost:3001/auth/success?token=${token}`);
  }
);

router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error al cerrar sesión' });
    }
    res.json({ message: 'Sesión cerrada correctamente' });
  });
});

router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu-jwt-secreto');
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
});

module.exports = router;
