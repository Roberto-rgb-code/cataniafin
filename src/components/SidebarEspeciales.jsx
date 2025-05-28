// landing-page/src/components/SidebarEspeciales.jsx
import React, { useState } from 'react';
import './SidebarEspeciales.css';

const SidebarEspeciales = ({ onSearch, onFilterChange, categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onFilterChange(category);
  };

  return (
    <div className="sidebar-especiales">
      <h3 className="sidebar-title">Filtros Especiales</h3>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar especiales..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="filter-container">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="filter-select"
        >
          <option value="">Todas las categorías</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SidebarEspeciales;