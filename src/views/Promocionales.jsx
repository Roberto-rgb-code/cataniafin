import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import { fetchProducts, fetchStocks } from "../services/api.js";

// Custom SVG Icons
const Icons = {
  Search: ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="11" cy="11" r="8"/>
      <path d="21 21l-4.35-4.35"/>
    </svg>
  ),
  Filter: ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
    </svg>
  ),
  Grid: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  List: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <line x1="8" y1="6" x2="21" y2="6"/>
      <line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/>
      <line x1="3" y1="12" x2="3.01" y2="12"/>
      <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  ),
  Package: ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  Eye: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  AlertCircle: ({ size = 32, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  Loader: ({ size = 48, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`animate-spin ${className}`}>
      <path d="M21 12a9 9 0 11-6.219-8.56"/>
    </svg>
  )
};

const Promocionales = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(24);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  
  const [debug, setDebug] = useState({
    rawProducts: null,
    rawStocks: null,
    processedProducts: null,
    activeFilters: null
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        const [productsData, stocksData] = await Promise.all([
          fetchProducts(),
          fetchStocks()
        ]);

        setDebug(prev => ({
          ...prev,
          rawProducts: productsData,
          rawStocks: stocksData
        }));

        if (!productsData?.length) {
          throw new Error('No se recibieron productos de la API');
        }

        const stocksMap = stocksData?.reduce((acc, stock) => {
          if (stock?.Material) {
            acc[stock.Material] = stock.Stock;
          }
          return acc;
        }, {}) || {};

        const processedProducts = productsData.map((product) => {
          if (!product?.skuPadre) {
            console.warn('Producto sin skuPadre:', product);
          }

          return {
            id: product.skuPadre || '',
            name: product.nombrePadre || 'Producto sin nombre',
            description: product.descripcion || '',
            categorias: Array.isArray(product.categorias) 
              ? product.categorias 
              : product.categorias 
                ? [product.categorias] 
                : [],
            subCategorias: Array.isArray(product.subCategorias) 
              ? product.subCategorias 
              : product.subCategorias 
                ? [product.subCategorias] 
                : [],
            imageUrl: product.imagenesPadre?.[0] || 'https://via.placeholder.com/300x300?text=No+image',
            tipo: product.hijos?.[0]?.tipo || '',
            stock: stocksMap[product.skuPadre] || 0
          };
        });

        setDebug(prev => ({
          ...prev,
          processedProducts
        }));

        console.log('Productos procesados:', processedProducts);
        setProducts(processedProducts);
        setFilteredProducts(processedProducts);

      } catch (err) {
        console.error('Error detallado:', {
          message: err.message,
          stack: err.stack,
          debug: debug
        });
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchTerm) => {
    setDebug(prev => ({
      ...prev,
      activeFilters: { ...prev.activeFilters, search: searchTerm }
    }));

    let filtered = [...products];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = products.filter((p) => {
        const nameLower = p.name?.toLowerCase() || '';
        const descLower = p.description?.toLowerCase() || '';
        const skuLower = p.id?.toLowerCase() || '';
        return nameLower.includes(term) || descLower.includes(term) || skuLower.includes(term);
      });
    }

    console.log('Productos filtrados por búsqueda:', filtered);
    setFilteredProducts(filtered);
    setVisibleProducts(24);
  };

  const handleFilterChange = (filterType, value) => {
    setDebug(prev => ({
      ...prev,
      activeFilters: { ...prev.activeFilters, [filterType]: value }
    }));

    let filtered = [...products];

    if (filterType === 'categorias' && value) {
      filtered = filtered.filter(p => p.categorias.includes(value));
    }
    if (filterType === 'subCategorias' && value) {
      filtered = filtered.filter(p => p.subCategorias.includes(value));
    }
    
    console.log('Productos filtrados por', filterType, ':', filtered);
    setFilteredProducts(filtered);
    setVisibleProducts(24);
  };

  const sortProducts = (products, sortBy) => {
    const sorted = [...products];
    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'stock':
        return sorted.sort((a, b) => b.stock - a.stock);
      case 'type':
        return sorted.sort((a, b) => a.tipo.localeCompare(b.tipo));
      default:
        return sorted;
    }
  };

  const sortedAndFilteredProducts = sortProducts(filteredProducts, sortBy);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icons.AlertCircle className="text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error al cargar productos</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Reintentar
          </button>
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Información de debug
            </summary>
            <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto max-h-40">
              {JSON.stringify(debug, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center">
        <div className="text-center">
          <Icons.Loader className="text-orange-500 mx-auto mb-4" />
          <p className="text-xl font-medium text-gray-700 mb-2">Cargando productos...</p>
          <p className="text-gray-500">Obteniendo la información más reciente</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-sm font-medium rounded-full mb-4">
              Catálogo de Productos
            </span>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Promocionales Corporativos
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra amplia selección de productos promocionales de alta calidad 
              para fortalecer tu imagen corporativa
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          <Sidebar 
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            products={products}
          />
          
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icons.Package />
                  <span className="font-medium">
                    Mostrando {sortedAndFilteredProducts.length} producto{sortedAndFilteredProducts.length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Ordenar por:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    >
                      <option value="name">Nombre</option>
                      <option value="stock">Stock</option>
                      <option value="type">Tipo</option>
                    </select>
                  </div>
                  
                  {/* View Mode */}
                  <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                      <Icons.Grid />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                      <Icons.List />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {sortedAndFilteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icons.Package className="text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">No se encontraron productos</h3>
                <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
              </div>
            ) : (
              <>
                <div className={`${viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                  : 'space-y-4'
                }`}>
                  {sortedAndFilteredProducts.slice(0, visibleProducts).map((product) => (
                    <Link 
                      to={`/promocionales/product/${product.id}`} 
                      key={product.id}
                      className={`group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all duration-300 overflow-hidden ${
                        viewMode === 'list' ? 'flex items-center p-4' : 'block'
                      }`}
                    >
                      <div className={`${viewMode === 'list' ? 'w-24 h-24 flex-shrink-0' : 'aspect-square'} overflow-hidden ${viewMode === 'grid' ? 'mb-4' : 'mr-4'}`}>
                        <img 
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x300?text=No+image';
                          }}
                        />
                      </div>
                      
                      <div className={`${viewMode === 'grid' ? 'p-4 text-center' : 'flex-1'}`}>
                        <h2 className={`text-gray-800 font-semibold group-hover:text-orange-600 transition-colors ${
                          viewMode === 'grid' ? 'text-lg mb-2' : 'text-base mb-1'
                        }`}>
                          {product.name}
                        </h2>
                        
                        <div className={`${viewMode === 'list' ? 'flex items-center gap-4' : 'space-y-1'}`}>
                          {product.tipo && (
                            <p className="text-gray-500 text-sm">
                              {product.tipo}
                            </p>
                          )}
                          
                          {product.stock > 0 && (
                            <div className={`flex items-center gap-1 ${
                              product.stock > 10 ? 'text-green-600' : 'text-yellow-600'
                            }`}>
                              <div className={`w-2 h-2 rounded-full ${
                                product.stock > 10 ? 'bg-green-500' : 'bg-yellow-500'
                              }`}></div>
                              <span className="text-sm font-medium">
                                Stock: {product.stock}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className={`${viewMode === 'grid' ? 'mt-3' : 'mt-1'}`}>
                          <div className="flex items-center gap-1 text-orange-600 text-sm font-medium group-hover:gap-2 transition-all">
                            <Icons.Eye />
                            Ver detalles
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Load More Button */}
                {sortedAndFilteredProducts.length > visibleProducts && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() => setVisibleProducts(prev => prev + 24)}
                      className="px-8 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors shadow-sm hover:shadow-md font-medium"
                    >
                      Cargar más productos ({sortedAndFilteredProducts.length - visibleProducts} restantes)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promocionales;