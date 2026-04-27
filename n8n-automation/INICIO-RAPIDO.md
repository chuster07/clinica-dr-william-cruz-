# 🚀 INICIO RÁPIDO - Sistema de Automatización N8N
## Clínica Dr. William Cruz

---

## ⚡ Instalación Express (15 minutos)

### **Paso 1: Levantar los Servicios (2 min)**

```bash
cd Clinica-Dr-William-Cruz/n8n-automation
docker-compose up -d
```

Espera a que los contenedores estén listos:
```bash
docker ps
# Deberías ver: n8n_clinica, evolution_api_clinica, redis_clinica
```

---

### **Paso 2: Acceder a N8N (1 min)**

1. Abre tu navegador: http://localhost:5678
2. Usuario: `admin`
3. Contraseña: `clinica2026` (cámbiala después)

---

### **Paso 3: Configurar WhatsApp con Evolution API (3 min)**

#### **A. Crear Instancia**
```bash
curl -X POST http://localhost:8080/instance/create \
  -H "apikey: TU_API_KEY_SECRETA_AQUI_123456" \
  -H "Content-Type: application/json" \
  -d '{
    "instanceName": "clinica-whatsapp",
    "qrcode": true
  }'
```

#### **B. Escanear QR**
1. La respuesta incluirá un QR code en base64
2. Copia el código y pégalo en: https://base64.guru/converter/decode/image
3. Escanea con WhatsApp:
   - Abre WhatsApp → Menú → Dispositivos vinculados
   - Vincular un dispositivo
   - Escanea el QR

✅ **¡WhatsApp conectado!**

---

### **Paso 4: Configurar Gmail (5 min)**

#### **A. Habilitar Verificación en 2 Pasos**
1. Ve a: https://myaccount.google.com/security
2. Activa "Verificación en 2 pasos"

#### **B. Crear Contraseña de Aplicación**
1. Ve a: https://myaccount.google.com/apppasswords
2. App: Correo
3. Dispositivo: Otro (N8N Clinica)
4. Genera y **copia la contraseña** (16 caracteres)

#### **C. Agregar en N8N**
1. En N8N → Settings → Credentials
2. New Credential → Gmail OAuth2
3. Email: tu-email@gmail.com
4. Password: [pega la contraseña de 16 caracteres]
5. Save

---

### **Paso 5: Configurar Google Calendar y Sheets (4 min)**

#### **A. Crear Proyecto en Google Cloud**
1. Ve a: https://console.cloud.google.com
2. New Project → "Clinica Dr William Cruz"

#### **B. Habilitar APIs**
1. APIs & Services → Library
2. Busca y habilita:
   - Google Calendar API
   - Google Sheets API

#### **C. Crear OAuth Credentials**
1. APIs & Services → Credentials
2. Create Credentials → OAuth client ID
3. Application type: Web application
4. Authorized redirect URIs:
   ```
   http://localhost:5678/rest/oauth2-credential/callback
   ```
5. Copia Client ID y Client Secret

#### **D. Crear Hoja de Google Sheets**
1. Ve a: https://sheets.google.com
2. Crea: "Clinica - Base de Datos"
3. Crea 3 hojas:
   - **Citas**: ID | Nombre | Apellido | Telefono | Email | Fecha | Hora | Servicio | Estado | Notas
   - **Contactos**: ID | Nombre | Email | Telefono | Mensaje | Fecha | Atendido
   - **Conversaciones**: Telefono | Nombre | Mensaje | Respuesta | Timestamp

4. Copia el Sheet ID (de la URL)

#### **E. Conectar en N8N**
1. Settings → Credentials → Google Calendar OAuth2
2. Pega Client ID y Secret
3. Connect my account → Autoriza
4. Repite para Google Sheets OAuth2

---

## 📥 Importar Workflows

### **Importar los 5 Workflows**

1. En N8N → Workflows → Import
2. Importa cada archivo de `workflows/`:
   - ✅ `01-sistema-citas.json`
   - ✅ `02-chatbot-whatsapp.json`
   - ✅ `03-recordatorios-automaticos.json`
   - ✅ `04-formulario-contacto.json`
   - ✅ `05-seguimiento-pacientes.json`

### **Configurar cada Workflow**

Para cada workflow importado:

1. **Abrir el workflow**
2. **Reemplazar valores:**
   - `AQUI_TU_SHEET_ID` → Tu Sheet ID real
   - `TU_CHAT_ID` → Tu Telegram Chat ID (si usas Telegram)
   - `TU_API_KEY` → Tu Evolution API Key

3. **Seleccionar credenciales:**
   - Nodos de Gmail → Selecciona tu credencial Gmail
   - Nodos de Google Sheets → Selecciona tu credencial Sheets
   - Nodos de Google Calendar → Selecciona tu credencial Calendar
   - Nodos HTTP (Evolution API) → Crear credencial Header Auth:
     ```
     Name: apikey
     Value: TU_API_KEY_SECRETA_AQUI_123456
     ```

4. **Activar el workflow** (toggle en la esquina superior derecha)

---

## 🌐 Configurar la Web

### **Actualizar URLs en los archivos web**

#### **A. En `citas.html`** (línea 473)
```javascript
const N8N_CITAS_URL = '/api/citas';
// Cambia a tu URL pública cuando despliegues
```

#### **B. En `script.js`** (línea 72)
```javascript
const N8N_CONTACTO_URL = 'http://localhost:5678/webhook/contacto';
// Cambia a tu URL pública cuando despliegues
```

---

## 🧪 Probar el Sistema

### **Test 1: Formulario de Citas**

1. Abre: `Clinica-Dr-William-Cruz/citas.html` en tu navegador
2. Llena el formulario:
   - Nombre: Juan
   - Apellido: Pérez
   - Email: tu-email@gmail.com
   - Teléfono: 88888888
   - Fecha: Mañana
   - Servicio: Medicina Integrativa
3. Envía

**Deberías recibir:**
- ✅ WhatsApp con confirmación
- ✅ Email con detalles de la cita
- ✅ Evento en Google Calendar
- ✅ Registro en Google Sheets

---

### **Test 2: Chatbot WhatsApp**

1. Envía un mensaje a tu número de WhatsApp vinculado
2. Escribe: "Quiero información sobre los servicios"
3. El bot responderá automáticamente

---

### **Test 3: Formulario de Contacto**

1. Abre: `Clinica-Dr-William-Cruz/index.html#contacto`
2. Llena el formulario
3. Envía

**Deberías recibir:**
- ✅ Email de confirmación
- ✅ Notificación en Telegram (si configuraste)
- ✅ Registro en Google Sheets

---

## 📊 Dashboard de Workflows

### **Monitorear las automatizaciones**

En N8N, ve a: **Executions**

Aquí verás:
- ✅ Workflows ejecutados
- ❌ Errores (si los hay)
- 📊 Estadísticas de uso

---

## 🔧 Solución de Problemas

### **WhatsApp no responde**
```bash
# Verificar estado de Evolution API
curl http://localhost:8080/instance/connectionState/clinica-whatsapp \
  -H "apikey: TU_API_KEY"

# Si dice "close", reconecta:
curl http://localhost:8080/instance/connect/clinica-whatsapp \
  -H "apikey: TU_API_KEY"
```

### **Workflows no se ejecutan**
1. Verifica que estén **activados** (toggle verde)
2. Revisa los **logs** en Executions
3. Verifica las **credenciales** en cada nodo

### **Formularios web no envían**
1. Abre la consola del navegador (F12)
2. Revisa errores de CORS
3. Verifica que N8N esté corriendo: http://localhost:5678

---

## 🎉 ¡Sistema Funcionando!

Si todos los tests pasaron, tu sistema está **100% operativo**.

### **Próximos Pasos:**

1. 📱 **Personalizar mensajes** en cada workflow
2. 🎨 **Ajustar horarios** de recordatorios
3. 🚀 **Desplegar en producción** (ver `DEPLOYMENT.md`)
4. 📊 **Monitorear métricas** semanalmente

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs: `docker logs n8n_clinica`
2. Consulta la documentación: `setup-guides/`
3. Revisa las credenciales en N8N

---

**¡Felicidades! El sistema de automatización está listo. 🎊**
