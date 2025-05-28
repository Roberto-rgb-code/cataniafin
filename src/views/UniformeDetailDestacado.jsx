// UniformeDetailDestacado.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UniformeDetailDestacado.css';

const UniformeDetailDestacado = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [uniforme, setUniforme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Zoom states
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomStep, setZoomStep] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const zoomLevels = [1.5, 2.5, 3.5, 5];
  const apiUrl = import.meta.env.VITE_UNIFORMES_API_URL;

  useEffect(() => {
    fetchUniforme();
  }, [id]);

  const fetchUniforme = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/api/uniformes-destacados/${id}`, {
        headers: { Accept: 'application/json' },
      });
      setUniforme(res.data);
    } catch (err) {
      setError('Error al obtener el uniforme destacado: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

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
    setZoomLevel(1);
    setZoomStep(0);
    setZoomPosition({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const handleMouseDown = e => {
    if (isZoomed) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - zoomPosition.x, y: e.clientY - zoomPosition.y });
    }
  };
  const handleMouseMove = e => {
    if (isDragging && isZoomed) {
      setZoomPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleWheel = e => {
    if (isZoomed) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -1 : 1;
      const next = Math.max(0, Math.min(zoomStep + delta, zoomLevels.length - 1));
      setZoomStep(next);
      setZoomLevel(zoomLevels[next]);
    }
  };

  if (loading) {
    return <div className="uniforme-detalle-container"><p>Cargando...</p></div>;
  }
  if (error) {
    return (
      <div className="uniforme-detalle-container error">
        <p>{error}</p>
        <button className="btn" onClick={() => navigate('/uniformes-destacados')}>
          Volver al catálogo
        </button>
      </div>
    );
  }
  if (!uniforme) {
    return (
      <div className="uniforme-detalle-container error">
        <p>Uniforme no encontrado</p>
        <button className="btn" onClick={() => navigate('/uniformes-destacados')}>
          Volver al catálogo
        </button>
      </div>
    );
  }

  const fotos = Array.isArray(uniforme.fotos) && uniforme.fotos.length > 0
    ? uniforme.fotos
    : uniforme.foto_path
      ? [{ foto_path: uniforme.foto_path }]
      : [];

  return (
    <div className="uniforme-detalle-container">
      <header className="section-header">
        <span className="section-tag">Uniformes</span>
        <h1 className="section-title">Detalles del Uniforme Destacado</h1>
      </header>

      <div className="uniforme-detail-content">
        <div className="gallery">
          {fotos.length > 1 && (
            <div className="thumbnails">
              {fotos.map((f, i) => (
                <img
                  key={i}
                  src={`${apiUrl}/storage/${f.foto_path}`}
                  alt={`Thumb ${i}`}
                  className={`thumbnail ${i === selectedIndex ? 'active' : ''}`}
                  onClick={() => { setSelectedIndex(i); closeZoom(); }}
                  onError={e => e.target.src = 'https://via.placeholder.com/80?text=No+image'}
                />
              ))}
            </div>
          )}
          <div className={`main-image-container ${isZoomed ? 'zoomed' : ''}`}>
            {fotos.length > 0 ? (
              <img
                src={`${apiUrl}/storage/${fotos[selectedIndex].foto_path}`}
                alt={uniforme.nombre}
                className="main-image"
                onClick={handleImageClick}
              />
            ) : (
              <div className="main-image placeholder">No hay foto</div>
            )}

            {isZoomed && (
              <>
                <div className="zoom-overlay" onClick={closeZoom}></div>
                <div
                  className="zoomed-image-container"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onWheel={handleWheel}
                >
                  <img
                    src={`${apiUrl}/storage/${fotos[selectedIndex].foto_path}`}
                    alt={uniforme.nombre}
                    className="zoomed-image"
                    style={{
                      transform: `scale(${zoomLevel}) translate(${zoomPosition.x}px, ${zoomPosition.y}px)`,
                      cursor: isDragging ? 'grabbing' : 'grab'
                    }}
                    onClick={handleImageClick}
                    draggable={false}
                  />
                </div>
                <div className="zoom-indicator">
                  Zoom: {zoomStep + 1}/{zoomLevels.length} — Click para más zoom
                </div>
              </>
            )}
          </div>
        </div>

        <div className="uniforme-info">
          <h2 className="product-name">{uniforme.nombre}</h2>
          <p className="product-description">{uniforme.descripcion}</p>
          <p className="product-category">Categoría: {uniforme.categoria}</p>
          <button className="btn" onClick={() => navigate('/uniformes-destacados')}>
            Volver al catálogo
          </button>
        </div>
      </div>
    </div>
  );
};

export default UniformeDetailDestacado;
