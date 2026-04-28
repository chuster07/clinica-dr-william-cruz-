/**
 * Utility for robust API communication with n8n and other services.
 * Incorporates lessons from Portal Automatizaciones 2:
 * - Aggressive JSON parsing using Regex.
 * - Centralized error handling.
 * - Defensive data normalization.
 */

import toast from 'react-hot-toast';

const API_CONFIG = {
  RETRY_ATTEMPTS: 2,
  TIMEOUT: 15000,
};

/**
 * Extracts a JSON array/object from a potentially contaminated string response.
 * Useful when AI models include conversational text around the JSON.
 */
export const robustJSONParse = (input) => {
  if (typeof input !== 'string') return input;

  try {
    // Try normal parse first
    return JSON.parse(input);
  } catch {
    // Attempt to extract JSON array or object using Regex
    const jsonMatch = input.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (innerError) {
        console.error('Failed to parse extracted JSON:', innerError);
      }
    }
    return input; // Fallback to raw input
  }
};

/**
 * Generic robust fetch wrapper
 */
export const robustFetch = async (url, options = {}) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(id);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const rawData = await response.text();
    const data = robustJSONParse(rawData);

    return data;
  } catch (error) {
    clearTimeout(id);
    let message = 'Error de conexión. Por favor intenta de nuevo.';

    if (error.name === 'AbortError') {
      message = 'La solicitud tardó demasiado. Revisa tu conexión.';
    } else if (error.message.includes('HTTP Error')) {
      message = `Error del servidor: ${error.message}. Verifica el URL.`;
    } else if (error.message.includes('CORS') || error.message.includes('Fetch')) {
      message = 'Problema de red o seguridad (CORS). Contacta a soporte.';
    }

    toast.error(message);
    // Attach detail to error for parent handling
    const finalError = new Error(message);
    if (error.message.includes('Failed to fetch')) {
      finalError.detail = 'Problema de red o CORS (Solicitud bloqueada por el servidor)';
    } else {
      finalError.detail = message;
    }
    throw finalError;
  }
};

/**
 * Normalizes appointment data before sending to n8n
 */
export const normalizeAppointment = (data) => {
  // Splitting name into firstName and lastName for the workflow
  const nameParts = (data.name || '').trim().split(' ');
  const nombre = nameParts[0] || '';
  const apellido = nameParts.slice(1).join(' ') || '---';

  return {
    nombre: nombre,
    apellido: apellido,
    email: data.email || '',
    correo: data.email || '', // Compatibility fallback
    telefono: data.phone || '',
    fecha: data.date || '',
    hora: data.time || '',
    servicio: data.service || '',
    mensaje: data.notes || '',
    notas: data.notes || '', // Compatibility fallback
    fuente: 'web_react',
    estado: 'pendiente'
  };
};
