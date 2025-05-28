// landing-page/src/views/PromocionalesList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SidebarPromocionales from '../components/SidebarPromocionales';
import './PromocionalesList.css';

const PromocionalesList = () => {
  const [promocionales, setPromocionales] = useState([]);
  const [filteredPromocionales, setFilteredPromocionales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 24;

  const apiUrl = import.meta.env.VITE_PROMOCIONALES_API_URL;

  useEffect(() => {
    fetchPromocionales();
  }, []);

  const fetchPromocionales = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/promocionales-destacados`, {
        headers: { 'Accept': 'application/json' },
      });
      console.log('Respuesta completa en PromocionalesList.jsx:', response.data);
      const data = Array.isArray(response.data) ? response.data : (Array.isArray(response.data?.data) ? response.data.data : []);

      const promocionalesPorCategoria = {
        'Agendas Zegno': [],
        Antiestres: [],
        'Artículos de Viaje': [],
        Bar: [],
        Bebidas: [],
        Belleza: [],
        Bolsas: [],
        Complementos: [],
        Deportes: [],
        Entretenimiento: [],
        Escritura: [],
        Herramientas: [],
        'Hieleras Loncheras y Portaviandas': [],
        Hogar: [],
        'Libretas y Carpetas': [],
        Llaveros: [],
        Maletas: [],
        Mochilas: [],
        Niños: [],
        Oficina: [],
        'Paraguas e Impermeables': [],
        Portafolios: [],
        Salud: [],
        Tecnología: [],
        Textiles: [],
      };

      data.forEach(promo => {
        if (promocionalesPorCategoria.hasOwnProperty(promo.categoria)) {
          promocionalesPorCategoria[promo.categoria].push(promo);
        }
      });

      const categoriasPromocionales = Object.keys(promocionalesPorCategoria).map(tipo => ({
        tipo,
        productos: Array.isArray(promocionalesPorCategoria[tipo]) ? promocionalesPorCategoria[tipo] : [],
      })).filter(tipo => tipo.productos.length > 0);

      setPromocionales(categoriasPromocionales);
      setFilteredPromocionales(categoriasPromocionales);
    } catch (error) {
      setError('Error al obtener los promocionales destacados: ' + (error.response?.data?.message || error.message));
      console.error('Error al obtener los promocionales:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    let filtered = [...promocionales];
    if (searchTerm) {
      filtered = promocionales.map(tipo => ({
        ...tipo,
        productos: Array.isArray(tipo.productos) ? tipo.productos.filter(p =>
          p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
        ) : []
      })).filter(tipo => tipo.productos.length > 0);
    }
    setFilteredPromocionales(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (category) => {
    if (category) {
      const filtered = promocionales.filter(tipo => tipo.tipo === category);
      setFilteredPromocionales(filtered);
    } else {
      setFilteredPromocionales(promocionales);
    }
    setCurrentPage(1);
  };

  const getPaginatedProducts = () => {
    const allProducts = filteredPromocionales.flatMap(tipo => (Array.isArray(tipo.productos) ? tipo.productos : []));
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return allProducts.slice(startIndex, endIndex);
  };

  const totalProducts = filteredPromocionales.reduce((acc, tipo) => acc + (Array.isArray(tipo.productos) ? tipo.productos.length : 0), 0);
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando promocionales destacados...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-8 text-red-600">
          <p className="text-xl mb-2">{error}</p>
          <button onClick={() => fetchPromocionales()} className="mt-4 btn btn-primary">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="promocionales-container">
      <header className="section-header">
        <span className="section-tag">Promocionales</span>
        <h1 className="section-title">Nuestros Artículos Promocionales Destacados</h1>
        <p className="section-description">
          Descubre una amplia gama de productos promocionales destacados para tu marca.
        </p>
      </header>

      <div className="promocionales-content">
        <SidebarPromocionales
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          categories={promocionales.map(p => p.tipo)}
        />

        <div className="products-main">
          <div className="products-header">
            <div className="products-count">
              Mostrando {totalProducts} promocionales destacados
            </div>
          </div>

          <div className="promocionales-grid">
            {getPaginatedProducts().map((promo) => {
              const imageSrc = promo.fotos && Array.isArray(promo.fotos) && promo.fotos.length > 0
                ? `${apiUrl}/storage/${promo.fotos[0].foto_path}`
                : promo.foto_path
                ? `${apiUrl}/storage/${promo.foto_path}`
                : 'https://via.placeholder.com/300x300?text=No+image';
              return (
                <Link to={`/promocionales-destacados/${promo.id}`} key={promo.id} className="promocional-card-link">
                  <article className="promocional-card">
                    <img
                      src={imageSrc}
                      alt={promo.nombre}
                      className="promocional-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=No+image';
                        console.error('Error al cargar imagen:', imageSrc);
                      }}
                    />
                    <div className="promocional-content">
                      <h3 className="promocional-title">{promo.nombre}</h3>
                      <p className="promocional-category">Categoría: {promo.categoria}</p>
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

export default PromocionalesList;