import { Link } from 'react-router-dom';
import { 
  MapPin, Phone, Mail, Clock, 
  Facebook, Instagram, Twitter, Linkedin,
  Heart 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Información de la Clínica */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo.png" 
                alt="Clínica Dr. William Cruz Logo" 
                className="w-10 h-10 object-contain"
                style={{filter: 'drop-shadow(0 2px 8px rgba(44, 120, 115, 0.3))'}}
              />
              <div>
                <h3 className="text-white font-bold">Clínica Dr. William Cruz</h3>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Brindando atención médica de calidad con tecnología de vanguardia y un equipo altamente capacitado.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="hover:text-primary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="hover:text-primary-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/servicios" className="hover:text-primary-400 transition-colors">Servicios</Link></li>
              <li><Link to="/citas" className="hover:text-primary-400 transition-colors">Reservar Cita</Link></li>
              <li><Link to="/telemedicina" className="hover:text-primary-400 transition-colors">Telemedicina</Link></li>
              <li><Link to="/blog" className="hover:text-primary-400 transition-colors">Blog</Link></li>
              <li><Link to="/portal-pacientes" className="hover:text-primary-400 transition-colors">Portal de Pacientes</Link></li>
            </ul>
          </div>

          {/* Información de Contacto */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">San José, Costa Rica<br />Av. Central, Calle 14</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="tel:+50688202058" className="text-sm hover:text-primary-400 transition-colors">
                  +506 8820-2058
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="mailto:info@clinicawilliamcruz.com" className="text-sm hover:text-primary-400 transition-colors">
                  info@clinicawilliamcruz.com
                </a>
              </li>
            </ul>
          </div>

          {/* Horario */}
          <div>
            <h3 className="text-white font-semibold mb-4">Horario de Atención</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-white">Lunes - Viernes</p>
                  <p>8:00 AM - 6:00 PM</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 ml-8">
                <div className="text-sm">
                  <p className="font-medium text-white">Sábados</p>
                  <p>9:00 AM - 2:00 PM</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 ml-8">
                <div className="text-sm">
                  <p className="font-medium text-white">Domingos</p>
                  <p className="text-red-400">Cerrado</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400 flex items-center">
              © {currentYear} Clínica Dr. William Cruz. Todos los derechos reservados.
              <Heart className="w-4 h-4 text-red-500 mx-1 animate-pulse-slow" />
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacidad" className="hover:text-primary-400 transition-colors">
                Privacidad
              </Link>
              <Link to="/terminos" className="hover:text-primary-400 transition-colors">
                Términos
              </Link>
              <Link to="/cookies" className="hover:text-primary-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
