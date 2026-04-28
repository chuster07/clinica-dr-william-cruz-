import { useState } from 'react';
import { Bell, X, Calendar, MessageCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationSystem = () => {
  const MotionDiv = motion.div;
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      title: 'Recordatorio de Cita',
      message: 'Tienes una cita mañana a las 10:00 AM con el Dr. William Cruz',
      time: '2 horas',
      read: false
    },
    {
      id: 2,
      type: 'message',
      title: 'Nuevo Mensaje',
      message: 'El Dr. Cruz te ha enviado un mensaje sobre tus resultados',
      time: '5 horas',
      read: false
    },
    {
      id: 3,
      type: 'alert',
      title: 'Resultados Disponibles',
      message: 'Tus resultados de laboratorio están listos',
      time: '1 día',
      read: true
    }
  ]);
  const [showPanel, setShowPanel] = useState(false);

  const getIcon = (type) => {
    switch (type) {
      case 'appointment': return Calendar;
      case 'message': return MessageCircle;
      case 'alert': return AlertCircle;
      default: return Bell;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {showPanel && (
          <MotionDiv
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-96 bg-slate-900/95 backdrop-blur-md border rounded-xl shadow-2xl overflow-hidden z-50"
            style={{borderColor: 'rgba(44, 120, 115, 0.4)', boxShadow: '0 25px 50px rgba(44, 120, 115, 0.25)'}}
          >
            <div className="p-4 border-b" style={{borderBottomColor: 'rgba(44, 120, 115, 0.3)', background: 'linear-gradient(90deg, rgba(44, 120, 115, 0.2) 0%, rgba(111, 185, 143, 0.2) 100%)'}}>
              <h3 className="text-lg font-semibold text-white">
                Notificaciones
              </h3>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  No tienes notificaciones
                </div>
              ) : (
                notifications.map((notification) => {
                  const Icon = getIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 border-b hover:bg-slate-800/50 transition-colors ${
                        !notification.read ? 'border-l-4' : ''
                      }`}
                      style={{
                        borderBottomColor: 'rgba(44, 120, 115, 0.1)',
                        ...((!notification.read) && {
                          background: 'rgba(44, 120, 115, 0.15)',
                          borderLeftColor: '#2c7873'
                        })
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <Icon className="w-5 h-5" style={{color: '#2c7873'}} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-300 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Hace {notification.time}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="mt-2 text-xs hover:underline"
                          style={{color: '#6fb98f'}}
                          onMouseEnter={(e) => e.target.style.color = '#4ade80'}
                          onMouseLeave={(e) => e.target.style.color = '#6fb98f'}
                        >
                          Marcar como leída
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;
