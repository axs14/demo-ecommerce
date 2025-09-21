import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';
import CategoryFilter from '../components/CategoryFilter';
import BrandFilter from '../components/BrandFilter';
import PriceFilter from '../components/PriceFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import './Home.css';

const Home = () => {
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    search: ''
  });

  const { data: productsData, isLoading, error } = useQuery(
    ['products', filters],
    () => productService.getProducts(filters),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutos
    }
  );

  const { data: categories = [] } = useQuery(
    'categories',
    productService.getCategories,
    { staleTime: 10 * 60 * 1000 } // 10 minutos
  );

  const { data: brands = [] } = useQuery(
    'brands',
    productService.getBrands,
    { staleTime: 10 * 60 * 1000 } // 10 minutos
  );

  // Obtener parámetros de búsqueda de la URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
    if (search) {
      setFilters(prev => ({ ...prev, search }));
    }
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      search: ''
    });
  };

  const products = productsData?.products || [];

  if (error) {
    return (
      <div className="error-container">
        <h2>Error al cargar los productos</h2>
        <p>Por favor, intenta de nuevo más tarde.</p>
      </div>
    );
  }

  return (
    <div className="home">
      <Hero />
      
      <div className="container">
        <div className="home-content">
          {/* Filtros */}
          <aside className="filters-sidebar">
            <div className="filters-header">
              <h3>Filtros</h3>
              <button onClick={clearFilters} className="clear-filters-btn">
                Limpiar
              </button>
            </div>
            
            <CategoryFilter
              categories={categories}
              selectedCategory={filters.category}
              onCategoryChange={(category) => handleFilterChange('category', category)}
            />
            
            <BrandFilter
              brands={brands}
              selectedBrand={filters.brand}
              onBrandChange={(brand) => handleFilterChange('brand', brand)}
            />
            
            <PriceFilter
              minPrice={filters.minPrice}
              maxPrice={filters.maxPrice}
              onPriceChange={(min, max) => {
                handleFilterChange('minPrice', min);
                handleFilterChange('maxPrice', max);
              }}
            />
          </aside>

          {/* Productos */}
          <main className="products-section">
            <div className="products-header">
              <h2>Productos de Línea Blanca</h2>
              <p className="products-count">
                {isLoading ? 'Cargando...' : `${products.length} productos encontrados`}
              </p>
            </div>

            {isLoading ? (
              <LoadingSpinner />
            ) : products.length > 0 ? (
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="no-products">
                <h3>No se encontraron productos</h3>
                <p>Intenta ajustar los filtros o buscar algo diferente.</p>
                <button onClick={clearFilters} className="btn btn-primary">
                  Ver todos los productos
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
