# 📚 ÍNDICE DE DOCUMENTACIÓN

## 🎯 Guía Rápida de Navegación

Este índice te ayuda a encontrar exactamente lo que necesitas según tu situación.

---

## 🚀 ARCHIVOS PRINCIPALES (Empezar aquí)

### 1. [`EMPEZAR_AQUI.md`](EMPEZAR_AQUI.md) ⭐⭐⭐⭐⭐
**¿Cuándo leer?** AHORA - Es tu punto de entrada principal

**Contenido:**
- 3 caminos para empezar según tu nivel
- Orientación personalizada
- Checklist rápido pre-inicio
- Enlaces a todos los recursos

**Tiempo de lectura:** 5 minutos

---

## ⚡ CONFIGURACIÓN RÁPIDA

### 2. [`INICIO_RAPIDO.md`](INICIO_RAPIDO.md) ⚡⚡⚡⚡⚡
**¿Cuándo leer?** Si quieres algo funcionando en 15 minutos

**Contenido:**
- 5 pasos express
- Solo lo esencial
- Sin detalles técnicos complejos
- Configuración mínima viable

**Tiempo total:** 15-20 minutos
**Nivel:** Principiante
**Resultado:** Workflow de contacto funcionando

---

## 📖 CONFIGURACIÓN COMPLETA

### 3. [`CONFIGURACION_COMPLETA.md`](CONFIGURACION_COMPLETA.md) 📖📖📖📖📖
**¿Cuándo leer?** Para implementación en producción

**Contenido:**
- Guía paso a paso detallada
- Configuración de TODOS los servicios
- Troubleshooting completo
- Mejores prácticas
- Seguridad y monitoreo

**Secciones:**
1. Pre-requisitos (10 min)
2. Instalación de N8N (5 min)
3. Configuración de Credenciales (30 min)
   - Gmail
   - Google Calendar
   - Google Sheets
   - Telegram
   - WhatsApp
   - OpenAI
4. Importar Workflows (15 min)
5. Pruebas (20 min)
6. Integración Web (15 min)
7. Monitoreo (10 min)

**Tiempo total:** 2-3 horas
**Nivel:** Intermedio a Avanzado
**Resultado:** Sistema completo en producción

---

## 🎨 GUÍA VISUAL

### 4. [`GUIA_VISUAL.md`](GUIA_VISUAL.md) 🎨🎨🎨🎨🎨
**¿Cuándo leer?** Si prefieres ver imágenes y screenshots

**Contenido:**
- Screenshots de cada pantalla
- Ejemplos visuales de configuración
- Interfaces explicadas con flechas
- Resultados esperados con capturas

**Secciones con imágenes:**
1. Instalación de N8N
2. Primera vez en N8N
3. Configurar Gmail (con capturas de Google)
4. Configurar Google Sheets (paso a paso visual)
5. Configurar Telegram Bot (con screenshots)
6. Importar workflows (capturas de n8n)
7. Probar workflows (resultados visuales)

**Tiempo total:** 1 hora
**Nivel:** Visual/Principiante
**Resultado:** Entender cada paso visualmente

---

## ✅ VERIFICACIÓN

### 5. [`CHECKLIST.md`](CHECKLIST.md) ✅✅✅✅✅
**¿Cuándo usar?** Durante y después de la configuración

**Contenido:**
- 8 fases de configuración
- Cada paso con checkbox [ ]
- Comandos de verificación
- Soluciones rápidas

**Fases:**
1. Instalación básica
2. Credenciales (6 servicios)
3. Importar workflows
4. Configurar workflows
5. Pruebas
6. Integración web
7. Producción
8. Monitoreo

**Tiempo:** Usar durante todo el proceso
**Nivel:** Todos
**Resultado:** Asegurar que nada se olvide

---

## 📄 INFORMACIÓN GENERAL

### 6. [`README.md`](README.md) 📄📄📄📄
**¿Cuándo leer?** Para entender el proyecto completo

**Contenido:**
- Descripción del sistema
- Arquitectura técnica
- Workflows incluidos
- Costos detallados
- Stack tecnológico
- Troubleshooting básico

**Tiempo de lectura:** 10 minutos
**Nivel:** Todos
**Resultado:** Visión general del proyecto

---

### 7. [`README_RESUMEN.md`](README_RESUMEN.md) 📊📊📊
**¿Cuándo leer?** Para presentar a otros o decisiones ejecutivas

**Contenido:**
- Resumen ejecutivo
- Beneficios cuantificados
- Comparación de costos
- ROI esperado
- Métricas de éxito

**Tiempo de lectura:** 5 minutos
**Nivel:** Ejecutivo/Gerencial
**Resultado:** Decisión informada

---

### 8. [`RESUMEN_FINAL.md`](RESUMEN_FINAL.md) 📋📋📋
**¿Cuándo leer?** Después de revisar todo, como referencia

**Contenido:**
- Inventario completo de archivos
- Niveles de implementación
- Resultados por nivel
- Caminos recomendados

**Tiempo de lectura:** 7 minutos
**Nivel:** Todos
**Resultado:** Plan de acción claro

---

## 🧪 ARCHIVOS DE PRUEBA

### 9. [`test-contacto.html`](test-contacto.html) 🧪
**¿Cuándo usar?** Después de importar workflow de contacto

**Funcionalidad:**
- Interfaz amigable para probar
- Validación de formulario
- Feedback visual de resultados
- Instrucciones incluidas

**Cómo usar:**
1. Importar workflow 04-formulario-contacto
2. Copiar URL del webhook
3. Abrir test-contacto.html en navegador
4. Pegar URL
5. Llenar formulario
6. Enviar y verificar

---

### 10. [`test-citas.html`](test-citas.html) 🧪
**¿Cuándo usar?** Después de importar workflow de citas

**Funcionalidad:**
- Formulario de agendamiento
- Validación de fechas
- Verificación completa del flujo
- Feedback detallado

**Cómo usar:**
1. Importar workflow 01-sistema-citas
2. Configurar todas las credenciales
3. Copiar URL del webhook
4. Abrir test-citas.html
5. Agendar cita de prueba
6. Verificar en Sheets, Calendar, Email, WhatsApp

---

## ⚙️ CONFIGURACIÓN

### 11. [`.env.example`](.env.example) ⚙️
**¿Cuándo usar?** Antes de iniciar n8n

**Contenido:**
- Todas las variables de entorno
- Documentación inline
- Valores de ejemplo
- Instrucciones de obtención

**Cómo usar:**
```bash
cp .env.example .env
nano .env  # Editar con tus valores reales
```

**Variables principales:**
- N8N_BASIC_AUTH_PASSWORD
- GMAIL_EMAIL y GMAIL_APP_PASSWORD
- GOOGLE_SHEET_ID
- TELEGRAM_BOT_TOKEN
- TELEGRAM_CHAT_ID
- EVOLUTION_API_KEY (WhatsApp)
- OPENAI_API_KEY (opcional)

---

### 12. [`docker-compose.yml`](docker-compose.yml) 🐳
**¿Cuándo usar?** Para levantar servicios

**Servicios incluidos:**
- n8n (puerto 5678)
- evolution-api (puerto 8080)
- postgres (base de datos)

**Comandos:**
```bash
docker-compose up -d      # Iniciar
docker-compose down       # Detener
docker-compose restart    # Reiniciar
docker logs n8n          # Ver logs
```

---

## 🔍 SCRIPTS DE VERIFICACIÓN

### 13. [`verificar-configuracion.sh`](verificar-configuracion.sh) 🔍
**¿Cuándo usar?** En Linux/Mac para verificar

**Funcionalidad:**
- Verifica archivo .env
- Verifica Docker y contenedores
- Verifica conectividad
- Verifica archivos necesarios
- Sugiere soluciones

**Cómo usar:**
```bash
chmod +x verificar-configuracion.sh
./verificar-configuracion.sh
```

---

### 14. [`verificar-configuracion.ps1`](verificar-configuracion.ps1) 🔍
**¿Cuándo usar?** En Windows para verificar

**Funcionalidad:**
- Misma que .sh pero para PowerShell
- Interfaz con colores
- Resumen detallado

**Cómo usar:**
```powershell
.\verificar-configuracion.ps1
```

---

## 📦 WORKFLOWS

Ubicados en carpeta `workflows/`

### 15. [`04-formulario-contacto.json`](workflows/04-formulario-contacto.json) ⭐
**Prioridad:** 1 - EMPEZAR CON ESTE
**Complejidad:** ⭐⭐ Baja
**Tiempo configuración:** 10 minutos

**Flujo:**
```
Webhook → Formatear → Google Sheets → Email → Telegram → Response
```

**Requiere:**
- Google Sheets (Sheet ID)
- Gmail (credencial)
- Telegram (bot token + chat ID)

**Prueba con:** test-contacto.html

---

### 16. [`01-sistema-citas.json`](workflows/01-sistema-citas.json) ⭐⭐
**Prioridad:** 2
**Complejidad:** ⭐⭐⭐ Media
**Tiempo configuración:** 20 minutos

**Flujo:**
```
Webhook → Validar → Sheets → Calendar → Email → WhatsApp → Telegram
```

**Requiere:**
- Todo de workflow 04
- Google Calendar (credencial)
- WhatsApp (Evolution API o Cloud API)

**Prueba con:** test-citas.html

---

### 17. [`03-recordatorios-automaticos.json`](workflows/03-recordatorios-automaticos.json) ⭐⭐⭐
**Prioridad:** 3
**Complejidad:** ⭐⭐⭐ Media
**Tiempo configuración:** 15 minutos

**Flujo:**
```
Cron (08:00 AM) → Leer Sheets → Filtrar mañana → Email + WhatsApp
```

**Requiere:**
- Todo de workflows anteriores
- Citas en Google Sheets

**Prueba:** Ejecutar manualmente o esperar horario

---

### 18. [`02-chatbot-whatsapp.json`](workflows/02-chatbot-whatsapp.json) ⭐⭐⭐⭐
**Prioridad:** 4 (Opcional)
**Complejidad:** ⭐⭐⭐⭐ Alta
**Tiempo configuración:** 30 minutos

**Flujo:**
```
WhatsApp Trigger → Procesar mensaje → OpenAI → Responder
```

**Requiere:**
- WhatsApp configurado
- OpenAI API Key (~$5-10/mes)

**Funciones:**
- Respuestas automáticas 24/7
- Información sobre servicios
- Agendar citas por WhatsApp

---

### 19. [`05-seguimiento-pacientes.json`](workflows/05-seguimiento-pacientes.json) ⭐⭐⭐⭐
**Prioridad:** 5 (Avanzado)
**Complejidad:** ⭐⭐⭐⭐ Alta
**Tiempo configuración:** 20 minutos

**Flujo:**
```
Cron semanal → Leer Sheets → Detectar inactivos → Email reactivación
```

**Funciones:**
- Detectar pacientes >90 días sin cita
- Email de reactivación
- Ofertas especiales
- Encuestas

---

## 🗺️ MAPAS DE NAVEGACIÓN

### Si eres PRINCIPIANTE:
```
1. EMPEZAR_AQUI.md (orientación)
2. INICIO_RAPIDO.md (configuración express)
3. GUIA_VISUAL.md (referencia visual)
4. test-contacto.html (prueba)
5. CHECKLIST.md (verificar)
```

### Si eres INTERMEDIO:
```
1. EMPEZAR_AQUI.md (rápido)
2. CONFIGURACION_COMPLETA.md (detallado)
3. Workflows 04 → 01 → 03
4. test-*.html (pruebas)
5. Integración web
```

### Si eres AVANZADO:
```
1. README.md (overview técnico)
2. .env.example → .env
3. docker-compose up -d
4. Importar todos los workflows
5. Configurar según documentación
6. Workflows 02 y 05 (avanzados)
```

### Si eres EJECUTIVO/GERENTE:
```
1. README_RESUMEN.md (beneficios y costos)
2. RESUMEN_FINAL.md (niveles de implementación)
3. Delegar configuración técnica
4. Revisar métricas después de 1 mes
```

---

## 📊 ORDEN RECOMENDADO DE LECTURA

### Día 1 - Orientación (30 min):
1. ✅ EMPEZAR_AQUI.md
2. ✅ README.md
3. ✅ README_RESUMEN.md

### Día 2 - Configuración Básica (1-2h):
1. ✅ INICIO_RAPIDO.md o CONFIGURACION_COMPLETA.md
2. ✅ Configurar n8n
3. ✅ Importar workflow 04

### Día 3 - Pruebas (30 min):
1. ✅ test-contacto.html
2. ✅ CHECKLIST.md (verificar fase 1-5)
3. ✅ GUIA_VISUAL.md (referencia)

### Día 4 - Expansión (1-2h):
1. ✅ Importar workflow 01
2. ✅ test-citas.html
3. ✅ Configurar workflow 03

### Día 5 - Finalización (1h):
1. ✅ CHECKLIST.md completo
2. ✅ Integración con web
3. ✅ RESUMEN_FINAL.md (verificar nivel alcanzado)

---

## 🎯 BÚSQUEDA RÁPIDA POR TEMA

### Quiero configurar Gmail:
→ CONFIGURACION_COMPLETA.md → Sección 3.1
→ GUIA_VISUAL.md → Sección 5

### Quiero configurar Google Sheets:
→ CONFIGURACION_COMPLETA.md → Sección 3.3
→ GUIA_VISUAL.md → Sección 6

### Quiero configurar WhatsApp:
→ CONFIGURACION_COMPLETA.md → Sección 3.6
→ README.md → Sección WhatsApp

### Tengo un problema:
→ CONFIGURACION_COMPLETA.md → Sección "Troubleshooting"
→ README.md → Sección "Troubleshooting"
→ Ejecutar: verificar-configuracion.sh/ps1

### Quiero probar workflows:
→ test-contacto.html (formulario)
→ test-citas.html (citas)
→ CONFIGURACION_COMPLETA.md → Sección 5

### Quiero verificar todo:
→ CHECKLIST.md (marcar cada paso)
→ verificar-configuracion.sh/ps1 (automático)

---

## 💡 TIPS DE USO DE DOCUMENTACIÓN

1. **No leas todo de una vez:** Usa según necesidad
2. **Marca tu progreso:** Usa CHECKLIST.md
3. **Guarda favoritos:** Los archivos que más uses
4. **Imprime si ayuda:** Algunos prefieren papel
5. **Comparte con tu equipo:** Distribuye según roles

---

## 📞 CONTACTO Y SOPORTE

### Documentación local:
- ✅ 11 archivos .md
- ✅ 2 archivos .html de prueba
- ✅ 2 scripts de verificación
- ✅ 5 workflows listos

### Recursos externos:
- 🌐 N8N: https://docs.n8n.io
- 🌐 Evolution API: https://doc.evolution-api.com
- 🌐 Google Cloud: https://console.cloud.google.com

---

## 🎉 ¡Empieza Ahora!

**Tu primer paso:**
```bash
# Abre el archivo principal
cat EMPEZAR_AQUI.md

# O en Windows
notepad EMPEZAR_AQUI.md
```

---

**Creado por:** Rovo Dev  
**Versión:** 1.0  
**Última actualización:** Enero 2026  

---

**¿Perdido?** → [`EMPEZAR_AQUI.md`](EMPEZAR_AQUI.md)  
**¿Quieres algo rápido?** → [`INICIO_RAPIDO.md`](INICIO_RAPIDO.md)  
**¿Quieres todo detallado?** → [`CONFIGURACION_COMPLETA.md`](CONFIGURACION_COMPLETA.md)
