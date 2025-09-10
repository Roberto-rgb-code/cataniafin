import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SidebarUniformes from '../components/SidebarUniformes';
import './Uniformes.css';

const FIRST_HIGH_PRIORITY = 6;   // cuántas imágenes con fetchpriority="high"
const PAGE_CHUNK = 24;           // cuántos productos mostrar por tanda

const Uniformes = () => {
  const [uniformes, setUniformes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_CHUNK);
  const [loadedIds, setLoadedIds] = useState(new Set()); // para el blur->nítido

  useEffect(() => {
    const fetchUniformes = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/product.json', { headers: { Accept: 'application/json' } });
        const raw = Array.isArray(data) ? data : (data.productos || []);
        const items = raw.map((p) => ({
          id: p.id,
          nombre: p.nombre || '',
          descripcion: p.descripcion || '',
          material: p.material || '',
          uso: Array.isArray(p.uso) ? p.uso : (p.uso ? String(p.uso).split(',').map(s => s.trim()) : []),
          tallas: Array.isArray(p.tallas) ? p.tallas : (p.tallas ? String(p.tallas).split(',').map(s => s.trim()) : []),
          color: Array.isArray(p.color) ? p.color : (p.color ? String(p.color).split(',').map(s => s.trim()) : []),
          categoria: p.categoria || 'General',
          tipo: p.tipo || 'General',
          fotos: Array.isArray(p.fotos) ? p.fotos : [],
        }));
        setUniformes(items);
        setFiltered(items);
        setError(null);
        setVisibleCount(PAGE_CHUNK);
        setLoadedIds(new Set());
      } catch (err) {
        console.error('Error al leer /product.json:', err);
        setError('No se pudo cargar /product.json. Asegúrate de que esté en /public y con formato válido.');
      } finally {
        setLoading(false);
      }
    };
    fetchUniformes();
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(uniformes.map(u => u.categoria))).filter(Boolean),
    [uniformes]
  );

  // búsqueda
  const handleSearch = (termRaw) => {
    const term = (termRaw || '').toLowerCase().trim();
    if (!term) {
      setFiltered(uniformes);
      setVisibleCount(PAGE_CHUNK);
      return;
    }
    const res = uniformes.filter((p) => {
      const haystack = [
        p.nombre, p.descripcion, p.material, p.categoria, p.tipo,
        ...(p.uso || []), ...(p.tallas || []), ...(p.color || []),
      ].join(' ').toLowerCase();
      return haystack.includes(term);
    });
    setFiltered(res);
    setVisibleCount(PAGE_CHUNK);
  };

  // filtro por categoría
  const handleFilterChange = (category) => {
    if (category && category !== 'Todos') {
      setFiltered(uniformes.filter((p) => p.categoria === category));
    } else {
      setFiltered(uniformes);
    }
    setVisibleCount(PAGE_CHUNK);
  };

  const visibleItems = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  const onImgLoad = (id) => {
    setLoadedIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="flex-center min-h-screen">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p className="mt-4 text-lg">Cargando uniformes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-center min-h-screen">
        <div className="error-card">
          <p className="error-title">Error al cargar los uniformes</p>
          <p className="error-body">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-retry">Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="uniformes-container">
      <div className="uniformes-inner">
        <header className="section-header">
          <span className="section-tag">Uniformes</span>
          <h1 className="section-title">Nuestros Uniformes</h1>
          <p className="section-description">
            Explora nuestra gama de uniformes industriales, médicos, escolares y corporativos.
          </p>
        </header>

        <div className="uniformes-content">
          <SidebarUniformes
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            categories={categories}
          />

          <div className="products-main">
            <div className="products-header">
              <div className="products-count">
                <span className="font-semibold">{filtered.length}</span> uniformes encontrados
              </div>
            </div>

            {visibleItems.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <h3>No encontramos resultados</h3>
                <p>Prueba con otras palabras clave o cambia los filtros.</p>
                <button
                  className="btn-retry"
                  onClick={() => { setFiltered(uniformes); setVisibleCount(PAGE_CHUNK); }}
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <>
                <div className="uniformes-grid-enhanced">
                  {visibleItems.map((u, index) => {
                    const imageSrc = u.fotos?.[0] || 'https://via.placeholder.com/1200x900?text=No+image';
                    const isLoaded = loadedIds.has(u.id);
                    const highPriority = index < FIRST_HIGH_PRIORITY;

                    return (
                      <Link
                        to={`/uniforme/${encodeURIComponent(u.id)}`}
                        key={u.id}
                        className="uniforme-card-enhanced"
                        style={{ animationDelay: `${index * 0.04}s` }}
                      >
                        <article className="uniforme-card-content" tabIndex={0}>
                          <div className="uniforme-image-container">
                            <img
                              src={imageSrc}
                              alt={u.nombre}
                              className={`uniforme-image-enhanced ${isLoaded ? 'loaded' : ''}`}
                              loading={highPriority ? 'eager' : 'lazy'}
                              decoding="async"
                              fetchpriority={highPriority ? 'high' : 'auto'}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              onLoad={() => onImgLoad(u.id)}
                              onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/1200x900?text=No+image';
                                onImgLoad(u.id);
                              }}
                            />

                            {!isLoaded && (
                              <div className="image-loading-indicator">
                                <div className="loading-dots">
                                  <span></span><span></span><span></span>
                                </div>
                              </div>
                            )}

                            <div className="uniforme-overlay">
                              <span className="view-details">Ver detalles</span>
                              <svg className="view-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18l6-6-6-6"/>
                              </svg>
                            </div>
                          </div>

                          <div className="uniforme-info">
                            <h3 className="uniforme-title-enhanced">{u.nombre}</h3>

                            <div className="uniforme-meta">
                              <span className="uniforme-category-tag">{u.categoria}</span>
                              {u.tipo && u.tipo !== 'General' && (
                                <span className="uniforme-type-tag">{u.tipo}</span>
                              )}
                            </div>

                            {u.descripcion && (
                              <p className="uniforme-description">
                                {u.descripcion.length > 140 ? `${u.descripcion.slice(0, 140)}...` : u.descripcion}
                              </p>
                            )}

                            <div className="uniforme-features">
                              {u.material && (
                                <span className="feature-tag">
                                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M12 6v6l4 2"/>
                                  </svg>
                                  {u.material}
                                </span>
                              )}

                              {u.tallas?.length > 0 && (
                                <span className="feature-tag">
                                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                                  </svg>
                                  {u.tallas.slice(0, 4).join(', ')}
                                  {u.tallas.length > 4 && ' +'}
                                </span>
                              )}

                              {u.color?.length > 0 && (
                                <span className="feature-tag">
                                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="3"/>
                                    <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
                                  </svg>
                                  {u.color.slice(0, 3).join(', ')}
                                  {u.color.length > 3 && ' +'}
                                </span>
                              )}
                            </div>
                          </div>
                        </article>
                      </Link>
                    );
                  })}
                </div>

                {filtered.length > visibleItems.length && (
                  <div className="load-more-center">
                    <button
                      className="btn-load-more"
                      onClick={() => setVisibleCount((v) => v + PAGE_CHUNK)}
                    >
                      Cargar más productos ({filtered.length - visibleItems.length} restantes)
                    </button>
                  </div>
                )}
              </>
            )}

            <Link to="/" className="back-link-enhanced">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
              Volver a Inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uniformes;
