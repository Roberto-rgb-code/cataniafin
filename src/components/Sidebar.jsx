import React, { useState } from 'react';

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
  ChevronDown: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <polyline points="6,9 12,15 18,9"/>
    </svg>
  ),
  ChevronUp: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <polyline points="18,15 12,9 6,15"/>
    </svg>
  ),
  X: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Tag: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  )
};

const Sidebar = ({ onSearch, onFilterChange, products = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openSection, setOpenSection] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  // Obtener categorías únicas - manteniendo tu lógica exacta
  const uniqueCategories = [
    ...new Set(
      products.flatMap(p =>
        Array.isArray(p.categorias) ? p.categorias : [p.categorias]
      )
    )
  ]
    .filter(Boolean)
    .sort();

  // Obtener subcategorías únicas - manteniendo tu lógica exacta
  const uniqueSubCategories = [
    ...new Set(
      products.flatMap(p =>
        Array.isArray(p.subCategorias) ? p.subCategorias : [p.subCategorias]
      )
    )
  ]
    .filter(Boolean)
    .sort();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilterChange('categorias', category);
  };

  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategory(subCategory);
    onFilterChange('subCategorias', subCategory);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedSubCategory('');
    onSearch('');
    onFilterChange('categorias', '');
    onFilterChange('subCategorias', '');
  };

  const hasActiveFilters = searchTerm || selectedCategory || selectedSubCategory;

  return (
    <div className="w-80 bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit sticky top-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
          <Icons.Filter className="text-[#242964]" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#242964]">Filtros</h2>
          <p className="text-sm text-gray-500">Refina tu búsqueda</p>
        </div>
      </div>

      {/* BÚSQUEDA - Manteniendo tu estructura exacta */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Icons.Search size={18} className="text-[#242964]" />
          <h3 className="text-[#242964] font-medium text-sm uppercase tracking-wide">Búsqueda</h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre o SKU..."
              className="w-full p-3 pl-10 border-2 border-gray-200 rounded-lg focus:border-[#242964] focus:ring-2 focus:ring-blue-50 outline-none transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Icons.Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Icons.X size={16} />
              </button>
            )}
          </div>
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-[#242964] to-[#1e2255] text-white p-3 rounded-lg font-medium hover:from-[#1e2255] hover:to-[#1a1e4a] transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            BUSCAR
          </button>
        </form>
      </div>

      {/* Filtros Activos */}
      {hasActiveFilters && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-[#242964]">Filtros Activos</span>
            <button
              onClick={clearAllFilters}
              className="text-xs text-red-600 hover:text-red-700 font-medium"
            >
              Limpiar todo
            </button>
          </div>
          <div className="space-y-2">
            {searchTerm && (
              <div className="flex items-center justify-between bg-white p-2 rounded border">
                <span className="text-sm">Búsqueda: "{searchTerm}"</span>
                <button onClick={clearSearch} className="text-gray-400 hover:text-gray-600">
                  <Icons.X size={12} />
                </button>
              </div>
            )}
            {selectedCategory && (
              <div className="flex items-center justify-between bg-white p-2 rounded border">
                <span className="text-sm">Categoría: {selectedCategory}</span>
                <button onClick={() => handleCategoryChange('')} className="text-gray-400 hover:text-gray-600">
                  <Icons.X size={12} />
                </button>
              </div>
            )}
            {selectedSubCategory && (
              <div className="flex items-center justify-between bg-white p-2 rounded border">
                <span className="text-sm">Subcategoría: {selectedSubCategory}</span>
                <button onClick={() => handleSubCategoryChange('')} className="text-gray-400 hover:text-gray-600">
                  <Icons.X size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BÚSQUEDA AVANZADA - Manteniendo tu estructura exacta */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Icons.Tag size={18} className="text-[#242964]" />
          <h3 className="text-[#242964] font-medium text-sm uppercase tracking-wide">Búsqueda Avanzada</h3>
        </div>

        {/* CATEGORÍAS - Manteniendo tu lógica exacta */}
        <div className="mb-4">
          <div
            onClick={() => toggleSection('categorias')}
            className="flex justify-between items-center py-3 px-4 cursor-pointer border-2 border-gray-100 rounded-lg hover:border-[#242964] hover:bg-gray-50 transition-all duration-200 group"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700 group-hover:text-[#242964]">CATEGORÍAS</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {uniqueCategories.length}
              </span>
            </div>
            {openSection === 'categorias' ? 
              <Icons.ChevronUp className="text-gray-500 group-hover:text-[#242964] transition-colors" /> : 
              <Icons.ChevronDown className="text-gray-500 group-hover:text-[#242964] transition-colors" />
            }
          </div>
          {openSection === 'categorias' && (
            <div className="mt-2 p-4 bg-gray-50 rounded-lg border max-h-60 overflow-y-auto">
              <div className="mb-3">
                <label className="flex items-center cursor-pointer p-2 hover:bg-white rounded transition-colors">
                  <input
                    type="radio"
                    name="category"
                    className="mr-3 text-[#242964] focus:ring-[#242964]"
                    checked={selectedCategory === ''}
                    onChange={() => handleCategoryChange('')}
                  />
                  <span className="text-sm font-medium text-gray-700">Todas las categorías</span>
                </label>
              </div>
              {uniqueCategories.map((category, index) => (
                <div key={index} className="mb-1">
                  <label className="flex items-center cursor-pointer p-2 hover:bg-white rounded transition-colors">
                    <input
                      type="radio"
                      name="category"
                      className="mr-3 text-[#242964] focus:ring-[#242964]"
                      checked={selectedCategory === category}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span className="text-sm text-gray-700">{category}</span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SUBCATEGORÍAS - Manteniendo tu lógica exacta */}
        <div>
          <div
            onClick={() => toggleSection('subcategorias')}
            className="flex justify-between items-center py-3 px-4 cursor-pointer border-2 border-gray-100 rounded-lg hover:border-[#242964] hover:bg-gray-50 transition-all duration-200 group"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700 group-hover:text-[#242964]">SUBCATEGORÍAS</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {uniqueSubCategories.length}
              </span>
            </div>
            {openSection === 'subcategorias' ? 
              <Icons.ChevronUp className="text-gray-500 group-hover:text-[#242964] transition-colors" /> : 
              <Icons.ChevronDown className="text-gray-500 group-hover:text-[#242964] transition-colors" />
            }
          </div>
          {openSection === 'subcategorias' && (
            <div className="mt-2 p-4 bg-gray-50 rounded-lg border max-h-60 overflow-y-auto">
              <div className="mb-3">
                <label className="flex items-center cursor-pointer p-2 hover:bg-white rounded transition-colors">
                  <input
                    type="radio"
                    name="subCategory"
                    className="mr-3 text-[#242964] focus:ring-[#242964]"
                    checked={selectedSubCategory === ''}
                    onChange={() => handleSubCategoryChange('')}
                  />
                  <span className="text-sm font-medium text-gray-700">Todas las subcategorías</span>
                </label>
              </div>
              {uniqueSubCategories.map((subCategory, index) => (
                <div key={index} className="mb-1">
                  <label className="flex items-center cursor-pointer p-2 hover:bg-white rounded transition-colors">
                    <input
                      type="radio"
                      name="subCategory"
                      className="mr-3 text-[#242964] focus:ring-[#242964]"
                      checked={selectedSubCategory === subCategory}
                      onChange={() => handleSubCategoryChange(subCategory)}
                    />
                    <span className="text-sm text-gray-700">{subCategory}</span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer con estadísticas */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{products.length} productos totales</span>
          <span>{uniqueCategories.length + uniqueSubCategories.length} filtros</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;