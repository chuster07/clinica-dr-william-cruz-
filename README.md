# Clínica Dr. William Cruz - Sitio Web + Automatizaciones

Este proyecto contiene:

- Sitio web estático (HTML/CSS/JS) en la raíz del repositorio.
- Automatizaciones y documentación de n8n en `n8n-automation/`.

## Configuración rápida

### 1) Frontend
No requiere build. Puedes abrir `index.html` directamente para revisión visual.

### 2) n8n (opcional)
```bash
cd n8n-automation
cp .env.example .env
```

Edita `.env` y configura como mínimo:

```env
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=<password-seguro>
N8N_ENCRYPTION_KEY=<clave-segura-32+>
EVOLUTION_API_KEY=<api-key-segura>
GOOGLE_SHEET_ID=<id-hoja-google>
TELEGRAM_BOT_TOKEN=<token-bot>
TELEGRAM_CHAT_ID=<chat-id>
```

Luego inicia:

```bash
docker-compose up -d
```

## Endpoint unificado de citas

Se estandarizó el endpoint de citas a:

- `POST /api/citas`

En n8n, al usar Webhook, se publica como:

- `.../webhook/api/citas`

## Documento de cambios implementados

Consulta `MEJORAS_IMPLEMENTADAS.md` para el detalle completo de ajustes aplicados.
