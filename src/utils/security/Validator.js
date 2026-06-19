/**
 * StrictValidator - Infrastructure Layer
 * Implements 'Sanitización de datos' and 'Validaciones estrictas'.
 * Prevents XSS, SQL Injection and data contamination.
 */

class StrictValidator {
    static sanitizeString(str) {
        if (typeof str !== 'string') return '';
        return str
            .trim()
            .replace(/<[^>]*>?/gm, '') // Remove HTML tags
            .replace(/['";]/g, '') // Basic SQL character filtering
            .replace(/--/g, '');
    }

    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    static validatePhone(phone) {
        // Basic international phone format
        const re = /^\+?[\d\s-]{7,15}$/;
        return re.test(String(phone));
    }

    /**
     * Cleans an entire object of data
     */
    static cleanObject(data) {
        const sanitized = {};
        Object.keys(data).forEach(key => {
            sanitized[key] = this.sanitizeString(data[key]);
        });
        return sanitized;
    }
}

export default StrictValidator;
