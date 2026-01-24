#!/bin/bash

# ============================================================================
# 🔍 SCRIPT DE VERIFICACIÓN - N8N CLÍNICA DR. WILLIAM CRUZ
# ============================================================================
# Este script verifica que todos los servicios y configuraciones estén OK
# ============================================================================

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

errores=0
warnings=0

echo ""
echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}🔍 VERIFICACIÓN DE CONFIGURACIÓN N8N${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""

# ============================================================================
# 1. VERIFICAR ARCHIVO .env
# ============================================================================

echo -e "${YELLOW}📋 1. Verificando archivo .env...${NC}"

if [ -f ".env" ]; then
    echo -e "   ${GREEN}✅ Archivo .env existe${NC}"
    
    # Verificar variables críticas
    variables_criticas=("N8N_BASIC_AUTH_PASSWORD" "GMAIL_EMAIL" "GOOGLE_SHEET_ID" "TELEGRAM_BOT_TOKEN")
    
    for var in "${variables_criticas[@]}"; do
        if grep -q "^${var}=.\\+" .env 2>/dev/null; then
            echo -e "   ${GREEN}✅ ${var} configurado${NC}"
        else
            echo -e "   ${RED}❌ ${var} NO configurado${NC}"
            ((errores++))
        fi
    done
    
    # Verificar valores de ejemplo
    if grep -qE "CAMBIAR_ESTO|tu-client-id|tu-chat-id" .env 2>/dev/null; then
        echo -e "   ${YELLOW}⚠️  Detectados valores de ejemplo sin cambiar${NC}"
        ((warnings++))
    fi
    
else
    echo -e "   ${RED}❌ Archivo .env NO existe${NC}"
    echo -e "   ${YELLOW}💡 Ejecuta: cp .env.example .env${NC}"
    ((errores++))
fi

echo ""

# ============================================================================
# 2. VERIFICAR DOCKER
# ============================================================================

echo -e "${YELLOW}🐳 2. Verificando Docker...${NC}"

if command -v docker &> /dev/null; then
    docker_version=$(docker --version)
    echo -e "   ${GREEN}✅ Docker instalado: ${docker_version}${NC}"
    
    # Verificar contenedores
    contenedores_esperados=("n8n" "evolution-api" "postgres")
    
    for contenedor in "${contenedores_esperados[@]}"; do
        if docker ps --format '{{.Names}}' 2>/dev/null | grep -q "^${contenedor}$"; then
            echo -e "   ${GREEN}✅ Contenedor '${contenedor}' corriendo${NC}"
        else
            echo -e "   ${YELLOW}⚠️  Contenedor '${contenedor}' NO está corriendo${NC}"
            ((warnings++))
        fi
    done
    
else
    echo -e "   ${RED}❌ Docker no está instalado${NC}"
    echo -e "   ${YELLOW}💡 Instala Docker: https://docs.docker.com/get-docker/${NC}"
    ((errores++))
fi

echo ""

# ============================================================================
# 3. VERIFICAR N8N
# ============================================================================

echo -e "${YELLOW}🚀 3. Verificando N8N...${NC}"

if curl -s -o /dev/null -w "%{http_code}" http://localhost:5678 | grep -q "200\|301\|302"; then
    echo -e "   ${GREEN}✅ N8N accesible en http://localhost:5678${NC}"
else
    echo -e "   ${RED}❌ N8N no responde en http://localhost:5678${NC}"
    echo -e "   ${YELLOW}💡 Inicia n8n: docker-compose up -d${NC}"
    ((errores++))
fi

echo ""

# ============================================================================
# 4. VERIFICAR EVOLUTION API
# ============================================================================

echo -e "${YELLOW}📱 4. Verificando Evolution API (WhatsApp)...${NC}"

if curl -s -o /dev/null -w "%{http_code}" http://localhost:8080 | grep -q "200\|301\|302"; then
    echo -e "   ${GREEN}✅ Evolution API accesible en http://localhost:8080${NC}"
else
    echo -e "   ${YELLOW}⚠️  Evolution API no responde${NC}"
    echo -e "   ${YELLOW}💡 Esto es opcional, puedes usar WhatsApp Cloud API${NC}"
    ((warnings++))
fi

echo ""

# ============================================================================
# 5. VERIFICAR ARCHIVOS NECESARIOS
# ============================================================================

echo -e "${YELLOW}📁 5. Verificando archivos necesarios...${NC}"

archivos=(
    "docker-compose.yml"
    "test-contacto.html"
    "test-citas.html"
    "workflows/04-formulario-contacto.json"
    "workflows/01-sistema-citas.json"
    "CONFIGURACION_COMPLETA.md"
    "INICIO_RAPIDO.md"
)

for archivo in "${archivos[@]}"; do
    if [ -f "$archivo" ]; then
        echo -e "   ${GREEN}✅ ${archivo}${NC}"
    else
        echo -e "   ${RED}❌ ${archivo} NO encontrado${NC}"
        ((errores++))
    fi
done

echo ""

# ============================================================================
# 6. VERIFICAR CONEXIÓN A INTERNET
# ============================================================================

echo -e "${YELLOW}🌐 6. Verificando conexión a internet...${NC}"

sitios=("google.com" "gmail.com" "sheets.google.com" "telegram.org")

for sitio in "${sitios[@]}"; do
    if ping -c 1 -W 2 "$sitio" &> /dev/null || curl -s --head --max-time 3 "https://$sitio" > /dev/null 2>&1; then
        echo -e "   ${GREEN}✅ ${sitio} accesible${NC}"
    else
        echo -e "   ${YELLOW}⚠️  No se puede acceder a ${sitio}${NC}"
        ((warnings++))
    fi
done

echo ""

# ============================================================================
# 7. RESUMEN
# ============================================================================

echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}📊 RESUMEN DE VERIFICACIÓN${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""

if [ $errores -eq 0 ] && [ $warnings -eq 0 ]; then
    echo -e "${GREEN}🎉 ¡TODO PERFECTO!${NC}"
    echo ""
    echo -e "${GREEN}Tu configuración está lista para usar.${NC}"
    echo ""
    echo -e "${CYAN}📚 Próximos pasos:${NC}"
    echo -e "   1. Abre http://localhost:5678"
    echo -e "   2. Configura credenciales en n8n"
    echo -e "   3. Importa workflows"
    echo -e "   4. Prueba con test-contacto.html"
    echo ""
elif [ $errores -eq 0 ]; then
    echo -e "${GREEN}✅ Configuración básica OK${NC}"
    echo -e "${YELLOW}⚠️  ${warnings} advertencia(s)${NC}"
    echo ""
    echo -e "${YELLOW}Puedes continuar, pero revisa las advertencias.${NC}"
    echo ""
else
    echo -e "${RED}❌ ${errores} error(es) encontrado(s)${NC}"
    echo -e "${YELLOW}⚠️  ${warnings} advertencia(s)${NC}"
    echo ""
    echo -e "${RED}Por favor corrige los errores antes de continuar.${NC}"
    echo ""
    echo -e "${CYAN}💡 Ayuda:${NC}"
    echo -e "   - Lee INICIO_RAPIDO.md para comenzar"
    echo -e "   - Lee CONFIGURACION_COMPLETA.md para detalles"
    echo -e "   - Usa CHECKLIST.md para verificar paso a paso"
    echo ""
fi

echo -e "${CYAN}========================================${NC}"
echo ""

# ============================================================================
# 8. INFORMACIÓN ADICIONAL
# ============================================================================

echo -e "${CYAN}📋 Información útil:${NC}"
echo ""
echo -e "   🌐 N8N:              http://localhost:5678"
echo -e "   📱 Evolution API:    http://localhost:8080"
echo ""
echo -e "   📚 Documentación:"
echo -e "      - INICIO_RAPIDO.md"
echo -e "      - CONFIGURACION_COMPLETA.md"
echo -e "      - GUIA_VISUAL.md"
echo -e "      - CHECKLIST.md"
echo ""
echo -e "   🆘 Comandos útiles:"
echo -e "      Ver logs:      docker logs n8n"
echo -e "      Reiniciar:     docker-compose restart"
echo -e "      Detener:       docker-compose down"
echo -e "      Iniciar:       docker-compose up -d"
echo ""

echo -e "${CYAN}========================================${NC}"
echo ""

exit $errores
