# 🎯 CONFIGURACIÓN COMPLETA N8N - CLÍNICA DR. WILLIAM CRUZ
## Guía 100% Funcional Paso a Paso

---

## 📋 ÍNDICE RÁPIDO
1. [Pre-requisitos](#pre-requisitos)
2. [Instalación de N8N](#instalación-de-n8n)
3. [Configuración de Credenciales](#configuración-de-credenciales)
4. [Importar y Configurar Workflows](#importar-workflows)
5. [Probar Cada Workflow](#probar-workflows)
6. [Integración con la Web](#integración-web)
7. [Monitoreo y Mantenimiento](#monitoreo)

---

## 🔧 1. PRE-REQUISITOS

### ✅ Lo que necesitas tener listo:

- [ ] **Cuenta de Gmail** (para enviar emails)
- [ ] **Cuenta de Google** (para Calendar y Sheets)
- [ ] **Telegram Bot** (para notificaciones internas)
- [ ] **Cuenta de OpenAI** (opcional - para chatbot con IA)
- [ ] **WhatsApp Business** (para mensajes a pacientes)
- [ ] **Docker instalado** (para Evolution API y N8N)

---

## 🚀 2. INSTALACIÓN DE N8N

### Opción A: Con Docker (Recomendado)

```bash
# Navega a la carpeta
cd Clinica-Dr-William-Cruz/n8n-automation

# Copia el archivo de configuración
cp .env.example .env

# Edita el archivo .env con tus datos
# (usa notepad, nano, o cualquier editor)

# Levanta los servicios
docker-compose up -d

# Verifica que estén corriendo
docker ps
```

**Accede a N8N:** http://localhost:5678

### Opción B: Sin Docker (NPM)

```bash
# Instala n8n globalmente
npm install n8n -g

# Inicia n8n
n8n start

# Accede en http://localhost:5678
```

---

## 🔐 3. CONFIGURACIÓN DE CREDENCIALES

### 📧 A. GMAIL (Para enviar emails)

1. **Activar verificación en 2 pasos en tu Gmail:**
   - Ve a: https://myaccount.google.com/security
   - Activa "Verificación en 2 pasos"

2. **Crear contraseña de aplicación:**
   - Ve a: https://myaccount.google.com/apppasswords
   - Selecciona "Correo" y "Windows Computer"
   - Copia la contraseña de 16 caracteres

3. **En N8N:**
   - Ve a `Credentials` → `Create New`
   - Busca **Gmail OAuth2**
   - Click en `Create New Credential`
   - Selecciona **Service Account** o **OAuth2**

**Configuración Gmail OAuth2:**
```
Nombre: Gmail Clínica
Client ID: (de Google Cloud Console)
Client Secret: (de Google Cloud Console)
```

**Alternativa - Gmail con App Password:**
```
Email: tucorreo@gmail.com
App Password: xxxx-xxxx-xxxx-xxxx (la de 16 caracteres)
```

---

### 📅 B. GOOGLE CALENDAR

1. **Habilitar API en Google Cloud:**
   - Ve a: https://console.cloud.google.com
   - Crea un proyecto nuevo: "Clinica-Automation"
   - Habilita: **Google Calendar API**
   - Habilita: **Google Sheets API**

2. **Crear credenciales OAuth2:**
   - Ve a `Credenciales` → `Crear credenciales` → `ID de cliente OAuth`
   - Tipo: Aplicación web
   - URIs autorizados: `http://localhost:5678/rest/oauth2-credential/callback`
   - Copia **Client ID** y **Client Secret**

3. **En N8N:**
   - Ve a `Credentials` → `Create New`
   - Busca **Google Calendar OAuth2 API**
   - Pega Client ID y Client Secret
   - Click en `Connect my Account`
   - Autoriza el acceso

---

### 📊 C. GOOGLE SHEETS

1. **Crear tu hoja de cálculo:**
   - Ve a: https://sheets.google.com
   - Crea nueva hoja: "Clinica DB"
   
2. **Crea estas pestañas:**
   - **Citas** con columnas: `Nombre | Email | Teléfono | Fecha | Hora | Estado | Notas`
   - **Contactos** con columnas: `Nombre | Email | Teléfono | Mensaje | Fecha | Atendido`
   - **Pacientes** con columnas: `Nombre | Email | Teléfono | Última Visita | Próxima Cita`

3. **Obtén el ID de la hoja:**
   - Copia la URL: `https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit`
   - Guarda el ID

4. **En N8N:**
   - Usa la misma credencial OAuth2 de Google Calendar
   - O crea una nueva con **Google Sheets OAuth2 API**

---

### 📱 D. TELEGRAM BOT (Notificaciones Internas)

1. **Crear el bot:**
   - Habla con [@BotFather](https://t.me/botfather) en Telegram
   - Envía: `/newbot`
   - Nombre: "Clínica Dr. William Cruz Bot"
   - Username: `clinica_drwilliamcruz_bot`
   - Copia el **Token** (ejemplo: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

2. **Obtener tu Chat ID:**
   - Habla con [@userinfobot](https://t.me/userinfobot)
   - Te dará tu Chat ID (ejemplo: `123456789`)

3. **En N8N:**
   - Ve a `Credentials` → `Create New`
   - Busca **Telegram API**
   - Pega el token del bot
   - Guarda

---

### 🤖 E. OPENAI (Chatbot con IA - Opcional)

1. **Obtener API Key:**
   - Ve a: https://platform.openai.com/api-keys
   - Click en `Create new secret key`
   - Nombre: "Clinica Bot"
   - Copia la key (empieza con `sk-...`)

2. **En N8N:**
   - Ve a `Credentials` → `Create New`
   - Busca **OpenAI API**
   - Pega tu API Key
   - Guarda

**Nota:** OpenAI cobra por uso. Plan gratuito: $5 de crédito inicial.

---

### 📲 F. WHATSAPP (Evolution API)

#### **Opción 1: Evolution API (Self-Hosted) - GRATIS**

1. **Ya está en tu docker-compose.yml:**
```bash
docker-compose up -d evolution-api
```

2. **Accede a:**
   - Manager: http://localhost:8080
   - API Key: (la que configuraste en .env)

3. **Conectar WhatsApp:**
   - Crea una instancia nueva
   - Escanea el código QR con tu WhatsApp Business
   - Guarda el nombre de la instancia

4. **En N8N:**
   - Ve a `Credentials` → `Create New`
   - Busca **HTTP Header Auth** o **Evolution API**
   - Configura:
```
API URL: http://evolution-api:8080
API Key: tu-api-key-del-env
Instance: nombre-de-tu-instancia
```

#### **Opción 2: WhatsApp Cloud API (Oficial) - GRATIS hasta 1000 mensajes/mes**

1. **Crear app en Meta:**
   - Ve a: https://developers.facebook.com
   - Crea app nueva → Tipo: Business
   - Agrega producto: WhatsApp

2. **Configurar:**
   - Obtén el **Phone Number ID**
   - Obtén el **Access Token**
   - Configura el webhook de n8n

3. **En N8N:**
   - Usa nodo **HTTP Request** con:
```
Method: POST
URL: https://graph.facebook.com/v18.0/{{phoneNumberId}}/messages
Authentication: Bearer Token
Token: tu-access-token
```

---

## 📥 4. IMPORTAR Y CONFIGURAR WORKFLOWS

### Paso 1: Importar workflows

1. En N8N, ve a **Workflows**
2. Click en **Import from File**
3. Importa uno por uno:
   - `01-sistema-citas.json`
   - `02-chatbot-whatsapp.json`
   - `03-recordatorios-automaticos.json`
   - `04-formulario-contacto.json`
   - `05-seguimiento-pacientes.json`

### Paso 2: Configurar cada workflow

#### 🔹 Workflow 1: Sistema de Citas

1. Abre `01-sistema-citas.json`
2. Configura estos nodos:

**Nodo "Guardar en Google Sheets":**
```
- Credential: Tu Google Sheets OAuth2
- Document ID: TU_SHEET_ID
- Sheet Name: Citas
- Mapping: Ya está configurado ✅
```

**Nodo "Crear Evento Calendar":**
```
- Credential: Tu Google Calendar OAuth2
- Calendar: primary
- Summary: {{ $json.nombre }} - Cita Médica
- Start: {{ $json.fecha }}T{{ $json.hora }}:00
- Duration: 30 minutos
```

**Nodo "Email Confirmación":**
```
- Credential: Tu Gmail OAuth2
- To: {{ $json.email }}
- Subject: Ya configurado ✅
- Message: Ya configurado ✅
```

**Nodo "WhatsApp Confirmación":**
```
- URL: http://evolution-api:8080/message/sendText/{{instance}}
- Headers: apikey: tu-evolution-api-key
- Body:
{
  "number": "{{ $json.telefono }}",
  "text": "✅ Cita confirmada para {{ $json.nombre }}..."
}
```

3. **Click en Activate** (arriba a la derecha)

---

#### 🔹 Workflow 4: Formulario de Contacto

1. Abre `04-formulario-contacto.json`
2. **Copia la URL del Webhook:**
   - Click en el nodo "Webhook - Formulario Contacto"
   - Copia la URL de **Production**
   - Ejemplo: `http://tu-servidor:5678/webhook/contacto`

3. Configura los nodos:

**Nodo "Guardar en Google Sheets":**
```
- Sheet ID: TU_SHEET_ID
- Sheet Name: Contactos
```

**Nodo "Telegram - Notificar Equipo":**
```
- Chat ID: TU_CHAT_ID (del paso D)
```

4. **Activate** el workflow

---

## ✅ 5. PROBAR CADA WORKFLOW

### Test 1: Formulario de Contacto

Crea un archivo `test-contacto.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Test Contacto</title>
</head>
<body>
    <form id="contactForm">
        <input type="text" id="nombre" placeholder="Nombre" required>
        <input type="email" id="email" placeholder="Email" required>
        <input type="tel" id="telefono" placeholder="Teléfono" required>
        <textarea id="mensaje" placeholder="Mensaje" required></textarea>
        <button type="submit">Enviar</button>
    </form>

    <script>
    document.getElementById('contactForm').onsubmit = async (e) => {
        e.preventDefault();
        
        const data = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            mensaje: document.getElementById('mensaje').value
        };

        try {
            const response = await fetch('http://localhost:5678/webhook/contacto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            alert(result.message);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };
    </script>
</body>
</html>
```

**Abre el archivo en tu navegador y prueba el formulario.**

### Verificar que funcione:
- ✅ Debe aparecer en Google Sheets (pestaña Contactos)
- ✅ Debe llegar email de confirmación
- ✅ Debe llegar notificación a Telegram
- ✅ La página debe mostrar "Gracias por su mensaje"

---

### Test 2: Sistema de Citas

Similar al anterior, crea `test-citas.html`:

```html
<!DOCTYPE html>
<html>
<body>
    <form id="citaForm">
        <input type="text" id="nombre" placeholder="Nombre" required>
        <input type="email" id="email" placeholder="Email" required>
        <input type="tel" id="telefono" placeholder="Teléfono" required>
        <input type="date" id="fecha" required>
        <input type="time" id="hora" required>
        <button type="submit">Agendar Cita</button>
    </form>

    <script>
    document.getElementById('citaForm').onsubmit = async (e) => {
        e.preventDefault();
        
        const data = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            fecha: document.getElementById('fecha').value,
            hora: document.getElementById('hora').value
        };

        try {
            const response = await fetch('http://localhost:5678/webhook/cita', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            alert('✅ ' + result.message);
        } catch (error) {
            alert('❌ Error: ' + error.message);
        }
    };
    </script>
</body>
</html>
```

### Verificar que funcione:
- ✅ Aparece en Google Sheets (Citas)
- ✅ Aparece en Google Calendar
- ✅ Email de confirmación
- ✅ WhatsApp de confirmación
- ✅ Notificación Telegram

---

## 🌐 6. INTEGRACIÓN CON LA WEB

### Actualizar `citas.html`

Encuentra el formulario de citas y agrega este JavaScript:

```javascript
// En citas.html - línea ~473
document.getElementById('appointmentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        nombre: document.getElementById('name').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('phone').value,
        fecha: document.getElementById('date').value,
        hora: document.getElementById('time').value,
        motivo: document.getElementById('reason').value
    };

    // URL de tu webhook n8n
    const webhookURL = 'https://tu-servidor.com/webhook/cita'; // ⚠️ CAMBIAR ESTO

    try {
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        
        if (result.success) {
            alert('✅ ¡Cita agendada! Recibirás confirmación por email y WhatsApp.');
            document.getElementById('appointmentForm').reset();
        }
    } catch (error) {
        alert('❌ Error al agendar. Por favor intente nuevamente.');
        console.error(error);
    }
});
```

---

## 📊 7. MONITOREO Y MANTENIMIENTO

### Dashboard de N8N

1. Ve a **Executions** para ver todas las ejecuciones
2. Filtra por:
   - ✅ Success (exitosas)
   - ❌ Error (fallidas)
   - ⏸️ Waiting (en espera)

### Logs importantes

```bash
# Ver logs de N8N
docker logs n8n

# Ver logs de Evolution API
docker logs evolution-api

# Ver logs en tiempo real
docker logs -f n8n
```

### Backup de Workflows

```bash
# Exporta todos los workflows desde N8N
# Settings → Export → All Workflows

# Guárdalos en:
# Clinica-Dr-William-Cruz/n8n-automation/backups/
```

---

## 🆘 TROUBLESHOOTING

### Problema: Webhook no responde

**Solución:**
1. Verifica que el workflow esté **Activated**
2. Verifica la URL del webhook (Production URL)
3. Revisa los CORS en N8N:
```bash
# En docker-compose.yml
N8N_CORS_ALLOW_ORIGINS=*
```

### Problema: Gmail no envía emails

**Solución:**
1. Verifica que la App Password sea correcta (16 caracteres)
2. Verifica que la verificación en 2 pasos esté activada
3. Prueba con: https://myaccount.google.com/lesssecureapps (desactiva)

### Problema: WhatsApp no envía mensajes

**Solución:**
1. Verifica que la instancia de Evolution API esté conectada
2. Revisa el formato del número: `+506########` o `506########`
3. Verifica el API Key

### Problema: Google Calendar no crea eventos

**Solución:**
1. Re-autoriza las credenciales OAuth2
2. Verifica que el formato de fecha sea: `YYYY-MM-DDTHH:mm:ss`
3. Verifica el timezone: `America/Costa_Rica`

---

## ✅ CHECKLIST FINAL

### Credenciales configuradas:
- [ ] Gmail OAuth2
- [ ] Google Calendar OAuth2
- [ ] Google Sheets OAuth2
- [ ] Telegram Bot Token
- [ ] OpenAI API Key (opcional)
- [ ] Evolution API / WhatsApp Cloud API

### Workflows activos:
- [ ] 01 - Sistema de Citas
- [ ] 02 - Chatbot WhatsApp
- [ ] 03 - Recordatorios Automáticos
- [ ] 04 - Formulario de Contacto
- [ ] 05 - Seguimiento de Pacientes

### Pruebas realizadas:
- [ ] Test formulario de contacto
- [ ] Test sistema de citas
- [ ] Verificado Google Sheets
- [ ] Verificado Google Calendar
- [ ] Verificado emails
- [ ] Verificado WhatsApp
- [ ] Verificado Telegram

### Integración web:
- [ ] Webhook URL actualizada en citas.html
- [ ] Webhook URL actualizada en otros formularios
- [ ] CORS configurado
- [ ] Dominio público configurado (si aplica)

---

## 🎯 PRÓXIMOS PASOS

1. **Producción:** Configura un dominio público para tus webhooks
2. **SSL:** Agrega HTTPS con Let's Encrypt
3. **Monitoreo:** Configura alertas en caso de errores
4. **Optimización:** Ajusta los mensajes según feedback de pacientes
5. **Escalabilidad:** Considera usar bases de datos (PostgreSQL, MongoDB)

---

**¿Necesitas ayuda?** Abre un issue o contacta al equipo de soporte.

**Creado con ❤️ por Rovo Dev**
