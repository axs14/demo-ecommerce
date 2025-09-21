import api from './authService';

export const productService = {
  // Obtener todos los productos
  getProducts: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          params.append(key, filters[key]);
        }
      });
      
      const response = await api.get(`/products?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener productos');
    }
  },

  // Obtener producto por ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Producto no encontrado');
    }
  },

  // Obtener categorías
  getCategories: async () => {
    try {
      const response = await api.get('/products/categories/list');
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener categorías');
    }
  },

  // Obtener marcas
  getBrands: async () => {
    try {
      const response = await api.get('/products/brands/list');
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener marcas');
    }
  }
};
