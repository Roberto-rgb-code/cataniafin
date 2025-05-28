import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Nosotros.css';

// Componente interno para el carrusel de la sección "history"
const HistoryCarousel = () => {
  const images = [
    "/assets/Captura de pantalla 2025-03-03 154932.png",
    "/assets/Captura de pantalla 2025-03-03 154943.png",
    "/assets/Captura de pantalla 2025-03-03 154958.png"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative max-w-4xl mx-auto mt-8">
      <img
        src={images[currentIndex]}
        alt={`Company History Image ${currentIndex + 1}`}
        className="w-full h-64 object-cover rounded-lg shadow-md"
      />
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
        onClick={prevSlide}
        aria-label="Previous Image"
      >
        ❮
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
        onClick={nextSlide}
        aria-label="Next Image"
      >
        ❯
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${index === currentIndex ? 'bg-orange-500' : 'bg-gray-400'}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

const Nosotros = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-b from-blue-500 to-gray-100 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-orange-500 font-semibold">Catania</span>
          <h1 className="text-5xl font-bold text-gray-800 mt-4">Conócenos</h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Con más de 10 años de experiencia, ofrecemos calidad y personalización en uniformes y artículos promocionales.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">Contáctanos</button>
            <button className="border border-gray-800 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition">Más información</button>
          </div>
        </div>
      </motion.section>

      {/* History Section */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/361a9b83cc025dc630a90fbdc8044aca265bc17b3bb12b44b5549ba02b8acf07?placeholderIfAbsent=true"
              alt="Company Icon"
              className="w-12 h-12"
            />
            <h2 className="text-3xl font-bold text-gray-800">Conoce la historia de Catania: calidad y compromiso desde el inicio.</h2>
          </div>
          <p className="text-gray-600 mt-4 max-w-3xl">
            Catania ha recorrido un camino de excelencia en la fabricación de uniformes y artículos promocionales. Nuestra experiencia y dedicación nos han permitido convertirnos en un referente en el sector, siempre enfocados en las necesidades de nuestros clientes.
          </p>
          <HistoryCarousel />
        </div>
      </motion.section>

      {/* Misión, Visión y Valores */}
      <motion.section
        className="py-16 bg-gray-100"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-orange-500 font-semibold">Catania</span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2">Nuestra Misión, Visión y Valores</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            En Catania, nos comprometemos a ofrecer productos de la más alta calidad, siempre priorizando la satisfacción del cliente. Nuestro enfoque profesional y cercano nos distingue en el mercado.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/361a9b83cc025dc630a90fbdc8044aca265bc17b3bb12b44b5549ba02b8acf07?placeholderIfAbsent=true"
              alt="Mission Icon"
              className="w-12 h-12 mx-auto"
            />
            <h3 className="text-xl font-semibold text-blue-600 mt-4">Misión de Catania</h3>
            <p className="text-gray-600 mt-2">Proporcionar uniformes y artículos promocionales excepcionales.</p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/01561eeb825277b88de3052f3d7bfffe74f587d3ca5cb2af0e39ef854b8d83e3?placeholderIfAbsent=true"
              alt="Vision Icon"
              className="w-12 h-12 mx-auto"
            />
            <h3 className="text-xl font-semibold text-blue-600 mt-4">Visión de Catania</h3>
            <p className="text-gray-600 mt-2">Ser líderes en personalización y calidad en el sector.</p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/0bb2d90fdcb4f9c9fdb70962695e2811f2683fd11041794d014378861750db6e?placeholderIfAbsent=true"
              alt="Values Icon"
              className="w-12 h-12 mx-auto"
            />
            <h3 className="text-xl font-semibold text-blue-600 mt-4">Nuestros Valores</h3>
            <p className="text-gray-600 mt-2">Calidad, profesionalismo, innovación y cercanía al cliente.</p>
          </motion.div>
        </div>
        <div className="mt-12 flex justify-center space-x-4">
          <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition">Contáctanos</button>
          <a href="#" className="flex items-center text-orange-500 hover:text-orange-600 transition">
            <span>Conócenos</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/b1ea117d06c4300f9dad14de1f83b09a745c0f020edba579fec182e08d9e5ecc?placeholderIfAbsent=true"
              alt="Arrow"
              className="w-6 h-6 ml-2"
            />
          </a>
        </div>
      </motion.section>

      {/* Ventajas */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800">Ventajas que nos distinguen en el mercado de uniformes y personalización</h2>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          <motion.div
            className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/43e920c3a18b9ac3204df7005ff5df294f0ba6f5050ab66df1658a8eec212aa0?placeholderIfAbsent=true"
              alt="Quality Icon"
              className="w-12 h-12 mx-auto"
            />
            <h3 className="text-xl font-semibold text-blue-600 mt-4">Compromiso con la calidad y la satisfacción del cliente garantizada</h3>
            <p className="text-gray-600 mt-2">Ofrecemos personalización completa para adaptarnos a las necesidades de cada cliente.</p>
            <a href="#" className="mt-4 flex items-center justify-center text-orange-500 hover:text-orange-600 transition">
              <span>Conócenos</span>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/fac8ce89feb28a7a0742d7cf8bd90df9140bad2cbdd6a84e01447a7607968e0e?placeholderIfAbsent=true"
                alt="Arrow"
                className="w-6 h-6 ml-2"
              />
            </a>
          </motion.div>
          <motion.div
            className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/361a9b83cc025dc630a90fbdc8044aca265bc17b3bb12b44b5549ba02b8acf07?placeholderIfAbsent=true"
              alt="Delivery Icon"
              className="w-12 h-12 mx-auto"
            />
            <h3 className="text-xl font-semibold text-blue-600 mt-4">Entregas rápidas y eficientes para que no pierdas tiempo en tu negocio</h3>
            <p className="text-gray-600 mt-2">Nuestra logística asegura que recibas tus productos en el momento adecuado.</p>
            <a href="#" className="mt-4 flex items-center justify-center text-orange-500 hover:text-orange-600 transition">
              <span>Infórmate</span>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/b1ea117d06c4300f9dad14de1f83b09a745c0f020edba579fec182e08d9e5ecc?placeholderIfAbsent=true"
                alt="Arrow"
                className="w-6 h-6 ml-2"
              />
            </a>
          </motion.div>
          <motion.div
            className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/35712c960ea67cedde110961ccfdd268ccbd284266daeb2e57f72cfe5a61af51?placeholderIfAbsent=true"
              alt="Design Icon"
              className="w-12 h-12 mx-auto"
            />
            <h3 className="text-xl font-semibold text-blue-600 mt-4">Diseños exclusivos que reflejan la identidad de tu empresa o institución</h3>
            <p className="text-gray-600 mt-2">Creamos productos que destacan y representan tus valores corporativos.</p>
            <a href="#" className="mt-4 flex items-center justify-center text-orange-500 hover:text-orange-600 transition">
              <span>Explora</span>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/75a65baedfec9e71cf4781bfe2ce2eebc2fc5da2fc9bdf03002b95f8609495b0?placeholderIfAbsent=true"
                alt="Arrow"
                className="w-6 h-6 ml-2"
              />
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold">Descubre Nuestros Servicios y Productos</h2>
          <p className="mt-4 max-w-2xl mx-auto">Explora nuestra amplia gama de soluciones personalizadas para tu empresa o institución.</p>
          <div className="mt-8 flex justify-center space-x-4">
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">Servicios</button>
            <button className="border border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition">Productos</button>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex-shrink-0">
              <img src="/Logo catania blanco.png" alt="Company Logo" className="h-12" />
            </div>
            <nav className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-center">
              <a href="#" className="hover:text-orange-300 transition">Inicio Rápido</a>
              <a href="#" className="hover:text-orange-300 transition">Nuestros Servicios</a>
              <a href="#" className="hover:text-orange-300 transition">Contáctanos</a>
              <a href="#" className="hover:text-orange-300 transition">Sobre Nosotros</a>
              <a href="#" className="hover:text-orange-300 transition">Política de Cookies</a>
            </nav>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-orange-300 transition">
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/31013d06cddb55c39df4cdeb33b6b48c6fbc05737dd27767b800efb73ded2caf?placeholderIfAbsent=true" alt="Social Media" className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-orange-300 transition">
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/6b655208516b295f93fcc599db21496c8573bd1c8064220879cf53d9462f3bc8?placeholderIfAbsent=true" alt="Social Media" className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-orange-300 transition">
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/b1332e40c061482067062bfab80c125f3ae26fa5c3731b55424bf3b58522d3e0?placeholderIfAbsent=true" alt="Social Media" className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-orange-300 transition">
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/87ec53ece447b3ae9f6e9f06db93c5ac976c08b25cd66b0b4bed7aa0afb5c6f0?placeholderIfAbsent=true" alt="Social Media" className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-orange-300 transition">
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/5120e8a2e27f27b1d0a28a382e8fb9cfab572a21bb60c9bfcb5cff7d65c9ad7c?placeholderIfAbsent=true" alt="Social Media" className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-600 pt-4 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 text-sm">
            <span>© 2024 Catania. Todos los derechos reservados.</span>
            <a href="#" className="hover:text-orange-300 transition">Política de Privacidad</a>
            <a href="#" className="hover:text-orange-300 transition">Términos de Servicio</a>
            <a href="#" className="hover:text-orange-300 transition">Configuración de Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Nosotros;