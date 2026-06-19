import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Calendar, DollarSign, TrendingUp, Activity } from 'lucide-react';

const Dashboard = ({ isAuthenticated }) => {
  const MotionDiv = motion.div;
  if (!isAuthenticated) {
    return <Navigate to="/portal-pacientes" replace />;
  }

  const stats = [
    { icon: Users, label: 'Pacientes', value: '1,234', change: '+12%', color: 'blue' },
    { icon: Calendar, label: 'Citas Hoy', value: '45', change: '+5%', color: 'green' },
    { icon: DollarSign, label: 'Ingresos', value: '$12,345', change: '+8%', color: 'purple' },
    { icon: Activity, label: 'Satisfacción', value: '98%', change: '+2%', color: 'red' }
  ];

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Administrativo</h1>
          <p className="text-gray-600 dark:text-gray-400">Panel de control y estadísticas</p>
        </MotionDiv>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <stat.icon className={`w-12 h-12 text-${stat.color}-600`} />
              </div>
            </MotionDiv>
          ))}
        </div>

        {/* Sección de Actividad Reciente */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary-500" />
              Actividad Reciente
            </h2>
            <badge className="px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full text-xs font-semibold border border-primary-500/20">
              En Vivo
            </badge>
          </div>

          <div className="space-y-4">
            {[
              { type: 'Cita', info: 'Nuevo paciente: María García', time: 'Hace 5 min', status: 'Confirmada' },
              { type: 'AI Recordatorio', info: 'Email enviado a Carlos Ruíz', time: 'Hace 12 min', status: 'Exitoso' },
              { type: 'Pago', info: 'Factura #9822 - Ana Martínez', time: 'Hace 25 min', status: 'Completado' },
              { type: 'Telemedicina', info: 'Consulta Dr. Cruz terminada', time: 'Hace 1 hr', status: 'Finalizado' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-primary-500/30 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(44,120,115,0.8)]"></div>
                  <div>
                    <p className="text-sm font-semibold text-white">{activity.info}</p>
                    <p className="text-xs text-gray-500">{activity.type} • {activity.time}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-medical-400 bg-medical-900/30 px-2 py-1 rounded">
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default Dashboard;
