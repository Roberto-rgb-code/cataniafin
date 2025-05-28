import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaIndustry, FaTshirt, FaTools } from 'react-icons/fa';
import './Inicio.css';
import UniformesIndustriales from '/assets/Uniformes-industriales.jpg';
import ArticulosPromocionales from '/assets/Articulos-Promocionales.jpg';
import PlayerasPolo from '/assets/ventajas-de-usar-playeras-polo-bordadas-para-uniformes.jpg';
import Chaqueta from '/assets/chaqueta.png';
import Camisa from '/assets/camisa.png';
import Uniforme from '/assets/uniforme.png';
import Umu from '/assets/umu.jpeg';
import Diferencia from '/assets/diferencia-entre-gerente-y-director.jpg';
import CocaColaLogo from '/assets/Coca-Cola-logo (1).png';
import SolfranLogo from '/assets/solfran_color.png';
import Logo from '/assets/Logo catania blanco.png';

const Inicio = () => {
  const [cartItems, setCartItems] = useState(0);

  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Hero Section */}
      <motion.section
        id="inicio"
        className="bg-blue-500 text-white py-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Uniformes y Artículos Promocionales para Todos</h1>
            <p className="text-lg mb-6">Descubre la calidad y variedad que ofrecemos para vestir tu empresa o institución con estilo y profesionalismo.</p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">Contáctanos</button>
              <button className="border border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-blue-500 transition">Cotiza Ahora</button>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img src="/assets/Uniformes-industriales.jpg" alt="Uniformes" className="rounded-lg shadow-lg w-full" />
          </div>
        </div>
      </motion.section>

      {/* Productos */}
      <motion.section
        id="productos"
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <span className="block text-center text-orange-500 font-semibold mb-2">Productos</span>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Descubre Nuestras Amplias Categorías de Productos</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">En Catania, ofrecemos una variedad de productos diseñados para satisfacer las necesidades de tu empresa. Desde uniformes hasta artículos promocionales, cada categoría está pensada para brindarte calidad y distinción.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <article className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-2">
              <Link to="/uniformes">
                <img src={UniformesIndustriales} alt="Uniformes" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">Uniformes</h3>
                  <p className="text-gray-600 mt-2">Explora nuestra gama de uniformes industriales, médicos y escolares.</p>
                  <div className="mt-4 flex space-x-2">
                    <button onClick={addToCart} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Cotizar</button>
                    <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50 transition">Ver Detalles</button>
                  </div>
                </div>
              </Link>
            </article>
            <article className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-2">
              <Link to="/promocionales">
                <img src={ArticulosPromocionales} alt="Promocionales" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">Promocionales</h3>
                  <p className="text-gray-600 mt-2">Personaliza gorras, playeras y más para tu marca.</p>
                  <div className="mt-4 flex space-x-2">
                    <button onClick={addToCart} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Cotizar</button>
                    <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50 transition">Ver Detalles</button>
                  </div>
                </div>
              </Link>
            </article>
            <article className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-2">
              <Link to="/especiales">
                <img src={PlayerasPolo} alt="Especiales" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">Especiales</h3>
                  <p className="text-gray-600 mt-2">Desarrollamos diseños exclusivos que se adaptan a tus necesidades.</p>
                  <div className="mt-4 flex space-x-2">
                    <button onClick={addToCart} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Cotizar</button>
                    <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50 transition">Ver Detalles</button>
                  </div>
                </div>
              </Link>
            </article>
          </div>
          <div className="mt-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition">Ver más</button>
            <a href="#" className="flex items-center text-orange-500 hover:text-orange-600 transition">
              <span>Cotizar</span>
              <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/ed280c87b2ec3f60ba5a8a4415e94110f00bb81de0a2a1bd58708615b7c7a97f?placeholderIfAbsent=true" alt="Arrow" className="w-6 h-6 ml-2" />
            </a>
          </div>
        </div>
      </motion.section>

      {/* Servicios */}
      <motion.section
        id="servicios"
        className="py-16 bg-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <span className="block text-center text-orange-500 font-semibold mb-2">Servicios</span>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Descubre Nuestros Servicios de Personalización</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">En Catania, ofrecemos una variedad de servicios de personalización para satisfacer todas tus necesidades. Desde grabado láser hasta sublimado, cada opción está diseñada para brindar calidad y durabilidad.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-2">
              <img src={Chaqueta} alt="Variedad de Servicios" className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Variedad de Servicios Disponibles</h3>
              <p className="text-gray-600 mt-2">Cada servicio está pensado para ofrecerte lo mejor.</p>
            </article>
            <article className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-2">
              <img src={Camisa} alt="Calidad y Personalización" className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Calidad y Personalización en Cada Proyecto</h3>
              <p className="text-gray-600 mt-2">Transformamos tus ideas en productos únicos.</p>
            </article>
            <article className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-2">
              <img src={Uniforme} alt="Contáctanos" className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Contáctanos para Más Información</h3>
              <p className="text-gray-600 mt-2">Estamos aquí para ayudarte a crear.</p>
            </article>
          </div>
          <div className="mt-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition">Ver Más</button>
            <a href="#" className="flex items-center text-orange-500 hover:text-orange-600 transition">
              <span>Servicios</span>
              <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/ed280c87b2ec3f60ba5a8a4415e94110f00bb81de0a2a1bd58708615b7c7a97f?placeholderIfAbsent=true" alt="Arrow" className="w-6 h-6 ml-2" />
            </a>
          </div>
        </div>
      </motion.section>

      {/* Calidad */}
      <motion.section
        id="calidad"
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <span className="block text-center text-orange-500 font-semibold mb-2">Calidad</span>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Descubre Nuestros Productos Destacados</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">En Catania, ofrecemos una variedad de productos diseñados para satisfacer las necesidades de tu empresa. Desde uniformes hasta artículos promocionales, tenemos todo lo que necesitas.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-2">
              <FaIndustry className="text-blue-500 text-4xl mx-auto mb-4" />
              <Link to="/uniformes-destacados">
                <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition">Uniformes para Cada Ocasión</h3>
              </Link>
              <p className="text-gray-600 mt-2">Nuestros uniformes son ideales para cualquier industria.</p>
            </article>
            <article className="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-2">
              <FaTshirt className="text-blue-500 text-4xl mx-auto mb-4" />
              <Link to="/promocionales-destacados">
                <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition">Artículos Promocionales que Impactan</h3>
              </Link>
              <p className="text-gray-600 mt-2">Aumenta la visibilidad de tu marca con nuestros productos.</p>
            </article>
            <article className="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-2">
              <FaTools className="text-blue-500 text-4xl mx-auto mb-4" />
              <Link to="/especiales-destacados">
                <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition">Soluciones Especiales a Medida</h3>
              </Link>
              <p className="text-gray-600 mt-2">Creamos productos personalizados que se adaptan a tus necesidades.</p>
            </article>
          </div>
          <div className="mt-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition">Ver Más</button>
            <a href="#" className="flex items-center text-orange-500 hover:text-orange-600 transition">
              <span>Cotizar</span>
              <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/ed280c87b2ec3f60ba5a8a4415e94110f00bb81de0a2a1bd58708615b7c7a97f?placeholderIfAbsent=true" alt="Arrow" className="w-6 h-6 ml-2" />
            </a>
          </div>
        </div>
      </motion.section>

      {/* Testimonios */}
      <motion.section
        id="testimonios"
        className="py-16 bg-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Testimonios de Clientes</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">Lo que dicen nuestros clientes satisfechos.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-2">
              <div className="flex items-center mb-4">
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/eb836d67db2cb88a07d3bfb6c04e827b8107519d060019054b00f64f4bfcdb6e?placeholderIfAbsent=true" alt="Star" className="w-5 h-5" />
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/37883a6fba3ace056b1a03ea77e2a9815b18e62b74b42ad46c1ee92c378d083d?placeholderIfAbsent=true" alt="Star" className="w-5 h-5" />
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/a6cb77722ab4547c5ba00b55bd7795508a18c0bfd566c8e55990d135b041c652?placeholderIfAbsent=true" alt="Star" className="w-5 h-5" />
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/a6cb77722ab4547c5ba00b55bd7795508a18c0bfd566c8e55990d135b041c652?placeholderIfAbsent=true" alt="Star" className="w-5 h-5" />
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/134bb5145f2b4bf6a830b722256841b032a1956d21e22ce91868d93ccf0032da?placeholderIfAbsent=true" alt="Star" className="w-5 h-5" />
              </div>
              <blockquote className="text-gray-800 italic mb-4">"La calidad de los uniformes es excepcional y el servicio, impecable."</blockquote>
              <div className="flex items-center">
                <img src={Umu} alt="María López" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold">María López</p>
                  <p className="text-gray-600">Gerente, Coca Cola</p>
                </div>
                <div className="mx-4 h-12 border-l border-gray-300"></div>
                <img src={CocaColaLogo} alt="Company Logo" className="w-24 h-auto" />
              </div>
            </article>
            <article className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-2">
              <div className="flex items-center mb-4">
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/eb836d67db2cb88a07d3bfb6c04e827b8107519d060019054b00f64f4bfcdb6e?placeholderIfAbsent=true" alt="Star" className="w-5 h-5" />
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/39b0f99ac07fda11985b9ee37235670a3216a51cd0a1f635d5d9ba465d756a37?placeholderIfAbsent=true" alt="Star" className="w-5 h-5" />
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/bf2d2cc3be0b30591a2d58770d523f82e4d8564c6ff72aef4906e243f6fbad06?placeholderIfAbsent=true" alt="Star" className="w-5 h-5" />
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/191c58afd08f2bf3ec8d1128458678242edcf02a4215ded5f389072f7623a540?placeholderIfAbsent=true" alt="Star" className="w-5 h-5" />
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/0e534d2a40d12da36396af7667deba63c164bf8caa602f9902cd8c30ac6ca5ff?placeholderIfAbsent=true" alt="Star" className="w-5 h-5" />
              </div>
              <blockquote className="text-gray-800 italic mb-4">"Catania siempre cumple con nuestras expectativas y plazos."</blockquote>
              <div className="flex items-center">
                <img src={Diferencia} alt="Juan Pérez" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold">Juan Pérez</p>
                  <p className="text-gray-600">Trabajador, Solfran</p>
                </div>
                <div className="mx-4 h-12 border-l border-gray-300"></div>
                <img src={SolfranLogo} alt="Company Logo" className="w-24 h-auto" />
              </div>
            </article>
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        id="contacto"
        className="py-16 bg-blue-600 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Descarga nuestro catálogo hoy</h2>
          <p className="text-lg mb-6 max-w-3xl mx-auto">Solicita información sobre nuestros productos y servicios personalizados para tu empresa o institución.</p>
          <div className="max-w-md mx-auto flex flex-col space-y-4">
            <input type="email" placeholder="Tu correo electrónico" className="w-full p-3 rounded-lg text-gray-800" />
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">Descargar</button>
              <button className="border border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-blue-500 transition">Consultar</button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex-shrink-0">
              <img src={Logo} alt="Company Logo" className="h-8" />
            </div>
            <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-center text-sm">
              <a href="#" className="hover:text-orange-300 transition">Inicio Rápido</a>
              <a href="#" className="hover:text-orange-300 transition">Nuestros Servicios</a>
              <a href="#" className="hover:text-orange-300 transition">Contáctanos</a>
              <a href="#" className="hover:text-orange-300 transition">Sobre Nosotros</a>
              <a href="#" className="hover:text-orange-300 transition">Política de Cookies</a>
            </nav>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-orange-300 transition">
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/7ae4f0171ecca53d8c3a0688d908f90af9103568ffb475a890b5004b12fbb0f6?placeholderIfAbsent=true" alt="Social Media" className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-orange-300 transition">
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/a189fa197e66326a023943ed5648a93d7b8d7a7e66ae92cbde842e1eb69df910?placeholderIfAbsent=true" alt="Social Media" className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-orange-300 transition">
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/ea2655b2a6406e9c5ef418d4752d0ca75d18f674fbf5c5a0ad097e8d5c483752?placeholderIfAbsent=true" alt="Social Media" className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-orange-300 transition">
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/b7ddadb29dfd732a506b3d7e97a39490da61c4634197af1815a44a6d1bd263ee?placeholderIfAbsent=true" alt="Social Media" className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-orange-300 transition">
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/a019f9560bf3692196da88680e3a168af36177883dce666c75305bc72e50c60a?placeholderIfAbsent=true" alt="Social Media" className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="mt-4 border-t border-blue-400 pt-2 flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 text-xs">
            <span>© 2025 Catania. Todos los derechos reservados.</span>
            <a href="#" className="hover:text-orange-300 transition">Política de Privacidad</a>
            <a href="#" className="hover:text-orange-300 transition">Términos de Servicio</a>
            <a href="#" className="hover:text-orange-300 transition">Configuración de Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;