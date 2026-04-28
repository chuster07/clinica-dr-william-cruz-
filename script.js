document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    // Menú móvil
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileMenu.setAttribute('aria-expanded', navMenu.classList.contains('active') ? 'true' : 'false');
        });

        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenu.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Scroll suave (solo hashes)
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href') || '';
            if (href.length <= 1) return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        });
    });

    // Navbar en scroll (con rAF para no saturar)
    let ticking = false;
    const onScroll = () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(() => {
            if (navbar) navbar.classList.toggle('is-scrolled', window.scrollY > 30);
            ticking = false;
        });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Animación de tarjetas en viewport
    const revealEls = document.querySelectorAll('.service-card, .testimonial-item, .contact-card');
    if (revealEls.length) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        revealEls.forEach((el) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(22px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // N8N: contacto
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        const N8N_CONTACTO_URL = 'https://c19-ef2.aiagent777.co/webhook/contacto';

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            requiredFields.forEach((field) => {
                if (!String(field.value || '').trim()) {
                    field.style.borderColor = '#dc3545';
                    isValid = false;
                } else {
                    field.style.borderColor = '';
                }
            });

            if (!isValid) {
                alert('Por favor, complete todos los campos requeridos.');
                return;
            }

            const formData = new FormData(contactForm);
            const data = {
                nombre: String(formData.get('nombre') || ''),
                email: String(formData.get('email') || ''),
                telefono: String(formData.get('telefono') || ''),
                servicio: String(formData.get('servicio') || ''),
                mensaje: String(formData.get('mensaje') || '')
            };

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton ? submitButton.textContent : '';
            if (submitButton) {
                submitButton.textContent = 'Enviando...';
                submitButton.disabled = true;
            }

            try {
                const response = await fetch(N8N_CONTACTO_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (!response.ok) throw new Error('Error al enviar');
                alert('✅ ¡Gracias! Su mensaje ha sido enviado. Nos pondremos en contacto con usted pronto.');
                contactForm.reset();
            } catch (error) {
                console.error('Error:', error);
                alert('❌ Hubo un problema. Por favor llame al 2770-3198 o escriba a clinica@drwilliamcruz.com');
            } finally {
                if (submitButton) {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }
            }
        });
    }

    // N8N: citas
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        const N8N_CITAS_URL = 'https://c19-ef2.aiagent777.co/webhook/citas-smart-v2';

        const dateInput = appointmentForm.querySelector('#preferredDate');
        if (dateInput) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            dateInput.setAttribute('min', today.toISOString().slice(0, 10));
        }

        appointmentForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const requiredFields = appointmentForm.querySelectorAll('[required]');
            let isValid = true;
            requiredFields.forEach((field) => {
                if (!String(field.value || '').trim()) {
                    field.style.borderColor = '#dc3545';
                    isValid = false;
                } else {
                    field.style.borderColor = '';
                }
            });

            if (!isValid) {
                alert('Por favor, complete todos los campos requeridos.');
                return;
            }

            const formData = new FormData(appointmentForm);
            const data = {
                nombre: `${formData.get('firstName') || ''} ${formData.get('lastName') || ''}`.trim(),
                email: String(formData.get('email') || ''),
                telefono: String(formData.get('phone') || ''),
                servicio: String(formData.get('service') || ''),
                fecha: String(formData.get('preferredDate') || ''),
                hora: String(formData.get('preferredTime') || ''),
                tipo_consulta: String(formData.get('consultationType') || ''),
                sintomas: String(formData.get('symptoms') || ''),
                informacion_adicional: String(formData.get('additionalInfo') || '')
            };

            const submitButton = appointmentForm.querySelector('button[type="submit"]');
            const originalHtml = submitButton ? submitButton.innerHTML : '';
            if (submitButton) {
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitButton.disabled = true;
            }

            try {
                const response = await fetch(N8N_CITAS_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (!response.ok) throw new Error('Error al enviar la cita');

                alert('✅ ¡Cita solicitada exitosamente!\n\nRecibirá confirmación por WhatsApp y correo electrónico en breve.\n\n¡Gracias por confiar en el Dr. William Cruz!');
                appointmentForm.reset();
            } catch (error) {
                console.error('Error:', error);
                alert('❌ Hubo un problema al procesar su solicitud.\n\nPor favor contacte directamente:\n📞 2770-3198\n📧 drwilliamcruzperez@gmail.com\n\nDisculpe las molestias.');
            } finally {
                if (submitButton) {
                    submitButton.innerHTML = originalHtml;
                    submitButton.disabled = false;
                }
            }
        });
    }

    // Slider simple de testimonios (si existe)
    const testimonials = document.querySelectorAll('.testimonial-item');
    if (testimonials.length > 1) {
        let currentIndex = 0;
        const show = (index) => {
            testimonials.forEach((t, i) => (t.style.display = i === index ? 'block' : 'none'));
        };
        show(0);
        window.setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            show(currentIndex);
        }, 6000);
    }

    console.log('Sitio web de la Clínica Dr. William Cruz cargado correctamente');
});

// Botón "Volver arriba" (sin estilos inline)
(() => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Volver arriba');
    btn.innerHTML = '<i class="fas fa-chevron-up" aria-hidden="true"></i>';
    document.body.appendChild(btn);

    const toggle = () => btn.classList.toggle('is-visible', window.scrollY > 300);
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
