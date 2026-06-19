/**
 * BaseApiService - Infrastructure Layer
 * Implements SOLID principles and Robust Error Handling.
 * - Handles auto-retries with exponential backoff.
 * - Structured JSON logging for production monitoring.
 * - Request deduplication to prevent spam/duplicate submissions.
 */

class BaseApiService {
    constructor(config = {}) {
        this.baseUrl = config.baseUrl || '';
        this.timeout = config.timeout || 15000;
        this.maxRetries = config.maxRetries || 2;
        this.pendingRequests = new Set();
    }

    /**
     * Structured logger implementing SaaS standards
     */
    log(level, message, context = {}) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            level: level.toUpperCase(),
            message,
            ...context
        };

        if (level === 'error') {
            console.error('[API_SERVICE_AUDIT]', JSON.stringify(logEntry, null, 2));
        } else {
            console.log('[API_SERVICE_AUDIT]', JSON.stringify(logEntry));
        }
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const requestId = `${options.method || 'GET'}:${url}:${JSON.stringify(options.body || '')}`;

        // Prevención de llamadas duplicadas (Skill: Protección contra abuso)
        if (this.pendingRequests.has(requestId)) {
            this.log('warn', 'Request deduplicated', { url });
            return Promise.reject(new Error('DUPLICATE_REQUEST'));
        }

        this.pendingRequests.add(requestId);

        let attempt = 0;
        const execute = async () => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            try {
                this.log('info', 'Executing API request', { url, attempt });

                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Source': 'Clinica-SaaS-Portal',
                        ...options.headers,
                    },
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    const errorDetail = await response.text();
                    throw {
                        status: response.status,
                        message: `HTTP Error: ${response.status}`,
                        detail: errorDetail
                    };
                }

                const data = await response.json().catch(() => ({}));
                this.log('info', 'Request Success', { url });
                return data;

            } catch (error) {
                clearTimeout(timeoutId);

                const isRetryable = attempt < this.maxRetries &&
                    (error.status >= 500 || error.name === 'AbortError' || error.message.includes('Failed to fetch'));

                if (isRetryable) {
                    attempt++;
                    const delay = Math.pow(2, attempt) * 1000;
                    this.log('warn', 'Retrying request', { url, attempt, delay });
                    await new Promise(r => setTimeout(r, delay));
                    return execute();
                }

                this.log('error', 'Critical API Failure', { url, error });
                throw error;
            } finally {
                this.pendingRequests.delete(requestId);
            }
        };

        return execute();
    }
}

export default BaseApiService;
