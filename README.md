# Línea Blanca Pro - Ecommerce

Un sitio web completo de ecommerce especializado en electrodomésticos de línea blanca, con autenticación SSO y una interfaz moderna.

## 🚀 Características

- **Frontend React**: Interfaz moderna y responsive
- **Backend Node.js**: API REST con Express
- **Autenticación SSO**: Google y Facebook OAuth
- **Productos de Línea Blanca**: Refrigeradores, lavadoras, secadoras, etc.
- **Sistema de Filtros**: Por categoría, marca y precio
- **Perfil de Usuario**: Gestión de datos personales y pedidos
- **Lista de Favoritos**: Guardar productos preferidos
- **Diseño Responsive**: Optimizado para móviles y desktop

## 🛠️ Tecnologías

### Frontend
- React 18
- React Router DOM
- React Query
- Styled Components
- React Icons
- React Hot Toast

### Backend
- Node.js
- Express
- Passport.js (Google & Facebook OAuth)
- JWT (JSON Web Tokens)
- CORS
- Express Session

## 📦 Instalación

### Prerrequisitos
- Node.js (v16 o superior)
- Git

### Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/linea-blanca-ecommerce.git
cd linea-blanca-ecommerce
```

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 🔧 Configuración

### Variables de Entorno (Backend)
Crea un archivo `.env` en la carpeta `backend`:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=tu-jwt-secreto-super-seguro
SESSION_SECRET=tu-session-secreto-super-seguro
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
FACEBOOK_APP_ID=tu-facebook-app-id
FACEBOOK_APP_SECRET=tu-facebook-app-secret
```

### OAuth Setup

#### Google OAuth
1. Ve a [Google Cloud Console](https://console.developers.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google+
4. Crea credenciales OAuth 2.0
5. Agrega `http://localhost:3000/api/auth/google/callback` como URI de redirección

#### Facebook OAuth
1. Ve a [Facebook Developers](https://developers.facebook.com/)
2. Crea una nueva aplicación
3. Agrega el producto "Facebook Login"
4. Configura las URLs de redirección
5. Agrega `http://localhost:3000/api/auth/facebook/callback` como URI de redirección

## 🚀 Uso

1. **Iniciar el backend**: `cd backend && npm start`
2. **Iniciar el frontend**: `cd frontend && npm start`
3. **Abrir el navegador**: `http://localhost:3001`

## 📱 Funcionalidades

### Para Usuarios
- ✅ Navegar por productos de línea blanca
- ✅ Filtrar por categoría, marca y precio
- ✅ Ver detalles de productos
- ✅ Iniciar sesión con Google/Facebook
- ✅ Gestionar perfil personal
- ✅ Agregar productos a favoritos
- ✅ Ver historial de pedidos

### Para Desarrolladores
- ✅ API REST completa
- ✅ Autenticación JWT
- ✅ Middleware de validación
- ✅ Manejo de errores
- ✅ CORS configurado
- ✅ Estructura modular

## 📁 Estructura del Proyecto

```
demo-ecommerce/
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   └── users.js
│   ├── models/
│   ├── middleware/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── styles/
│   ├── public/
│   └── package.json
└── README.md
```

## 🎨 Diseño

El proyecto utiliza un diseño moderno con:
- **Colores**: Paleta azul y gris profesional
- **Tipografía**: Inter (Google Fonts)
- **Iconos**: React Icons (Feather Icons)
- **Responsive**: Mobile-first approach
- **Animaciones**: Transiciones suaves y hover effects

## 🔒 Seguridad

- Autenticación JWT
- Validación de tokens
- CORS configurado
- Variables de entorno para secretos
- Sanitización de inputs

## 📈 Próximas Mejoras

- [ ] Base de datos (MongoDB/PostgreSQL)
- [ ] Sistema de pagos
- [ ] Carrito de compras persistente
- [ ] Notificaciones push
- [ ] Panel de administración
- [ ] Tests unitarios
- [ ] Docker containerization

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

**Alexis** - alexis.superi@gmail.com

---

⭐ Si te gusta este proyecto, ¡dale una estrella!
