import React from 'react';
import './WhatsAppWidget.css'; // Estilos que crearemos después

const WhatsAppWidget = () => {
  const phoneNumber = '3312911427'; // Reemplaza con tu número (con código de país, sin +)
  const message = '¡Hola! Quiero más información'; // Mensaje predeterminado
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-float">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" // Ícono oficial de WhatsApp
        alt="WhatsApp"
        className="whatsapp-icon"
      />
    </a>
  );
};

export default WhatsAppWidget;