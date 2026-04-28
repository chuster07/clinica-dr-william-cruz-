import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const LegalPage = ({ title, content }) => (
    <div className="min-h-screen py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card prose prose-invert max-w-none"
            >
                <h1 className="text-3xl font-bold mb-6 text-white">{title}</h1>
                <div className="text-gray-300 space-y-4">
                    {content.map((text, i) => <p key={i}>{text}</p>)}
                </div>
            </MotionDiv>
        </div>
    </div>
);

export const Privacy = () => (
    <LegalPage
        title="Política de Privacidad"
        content={[
            "En la Clínica Dr. William Cruz, la privacidad de nuestros pacientes es nuestra prioridad.",
            "Recopilamos datos personales solo para fines de agendamiento y atención médica.",
            "Sus datos están protegidos bajo las leyes locales e internacionales de protección de datos médicos."
        ]}
    />
);

export const Terms = () => (
    <LegalPage
        title="Términos y Condiciones"
        content={[
            "Al utilizar nuestro sitio web, usted acepta cumplir con estos términos.",
            "Las citas agendadas están sujetas a disponibilidad y confirmación del personal de la clínica.",
            "La telemedicina no sustituye casos de emergencia crítica."
        ]}
    />
);

export const Cookies = () => (
    <LegalPage
        title="Política de Cookies"
        content={[
            "Utilizamos cookies para mejorar su experiencia de navegación.",
            "Preferencias de sesión como el Modo Oscuro se guardan localmente para su conveniencia.",
            "Usted puede desactivar las cookies en la configuración de su navegador."
        ]}
    />
);
