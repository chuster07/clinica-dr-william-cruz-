# ✅ CHECKLIST DE CONFIGURACIÓN N8N - CLÍNICA DR. WILLIAM CRUZ

## 🎯 OBJETIVO
Verificar que todos los componentes del sistema de automatización estén correctamente configurados y funcionando.

---

## FASE 1: INSTALACIÓN BÁSICA

### 1.1 Instalación de N8N
- [ ] Docker instalado y funcionando
- [ ] Archivo `.env` creado (copiado de `.env.example`)
- [ ] Variables de entorno configuradas en `.env`
- [ ] N8N corriendo: `docker-compose up -d`
- [ ] N8N accesible en: http://localhost:5678
- [ ] Usuario y contraseña configurados

**Verificar:**
```bash
docker ps | grep n8n
curl http://localhost:5678
```

---

## FASE 2: CREDENCIALES

### 2.1 Gmail (Envío de Emails)
- [ ] Verificación en 2 pasos activada
- [ ] Contraseña de aplicación generada (16 caracteres)
- [ ] Credencial creada en N8N: "Gmail OAuth2"
- [ ] Credencial probada (enviar email de prueba)

**Probar:**
- Crear workflow simple → Nodo Gmail → Enviar email a ti mismo

### 2.2 Google Calendar
- [ ] API de Google Calendar habilitada en Google Cloud
- [ ] Credenciales OAuth2 configuradas
- [ ] URIs de redirección configuradas: `http://localhost:5678/rest/oauth2-credential/callback`
- [ ] Credencial conectada en N8N
- [ ] Autorización completada

**Probar:**
- Workflow simple → Crear evento de prueba → Verificar en Google Calendar

### 2.3 Google Sheets
- [ ] API de Google Sheets habilitada
- [ ] Hoja de cálculo "Clinica DB" creada
- [ ] Pestañas creadas: Citas, Contactos, Pacientes
- [ ] Encabezados en cada pestaña
- [ ] ID de la hoja copiado
- [ ] Credencial OAuth2 configurada

**Estructura de columnas:**

**Pestaña "Citas":**
```
Nombre | Email | Teléfono | Fecha | Hora | Estado | Motivo | Fecha Registro
```

**Pestaña "Contactos":**
```
Nombre | Email | Teléfono | Mensaje | Fecha | Atendido
```

**Pestaña "Pacientes":**
```
ID | Nombre | Email | Teléfono | Última Visita | Próxima Cita | Notas
```

### 2.4 Telegram Bot
- [ ] Bot creado con @BotFather
- [ ] Token del bot copiado
- [ ] Chat ID obtenido (@userinfobot)
- [ ] Credencial configurada en N8N
- [ ] Primera conversación iniciada con el bot

**Probar:**
- Workflow → Enviar mensaje de prueba → Verificar en Telegram

### 2.5 WhatsApp (Evolution API)
- [ ] Evolution API corriendo: `docker ps | grep evolution`
- [ ] Evolution Manager accesible: http://localhost:8080
- [ ] Instancia creada
- [ ] QR code escaneado con WhatsApp Business
- [ ] Estado: "Conectado"
- [ ] Número de teléfono verificado
- [ ] API Key configurada

**Probar:**
- Enviar mensaje de prueba desde Postman/n8n

### 2.6 OpenAI (Opcional)
- [ ] Cuenta de OpenAI creada
- [ ] API Key generada
- [ ] Créditos disponibles verificados
- [ ] Credencial configurada en N8N

**Probar:**
- Workflow → Nodo OpenAI → Pregunta simple → Verificar respuesta

---

## FASE 3: IMPORTAR WORKFLOWS

### 3.1 Importación
- [ ] Workflow 01 - Sistema de Citas importado
- [ ] Workflow 02 - Chatbot WhatsApp importado
- [ ] Workflow 03 - Recordatorios Automáticos importado
- [ ] Workflow 04 - Formulario de Contacto importado
- [ ] Workflow 05 - Seguimiento de Pacientes importado

### 3.2 Configuración de IDs y URLs
Cada workflow necesita:
- [ ] Google Sheets Document ID actualizado
- [ ] URLs de webhooks copiadas
- [ ] Chat IDs de Telegram configurados
- [ ] Instancia de WhatsApp configurada
- [ ] Credenciales asignadas a cada nodo

---

## FASE 4: CONFIGURAR WORKFLOWS

### 4.1 Workflow: Sistema de Citas

**Nodos a configurar:**

1. **Webhook - Recibir Cita**
   - [ ] URL del webhook copiada
   - [ ] Path: `/api/citas`
   - [ ] Método: POST

2. **Formatear Datos**
   - [ ] No requiere configuración ✅

3. **Guardar en Google Sheets**
   - [ ] Credencial: Google Sheets OAuth2
   - [ ] Document ID: `TU_SHEET_ID`
   - [ ] Sheet Name: `Citas`
   - [ ] Columns mapping verificado

4. **Crear Evento en Calendar**
   - [ ] Credencial: Google Calendar OAuth2
   - [ ] Calendar: `primary`
   - [ ] Start date: `{{ $json.fecha }}T{{ $json.hora }}:00`
   - [ ] Duration: 30 minutos

5. **Email Confirmación**
   - [ ] Credencial: Gmail OAuth2
   - [ ] To: `{{ $json.email }}`
   - [ ] Template verificado

6. **WhatsApp Confirmación**
   - [ ] URL: Evolution API endpoint
   - [ ] API Key en headers
   - [ ] Formato de número verificado

7. **Telegram - Notificar Equipo**
   - [ ] Credencial: Telegram
   - [ ] Chat ID configurado

8. **Responder al Cliente**
   - [ ] Response JSON configurado

**Activar workflow:**
- [ ] Switch "Active" en ON
- [ ] Estado: Activo ✅

---

### 4.2 Workflow: Formulario de Contacto

**Nodos a configurar:**

1. **Webhook - Formulario Contacto**
   - [ ] URL copiada
   - [ ] Path: `/contacto`

2. **Guardar en Google Sheets**
   - [ ] Document ID configurado
   - [ ] Sheet Name: `Contactos`

3. **Email Auto-respuesta**
   - [ ] Credencial Gmail configurada
   - [ ] Template verificado

4. **Telegram - Notificar Equipo**
   - [ ] Chat ID configurado

5. **Responder al Cliente**
   - [ ] JSON response configurado

**Activar:**
- [ ] Workflow activado

---

### 4.3 Workflow: Recordatorios Automáticos

**Configurar:**

1. **Cron Node (Ejecutar diariamente)**
   - [ ] Horario: 08:00 AM
   - [ ] Timezone: America/Costa_Rica

2. **Google Sheets - Leer Citas**
   - [ ] Document ID
   - [ ] Range: `Citas!A:H`

3. **Filter - Citas de Mañana**
   - [ ] Lógica de fechas configurada

4. **Enviar Recordatorio Email**
   - [ ] Credencial Gmail

5. **Enviar Recordatorio WhatsApp**
   - [ ] Evolution API configurado

**Activar:**
- [ ] Workflow activado
- [ ] Próxima ejecución programada visible

---

## FASE 5: PRUEBAS

### 5.1 Test Formulario de Contacto

**Usar:** `test-contacto.html`

- [ ] Abrir archivo en navegador
- [ ] Configurar URL del webhook
- [ ] Llenar formulario con datos de prueba
- [ ] Enviar formulario
- [ ] Verificar respuesta exitosa

**Verificaciones:**
- [ ] ✅ Registro apareció en Google Sheets (Contactos)
- [ ] ✅ Email de confirmación recibido
- [ ] ✅ Notificación en Telegram recibida
- [ ] ✅ Execution en n8n exitosa (verde)

### 5.2 Test Sistema de Citas

**Usar:** `test-citas.html`

- [ ] Abrir archivo en navegador
- [ ] Configurar URL del webhook
- [ ] Llenar formulario (nombre, email, teléfono, fecha, hora)
- [ ] Enviar formulario
- [ ] Verificar respuesta exitosa

**Verificaciones:**
- [ ] ✅ Registro en Google Sheets (Citas)
- [ ] ✅ Evento creado en Google Calendar
- [ ] ✅ Email de confirmación recibido
- [ ] ✅ Mensaje de WhatsApp recibido
- [ ] ✅ Notificación Telegram recibida
- [ ] ✅ Execution en n8n exitosa

### 5.3 Test Recordatorios

**Preparación:**
- [ ] Crear cita manual en Google Sheets para mañana
- [ ] Esperar a que ejecute el Cron (08:00 AM) o ejecutar manualmente

**Verificaciones:**
- [ ] ✅ Email de recordatorio enviado
- [ ] ✅ WhatsApp de recordatorio enviado
- [ ] ✅ Execution exitosa en n8n

---

## FASE 6: INTEGRACIÓN CON LA WEB

### 6.1 Actualizar URLs en el sitio web

**Archivo:** `Clinica-Dr-William-Cruz/citas.html`

- [ ] URL del webhook de citas actualizada
- [ ] JavaScript del formulario configurado
- [ ] CORS configurado en n8n

**Archivo:** `Clinica-Dr-William-Cruz/index.html` (contacto)

- [ ] URL del webhook de contacto actualizada
- [ ] JavaScript configurado

### 6.2 Configurar CORS (si es necesario)

En `.env` o `docker-compose.yml`:
```bash
N8N_CORS_ALLOW_ORIGINS=*
```

Reiniciar n8n:
```bash
docker-compose restart n8n
```

---

## FASE 7: PRODUCCIÓN

### 7.1 Dominio Público

- [ ] Dominio configurado (ej: n8n.clinicadrwilliamcruz.com)
- [ ] DNS apuntando al servidor
- [ ] Puertos abiertos (80, 443)

### 7.2 SSL/HTTPS

- [ ] Certificado SSL instalado (Let's Encrypt)
- [ ] N8N accesible via HTTPS
- [ ] Webhooks actualizados con URLs HTTPS

### 7.3 Seguridad

- [ ] Contraseñas fuertes en `.env`
- [ ] API Keys seguras
- [ ] `.env` en `.gitignore`
- [ ] Firewall configurado
- [ ] Backups automáticos configurados

---

## FASE 8: MONITOREO

### 8.1 Dashboard N8N

- [ ] Revisar "Executions" diariamente
- [ ] Verificar workflows activos
- [ ] Revisar logs de errores

### 8.2 Alertas

- [ ] Configurar notificación Telegram en caso de error
- [ ] Email de alertas configurado

### 8.3 Métricas

Monitorear semanalmente:
- [ ] Número de citas agendadas
- [ ] Tasa de conversión de contactos
- [ ] Emails enviados
- [ ] WhatsApp enviados
- [ ] Errores detectados

---

## 🆘 TROUBLESHOOTING RÁPIDO

### Problema: Webhook no responde (404)
**Solución:**
1. ✅ Verificar que el workflow esté ACTIVO
2. ✅ Copiar la URL de "Production" (no "Test")
3. ✅ Verificar que n8n esté corriendo

### Problema: Gmail no envía
**Solución:**
1. ✅ Verificar App Password (16 caracteres)
2. ✅ 2FA activado en Gmail
3. ✅ Reautorizar credencial OAuth2

### Problema: WhatsApp no envía
**Solución:**
1. ✅ Verificar conexión en Evolution Manager
2. ✅ Formato del número: +506########
3. ✅ API Key correcta

### Problema: Google Calendar no crea eventos
**Solución:**
1. ✅ Reautorizar OAuth2
2. ✅ Verificar formato de fecha: YYYY-MM-DDTHH:mm:ss
3. ✅ Timezone correcto

---

## ✅ RESUMEN FINAL

### Estado de implementación:

**Credenciales:** __/6 configuradas
- Gmail: ⬜
- Google Calendar: ⬜
- Google Sheets: ⬜
- Telegram: ⬜
- WhatsApp: ⬜
- OpenAI: ⬜ (opcional)

**Workflows:** __/5 activos
- Sistema de Citas: ⬜
- Chatbot WhatsApp: ⬜
- Recordatorios: ⬜
- Formulario Contacto: ⬜
- Seguimiento Pacientes: ⬜

**Pruebas:** __/3 exitosas
- Test Contacto: ⬜
- Test Citas: ⬜
- Test Recordatorios: ⬜

**Integración Web:** __/2 completadas
- citas.html: ⬜
- contacto en index.html: ⬜

---

**🎉 SISTEMA 100% FUNCIONAL CUANDO TODOS LOS ✅ ESTÉN MARCADOS**

---

**Última actualización:** Enero 2026
**Creado por:** Rovo Dev
