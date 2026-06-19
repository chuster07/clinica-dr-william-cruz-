/**
 * OpenRouterService — AI chat via OpenRouter API
 * Model: configurable via VITE_OPENROUTER_MODEL env var
 */

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const MODEL = import.meta.env.VITE_OPENROUTER_MODEL || 'meta-llama/llama-3.1-8b-instruct:free';

// System prompt: contexto completo de la clínica
const SYSTEM_PROMPT = `Eres la recepcionista virtual de la Clínica Dr. William Cruz, ubicada en San José, Costa Rica (Av. Central, Calle 14). Tu nombre es "Valeria".

INFORMACIÓN DE LA CLÍNICA:
- Teléfono: +506 8820-2058
- Email: info@clinicawilliamcruz.com
- Horario: Lunes a Viernes 8:00 AM - 6:00 PM | Sábados 9:00 AM - 2:00 PM | Domingos cerrado
- Servicios: Medicina General, Cardiología, Pediatría, Dermatología, Neurología, Traumatología, Oftalmología, Laboratorio, Telemedicina, Farmacia

ESPECIALISTAS SEGÚN DOLENCIA (usa esto para sugerir):
- Dolor de cabeza, migraña, mareos, convulsiones → Neurología
- Corazón, presión alta, palpitaciones, dolor en el pecho → Cardiología  
- Niños, bebés, fiebre en menores → Pediatría
- Piel, acné, manchas, alergias cutáneas → Dermatología
- Huesos, fracturas, dolores musculares, esguinces → Traumatología
- Vista, ojos, visión borrosa → Oftalmología
- Análisis de sangre, orina, cultivos → Laboratorio
- Cualquier otro malestar general → Medicina General

FLUJO PARA AGENDAR CITA:
Cuando el usuario quiera agendar, recoge estos datos UNO POR UNO de forma natural:
1. Nombre completo
2. Teléfono
3. Correo electrónico
4. Motivo o dolencia (para sugerir especialidad)
5. Fecha preferida
6. Hora preferida (mañana/tarde o específica)

Cuando tengas TODOS los datos, responde con este JSON exacto al final de tu mensaje (después de confirmar al usuario):
[CITA_DATOS]{"nombre":"...","telefono":"...","correo":"...","servicio":"...","fecha":"...","hora":"...","mensaje":"..."}[/CITA_DATOS]

REGLAS IMPORTANTES:
- Responde SIEMPRE en español
- Sé amable, breve y directo — máximo 3 líneas por respuesta
- NO des diagnósticos médicos, solo sugiere la especialidad
- Si la situación es urgente/emergencia, indica llamar al +506 8820-2058 inmediatamente
- No inventes información que no está en este contexto
- Si no sabes algo, di "Te recomiendo llamarnos al +506 8820-2058"`;

/**
 * Sends conversation history to OpenRouter and returns AI response
 * @param {Array} messages - [{role: 'user'|'assistant', content: string}]
 * @returns {Promise<string>} - AI response text
 */
export const sendMessage = async (messages) => {
    const response = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://clinica-dr-william-cruz.vercel.app',
            'X-Title': 'Clínica Dr. William Cruz'
        },
        body: JSON.stringify({
            model: MODEL,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...messages
            ],
            max_tokens: 300,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`OpenRouter error ${response.status}: ${err}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'Lo siento, no pude procesar tu mensaje. Por favor intenta de nuevo.';
};

/**
 * Extracts appointment data from AI response if present
 * @param {string} text - AI response text
 * @returns {{ clean: string, appointmentData: object|null }}
 */
export const extractAppointmentData = (text) => {
    const match = text.match(/\[CITA_DATOS\]([\s\S]*?)\[\/CITA_DATOS\]/);
    if (!match) return { clean: text, appointmentData: null };

    try {
        const appointmentData = JSON.parse(match[1]);
        const clean = text.replace(/\[CITA_DATOS\][\s\S]*?\[\/CITA_DATOS\]/, '').trim();
        return { clean, appointmentData };
    } catch {
        return { clean: text, appointmentData: null };
    }
};
