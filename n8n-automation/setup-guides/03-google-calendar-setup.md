# 📅 Configurar Google Calendar para N8N (100% GRATIS)

## 🎯 Objetivo
Conectar Google Calendar con N8N para gestionar citas médicas automáticamente.

## ⚠️ Requisitos
- Cuenta de Google (Gmail)
- Google Cloud Console (gratis)

---

## 📝 Paso a Paso

### **1. Crear Proyecto en Google Cloud**

1. Ve a: https://console.cloud.google.com
2. Haz clic en **"Select a project"** → **"New Project"**
3. Nombre: **"Clinica Dr William Cruz"**
4. Haz clic en **"Create"**

---

### **2. Habilitar Google Calendar API**

1. En el menú lateral, ve a: **APIs & Services** → **Library**
2. Busca: **"Google Calendar API"**
3. Haz clic en **"Google Calendar API"**
4. Haz clic en **"Enable"**

---

### **3. Crear Credenciales OAuth 2.0**

1. Ve a: **APIs & Services** → **Credentials**
2. Haz clic en **"+ Create Credentials"** → **"OAuth client ID"**
3. Si pide configurar "OAuth consent screen":
   - Haz clic en **"Configure Consent Screen"**
   - Selecciona **"External"** → **"Create"**
   - Llena:
     - App name: **Clinica Dr William Cruz**
     - User support email: tu email
     - Developer contact: tu email
   - Haz clic en **"Save and Continue"** (deja todo lo demás por defecto)
   - En **"Scopes"** → **"Save and Continue"**
   - En **"Test users"** → Agrega tu email → **"Save and Continue"**

4. Vuelve a **Credentials** → **"+ Create Credentials"** → **"OAuth client ID"**
5. Application type: **"Web application"**
6. Name: **"N8N Clinica"**
7. **Authorized redirect URIs** → **"+ Add URI"**:
   ```
   http://localhost:5678/rest/oauth2-credential/callback
   ```
8. Haz clic en **"Create"**

9. **¡GUARDA!**:
   - Client ID (algo como: `123456-abcdefg.apps.googleusercontent.com`)
   - Client Secret (algo como: `GOCSPX-abcdefghijklmnop`)

---

### **4. Configurar en N8N**

1. En N8N, ve a: **Settings** → **Credentials**
2. Haz clic en **"+ New Credential"**
3. Busca: **"Google Calendar OAuth2 API"**
4. Llena:
   ```
   Credential Name: Google Calendar Clinica
   Client ID: [pega tu Client ID]
   Client Secret: [pega tu Client Secret]
   ```
5. Haz clic en **"Connect my account"**
6. Selecciona tu cuenta de Google
7. Acepta los permisos
8. **¡Listo!** Verás "Connected" en verde

---

### **5. Probar en N8N**

1. Crea un nuevo workflow
2. Agrega **"Manual Trigger"**
3. Agrega **"Google Calendar"**
4. Configura:
   ```yaml
   Credential: Google Calendar Clinica
   Operation: Create
   Calendar: primary
   Start: 2026-01-20T10:00:00
   End: 2026-01-20T11:00:00
   Event Title: Cita de Prueba - Dr. William Cruz
   Description: Paciente de prueba del sistema automatizado
   ```
5. **Execute Workflow**
6. Abre Google Calendar → Deberías ver la cita creada

---

## ✅ Verificación

- [ ] Proyecto creado en Google Cloud
- [ ] Google Calendar API habilitada
- [ ] OAuth credentials creadas
- [ ] Credencial conectada en N8N
- [ ] Cita de prueba creada exitosamente

---

## 📚 Próximas Funcionalidades

Con esta integración puedes:
- ✅ Crear citas automáticamente desde formulario web
- ✅ Actualizar citas
- ✅ Cancelar citas
- ✅ Listar citas del día
- ✅ Buscar disponibilidad

---

## ➡️ Siguiente Paso

Continúa con: **04-google-sheets-setup.md**
