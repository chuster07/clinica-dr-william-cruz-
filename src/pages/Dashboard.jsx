import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Calendar, DollarSign, TrendingUp, Activity } from 'lucide-react';

const Dashboard = ({ isAuthenticated }) => {
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Administrativo</h1>
          <p className="text-gray-600 dark:text-gray-400">Panel de control y estadísticas</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
