// landing-page/src/views/PromocionalDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PromocionalDetail.css';

const PromocionalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promocional, setPromocional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Zoom states
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomStep, setZoomStep] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const zoomLevels = [1.5, 2.5, 3.5, 5];

  const apiUrl = import.meta.env.VITE_PROMOCIONALES_API_URL;

  useEffect(() => {
    const fetchPromocional = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${apiUrl}/api/promocionales-destacados/${id}`, {
          headers: { Accept: 'application/json' },
        });
        setPromocional(res.data);
      } catch (err) {
        setError('Error al obtener el promocional destacado: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchPromocional();
  }, [id]);

  const handleImageClick = e => {
    e.stopPropagation();
    if (!isZoomed) {
      setIsZoomed(true);
      setZoomStep(0);
      setZoomLevel(zoomLevels[0]);
      setZoomPosition({ x: 0, y: 0 });
    } else {
      const next = zoomStep + 1;
      if (next < zoomLevels.length) {
        setZoomStep(next);
        setZoomLevel(zoomLevels[next]);
        setZoomPosition({ x: 0, y: 0 });
      } else {
        closeZoom();
      }
    }
  };

  const closeZoom = () => {
    setIsZoomed(false);
    setZoomStep(0);
    setZoomLevel(1);
    setZoomPosition({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const handleMouseDown = e => {
    if (!isZoomed) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - zoomPosition.x, y: e.clientY - zoomPosition.y });
  };
  const handleMouseMove = e => {
    if (!isDragging) return;
    setZoomPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleWheel = e => {
    if (!isZoomed) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -1 : 1;
    const next = Math.max(0, Math.min(zoomStep + delta, zoomLevels.length - 1));
    setZoomStep(next);
    setZoomLevel(zoomLevels[next]);
  };

  if (loading) {
    return (
      <div className="promocional-detalle-container">
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="promocional-detalle-container error">
        <p>{error}</p>
        <button className="btn" onClick={() => navigate('/promocionales-destacados')}>
          Volver al catálogo
        </button>
      </div>
    );
  }

  if (!promocional) {
    return (
      <div className="promocional-detalle-container error">
        <p>Promocional no encontrado</p>
        <button className="btn" onClick={() => navigate('/promocionales-destacados')}>
          Volver al catálogo
        </button>
      </div>
    );
  }

  const fotos = Array.isArray(promocional.fotos) && promocional.fotos.length > 0
    ? promocional.fotos
    : promocional.foto_path
      ? [{ foto_path: promocional.foto_path }]
      : [];

  return (
    <div className="promocional-detalle-container">
      <header className="section-header">
        <span className="section-tag">Promocionales</span>
        <h1 className="section-title">Detalles del Artículo Promocional Destacado</h1>
      </header>

      <div className="promocional-detail-content">
        <div className="gallery">
          {fotos.length > 1 && (
            <div className="thumbnails">
              {fotos.map((f, i) => (
                <img
                  key={i}
                  src={`${apiUrl}/storage/${f.foto_path}`}
                  alt={`Thumbnail ${i}`}
                  className={`thumbnail ${i === selectedIndex ? 'active' : ''}`}
                  onClick={() => { setSelectedIndex(i); closeZoom(); }}
                  onError={e => e.target.src = 'https://via.placeholder.com/80x80?text=No+image'}
                />
              ))}
            </div>
          )}

          <div
            className={`main-image-container ${isZoomed ? 'zoomed' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            {fotos.length > 0 ? (
              <img
                src={`${apiUrl}/storage/${fotos[selectedIndex].foto_path}`}
                alt={promocional.nombre}
                className="main-image"
                onClick={handleImageClick}
                style={isZoomed ? {
                  transform: `scale(${zoomLevel}) translate(${zoomPosition.x}px, ${zoomPosition.y}px)`,
                  cursor: isDragging ? 'grabbing' : 'grab'
                } : {}}
                draggable={false}
              />
            ) : (
              <div className="main-image placeholder">No hay foto</div>
            )}
            {isZoomed && <div className="zoom-overlay" onClick={closeZoom}></div>}
            {isZoomed && (
              <div className="zoom-indicator">
                Zoom: {zoomStep + 1}/{zoomLevels.length} — Click para más zoom
              </div>
            )}
          </div>
        </div>

        <div className="promocional-info">
          <h2 className="product-name">{promocional.nombre}</h2>
          <p className="product-description">{promocional.descripcion}</p>
          <p className="product-category">Categoría: {promocional.categoria}</p>
          <button className="btn" onClick={() => navigate('/promocionales-destacados')}>
            Volver al catálogo
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromocionalDetail;
