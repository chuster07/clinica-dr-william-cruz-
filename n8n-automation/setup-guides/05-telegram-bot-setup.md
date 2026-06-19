# 🤖 Configurar Telegram Bot para Notificaciones (100% GRATIS)

## 🎯 Objetivo
Crear un bot de Telegram para recibir notificaciones internas del equipo médico.

## ⚠️ Requisitos
- Telegram instalado en tu teléfono
- 5 minutos de tu tiempo

---

## 📝 Paso a Paso

### **1. Crear Bot con BotFather**

1. Abre Telegram
2. Busca: **@BotFather**
3. Inicia conversación: `/start`
4. Crea nuevo bot: `/newbot`
5. Nombre del bot: **"Clinica Dr William Cruz Bot"**
6. Username del bot: **"ClinicaDrWilliamCruzBot"** (debe terminar en "bot")
7. **¡GUARDA EL TOKEN!** (algo como: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)

---

### **2. Obtener tu Chat ID**

#### **Opción A - Usando otro bot (más fácil):**

1. Busca en Telegram: **@userinfobot**
2. Inicia: `/start`
3. Te dará tu **Chat ID** (número como: `123456789`)
4. **¡Guarda este Chat ID!**

#### **Opción B - Manualmente:**

1. Envía un mensaje a tu bot (búscalo por el username)
2. Abre en navegador:
   ```
   https://api.telegram.org/bot<TU_TOKEN>/getUpdates
   ```
   Reemplaza `<TU_TOKEN>` con tu token
3. Busca en el JSON: `"chat":{"id":123456789}`
4. Ese es tu Chat ID

---

### **3. Crear Chat de Grupo (Opcional)**

Si quieres que **todo el equipo** reciba notificaciones:

1. Crea un grupo en Telegram: **"Clínica - Notificaciones"**
2. Agrega tu bot al grupo
3. Hazlo administrador
4. Envía un mensaje en el grupo
5. Usa el método B anterior para obtener el **Group Chat ID** (será negativo, como: `-987654321`)

---

### **4. Configurar en N8N**

1. En N8N, ve a: **Settings** → **Credentials**
2. **"+ New Credential"** → Busca: **"Telegram API"**
3. Llena:
   ```
   Credential Name: Telegram Bot Clinica
   Access Token: [tu token del BotFather]
   ```
4. **Save**

---

### **5. Probar en N8N**

#### **Workflow de Prueba:**

1. Crea nuevo workflow
2. Agrega **"Manual Trigger"**
3. Agrega **"Telegram"**:
   ```yaml
   Credential: Telegram Bot Clinica
   Resource: Message
   Operation: Send Message
   Chat ID: [tu Chat ID]
   Text: 🏥 ¡Sistema de notificaciones de la Clínica Dr. William Cruz activado!
   
   ✅ Recibirás alertas de:
   - Nuevas citas
   - Formularios de contacto
   - Recordatorios pendientes
   ```
4. **Execute Workflow**
5. Revisa Telegram → Deberías recibir el mensaje

---

## 📱 Tipos de Notificaciones

### **A. Nueva Cita Agendada:**
```
🗓️ NUEVA CITA

👤 Paciente: Juan Pérez
📞 Teléfono: 8888-8888
📧 Email: juan@example.com

📅 Fecha: 20/01/2026
⏰ Hora: 10:00 AM
💼 Servicio: Macrobiótica

✅ Confirmada por WhatsApp
```

### **B. Nuevo Contacto:**
```
📝 NUEVO CONTACTO WEB

👤 Nombre: María López
📞 Teléfono: 7777-7777
📧 Email: maria@example.com

💬 Mensaje:
"Quisiera información sobre tratamientos de fitoterapia"

⏱️ Recibido: 19/01/2026 14:30
```

### **C. Recordatorio de Seguimiento:**
```
⚠️ SEGUIMIENTO PENDIENTE

👤 Paciente: Carlos Rojas
📅 Última cita: 15/01/2026
🔔 Recordar: Llamar para check-in post-consulta

📞 Contactar al: 6666-6666
```

---

## ✅ Verificación

- [ ] Bot creado con BotFather
- [ ] Token guardado
- [ ] Chat ID obtenido
- [ ] Credencial configurada en N8N
- [ ] Mensaje de prueba recibido

---

## 🎨 Features Avanzadas

### **Enviar con Botones:**
```yaml
# En el nodo Telegram
Operation: Send Message
Reply Markup: Inline Keyboard
Inline Keyboard:
[
  [
    {"text": "✅ Confirmar", "callback_data": "confirmar"},
    {"text": "❌ Cancelar", "callback_data": "cancelar"}
  ]
]
```

### **Enviar con Imagen:**
```yaml
Operation: Send Photo
Chat ID: [tu Chat ID]
Binary Data: true
Binary Property: data
Caption: Recordatorio de cita - Clínica Dr. William Cruz
```

### **Enviar Archivo:**
```yaml
Operation: Send Document
Chat ID: [tu Chat ID]
Binary Data: true
Binary Property: data
Caption: Informe del paciente
```

---

## 🐛 Solución de Problemas

### **Error: "Bot was blocked by the user"**
- Debes iniciar conversación con el bot primero
- Envía `/start` a tu bot en Telegram

### **Error: "Chat not found"**
- Verifica que el Chat ID sea correcto
- Si es grupo, debe ser negativo (-123456)
- El bot debe estar en el grupo

### **No recibo mensajes**
- Verifica que el token sea correcto
- Comprueba que el Chat ID sea tuyo
- Revisa los logs de N8N

---

## 📊 Límites (GRATIS)

- ✅ **Mensajes ilimitados**
- ✅ **Bots ilimitados**
- ✅ **Sin costo mensual**
- ✅ **APIs súper rápidas**

---

## 🔒 Seguridad

- **No compartas el token** del bot
- **Usa grupos privados** para notificaciones sensibles
- **No envíes datos médicos** completos por Telegram (solo referencias)

---

## ➡️ Siguiente Paso

¡Ahora tienes todas las credenciales configuradas! 

Continúa con los **workflows** en la carpeta `workflows/`

---

**✅ Checklist Final de Credenciales:**
- [ ] Gmail configurado
- [ ] Evolution API (WhatsApp) corriendo
- [ ] Google Calendar conectado
- [ ] Google Sheets configurado
- [ ] Telegram Bot activo
- [ ] OpenAI API Key lista (ya la tienes)

**¡Estás listo para crear las automatizaciones! 🎉**
