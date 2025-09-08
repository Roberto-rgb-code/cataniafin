import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaIndustry, FaTshirt, FaTools, FaWhatsapp, FaPhone, FaEnvelope, FaQuoteLeft, FaStar, FaArrowRight, FaCheckCircle, FaShoppingCart, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

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

// Componente de animación de uniformes y promocionales mejorado para todo el hero
const EnhancedUniformAnimation = () => {
  const uniformElements = [
    { icon: '👔', delay: 0, size: 'text-4xl', color: 'text-blue-400', x: 15, y: 20 },
    { icon: '🥼', delay: 0.5, size: 'text-5xl', color: 'text-green-400', x: 85, y: 15 },
    { icon: '👕', delay: 1, size: 'text-3xl', color: 'text-purple-400', x: 25, y: 70 },
    { icon: '🦺', delay: 1.5, size: 'text-4xl', color: 'text-orange-400', x: 75, y: 65 },
    { icon: '🧥', delay: 2, size: 'text-3xl', color: 'text-indigo-400', x: 10, y: 45 },
    { icon: '👗', delay: 2.5, size: 'text-4xl', color: 'text-pink-400', x: 90, y: 40 },
  ];

  const promocionalElements = [
    { icon: '✏️', delay: 3, size: 'text-3xl', color: 'text-red-400', x: 20, y: 10 },
    { icon: '🎒', delay: 3.5, size: 'text-4xl', color: 'text-cyan-400', x: 80, y: 80 },
    { icon: '🧢', delay: 4, size: 'text-3xl', color: 'text-yellow-400', x: 30, y: 85 },
    { icon: '🍶', delay: 4.5, size: 'text-4xl', color: 'text-pink-400', x: 70, y: 25 },
    { icon: '📓', delay: 5, size: 'text-3xl', color: 'text-indigo-400', x: 5, y: 75 },
    { icon: '🖊️', delay: 5.5, size: 'text-4xl', color: 'text-teal-400', x: 95, y: 55 },
    { icon: '👜', delay: 6, size: 'text-3xl', color: 'text-violet-400', x: 40, y: 5 },
    { icon: '🏷️', delay: 6.5, size: 'text-4xl', color: 'text-emerald-400', x: 60, y: 90 },
    { icon: '📱', delay: 7, size: 'text-3xl', color: 'text-orange-300', x: 12, y: 30 },
    { icon: '🎯', delay: 7.5, size: 'text-4xl', color: 'text-blue-300', x: 88, y: 70 },
  ];

  const allElements = [...uniformElements, ...promocionalElements];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Ondas de fondo animadas */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
            </linearGradient>
            <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(251,146,60,0.1)" />
              <stop offset="50%" stopColor="rgba(251,146,60,0.05)" />
              <stop offset="100%" stopColor="rgba(251,146,60,0.1)" />
            </linearGradient>
          </defs>
          
          <motion.path
            d="M0,400 Q300,200 600,400 T1200,400 V800 H0 Z"
            fill="url(#wave1)"
            initial={{ d: "M0,400 Q300,200 600,400 T1200,400 V800 H0 Z" }}
            animate={{ 
              d: [
                "M0,400 Q300,200 600,400 T1200,400 V800 H0 Z",
                "M0,350 Q300,250 600,350 T1200,350 V800 H0 Z",
                "M0,400 Q300,200 600,400 T1200,400 V800 H0 Z"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.path
            d="M0,500 Q400,300 800,500 T1200,500 V800 H0 Z"
            fill="url(#wave2)"
            initial={{ d: "M0,500 Q400,300 800,500 T1200,500 V800 H0 Z" }}
            animate={{ 
              d: [
                "M0,500 Q400,300 800,500 T1200,500 V800 H0 Z",
                "M0,450 Q400,350 800,450 T1200,450 V800 H0 Z",
                "M0,500 Q400,300 800,500 T1200,500 V800 H0 Z"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </svg>
      </div>

      {/* Partículas flotantes mejoradas */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-white/30 to-orange-300/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Círculos decorativos animados */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full border border-white/10"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${20 + i * 10}%`,
              top: `${10 + i * 8}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Elementos de uniformes y promocionales distribuidos */}
      {allElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.size} ${element.color} drop-shadow-lg`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          initial={{ 
            opacity: 0, 
            scale: 0,
            rotate: -180,
          }}
          animate={{ 
            opacity: [0, 1, 0.8, 1],
            scale: [0, 1.3, 0.9, 1],
            rotate: [0, 360],
            y: [0, -15, 0],
            x: [0, Math.sin(index) * 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          {element.icon}
        </motion.div>
      ))}

      {/* Efecto de brillo que se mueve */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.3, 0.1],
          x: [-100, 100, -100],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Líneas conectoras animadas */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {allElements.map((element, index) => {
          const nextElement = allElements[(index + 1) % allElements.length];
          return (
            <motion.line
              key={`line-${index}`}
              x1={`${element.x}%`}
              y1={`${element.y}%`}
              x2={`${nextElement.x}%`}
              y2={`${nextElement.y}%`}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: element.delay + 2,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

const Inicio = () => {
  const [cartItems, setCartItems] = useState(0);
  const [email, setEmail] = useState('');
  
  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

  // Función para abrir WhatsApp
  const openWhatsApp = () => {
    window.open('https://wa.me/5212345678900?text=Hola,%20me%20interesa%20cotizar%20sus%20productos', '_blank');
  };

  // Función para abrir email de cotización
  const openQuoteEmail = () => {
    window.location.href = 'mailto:ventas2@catania.com.mx?subject=Solicitud de Cotización&body=Hola, me gustaría solicitar una cotización para sus productos.';
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
        className="relative min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white flex items-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Capa de overlay sutil */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
        
        {/* Animación de uniformes y promocionales en todo el hero */}
        <EnhancedUniformAnimation />
        
        {/* Elementos decorativos adicionales */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Contenido principal */}
            <motion.div 
              className="lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Badge de experiencia */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center bg-gradient-to-r from-orange-500/20 to-orange-600/20 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-orange-300/20"
              >
                <FaCheckCircle className="mr-3 text-orange-300 text-lg" />
                <span className="text-sm font-semibold text-orange-100 tracking-wide">Más de 25 años de experiencia</span>
              </motion.div>
              
              {/* Título principal mejorado */}
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold mb-8 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <span className="block">Uniformes y</span>
                <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Artículos
                </span>
                <motion.span 
                  className="block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  Promocionales
                </motion.span>
                <span className="block text-4xl lg:text-5xl mt-2 text-blue-100">para Todos</span>
              </motion.h1>
              
              {/* Descripción mejorada */}
              <motion.p 
                className="text-xl lg:text-2xl mb-10 text-blue-100 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Descubre la <span className="font-semibold text-white">calidad</span> y <span className="font-semibold text-white">variedad</span> que ofrecemos para vestir tu empresa o institución con <span className="text-orange-300 font-semibold">estilo y profesionalismo único</span>.
              </motion.p>
              
              {/* Botones de acción mejorados */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.button 
                  onClick={openWhatsApp}
                  className="group relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center">
                    <FaWhatsapp className="mr-3 text-xl" />
                    Contáctanos
                    <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </motion.button>
                
                <motion.button 
                  onClick={openQuoteEmail}
                  className="group relative border-3 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-lg backdrop-blur-md hover:bg-white hover:text-blue-600 transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center">
                    <FaEnvelope className="mr-3 text-xl" />
                    Cotiza Ahora
                    <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </motion.button>
              </motion.div>
              
              {/* Estadísticas mejoradas */}
              <motion.div 
                className="grid grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                {[
                  { number: "500+", label: "Clientes felices", icon: "😊" },
                  { number: "100K+", label: "Productos", icon: "📦" },
                  { number: "24h", label: "Respuesta", icon: "⚡" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="text-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl mb-1">{stat.icon}</div>
                    <div className="font-bold text-3xl lg:text-4xl text-orange-300 mb-1">{stat.number}</div>
                    <div className="text-blue-200 text-sm lg:text-base font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Lado derecho - Contenido visual mejorado */}
            <motion.div 
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative max-w-lg mx-auto">
                {/* Tarjeta principal flotante */}
                <motion.div 
                  className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl"
                  animate={{ 
                    y: [0, -10, 0],
                    rotateY: [0, 5, 0],
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="text-center mb-6">
                    <motion.div 
                      className="text-6xl mb-4"
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      ✨
                    </motion.div>
                    <h3 className="text-3xl font-bold text-white mb-2">Calidad Premium</h3>
                    <p className="text-blue-200 text-lg">Uniformes & Promocionales</p>
                  </div>
                  
                  {/* Mini galería de productos */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {['👔', '🎒', '🧢'].map((icon, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/10 rounded-xl p-4 text-center text-2xl"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.5,
                          ease: "easeInOut"
                        }}
                      >
                        {icon}
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Rating y testimonial mini */}
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.5 + i * 0.1 }}
                        >
                          <FaStar className="text-yellow-400 text-lg mx-1" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-white text-sm italic">"Excelente calidad y servicio"</p>
                    <p className="text-blue-300 text-xs mt-1">- Clientes satisfechos</p>
                  </div>
                </motion.div>
                
                {/* Elementos flotantes alrededor */}
                {[
                  { icon: '🏆', position: 'top-4 right-4', delay: 2 },
                  { icon: '💼', position: 'bottom-4 left-4', delay: 2.5 },
                  { icon: '🎯', position: 'top-1/2 -left-8', delay: 3 },
                  { icon: '⚡', position: 'top-1/2 -right-8', delay: 3.5 },
                ].map((element, index) => (
                  <motion.div
                    key={index}
                    className={`absolute ${element.position} text-4xl`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0.7, 1],
                      scale: [0, 1.2, 0.9, 1],
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: element.delay,
                      ease: "easeInOut",
                    }}
                  >
                    {element.icon}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
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
                          openQuoteEmail();
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
                        Ver catalogo
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
            <button 
              onClick={openQuoteEmail}
              className="group flex items-center text-orange-500 hover:text-orange-600 font-semibold transition-colors"
            >
              <span>Cotizar ahora</span>
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
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
            <button 
              onClick={openQuoteEmail}
              className="group flex items-center text-orange-500 hover:text-orange-600 font-semibold transition-colors"
            >
              <span>Servicios completos</span>
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
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
            <button 
              onClick={openQuoteEmail}
              className="group flex items-center text-orange-500 hover:text-orange-600 font-semibold transition-colors"
            >
              <span>Cotizar productos</span>
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Sección de Clientes - Carrusel */}
      <motion.section
        id="clientes"
        className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <span className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Nuestros Clientes
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Empresas que Confían en 
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Nosotros</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Trabajamos con empresas líderes que valoran la calidad y el profesionalismo en sus uniformes y artículos promocionales.
            </p>
          </motion.div>

          {/* Carrusel de logos */}
          <motion.div 
            className="relative"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-center">
              <div className="w-full max-w-6xl overflow-hidden">
                <motion.div
                  className="flex items-center gap-16"
                  animate={{
                    x: [0, -100 * 8], // Mover según el número de logos
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {/* Array de logos de clientes - puedes agregar más aquí */}
                  {[
                    { name: "Coca Cola", logo: "https://via.placeholder.com/150x80/FF0000/FFFFFF?text=COCA-COLA" },
                    { name: "Solfran", logo: "https://via.placeholder.com/150x80/0066CC/FFFFFF?text=SOLFRAN" },
                    { name: "PEMEX", logo: "https://via.placeholder.com/150x80/006633/FFFFFF?text=PEMEX" },
                    { name: "IMSS", logo: "https://via.placeholder.com/150x80/0099CC/FFFFFF?text=IMSS" },
                    { name: "CFE", logo: "https://via.placeholder.com/150x80/FF6600/FFFFFF?text=CFE" },
                    { name: "Walmart", logo: "https://via.placeholder.com/150x80/004C91/FFFFFF?text=WALMART" },
                    { name: "OXXO", logo: "https://via.placeholder.com/150x80/FF0000/FFFFFF?text=OXXO" },
                    { name: "Soriana", logo: "https://via.placeholder.com/150x80/E31E24/FFFFFF?text=SORIANA" },
                    // Duplicamos los logos para que el carrusel sea continuo
                    { name: "Coca Cola", logo: "https://via.placeholder.com/150x80/FF0000/FFFFFF?text=COCA-COLA" },
                    { name: "Solfran", logo: "https://via.placeholder.com/150x80/0066CC/FFFFFF?text=SOLFRAN" },
                    { name: "PEMEX", logo: "https://via.placeholder.com/150x80/006633/FFFFFF?text=PEMEX" },
                    { name: "IMSS", logo: "https://via.placeholder.com/150x80/0099CC/FFFFFF?text=IMSS" },
                    { name: "CFE", logo: "https://via.placeholder.com/150x80/FF6600/FFFFFF?text=CFE" },
                    { name: "Walmart", logo: "https://via.placeholder.com/150x80/004C91/FFFFFF?text=WALMART" },
                    { name: "OXXO", logo: "https://via.placeholder.com/150x80/FF0000/FFFFFF?text=OXXO" },
                    { name: "Soriana", logo: "https://via.placeholder.com/150x80/E31E24/FFFFFF?text=SORIANA" },
                  ].map((client, index) => (
                    <motion.div
                      key={index}
                      className="flex-shrink-0 group"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 w-40 h-24 flex items-center justify-center group-hover:border-blue-300">
                        <img
                          src={client.logo}
                          alt={`${client.name} Logo`}
                          className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Gradientes para crear efecto de desvanecimiento en los bordes */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-100 to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-100 to-transparent pointer-events-none z-10"></div>
          </motion.div>

          {/* Estadísticas de clientes */}
          <motion.div 
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            variants={staggerChildren}
          >
            {[
              { number: "500+", label: "Empresas Atendidas", icon: "🏢" },
              { number: "50+", label: "Sectores Diferentes", icon: "🎯" },
              { number: "25+", label: "Años de Experiencia", icon: "📅" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200"
                variants={fadeInUp}
                whileHover={{ y: -8 }}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA para nuevos clientes */}
          <motion.div 
            className="mt-16 text-center"
            variants={fadeInUp}
          >
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                ¿Tu empresa también quiere unirse a nuestros clientes satisfechos?
              </h3>
              <p className="text-gray-600 mb-6">
                Únete a las empresas líderes que ya confían en Catania para sus uniformes y artículos promocionales.
              </p>
              <motion.button
                onClick={openQuoteEmail}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Solicitar Información
                <FaArrowRight className="ml-2" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Mejorado con Esquema de Colores Azules */}
      <motion.section
        id="contacto"
        className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white relative overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/5"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-300/10 to-indigo-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-cyan-300/10 to-blue-300/10 rounded-full blur-3xl"></div>
        
        {/* Partículas flotantes */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-white/20 to-blue-300/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 10 - 5, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <motion.div variants={fadeInUp}>
            <span className="inline-block bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-md text-blue-200 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-blue-300/20">
              Descarga Gratis
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Descarga nuestro 
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> catálogo</span> hoy
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
                  className="flex-1 p-4 rounded-xl text-gray-800 border-0 focus:ring-4 focus:ring-blue-300 outline-none shadow-lg"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  onClick={openQuoteEmail}
                  className="group flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Descargar Catálogo
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.button 
                  onClick={openWhatsApp}
                  className="group flex-1 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaWhatsapp className="mr-2" />
                  WhatsApp
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
                <FaEnvelope className="text-cyan-400" />
                <span>ventas2@catania.com.mx</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer Mejorado */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Descripción de la empresa */}
            <div className="md:col-span-1">
              <h4 className="font-bold text-lg mb-4 text-orange-400">Catania</h4>
              <p className="text-gray-400 leading-relaxed">
                Especialistas en uniformes y artículos promocionales de alta calidad para empresas e instituciones.
              </p>
              {/* Redes sociales movidas aquí */}
              <div className="flex gap-3 mt-4">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <FaFacebookF className="text-sm" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <FaInstagram className="text-sm" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <FaTwitter className="text-sm" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <FaLinkedinIn className="text-sm" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <FaYoutube className="text-sm" />
                </a>
              </div>
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
                <a 
                  href="https://wa.me/5212345678900?text=Hola,%20me%20interesa%20cotizar%20sus%20productos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  Cotizar
                </a>
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
                  <span>ventas2@catania.com.mx</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <FaPhone />
                  <span>+52 55 1234 5678</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <span className="text-gray-400 text-sm">© 2025 Catania. Todos los derechos reservados.</span>
              <div className="flex gap-2 text-xs">
                <a href="#" className="text-gray-500 hover:text-white transition-colors">Política de Privacidad</a>
                <span className="text-gray-600">•</span>
                <a href="#" className="text-gray-500 hover:text-white transition-colors">Términos de Servicio</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;