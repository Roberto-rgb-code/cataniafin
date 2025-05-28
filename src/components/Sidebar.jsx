import React, { useState } from 'react';

const Sidebar = ({ onSearch, onFilterChange, products = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openSection, setOpenSection] = useState(null);

  // Obtener categorías únicas
  const uniqueCategories = [
    ...new Set(
      products.flatMap(p =>
        Array.isArray(p.categorias) ? p.categorias : [p.categorias]
      )
    )
  ]
    .filter(Boolean)
    .sort();

  // Obtener subcategorías únicas
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

  return (
    <div className="w-64">
      {/* BÚSQUEDA */}
      <div>
        <h3 className="text-[#242964] font-medium">BÚSQUEDA</h3>
        <form onSubmit={handleSubmit} className="mt-2">
          <input
            type="text"
            placeholder="Buscar por nombre o SKU..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            type="submit"
            className="w-full bg-[#242964] text-white p-2 rounded mt-2"
          >
            BUSCAR
          </button>
        </form>
      </div>

      {/* BÚSQUEDA AVANZADA */}
      <div className="mt-6">
        <h3 className="text-[#242964] font-medium mb-2">BÚSQUEDA AVANZADA</h3>

        {/* CATEGORÍAS */}
        <div
          onClick={() => toggleSection('categorias')}
          className="flex justify-between items-center py-2 cursor-pointer border-t"
        >
          <span>CATEGORÍAS</span>
          <span>{openSection === 'categorias' ? '▼' : '▲'}</span>
        </div>
        {openSection === 'categorias' && (
          <div className="pl-4 py-2">
            {uniqueCategories.map((category, index) => (
              <div key={index} className="py-1">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    className="mr-2"
                    onChange={() => onFilterChange('categorias', category)}
                  />
                  <span className="text-sm">{category}</span>
                </label>
              </div>
            ))}
          </div>
        )}

        {/* SUBCATEGORÍAS */}
        <div
          onClick={() => toggleSection('subcategorias')}
          className="flex justify-between items-center py-2 cursor-pointer border-t"
        >
          <span>SUBCATEGORÍAS</span>
          <span>{openSection === 'subcategorias' ? '▼' : '▲'}</span>
        </div>
        {openSection === 'subcategorias' && (
          <div className="pl-4 py-2">
            {uniqueSubCategories.map((subCategory, index) => (
              <div key={index} className="py-1">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="subCategory"
                    className="mr-2"
                    onChange={() => onFilterChange('subCategorias', subCategory)}
                  />
                  <span className="text-sm">{subCategory}</span>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;