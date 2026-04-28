/**
 * AppointmentService - Service Layer
 * Specializes in appointment operations.
 * Separation of Concerns: Handles the specifics of the n8n webhook communication.
 */

import BaseApiService from '../core/BaseApiService';

class AppointmentService extends BaseApiService {
    constructor() {
        super({
            baseUrl: 'https://c19-ef2.aiagent777.co', // URL Base del n8n Cloud
            timeout: 20000,
            maxRetries: 3
        });

        this.productionPath = '/webhook/smart-clinic-v3-final-fix';
        this.testPath = '/webhook-test/smart-clinic-v3-final-fix';
    }

    /**
     * Sends appointment data to the webhook
     * Applies the 'Manejo robusto de errores' skill.
     */
    async createAppointment(appointmentData) {
        this.log('info', 'Preparing to send appointment', {
            patient: appointmentData.nombre,
            service: appointmentData.servicio
        });

        return await this.request(this.productionPath, {
            method: 'POST',
            body: JSON.stringify(appointmentData)
        });
    }
}

// Singleton instance for SaaS performance and state management
export const appointmentService = new AppointmentService();
