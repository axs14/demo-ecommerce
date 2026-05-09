const express = require('express');
const router = express.Router();

// Datos de ejemplo de productos de línea blanca
const products = [
  {
    id: 1,
    name: "Refrigerador Samsung RF28K9070SG",
    price: 1299.99,
    category: "Refrigeradores",
    brand: "Samsung",
    image: "/images/refrigerador-samsung.jpg",
    description: "Refrigerador de 28 pies cúbicos con tecnología Twin Cooling Plus",
    features: ["Twin Cooling Plus", "Dispensador de agua", "Congelador inferior", "Acero inoxidable"],
    rating: 4.5,
    stock: 15
  },
  {
    id: 2,
    name: "Lavadora LG WM3900HWA",
    price: 899.99,
    category: "Lavadoras",
    brand: "LG",
    image: "/images/lavadora-lg.jpg",
    description: "Lavadora de carga frontal con tecnología TurboWash 360°",
    features: ["TurboWash 360°", "Carga de 4.5 pies cúbicos", "WiFi Connect", "Acero inoxidable"],
    rating: 4.7,
    stock: 22
  },
  {
    id: 3,
    name: "Secadora Whirlpool WED4815EW",
    price: 649.99,
    category: "Secadoras",
    brand: "Whirlpool",
    image: "/images/secadora-whirlpool.jpg",
    description: "Secadora de gas con sensor de humedad automático",
    features: ["Sensor de humedad", "Carga de 7.0 pies cúbicos", "Tecnología Wrinkle Shield", "Acero inoxidable"],
    rating: 4.3,
    stock: 18
  },
  {
    id: 4,
    name: "Horno GE JBS86DMSS",
    price: 749.99,
    category: "Hornos",
    brand: "GE",
    image: "/images/horno-ge.jpg",
    description: "Horno de doble pared con convección y autolimpieza",
    features: ["Convección", "Autolimpieza", "Doble pared", "Acero inoxidable"],
    rating: 4.4,
    stock: 12
  },
  {
    id: 5,
    name: "Lavavajillas Bosch SHPM88Z75N",
    price: 1099.99,
    category: "Lavavajillas",
    brand: "Bosch",
    image: "/images/lavavajillas-bosch.jpg",
    description: "Lavavajillas de 18 pulgadas con tecnología Silence Plus",
    features: ["Silence Plus", "Tercer estante", "Tecnología CrystalDry", "Acero inoxidable"],
    rating: 4.6,
    stock: 8
  },
  {
    id: 6,
    name: "Microondas Panasonic NN-SN966S",
    price: 199.99,
    category: "Microondas",
    brand: "Panasonic",
    image: "/images/microondas-panasonic.jpg",
    description: "Microondas de 2.2 pies cúbicos con tecnología Inverter",
    features: ["Tecnología Inverter", "Sensor de cocción", "Acero inoxidable", "Pantalla LED"],
    rating: 4.2,
    stock: 25
  },
  {
    id: 7,
    name: "Cafetera Keurig K-Elite",
    price: 149.99,
    category: "Electrodomésticos Pequeños",
    brand: "Keurig",
    image: "/images/cafetera-keurig.jpg",
    description: "Cafetera de una taza con múltiples opciones de tamaño",
    features: ["5 tamaños de taza", "Reservorio de 75 oz", "Pantalla LCD", "Programable"],
    rating: 4.1,
    stock: 30
  },
  {
    id: 8,
    name: "Licuadora Vitamix A3500",
    price: 549.99,
    category: "Electrodomésticos Pequeños",
    brand: "Vitamix",
    image: "/images/licuadora-vitamix.jpg",
    description: "Licuadora de alta velocidad con tecnología Smart System",
    features: ["Smart System", "5 programas preestablecidos", "Jarra de 64 oz", "Acero inoxidable"],
    rating: 4.8,
    stock: 14
  }
  {
    id: 9,
    name: "TV 100 pulgadas LG 4K OLED",
    price: 2500.99,
    category: "Televisores",
    brand: "LG",
    image: "/images/tv-lg-4k-oled.jpg",
    description: "TV 100 pulgadas LG 4K OLED",
    features: ["4K", "OLED", "100 pulgadas", "HDR", "Smart TV"],
    rating: 4.8,
    stock: 2
  }
];

// Obtener todos los productos
router.get('/', (req, res) => {
  const { category, brand, minPrice, maxPrice, search } = req.query;
  let filteredProducts = [...products];

  if (category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (brand) {
    filteredProducts = filteredProducts.filter(p => 
      p.brand.toLowerCase() === brand.toLowerCase()
    );
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
  }

  if (search) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json({
    products: filteredProducts,
    total: filteredProducts.length
  });
});

// Obtener producto por ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
  
  res.json(product);
});

// Obtener categorías
router.get('/categories/list', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  res.json(categories);
});

// Obtener marcas
router.get('/brands/list', (req, res) => {
  const brands = [...new Set(products.map(p => p.brand))];
  res.json(brands);
});

module.exports = router;
