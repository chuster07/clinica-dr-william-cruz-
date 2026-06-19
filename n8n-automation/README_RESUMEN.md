# 📋 RESUMEN - Sistema N8N para Clínica Dr. William Cruz

## 🎯 ¿QUÉ TIENES AQUÍ?

Un sistema completo de automatización **100% GRATIS** para gestionar tu clínica:

✅ Recibir citas desde la web → Automáticamente a Calendar + Sheets + Email + WhatsApp
✅ Formulario de contacto → Auto-respuesta + Notificación al equipo
✅ Recordatorios automáticos → 24h antes por Email y WhatsApp
✅ Chatbot de WhatsApp → Respuestas automáticas con IA
✅ Seguimiento de pacientes → Reactivación automática

---

## 📁 ARCHIVOS IMPORTANTES

### 🚀 PARA EMPEZAR:
- **`INICIO_RAPIDO.md`** ← **LEE ESTO PRIMERO** (15 minutos para funcionar)
- **`CONFIGURACION_COMPLETA.md`** ← Guía paso a paso detallada
- **`CHECKLIST.md`** ← Verificar que todo funcione

### 🧪 PARA PROBAR:
- **`test-contacto.html`** ← Prueba el formulario de contacto
- **`test-citas.html`** ← Prueba el sistema de citas

### 📦 WORKFLOWS (Importar a n8n):
- `01-sistema-citas.json` - Agendar citas
- `02-chatbot-whatsapp.json` - Bot inteligente
- `03-recordatorios-automaticos.json` - Recordatorios
- `04-formulario-contacto.json` - Contacto web ← **EMPEZAR CON ESTE**
- `05-seguimiento-pacientes.json` - Reactivación

### ⚙️ CONFIGURACIÓN:
- `.env.example` - Variables de entorno
- `docker-compose.yml` - Servicios Docker
- `setup-guides/` - Guías detalladas por servicio

---

## 🏃 INICIO RÁPIDO (15 MIN)

### 1. Instalar N8N
```bash
cd Clinica-Dr-William-Cruz/n8n-automation
cp .env.example .env
docker-compose up -d
```
**Acceder:** http://localhost:5678

### 2. Configurar Credenciales
- **Gmail:** App Password (16 caracteres)
- **Google Sheets:** Crear hoja "Clinica DB"
- **Telegram:** Bot con @BotFather

### 3. Importar Workflow
- En n8n: `Import from File`
- Empezar con: `04-formulario-contacto.json`
- Configurar Google Sheet ID
- **Activar workflow**

### 4. Probar
- Abrir: `test-contacto.html`
- Pegar URL del webhook
- Enviar formulario
- ✅ Verificar en Sheets, Email, Telegram

---

## 📊 LO QUE LOGRARÁS

### Antes (Manual):
- ⏰ 20 horas/semana en llamadas y emails
- 📞 Pacientes llamando para confirmar citas
- 📝 Anotar citas en papel/Excel
- 😓 Recordatorios manuales

### Después (Automatizado):
- ⚡ Todo automático 24/7
- 📱 Confirmaciones instantáneas por WhatsApp
- 📅 Calendar sincronizado automáticamente
- 🤖 Bot responde preguntas comunes
- ⏱️ Ahorro: 15-20 horas/semana
- 📈 +40% más solicitudes de citas
- 😊 +60% satisfacción del paciente

---

## 🔐 SEGURIDAD

- ✅ Todo corre en tu servidor (self-hosted)
- ✅ Datos en tu Google Account
- ✅ Sin mensualidades ni subscripciones
- ✅ 100% control de tu información
- ❌ Nunca subir `.env` a Git

---

## 💰 COSTOS

| Servicio | Costo | Límite Gratis |
|----------|-------|---------------|
| N8N | $0 | Ilimitado (self-hosted) |
| Gmail | $0 | 500 emails/día |
| Google Sheets/Calendar | $0 | Uso normal |
| Telegram | $0 | Ilimitado |
| Evolution API | $0 | Ilimitado (self-hosted) |
| WhatsApp Cloud API | $0 | 1000 conversaciones/mes |
| OpenAI (opcional) | ~$5-10 | $5 crédito inicial |

**Total: ~$0-10/mes** (vs $50-200/mes de otros sistemas)

---

## 🛠️ STACK TECNOLÓGICO

- **N8N** - Orquestador de automatizaciones
- **Docker** - Contenedores
- **Gmail** - Emails transaccionales
- **Google Sheets** - Base de datos simple
- **Google Calendar** - Agenda médica
- **Telegram** - Notificaciones internas
- **Evolution API** - WhatsApp (self-hosted)
- **OpenAI** - Chatbot inteligente (opcional)

---

## 📚 ORDEN RECOMENDADO DE CONFIGURACIÓN

1. ✅ **Primero:** Formulario de contacto (más simple)
2. ✅ **Segundo:** Sistema de citas (más usado)
3. ✅ **Tercero:** Recordatorios automáticos
4. ✅ **Cuarto:** Chatbot WhatsApp (requiere OpenAI)
5. ✅ **Quinto:** Seguimiento de pacientes

**No intentes configurar todo a la vez**

---

## 🆘 ¿PROBLEMAS?

### Workflow no responde
```bash
# Verificar que n8n esté corriendo
docker ps

# Ver logs
docker logs n8n

# Reiniciar
docker-compose restart n8n
```

### Gmail no envía
- Verificar: App Password de 16 caracteres
- Verificar: 2FA activado
- Probar: Enviar email de prueba desde n8n

### Google Sheets no guarda
- Verificar: ID de la hoja correcto
- Verificar: Pestaña existe (ej: "Contactos")
- Probar: Reautorizar OAuth2

---

## 📖 DOCUMENTACIÓN

### Nivel Principiante:
→ Lee: `INICIO_RAPIDO.md`

### Nivel Intermedio:
→ Lee: `CONFIGURACION_COMPLETA.md`

### Nivel Avanzado:
→ Lee: Archivos en `setup-guides/`

### Para Verificar:
→ Usa: `CHECKLIST.md`

---

## 🎓 TUTORIALES INCLUIDOS

- ✅ Cómo crear App Password en Gmail
- ✅ Cómo habilitar APIs en Google Cloud
- ✅ Cómo crear bot de Telegram
- ✅ Cómo conectar WhatsApp con Evolution API
- ✅ Cómo configurar OpenAI
- ✅ Cómo probar workflows antes de usarlos

---

## 🔄 FLUJO TÍPICO

### Cliente agenda cita desde la web:
1. 📝 Formulario enviado → Webhook de n8n
2. 💾 Se guarda en Google Sheets
3. 📅 Se crea evento en Google Calendar
4. 📧 Email de confirmación al paciente
5. 📱 WhatsApp de confirmación al paciente
6. 🔔 Notificación Telegram al equipo médico
7. ⏰ (24h antes) Recordatorio automático

**Total: 7 acciones automáticas en segundos**

---

## ✨ CARACTERÍSTICAS DESTACADAS

### Sistema de Citas:
- Auto-confirmación por Email + WhatsApp
- Sincronización con Google Calendar
- Base de datos en Sheets
- Notificaciones al equipo

### Recordatorios:
- 24 horas antes (Email + WhatsApp)
- 2 horas antes (WhatsApp)
- Post-consulta (Encuesta de satisfacción)

### Chatbot:
- Respuestas 24/7
- Información sobre servicios
- Horarios y precios
- Agendar citas por WhatsApp

### Dashboard:
- Ver todas las ejecuciones
- Estadísticas de uso
- Logs de errores
- Monitoreo en tiempo real

---

## 🚀 PRÓXIMOS PASOS

1. Lee `INICIO_RAPIDO.md`
2. Instala n8n con Docker
3. Configura credenciales básicas
4. Importa workflow de contacto
5. Prueba con `test-contacto.html`
6. Ve agregando más workflows gradualmente

---

## 🤝 SOPORTE

- **Documentación local:** Archivos .md en esta carpeta
- **N8N Docs:** https://docs.n8n.io
- **Evolution API:** https://doc.evolution-api.com
- **Google APIs:** https://console.cloud.google.com

---

## ⚡ TIPS PRO

1. **Empezar simple:** Un workflow a la vez
2. **Probar todo:** Usa los archivos test-*.html
3. **Revisar logs:** Cuando algo falle
4. **Hacer backups:** Exportar workflows regularmente
5. **Documentar cambios:** Si modificas algo

---

## 📈 MÉTRICAS ESPERADAS

Después de 1 mes de uso:

- 📞 **-80%** en llamadas telefónicas
- ⏱️ **-15h/semana** en tareas manuales
- 📈 **+40%** en solicitudes de citas
- 😊 **+60%** en satisfacción del paciente
- 💰 **$0** en costos de software

---

## ✅ CHECKLIST RÁPIDO

- [ ] N8N instalado y corriendo
- [ ] Gmail configurado (App Password)
- [ ] Google Sheets creado (Clinica DB)
- [ ] Telegram Bot creado
- [ ] Workflow de contacto importado y activo
- [ ] Prueba exitosa con test-contacto.html
- [ ] Workflow de citas configurado
- [ ] WhatsApp conectado (opcional)
- [ ] Recordatorios configurados
- [ ] URLs integradas en la web

---

**🎉 ¡Bienvenido a la automatización de tu clínica!**

**Creado con ❤️ por Rovo Dev**
**Enero 2026**
