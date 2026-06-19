/**
 * Integración de Formulario de Contacto con N8N
 * Clínica Dr. William Cruz
 * 
 * INSTRUCCIONES:
 * 1. Reemplaza 'TU_URL_DE_N8N' con tu URL real de webhook
 * 2. Copia este código y reemplaza el event listener existente en index.html
 */

// URL del webhook de N8N (reemplaza con tu URL real)
const N8N_CONTACTO_WEBHOOK_URL = 'http://localhost:5678/webhook/contacto';

// Obtener el formulario de contacto
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(this);
        const data = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            mensaje: formData.get('mensaje')
        };
        
        // Validación básica
        if (!data.nombre || !data.email || !data.mensaje) {
            alert('Por favor complete todos los campos obligatorios');
            return;
        }
        
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Por favor ingrese un email válido');
            return;
        }
        
        // Mostrar loader
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        try {
            // Enviar a N8N
            const response = await fetch(N8N_CONTACTO_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                const result = await response.json();
                
                // Mostrar mensaje de éxito
                alert('✅ ¡Mensaje enviado exitosamente!\n\nLe responderemos en las próximas 24 horas.\n\nGracias por contactarnos.');
                
                // Limpiar formulario
                this.reset();
                
            } else {
                throw new Error('Error al procesar la solicitud');
            }
            
        } catch (error) {
            console.error('Error:', error);
            
            // Mostrar mensaje de error con fallback
            alert('❌ Hubo un problema al enviar su mensaje.\n\nPor favor contacte directamente:\n📞 2770-3198 / 8313-3198\n📧 drwilliamcruzperez@gmail.com');
            
        } finally {
            // Restaurar botón
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Contador de caracteres para el mensaje
const mensajeTextarea = document.getElementById('mensaje');
if (mensajeTextarea) {
    mensajeTextarea.addEventListener('input', function(e) {
        const maxLength = 500;
        const currentLength = e.target.value.length;
        
        // Crear o actualizar contador si no existe
        let counter = document.getElementById('mensaje-counter');
        if (!counter) {
            counter = document.createElement('small');
            counter.id = 'mensaje-counter';
            counter.style.display = 'block';
            counter.style.textAlign = 'right';
            counter.style.marginTop = '5px';
            counter.style.color = '#666';
            e.target.parentNode.appendChild(counter);
        }
        
        counter.textContent = `${currentLength} / ${maxLength} caracteres`;
        
        if (currentLength > maxLength) {
            counter.style.color = 'red';
            e.target.value = e.target.value.slice(0, maxLength);
        } else {
            counter.style.color = '#666';
        }
    });
}

console.log('✅ Integración N8N Contacto cargada correctamente');
