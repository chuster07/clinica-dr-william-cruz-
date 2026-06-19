# 📱 Configurar Evolution API para WhatsApp (100% GRATIS)

## 🎯 Objetivo
Configurar WhatsApp Business usando Evolution API self-hosted (completamente gratis).

## ⚠️ Requisitos
- Docker y Docker Compose instalados
- WhatsApp en tu teléfono
- Puerto 8080 disponible

---

## 📝 Paso a Paso

### **1. Verificar Docker**

```bash
# Verificar que Docker esté corriendo
docker --version
docker-compose --version

# Si no está instalado, instala Docker Desktop:
# Windows/Mac: https://www.docker.com/products/docker-desktop
```

---

### **2. Configurar API Key Segura**

1. Edita el archivo `docker-compose.yml`:

```bash
cd Clinica-Dr-William-Cruz/n8n-automation
# Abre docker-compose.yml
```

2. Cambia esta línea (línea 40):
```yaml
- AUTHENTICATION_API_KEY=TU_API_KEY_SECRETA_AQUI_123456
```

Por algo como:
```yaml
- AUTHENTICATION_API_KEY=ClinicaDrWilliamCruz2026_Segura_API_Key_987654321
```

**¡GUARDA ESTA API KEY!** La necesitarás para conectar N8N.

---

### **3. Levantar Evolution API**

```bash
cd Clinica-Dr-William-Cruz/n8n-automation
docker-compose up -d evolution-api

# Ver logs
docker logs -f evolution_api_clinica
```

Espera hasta ver: **"Server started on port 8080"**

---

### **4. Crear Instancia de WhatsApp**

#### **A. Usando la API (Recomendado)**

```bash
curl -X POST http://localhost:8080/instance/create \
  -H "apikey: ClinicaDrWilliamCruz2026_Segura_API_Key_987654321" \
  -H "Content-Type: application/json" \
  -d '{
    "instanceName": "clinica-whatsapp",
    "qrcode": true,
    "integration": "WHATSAPP-BAILEYS"
  }'
```

#### **B. Respuesta esperada:**
```json
{
  "instance": {
    "instanceName": "clinica-whatsapp",
    "status": "created"
  },
  "hash": {
    "apikey": "TU_INSTANCE_KEY_AQUI"
  },
  "qrcode": {
    "code": "...",
    "base64": "data:image/png;base64,..."
  }
}
```

**¡GUARDA EL `apikey` DE LA INSTANCIA!**

---

### **5. Conectar WhatsApp (Escanear QR)**

#### **Opción A - Por API:**

```bash
# Obtener QR Code
curl http://localhost:8080/instance/connect/clinica-whatsapp \
  -H "apikey: ClinicaDrWilliamCruz2026_Segura_API_Key_987654321"
```

La respuesta tendrá un `base64` del QR code.

#### **Opción B - Por el Panel Web:**

1. Abre: http://localhost:8080/manager
2. Login con tu API Key
3. Selecciona la instancia `clinica-whatsapp`
4. Haz clic en **"Connect"**
5. **Escanea el QR** con tu WhatsApp:
   - Abre WhatsApp en tu teléfono
   - Ve a **Menú (⋮)** → **Dispositivos vinculados**
   - Toca **"Vincular un dispositivo"**
   - Escanea el QR que aparece en pantalla

---

### **6. Verificar Conexión**

```bash
# Verificar estado
curl http://localhost:8080/instance/connectionState/clinica-whatsapp \
  -H "apikey: ClinicaDrWilliamCruz2026_Segura_API_Key_987654321"
```

Respuesta esperada:
```json
{
  "instance": {
    "instanceName": "clinica-whatsapp",
    "state": "open"
  }
}
```

---

### **7. Enviar Mensaje de Prueba**

```bash
curl -X POST http://localhost:8080/message/sendText/clinica-whatsapp \
  -H "apikey: ClinicaDrWilliamCruz2026_Segura_API_Key_987654321" \
  -H "Content-Type: application/json" \
  -d '{
    "number": "50612345678",
    "text": "¡Hola! Sistema de automatización de la Clínica Dr. William Cruz activado ✅"
  }'
```

**Nota:** Reemplaza `50612345678` con tu número en formato internacional (506 = código de Costa Rica).

---

### **8. Configurar en N8N**

#### **A. Crear Credencial HTTP**

1. En N8N, ve a: **Settings** → **Credentials**
2. Crea **"Header Auth"**:

```
Credential Name: Evolution API Clinica
Name: apikey
Value: ClinicaDrWilliamCruz2026_Segura_API_Key_987654321
```

#### **B. Usar en Workflows**

Usa el nodo **"HTTP Request"** con:

```yaml
Method: POST
URL: http://evolution-api:8080/message/sendText/clinica-whatsapp
Authentication: Header Auth (selecciona la credencial creada)
Body Parameters (JSON):
{
  "number": "{{$json.telefono}}",
  "text": "{{$json.mensaje}}"
}
```

---

## ✅ Verificación

- [ ] Evolution API corriendo (puerto 8080)
- [ ] Instancia creada (`clinica-whatsapp`)
- [ ] QR escaneado y conectado
- [ ] Estado: `open`
- [ ] Mensaje de prueba enviado y recibido

---

## 🎨 Features Adicionales

### **Enviar con Imagen:**
```bash
curl -X POST http://localhost:8080/message/sendMedia/clinica-whatsapp \
  -H "apikey: TU_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "number": "50612345678",
    "mediatype": "image",
    "media": "https://ejemplo.com/imagen.jpg",
    "caption": "Recordatorio de cita - Clínica Dr. William Cruz"
  }'
```

### **Enviar con Botones:**
```bash
curl -X POST http://localhost:8080/message/sendButtons/clinica-whatsapp \
  -H "apikey: TU_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "number": "50612345678",
    "title": "Confirmar Cita",
    "description": "Por favor confirme su cita del 20 de Enero",
    "buttons": [
      {"id": "confirmar", "text": "✅ Confirmar"},
      {"id": "cancelar", "text": "❌ Cancelar"}
    ]
  }'
```

---

## 🐛 Solución de Problemas

### **Error: "Container not found"**
```bash
docker-compose down
docker-compose up -d evolution-api
```

### **QR Code expira antes de escanear**
- Genera un nuevo QR: vuelve a ejecutar el comando de `connect`
- El QR dura 30 segundos

### **WhatsApp se desconecta**
- Normal si apagas el servidor
- Reconecta escaneando el QR nuevamente
- O mantén el contenedor siempre corriendo

### **No puedo enviar mensajes**
- ✅ Verifica que el estado sea `open`
- ✅ Número en formato internacional (sin +, con código de país)
- ✅ El número debe tener WhatsApp activo

---

## 📊 Límites (GRATIS)

- ✅ **Mensajes ilimitados** (depende de tu WhatsApp)
- ✅ **Múltiples instancias** (puedes tener varias cuentas)
- ✅ **Sin costo mensual**
- ⚠️ WhatsApp puede banear si envías spam (respeta a tus pacientes)

---

## 🔒 Seguridad

- **Cambia la API Key** regularmente
- **No expongas el puerto 8080** a internet sin SSL
- **Usa un número business** dedicado para la clínica

---

## 📚 Recursos

- [Evolution API Docs](https://doc.evolution-api.com)
- [Evolution API GitHub](https://github.com/EvolutionAPI/evolution-api)

---

## ➡️ Siguiente Paso

Continúa con: **03-google-calendar-setup.md**

---

**¡WhatsApp configurado exitosamente! 🎉**
