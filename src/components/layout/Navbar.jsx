import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Phone, Calendar, User } from 'lucide-react';

const Navbar = ({ darkMode, toggleDarkMode, isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Citas', path: '/citas' },
    { name: 'Telemedicina', path: '/telemedicina' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contacto', path: '/contacto' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-slate-900/95 backdrop-blur-md border-b border-primary-500/30 shadow-lg shadow-primary-500/10 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo y Nombre */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="Clínica Dr. William Cruz Logo"
                className="w-12 h-12 object-contain rounded-lg"
                style={{ filter: 'drop-shadow(0 2px 8px rgba(44, 120, 115, 0.3))' }}
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white">
                  Clínica Dr. William Cruz
                </h1>
                <p className="text-xs" style={{ color: '#6fb98f' }}>
                  Tu salud, nuestra prioridad
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${isActive(link.path)
                    ? 'text-gray-100 border-transparent'
                    : 'text-gray-300 hover:bg-slate-800/50 border-transparent'
                  }`}
                style={isActive(link.path) ? {
                  background: 'rgba(44, 120, 115, 0.3)',
                  borderColor: 'rgba(44, 120, 115, 0.5)',
                  color: '#6fb98f',
                  boxShadow: '0 4px 15px rgba(44, 120, 115, 0.2)'
                } : {}}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Botón de Emergencia */}
            <a
              href="tel:+50688202058"
              className="hidden md:flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-semibold">Emergencias</span>
            </a>

            {/* Portal de Pacientes */}
            <Link
              to="/portal-pacientes"
              className="hidden md:flex items-center space-x-2 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #2c7873 0%, #246661 100%)', boxShadow: '0 4px 20px rgba(44, 120, 115, 0.4)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #246661 0%, #1e5450 100%)';
                e.currentTarget.style.boxShadow = '0 6px 25px rgba(44, 120, 115, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #2c7873 0%, #246661 100%)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(44, 120, 115, 0.4)';
              }}
            >
              <User className="w-4 h-4" />
              <span className="text-sm font-semibold">
                {isAuthenticated ? 'Mi Portal' : 'Iniciar Sesión'}
              </span>
            </Link>

            {/* Toggle Dark Mode */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-slate-800/50 border hover:bg-slate-700/50 transition-all duration-200"
              style={{ borderColor: 'rgba(44, 120, 115, 0.3)' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(44, 120, 115, 0.5)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(44, 120, 115, 0.3)'}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-800/50 border hover:bg-slate-700/50 transition-all duration-200"
              style={{ borderColor: 'rgba(44, 120, 115, 0.3)' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(44, 120, 115, 0.5)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(44, 120, 115, 0.3)'}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-slate-900/95 backdrop-blur-md border-t animate-fade-in" style={{ borderTopColor: 'rgba(44, 120, 115, 0.3)' }}>
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 border ${isActive(link.path) ? '' : 'text-gray-300 hover:bg-slate-800/50 border-transparent'
                  }`}
                style={isActive(link.path) ? {
                  background: 'rgba(44, 120, 115, 0.3)',
                  borderColor: 'rgba(44, 120, 115, 0.5)',
                  color: '#6fb98f'
                } : {}}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/portal-pacientes"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2 text-white px-4 py-3 rounded-lg transition-all duration-200 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #2c7873 0%, #246661 100%)', boxShadow: '0 4px 20px rgba(44, 120, 115, 0.4)' }}
            >
              <User className="w-5 h-5" />
              <span className="font-semibold">
                {isAuthenticated ? 'Mi Portal' : 'Iniciar Sesión'}
              </span>
            </Link>

            <a
              href="tel:+50688202058"
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg transition-colors duration-200"
            >
              <Phone className="w-5 h-5" />
              <span className="font-semibold">Emergencias</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
