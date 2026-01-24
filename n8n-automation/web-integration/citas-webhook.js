/**
 * Integración de Formulario de Citas con N8N
 * Clínica Dr. William Cruz
 * 
 * INSTRUCCIONES:
 * 1. Reemplaza 'TU_URL_DE_N8N' con tu URL real de webhook
 * 2. Copia este código y reemplaza el event listener existente en citas.html
 */

// URL del webhook de N8N (reemplaza con tu URL real)
const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/citas';

// Obtener el formulario
const appointmentForm = document.getElementById('appointmentForm');

if (appointmentForm) {
    appointmentForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(this);
        const data = {
            nombre: formData.get('nombre'),
            apellido: formData.get('apellido'),
            telefono: formData.get('telefono'),
            email: formData.get('email'),
            fecha: formData.get('fecha'),
            hora: formData.get('hora'),
            servicio: formData.get('servicio'),
            mensaje: formData.get('mensaje') || ''
        };
        
        // Validación básica
        if (!data.nombre || !data.telefono || !data.email || !data.fecha || !data.hora) {
            alert('Por favor complete todos los campos obligatorios');
            return;
        }
        
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Por favor ingrese un email válido');
            return;
        }
        
        // Validar teléfono (8 dígitos para Costa Rica)
        const telefonoRegex = /^[0-9]{8}$/;
        if (!telefonoRegex.test(data.telefono.replace(/[^0-9]/g, ''))) {
            alert('Por favor ingrese un teléfono válido (8 dígitos)');
            return;
        }
        
        // Mostrar loader
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        try {
            // Enviar a N8N
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                const result = await response.json();
                
                // Mostrar mensaje de éxito
                alert('✅ ¡Cita registrada exitosamente!\n\nRecibirá confirmación por WhatsApp y Email en los próximos minutos.\n\n¡Gracias por confiar en nosotros!');
                
                // Limpiar formulario
                this.reset();
                
                // Opcional: Redirigir a página de confirmación
                // window.location.href = '/confirmacion.html';
                
            } else {
                throw new Error('Error al procesar la solicitud');
            }
            
        } catch (error) {
            console.error('Error:', error);
            
            // Mostrar mensaje de error con fallback
            alert('❌ Hubo un problema al enviar su solicitud.\n\nPor favor contacte directamente:\n📞 2770-3198 / 8313-3198\n📧 drwilliamcruzperez@gmail.com\n\nDisculpe las molestias.');
            
        } finally {
            // Restaurar botón
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

/**
 * VALIDACIONES ADICIONALES (Opcional)
 * Puedes agregar estas validaciones en tiempo real
 */

// Validación de fecha (no permitir fechas pasadas)
const fechaInput = document.getElementById('fecha');
if (fechaInput) {
    const today = new Date().toISOString().split('T')[0];
    fechaInput.setAttribute('min', today);
}

// Formatear teléfono mientras se escribe
const telefonoInput = document.getElementById('telefono');
if (telefonoInput) {
    telefonoInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length > 8) value = value.slice(0, 8);
        
        // Formato: 8888-8888
        if (value.length > 4) {
            value = value.slice(0, 4) + '-' + value.slice(4);
        }
        
        e.target.value = value;
    });
}

// Validación de email en tiempo real
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function(e) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (e.target.value && !emailRegex.test(e.target.value)) {
            e.target.style.borderColor = 'red';
            alert('Por favor ingrese un email válido');
        } else {
            e.target.style.borderColor = '';
        }
    });
}

console.log('✅ Integración N8N cargada correctamente');
