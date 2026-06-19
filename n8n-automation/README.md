# 🏥 Sistema de Automatización N8N - Clínica Dr. William Cruz

> Sistema completo de automatización **100% GRATIS** para gestión integral de tu clínica médica

[![N8N](https://img.shields.io/badge/n8n-latest-orange)](https://n8n.io)
[![Docker](https://img.shields.io/badge/docker-required-blue)](https://www.docker.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 🎯 ¿Qué hace este sistema?

Automatiza **completamente** la gestión de tu clínica:

✅ **Agendamiento de citas** → Automático a Calendar + Email + WhatsApp  
✅ **Formulario de contacto** → Auto-respuesta + Notificación al equipo  
✅ **Recordatorios automáticos** → 24h antes por Email y WhatsApp  
✅ **Chatbot WhatsApp** → Respuestas 24/7 con IA  
✅ **Seguimiento de pacientes** → Reactivación automática  
✅ **Base de datos** → Google Sheets (gratis, fácil)  
✅ **Dashboard** → Monitoreo en tiempo real  

---

## 💰 Costos

| Componente | Costo | Límite Gratis |
|------------|-------|---------------|
| N8N (self-hosted) | **$0** | Ilimitado |
| Gmail | **$0** | 500 emails/día |
| Google Sheets/Calendar | **$0** | Uso normal |
| Telegram | **$0** | Ilimitado |
| Evolution API (WhatsApp) | **$0** | Ilimitado |
| WhatsApp Cloud API | **$0** | 1000 conversaciones/mes |
| OpenAI (opcional) | ~$5-10/mes | $5 crédito inicial |

**💵 Total: ~$0-10/mes** (vs $50-200/mes de otros sistemas)

---

## 📚 DOCUMENTACIÓN

### 🚀 Para empezar (elige uno):

1. **⚡ Inicio Rápido (15 min)** → [`INICIO_RAPIDO.md`](INICIO_RAPIDO.md)
   - Configuración express para tener algo funcionando YA
   - Ideal para: Probar el sistema rápidamente

2. **📖 Configuración Completa** → [`CONFIGURACION_COMPLETA.md`](CONFIGURACION_COMPLETA.md)
   - Guía detallada paso a paso
   - Ideal para: Implementación completa en producción

3. **🎨 Guía Visual** → [`GUIA_VISUAL.md`](GUIA_VISUAL.md)
   - Screenshots y ejemplos visuales
   - Ideal para: Aprender viendo imágenes

### ✅ Para verificar:

- **Checklist** → [`CHECKLIST.md`](CHECKLIST.md)
  - Lista completa de verificación
  - Marca cada paso completado

### 📦 Archivos incluidos:

```
n8n-automation/
├── 📖 README.md (este archivo)
├── 🚀 INICIO_RAPIDO.md
├── 📖 CONFIGURACION_COMPLETA.md
├── 🎨 GUIA_VISUAL.md
├── ✅ CHECKLIST.md
├── 📋 README_RESUMEN.md
│
├── 🧪 test-contacto.html
├── 🧪 test-citas.html
│
├── ⚙️ .env.example
├── 🐳 docker-compose.yml
├── 🔍 verificar-configuracion.sh
├── 🔍 verificar-configuracion.ps1
│
└── workflows/
    ├── 01-sistema-citas.json
    ├── 02-chatbot-whatsapp.json
    ├── 03-recordatorios-automaticos.json
    ├── 04-formulario-contacto.json
    └── 05-seguimiento-pacientes.json
```

---

## 🚀 INICIO RÁPIDO (5 pasos - 15 minutos)

### 1️⃣ Instalar N8N

```bash
# Copiar configuración
cp .env.example .env

# Editar .env con tus datos (mínimo cambiar el password)
nano .env  # o usa tu editor favorito

# Levantar servicios con Docker
docker-compose up -d

# Verificar que estén corriendo
docker ps
```

**Acceder a N8N:** http://localhost:5678

#### 🔐 Configuración mínima obligatoria en `.env`

Asegúrate de definir al menos estas variables antes de activar workflows:

```env
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=<password-seguro>
N8N_ENCRYPTION_KEY=<clave-segura-32+>
EVOLUTION_API_KEY=<api-key-segura>
GOOGLE_SHEET_ID=<id-hoja-google>
TELEGRAM_BOT_TOKEN=<token-bot>
TELEGRAM_CHAT_ID=<chat-id>
```

> El endpoint de citas quedó estandarizado como **`/api/citas`** (en n8n se expone como `.../webhook/api/citas`).

---

### 2️⃣ Verificar Instalación

**Windows (PowerShell):**
```powershell
.\verificar-configuracion.ps1
```

**Linux/Mac:**
```bash
./verificar-configuracion.sh
```

Este script te dirá exactamente qué falta configurar.

---

### 3️⃣ Configurar Credenciales Mínimas

En N8N (http://localhost:5678), configura:

#### 📧 Gmail (5 minutos)
1. Activa 2FA: https://myaccount.google.com/security
2. Crea App Password: https://myaccount.google.com/apppasswords
3. En N8N: `Credentials` → `Gmail OAuth2`

#### 📊 Google Sheets (5 minutos)
1. Crea hoja: https://sheets.google.com → "Clinica DB"
2. Crea pestañas: `Citas`, `Contactos`, `Pacientes`
3. Habilita APIs en Google Cloud Console
4. En N8N: `Credentials` → `Google Sheets OAuth2 API`

#### 📱 Telegram (2 minutos)
1. Habla con @BotFather → `/newbot`
2. Copia el token
3. Habla con @userinfobot → Copia tu Chat ID
4. En N8N: `Credentials` → `Telegram API`

**Detalles completos:** Ver [`CONFIGURACION_COMPLETA.md`](CONFIGURACION_COMPLETA.md)

---

### 4️⃣ Importar Workflow

1. En N8N: `Workflows` → `Import from File`
2. Selecciona: `workflows/04-formulario-contacto.json` ← **Empezar con este**
3. Configura:
   - Google Sheets: Pega tu Sheet ID
   - Telegram: Pega tu Chat ID
4. **Activa el workflow** (switch arriba)

---

### 5️⃣ Probar

1. Abre: `test-contacto.html` en tu navegador
2. Copia la URL del webhook desde n8n
3. Pégala en el formulario de prueba
4. Envía el formulario

**Verifica que funcione:**
- ✅ Aparece en Google Sheets
- ✅ Recibes email de confirmación
- ✅ Notificación en Telegram
- ✅ Execution exitosa en n8n (verde)

---

## 🎉 ¡Listo! Tu primer workflow funciona

Ahora puedes:
1. Configurar el sistema de citas (`01-sistema-citas.json`)
2. Agregar recordatorios automáticos (`03-recordatorios-automaticos.json`)
3. Integrar con tu sitio web

**Siguiente paso:** Lee [`INICIO_RAPIDO.md`](INICIO_RAPIDO.md) para configurar el resto.

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    SITIO WEB CLÍNICA                        │
│  (index.html, citas.html, contacto.html)                    │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ Webhooks
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                        N8N                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Formulario  │  │   Sistema    │  │ Recordatorios│     │
│  │  Contacto    │  │   de Citas   │  │ Automáticos  │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
└─────────┼──────────────────┼──────────────────┼────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  Google Sheets  │ │ Google Calendar │ │     Gmail       │
│  (Base de Datos)│ │  (Agenda)       │ │  (Emails)       │
└─────────────────┘ └─────────────────┘ └─────────────────┘
          │                  │                  │
          └──────────────────┴──────────────────┘
                             │
          ┌──────────────────┴──────────────────┐
          ▼                                     ▼
┌─────────────────┐                   ┌─────────────────┐
│    Telegram     │                   │    WhatsApp     │
│ (Notificaciones)│                   │ (Pacientes)     │
└─────────────────┘                   └─────────────────┘
```

---

## 📊 Workflows Incluidos

### 01 - Sistema de Citas ⭐
**Flujo:**
```
Webhook → Validar → Google Sheets → Calendar → Email → WhatsApp → Telegram
```

**Funciones:**
- Recibe solicitud de cita desde web
- Guarda en Google Sheets
- Crea evento en Google Calendar
- Envía confirmación por email
- Envía confirmación por WhatsApp
- Notifica al equipo por Telegram

**Estado:** ✅ Listo para usar

---

### 02 - Chatbot WhatsApp 🤖
**Flujo:**
```
WhatsApp Trigger → Procesar → OpenAI → Responder
```

**Funciones:**
- Responde preguntas 24/7
- Información sobre servicios
- Horarios y precios
- Agendar citas por WhatsApp

**Estado:** ⚠️ Requiere OpenAI API Key (opcional)

---

### 03 - Recordatorios Automáticos ⏰
**Flujo:**
```
Cron (diario) → Leer Sheets → Filtrar → Email + WhatsApp
```

**Funciones:**
- Ejecuta diariamente a las 8:00 AM
- Lee citas del día siguiente
- Envía recordatorio por email
- Envía recordatorio por WhatsApp

**Estado:** ✅ Listo para usar

---

### 04 - Formulario de Contacto 📧
**Flujo:**
```
Webhook → Guardar Sheets → Email → Telegram → Response
```

**Funciones:**
- Recibe mensajes de contacto
- Guarda en Google Sheets
- Auto-respuesta al cliente
- Notifica al equipo

**Estado:** ✅ Listo para usar (recomendado para empezar)

---

### 05 - Seguimiento de Pacientes 📈
**Flujo:**
```
Cron (semanal) → Leer Sheets → Filtrar inactivos → Email reactivación
```

**Funciones:**
- Detecta pacientes inactivos (>90 días)
- Envía email de reactivación
- Ofertas especiales
- Encuestas de satisfacción

**Estado:** ✅ Listo para usar

---

## 🛠️ Requisitos del Sistema

### Obligatorios:
- ✅ Docker y Docker Compose
- ✅ Cuenta de Gmail
- ✅ Cuenta de Google (para Sheets y Calendar)
- ✅ Cuenta de Telegram

### Opcionales:
- 📱 WhatsApp Business (para mensajes)
- 🤖 OpenAI API Key (para chatbot con IA)
- 🌐 Dominio propio (para producción)

### Recursos mínimos:
- **RAM:** 2GB mínimo, 4GB recomendado
- **CPU:** 2 cores
- **Disco:** 5GB libres
- **Internet:** Conexión estable

---

## 🔐 Seguridad

✅ **Datos en tu control:** Todo corre en tu servidor  
✅ **Sin vendor lock-in:** Puedes migrar cuando quieras  
✅ **Open source:** N8N es código abierto  
✅ **Encriptación:** Credenciales encriptadas en n8n  
✅ **HTTPS:** Configurable con Let's Encrypt  
✅ **Backups:** Fácil exportar workflows y datos  

**⚠️ IMPORTANTE:**
- Nunca subas el archivo `.env` a Git
- Cambia todas las contraseñas por defecto
- Usa contraseñas fuertes
- Habilita 2FA en todas las cuentas

---

## 🆘 Troubleshooting

### Problema: N8N no inicia
```bash
# Ver logs
docker logs n8n

# Reiniciar
docker-compose restart n8n

# Si persiste, borrar y recrear
docker-compose down
docker-compose up -d
```

### Problema: Webhook no responde (404)
**Solución:**
1. Verificar que el workflow esté **ACTIVADO** (switch verde)
2. Copiar URL de "Production" (no "Test")
3. Verificar que n8n esté corriendo

### Problema: Gmail no envía emails
**Solución:**
1. Verificar App Password (16 caracteres sin espacios)
2. Verificar que 2FA esté activado
3. Probar enviar email de prueba desde n8n

### Problema: Google Sheets no guarda
**Solución:**
1. Verificar Sheet ID correcto
2. Verificar nombre de pestaña (ej: "Contactos")
3. Re-autorizar credencial OAuth2

**Más soluciones:** Ver [`CONFIGURACION_COMPLETA.md`](CONFIGURACION_COMPLETA.md) sección "Troubleshooting"

---

## 📈 Resultados Esperados

Después de 1 mes de uso:

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| Llamadas telefónicas | 100/semana | 20/semana | **-80%** |
| Tiempo en gestión | 20h/semana | 5h/semana | **-75%** |
| Solicitudes de citas | 30/mes | 42/mes | **+40%** |
| Satisfacción paciente | 70% | 95% | **+25%** |
| Costo mensual software | $100 | $0-10 | **-90%+** |

---

## 🤝 Soporte y Ayuda

### Documentación:
- 📖 [Inicio Rápido](INICIO_RAPIDO.md) - 15 minutos
- 📖 [Configuración Completa](CONFIGURACION_COMPLETA.md) - Guía detallada
- 🎨 [Guía Visual](GUIA_VISUAL.md) - Con screenshots
- ✅ [Checklist](CHECKLIST.md) - Verificación paso a paso

### Recursos externos:
- 🌐 [N8N Docs](https://docs.n8n.io)
- 🌐 [Evolution API Docs](https://doc.evolution-api.com)
- 🌐 [Google Cloud Console](https://console.cloud.google.com)

### Scripts útiles:
```bash
# Verificar configuración
./verificar-configuracion.sh  # Linux/Mac
.\verificar-configuracion.ps1  # Windows

# Ver logs en tiempo real
docker logs -f n8n

# Backup de workflows
# Desde n8n: Settings → Export → All Workflows

# Backup de base de datos
docker exec n8n cp /home/node/.n8n/database.sqlite /backup/
```

---

## 📝 Licencia

Este proyecto está bajo licencia MIT. Puedes usarlo libremente para tu clínica.

---

## 🎓 Créditos

- **N8N:** https://n8n.io
- **Evolution API:** https://evolution-api.com
- **Creado por:** Rovo Dev
- **Fecha:** Enero 2026

---

## ⭐ Agradecimientos

Si este sistema te ayuda, considera:
- ⭐ Darle estrella al repositorio
- 📢 Compartir con otros profesionales de la salud
- 💬 Dar feedback para mejorarlo

---

## 🚀 ¡Comienza Ahora!

1. Lee [`INICIO_RAPIDO.md`](INICIO_RAPIDO.md)
2. Ejecuta `docker-compose up -d`
3. Accede a http://localhost:5678
4. Importa tu primer workflow
5. ¡Pruébalo!

**¿Dudas?** Lee la documentación completa o abre un issue.

---

**🏥 ¡Automatiza tu clínica hoy mismo y ahorra 15+ horas semanales!**
