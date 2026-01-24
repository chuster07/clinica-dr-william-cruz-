// Navegación móvil
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Navegación suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Ajuste para la navbar fija
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar con scroll
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'var(--glass-bg)';
            navbar.style.backdropFilter = 'var(--glass-blur)';
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.backgroundColor = 'var(--glass-bg)';
            navbar.style.backdropFilter = 'var(--glass-blur)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Animación de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    document.querySelectorAll('.service-card, .testimonial-item, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Integración con N8N - Formulario de contacto
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        const N8N_CONTACTO_URL = 'https://c19-ef2.aiagent777.co/webhook/contacto';

        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Validación básica
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
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

            // Obtener datos del formulario
            const formData = new FormData(this);
            const inputs = this.querySelectorAll('input, select, textarea');
            const data = {
                nombre: inputs[0].value,
                email: inputs[1].value,
                telefono: inputs[2].value,
                mensaje: inputs[4].value
            };

            // Mostrar loader
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;

            try {
                const response = await fetch(N8N_CONTACTO_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('✅ ¡Gracias! Su mensaje ha sido enviado. Nos pondremos en contacto con usted pronto.');
                    this.reset();
                } else {
                    throw new Error('Error al enviar');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('❌ Hubo un problema. Por favor llame al 2770-3198 o escriba a clinica@drwilliamcruz.com');
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Contador animado para estadísticas
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }

        updateCounter();
    }

    // Activar contadores cuando sean visibles
    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observar elementos con contadores
    document.querySelectorAll('[data-target]').forEach(el => {
        counterObserver.observe(el);
    });

    // Galería de testimonios (si existe)
    const testimonials = document.querySelectorAll('.testimonial-item');
    if (testimonials.length > 0) {
        let currentIndex = 0;

        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
        }

        // Mostrar primer testimonio
        showTestimonial(0);

        // Auto-rotación cada 5 segundos
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    }

    // Efecto parallax suave para el hero
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Lazy loading para imágenes
    const imageObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Tooltip para información adicional
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        element.addEventListener('mouseenter', function () {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });

        element.addEventListener('mouseleave', function () {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

    // Estilos para tooltip
    const tooltipStyles = document.createElement('style');
    tooltipStyles.textContent = `
        .tooltip {
            position: fixed;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 14px;
            z-index: 10000;
            pointer-events: none;
            white-space: nowrap;
        }
        
        .tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
        }
    `;
    document.head.appendChild(tooltipStyles);

    // Botón de "Volver arriba"
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    document.body.appendChild(backToTopButton);

    // Mostrar/ocultar botón de volver arriba
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });

    // Funcionalidad del botón volver arriba
    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Efecto hover para botón volver arriba
    backToTopButton.addEventListener('mouseenter', function () {
        this.style.background = 'var(--secondary-color)';
        this.style.transform = 'translateY(-2px)';
    });

    backToTopButton.addEventListener('mouseleave', function () {
        this.style.background = 'var(--primary-color)';
        this.style.transform = 'translateY(0)';
    });

    // Preloader (si existe)
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function () {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        });
    }

    // Validación de email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validación de teléfono
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    // Aplicar validaciones en tiempo real
    document.querySelectorAll('input[type="email"]').forEach(input => {
        input.addEventListener('blur', function () {
            if (this.value && !isValidEmail(this.value)) {
                this.style.borderColor = '#dc3545';
                this.setAttribute('title', 'Por favor, ingrese un email válido');
            } else {
                this.style.borderColor = '';
                this.removeAttribute('title');
            }
        });
    });

    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.addEventListener('blur', function () {
            if (this.value && !isValidPhone(this.value)) {
                this.style.borderColor = '#dc3545';
                this.setAttribute('title', 'Por favor, ingrese un teléfono válido');
            } else {
                this.style.borderColor = '';
                this.removeAttribute('title');
            }
        });
    });

    // Efecto de escritura para títulos (opcional)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Aplicar efecto de escritura al título principal si existe
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';

        const titleObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter(heroTitle, originalText, 50);
                    titleObserver.unobserve(entry.target);
                }
            });
        });

        titleObserver.observe(heroTitle);
    }

    console.log('Sitio web de la Clínica Dr. William Cruz cargado correctamente');
});
