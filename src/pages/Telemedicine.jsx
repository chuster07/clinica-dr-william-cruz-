import { useState } from 'react';
import { Video, Calendar, Clock, Shield, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Telemedicine = () => {
  const MotionDiv = motion.div;
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const doctors = [
    { id: 1, name: 'Dr. William Cruz', specialty: 'Medicina General', available: true, rating: 5 },
    { id: 2, name: 'Dra. Ana Rodríguez', specialty: 'Cardiología', available: true, rating: 5 },
    { id: 3, name: 'Dr. Carlos Méndez', specialty: 'Pediatría', available: false, rating: 5 }
  ];

  const handleStartConsultation = () => {
    if (selectedDoctor) {
      toast.success('Iniciando videollamada con ' + selectedDoctor.name);
    } else {
      toast.error('Por favor selecciona un doctor');
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4">
            <Video className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Telemedicina
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Consulta médica profesional desde la comodidad de tu hogar
          </p>
        </MotionDiv>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Beneficios */}
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Beneficios
              </h2>
              <ul className="space-y-4">
                {[
                  { icon: Clock, text: 'Ahorra tiempo en desplazamientos' },
                  { icon: Shield, text: 'Consultas seguras y privadas' },
                  { icon: Calendar, text: 'Disponibilidad inmediata' },
                  { icon: CheckCircle, text: 'Misma calidad de atención' }
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <benefit.icon className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-600 dark:text-gray-400">{benefit.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </MotionDiv>

          {/* Selección de Doctor */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Doctores Disponibles
              </h2>
              <div className="space-y-4">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    onClick={() => doctor.available && setSelectedDoctor(doctor)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedDoctor?.id === doctor.id
                        ? 'border-green-600 bg-green-50 dark:bg-green-900/30'
                        : doctor.available
                        ? 'border-gray-300 dark:border-gray-600 hover:border-green-400'
                        : 'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-xl">
                          {doctor.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {doctor.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {doctor.specialty}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          doctor.available
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {doctor.available ? 'Disponible' : 'Ocupado'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleStartConsultation}
                disabled={!selectedDoctor}
                className="w-full mt-6 btn-primary py-3 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Video className="w-5 h-5" />
                <span>Iniciar Videoconsulta</span>
              </button>
            </div>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
};

export default Telemedicine;
