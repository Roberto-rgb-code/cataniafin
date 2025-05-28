// landing-page/src/components/SidebarPromocionales.jsx
import React, { useState } from 'react';
import './SidebarPromocionales.css';

const SidebarPromocionales = ({ onSearch, onFilterChange, categories }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleFilterClick = (category) => {
    onFilterChange(category);
  };

  return (
    <aside className="sidebar-promocionales">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar promocionales..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="filter-section">
        <h3 className="filter-title">Categorías</h3>
        <ul className="filter-list">
          <li>
            <button
              className="filter-button"
              onClick={() => handleFilterClick('')}
            >
              Todas
            </button>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <button
                className="filter-button"
                onClick={() => handleFilterClick(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SidebarPromocionales;