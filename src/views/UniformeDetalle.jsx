import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LazyLoad from 'react-lazyload';
import './UniformeDetalle.css';

const UniformeDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [uniforme, setUniforme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Modal fullscreen
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUniforme = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get('/product.json', { headers: { Accept: 'application/json' } });
      const list = Array.isArray(data) ? data : (data.productos || []);
      const routeId = decodeURIComponent(id || '').toLowerCase();

      let found = list.find(p => (p.id || '').toLowerCase() === routeId);
      if (!found) found = list.find(p => (p.nombre || '').toLowerCase() === routeId);
      if (!found) { setUniforme(null); return; }

      setUniforme(found);
      setSelectedIndex(0);
    } catch (err) {
      console.error('Error al leer /product.json:', err);
      setError('No se pudo cargar el producto. Revisa /public/product.json o la ruta.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniforme();
    // eslint-disable-next-line
  }, [id]);

  if (loading) return <div className="uniforme-detalle-container">Cargando...</div>;
  if (error) return (
    <div className="uniforme-detalle-container error">
      {error}
      <div className="cta-actions">
        <button className="btn btn-secondary" onClick={() => navigate('/uniformes')}>
          <span className="btn-icon" aria-hidden>←</span>
          Volver al catálogo
        </button>
      </div>
    </div>
  );
  if (!uniforme) return (
    <div className="uniforme-detalle-container error">
      Uniforme no encontrado
      <div className="cta-actions">
        <button className="btn btn-secondary" onClick={() => navigate('/uniformes')}>
          <span className="btn-icon" aria-hidden>←</span>
          Volver al catálogo
        </button>
      </div>
    </div>
  );

  const fotos = Array.isArray(uniforme.fotos) ? uniforme.fotos : [];
  const mainImg = fotos[selectedIndex] || null;

  return (
    <div className="uniforme-detalle-container">
      <header className="section-header">
        <span className="section-tag">Uniformes</span>
        <h1 className="section-title">{uniforme.nombre}</h1>
        <p className="section-subtitle">{uniforme.categoria} · {uniforme.tipo}</p>
      </header>

      <div className="uniforme-detail-content">
        {/* Galería */}
        <section className="gallery">
          {fotos.length > 1 && (
            <div className="thumbnails">
              {fotos.map((url, i) => (
                <img
                  key={i}
                  src={`${url}?w=84&q=60`}
                  alt={`Miniatura ${i + 1}`}
                  className={`thumbnail ${i === selectedIndex ? 'active' : ''}`}
                  onClick={() => setSelectedIndex(i)}
                />
              ))}
            </div>
          )}

          <div
            className="main-image-wrapper"
            onClick={() => setIsModalOpen(true)}
            title="Click para ver en grande"
          >
            {mainImg ? (
              <LazyLoad height={400} offset={200} once>
                <img
                  src={`${mainImg}?w=800&q=80`}
                  alt={uniforme.nombre}
                  className="main-image"
                />
              </LazyLoad>
            ) : (
              <div className="main-image placeholder">No hay foto</div>
            )}
            <div className="hint-zoom">Click para ampliar</div>
          </div>
        </section>

        {/* Info */}
        <section className="uniforme-info">
          <h2 className="product-name">{uniforme.nombre}</h2>
          {uniforme.descripcion && <p className="product-description">{uniforme.descripcion}</p>}

          <div className="product-attrs">
            <p><strong>Categoría:</strong> {uniforme.categoria}</p>
            <p><strong>Tipo:</strong> {uniforme.tipo}</p>
            {!!uniforme.material && <p><strong>Material:</strong> {uniforme.material}</p>}
            {!!(uniforme.tallas?.length) && <p><strong>Tallas:</strong> {uniforme.tallas.join(', ')}</p>}
            {!!(uniforme.color?.length) && <p><strong>Color:</strong> {uniforme.color.join(', ')}</p>}
          </div>

          {/* Nota extra */}
          <p className="product-note">
            <strong>Puedes elegir la combinación de colores de acuerdo a tus necesidades</strong>
          </p>

          {/* CTA */}
          <div className="cta-actions" role="group" aria-label="Acciones">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/uniformes')}
            >
              <span className="btn-icon" aria-hidden>←</span>
              Volver al catálogo
            </button>

            <a
              className="btn btn-whatsapp"
              href={`https://wa.me/5210000000000?text=${encodeURIComponent(
                `Hola, quiero cotizar el modelo ${uniforme.nombre} (${uniforme.categoria} · ${uniforme.tipo}).`
              )}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Cotizar por WhatsApp"
            >
              <svg className="wa-icon" viewBox="0 0 32 32" aria-hidden>
                <path d="M19.11 17.26c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.78-1.48-1.74-1.66-2.04-.18-.3-.02-.47.13-.62.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.23-.24-.57-.48-.5-.68-.5l-.58-.01c-.2 0-.52.07-.8.37-.28.3-1.06 1.04-1.06 2.54s1.09 2.95 1.24 3.15c.15.2 2.15 3.28 5.2 4.6.73.31 1.3.5 1.75.64.74.24 1.41.21 1.94.13.59-.09 1.77-.72 2.02-1.41.25-.69.25-1.27.17-1.41-.07-.14-.27-.22-.57-.37z" fill="currentColor"/>
                <path d="M15.98 2.4C8.96 2.4 3.25 8.1 3.25 15.12c0 2.26.6 4.37 1.66 6.2L3 29l7.9-1.85a12.7 12.7 0 0 0 5.08 1.07c7.03 0 12.73-5.7 12.73-12.72 0-7.03-5.7-12.72-12.73-12.72zm0 22.96c-1.94 0-3.74-.5-5.3-1.38l-.38-.21-4.69 1.1 1.25-4.57-.24-.4a10.17 10.17 0 1 1 9.36 5.46z" fill="currentColor"/>
              </svg>
              Cotizar por WhatsApp
            </a>
          </div>
        </section>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)} aria-label="Cerrar">×</button>
            <img
              src={`${fotos[selectedIndex]}?w=1600&q=90`}
              alt={`${uniforme.nombre} grande`}
              className="modal-image"
            />
            {fotos.length > 1 && (
              <div className="modal-thumbnails">
                {fotos.map((url, i) => (
                  <img
                    key={i}
                    src={`${url}?w=64&q=60`}
                    alt={`mini ${i + 1}`}
                    className={`modal-thumb ${i === selectedIndex ? 'active' : ''}`}
                    onClick={() => setSelectedIndex(i)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UniformeDetalle;
