import { motion } from 'framer-motion';
import { Stethoscope, HeartPulse, Baby, Microscope, Eye, Bone, Brain, Pill } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Stethoscope,
      title: 'Medicina General',
      description: 'Consultas médicas integrales para diagnóstico y tratamiento de enfermedades comunes.',
      features: ['Chequeos generales', 'Diagnóstico', 'Tratamiento', 'Seguimiento']
    },
    {
      icon: HeartPulse,
      title: 'Cardiología',
      description: 'Especialistas en salud cardiovascular y prevención de enfermedades del corazón.',
      features: ['Electrocardiograma', 'Ecocardiograma', 'Holter', 'Control de presión']
    },
    {
      icon: Baby,
      title: 'Pediatría',
      description: 'Atención especializada para la salud y desarrollo de niños y adolescentes.',
      features: ['Control de niño sano', 'Vacunación', 'Emergencias', 'Asesoría nutricional']
    },
    {
      icon: Microscope,
      title: 'Laboratorio',
      description: 'Análisis clínicos con tecnología avanzada y resultados rápidos.',
      features: ['Análisis de sangre', 'Uroanálisis', 'Cultivos', 'Bioquímica']
    },
    {
      icon: Eye,
      title: 'Oftalmología',
      description: 'Cuidado integral de la salud visual y tratamiento de enfermedades oculares.',
      features: ['Examen visual', 'Prescripción de lentes', 'Cirugía láser', 'Glaucoma']
    },
    {
      icon: Bone,
      title: 'Traumatología',
      description: 'Tratamiento de lesiones y enfermedades del sistema musculoesquelético.',
      features: ['Fracturas', 'Esguinces', 'Rehabilitación', 'Cirugía']
    },
    {
      icon: Brain,
      title: 'Neurología',
      description: 'Diagnóstico y tratamiento de trastornos del sistema nervioso.',
      features: ['Migrañas', 'Epilepsia', 'Parkinson', 'Alzheimer']
    },
    {
      icon: Pill,
      title: 'Farmacia',
      description: 'Medicamentos de calidad y asesoría farmacéutica profesional.',
      features: ['Medicamentos', 'Asesoría', 'Entrega a domicilio', 'Recetas electrónicas']
    }
  ];

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Nuestros Servicios Médicos
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Ofrecemos atención médica integral con especialistas altamente capacitados y tecnología de vanguardia
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card group hover:scale-105 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-medical-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
