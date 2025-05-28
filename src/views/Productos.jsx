import React from 'react';
import { Link } from 'react-router-dom';
import UniformesIndustriales from '/assets/Uniformes-industriales.jpg';
import ArticulosPromocionales from '/assets/Articulos-Promocionales.jpg';
import PlayerasPolo from '/assets/ventajas-de-usar-playeras-polo-bordadas-para-uniformes.jpg';

const Productos = () => {
  return (
    <>
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-white py-20">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center px-4">
          <div className="mb-8 flex flex-col items-center">
            <span className="text-xs tracking-widest uppercase bg-orange-100 text-orange-500 px-3 py-1 rounded-full mb-3 font-semibold">
              Calidad
            </span>
            <h1 className="text-5xl font-extrabold text-gray-800 mb-4 text-center drop-shadow-lg">Nuestros Productos</h1>
            <p className="text-gray-700 text-lg max-w-2xl text-center">
              Descubre la calidad y personalización en cada una de nuestras categorías.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-600 transition font-semibold">Ver más</button>
            <button className="bg-white text-orange-500 border border-orange-500 px-6 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition font-semibold">
              Cotizar
            </button>
          </div>
        </div>
      </header>

      {/* Categorías principales */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs tracking-widest uppercase bg-blue-100 text-blue-500 px-3 py-1 rounded-full mb-2 font-semibold">
              Productos
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
              Descubre Nuestras Amplias Categorías de Productos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              En Catania, ofrecemos una variedad de productos diseñados para satisfacer las necesidades de tu empresa. Desde uniformes hasta artículos promocionales, cada categoría está pensada para brindarte calidad y distinción.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Uniformes */}
            <article className="bg-white shadow-md rounded-lg hover:shadow-lg transition p-0">
              <Link to="/uniformes" className="flex flex-col h-full">
                <img
                  src={UniformesIndustriales}
                  alt="Uniformes"
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-blue-700 mb-2">Uniformes</h3>
                  <p className="text-gray-600 flex-1">
                    Explora nuestra gama de uniformes industriales, médicos y escolares.
                  </p>
                </div>
              </Link>
            </article>
            {/* Promocionales */}
            <article className="bg-white shadow-md rounded-lg hover:shadow-lg transition p-0">
              <Link to="/promocionales" className="flex flex-col h-full">
                <img
                  src={ArticulosPromocionales}
                  alt="Promocionales"
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-blue-700 mb-2">Promocionales</h3>
                  <p className="text-gray-600 flex-1">
                    Personaliza gorras, playeras y más para tu marca.
                  </p>
                </div>
              </Link>
            </article>
            {/* Especiales */}
            <article className="bg-white shadow-md rounded-lg hover:shadow-lg transition p-0">
              <Link to="/especiales" className="flex flex-col h-full">
                <img
                  src={PlayerasPolo}
                  alt="Especiales"
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-blue-700 mb-2">Especiales</h3>
                  <p className="text-gray-600 flex-1">
                    Desarrollamos diseños exclusivos que se adaptan a tus necesidades.
                  </p>
                </div>
              </Link>
            </article>
          </div>

          {/* Acciones adicionales */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
            <button className="border-2 border-orange-500 text-orange-500 px-6 py-2 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition">
              Ver más
            </button>
            <a href="#" className="flex items-center text-blue-600 hover:text-blue-800 font-semibold transition group">
              <span>Cotizar</span>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/b1ea117d06c4300f9dad14de1f83b09a745c0f020edba579fec182e08d9e5ecc?placeholderIfAbsent=true"
                alt="Arrow"
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Detalle de categorías */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10">
            Explora nuestras categorías de productos y descubre lo que ofrecemos.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Uniformes Detalle */}
            <article className="bg-gray-50 rounded-xl p-8 shadow-md flex flex-col items-center text-center hover:shadow-lg transition">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/0b1be81b8075208d75a799eb8432b3e1dbdae162e87209a67b4a609cc9dfde89?placeholderIfAbsent=true"
                alt="Uniformes Icon"
                className="w-14 h-14 mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">
                Uniformes de alta calidad para cada necesidad y sector.
              </h3>
              <p className="text-gray-600 mb-6">
                Nuestros uniformes están diseñados para brindar comodidad y durabilidad en el trabajo.
              </p>
              <a href="#" className="flex items-center text-blue-600 hover:text-blue-900 font-semibold transition group">
                <span>Ver</span>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/af27fdbf9e3f354a1808ae547e2c98b9dee0cad1d6cbf769d9178551f8ba6a76?placeholderIfAbsent=true"
                  alt="Arrow"
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                />
              </a>
            </article>
            {/* Promocionales Detalle */}
            <article className="bg-gray-50 rounded-xl p-8 shadow-md flex flex-col items-center text-center hover:shadow-lg transition">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/361a9b83cc025dc630a90fbdc8044aca265bc17b3bb12b44b5549ba02b8acf07?placeholderIfAbsent=true"
                alt="Promocionales Icon"
                className="w-14 h-14 mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">
                Artículos promocionales que destacan tu marca con estilo y funcionalidad.
              </h3>
              <p className="text-gray-600 mb-6">
                Desde gorras hasta tazas, tenemos todo para hacer brillar tu marca.
              </p>
              <a href="#" className="flex items-center text-blue-600 hover:text-blue-900 font-semibold transition group">
                <span>Cotizar</span>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/2c648c99086dabcc02665d7136f3813fa8d9ab4a20d15904140067b9f5dc1586?placeholderIfAbsent=true"
                  alt="Arrow"
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                />
              </a>
            </article>
            {/* Especiales Detalle */}
            <article className="bg-gray-50 rounded-xl p-8 shadow-md flex flex-col items-center text-center hover:shadow-lg transition">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/e10f72ca93f731dbe0ceaa5e1ab751fed2051cd01fafa689030dba159c753793?placeholderIfAbsent=true"
                alt="Especiales Icon"
                className="w-14 h-14 mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">
                Proyectos especiales personalizados para satisfacer tus requerimientos específicos.
              </h3>
              <p className="text-gray-600 mb-6">
                Creamos diseños exclusivos que se adaptan a la visión de tu empresa.
              </p>
              <a href="#" className="flex items-center text-blue-600 hover:text-blue-900 font-semibold transition group">
                <span>Consultar</span>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/01649ca23eee3acaef818d0da002d016cd236d8c85562982f33d7b8bfb41ef3e?placeholderIfAbsent=true"
                  alt="Arrow"
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                />
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-14 text-white">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Explora Nuestros Productos Destacados</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Descubre la variedad de uniformes y artículos promocionales que tenemos para ti.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-orange-500 px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
              Ver más
            </button>
            <button className="border-2 border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              Cotizar
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:space-x-10 space-y-8 md:space-y-0">
          {/* Logo */}
          <div>
            <img
              src="/Logo catania blanco.png"
              alt="Company Logo"
              className="h-14"
            />
          </div>
          {/* Links */}
          <nav className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0 text-center">
            <a href="#" className="hover:text-orange-300 transition">Inicio Rápido</a>
            <a href="#" className="hover:text-orange-300 transition">Nuestros Servicios</a>
            <a href="#" className="hover:text-orange-300 transition">Contáctanos</a>
            <a href="#" className="hover:text-orange-300 transition">Sobre Nosotros</a>
            <a href="#" className="hover:text-orange-300 transition">Política de Cookies</a>
          </nav>
          {/* Social */}
          <div className="flex space-x-4">
            <a href="#" className="hover:text-orange-300 transition">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/31013d06cddb55c39df4cdeb33b6b48c6fbc05737dd27767b800efb73ded2caf?placeholderIfAbsent=true"
                alt="Social Media"
                className="w-6 h-6"
              />
            </a>
            <a href="#" className="hover:text-orange-300 transition">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/6b655208516b295f93fcc599db21496c8573bd1c8064220879cf53d9462f3bc8?placeholderIfAbsent=true"
                alt="Social Media"
                className="w-6 h-6"
              />
            </a>
            <a href="#" className="hover:text-orange-300 transition">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/b1332e40c061482067062bfab80c125f3ae26fa5c3731b55424bf3b58522d3e0?placeholderIfAbsent=true"
                alt="Social Media"
                className="w-6 h-6"
              />
            </a>
            <a href="#" className="hover:text-orange-300 transition">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/87ec53ece447b3ae9f6e9f06db93c5ac976c08b25cd66b0b4bed7aa0afb5c6f0?placeholderIfAbsent=true"
                alt="Social Media"
                className="w-6 h-6"
              />
            </a>
            <a href="#" className="hover:text-orange-300 transition">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/96a7a2ed4768ad9d7350d6b462c83b8d7e1e12d086b94663c8b9047d3db3718e?placeholderIfAbsent=true"
                alt="Social Media"
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-sm flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-4 space-y-4 md:space-y-0">
          <span className="text-gray-400">© 2024 Catania. Todos los derechos reservados.</span>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition">Política de Privacidad</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Términos de Servicio</a>
            <a href="#" className="text-gray-400 hover:text-white transition">Configuración de Cookies</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Productos;
