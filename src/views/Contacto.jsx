import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Contacto.css';

const Contacto = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    const redIcon = L.icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
      shadowUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    mapRef.current = L.map('map').setView([20.7044261, -103.3574619], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);
    L.marker([20.7044261, -103.3574619], { icon: redIcon })
      .addTo(mapRef.current)
      .bindPopup(
        '<b>C. Francisco Márquez 1547</b><br>San Miguel de Mezquitan, Guadalajara, Jal.'
      )
      .openPopup();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 font-sans">
      {/* Información de Contacto */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-orange-500 font-semibold">Contacto</span>
          <h1 className="text-4xl font-bold text-gray-800 mt-2">Contáctanos</h1>
          <p className="text-gray-600 mt-4">Estamos aquí para ayudarte con tus consultas.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          <motion.div
            className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/a35b853c507e45f8fc2eeb3840934c3da80a9986b60deb15f1adf40d674c16e4?placeholderIfAbsent=true"
              alt="Email icon"
              className="w-8 h-8 mx-auto"
            />
            <h3 className="text-xl font-semibold text-blue-600 mt-4">Email</h3>
            <p className="text-gray-600 mt-2">Escríbenos a:</p>
            <a href="mailto:ventas2@catania.com.mx" className="text-orange-500 hover:text-orange-600 transition">
              ventas2@catania.com.mx
            </a>
          </motion.div>
          <motion.div
            className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/1e229700f5e5a999f0813701f15f227da88fea1538d544b77380d3a68d4ed440?placeholderIfAbsent=true"
              alt="Phone icon"
              className="w-8 h-8 mx-auto"
            />
            <h3 className="text-xl font-semibold text-blue-600 mt-4">Teléfono</h3>
            <p className="text-gray-600 mt-2">Llámanos al:</p>
            <a href="tel:+523338533555" className="text-orange-500 hover:text-orange-600 transition">
              +52 333 853 3555
            </a>
          </motion.div>
          <motion.div
            className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/82849431ac26a1ce74cf6982899ed7ae92887dcadf9e0e1fcd639b184a74592b?placeholderIfAbsent=true"
              alt="Office icon"
              className="w-8 h-8 mx-auto"
            />
            <h3 className="text-xl font-semibold text-blue-600 mt-4">Oficina</h3>
            <p className="text-gray-600 mt-2">
              C. Francisco Márquez 1547, San Miguel de Mezquitan, 44260 Guadalajara, Jal., México
            </p>
            <a href="#" className="text-orange-500 hover:text-orange-600 transition flex items-center justify-center mt-2">
              Obtener Direcciones
            </a>
          </motion.div>
        </div>
        {/* Mapa */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div id="map" className="h-96 w-full rounded-lg shadow-md"></div>
        </motion.div>
      </motion.section>

      {/* Formulario de Contacto */}
      <motion.section
        className="py-16 bg-gray-100"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-orange-500 font-semibold">Contacto</span>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">Contáctanos</h2>
          <p className="text-gray-600 mt-4">Estamos aquí para ayudarte con tus consultas.</p>
        </div>
        <form className="mt-8 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-gray-700">Nombre</label>
              <input type="text" id="firstName" className="w-full mt-2 p-2 border border-gray-300 rounded focus:border-orange-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700">Apellido</label>
              <input type="text" id="lastName" className="w-full mt-2 p-2 border border-gray-300 rounded focus:border-orange-500 focus:outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label htmlFor="email" className="block text-gray-700">Correo</label>
              <input type="email" id="email" className="w-full mt-2 p-2 border border-gray-300 rounded focus:border-orange-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700">Número telefónico</label>
              <input type="tel" id="phone" className="w-full mt-2 p-2 border border-gray-300 rounded focus:border-orange-500 focus:outline-none" />
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="topic" className="block text-gray-700">Selecciona un tema</label>
            <div className="relative">
              <select id="topic" className="w-full mt-2 p-2 border border-gray-300 rounded focus:border-orange-500 focus:outline-none appearance-none">
                <option value="">Selecciona uno...</option>
              </select>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/293582c4b6e917a9daa1f474f6d43c9b422055e404a239003f2d99a11bfb1b4f?placeholderIfAbsent=true"
                alt="Select arrow"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
              />
            </div>
          </div>
          <fieldset className="mt-6">
            <legend className="text-gray-700">¿Cómo te describirías?</legend>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <label className="flex items-center space-x-2">
                <input type="radio" name="description" value="option1" className="form-radio text-orange-500" />
                <span>Opción uno</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="description" value="option2" className="form-radio text-orange-500" />
                <span>Opción dos</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="description" value="option3" className="form-radio text-orange-500" />
                <span>Opción tres</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="description" value="option4" className="form-radio text-orange-500" />
                <span>Opción cuatro</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="description" value="option5" className="form-radio text-orange-500" />
                <span>Opción cinco</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="description" value="other" className="form-radio text-orange-500" />
                <span>Otro</span>
              </label>
            </div>
          </fieldset>
          <div className="mt-6">
            <label htmlFor="message" className="block text-gray-700">Mensaje</label>
            <textarea
              id="message"
              className="w-full mt-2 p-2 border border-gray-300 rounded focus:border-orange-500 focus:outline-none"
              placeholder="Escribe tu mensaje..."
              rows="4"
            ></textarea>
          </div>
          <label className="flex items-center mt-4 space-x-2">
            <input type="checkbox" className="form-checkbox text-orange-500" />
            <span className="text-gray-700">Acepto los Términos</span>
          </label>
          <button type="submit" className="mt-6 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">
            Enviar
          </button>
        </form>
      </motion.section>

      {/* Socios */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800">Utilizado por las principales empresas del mundo</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            <img src="/assets/Coca-Cola-logo (1).png" alt="Partner logo" className="h-12" />
            <img src="/assets/solfran_color.png" alt="Partner logo" className="h-12" />
            <img src="/assets/logo_udeg_color_horizontal_3.png" alt="Partner logo" className="h-12" />
            <img src="/assets/dddddd.png" alt="Partner logo" className="h-12" />
            <img src="/assets/images (29).jpeg" alt="Partner logo" className="h-12" />
          </div>
        </div>
      </motion.section>

      {/* FAQs */}
      <motion.section
        className="py-16 bg-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800">FAQs</h2>
          <p className="text-gray-600 mt-4">Aquí encontrarás las respuestas a las preguntas más frecuentes sobre nuestros servicios.</p>
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          <details className="mb-4 bg-white p-4 rounded-lg shadow-md">
            <summary className="flex justify-between items-center cursor-pointer text-gray-800 font-semibold">
              <span>¿Cuáles son los horarios?</span>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/a5a12482792e3792fd68f8a29482ccc0ae8c220359f03e0f710c5149d9d116a0?placeholderIfAbsent=true"
                alt="Toggle"
                className="w-6 h-6"
              />
            </summary>
            <p className="text-gray-600 mt-4">
              Nuestros horarios de atención son de lunes a viernes, de 9:00 a 18:00 horas. Los sábados atendemos de 10:00 a 14:00 horas. Estamos cerrados los domingos.
            </p>
          </details>
          <details className="mb-4 bg-white p-4 rounded-lg shadow-md">
            <summary className="flex justify-between items-center cursor-pointer text-gray-800 font-semibold">
              <span>¿Dónde están ubicados?</span>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/a5a12482792e3792fd68f8a29482ccc0ae8c220359f03e0f710c5149d9d116a0?placeholderIfAbsent=true"
                alt="Toggle"
                className="w-6 h-6"
              />
            </summary>
            <p className="text-gray-600 mt-4">
              Estamos ubicados en la Calle Principal 123, Ciudad. Puedes encontrarnos fácilmente cerca del parque central. Consulta nuestro mapa para más detalles.
            </p>
          </details>
          <details className="mb-4 bg-white p-4 rounded-lg shadow-md">
            <summary className="flex justify-between items-center cursor-pointer text-gray-800 font-semibold">
              <span>¿Cómo puedo contactarlos?</span>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/a5a12482792e3792fd68f8a29482ccc0ae8c220359f03e0f710c5149d9d116a0?placeholderIfAbsent=true"
                alt="Toggle"
                className="w-6 h-6"
              />
            </summary>
            <p className="text-gray-600 mt-4">
              Puedes contactarnos a través de nuestro formulario en línea o llamándonos al 123-456-7890. También puedes enviarnos un correo a info@catania.com. Estamos aquí para ayudarte.
            </p>
          </details>
          <details className="mb-4 bg-white p-4 rounded-lg shadow-md">
            <summary className="flex justify-between items-center cursor-pointer text-gray-800 font-semibold">
              <span>¿Tienen servicio a domicilio?</span>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/a5a12482792e3792fd68f8a29482ccc0ae8c220359f03e0f710c5149d9d116a0?placeholderIfAbsent=true"
                alt="Toggle"
                className="w-6 h-6"
              />
            </summary>
            <p className="text-gray-600 mt-4">
              Sí, ofrecemos servicio a domicilio para pedidos mayores a un monto específico. Asegúrate de consultar las condiciones en nuestra sección de servicios. Estamos comprometidos a facilitarte la experiencia.
            </p>
          </details>
          <details className="mb-4 bg-white p-4 rounded-lg shadow-md">
            <summary className="flex justify-between items-center cursor-pointer text-gray-800 font-semibold">
              <span>¿Puedo personalizar mis pedidos?</span>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/19212d5c728649939294929a3b45f164/6edff1e654cb94c1e034d7d7f29f868b6239cc5c9c814b537028f003172cd4ea?placeholderIfAbsent=true"
                alt="Toggle"
                className="w-6 h-6"
              />
            </summary>
            <p className="text-gray-600 mt-4">
              Por supuesto, ofrecemos opciones de personalización para todos nuestros productos. Puedes elegir colores, diseños y más. Contáctanos para discutir tus necesidades específicas.
            </p>
          </details>
        </div>
        <div className="mt-12 flex flex-col items-center space-y-4">
          <h3 className="text-2xl font-bold text-gray-800">¿Aún tienes dudas?</h3>
          <p className="text-gray-600">Estamos aquí para ayudarte.</p>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">Contactar</button>
        </div>
      </motion.section>
    </main>
  );
};

export default Contacto;