import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UniformeDetalle.css';

const UniformeDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [uniforme, setUniforme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomStep, setZoomStep] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const zoomLevels = [1.5, 2.5, 3.5, 5];
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchUniforme();
  }, [id]);

  const fetchUniforme = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/uniformes/${id}`, {
        headers: { 'Accept': 'application/json' },
      });
      const data = response.data;
      setUniforme(data);
    } catch (error) {
      setError('Error al obtener el uniforme: ' + error.message);
      console.error('Error en fetchUniforme:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    if (!isZoomed) {
      // Abrir zoom con primer nivel
      setIsZoomed(true);
      setZoomStep(0);
      setZoomLevel(zoomLevels[0]);
      setZoomPosition({ x: 0, y: 0 });
    } else {
      // Aumentar zoom o cerrar si está en el máximo
      const nextStep = zoomStep + 1;
      if (nextStep < zoomLevels.length) {
        setZoomStep(nextStep);
        setZoomLevel(zoomLevels[nextStep]);
        setZoomPosition({ x: 0, y: 0 }); // Resetear posición al cambiar zoom
      } else {
        // Cerrar zoom si ya está en el máximo
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

  const handleMouseDown = (e) => {
    if (isZoomed) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - zoomPosition.x,
        y: e.clientY - zoomPosition.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && isZoomed) {
      setZoomPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    if (isZoomed) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -1 : 1;
      const nextStep = Math.max(0, Math.min(zoomStep + delta, zoomLevels.length - 1));
      setZoomStep(nextStep);
      setZoomLevel(zoomLevels[nextStep]);
    }
  };

  if (loading) {
    return (
      <div className="uniforme-detalle-container">
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="uniforme-detalle-container error">
        <p>{error}</p>
        <button className="btn" onClick={() => navigate('/uniformes')}>
          Volver al catálogo
        </button>
      </div>
    );
  }

  if (!uniforme) {
    return (
      <div className="uniforme-detalle-container error">
        <p>Uniforme no encontrado</p>
        <button className="btn" onClick={() => navigate('/uniformes')}>
          Volver al catálogo
        </button>
      </div>
    );
  }

  const fotos = (uniforme.fotos && uniforme.fotos.length > 0)
    ? uniforme.fotos
    : (uniforme.foto_path ? [{ foto_path: uniforme.foto_path }] : []);

  return (
    <div className="uniforme-detalle-container">
      <header className="section-header">
        <span className="section-tag">Uniformes</span>
        <h1 className="section-title">Detalles del Uniforme</h1>
      </header>

      <div className="uniforme-detail-content">
        <div className="gallery">
          {fotos.length > 1 && (
            <div className="thumbnails">
              {fotos.map((foto, index) => (
                <img
                  key={foto.id || index}
                  src={`${apiUrl}/storage/${foto.foto_path}`}
                  alt={`Thumbnail ${index}`}
                  className={`thumbnail ${index === selectedIndex ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedIndex(index);
                    closeZoom();
                  }}
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
                  Zoom: {zoomStep + 1}/4 - Click para más zoom
                </div>
              </>
            )}
          </div>
        </div>
        <div className="uniforme-info">
          <h2 className="product-name">{uniforme.nombre}</h2>
          <p className="product-description">{uniforme.descripcion}</p>
          <p className="product-category">Categoría: {uniforme.categoria}</p>
          <p className="product-type">Tipo: {uniforme.tipo}</p>
          <button className="btn" onClick={() => navigate('/uniformes')}>
            Volver al catálogo
          </button>
        </div>
      </div>
    </div>
  );
};

export default UniformeDetalle;