# 📧 Configurar Gmail para N8N (100% GRATIS)

## 🎯 Objetivo
Configurar Gmail para enviar emails automáticos desde N8N sin costo.

## ⚠️ Requisitos
- Cuenta de Gmail activa
- Verificación en 2 pasos habilitada

---

## 📝 Paso a Paso

### **1. Habilitar Verificación en 2 Pasos**

1. Ve a: https://myaccount.google.com/security
2. Busca **"Verificación en 2 pasos"**
3. Haz clic en **"Activar"**
4. Sigue los pasos (normalmente pide tu número de teléfono)

---

### **2. Crear Contraseña de Aplicación**

1. Ve a: https://myaccount.google.com/apppasswords
2. En **"Selecciona la app"** → Elige **"Correo"**
3. En **"Selecciona el dispositivo"** → Elige **"Otro (nombre personalizado)"**
4. Escribe: **"N8N Clinica Dr William Cruz"**
5. Haz clic en **"Generar"**
6. **¡GUARDA LA CONTRASEÑA!** (16 caracteres, algo como: `abcd efgh ijkl mnop`)

---

### **3. Configurar en N8N**

#### **A. Abrir N8N**
```bash
# Si no está corriendo
cd Clinica-Dr-William-Cruz/n8n-automation
docker-compose up -d

# Acceder a:
http://localhost:5678
```

#### **B. Crear Credencial Gmail**

1. En N8N, ve a: **Settings** (⚙️) → **Credentials**
2. Haz clic en **"+ New Credential"**
3. Busca y selecciona: **"Gmail"**
4. Llena los campos:

```
Credential Name: Gmail Clinica Dr William Cruz
Authentication: App Password
Email: tucorreo@gmail.com
Password: [pega la contraseña de 16 caracteres generada]
```

5. Haz clic en **"Save"**

---

### **4. Probar la Configuración**

#### **A. Crear Workflow de Prueba**

1. En N8N, crea un nuevo workflow
2. Agrega un nodo **"Manual Trigger"**
3. Agrega un nodo **"Gmail"**
4. Configura el nodo Gmail:

```yaml
Operation: Send Email
Resource: Message
To: tucorreo@gmail.com  # Envíate a ti mismo
Subject: Prueba de N8N - Clínica Dr William Cruz
Message: ¡Funciona! El sistema de emails está configurado correctamente.
```

5. Conecta los nodos
6. Haz clic en **"Execute Workflow"**
7. **Revisa tu bandeja de entrada** → Deberías recibir el email

---

## ✅ Verificación

Si recibiste el email, ¡todo está configurado correctamente! 🎉

---

## 🔒 Límites de Gmail Gratis

- **500 emails por día** (suficiente para la clínica)
- Si necesitas más, considera:
  - Gmail Workspace ($6/mes por 2,000 emails/día)
  - SendGrid (100 emails/día gratis)

---

## 🐛 Solución de Problemas

### **Error: "Invalid credentials"**
- ✅ Verifica que copiaste bien la contraseña de aplicación
- ✅ Asegúrate de que la verificación en 2 pasos esté activa
- ✅ Intenta generar una nueva contraseña de aplicación

### **Error: "Failed to send"**
- ✅ Verifica tu conexión a internet
- ✅ Revisa que el email receptor sea válido
- ✅ Comprueba los logs de N8N

### **Email no llega**
- ✅ Revisa la carpeta de SPAM
- ✅ Espera 1-2 minutos (a veces hay delay)
- ✅ Verifica que no hayas alcanzado el límite diario

---

## 📚 Recursos Adicionales

- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [N8N Gmail Node Docs](https://docs.n8n.io/integrations/builtin/credentials/google/)

---

## ➡️ Siguiente Paso

Continúa con: **02-evolution-api-setup.md** para configurar WhatsApp.

---

**✅ Checklist:**
- [ ] Verificación en 2 pasos habilitada
- [ ] Contraseña de aplicación generada
- [ ] Credencial creada en N8N
- [ ] Email de prueba enviado y recibido
