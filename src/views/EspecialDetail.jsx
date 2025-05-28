// landing-page/src/views/EspecialDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EspecialDetail.css';

const EspecialDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [especial, setEspecial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Zoom states
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomStep, setZoomStep] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const zoomLevels = [1.5, 2.5, 3.5, 5];

  const apiUrl = import.meta.env.VITE_ESPECIALES_API_URL;

  useEffect(() => {
    const fetchEspecial = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${apiUrl}/api/especiales/${id}`, {
          headers: { Accept: 'application/json' },
        });
        setEspecial(res.data);
      } catch (err) {
        setError('Error al obtener el especial: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchEspecial();
  }, [id]);

  const handleImageClick = e => {
    e.stopPropagation();
    if (!isZoomed) {
      setIsZoomed(true);
      setZoomStep(0);
      setZoomLevel(zoomLevels[0]);
      setZoomPos({ x: 0, y: 0 });
    } else {
      const next = zoomStep + 1;
      if (next < zoomLevels.length) {
        setZoomStep(next);
        setZoomLevel(zoomLevels[next]);
        setZoomPos({ x: 0, y: 0 });
      } else {
        closeZoom();
      }
    }
  };

  const closeZoom = () => {
    setIsZoomed(false);
    setZoomStep(0);
    setZoomLevel(1);
    setZoomPos({ x: 0, y: 0 });
    setDragging(false);
  };

  const onMouseDown = e => {
    if (!isZoomed) return;
    setDragging(true);
    setDragStart({ x: e.clientX - zoomPos.x, y: e.clientY - zoomPos.y });
  };
  const onMouseMove = e => {
    if (!dragging) return;
    setZoomPos({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const onMouseUp = () => setDragging(false);
  const onWheel = e => {
    if (!isZoomed) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -1 : 1;
    const next = Math.max(0, Math.min(zoomStep + delta, zoomLevels.length - 1));
    setZoomStep(next);
    setZoomLevel(zoomLevels[next]);
  };

  if (loading) {
    return <div className="especial-detalle-container"><p>Cargando...</p></div>;
  }
  if (error) {
    return (
      <div className="especial-detalle-container error">
        <p>{error}</p>
        <button className="btn" onClick={() => navigate('/especiales')}>Volver al catálogo</button>
      </div>
    );
  }
  if (!especial) {
    return (
      <div className="especial-detalle-container error">
        <p>Especial no encontrado</p>
        <button className="btn" onClick={() => navigate('/especiales')}>Volver al catálogo</button>
      </div>
    );
  }

  const fotos = Array.isArray(especial.fotos) && especial.fotos.length > 0
    ? especial.fotos
    : especial.foto_path
      ? [{ foto_path: especial.foto_path }]
      : [];

  return (
    <div className="especial-detalle-container">
      <header className="section-header">
        <span className="section-tag">Especiales</span>
        <h1 className="section-title">Detalles del Producto Especial</h1>
      </header>
      <div className="especial-detail-content">
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
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onWheel={onWheel}
          >
            {fotos.length > 0 ? (
              <img
                src={`${apiUrl}/storage/${fotos[selectedIndex].foto_path}`}
                alt={especial.nombre}
                className="main-image"
                onClick={handleImageClick}
                style={isZoomed ? {
                  transform: `scale(${zoomLevel}) translate(${zoomPos.x}px, ${zoomPos.y}px)`,
                  cursor: dragging ? 'grabbing' : 'grab'
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
        <div className="especial-info">
          <h2 className="product-name">{especial.nombre}</h2>
          <p className="product-description">{especial.descripcion}</p>
          <p className="product-category">Categoría: {especial.categoria}</p>
          <button className="btn" onClick={() => navigate('/especiales')}>Volver al catálogo</button>
        </div>
      </div>
    </div>
  );
};

export default EspecialDetail;
