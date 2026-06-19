# 📱 CONFIGURAR CREDENCIALES DE WHATSAPP EN N8N

## 🎯 Paso a Paso

### **PASO 1: Ir a Credenciales en n8n**

1. En tu n8n: https://c19-ef2.aiagent777.co
2. Click en tu **icono de usuario** (arriba derecha)
3. Click en **"Credentials"**
4. Click en **"+ Add credential"**

---

### **PASO 2: Buscar WhatsApp**

1. En el buscador escribe: **"WhatsApp"**
2. Selecciona: **"WhatsApp Business Cloud API"**

---

### **PASO 3: Completar los datos**

Necesitas estos 3 valores de tu cuenta de Meta:

```
📋 DATOS NECESARIOS:
├─ Access Token: EAAxxxxxxxxxxxxxxxxxxxxxxx
├─ Phone Number ID: 123456789012345
└─ Business Account ID: 987654321098765
```

**Campos en n8n:**

| Campo en n8n | Valor que debes poner |
|--------------|----------------------|
| **Credential Name** | `WhatsApp Clinica` |
| **Access Token** | Tu token de Meta (empieza con EAA...) |
| **Phone Number ID** | Tu Phone Number ID de Meta |
| **Business Account ID** | Tu Business Account ID |

---

### **PASO 4: Guardar**

1. Click en **"Save"**
2. ✅ La credencial estará lista para usar

---

## 🔍 OBTENER TUS DATOS DE META

Si no los tienes a mano:

### **Ir a Meta Developer Console:**
https://developers.facebook.com/apps

1. Selecciona tu **App**
2. En el menú lateral: **WhatsApp → API Setup**

**Ahí encontrarás:**
- ✅ **Temporary Access Token** (copia este)
- ✅ **Phone Number ID** (debajo del número)
- ✅ **WhatsApp Business Account ID** (arriba)

---

## ⚠️ IMPORTANTE

**Access Token Temporal vs Permanente:**
- El token que ves ahí es **temporal** (24-48 horas)
- Para producción necesitas generar un **token permanente**

**Generar Token Permanente:**
1. En Meta: Tools → **System Users**
2. Crear un System User
3. Asignar permisos de WhatsApp
4. Generar token permanente

---

## ✅ VERIFICAR QUE FUNCIONA

Después de crear la credencial:

1. Ve a cualquier workflow (ej: 03-recordatorios)
2. Click en el nodo **"Enviar WhatsApp"**
3. En "Credential to connect with": Selecciona **"WhatsApp Clinica"**
4. Click en **"Test"** para verificar

---

## 🆘 ¿NECESITAS AYUDA?

**¿Tienes los datos de Meta a mano?**
- ✅ Sí → Sigue los pasos arriba
- ❌ No → Dime y te guío para obtenerlos

**¿Estás viendo la pantalla de credenciales en n8n?**
- Dime qué ves y te ayudo paso a paso
