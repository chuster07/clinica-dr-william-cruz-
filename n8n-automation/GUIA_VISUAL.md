# 🎨 GUÍA VISUAL - Configuración N8N Clínica

## 📸 SCREENSHOTS Y PASO A PASO CON IMÁGENES

---

## 1️⃣ INSTALAR N8N

### Terminal / PowerShell:
```bash
cd Clinica-Dr-William-Cruz/n8n-automation
docker-compose up -d
```

### Lo que verás:
```
✅ Creating network "n8n-automation_default"
✅ Creating n8n ... done
✅ Creating evolution-api ... done
✅ Creating postgres ... done
```

### Verificar instalación:
```bash
docker ps
```

Deberías ver:
```
CONTAINER ID   IMAGE              STATUS         PORTS
abc123         n8nio/n8n:latest   Up 2 minutes   0.0.0.0:5678->5678/tcp
def456         evolution-api      Up 2 minutes   0.0.0.0:8080->8080/tcp
```

---

## 2️⃣ PRIMERA VEZ EN N8N

### Abrir navegador: http://localhost:5678

**Pantalla de bienvenida:**
```
┌─────────────────────────────────────┐
│         Welcome to n8n!             │
│                                     │
│  Email:    admin@clinica.com        │
│  Password: ******************       │
│                                     │
│     [Create my account] 🚀          │
└─────────────────────────────────────┘
```

### Crear cuenta de administrador:
- Email: `tu-email@gmail.com`
- Password: `un-password-seguro-123`
- First name: `Admin`
- Last name: `Clínica`

---

## 3️⃣ INTERFAZ DE N8N

### Menú principal (izquierda):
```
📊 Dashboard
📋 Workflows       ← Aquí trabajarás más
🔐 Credentials     ← Configurar aquí
⚡ Executions      ← Ver resultados aquí
⚙️  Settings
```

---

## 4️⃣ CONFIGURAR CREDENCIALES

### Click en "Credentials" (menú izquierda)

### Pantalla:
```
┌────────────────────────────────────────┐
│  Credentials                           │
│  ┌──────────────────────────┐          │
│  │  [+ Create New]          │          │
│  └──────────────────────────┘          │
│                                        │
│  You don't have any credentials yet    │
└────────────────────────────────────────┘
```

---

## 5️⃣ GMAIL - PASO A PASO

### A. Activar 2FA en Gmail

**1. Ir a:** https://myaccount.google.com/security

**2. Buscar:** "Verificación en 2 pasos"

**3. Click:** "Activar"

**4. Seguir pasos:**
```
1. Ingresar contraseña
2. Agregar número de teléfono
3. Recibir código SMS
4. Confirmar
✅ Verificación en 2 pasos activada
```

---

### B. Crear App Password

**1. Ir a:** https://myaccount.google.com/apppasswords

**2. Pantalla:**
```
┌───────────────────────────────────┐
│  Contraseñas de aplicación        │
│                                   │
│  Seleccionar app:   [Correo ▼]   │
│  Seleccionar disp.: [Otro ▼]     │
│                                   │
│  Nombre: [n8n-clinica]            │
│                                   │
│     [Generar]                     │
└───────────────────────────────────┘
```

**3. Aparecerá:**
```
┌───────────────────────────────────┐
│  Tu contraseña de aplicación:     │
│                                   │
│  xxxx xxxx xxxx xxxx              │
│                                   │
│  ⚠️ Cópiala ahora (solo se        │
│     muestra una vez)              │
└───────────────────────────────────┘
```

**4. Copiar los 16 caracteres** (sin espacios)

---

### C. Configurar en N8N

**1. En N8N:** Credentials → Create New

**2. Buscar:** "Gmail"

**3. Opciones que aparecen:**
```
┏━━━━━━━━━━━━━━━━━━━━━━┓
┃ Gmail                ┃  ← SELECCIONAR ESTA
┃ Gmail OAuth2 API     ┃
┗━━━━━━━━━━━━━━━━━━━━━━┛
```

**4. Formulario:**
```
┌─────────────────────────────────────┐
│ Credential Name:                    │
│ [Gmail Clínica]                     │
│                                     │
│ Email:                              │
│ [tu-email@gmail.com]                │
│                                     │
│ App Password:                       │
│ [xxxx xxxx xxxx xxxx]               │
│                                     │
│     [Save] [Test Connection]        │
└─────────────────────────────────────┘
```

**5. Click "Test Connection"**

**Resultado exitoso:**
```
✅ Connection tested successfully!
```

---

## 6️⃣ GOOGLE SHEETS - PASO A PASO

### A. Crear hoja de cálculo

**1. Ir a:** https://sheets.google.com

**2. Click:** "+ Blank" (hoja en blanco)

**3. Renombrar:** "Clinica DB"

**4. Crear pestañas:**

**Pestaña "Citas":**
```
┌─────────┬───────┬──────────┬───────┬──────┬────────┬────────┬──────────────┐
│ Nombre  │ Email │ Teléfono │ Fecha │ Hora │ Estado │ Motivo │ Fecha Reg    │
├─────────┼───────┼──────────┼───────┼──────┼────────┼────────┼──────────────┤
│         │       │          │       │      │        │        │              │
└─────────┴───────┴──────────┴───────┴──────┴────────┴────────┴──────────────┘
```

**Pestaña "Contactos":**
```
┌─────────┬───────┬──────────┬─────────┬───────┬──────────┐
│ Nombre  │ Email │ Teléfono │ Mensaje │ Fecha │ Atendido │
├─────────┼───────┼──────────┼─────────┼───────┼──────────┤
│         │       │          │         │       │          │
└─────────┴───────┴──────────┴─────────┴───────┴──────────┘
```

**5. Copiar ID de la hoja:**

URL: `https://docs.google.com/spreadsheets/d/1ABC123XYZ456/edit`

ID: `1ABC123XYZ456` ← **COPIAR ESTO**

---

### B. Habilitar APIs en Google Cloud

**1. Ir a:** https://console.cloud.google.com

**2. Crear proyecto:**
```
┌────────────────────────────────┐
│  Nuevo Proyecto                │
│                                │
│  Nombre: [Clinica-Automation]  │
│                                │
│     [Crear]                    │
└────────────────────────────────┘
```

**3. Habilitar APIs:**

Buscar: "Google Sheets API"
```
┌────────────────────────────────┐
│  Google Sheets API             │
│  ┌──────────────────┐          │
│  │  [Habilitar]     │          │
│  └──────────────────┘          │
└────────────────────────────────┘
```

Buscar: "Google Calendar API"
```
┌────────────────────────────────┐
│  Google Calendar API           │
│  ┌──────────────────┐          │
│  │  [Habilitar]     │          │
│  └──────────────────┘          │
└────────────────────────────────┘
```

---

### C. Crear credenciales OAuth2

**1. En Google Cloud Console:**
```
APIs y servicios → Credenciales → Crear credenciales
```

**2. Seleccionar:**
```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ID de cliente de OAuth 2.0 ┃ ← ESTA
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**3. Configurar:**
```
┌─────────────────────────────────────────────┐
│ Tipo de aplicación:                         │
│ ○ Aplicación web                            │
│                                             │
│ Nombre: [n8n-clinica]                       │
│                                             │
│ URIs de redireccionamiento autorizados:     │
│ [http://localhost:5678/rest/oauth2-...]     │
│                                             │
│     [Crear]                                 │
└─────────────────────────────────────────────┘
```

**URI completo:**
```
http://localhost:5678/rest/oauth2-credential/callback
```

**4. Copiar credenciales:**
```
┌─────────────────────────────────────┐
│  Cliente de OAuth creado            │
│                                     │
│  ID de cliente:                     │
│  123456-abcdef.apps.googleuser...   │
│  [Copiar] 📋                        │
│                                     │
│  Secreto de cliente:                │
│  GOCSPX-abcdef123456                │
│  [Copiar] 📋                        │
└─────────────────────────────────────┘
```

---

### D. Configurar en N8N

**1. Credentials → Create New → "Google Sheets OAuth2 API"**

**2. Formulario:**
```
┌─────────────────────────────────────┐
│ Credential Name:                    │
│ [Google Sheets Clínica]             │
│                                     │
│ Client ID:                          │
│ [pegar aquí]                        │
│                                     │
│ Client Secret:                      │
│ [pegar aquí]                        │
│                                     │
│     [Connect my Account]            │
└─────────────────────────────────────┘
```

**3. Click "Connect my Account"**

**4. Se abre ventana de Google:**
```
┌─────────────────────────────────────┐
│  Elige una cuenta                   │
│                                     │
│  ○ tu-email@gmail.com               │
│                                     │
│  [Continuar]                        │
└─────────────────────────────────────┘
```

**5. Autorizar:**
```
┌─────────────────────────────────────┐
│  n8n-clinica quiere acceder a:      │
│                                     │
│  ✓ Ver y administrar hojas de       │
│    cálculo de Google                │
│  ✓ Ver y editar eventos en todos    │
│    tus calendarios                  │
│                                     │
│     [Permitir]                      │
└─────────────────────────────────────┘
```

**6. Resultado:**
```
✅ Authentication successful!
```

---

## 7️⃣ TELEGRAM BOT

### A. Crear bot con BotFather

**1. Abrir Telegram**

**2. Buscar:** `@BotFather`

**3. Conversación:**
```
Tú:     /newbot

Bot:    Alright, a new bot. How are we going
        to call it? Please choose a name for 
        your bot.

Tú:     Clínica Dr. William Cruz Bot

Bot:    Good. Now let's choose a username for
        your bot. It must end in `bot`.

Tú:     clinica_drwilliamcruz_bot

Bot:    Done! Congratulations on your new bot.
        You will find it at t.me/clinica_drwilliamcruz_bot
        
        Use this token to access the HTTP API:
        123456789:ABCdefGHIjklMNOpqrsTUVwxyz
        
        📋 COPIAR ESTE TOKEN
```

---

### B. Obtener Chat ID

**1. Buscar:** `@userinfobot`

**2. Click:** Start

**3. Te responde:**
```
┌─────────────────────────────────────┐
│  Id: 123456789  ← COPIAR ESTO       │
│  First name: Tu Nombre              │
│  Username: @tu_username             │
└─────────────────────────────────────┘
```

---

### C. Configurar en N8N

**1. Credentials → Create New → "Telegram API"**

**2. Formulario:**
```
┌─────────────────────────────────────┐
│ Credential Name:                    │
│ [Telegram Clínica]                  │
│                                     │
│ Access Token:                       │
│ [123456789:ABCdefGHIjklMNOpqrsTUV]  │
│                                     │
│     [Save]                          │
└─────────────────────────────────────┘
```

---

## 8️⃣ IMPORTAR WORKFLOW

### A. En N8N

**1. Click:** Workflows (menú izquierda)

**2. Click:** "+ Add workflow" → "Import from File"

**3. Seleccionar:** `04-formulario-contacto.json`

**4. Se importa el workflow:**
```
┌─────────────────────────────────────────────┐
│  Formulario de Contacto                     │
│                                             │
│  [Webhook] → [Format] → [Google Sheets]     │
│            ↓                                │
│        [Email] → [Telegram] → [Response]    │
│                                             │
│  Status: ⚪ Inactive                        │
└─────────────────────────────────────────────┘
```

---

### B. Configurar nodos

**1. Click en nodo "Google Sheets"**

**Panel derecho:**
```
┌─────────────────────────────────────┐
│  Google Sheets                      │
│                                     │
│  Credential:                        │
│  [Google Sheets Clínica ▼]         │
│                                     │
│  Operation: [Append ▼]              │
│                                     │
│  Document ID:                       │
│  [1ABC123XYZ456]  ← PEGAR AQUÍ      │
│                                     │
│  Sheet Name:                        │
│  [Contactos]                        │
└─────────────────────────────────────┘
```

**2. Click en nodo "Telegram"**

```
┌─────────────────────────────────────┐
│  Telegram                           │
│                                     │
│  Credential:                        │
│  [Telegram Clínica ▼]               │
│                                     │
│  Chat ID:                           │
│  [123456789]  ← PEGAR AQUÍ          │
│                                     │
│  Text:                              │
│  [Ya configurado ✅]                 │
└─────────────────────────────────────┘
```

---

### C. Copiar URL del Webhook

**1. Click en nodo "Webhook"**

**Panel derecho:**
```
┌─────────────────────────────────────────────────┐
│  Webhook                                        │
│                                                 │
│  Test URL:                                      │
│  http://localhost:5678/webhook-test/contacto    │
│  [Copy]                                         │
│                                                 │
│  Production URL:                                │
│  http://localhost:5678/webhook/contacto         │
│  [Copy]  ← COPIAR ESTA                          │
└─────────────────────────────────────────────────┘
```

---

### D. Activar Workflow

**1. Click en el switch (arriba a la derecha)**

```
┌─────────────────────────────────────┐
│  Formulario de Contacto             │
│                        [Inactive ▼] │ ← Click aquí
│                                     │
│  ○ Inactive                         │
│  ● Active    ← SELECCIONAR          │
└─────────────────────────────────────┘
```

**Resultado:**
```
✅ Workflow activated successfully!
```

**El switch cambia a verde:** `[Active ✅]`

---

## 9️⃣ PROBAR EL WORKFLOW

### A. Abrir archivo de prueba

**1. Navegar a:** `Clinica-Dr-William-Cruz/n8n-automation/`

**2. Doble click:** `test-contacto.html`

**3. Se abre en el navegador:**
```
┌─────────────────────────────────────────┐
│  🧪 Test - Formulario de Contacto       │
│                                         │
│  ⚙️ Configuración del Webhook            │
│  URL: [http://localhost:5678/webhook...]│
│                                         │
│  Nombre: [          ]                   │
│  Email:  [          ]                   │
│  Teléfono: [        ]                   │
│  Mensaje: [         ]                   │
│                                         │
│     [📤 Enviar Prueba]                   │
└─────────────────────────────────────────┘
```

---

### B. Llenar formulario

**Datos de prueba:**
```
Nombre:    Juan Pérez
Email:     juan.test@gmail.com
Teléfono:  +506 8888-8888
Mensaje:   Prueba del sistema de contacto
```

---

### C. Enviar y verificar

**1. Click:** "Enviar Prueba"

**2. Mensaje de loading:**
```
⏳ Enviando datos al workflow...
```

**3. Mensaje de éxito:**
```
✅ ¡Éxito! Formulario enviado correctamente

📊 Verifica:
• Google Sheets (pestaña Contactos)
• Email de confirmación
• Notificación en Telegram
• Executions en n8n
```

---

### D. Verificar Google Sheets

**Abrir:** https://sheets.google.com → "Clinica DB" → Pestaña "Contactos"

**Deberías ver:**
```
┌──────────┬──────────────────┬───────────────┬──────────┬────────────┬──────────┐
│ Nombre   │ Email            │ Teléfono      │ Mensaje  │ Fecha      │ Atendido │
├──────────┼──────────────────┼───────────────┼──────────┼────────────┼──────────┤
│ Juan     │ juan.test@...    │ +506 8888...  │ Prueba...│ 2026-01-22 │ No       │
│ Pérez    │                  │               │          │            │          │
└──────────┴──────────────────┴───────────────┴──────────┴────────────┴──────────┘
```

✅ **¡FUNCIONA!**

---

### E. Verificar Email

**Inbox:**
```
┌─────────────────────────────────────────┐
│  📧 De: Clínica Dr. William Cruz        │
│  Para: juan.test@gmail.com              │
│  Asunto: Gracias por contactarnos       │
│                                         │
│  Hola Juan,                             │
│                                         │
│  Hemos recibido tu mensaje y nos        │
│  pondremos en contacto contigo pronto.  │
│                                         │
│  Saludos,                               │
│  Clínica Dr. William Cruz               │
└─────────────────────────────────────────┘
```

✅ **¡EMAIL ENVIADO!**

---

### F. Verificar Telegram

**En tu Telegram:**
```
┌─────────────────────────────────────────┐
│  🤖 Clínica Dr. William Cruz Bot        │
│                                         │
│  🔔 Nuevo mensaje de contacto           │
│                                         │
│  👤 Nombre: Juan Pérez                  │
│  📧 Email: juan.test@gmail.com          │
│  📞 Teléfono: +506 8888-8888            │
│                                         │
│  💬 Mensaje:                            │
│  Prueba del sistema de contacto         │
│                                         │
│  🕐 Fecha: 2026-01-22 15:45             │
└─────────────────────────────────────────┘
```

✅ **¡NOTIFICACIÓN RECIBIDA!**

---

### G. Verificar en N8N

**1. En N8N:** Click "Executions" (menú izquierda)

**2. Lista de ejecuciones:**
```
┌────────────────────────────────────────────────────┐
│ Executions                                         │
│                                                    │
│ ✅ Formulario de Contacto  | 2s ago | Success     │
│    └─ Webhook triggered                           │
│                                                    │
│ 📊 1 successful today                             │
└────────────────────────────────────────────────────┘
```

**3. Click en la ejecución para ver detalles:**
```
┌─────────────────────────────────────────┐
│  Execution Details                      │
│                                         │
│  Start: 15:45:23                        │
│  Duration: 2.3s                         │
│  Status: ✅ Success                      │
│                                         │
│  Nodes executed:                        │
│  1. Webhook ✅                           │
│  2. Formatear Datos ✅                   │
│  3. Google Sheets ✅                     │
│  4. Email ✅                             │
│  5. Telegram ✅                          │
│  6. Response ✅                          │
│                                         │
│  6/6 nodes successful                   │
└─────────────────────────────────────────┘
```

✅ **¡TODO FUNCIONANDO!**

---

## 🎉 ¡FELICIDADES!

### Has configurado exitosamente:

✅ N8N instalado y corriendo
✅ Gmail configurado
✅ Google Sheets configurado
✅ Telegram Bot configurado
✅ Workflow importado y activo
✅ Prueba exitosa

---

## 📚 PRÓXIMOS PASOS

### Ahora puedes:

1. **Configurar más workflows:**
   - `01-sistema-citas.json`
   - `03-recordatorios-automaticos.json`

2. **Integrar con tu sitio web:**
   - Actualizar URL en `citas.html`
   - Actualizar URL en `index.html`

3. **Agregar WhatsApp:**
   - Configurar Evolution API
   - Conectar WhatsApp Business

---

## 💡 TIPS VISUALES

### ✅ Verde = Todo bien
### ❌ Rojo = Error
### ⚪ Gris = Inactivo
### 🟡 Amarillo = Advertencia

### En Executions:
- **Verde:** Ejecución exitosa
- **Rojo:** Error en algún nodo
- **Amarillo:** Parcialmente exitoso

### En Workflows:
- **Switch verde:** Activo
- **Switch gris:** Inactivo

---

**🚀 ¡Ahora tienes automatización completa en tu clínica!**

**Creado por:** Rovo Dev
