import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaIndustry, FaTshirt, FaTools, FaWhatsapp, FaPhone, FaEnvelope, FaQuoteLeft, FaStar, FaArrowRight, FaCheckCircle, FaShoppingCart } from 'react-icons/fa';

// Imágenes de uniformes y artículos promocionales
const UniformesIndustriales = "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop"; // Uniformes médicos
const ArticulosPromocionales = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop";
const PlayerasPolo = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop";
const Chaqueta = "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=80&h=80&fit=crop";
const Camisa = "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=80&h=80&fit=crop";
const Uniforme = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop";
const Umu = "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop";
const Diferencia = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop";
const CocaColaLogo = "https://via.placeholder.com/100x40/FF0000/FFFFFF?text=COCA-COLA";
const SolfranLogo = "https://via.placeholder.com/100x40/0066CC/FFFFFF?text=SOLFRAN";
const Logo = "https://via.placeholder.com/120x40/FFFFFF/0066CC?text=CATANIA";

// Componente de animación de uniformes con CSS
const UniformAnimation = () => {
  const uniformElements = [
    { icon: '👔', delay: 0, size: 'text-4xl', color: 'text-blue-400' },
    { icon: '🥼', delay: 0.5, size: 'text-5xl', color: 'text-green-400' },
    { icon: '👕', delay: 1, size: 'text-3xl', color: 'text-purple-400' },
    { icon: '🦺', delay: 1.5, size: 'text-4xl', color: 'text-orange-400' },
    { icon: '👔', delay: 2, size: 'text-3xl', color: 'text-indigo-400' },
    { icon: '🥼', delay: 2.5, size: 'text-4xl', color: 'text-cyan-400' },
    { icon: '👕', delay: 3, size: 'text-5xl', color: 'text-pink-400' },
    { icon: '🦺', delay: 3.5, size: 'text-3xl', color: 'text-yellow-400' },
  ];

  return (
    <div className="relative w-full h-96 overflow-hidden bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-2xl backdrop-blur-sm border border-white/10">
      {/* Partículas de fondo */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Uniformes animados */}
      {uniformElements.map((uniform, index) => (
        <motion.div
          key={index}
          className={`absolute ${uniform.size} ${uniform.color}`}
          style={{
            left: `${10 + (index % 4) * 20}%`,
            top: `${20 + Math.floor(index / 4) * 30}%`,
          }}
          initial={{ 
            opacity: 0, 
            scale: 0,
            rotate: -180,
          }}
          animate={{ 
            opacity: [0, 1, 0.8, 1],
            scale: [0, 1.2, 0.9, 1],
            rotate: [0, 360],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: uniform.delay,
            ease: "easeInOut",
          }}
        >
          {uniform.icon}
        </motion.div>
      ))}

      {/* Efecto de brillo central */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Texto central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="text-6xl mb-2">✨</div>
          <div className="text-white font-semibold text-lg">Uniformes</div>
          <div className="text-blue-200 text-sm">Profesionales</div>
        </motion.div>
      </div>
    </div>
  );
};

const Inicio = () => {
  const [cartItems, setCartItems] = useState(0);
  const [email, setEmail] = useState('');
  
  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-sans overflow-x-hidden">
      {/* Hero Section Mejorado */}
      <motion.section
        id="inicio"
        className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-24 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-white bg-opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-500 bg-opacity-20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center bg-orange-500 bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            >
              <FaCheckCircle className="mr-2 text-orange-300" />
              <span className="text-sm font-medium text-orange-100">Más de 10 años de experiencia</span>
            </motion.div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Uniformes y Artículos 
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"> Promocionales</span>
              <br />para Todos
            </h1>
            
            <p className="text-xl mb-8 text-blue-100 leading-relaxed max-w-xl">
              Descubre la calidad y variedad que ofrecemos para vestir tu empresa o institución con estilo y profesionalismo único.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.button 
                className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp className="mr-2" />
                Contáctanos
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button 
                className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cotiza Ahora
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
            
            {/* Stats mini */}
            <div className="flex gap-8 text-sm">
              <div className="text-center">
                <div className="font-bold text-2xl text-orange-300">500+</div>
                <div className="text-blue-200">Clientes felices</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-orange-300">50+</div>
                <div className="text-blue-200">Productos</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-orange-300">24h</div>
                <div className="text-blue-200">Respuesta</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <UniformAnimation />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Productos Section Mejorada */}
      <motion.section
        id="productos"
        className="py-24 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <span className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Productos
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Descubre Nuestras Amplias 
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Categorías</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              En Catania, ofrecemos una variedad de productos diseñados para satisfacer las necesidades de tu empresa. Desde uniformes hasta artículos promocionales.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
          >
            {[
              {
                image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop",
                title: "Uniformes",
                description: "Explora nuestra gama de uniformes industriales, médicos y escolares de alta calidad.",
                link: "/uniformes",
                gradient: "from-blue-500 to-blue-600"
              },
              {
                image: ArticulosPromocionales,
                title: "Promocionales",
                description: "Personaliza gorras, playeras y más para fortalecer tu marca empresarial.",
                link: "/promocionales",
                gradient: "from-green-500 to-green-600"
              },
              {
                image: PlayerasPolo,
                title: "Especiales",
                description: "Desarrollamos diseños exclusivos que se adaptan perfectamente a tus necesidades.",
                link: "/especiales",
                gradient: "from-purple-500 to-purple-600"
              }
            ].map((product, index) => (
              <motion.article
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                variants={fadeInUp}
                whileHover={{ y: -8 }}
              >
                <Link to={product.link}>
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${product.gradient} opacity-0 group-hover:opacity-80 transition-opacity duration-300`}></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="flex gap-3">
                      <motion.button 
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart();
                        }}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Cotizar
                      </motion.button>
                      <motion.button 
                        className="flex-1 border-2 border-blue-500 text-blue-500 px-4 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Ver Detalles
                      </motion.button>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>

          <motion.div 
            className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-4"
            variants={fadeInUp}
          >
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-xl font-semibold transition-all duration-300">
              Ver más productos
            </button>
            <a href="#" className="group flex items-center text-orange-500 hover:text-orange-600 font-semibold transition-colors">
              <span>Cotizar ahora</span>
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Servicios Section Mejorada */}
      <motion.section
        id="servicios"
        className="py-24 bg-gradient-to-br from-gray-50 to-gray-100"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <span className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Servicios
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Servicios de 
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Personalización</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ofrecemos una variedad de servicios de personalización para satisfacer todas tus necesidades con la más alta calidad.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
          >
            {[
              {
                image: Chaqueta,
                title: "Variedad de Servicios Disponibles",
                description: "Cada servicio está pensado para ofrecerte lo mejor en personalización y calidad.",
                icon: "🎨"
              },
              {
                image: Camisa,
                title: "Calidad y Personalización en Cada Proyecto",
                description: "Transformamos tus ideas en productos únicos que reflejan tu marca perfectamente.",
                icon: "⭐"
              },
              {
                image: Uniforme,
                title: "Contáctanos para Más Información",
                description: "Estamos aquí para ayudarte a crear productos excepcionales para tu empresa.",
                icon: "📞"
              }
            ].map((service, index) => (
              <motion.article
                key={index}
                className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                variants={fadeInUp}
                whileHover={{ y: -8 }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.article>
            ))}
          </motion.div>

          <motion.div 
            className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-4"
            variants={fadeInUp}
          >
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
              Ver Más Servicios
            </button>
            <a href="#" className="group flex items-center text-orange-500 hover:text-orange-600 font-semibold transition-colors">
              <span>Servicios completos</span>
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Calidad Section */}
      <motion.section
        id="calidad"
        className="py-24 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <span className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Calidad
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Productos 
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Destacados</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ofrecemos productos diseñados para satisfacer las necesidades más exigentes de tu empresa con calidad excepcional.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
          >
            {[
              {
                icon: FaIndustry,
                title: "Uniformes para Cada Ocasión",
                description: "Nuestros uniformes son ideales para cualquier industria y situación laboral.",
                link: "/uniformes-destacados",
                color: "blue"
              },
              {
                icon: FaTshirt,
                title: "Artículos Promocionales que Impactan",
                description: "Aumenta la visibilidad de tu marca con nuestros productos promocionales únicos.",
                link: "/promocionales-destacados",
                color: "green"
              },
              {
                icon: FaTools,
                title: "Soluciones Especiales a Medida",
                description: "Creamos productos personalizados que se adaptan perfectamente a tus necesidades.",
                link: "/especiales-destacados",
                color: "purple"
              }
            ].map((item, index) => (
              <motion.article
                key={index}
                className="group text-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200"
                variants={fadeInUp}
                whileHover={{ y: -8 }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <item.icon className="text-2xl" />
                </div>
                
                <Link to={item.link}>
                  <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors mb-4">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </motion.div>

          <motion.div 
            className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-4"
            variants={fadeInUp}
          >
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-xl font-semibold transition-all duration-300">
              Ver Más Productos
            </button>
            <a href="#" className="group flex items-center text-orange-500 hover:text-orange-600 font-semibold transition-colors">
              <span>Cotizar productos</span>
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonios Mejorados */}
      <motion.section
        id="testimonios"
        className="py-24 bg-gradient-to-br from-gray-50 to-gray-100"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <span className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Testimonios
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Lo que Dicen Nuestros 
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Clientes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              La satisfacción de nuestros clientes es nuestro mayor logro y motivación diaria.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={staggerChildren}
          >
            {[
              {
                quote: "La calidad de los uniformes es excepcional y el servicio al cliente es impecable. Definitivamente recomendamos Catania.",
                author: "María López",
                position: "Gerente",
                company: "Coca Cola",
                avatar: Umu,
                logo: CocaColaLogo,
                rating: 5
              },
              {
                quote: "Catania siempre cumple con nuestras expectativas y plazos de entrega. Su equipo es muy profesional y dedicado.",
                author: "Juan Pérez",
                position: "Trabajador",
                company: "Solfran",
                avatar: Diferencia,
                logo: SolfranLogo,
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.article
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
                variants={fadeInUp}
                whileHover={{ y: -8 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-5 rounded-full -translate-y-16 translate-x-16"></div>
                
                <FaQuoteLeft className="text-3xl text-blue-500 mb-6 opacity-50" />
                
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                
                <blockquote className="text-gray-800 text-lg italic mb-8 leading-relaxed relative z-10">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author}
                      className="w-14 h-14 rounded-full mr-4 object-cover border-2 border-gray-200"
                    />
                    <div>
                      <p className="font-bold text-gray-800">{testimonial.author}</p>
                      <p className="text-gray-600 text-sm">{testimonial.position}, {testimonial.company}</p>
                    </div>
                  </div>
                  
                  <img 
                    src={testimonial.logo} 
                    alt={`${testimonial.company} Logo`}
                    className="h-8 opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Mejorado */}
      <motion.section
        id="contacto"
        className="py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-white bg-opacity-10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div variants={fadeInUp}>
            <span className="inline-block bg-orange-500 bg-opacity-20 backdrop-blur-sm text-orange-200 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Descarga Gratis
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Descarga nuestro 
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"> catálogo</span> hoy
            </h2>
            <p className="text-xl mb-12 text-blue-100 leading-relaxed max-w-2xl mx-auto">
              Solicita información sobre nuestros productos y servicios personalizados para tu empresa o institución. ¡Es completamente gratis!
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 p-4 rounded-xl text-gray-800 border-0 focus:ring-4 focus:ring-orange-300 outline-none shadow-lg"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  className="group flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Descargar Catálogo
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.button 
                  className="group flex-1 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPhone className="mr-2" />
                  Consultar
                </motion.button>
              </div>
            </div>
            
            {/* Contact info rápido */}
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-8 text-blue-100">
              <div className="flex items-center gap-2">
                <FaWhatsapp className="text-green-400" />
                <span>WhatsApp: +52 123 456 7890</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-orange-400" />
                <span>info@catania.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer Mejorado */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo y descripción */}
            <div className="md:col-span-1">
              <img src={Logo} alt="Catania Logo" className="h-10 mb-4" />
              <p className="text-gray-400 leading-relaxed">
                Especialistas en uniformes y artículos promocionales de alta calidad para empresas e instituciones.
              </p>
            </div>
            
            {/* Enlaces rápidos */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-orange-400">Enlaces Rápidos</h4>
              <nav className="flex flex-col space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Inicio</a>
                <a href="#productos" className="text-gray-400 hover:text-white transition-colors">Productos</a>
                <a href="#servicios" className="text-gray-400 hover:text-white transition-colors">Servicios</a>
                <a href="#contacto" className="text-gray-400 hover:text-white transition-colors">Contacto</a>
              </nav>
            </div>
            
            {/* Productos */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-orange-400">Productos</h4>
              <nav className="flex flex-col space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Uniformes</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Promocionales</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Especiales</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Catálogo</a>
              </nav>
            </div>
            
            {/* Contacto */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-orange-400">Contacto</h4>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center gap-2 text-gray-400">
                  <FaWhatsapp className="text-green-400" />
                  <span>+52 123 456 7890</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <FaEnvelope />
                  <span>info@catania.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <FaPhone />
                  <span>+52 55 1234 5678</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Redes sociales y copyright */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <span className="text-gray-400 text-sm">© 2025 Catania. Todos los derechos reservados.</span>
              <div className="flex gap-2 text-xs">
                <a href="#" className="text-gray-500 hover:text-white transition-colors">Política de Privacidad</a>
                <span className="text-gray-600">•</span>
                <a href="#" className="text-gray-500 hover:text-white transition-colors">Términos de Servicio</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Síguenos:</span>
              <div className="flex gap-3">
                {['facebook', 'instagram', 'twitter', 'linkedin', 'youtube'].map((social, index) => (
                  <a 
                    key={social}
                    href="#" 
                    className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <span className="text-sm font-bold">{social[0].toUpperCase()}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;