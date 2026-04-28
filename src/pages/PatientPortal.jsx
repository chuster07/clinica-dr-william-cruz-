import { useState } from 'react';
import { User, Lock, FileText, Calendar, TestTube, CreditCard, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const PatientPortal = ({ setIsAuthenticated }) => {
  const MotionDiv = motion.div;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.email && credentials.password) {
      setIsLoggedIn(true);
      setIsAuthenticated(true);
      toast.success('¡Bienvenido al portal de pacientes!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAuthenticated(false);
    setCredentials({ email: '', password: '' });
    toast.success('Sesión cerrada correctamente');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen py-12 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full mx-4"
        >
          <div className="card">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Portal de Pacientes
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Accede a tu información médica
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="input-field"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="input-field"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button type="submit" className="w-full btn-primary py-3">
                Iniciar Sesión
              </button>
            </form>

            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
        </MotionDiv>
      </div>
    );
  }

  const menuItems = [
    { icon: FileText, title: 'Historial Médico', description: 'Ver tu historial completo' },
    { icon: Calendar, title: 'Mis Citas', description: 'Gestiona tus citas médicas' },
    { icon: TestTube, title: 'Resultados de Laboratorio', description: 'Accede a tus resultados' },
    { icon: CreditCard, title: 'Facturación', description: 'Ver y pagar facturas' }
  ];

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <MotionDiv initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Bienvenido, Paciente
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gestiona tu información médica
            </p>
          </MotionDiv>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card cursor-pointer hover:scale-105 transition-transform"
            >
              <item.icon className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {item.description}
              </p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;
