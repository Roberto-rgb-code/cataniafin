import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SidebarUniformes from '../components/SidebarUniformes';
import './Uniformes.css';

const Uniformes = () => {
  const [uniformes, setUniformes] = useState([]);
  const [filteredUniformes, setFilteredUniformes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedImages, setLoadedImages] = useState(new Set());

  // 12 items por página = 3 x 4
  const productsPerPage = 12;

  // refs para lazy-load y prefetch
  const imageRefs = useRef(new Map());
  const preloadCache = useRef(new Set());

  useEffect(() => {
    fetchUniformes();
  }, []);

  const fetchUniformes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/product.json', {
        headers: { Accept: 'application/json' },
      });

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
      setFilteredUniformes(items);
      setError(null);
      setCurrentPage(1);
    } catch (err) {
      console.error('Error al leer /product.json:', err);
      setError('No se pudo cargar /product.json. Asegúrate de que esté en /public y con formato válido.');
    } finally {
      setLoading(false);
    }
  };

  // Pre-carga controlada de imágenes
  const preloadImage = (src) => {
    if (!src || preloadCache.current.has(src)) return;
    const img = new Image();
    img.onload = () => {
      setLoadedImages(prev => new Set([...prev, src]));
    };
    img.src = src;
    preloadCache.current.add(src);
  };

  // Lazy-load con IntersectionObserver + prefetch de las siguientes imágenes cercanas
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const img = entry.target;
          const dataSrc = img.getAttribute('data-src');
          if (dataSrc) {
            img.src = dataSrc;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
            observer.unobserve(img);

            // Pre-cargar 3 siguientes imágenes visibles en el grid
            const valuesArray = Array.from(imageRefs.current.values());
            const currentIndex = valuesArray.indexOf(img);
            const nextImages = valuesArray.slice(currentIndex + 1, currentIndex + 4);
            nextImages.forEach(nextImg => {
              const nextSrc = nextImg?.getAttribute('data-src');
              if (nextSrc) preloadImage(nextSrc);
            });
          }
        });
      },
      {
        rootMargin: '300px',
        threshold: 0.01
      }
    );

    imageRefs.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => observer.disconnect();
  }, [filteredUniformes, currentPage]);

  // Pre-cargar agresivamente la página actual
  const pageItems = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredUniformes.slice(startIndex, startIndex + productsPerPage);
  }, [filteredUniformes, currentPage]);

  useEffect(() => {
    if (pageItems.length === 0) return;
    pageItems.forEach((uniforme, index) => {
      const src = (uniforme?.fotos?.[0])
        ? `${uniforme.fotos[0]}?w=400&q=85&f=webp`
        : null;

      if (!src) return;

      if (index < 6) {
        preloadImage(src);
      } else {
        // pre-carga con desfase para no bloquear
        const t = setTimeout(() => preloadImage(src), index * 100);
        return () => clearTimeout(t);
      }
    });
  }, [pageItems]);

  // Búsqueda
  const handleSearch = (searchTerm) => {
    const term = (searchTerm || '').toLowerCase().trim();
    if (!term) {
      setFilteredUniformes(uniformes);
      setCurrentPage(1);
      return;
    }
    const filtered = uniformes.filter((p) => {
      const haystack = [
        p.nombre, p.descripcion, p.material, p.categoria, p.tipo,
        ...(p.uso || []), ...(p.tallas || []), ...(p.color || []),
      ].join(' ').toLowerCase();
      return haystack.includes(term);
    });
    setFilteredUniformes(filtered);
    setCurrentPage(1);
  };

  // Filtro por categoría
  const handleFilterChange = (category) => {
    if (category && category !== 'Todos') {
      setFilteredUniformes(uniformes.filter((p) => p.categoria === category));
    } else {
      setFilteredUniformes(uniformes);
    }
    setCurrentPage(1);
  };

  const totalProducts = filteredUniformes.length;
  const totalPages = Math.max(1, Math.ceil(totalProducts / productsPerPage));
  const categories = Array.from(new Set(uniformes.map((u) => u.categoria))).filter(Boolean);

  // Cambio de página con scroll suave hacia el grid
  const handlePageChange = (page) => {
    setCurrentPage(page);
    const gridElement = document.querySelector('.uniformes-grid-enhanced');
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
          <button onClick={fetchUniformes} className="btn-retry">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="uniformes-container">
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
              <span className="font-semibold">{totalProducts}</span> uniformes encontrados
              {currentPage > 1 && (
                <span className="ml-2 text-gray-500">
                  (Página {currentPage} de {totalPages})
                </span>
              )}
            </div>
          </div>

          {pageItems.length === 0 ? (
            <div className="empty-state">
              <h3>No encontramos resultados</h3>
              <p>Prueba con otras palabras clave o cambia los filtros.</p>
              <button className="btn-retry" onClick={() => { setFilteredUniformes(uniformes); setCurrentPage(1); }}>
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="uniformes-grid-enhanced">
              {pageItems.map((uniforme) => {
                const imageSrc = (uniforme.fotos && uniforme.fotos.length > 0)
                  ? `${uniforme.fotos[0]}?w=400&q=85&f=webp`
                  : 'https://via.placeholder.com/400x400?text=No+image';

                const placeholderSrc = (uniforme.fotos && uniforme.fotos.length > 0)
                  ? `${uniforme.fotos[0]}?w=20&q=10&blur=20`
                  : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSIjOUM5QzlDIiBmb250LXNpemU9IjE0Ij5TaW4gaW1hZ2VuPC90ZXh0Pgo8L3N2Zz4K';

                return (
                  <Link
                    to={`/uniforme/${encodeURIComponent(uniforme.id)}`}
                    key={uniforme.id}
                    className="uniforme-card-enhanced"
                  >
                    <article className="uniforme-card-content">
                      <div className="uniforme-image-container">
                        <img
                          src={placeholderSrc}
                          data-src={imageSrc}
                          alt={uniforme.nombre}
                          className="uniforme-image-enhanced"
                          loading="lazy"
                          ref={(el) => {
                            if (el) imageRefs.current.set(uniforme.id, el);
                            else imageRefs.current.delete(uniforme.id);
                          }}
                          onError={(e) => {
                            e.currentTarget.removeAttribute('data-src');
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSIjOUM5QzlDIiBmb250LXNpemU9IjE0Ij5TaW4gaW1hZ2VuPC90ZXh0Pgo8L3N2Zz4K';
                            e.currentTarget.classList.add('loaded');
                          }}
                        />
                        <div className="uniforme-overlay">
                          <span className="view-details">Ver detalles</span>
                        </div>
                      </div>

                      <div className="uniforme-info">
                        <h3 className="uniforme-title-enhanced">{uniforme.nombre}</h3>

                        <div className="uniforme-meta">
                          <span className="uniforme-category-tag">{uniforme.categoria}</span>
                          {uniforme.tipo && uniforme.tipo !== 'General' && (
                            <span className="uniforme-type-tag">{uniforme.tipo}</span>
                          )}
                        </div>

                        {uniforme.descripcion && (
                          <p className="uniforme-description">
                            {uniforme.descripcion.length > 80
                              ? `${uniforme.descripcion.slice(0, 80)}...`
                              : uniforme.descripcion}
                          </p>
                        )}

                        <div className="uniforme-features">
                          {uniforme.material && (
                            <span className="feature-tag">
                              <svg className="feature-icon" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0z" />
                              </svg>
                              {uniforme.material}
                            </span>
                          )}

                          {uniforme.tallas && uniforme.tallas.length > 0 && (
                            <span className="feature-tag">
                              <svg className="feature-icon" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                              </svg>
                              {uniforme.tallas.slice(0, 3).join(', ')}
                              {uniforme.tallas.length > 3 && '...'}
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination-enhanced">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="pagination-nav"
                aria-label="Página anterior"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
                Anterior
              </button>

              <div className="pagination-numbers" role="group" aria-label="Selector de página">
                {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = index + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = index + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + index;
                  } else {
                    pageNumber = currentPage - 2 + index;
                  }

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
                      aria-current={currentPage === pageNumber ? 'page' : undefined}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="pagination-nav"
                aria-label="Página siguiente"
              >
                Siguiente
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <Link to="/" className="back-link-enhanced">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
        Volver a Inicio
      </Link>
    </div>
  );
};

export default Uniformes;
