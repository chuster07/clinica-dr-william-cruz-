# 🔧 INSTRUCCIONES: Cambiar a WhatsApp Cloud API

## 📍 Estás en el nodo "Enviar WhatsApp" que tiene esta configuración:

**❌ ACTUAL (Evolution API):**
```
URL: http://evolution-api:8080/message/sendText/clinica-whatsapp
Body: { "number": "...", "text": "..." }
```

---

## ✅ NUEVA CONFIGURACIÓN (WhatsApp Cloud API):

### **PASO 1: Cambiar URL**

**Campo:** URL  
**Valor NUEVO:**
```
https://graph.facebook.com/v18.0/TU_PHONE_NUMBER_ID/messages
```

⚠️ **Reemplaza `TU_PHONE_NUMBER_ID`** con tu Phone Number ID real de Meta

**Ejemplo:**
```
https://graph.facebook.com/v18.0/123456789012345/messages
```

---

### **PASO 2: Configurar Headers**

1. Click en **"Send Headers"** → Activar (toggle verde)
2. Click en **"+ Add Parameter"**
3. Agregar:

| Name | Value |
|------|-------|
| `Content-Type` | `application/json` |

---

### **PASO 3: Configurar Authentication**

**Ya tienes:** `Header Auth account 4`

**Edita esa credencial:**
1. Click en el icono de lápiz junto a "Header Auth account 4"
2. Verifica/cambia:
   - **Name:** `Authorization`
   - **Value:** `Bearer TU_ACCESS_TOKEN_AQUI`

**Ejemplo:**
```
Authorization: Bearer EAALxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

### **PASO 4: Cambiar Body Parameters**

**Elimina los parámetros actuales:**
- ❌ `number`
- ❌ `text`

**Agrega estos NUEVOS parámetros:**

#### **Parámetro 1:**
- **Name:** `messaging_product`
- **Value:** `whatsapp`

#### **Parámetro 2:**
- **Name:** `to`  
- **Value:** `={{ '506' + $json.telefono }}`

#### **Parámetro 3:**
- **Name:** `type`
- **Value:** `text`

#### **Parámetro 4:**
- **Name:** `text`
- **Value:** (copiar el JSON de abajo)

```json
={{ {
  "body": $json.tipo_recordatorio === '24h' 
    ? '⏰ *RECORDATORIO DE CITA*\n\nHola ' + $json.nombre + ',\n\nLe recordamos su cita mañana en la Clínica Dr. William Cruz:\n\n📅 Fecha: ' + $json.fecha + '\n⏰ Hora: ' + $json.hora + '\n💼 Servicio: ' + $json.servicio + '\n\n📍 Pérez Zeledón, Costa Rica\n📞 Dudas: 2770-3198\n\n¡Le esperamos! 🏥'
    : '⏰⏰ *RECORDATORIO URGENTE*\n\nHola ' + $json.nombre + ',\n\n¡Su cita es en 2 horas!\n\n📅 Hoy a las: ' + $json.hora + '\n💼 ' + $json.servicio + '\n\n¡No olvide su cita! 🏥'
} }}
```

---

## 🎯 RESUMEN VISUAL:

```
┌─────────────────────────────────────┐
│ HTTP Request Node                   │
├─────────────────────────────────────┤
│ Method: POST                        │
│ URL: https://graph.facebook.com/... │
│                                     │
│ Authentication: Header Auth         │
│   └─ Authorization: Bearer TOKEN    │
│                                     │
│ Headers:                            │
│   └─ Content-Type: application/json │
│                                     │
│ Body Parameters:                    │
│   ├─ messaging_product: whatsapp    │
│   ├─ to: {{ telefono }}             │
│   ├─ type: text                     │
│   └─ text: { body: "mensaje" }      │
└─────────────────────────────────────┘
```

---

## ✅ DESPUÉS DE CAMBIAR:

1. Click en **"Save"** (guardar el workflow)
2. Click en **"Execute Node"** (probar el nodo)
3. Verificar que no haya errores

---

## 🆘 SI HAY ERROR:

**Error común:** "Invalid parameter"
- **Solución:** Verifica que el campo `text` sea un objeto JSON, no un string simple

**Error:** "Authentication failed"
- **Solución:** Verifica tu Access Token en la credencial Header Auth
