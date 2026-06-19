/**
 * useAppointments - Application Layer (Hook)
 * Implements 'Control de estado eficiente' and 'SOLID'.
 * Decouples Appointments view from the data/logic logic.
 */

import { useState } from 'react';
import { appointmentService } from '../services/api/AppointmentService';
import StrictValidator from '../utils/security/Validator';
import toast from 'react-hot-toast';

export const useAppointments = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        servicio: 'General',
        fecha: '',
        time: '',
        mensaje: ''
    });

    const resetForm = () => {
        setFormData({
            nombre: '',
            correo: '',
            telefono: '',
            servicio: 'General',
            fecha: '',
            time: '',
            mensaje: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const submitAppointment = async () => {
        // 1. Sanitization (Skill: Sanitización de datos)
        const sanitizedData = StrictValidator.cleanObject(formData);

        // 2. Strict Validation (Skill: Validaciones estrictas)
        if (!sanitizedData.nombre || sanitizedData.nombre.length < 3) {
            toast.error('Por favor, ingresa un nombre válido.');
            return false;
        }
        if (!StrictValidator.validateEmail(sanitizedData.correo)) {
            toast.error('El formato del correo electrónico no es válido.');
            return false;
        }

        setLoading(true);
        try {
            // 3. Service Call (Skill: Separación de capas)
            await appointmentService.createAppointment(sanitizedData);

            toast.success('¡Cita solicitada con éxito!');
            resetForm();
            return true;
        } catch (error) {
            let errorMessage = 'Error al enviar la cita. Por favor intenta de nuevo.';

            if (error.status === 403) {
                errorMessage = 'Servidor en mantenimiento (Status 403). Contacte a la clínica.';
            } else if (error.message === 'DUPLICATE_REQUEST') {
                errorMessage = 'Petición en curso, por favor espera.';
            }

            toast.error(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        handleChange,
        submitAppointment
    };
};
