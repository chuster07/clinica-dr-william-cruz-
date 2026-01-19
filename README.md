# 🏥 Clínica Dr. William Cruz - Aplicación React Moderna

Una aplicación web completa y profesional para la gestión de clínica médica con funcionalidades avanzadas de telemedicina, portal de pacientes, sistema de citas y más.

![React](https://img.shields.io/badge/React-18.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff)
![License](https://img.shields.io/badge/License-Proprietary-red)

## ✨ Características Principales

### 🎯 Funcionalidades Core
- ✅ **Sistema de Citas en Línea** - Calendario interactivo para agendar citas médicas
- ✅ **Telemedicina Avanzada** - Consultas médicas por videollamada en tiempo real
- ✅ **Portal de Pacientes** - Acceso seguro a historial médico, resultados de laboratorio y recetas
- ✅ **Chat en Vivo** - Asistente virtual con respuestas automáticas y soporte en tiempo real
- ✅ **Blog de Salud** - Recursos educativos y artículos médicos
- ✅ **Dashboard Administrativo** - Panel de control con estadísticas y métricas

### 🚀 Características Avanzadas
- 🌙 **Modo Oscuro** - Tema oscuro/claro con persistencia de preferencias
- 📱 **100% Responsivo** - Diseño adaptable para móviles, tablets y desktop
- 🔔 **Sistema de Notificaciones** - Recordatorios de citas y alertas personalizadas
- 💳 **Pagos en Línea** - Sistema seguro de facturación y procesamiento de pagos
- 💬 **Integración WhatsApp** - Contacto directo mediante WhatsApp
- ♿ **Accesibilidad WCAG** - Navegación por teclado y soporte para lectores de pantalla
- ⚡ **Optimización SEO** - Meta tags, Open Graph y rendimiento optimizado
- 🎨 **Animaciones Fluidas** - Transiciones y efectos con Framer Motion
- 🔒 **Seguridad** - Validación de formularios y preparado para autenticación JWT

## 🛠️ Stack Tecnológico

```
Frontend Framework:
├── React 18.2          - Biblioteca principal UI
├── Vite 5.0           - Build tool y dev server
└── React Router 6     - Navegación SPA

Estilos:
├── Tailwind CSS 4.0   - Framework CSS utility-first
├── Framer Motion      - Animaciones y transiciones
└── Lucide React       - Librería de iconos

Estado y Datos:
├── React Hooks        - useState, useEffect, custom hooks
├── Axios              - Cliente HTTP
└── React Hot Toast    - Sistema de notificaciones

Optimización:
├── Lazy Loading       - Carga diferida de componentes
├── Code Splitting     - División automática del código
└── SEO Optimizado     - Meta tags dinámicos
```

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación Rápida

```bash
# Clonar el repositorio
cd Clinica-Dr-William-Cruz/clinica-react-app

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:5173
```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Crea build optimizado para producción
npm run preview      # Preview del build de producción

# Linting
npm run lint         # Ejecuta ESLint para verificar el código
```

## 🎨 Estructura del Proyecto

```
clinica-react-app/
├── public/                  # Archivos estáticos
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── layout/        # Navbar, Footer
│   │   ├── chat/          # Sistema de chat en vivo
│   │   ├── social/        # Integración redes sociales
│   │   ├── notifications/ # Sistema de notificaciones
│   │   ├── payments/      # Formularios de pago
│   │   ├── accessibility/ # Componentes de accesibilidad
│   │   └── seo/          # SEO y meta tags
│   ├── pages/             # Páginas de la aplicación
│   │   ├── Home.jsx
│   │   ├── Appointments.jsx
│   │   ├── Services.jsx
│   │   ├── Telemedicine.jsx
│   │   ├── PatientPortal.jsx
│   │   ├── Blog.jsx
│   │   ├── Contact.jsx
│   │   └── Dashboard.jsx
│   ├── utils/             # Funciones auxiliares
│   ├── App.jsx            # Componente raíz
│   ├── main.jsx          # Punto de entrada
│   └── index.css         # Estilos globales
├── tailwind.config.js    # Configuración Tailwind
├── vite.config.js        # Configuración Vite
└── package.json          # Dependencias y scripts
```

## 🎯 Páginas y Funcionalidades

### 🏠 Home
- Hero section con llamadas a acción
- Características principales
- Servicios destacados
- Testimonios de pacientes
- Sección CTA final

### 📅 Sistema de Citas
- Formulario de reserva
- Selección de servicio
- Calendario de disponibilidad
- Selección de horarios
- Confirmación por email

### 🏥 Servicios
- Medicina General
- Cardiología
- Pediatría
- Laboratorio
- Oftalmología
- Traumatología
- Neurología
- Farmacia

### 🎥 Telemedicina
- Selección de médico disponible
- Videoconsulta en tiempo real
- Chat integrado
- Historial de consultas

### 👤 Portal de Pacientes
- Login seguro
- Historial médico
- Resultados de laboratorio
- Gestión de citas
- Facturación

### 📝 Blog
- Artículos de salud
- Consejos médicos
- Noticias y actualizaciones
- Categorías organizadas

### 📞 Contacto
- Formulario de contacto
- Información de ubicación
- Horarios de atención
- Mapa interactivo (preparado)

### 📊 Dashboard
- Estadísticas en tiempo real
- Métricas de pacientes
- Ingresos
- Satisfacción del cliente

## 🌐 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Netlify

```bash
# Build
npm run build

# Deploy carpeta dist/
netlify deploy --prod --dir=dist
```

### Otras Opciones
- **AWS Amplify** - Integración completa con AWS
- **Firebase Hosting** - Rápido y confiable
- **GitHub Pages** - Gratis para proyectos públicos

## 📱 Diseño Responsive

| Breakpoint | Dimensión | Descripción |
|------------|-----------|-------------|
| Mobile     | < 768px   | Diseño móvil optimizado |
| Tablet     | 768px - 1024px | Vista tablet |
| Desktop    | > 1024px  | Vista desktop completa |

## ⚙️ Configuración

### Variables de Entorno

Crear un archivo `.env` basado en `.env.example`:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_API_KEY=your_api_key_here

# WhatsApp Configuration
VITE_WHATSAPP_NUMBER=50688888888

# Analytics
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X

# Environment
VITE_ENV=production
```

## 🔒 Seguridad

- ✅ Validación de formularios en frontend
- ✅ Sanitización de inputs
- ✅ HTTPS requerido en producción
- ✅ Preparado para autenticación JWT
- ✅ Protección CSRF (preparado)
- ✅ Rate limiting (preparado para backend)

## 🎨 Personalización

### Colores del Tema

Los colores pueden personalizarse en `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
  },
  medical: {
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
  }
}
```

## 📈 Roadmap

- [ ] Integración con backend real (API REST)
- [ ] Autenticación completa (OAuth 2.0, JWT)
- [ ] Videollamadas reales (WebRTC/Agora)
- [ ] Sistema de pagos real (Stripe/PayPal)
- [ ] PWA (Progressive Web App)
- [ ] Notificaciones push
- [ ] Tests unitarios (Jest/React Testing Library)
- [ ] Tests E2E (Cypress/Playwright)
- [ ] Documentación API
- [ ] CI/CD Pipeline

## 🐛 Solución de Problemas

### Error: Cannot apply unknown utility class

Si encuentras errores con Tailwind CSS, asegúrate de que `@tailwindcss/postcss` esté instalado:

```bash
npm install -D @tailwindcss/postcss
```

### El servidor no inicia

Verifica que el puerto 5173 no esté en uso:

```bash
# Windows
netstat -ano | findstr :5173

# macOS/Linux
lsof -i :5173
```

## 📄 Licencia

Este proyecto es propiedad de la Clínica Dr. William Cruz. Todos los derechos reservados.

## 👥 Contacto

**Clínica Dr. William Cruz**
- 📧 Email: info@clinicawilliamcruz.com
- 📱 Teléfono: +506 8888-8888
- 📍 Dirección: San José, Costa Rica, Av. Central, Calle 14
- 🌐 Web: www.clinicawilliamcruz.com

---

Desarrollado con ❤️ usando React y las mejores prácticas de desarrollo web moderno.

© 2026 Clínica Dr. William Cruz. Todos los derechos reservados.
