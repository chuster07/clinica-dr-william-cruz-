# ============================================================================
# 🔍 SCRIPT DE VERIFICACIÓN - N8N CLÍNICA DR. WILLIAM CRUZ
# ============================================================================
# Este script verifica que todos los servicios y configuraciones estén OK
# ============================================================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🔍 VERIFICACIÓN DE CONFIGURACIÓN N8N" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$errores = 0
$warnings = 0

# ============================================================================
# 1. VERIFICAR ARCHIVO .env
# ============================================================================

Write-Host "📋 1. Verificando archivo .env..." -ForegroundColor Yellow

if (Test-Path ".env") {
    Write-Host "   ✅ Archivo .env existe" -ForegroundColor Green
    
    # Leer .env y verificar variables críticas
    $envContent = Get-Content ".env" -Raw
    
    $variablesCriticas = @(
        "N8N_BASIC_AUTH_PASSWORD",
        "GMAIL_EMAIL",
        "GOOGLE_SHEET_ID",
        "TELEGRAM_BOT_TOKEN"
    )
    
    foreach ($var in $variablesCriticas) {
        if ($envContent -match "$var=.+") {
            Write-Host "   ✅ $var configurado" -ForegroundColor Green
        } else {
            Write-Host "   ❌ $var NO configurado" -ForegroundColor Red
            $errores++
        }
    }
    
    # Verificar que no tenga valores de ejemplo
    if ($envContent -match "CAMBIAR_ESTO|tu-client-id|tu-chat-id") {
        Write-Host "   ⚠️  Detectados valores de ejemplo sin cambiar" -ForegroundColor Yellow
        $warnings++
    }
    
} else {
    Write-Host "   ❌ Archivo .env NO existe" -ForegroundColor Red
    Write-Host "   💡 Ejecuta: cp .env.example .env" -ForegroundColor Yellow
    $errores++
}

Write-Host ""

# ============================================================================
# 2. VERIFICAR DOCKER
# ============================================================================

Write-Host "🐳 2. Verificando Docker..." -ForegroundColor Yellow

try {
    $dockerVersion = docker --version 2>$null
    if ($dockerVersion) {
        Write-Host "   ✅ Docker instalado: $dockerVersion" -ForegroundColor Green
    } else {
        throw "Docker no encontrado"
    }
    
    # Verificar contenedores
    $containers = docker ps --format "{{.Names}}" 2>$null
    
    $contenedoresEsperados = @("n8n_clinica", "evolution_api_clinica", "redis_clinica")
    
    foreach ($contenedor in $contenedoresEsperados) {
        if ($containers -match $contenedor) {
            Write-Host "   ✅ Contenedor '$contenedor' corriendo" -ForegroundColor Green
        } else {
            Write-Host "   ⚠️  Contenedor '$contenedor' NO está corriendo" -ForegroundColor Yellow
            $warnings++
        }
    }
    
} catch {
    Write-Host "   ❌ Docker no está instalado o no está corriendo" -ForegroundColor Red
    Write-Host "   💡 Instala Docker Desktop: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
    $errores++
}

Write-Host ""

# ============================================================================
# 3. VERIFICAR N8N
# ============================================================================

Write-Host "🚀 3. Verificando N8N..." -ForegroundColor Yellow

try {
    $n8nResponse = Invoke-WebRequest -Uri "http://localhost:5678" -TimeoutSec 5 -UseBasicParsing 2>$null
    Write-Host "   ✅ N8N accesible en http://localhost:5678" -ForegroundColor Green
} catch {
    Write-Host "   ❌ N8N no responde en http://localhost:5678" -ForegroundColor Red
    Write-Host "   💡 Inicia n8n: docker-compose up -d" -ForegroundColor Yellow
    $errores++
}

Write-Host ""

# ============================================================================
# 4. VERIFICAR EVOLUTION API
# ============================================================================

Write-Host "📱 4. Verificando Evolution API (WhatsApp)..." -ForegroundColor Yellow

try {
    $evolutionResponse = Invoke-WebRequest -Uri "http://localhost:8080" -TimeoutSec 5 -UseBasicParsing 2>$null
    Write-Host "   ✅ Evolution API accesible en http://localhost:8080" -ForegroundColor Green
} catch {
    Write-Host "   ⚠️  Evolution API no responde" -ForegroundColor Yellow
    Write-Host "   💡 Esto es opcional, puedes usar WhatsApp Cloud API" -ForegroundColor Yellow
    $warnings++
}

Write-Host ""

# ============================================================================
# 5. VERIFICAR ARCHIVOS NECESARIOS
# ============================================================================

Write-Host "📁 5. Verificando archivos necesarios..." -ForegroundColor Yellow

$archivosNecesarios = @(
    "docker-compose.yml",
    "test-contacto.html",
    "test-citas.html",
    "workflows/04-formulario-contacto.json",
    "workflows/01-sistema-citas.json",
    "CONFIGURACION_COMPLETA.md",
    "INICIO_RAPIDO.md"
)

foreach ($archivo in $archivosNecesarios) {
    if (Test-Path $archivo) {
        Write-Host "   ✅ $archivo" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $archivo NO encontrado" -ForegroundColor Red
        $errores++
    }
}

Write-Host ""

# ============================================================================
# 6. VERIFICAR CONEXIÓN A INTERNET
# ============================================================================

Write-Host "🌐 6. Verificando conexión a internet..." -ForegroundColor Yellow

$sitios = @(
    @{Nombre="Google"; URL="https://www.google.com"},
    @{Nombre="Gmail"; URL="https://gmail.com"},
    @{Nombre="Google Sheets"; URL="https://sheets.google.com"},
    @{Nombre="Telegram"; URL="https://telegram.org"}
)

foreach ($sitio in $sitios) {
    try {
        $response = Invoke-WebRequest -Uri $sitio.URL -TimeoutSec 3 -UseBasicParsing 2>$null
        Write-Host "   ✅ $($sitio.Nombre) accesible" -ForegroundColor Green
    } catch {
        Write-Host "   ⚠️  No se puede acceder a $($sitio.Nombre)" -ForegroundColor Yellow
        $warnings++
    }
}

Write-Host ""

# ============================================================================
# 7. RESUMEN
# ============================================================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "📊 RESUMEN DE VERIFICACIÓN" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($errores -eq 0 -and $warnings -eq 0) {
    Write-Host "🎉 ¡TODO PERFECTO!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Tu configuración está lista para usar." -ForegroundColor Green
    Write-Host ""
    Write-Host "📚 Próximos pasos:" -ForegroundColor Cyan
    Write-Host "   1. Abre http://localhost:5678" -ForegroundColor White
    Write-Host "   2. Configura credenciales en n8n" -ForegroundColor White
    Write-Host "   3. Importa workflows" -ForegroundColor White
    Write-Host "   4. Prueba con test-contacto.html" -ForegroundColor White
    Write-Host ""
} elseif ($errores -eq 0) {
    Write-Host "✅ Configuración básica OK" -ForegroundColor Green
    Write-Host "⚠️  $warnings advertencia(s)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Puedes continuar, pero revisa las advertencias." -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "❌ $errores error(es) encontrado(s)" -ForegroundColor Red
    Write-Host "⚠️  $warnings advertencia(s)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Por favor corrige los errores antes de continuar." -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Ayuda:" -ForegroundColor Cyan
    Write-Host "   - Lee INICIO_RAPIDO.md para comenzar" -ForegroundColor White
    Write-Host "   - Lee CONFIGURACION_COMPLETA.md para detalles" -ForegroundColor White
    Write-Host "   - Usa CHECKLIST.md para verificar paso a paso" -ForegroundColor White
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# ============================================================================
# 8. INFORMACIÓN ADICIONAL
# ============================================================================

Write-Host "📋 Información útil:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   🌐 N8N:              http://localhost:5678" -ForegroundColor White
Write-Host "   📱 Evolution API:    http://localhost:8080" -ForegroundColor White
Write-Host ""
Write-Host "   📚 Documentación:" -ForegroundColor White
Write-Host "      - INICIO_RAPIDO.md" -ForegroundColor Gray
Write-Host "      - CONFIGURACION_COMPLETA.md" -ForegroundColor Gray
Write-Host "      - GUIA_VISUAL.md" -ForegroundColor Gray
Write-Host "      - CHECKLIST.md" -ForegroundColor Gray
Write-Host ""
Write-Host "   🆘 Comandos útiles:" -ForegroundColor White
Write-Host "      Ver logs:      docker logs n8n_clinica" -ForegroundColor Gray
Write-Host "      Reiniciar:     docker-compose restart" -ForegroundColor Gray
Write-Host "      Detener:       docker-compose down" -ForegroundColor Gray
Write-Host "      Iniciar:       docker-compose up -d" -ForegroundColor Gray
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Pausar para que el usuario pueda leer
Write-Host "Presiona cualquier tecla para continuar..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
