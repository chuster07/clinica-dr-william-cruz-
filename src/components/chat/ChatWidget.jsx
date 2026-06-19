import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, Mail, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { sendMessage, extractAppointmentData } from '../../services/ai/OpenRouterService';
import { appointmentService } from '../../services/api/AppointmentService';

const MotionButton = motion.button;
const MotionDiv = motion.div;

const INITIAL_MESSAGE = {
    id: 1,
    text: 'Hola 👋 Soy Valeria, asistente virtual de la Clínica Dr. William Cruz.\n\nPuedo ayudarte con:\n🏥 Información médica y servicios\n👨‍⚕️ Especialidades y consultas\n📅 Agendar citas\n📍 Ubicación y horarios\n💬 Preguntas frecuentes\n\n¿En qué puedo ayudarte hoy?',
    sender: 'bot',
    time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
};

const QUICK_REPLIES = [
    { id: 1, text: 'Quiero agendar una cita', icon: '📅' },
    { id: 2, text: '¿Qué servicios tienen?', icon: '🏥' },
    { id: 3, text: '¿Cuál es el horario?', icon: '🕐' },
    { id: 4, text: '¿Dónde están ubicados?', icon: '📍' }
];

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll al último mensaje
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus input cuando se abre
    useEffect(() => {
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 200);
    }, [isOpen]);

    // Convierte el historial al formato que espera OpenRouter
    const buildHistory = (msgs) =>
        msgs
            .filter(m => m.id !== 1) // excluye el mensaje inicial hardcoded
            .map(m => ({
                role: m.sender === 'user' ? 'user' : 'assistant',
                content: m.text
            }));

    const addMessage = (text, sender) => {
        const msg = {
            id: Date.now(),
            text,
            sender,
            time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, msg]);
        return msg;
    };

    const handleSend = async (text) => {
        const trimmed = (text || inputMessage).trim();
        if (!trimmed || isLoading) return;

        setInputMessage('');
        addMessage(trimmed, 'user');
        setIsLoading(true);

        try {
            // Construye historial incluyendo el nuevo mensaje del usuario
            const history = [
                ...buildHistory(messages),
                { role: 'user', content: trimmed }
            ];

            const aiResponse = await sendMessage(history);
            const { clean, appointmentData } = extractAppointmentData(aiResponse);

            addMessage(clean, 'bot');

            // Si la IA recopiló todos los datos, envía la cita
            if (appointmentData) {
                try {
                    await appointmentService.createAppointment(appointmentData);
                    toast.success('¡Cita registrada con éxito! Te contactaremos pronto.');
                } catch {
                    toast.error('No se pudo registrar la cita. Por favor llámanos al +506 8820-2058.');
                }
            }
        } catch (error) {
            console.error('Chat AI error:', error);
            addMessage('Lo siento, tuve un problema técnico. Por favor llámanos al +506 8820-2058 o intenta de nuevo.', 'bot');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const showQuickReplies = messages.length <= 1;

    return (
        <>
            {/* Botón flotante */}
            <MotionButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white z-50"
                style={{ background: 'linear-gradient(135deg, #2c7873 0%, #6fb98f 100%)', boxShadow: '0 10px 30px rgba(44, 120, 115, 0.4)' }}
                aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </MotionButton>

            {/* Ventana de chat */}
            <AnimatePresence>
                {isOpen && (
                    <MotionDiv
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 w-96 bg-slate-900/95 backdrop-blur-md border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
                        style={{
                            height: '520px',
                            borderColor: 'rgba(44, 120, 115, 0.4)',
                            boxShadow: '0 25px 50px rgba(44, 120, 115, 0.25)'
                        }}
                    >
                        {/* Header */}
                        <div
                            className="p-4 text-white border-b flex-shrink-0"
                            style={{ background: 'linear-gradient(90deg, #2c7873 0%, #6fb98f 100%)', borderBottomColor: 'rgba(44, 120, 115, 0.3)' }}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow">
                                    👩‍⚕️
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">Valeria — Asistente Virtual</h3>
                                    <div className="flex items-center space-x-1">
                                        <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                                        <p className="text-xs text-white/80">Con IA · Responde al instante</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mensajes */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-800/50">
                            {messages.map((message) => (
                                <MotionDiv
                                    key={message.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[82%] rounded-2xl px-4 py-2 shadow-md ${
                                            message.sender === 'user'
                                                ? 'text-white'
                                                : 'bg-slate-700/80 text-gray-100 border border-slate-600/40'
                                        }`}
                                        style={message.sender === 'user' ? {
                                            background: 'linear-gradient(135deg, #2c7873 0%, #246661 100%)',
                                            boxShadow: '0 4px 15px rgba(44, 120, 115, 0.3)'
                                        } : {}}
                                    >
                                        <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                                        <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/60' : 'text-gray-500'}`}>
                                            {message.time}
                                        </p>
                                    </div>
                                </MotionDiv>
                            ))}

                            {/* Typing indicator */}
                            {isLoading && (
                                <MotionDiv
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-slate-700/80 border border-slate-600/40 rounded-2xl px-4 py-3 flex items-center space-x-2">
                                        <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#6fb98f' }} />
                                        <span className="text-xs text-gray-400">Valeria está escribiendo...</span>
                                    </div>
                                </MotionDiv>
                            )}

                            {/* Respuestas rápidas */}
                            {showQuickReplies && !isLoading && (
                                <div className="space-y-2 pt-1">
                                    <p className="text-xs text-gray-500 text-center">Accesos rápidos:</p>
                                    {QUICK_REPLIES.map((reply) => (
                                        <button
                                            key={reply.id}
                                            onClick={() => handleSend(reply.text)}
                                            className="w-full text-left px-4 py-2 bg-slate-700/50 border border-slate-600/40 rounded-xl hover:border-teal-500/50 hover:bg-slate-700 transition-all text-sm text-gray-300"
                                        >
                                            {reply.icon} {reply.text}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-slate-900/95 border-t flex-shrink-0" style={{ borderTopColor: 'rgba(44, 120, 115, 0.3)' }}>
                            <div className="flex items-center space-x-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Escribe tu mensaje..."
                                    disabled={isLoading}
                                    className="flex-1 px-4 py-2 bg-slate-800/60 border rounded-xl text-gray-200 placeholder-gray-500 text-sm focus:outline-none disabled:opacity-50"
                                    style={{ borderColor: 'rgba(44, 120, 115, 0.3)' }}
                                    onFocus={(e) => e.target.style.borderColor = '#2c7873'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(44, 120, 115, 0.3)'}
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={isLoading || !inputMessage.trim()}
                                    className="p-2 text-white rounded-xl transition-all disabled:opacity-40"
                                    style={{ background: 'linear-gradient(135deg, #2c7873 0%, #246661 100%)' }}
                                    aria-label="Enviar mensaje"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Contacto directo */}
                            <div className="flex items-center justify-center space-x-4 mt-3 text-xs text-gray-500">
                                <a href="tel:+50688202058" className="flex items-center space-x-1 hover:text-teal-400 transition-colors">
                                    <Phone className="w-3 h-3" />
                                    <span>Llamar</span>
                                </a>
                                <span>·</span>
                                <a href="mailto:info@clinicawilliamcruz.com" className="flex items-center space-x-1 hover:text-teal-400 transition-colors">
                                    <Mail className="w-3 h-3" />
                                    <span>Email</span>
                                </a>
                            </div>
                        </div>
                    </MotionDiv>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatWidget;
