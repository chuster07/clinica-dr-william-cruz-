# 🚀 INICIO RÁPIDO - 15 MINUTOS PARA TENER TODO FUNCIONANDO

## ⚡ CONFIGURACIÓN EXPRESS

### PASO 1: Instalar N8N (2 minutos)

```bash
# Navegar a la carpeta
cd Clinica-Dr-William-Cruz/n8n-automation

# Copiar configuración
cp .env.example .env

# Editar .env y cambiar estas líneas mínimas:
# N8N_BASIC_AUTH_PASSWORD=tu-password-seguro

# Levantar servicios
docker-compose up -d

# Verificar
docker ps
```

**Acceder:** http://localhost:5678

---

### PASO 2: Configurar Gmail (3 minutos)

1. **Activar 2FA:** https://myaccount.google.com/security
2. **Crear App Password:** https://myaccount.google.com/apppasswords
   - Nombre: "n8n-clinica"
   - Copiar los 16 caracteres
3. **En N8N:**
   - `Credentials` → `Create New` → `Gmail OAuth2`
   - Pegar Client ID y Secret (o usar App Password)
   - Click `Connect`

---

### PASO 3: Configurar Google Sheets (3 minutos)

1. **Crear hoja:** https://sheets.google.com
   - Nombre: "Clinica DB"
   - Crear pestañas: `Citas`, `Contactos`, `Pacientes`

2. **Encabezados en "Citas":**
```
Nombre | Email | Teléfono | Fecha | Hora | Estado | Motivo | Fecha Registro
```

3. **Encabezados en "Contactos":**
```
Nombre | Email | Teléfono | Mensaje | Fecha | Atendido
```

4. **Copiar ID de la hoja** (de la URL)

5. **Habilitar API:**
   - https://console.cloud.google.com
   - Habilitar: Google Sheets API + Google Calendar API
   - Crear credenciales OAuth2
   - En N8N: usar misma credencial de Gmail

---

### PASO 4: Configurar Telegram (2 minutos)

1. **Crear bot:**
   - Hablar con @BotFather
   - `/newbot`
   - Nombre: "Clinica Bot"
   - Copiar token

2. **Obtener Chat ID:**
   - Hablar con @userinfobot
   - Copiar tu ID

3. **En N8N:**
   - `Credentials` → `Telegram API`
   - Pegar token

---

### PASO 5: Importar Workflows (3 minutos)

1. **En N8N:** `Workflows` → `Import from File`

2. **Importar en orden:**
   - `04-formulario-contacto.json` ← EMPEZAR CON ESTE (más simple)
   - `01-sistema-citas.json`
   - `03-recordatorios-automaticos.json`

3. **Configurar workflow 04:**
   - Abrir workflow importado
   - Nodo "Guardar en Google Sheets":
     - Click en el nodo
     - Document ID: `PEGAR_TU_SHEET_ID`
     - Sheet Name: `Contactos`
   - Nodo "Telegram":
     - Chat ID: `PEGAR_TU_CHAT_ID`
   - Click **"Activate"** (arriba)

---

### PASO 6: PROBAR (2 minutos)

1. **Copiar URL del Webhook:**
   - Click en nodo "Webhook - Formulario Contacto"
   - Copiar URL "Production"
   - Ejemplo: `http://localhost:5678/webhook/contacto`

2. **Abrir archivo de prueba:**
   - Abre: `test-contacto.html` en tu navegador
   - Pegar la URL del webhook
   - Llenar formulario
   - Click "Enviar"

3. **Verificar:**
   - ✅ Aparece en Google Sheets
   - ✅ Recibes email
   - ✅ Notificación en Telegram
   - ✅ En N8N: "Executions" debe mostrar ejecución exitosa (verde)

---

## 🎉 ¡LISTO! Tu primer workflow está funcionando

---

## 📋 PRÓXIMOS PASOS

### Configurar WhatsApp (Opcional - 5 minutos)

**Opción A: Evolution API (Gratis, Self-hosted)**

```bash
# Ya está en tu docker-compose
docker-compose up -d evolution-api

# Acceder: http://localhost:8080
# Crear instancia y escanear QR
```

**Opción B: WhatsApp Cloud API (Gratis hasta 1000 msg/mes)**

1. https://developers.facebook.com
2. Crear App → WhatsApp
3. Obtener Phone Number ID y Token
4. Usar nodo HTTP Request en n8n

---

### Configurar Sistema de Citas

1. **Importar:** `01-sistema-citas.json`

2. **Configurar nodos:**
   - Google Sheets: Sheet ID + pestaña "Citas"
   - Google Calendar: Credencial OAuth2
   - WhatsApp: URL de Evolution API
   - Telegram: Chat ID

3. **Activar workflow**

4. **Probar:** Abre `test-citas.html`

---

### Configurar Recordatorios Automáticos

1. **Importar:** `03-recordatorios-automaticos.json`

2. **Configurar:**
   - Cron: 08:00 AM diario
   - Google Sheets: Leer de "Citas"
   - WhatsApp + Email: Credenciales

3. **Activar**

---

## 🆘 PROBLEMAS COMUNES

### "Webhook not found" (404)
**Solución:** Activar el workflow (switch ON)

### "Gmail authentication failed"
**Solución:** Verificar App Password de 16 caracteres

### "Cannot read Google Sheets"
**Solución:** Reautorizar OAuth2 credential

### "N8N no responde"
**Solución:** 
```bash
docker-compose restart n8n
docker logs n8n
```

---

## 📊 CHECKLIST MÍNIMO PARA EMPEZAR

- [x] N8N instalado y corriendo
- [x] Gmail configurado
- [x] Google Sheets configurado
- [x] Telegram configurado
- [x] Workflow "Formulario Contacto" importado y activo
- [x] Prueba exitosa con test-contacto.html

**Con esto ya tienes un sistema funcionando al 60%**

---

## 📚 DOCUMENTACIÓN COMPLETA

- **Configuración detallada:** `CONFIGURACION_COMPLETA.md`
- **Checklist completo:** `CHECKLIST.md`
- **Guías de setup:** Carpeta `setup-guides/`

---

## 💡 TIPS

1. **Empezar simple:** Primero configura solo el formulario de contacto
2. **Probar cada paso:** Usar los archivos test-*.html
3. **Revisar Executions:** En n8n siempre revisa si hay errores
4. **Logs son tus amigos:** `docker logs n8n` te dice todo

---

**¿Necesitas ayuda?** Revisa CONFIGURACION_COMPLETA.md o contacta soporte.

**Creado por:** Rovo Dev 🚀
