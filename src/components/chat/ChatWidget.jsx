import { useState } from 'react';
import { MessageCircle, X, Send, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '¡Hola! Bienvenido a la Clínica Dr. William Cruz. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickReplies = [
    { id: 1, text: 'Agendar una cita', icon: '📅' },
    { id: 2, text: 'Servicios disponibles', icon: '🏥' },
    { id: 3, text: 'Horarios de atención', icon: '🕐' },
    { id: 4, text: 'Ubicación', icon: '📍' }
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');

      // Simular respuesta del bot
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: 'Gracias por tu mensaje. Un representante te contactará pronto. Mientras tanto, puedes llamarnos al +506 8820-2058 o escribirnos a info@clinicawilliamcruz.com',
          sender: 'bot',
          time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleQuickReply = (reply) => {
    const newMessage = {
      id: messages.length + 1,
      text: reply.text,
      sender: 'user',
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);

    // Respuestas automáticas según la opción
    setTimeout(() => {
      let responseText = '';
      switch (reply.id) {
        case 1:
          responseText = 'Para agendar una cita, puedes hacerlo en línea en nuestra sección de Citas o llamarnos al +506 8820-2058. ¿Te gustaría que te redirija a la página de citas?';
          break;
        case 2:
          responseText = 'Ofrecemos servicios de Medicina General, Especialidades, Telemedicina, Laboratorio y más. ¿Sobre qué servicio te gustaría saber más?';
          break;
        case 3:
          responseText = 'Nuestro horario es: Lunes a Viernes de 8:00 AM a 6:00 PM, Sábados de 9:00 AM a 2:00 PM. Domingos cerrado.';
          break;
        case 4:
          responseText = 'Estamos ubicados en San José, Costa Rica, Av. Central, Calle 14. ¿Necesitas indicaciones específicas?';
          break;
        default:
          responseText = '¿En qué más puedo ayudarte?';
      }
      
      const botResponse = {
        id: messages.length + 2,
        text: responseText,
        sender: 'bot',
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Botón flotante */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white z-50 transition-shadow duration-300"
        style={{background: 'linear-gradient(135deg, #2c7873 0%, #6fb98f 100%)', boxShadow: '0 10px 30px rgba(44, 120, 115, 0.4)'}}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Ventana de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-slate-900/95 backdrop-blur-md border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
            style={{borderColor: 'rgba(44, 120, 115, 0.4)', boxShadow: '0 25px 50px rgba(44, 120, 115, 0.25)'}}
          >
            {/* Header */}
            <div className="p-4 text-white border-b" style={{background: 'linear-gradient(90deg, #2c7873 0%, #6fb98f 100%)', borderBottomColor: 'rgba(44, 120, 115, 0.3)'}}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨‍⚕️</span>
                </div>
                <div>
                  <h3 className="font-semibold">Asistente Virtual</h3>
                  <p className="text-xs text-white/80">En línea • Responde en minutos</p>
                </div>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800/50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-md ${
                    message.sender === 'user' 
                      ? 'text-white' 
                      : 'bg-slate-700/80 text-gray-100 border'
                  }`}
                  style={message.sender === 'user' ? {
                    background: 'linear-gradient(135deg, #2c7873 0%, #246661 100%)',
                    boxShadow: '0 4px 15px rgba(44, 120, 115, 0.3)'
                  } : {
                    borderColor: 'rgba(44, 120, 115, 0.2)'
                  }}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Respuestas rápidas */}
              {messages.length <= 1 && (
                <div className="space-y-2 mt-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center mb-2">
                    Respuestas rápidas:
                  </p>
                  {quickReplies.map((reply) => (
                    <button
                      key={reply.id}
                      onClick={() => handleQuickReply(reply)}
                      className="w-full text-left px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                    >
                      {reply.icon} {reply.text}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-slate-900/95 border-t" style={{borderTopColor: 'rgba(44, 120, 115, 0.3)'}}>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 px-4 py-2 bg-slate-800/50 border rounded-lg focus:outline-none focus:ring-2 text-gray-200 placeholder-gray-400 text-sm"
                  style={{borderColor: 'rgba(44, 120, 115, 0.3)'}}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2c7873';
                    e.target.style.boxShadow = '0 0 0 2px rgba(44, 120, 115, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(44, 120, 115, 0.3)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 text-white rounded-lg transition-all shadow-lg"
                  style={{background: 'linear-gradient(135deg, #2c7873 0%, #246661 100%)', boxShadow: '0 4px 15px rgba(44, 120, 115, 0.3)'}}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #246661 0%, #1e5450 100%)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(44, 120, 115, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #2c7873 0%, #246661 100%)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(44, 120, 115, 0.3)';
                  }}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>

              {/* Contacto directo */}
              <div className="flex items-center justify-center space-x-4 mt-3 text-xs text-gray-600 dark:text-gray-400">
                <a href="tel:+50688888888" className="flex items-center space-x-1 hover:text-primary-600 transition-colors">
                  <Phone className="w-3 h-3" />
                  <span>Llamar</span>
                </a>
                <span>•</span>
                <a href="mailto:info@clinicawilliamcruz.com" className="flex items-center space-x-1 hover:text-primary-600 transition-colors">
                  <Mail className="w-3 h-3" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
