// landing-page/src/views/Especiales.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SidebarEspeciales from '../components/SidebarEspeciales';
import './Especiales.css';

const Especiales = () => {
  const [especiales, setEspeciales] = useState([]);
  const [filteredEspeciales, setFilteredEspeciales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 24;

  const apiUrl = import.meta.env.VITE_ESPECIALES_API_URL;

  useEffect(() => {
    fetchEspeciales();
  }, []);

  const fetchEspeciales = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/especiales`, {
        headers: { 'Accept': 'application/json' },
      });
      console.log('Respuesta completa en Especiales.jsx:', response.data);
      const data = Array.isArray(response.data) ? response.data : (Array.isArray(response.data?.data) ? response.data.data : []);

      const especialesPorCategoria = {
        Textil: [],
        Promocional: [],
        Otros: [],
      };

      data.forEach(especial => {
        if (especialesPorCategoria.hasOwnProperty(especial.categoria)) {
          especialesPorCategoria[especial.categoria].push(especial);
        } else {
          console.warn(`Categoría no reconocida: ${especial.categoria}`);
        }
      });

      const categoriasEspeciales = [
        { tipo: 'Textil', productos: Array.isArray(especialesPorCategoria.Textil) ? especialesPorCategoria.Textil : [] },
        { tipo: 'Promocional', productos: Array.isArray(especialesPorCategoria.Promocional) ? especialesPorCategoria.Promocional : [] },
        { tipo: 'Otros', productos: Array.isArray(especialesPorCategoria.Otros) ? especialesPorCategoria.Otros : [] },
      ].filter(tipo => Array.isArray(tipo.productos) && tipo.productos.length > 0);

      setEspeciales(categoriasEspeciales);
      setFilteredEspeciales(categoriasEspeciales);
    } catch (error) {
      setError('Error al obtener los especiales: ' + (error.response?.data?.message || error.message));
      console.error('Error al obtener los especiales:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    let filtered = [...especiales];
    if (searchTerm) {
      filtered = especiales.map(tipo => ({
        ...tipo,
        productos: Array.isArray(tipo.productos) ? tipo.productos.filter(p =>
          p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
        ) : []
      })).filter(tipo => Array.isArray(tipo.productos) && tipo.productos.length > 0);
    }
    setFilteredEspeciales(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (category) => {
    if (category) {
      const filtered = especiales.filter(tipo => tipo.tipo === category);
      setFilteredEspeciales(filtered);
    } else {
      setFilteredEspeciales(especiales);
    }
    setCurrentPage(1);
  };

  const getPaginatedProducts = () => {
    const allProducts = filteredEspeciales.flatMap(tipo => (Array.isArray(tipo.productos) ? tipo.productos : []));
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return allProducts.slice(startIndex, endIndex);
  };

  const totalProducts = filteredEspeciales.reduce((acc, tipo) => acc + (Array.isArray(tipo.productos) ? tipo.productos.length : 0), 0);
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando especiales...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-8 text-red-600">
          <p className="text-xl mb-2">{error}</p>
          <button onClick={() => fetchEspeciales()} className="mt-4 btn btn-primary">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="especiales-container">
      <header className="section-header">
        <span className="section-tag">Especiales</span>
        <h1 className="section-title">Nuestros Productos Especiales</h1>
        <p className="section-description">
          Descubre nuestros diseños exclusivos adaptados a tus necesidades.
        </p>
      </header>

      <div className="especiales-content">
        <SidebarEspeciales
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          categories={especiales.map(e => e.tipo)}
        />

        <div className="products-main">
          <div className="products-header">
            <div className="products-count">
              Mostrando {totalProducts} especiales
            </div>
          </div>

          <div className="especiales-grid">
            {getPaginatedProducts().map((especial) => {
              const imageSrc = especial.fotos && Array.isArray(especial.fotos) && especial.fotos.length > 0
                ? `${apiUrl}/storage/${especial.fotos[0].foto_path}`
                : especial.foto_path
                ? `${apiUrl}/storage/${especial.foto_path}`
                : 'https://via.placeholder.com/300x300?text=No+image';
              console.log('Intentando cargar imagen para', especial.nombre, 'en:', imageSrc); // Depuración
              return (
                <Link to={`/especial/${especial.id}`} key={especial.id} className="especial-card-link">
                  <article className="especial-card">
                    <img
                      src={imageSrc}
                      alt={especial.nombre}
                      className="especial-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=No+image';
                        console.error('Error al cargar imagen para', especial.nombre, 'URL:', imageSrc);
                      }}
                    />
                    <div className="especial-content">
                      <h3 className="especial-title">{especial.nombre}</h3>
                      <p className="especial-category">Categoría: {especial.categoria}</p>
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

export default Especiales;