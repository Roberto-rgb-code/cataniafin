import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Inicio" },
    { path: "/nosotros", label: "Nosotros" },
    { path: "/servicios", label: "Servicios" },
    { path: "/productos", label: "Productos" },
    { path: "/contacto", label: "Contacto" },
  ];

  const handleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Para el submit, por ahora solo hace preventDefault
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías navegar, buscar, etc.
    // ejemplo: navigate(`/productos?busqueda=${search}`)
  };

  return (
    <nav className="bg-blue-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/Logo catania blanco.png"
            alt="Catania Logo"
            className="h-10 w-auto drop-shadow-md hover:scale-105 transition-transform"
          />
        </Link>

        {/* Buscador (Desktop) */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center bg-white rounded-lg px-3 py-1 mx-4 text-gray-800 w-64 shadow-inner"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar productos..."
            className="bg-transparent outline-none flex-1 px-2 py-1 text-sm"
            aria-label="Buscar productos"
          />
          <button type="submit" className="p-1 text-blue-500 hover:text-orange-500 transition">
            {/* Icono de búsqueda SVG */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-3.5-3.5" />
            </svg>
          </button>
        </form>

        {/* Desktop Nav Links and Actions */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-semibold text-white hover:text-orange-300 transition-colors duration-200 px-2 py-1 rounded ${
                  location.pathname === link.path
                    ? "bg-orange-500 text-white shadow"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex gap-3 ml-6">
            <a
              href="mailto:ventas2@catania.com.mx?subject=Solicitud%20de%20información&body=Hola,%20quisiera%20saber%20..."
              className="px-4 py-2 border border-white rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition"
            >
              Enviar
            </a>
            <a
              href="tel:+523338533555"
              className="px-4 py-2 bg-orange-500 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Cotizar
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center text-3xl p-2 focus:outline-none"
          onClick={handleMobileMenu}
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span className="sr-only">
            {isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          </span>
          <div className="w-7 h-7 relative">
            {/* Hamburguesa animada */}
            <span
              className={`block absolute h-1 w-7 bg-white rounded transition-all duration-300 ${
                isMobileMenuOpen
                  ? "rotate-45 top-3.5"
                  : "top-1"
              }`}
            ></span>
            <span
              className={`block absolute h-1 w-7 bg-white rounded transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : "top-3.5"
              }`}
            ></span>
            <span
              className={`block absolute h-1 w-7 bg-white rounded transition-all duration-300 ${
                isMobileMenuOpen
                  ? "-rotate-45 top-3.5"
                  : "top-6"
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-blue-700 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-[500px] py-6" : "max-h-0 py-0"
        }`}
      >
        <div className="flex flex-col gap-5 px-7">
          {/* Buscador Mobile */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-white rounded-lg px-3 py-1 text-gray-800 w-full shadow-inner"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar productos..."
              className="bg-transparent outline-none flex-1 px-2 py-1 text-sm"
              aria-label="Buscar productos"
            />
            <button type="submit" className="p-1 text-blue-500 hover:text-orange-500 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-3.5-3.5" />
              </svg>
            </button>
          </form>
          {/* Nav links mobile */}
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-lg font-semibold py-1 rounded hover:bg-orange-500 transition ${
                location.pathname === link.path ? "bg-orange-500 text-white" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-3">
            <a
              href="mailto:ventas2@catania.com.mx?subject=Solicitud%20de%20información&body=Hola,%20quisiera%20saber%20..."
              className="px-4 py-2 border border-white rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Enviar
            </a>
            <a
              href="tel:+523338533555"
              className="px-4 py-2 bg-orange-500 rounded-lg font-semibold hover:bg-orange-600 transition text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cotizar
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
