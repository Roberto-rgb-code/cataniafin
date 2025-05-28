// landing-page/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './views/Inicio';
import Nosotros from './views/Nosotros';
import Servicios from './views/Servicios';
import Productos from './views/Productos';
import Contacto from './views/Contacto';
import Uniformes from './views/Uniformes';
import Promocionales from './views/Promocionales';
import Especiales from './views/Especiales';
import EspecialDetail from './views/EspecialDetail';
import UniformeDetalle from './views/UniformeDetalle';
import ProductDetail from './views/ProductDetail';
import Sidebar from './components/Sidebar';
import WhatsAppWidget from './components/WhatsAppWidget';
import UniformesList from './views/UniformesList';
import UniformeDetailDestacado from './views/UniformeDetailDestacado'; // Nueva vista
import PromocionalesList from './views/PromocionalesList';
import PromocionalDetail from './views/PromocionalDetail'; // Nueva vista
import EspecialesList from './views/EspecialesList';
import EspecialDetailDestacado from './views/EspecialDetailDestacado'; // Nueva vista

// Componente Layout para envolver las rutas
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <WhatsAppWidget />
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="productos" element={<Productos />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="uniformes" element={<Uniformes />} />
          <Route path="promocionales" element={<Promocionales />} />
          <Route path="especiales" element={<Especiales />} />
          <Route path="/especial/:id" element={<EspecialDetail />} />
          <Route path="uniforme/:id" element={<UniformeDetalle />} />
          <Route path="promocionales/product/:id" element={<ProductDetail />} />
          <Route path="sidebar" element={<Sidebar />} />

          {/* Nuevas rutas para catálogos destacados */}
          <Route path="uniformes-destacados" element={<UniformesList />} />
          <Route path="uniformes-destacados/:id" element={<UniformeDetailDestacado />} />
          <Route path="promocionales-destacados" element={<PromocionalesList />} />
          <Route path="promocionales-destacados/:id" element={<PromocionalDetail />} />
          <Route path="especiales-destacados" element={<EspecialesList />} />
          <Route path="especiales-destacados/:id" element={<EspecialDetailDestacado />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;