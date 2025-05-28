import React from 'react';
import { motion } from 'framer-motion';
import './Servicios.css';

const Servicios = () => {
  return (
    <main className="min-h-screen bg-gray-100 font-sans">
      {/* Encabezado */}
      <motion.header
        className="bg-gradient-to-b from-blue-500 to-gray-100 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800">Nuestros Servicios</h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Ofrecemos soluciones de personalización que se adaptan a todas tus necesidades. Descubre la calidad y diversidad de nuestros servicios, diseñados para destacar tu marca.
          </p>
        </div>
      </motion.header>

      {/* Servicio: Grabado Láser */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex-1">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/361a9b83cc025dc630a90fbdc8044aca265bc17b3bb12b44b5549ba02b8acf07?placeholderIfAbsent=true"
              alt="Ícono de grabado láser"
              className="w-12 h-12"
            />
            <h2 className="text-3xl font-bold text-blue-600 mt-4">Grabado Láser: Precisión y calidad en cada detalle de tu diseño</h2>
            <p className="text-gray-600 mt-4">
              El grabado láser utiliza un rayo láser para marcar o cortar materiales con gran precisión. Ideal para personalizar productos, ofrece alta calidad y durabilidad.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="/assets/grabado laser.jpeg"
              alt="Servicio de grabado láser"
              className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </motion.section>

      {/* Servicio: Impresión DTF */}
      <motion.section
        className="py-16 bg-gray-100"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex-1">
            <span className="text-orange-500 font-semibold">DTF</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">Impresión DTF: Detalles que Marcan la Diferencia</h2>
            <p className="text-gray-600 mt-4">
              La impresión DTF transfiere diseños vibrantes a diversas superficies, perfecta para prendas personalizadas con colores intensos y gran detalle.
            </p>
            <div className="mt-6 flex space-x-4">
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition">Solicitar</button>
              <a href="#" className="flex items-center text-orange-500 hover:text-orange-600 transition">
                <span>Más info</span>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/d4aed70e652b9a334e2a683ba9bfef5c04d880fcb9b8ad7514c3dabef58a54d7?placeholderIfAbsent=true"
                  alt="Flecha de más información"
                  className="w-6 h-6 ml-2"
                />
              </a>
            </div>
          </div>
          <div className="flex-1">
            <img
              src="/assets/images (29)dgf.jpeg"
              alt="Servicio de impresión DTF"
              className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </motion.section>

      {/* Servicio: Sublimado */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800">Sublimado: la técnica perfecta para personalizar tus prendas con estilo</h2>
            <p className="text-gray-600 mt-4">
              El sublimado usa calor para transferir tintas a tejidos, ideal para diseños vibrantes y duraderos en prendas de poliéster.
            </p>
            <ul className="mt-6 space-y-2">
              <li className="flex items-center space-x-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/7dfe5d12063eb7de47e0c0116514aa08715079663186ed34f3067a8f59362633?placeholderIfAbsent=true"
                  alt="Marca de verificación"
                  className="w-4 h-4"
                />
                <span>Colores vibrantes y diseños personalizados</span>
              </li>
              <li className="flex items-center space-x-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/7dfe5d12063eb7de47e0c0116514aa08715079663186ed34f3067a8f59362633?placeholderIfAbsent=true"
                  alt="Marca de verificación"
                  className="w-4 h-4"
                />
                <span>Durabilidad excepcional en cada estampado</span>
              </li>
              <li className="flex items-center space-x-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/7dfe5d12063eb7de47e0c0116514aa08715079663186ed34f3067a8f59362633?placeholderIfAbsent=true"
                  alt="Marca de verificación"
                  className="w-4 h-4"
                />
                <span>Perfecto para prendas deportivas y promocionales</span>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <img
              src="/assets/subli.jpeg"
              alt="Servicio de sublimado"
              className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </motion.section>

      {/* Servicio: Bordado */}
      <motion.section
        className="py-16 bg-gray-100"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex-1">
            <span className="text-orange-500 font-semibold">Bordado</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">La Elegancia y Durabilidad del Bordado</h2>
            <p className="text-gray-600 mt-4">
              El bordado usa hilos para crear diseños en telas, ideal para uniformes y artículos promocionales con un acabado profesional.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-4xl font-bold text-orange-500">50%</span>
                <p className="text-gray-600 mt-2">Apariencia profesional y alta resistencia</p>
              </div>
              <div>
                <span className="text-4xl font-bold text-orange-500">50%</span>
                <p className="text-gray-600 mt-2">Personalización premium para tu marca</p>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition">Cotiza</button>
              <a href="#" className="flex items-center text-orange-500 hover:text-orange-600 transition">
                <span>Más</span>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/d4aed70e652b9a334e2a683ba9bfef5c04d880fcb9b8ad7514c3dabef58a54d7?placeholderIfAbsent=true"
                  alt="Flecha de más información"
                  className="w-6 h-6 ml-2"
                />
              </a>
            </div>
          </div>
          <div className="flex-1">
            <img
              src="/assets/bordado-750x410.jpg"
              alt="Servicio de bordado"
              className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </motion.section>

      {/* Servicio: Serigrafía */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800">Serigrafía: La técnica perfecta para proyectos a gran escala</h2>
            <p className="text-gray-600 mt-4">
              La serigrafía usa una malla para transferir tinta, ideal para diseños vibrantes y duraderos en grandes cantidades.
            </p>
            <ul className="mt-6 space-y-2">
              <li className="flex items-center space-x-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/7dfe5d12063eb7de47e0c0116514aa08715079663186ed34f3067a8f59362633?placeholderIfAbsent=true"
                  alt="Marca de verificación"
                  className="w-4 h-4"
                />
                <span>Ideal para grandes tirajes y colores sólidos</span>
              </li>
              <li className="flex items-center space-x-2">
                <img


                  src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/7dfe5d12063eb7de47e0c0116514aa08715079663186ed34f3067a8f59362633?placeholderIfAbsent=true"
                  alt="Marca de verificación"
                  className="w-4 h-4"
                />
                <span>Versatilidad en materiales como tela, plástico y papel</span>
              </li>
              <li className="flex items-center space-x-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/7dfe5d12063eb7de47e0c0116514aa08715079663186ed34f3067a8f59362633?placeholderIfAbsent=true"
                  alt="Marca de verificación"
                  className="w-4 h-4"
                />
                <span>Solicita tu cotización y empieza a personalizar</span>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <img
              src="/assets/serigrafia.jpeg"
              alt="Servicio de serigrafía"
              className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </motion.section>

      {/* Servicio: Tampografía */}
      <motion.section
        className="py-16 bg-gray-100"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex-1">
            <span className="text-orange-500 font-semibold">Tampografía</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">Tampografía: Innovación en Personalización</h2>
            <p className="text-gray-600 mt-4">
              La tampografía transfiere imágenes a superficies irregulares, ideal para objetos promocionales pequeños con alta calidad.
            </p>
            <ul className="mt-6 space-y-2">
              <li className="flex items-center space-x-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/feb26ea0b9ce5a67a4c73ec5132bc98d6ca5b7a954d3de0b3f5cd37c29b1b6b5?placeholderIfAbsent=true"
                  alt="Marca de verificación"
                  className="w-4 h-4"
                />
                <span>Precisión en superficies irregulares</span>
              </li>
              <li className="flex items-center space-x-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/feb26ea0b9ce5a67a4c73ec5132bc98d6ca5b7a954d3de0b3f5cd37c29b1b6b5?placeholderIfAbsent=true"
                  alt="Marca de verificación"
                  className="w-4 h-4"
                />
                <span>Ideal para artículos pequeños y personalizados</span>
              </li>
              <li className="flex items-center space-x-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/feb26ea0b9ce5a67a4c73ec5132bc98d6ca5b7a954d3de0b3f5cd37c29b1b6b5?placeholderIfAbsent=true"
                  alt="Marca de verificación"
                  className="w-4 h-4"
                />
                <span>Impresión duradera y de alta calidad</span>
              </li>
            </ul>
            <div className="mt-6 flex space-x-4">
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition">Cotizar</button>
              <a href="#" className="flex items-center text-orange-500 hover:text-orange-600 transition">
                <span>Más Info</span>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/d4aed70e652b9a334e2a683ba9bfef5c04d880fcb9b8ad7514c3dabef58a54d7?placeholderIfAbsent=true"
                  alt="Flecha de más información"
                  className="w-6 h-6 ml-2"
                />
              </a>
            </div>
          </div>
          <div className="flex-1">
            <img
              src="/assets/tampografia.jpeg"
              alt="Servicio de tampografía"
              className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </motion.section>

      {/* Sección CTA */}
      <motion.section
        className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold">Solicita tu cotización hoy</h2>
          <p className="mt-4 max-w-2xl mx-auto">Contáctanos para más información sobre nuestros servicios de personalización.</p>
          <div className="mt-8 flex justify-center space-x-4">
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">Cotizar</button>
            <button className="border border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition">Más</button>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex-shrink-0">
              <img src="/Logo catania blanco.png" alt="Logotipo de Catania" className="h-12" />
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
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/31013d06cddb55c39df4cdeb33b6b48c6fbc05737dd27767b800efb73ded2caf?placeholderIfAbsent=true" alt="Red social" className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-orange-300 transition">
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/6b655208516b295f93fcc599db21496c8573bd1c8064220879cf53d9462f3bc8?placeholderIfAbsent=true" alt="Red social" className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-orange-300 transition">
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/b1332e40c061482067062bfab80c125f3ae26fa5c3731b55424bf3b58522d3e0?placeholderIfAbsent=true" alt="Red social" className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-orange-300 transition">
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/87ec53ece447b3ae9f6e9f06db93c5ac976c08b25cd66b0b4bed7aa0afb5c6f0?placeholderIfAbsent=true" alt="Red social" className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-orange-300 transition">
                <img src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/96a7a2ed4768ad9d7350d6b462c83b8d7e1e12d086b94663c8b9047d3db3718e?placeholderIfAbsent=true" alt="Red social" className="w-6 h-6" />
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
    </main>
  );
};

export default Servicios;