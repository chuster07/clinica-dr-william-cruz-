import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, Video, Users, Clock, 
  Shield, Award, HeartPulse, Stethoscope,
  CheckCircle, Star, ArrowRight 
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Citas en Línea',
      description: 'Agenda tu cita médica fácilmente desde cualquier dispositivo',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Video,
      title: 'Telemedicina',
      description: 'Consultas médicas por videollamada desde la comodidad de tu hogar',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Users,
      title: 'Portal de Pacientes',
      description: 'Accede a tu historial médico, resultados y recetas',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Clock,
      title: 'Atención 24/7',
      description: 'Servicio de emergencias disponible todos los días',
      color: 'from-red-500 to-red-600'
    }
  ];

  const services = [
    { name: 'Medicina General', icon: Stethoscope },
    { name: 'Cardiología', icon: HeartPulse },
    { name: 'Pediatría', icon: Users },
    { name: 'Laboratorio', icon: Shield },
  ];

  const testimonials = [
    {
      name: 'María González',
      text: 'Excelente atención médica. El Dr. Cruz es muy profesional y atento.',
      rating: 5,
      image: '👩'
    },
    {
      name: 'Carlos Ramírez',
      text: 'La telemedicina me facilitó mucho la vida. Muy recomendado.',
      rating: 5,
      image: '👨'
    },
    {
      name: 'Ana Martínez',
      text: 'Instalaciones modernas y personal muy amable. 100% recomendado.',
      rating: 5,
      image: '👩‍🦰'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-500 text-white py-20 overflow-hidden" style={{background: 'linear-gradient(135deg, #2c7873 0%, #6fb98f 50%, #4ade80 100%)'}}>>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Tu Salud es Nuestra
                <span className="block text-medical-300">Prioridad</span>
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Atención médica de calidad con tecnología de vanguardia. 
                Agenda tu cita hoy mismo y cuida de tu bienestar.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/citas" 
                  className="bg-white text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Agendar Cita</span>
                </Link>
                <Link 
                  to="/telemedicina" 
                  className="text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1" style={{background: 'linear-gradient(135deg, #6fb98f 0%, #4ade80 100%)'}} onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #4ade80 0%, #3cb371 100%)'} onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #6fb98f 0%, #4ade80 100%)'}
                >
                  <Video className="w-5 h-5" />
                  <span>Consulta Virtual</span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 md:mt-0"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-3xl transform rotate-6"></div>
                <img 
                  src="/doctor.png" 
                  alt="Dr. William Cruz" 
                  className="relative rounded-3xl shadow-2xl w-full h-64 md:h-96 object-cover"
                />
                <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white text-gray-900 p-3 md:p-4 rounded-xl shadow-2xl">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <Award className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
                    <div>
                      <p className="font-bold text-sm md:text-lg">+15 Años</p>
                      <p className="text-xs md:text-sm text-gray-600">de Experiencia</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Servicios Digitales Modernos
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Tecnología al servicio de tu salud
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card group hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nuestras Especialidades
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Atención médica integral para toda la familia
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                <service.icon className="w-12 h-12 text-primary-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {service.name}
                </h3>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/servicios"
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold text-lg group"
            >
              <span>Ver todos los servicios</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Lo Que Dicen Nuestros Pacientes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Testimonios reales de personas que confían en nosotros
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-medical-500 rounded-full flex items-center justify-center text-2xl mr-4">
                    {testimonial.image}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h3>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-white relative overflow-hidden" style={{background: 'linear-gradient(90deg, #2c7873 0%, #6fb98f 50%, #4ade80 100%)'}}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              ¿Listo para Cuidar de Tu Salud?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Agenda tu cita hoy mismo y experimenta atención médica de calidad
            </p>
            <Link 
              to="/citas"
              className="inline-flex items-center space-x-2 bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Calendar className="w-6 h-6" />
              <span>Agendar Cita Ahora</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
