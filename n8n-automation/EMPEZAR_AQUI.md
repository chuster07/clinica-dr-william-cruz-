# 👋 ¡BIENVENIDO! EMPIEZA AQUÍ

## 🎯 ¿Qué tienes en esta carpeta?

Un sistema **100% GRATIS** para automatizar tu clínica médica:

✅ Recibir citas desde la web  
✅ Confirmaciones automáticas por Email y WhatsApp  
✅ Recordatorios 24h antes  
✅ Chatbot inteligente  
✅ Todo sincronizado con Google Calendar y Sheets  

**💰 Costo total: $0-10/mes** (vs $50-200 de otros sistemas)

---

## 🚀 INICIO RÁPIDO (3 Opciones)

### Opción 1: Quiero probarlo YA (15 minutos) ⚡

**Para ti si:** Quieres ver algo funcionando rápido

**Lee:** [`INICIO_RAPIDO.md`](INICIO_RAPIDO.md)

**Pasos:**
1. `docker-compose up -d`
2. Configura Gmail y Google Sheets
3. Importa un workflow
4. ¡Pruébalo!

---

### Opción 2: Quiero entender todo (1 hora) 📖

**Para ti si:** Vas a implementarlo en producción

**Lee:** [`CONFIGURACION_COMPLETA.md`](CONFIGURACION_COMPLETA.md)

**Pasos:**
1. Instalación completa de n8n
2. Configuración detallada de cada servicio
3. Importar todos los workflows
4. Pruebas completas
5. Integración con tu web

---

### Opción 3: Aprendo mejor con imágenes 🎨

**Para ti si:** Prefieres ver screenshots paso a paso

**Lee:** [`GUIA_VISUAL.md`](GUIA_VISUAL.md)

**Incluye:**
- Capturas de pantalla de cada paso
- Ejemplos visuales de configuración
- Interfaces de cada servicio
- Resultados esperados

---

## 📚 Todos los Archivos Disponibles

### 📖 Documentación:
- **`README.md`** - Descripción general del proyecto
- **`INICIO_RAPIDO.md`** - Configuración express (15 min)
- **`CONFIGURACION_COMPLETA.md`** - Guía detallada paso a paso
- **`GUIA_VISUAL.md`** - Guía con screenshots
- **`CHECKLIST.md`** - Lista de verificación
- **`README_RESUMEN.md`** - Resumen ejecutivo

### 🧪 Archivos de Prueba:
- **`test-contacto.html`** - Probar formulario de contacto
- **`test-citas.html`** - Probar sistema de citas

### ⚙️ Configuración:
- **`.env.example`** - Variables de entorno (copiar a .env)
- **`docker-compose.yml`** - Servicios Docker

### 🔍 Verificación:
- **`verificar-configuracion.sh`** - Script Linux/Mac
- **`verificar-configuracion.ps1`** - Script Windows

### 📦 Workflows (Importar a n8n):
- **`workflows/01-sistema-citas.json`** - Agendar citas
- **`workflows/02-chatbot-whatsapp.json`** - Bot inteligente
- **`workflows/03-recordatorios-automaticos.json`** - Recordatorios
- **`workflows/04-formulario-contacto.json`** - Formulario web ⭐ **Empezar con este**
- **`workflows/05-seguimiento-pacientes.json`** - Reactivación

---

## ✅ Checklist Rápido

Antes de empezar, necesitas:

- [ ] **Docker instalado** (https://www.docker.com/get-docker)
- [ ] **Cuenta de Gmail** (para enviar emails)
- [ ] **Cuenta de Google** (para Sheets y Calendar)
- [ ] **Telegram instalado** (para notificaciones)
- [ ] **WhatsApp Business** (opcional, para mensajes)
- [ ] **10-15 minutos libres** para configurar

---

## 🎓 ¿Eres principiante? Sigue este orden:

### Día 1: Lo Básico
1. Lee `INICIO_RAPIDO.md` (15 min)
2. Instala n8n con Docker (5 min)
3. Configura Gmail (5 min)
4. Crea Google Sheets (5 min)
5. Crea bot de Telegram (2 min)
6. **Total: ~30 minutos**

### Día 2: Primer Workflow
1. Importa `04-formulario-contacto.json`
2. Configura las credenciales
3. Prueba con `test-contacto.html`
4. Verifica que funcione
5. **Total: ~20 minutos**

### Día 3: Sistema de Citas
1. Importa `01-sistema-citas.json`
2. Configura Google Calendar
3. Prueba con `test-citas.html`
4. Integra con tu web
5. **Total: ~30 minutos**

### Día 4: Recordatorios
1. Importa `03-recordatorios-automaticos.json`
2. Configura horarios
3. Prueba manualmente
4. **Total: ~15 minutos**

### Día 5: WhatsApp (Opcional)
1. Instala Evolution API
2. Conecta WhatsApp
3. Prueba envío de mensajes
4. **Total: ~20 minutos**

---

## 🆘 ¿Problemas?

### "No sé por dónde empezar"
→ Lee `INICIO_RAPIDO.md` y sigue los pasos

### "No me funciona algo"
→ Ejecuta el script de verificación:
```bash
./verificar-configuracion.sh  # Linux/Mac
.\verificar-configuracion.ps1  # Windows
```

### "No entiendo un paso"
→ Lee `GUIA_VISUAL.md` (tiene imágenes)

### "Quiero todo el detalle"
→ Lee `CONFIGURACION_COMPLETA.md`

### "¿Cómo verifico que todo esté bien?"
→ Usa `CHECKLIST.md`

---

## 💡 Consejos Pro

1. **Empieza simple:** No intentes configurar todo el primer día
2. **Un workflow a la vez:** Domina uno antes de pasar al siguiente
3. **Prueba cada paso:** Usa los archivos test-*.html
4. **Lee los errores:** Los logs de n8n son muy informativos
5. **Haz backups:** Exporta workflows después de configurarlos

---

## 📊 ¿Qué lograrás?

Después de completar la configuración:

✅ **Recibir citas 24/7** - Sin estar pendiente del teléfono  
✅ **Confirmaciones automáticas** - Por email y WhatsApp  
✅ **Calendar sincronizado** - Todo actualizado en tiempo real  
✅ **Recordatorios automáticos** - 24h antes, sin olvidar nada  
✅ **Base de datos** - En Google Sheets, fácil de usar  
✅ **Notificaciones al equipo** - Por Telegram instantáneamente  
✅ **Chatbot 24/7** - Responde preguntas comunes  

**Resultado:** Ahorras 15-20 horas/semana en gestión manual

---

## 🎯 Siguiente Paso

### Si tienes 15 minutos ahora:
👉 Lee [`INICIO_RAPIDO.md`](INICIO_RAPIDO.md) y empieza

### Si tienes más tiempo:
👉 Lee [`CONFIGURACION_COMPLETA.md`](CONFIGURACION_COMPLETA.md)

### Si prefieres ver imágenes:
👉 Lee [`GUIA_VISUAL.md`](GUIA_VISUAL.md)

---

## 📞 Información de Soporte

### Recursos incluidos:
- ✅ Documentación completa en español
- ✅ Scripts de verificación automática
- ✅ Archivos de prueba listos
- ✅ Workflows pre-configurados
- ✅ Checklist de verificación

### Recursos externos:
- 🌐 [N8N Docs](https://docs.n8n.io)
- 🌐 [Evolution API](https://doc.evolution-api.com)
- 🌐 [Google Cloud Console](https://console.cloud.google.com)

---

## 🎉 ¡Estás a 15 minutos de automatizar tu clínica!

**No esperes más, empieza ahora:**

```bash
# Paso 1: Ve a la carpeta
cd Clinica-Dr-William-Cruz/n8n-automation

# Paso 2: Lee la guía rápida
cat INICIO_RAPIDO.md  # o ábrela con tu editor

# Paso 3: ¡Comienza!
```

---

**¿Listo?** 👉 Ve a [`INICIO_RAPIDO.md`](INICIO_RAPIDO.md)

**¿Dudas?** 👉 Lee este archivo de nuevo o revisa [`README.md`](README.md)

---

**🏥 Creado para ayudar a profesionales de la salud a ahorrar tiempo y servir mejor a sus pacientes**

**Creado por:** Rovo Dev  
**Fecha:** Enero 2026  
