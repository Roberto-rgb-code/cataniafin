import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UniformeDetalle.css';

const HOVER_ZOOM_SCALE = 2.4;      // zoom al pasar el mouse en la imagen principal
const LB_MIN_ZOOM = 1;
const LB_MAX_ZOOM = 5;
const LB_ZOOM_STEP = 0.5;

const UniformeDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [uniforme, setUniforme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Hover zoom (main image)
  const [hoverZoom, setHoverZoom] = useState(false);
  const [hoverOrigin, setHoverOrigin] = useState('50% 50%');

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);
  const [lbZoom, setLbZoom] = useState(1);
  const [lbDragging, setLbDragging] = useState(false);
  const [lbPos, setLbPos] = useState({ x: 0, y: 0 });
  const [lbDragStart, setLbDragStart] = useState({ x: 0, y: 0 });

  const mainImgRef = useRef(null);
  const thumbRefs = useRef(new Map());
  const lbImgRef = useRef(null);

  useEffect(() => {
    fetchUniforme();
    return () => {
      setHoverZoom(false);
      setHoverOrigin('50% 50%');
      setLightboxOpen(false);
      setLbZoom(1);
      setLbPos({ x: 0, y: 0 });
      setSelectedIndex(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if ((e.key === '+' || e.key === '=') && lbZoom < LB_MAX_ZOOM) setLbZoom(z => Math.min(LB_MAX_ZOOM, z + LB_ZOOM_STEP));
      if ((e.key === '-' || e.key === '_') && lbZoom > LB_MIN_ZOOM) setLbZoom(z => Math.max(LB_MIN_ZOOM, z - LB_ZOOM_STEP));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, lbZoom]);

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

    if (mainImgRef.current) observer.observe(mainImgRef.current);
    thumbRefs.current.forEach((img) => {
      if (img) observer.observe(img);
    });
    if (lbImgRef.current) observer.observe(lbImgRef.current);

    return () => {
      if (mainImgRef.current) observer.unobserve(mainImgRef.current);
      thumbRefs.current.forEach((img) => {
        if (img) observer.unobserve(img);
      });
      if (lbImgRef.current) observer.unobserve(lbImgRef.current);
    };
  }, [uniforme, selectedIndex, lbIndex, lightboxOpen]);

  // Preload main image and first thumbnail
  useEffect(() => {
    if (!uniforme || !uniforme.fotos || uniforme.fotos.length === 0) return;
    const preloadImages = () => {
      const mainImage = uniforme.fotos[0];
      if (mainImage) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = `${mainImage}?w=800&q=80`;
        document.head.appendChild(link);
      }
    };
    preloadImages();
  }, [uniforme]);

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

      const u = {
        id: found.id,
        nombre: found.nombre || '',
        descripcion: found.descripcion || '',
        material: found.material || '',
        uso: Array.isArray(found.uso) ? found.uso : (found.uso ? String(found.uso).split(',').map(s=>s.trim()) : []),
        tallas: Array.isArray(found.tallas) ? found.tallas : (found.tallas ? String(found.tallas).split(',').map(s=>s.trim()) : []),
        color: Array.isArray(found.color) ? found.color : (found.color ? String(found.color).split(',').map(s=>s.trim()) : []),
        categoria: found.categoria || 'General',
        tipo: found.tipo || 'General',
        fotos: Array.isArray(found.fotos) ? found.fotos : [],
        notas_color: found.notas_color || null,
      };

      setUniforme(u);
      setSelectedIndex(0);
    } catch (err) {
      console.error('Error al leer /product.json:', err);
      setError('No se pudo cargar el producto. Revisa /public/product.json o la ruta.');
    } finally {
      setLoading(false);
    }
  };

  // Hover zoom handlers
  const onMainEnter = () => setHoverZoom(true);
  const onMainLeave = () => { setHoverZoom(false); setHoverOrigin('50% 50%'); };
  const onMainMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHoverOrigin(`${x}% ${y}%`);
  };

  // Lightbox controls
  const openLightbox = (startIndex) => {
    setLbIndex(startIndex ?? selectedIndex);
    setLbZoom(1);
    setLbPos({ x: 0, y: 0 });
    setLightboxOpen(true);
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    setLbZoom(1);
    setLbPos({ x: 0, y: 0 });
    setLbDragging(false);
  };
  const nextImage = () => setLbIndex(i => Math.min((uniforme?.fotos?.length || 1) - 1, i + 1));
  const prevImage = () => setLbIndex(i => Math.max(0, i - 1));

  const onLbWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -LB_ZOOM_STEP : LB_ZOOM_STEP;
    setLbZoom(z => Math.max(LB_MIN_ZOOM, Math.min(LB_MAX_ZOOM, z + delta)));
  };
  const onLbMouseDown = (e) => {
    setLbDragging(true);
    setLbDragStart({ x: e.clientX - lbPos.x, y: e.clientY - lbPos.y });
  };
  const onLbMouseMove = (e) => {
    if (!lbDragging) return;
    setLbPos({ x: e.clientX - lbDragStart.x, y: e.clientY - lbDragStart.y });
  };
  const onLbMouseUp = () => setLbDragging(false);

  if (loading) {
    return (
      <div className="uniforme-detalle-container">
        <div className="skeleton-header" />
        <div className="skeleton-body">
          <div className="skeleton-image" />
          <div className="skeleton-info">
            <div className="skeleton-line w-80" />
            <div className="skeleton-line w-60" />
            <div className="skeleton-line w-72" />
            <div className="skeleton-line w-56" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="uniforme-detalle-container error">
        <p>{error}</p>
        <button className="btn" onClick={() => navigate('/uniformes')}>Volver al catálogo</button>
      </div>
    );
  }

  if (!uniforme) {
    return (
      <div className="uniforme-detalle-container error">
        <p>Uniforme no encontrado</p>
        <button className="btn" onClick={() => navigate('/uniformes')}>Volver al catálogo</button>
      </div>
    );
  }

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
        {/* GALERÍA */}
        <section className="gallery">
          {fotos.length > 1 && (
            <div className="thumbnails" role="tablist" aria-label="Miniaturas">
              {fotos.map((url, index) => {
                const thumbSrc = url ? `${url}?w=84&q=20&blur=10` : 'https://via.placeholder.com/84x84?text=No+image';
                const fullSrc = url ? `${url}?w=84&q=80` : 'https://via.placeholder.com/84x84?text=No+image';
                return (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Ver imagen ${index + 1}`}
                    className={`thumb-btn ${index === selectedIndex ? 'active' : ''}`}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <img
                      src={thumbSrc}
                      data-src={fullSrc}
                      alt={`Thumbnail ${index + 1}`}
                      ref={(el) => {
                        if (el) thumbRefs.current.set(index, el);
                      }}
                      onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
                    />
                  </button>
                );
              })}
            </div>
          )}

          <div
            className={`main-image-wrapper ${hoverZoom ? 'hovering' : ''}`}
            onMouseEnter={onMainEnter}
            onMouseLeave={onMainLeave}
            onMouseMove={onMainMove}
            onClick={() => openLightbox(selectedIndex)}
            title="Click para ampliar"
          >
            {mainImg ? (
              <img
                ref={mainImgRef}
                src={`${mainImg}?w=800&q=20&blur=10`}
                data-src={`${mainImg}?w=800&q=80`}
                alt={uniforme.nombre}
                className="main-image"
                loading="lazy"
                style={hoverZoom ? { transform: `scale(${HOVER_ZOOM_SCALE})`, transformOrigin: hoverOrigin } : undefined}
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/800x800?text=No+image'; }}
              />
            ) : (
              <div className="main-image placeholder">No hay foto</div>
            )}
            <div className="hint-zoom">Pasa el mouse para acercar · Click para ver a pantalla completa</div>
          </div>
        </section>

        {/* INFO */}
        <section className="uniforme-info">
          <h2 className="product-name">{uniforme.nombre}</h2>
          {uniforme.descripcion && <p className="product-description">{uniforme.descripcion}</p>}

          <div className="product-attrs">
            <p className="product-category"><strong>Categoría:</strong> {uniforme.categoria}</p>
            <p className="product-type"><strong>Tipo:</strong> {uniforme.tipo}</p>
            {!!uniforme.material && <p><strong>Material:</strong> {uniforme.material}</p>}
            {!!(uniforme.uso && uniforme.uso.length) && <p><strong>Uso:</strong> {uniforme.uso.join(', ')}</p>}
            {!!(uniforme.tallas && uniforme.tallas.length) && <p><strong>Tallas:</strong> {uniforme.tallas.join(', ')}</p>}
            {!!(uniforme.color && uniforme.color.length) && <p><strong>Color:</strong> {uniforme.color.join(', ')}</p>}
            {!!uniforme.notas_color && <p className="notes"><em>{uniforme.notas_color}</em></p>}
          </div>

          <div className="cta-row">
            <button className="btn ghost" onClick={() => navigate('/uniformes')}>
              ← Volver al catálogo
            </button>
            <a
              className="btn primary"
              href={`https://wa.me/5210000000000?text=${encodeURIComponent(`Hola, quiero cotizar el modelo ${uniforme.nombre} (${uniforme.categoria} · ${uniforme.tipo}).`)}`}
              target="_blank" rel="noreferrer"
            >
              Cotizar por WhatsApp
            </a>
          </div>
        </section>
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Visor de imágenes">
          <button className="lb-close" onClick={closeLightbox} aria-label="Cerrar">×</button>

          <button className="lb-nav prev" onClick={prevImage} aria-label="Anterior">‹</button>
          <button className="lb-nav next" onClick={nextImage} aria-label="Siguiente">›</button>

          <div
            className="lb-stage"
            onWheel={onLbWheel}
            onMouseDown={onLbMouseDown}
            onMouseMove={onLbMouseMove}
            onMouseUp={onLbMouseUp}
            onMouseLeave={onLbMouseUp}
          >
            <img
              ref={lbImgRef}
              src={`${fotos[lbIndex]}?w=1200&q=20&blur=10`}
              data-src={`${fotos[lbIndex]}?w=1200&q=80`}
              alt={`${uniforme.nombre} ${lbIndex + 1}`}
              style={{ transform: `translate(${lbPos.x}px, ${lbPos.y}px) scale(${lbZoom})`, cursor: lbDragging ? 'grabbing' : (lbZoom > 1 ? 'grab' : 'auto') }}
              draggable={false}
              loading="lazy"
              onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/1200x1200?text=No+image'; }}
            />
          </div>

          <div className="lb-controls">
            <button onClick={() => setLbZoom(z => Math.max(LB_MIN_ZOOM, z - LB_ZOOM_STEP))} aria-label="Alejar">−</button>
            <span className="lb-zoom-indicator">{Math.round(lbZoom * 100)}%</span>
            <button onClick={() => setLbZoom(z => Math.min(LB_MAX_ZOOM, z + LB_ZOOM_STEP))} aria-label="Acercar">+</button>
            <button onClick={() => { setLbZoom(1); setLbPos({x:0,y:0}); }} aria-label="Restablecer">Reset</button>
          </div>

          {fotos.length > 1 && (
            <div className="lb-strip">
              {fotos.map((u, i) => {
                const thumbSrc = u ? `${u}?w=64&q=20&blur=10` : 'https://via.placeholder.com/64x64?text=No+image';
                const fullSrc = u ? `${u}?w=64&q=80` : 'https://via.placeholder.com/64x64?text=No+image';
                return (
                  <button key={i} className={`lb-thumb ${i===lbIndex?'active':''}`} onClick={() => setLbIndex(i)}>
                    <img
                      src={thumbSrc}
                      data-src={fullSrc}
                      alt={`mini ${i+1}`}
                      ref={(el) => {
                        if (el) thumbRefs.current.set(`lb-${i}`, el);
                      }}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UniformeDetalle;