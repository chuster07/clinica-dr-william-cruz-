# 📊 Configurar Google Sheets como Base de Datos (100% GRATIS)

## 🎯 Objetivo
Usar Google Sheets como base de datos para almacenar información de pacientes y citas.

## ⚠️ Requisitos
- Proyecto en Google Cloud (del paso anterior)
- Cuenta de Google

---

## 📝 Paso a Paso

### **1. Habilitar Google Sheets API**

1. Ve a: https://console.cloud.google.com
2. Selecciona tu proyecto: **"Clinica Dr William Cruz"**
3. Ve a: **APIs & Services** → **Library**
4. Busca: **"Google Sheets API"**
5. Haz clic en **"Enable"**

---

### **2. Crear Hoja de Cálculo de Pacientes**

1. Ve a: https://sheets.google.com
2. Crea una nueva hoja: **"Clinica - Base de Datos"**
3. Crea las siguientes hojas (pestañas):

#### **Hoja 1: "Pacientes"**
Columnas:
```
| ID | Nombre | Apellido | Telefono | Email | Fecha_Registro | Ultima_Cita |
```

#### **Hoja 2: "Citas"**
Columnas:
```
| ID | ID_Paciente | Fecha | Hora | Servicio | Estado | Notas | Creado_En |
```

#### **Hoja 3: "Contactos"**
Columnas:
```
| ID | Nombre | Email | Telefono | Mensaje | Fecha | Atendido |
```

4. **Copia la URL de la hoja** (algo como: `https://docs.google.com/spreadsheets/d/ABC123XYZ/edit`)
5. **Guarda el Sheet ID**: `ABC123XYZ` (es lo que está entre `/d/` y `/edit`)

---

### **3. Dar Permisos a la Hoja**

1. En la hoja de Google Sheets, haz clic en **"Compartir"**
2. Asegúrate de que el email de tu cuenta Google tenga acceso de **"Editor"**

---

### **4. Configurar en N8N**

Usa las **mismas credenciales de Google Calendar** (OAuth2) porque funciona para todos los servicios de Google.

#### **Crear Credencial (si no la tienes)**

1. En N8N, ve a: **Settings** → **Credentials**
2. **"+ New Credential"** → Busca: **"Google Sheets OAuth2 API"**
3. Usa los mismos Client ID y Client Secret del paso de Calendar
4. **"Connect my account"** → Autoriza

---

### **5. Probar en N8N**

#### **A. Workflow de Prueba - Agregar Paciente**

1. Crea nuevo workflow
2. Agrega **"Manual Trigger"**
3. Agrega **"Set"** (para crear datos de prueba):
   ```json
   {
     "nombre": "Juan",
     "apellido": "Pérez",
     "telefono": "88888888",
     "email": "juan@example.com",
     "fecha_registro": "{{$now.format('yyyy-MM-dd HH:mm:ss')}}"
   }
   ```
4. Agrega **"Google Sheets"**:
   ```yaml
   Credential: Google Sheets OAuth2
   Operation: Append
   Document: By URL
   Document URL: [tu URL de Google Sheets]
   Sheet: Pacientes
   Data Mode: Auto-Map Input Data
   ```
5. **Execute Workflow**
6. Revisa la hoja → Deberías ver el nuevo paciente

---

### **6. Workflow de Prueba - Buscar Paciente**

1. Agrega **"Google Sheets"** (después del Set):
   ```yaml
   Operation: Lookup
   Document: By URL
   Document URL: [tu URL]
   Sheet: Pacientes
   Lookup Column: Telefono
   Lookup Value: 88888888
   ```
2. Execute → Debería encontrar el paciente

---

## 📋 Estructura Recomendada

### **Tabla Pacientes:**
```
ID: Auto-incremental (usa =ROW()-1 en Excel)
Nombre: Texto
Apellido: Texto
Telefono: Texto (sin formato, solo números)
Email: Texto
Fecha_Registro: Fecha y hora
Ultima_Cita: Fecha
```

### **Tabla Citas:**
```
ID: Auto-incremental
ID_Paciente: Referencia a Pacientes.ID
Fecha: Fecha (formato: 2026-01-20)
Hora: Hora (formato: 10:00)
Servicio: Texto
Estado: Pendiente/Confirmada/Completada/Cancelada
Notas: Texto
Creado_En: Fecha y hora
```

---

## ✅ Verificación

- [ ] Google Sheets API habilitada
- [ ] Hoja de cálculo creada con estructura
- [ ] Sheet ID copiado
- [ ] Credencial OAuth2 configurada
- [ ] Prueba de escritura exitosa
- [ ] Prueba de lectura exitosa

---

## 🎨 Tips Avanzados

### **Fórmulas útiles en Google Sheets:**

**Auto-ID:**
```
=IF(A2="","",ROW()-1)
```

**Timestamp automático:**
```
=IF(B2<>"", NOW(), "")
```

**Contar citas:**
```
=COUNTIF(Citas!B:B, A2)
```

---

## ➡️ Siguiente Paso

Continúa con: **05-telegram-bot-setup.md**
