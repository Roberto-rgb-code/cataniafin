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
  const productsPerPage = 24;
  const imageRefs = useRef(new Map());

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
        uso: Array.isArray(p.uso) ? p.uso : (p.uso ? String(p.uso).split(',').map(s=>s.trim()) : []),
        tallas: Array.isArray(p.tallas) ? p.tallas : (p.tallas ? String(p.tallas).split(',').map(s=>s.trim()) : []),
        color: Array.isArray(p.color) ? p.color : (p.color ? String(p.color).split(',').map(s=>s.trim()) : []),
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

  // Lazy loading with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const dataSrc = img.getAttribute('data-src');
            if (dataSrc) {
              img.src = dataSrc;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      },
      { rootMargin: '200px', threshold: 0.1 }
    );

    imageRefs.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => {
      imageRefs.current.forEach((img) => {
        if (img) observer.unobserve(img);
      });
    };
  }, [filteredUniformes, currentPage]);

  // Preload images for the first page
  useEffect(() => {
    const preloadImages = () => {
      const firstPageItems = uniformes.slice(0, productsPerPage);
      firstPageItems.forEach((uniforme) => {
        if (uniforme.fotos && uniforme.fotos.length > 0) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = `${uniforme.fotos[0]}?w=300&q=80`;
          document.head.appendChild(link);
        }
      });
    };
    if (uniformes.length > 0) {
      preloadImages();
    }
  }, [uniformes]);

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

  const handleFilterChange = (category) => {
    if (category && category !== 'Todos') {
      setFilteredUniformes(uniformes.filter((p) => p.categoria === category));
    } else {
      setFilteredUniformes(uniformes);
    }
    setCurrentPage(1);
  };

  const getPaginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredUniformes.slice(startIndex, startIndex + productsPerPage);
  }, [filteredUniformes, currentPage]);

  const totalProducts = filteredUniformes.length;
  const totalPages = Math.max(1, Math.ceil(totalProducts / productsPerPage));
  const categories = Array.from(new Set(uniformes.map((u) => u.categoria))).filter(Boolean);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando uniformes...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-8 text-red-600">
          <p className="text-xl mb-2">Error al cargar los uniformes</p>
          <p>{error}</p>
          <button onClick={fetchUniformes} className="mt-4 btn btn-primary">Reintentar</button>
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
            <div className="products-count">Mostrando {totalProducts} uniformes</div>
          </div>

          <div className="uniformes-grid">
            {getPaginatedProducts.map((uniforme) => {
              const imageSrc = (uniforme.fotos && uniforme.fotos.length > 0)
                ? `${uniforme.fotos[0]}?w=300&q=80`
                : 'https://via.placeholder.com/300x300?text=No+image';
              const placeholderSrc = (uniforme.fotos && uniforme.fotos.length > 0)
                ? `${uniforme.fotos[0]}?w=30&q=20&blur=10`
                : 'https://via.placeholder.com/30x30?text=No+image';

              return (
                <Link
                  to={`/uniforme/${encodeURIComponent(uniforme.id)}`}
                  key={uniforme.id}
                  className="uniforme-card-link"
                >
                  <article className="uniforme-card">
                    <img
                      src={placeholderSrc}
                      data-src={imageSrc}
                      alt={uniforme.nombre}
                      className="uniforme-image"
                      loading="lazy"
                      ref={(el) => {
                        if (el) imageRefs.current.set(uniforme.id, el);
                      }}
                      onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300x300?text=No+image'; }}
                    />
                    <div className="uniforme-content">
                      <h3 className="uniforme-title">{uniforme.nombre}</h3>
                      <p className="uniforme-category">Categoría: {uniforme.categoria}</p>
                      <p className="uniforme-type">Tipo: {uniforme.tipo}</p>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Link to="/" className="back-link">Volver a Inicio</Link>
    </div>
  );
};

export default Uniformes;