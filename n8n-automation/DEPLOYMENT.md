# 🚀 Guía de Despliegue en Producción
## Sistema de Automatización - Clínica Dr. William Cruz

---

## 🎯 Opciones de Hosting

### **Opción 1: VPS (Recomendado) - $5-10/mes**
- **DigitalOcean**, **Linode**, **Vultr**
- 1 vCPU, 2GB RAM
- Ubuntu 22.04 LTS

### **Opción 2: Railway.app (Más fácil) - $5/mes**
- Deploy automático desde Git
- SSL incluido

### **Opción 3: Render.com (Tier gratuito)**
- 750 horas gratis/mes
- Perfecto para empezar

---

## 📋 Despliegue en VPS (DigitalOcean)

### **Paso 1: Crear VPS**

1. Ve a: https://digitalocean.com
2. Create → Droplets
3. Selecciona:
   - **Image**: Ubuntu 22.04 LTS
   - **Plan**: Basic $6/mes (2GB RAM)
   - **Datacenter**: Closest to Costa Rica (US-East)
4. Add SSH key (recomendado)
5. Create Droplet

**Copia la IP pública:** `123.456.789.0`

---

### **Paso 2: Configurar VPS**

```bash
# Conectar por SSH
ssh root@123.456.789.0

# Actualizar sistema
apt update && apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
apt install docker-compose -y

# Crear usuario para n8n
adduser n8n
usermod -aG docker n8n
su - n8n
```

---

### **Paso 3: Subir el Proyecto**

```bash
# En tu máquina local
cd Clinica-Dr-William-Cruz/n8n-automation
scp -r . n8n@123.456.789.0:~/n8n-automation
```

O usar Git:
```bash
# En el VPS
git clone https://github.com/tu-repo/clinica-n8n.git
cd clinica-n8n/n8n-automation
```

---

### **Paso 4: Configurar Variables de Entorno**

```bash
# Crear archivo .env
cp .env.example .env
nano .env
```

Edita con tus valores reales:
```env
N8N_HOST=123.456.789.0
N8N_PROTOCOL=https
WEBHOOK_URL=https://n8n.tudominio.com/

# Resto de configuraciones...
```

---

### **Paso 5: Configurar SSL con Nginx**

```bash
# Instalar Nginx
sudo apt install nginx certbot python3-certbot-nginx -y

# Crear configuración
sudo nano /etc/nginx/sites-available/n8n
```

Pega esto:
```nginx
server {
    listen 80;
    server_name n8n.tudominio.com;

    location / {
        proxy_pass http://localhost:5678;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Activar sitio
sudo ln -s /etc/nginx/sites-available/n8n /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Obtener SSL gratis con Let's Encrypt
sudo certbot --nginx -d n8n.tudominio.com
```

---

### **Paso 6: Levantar Servicios**

```bash
cd ~/n8n-automation
docker-compose up -d

# Verificar
docker ps
```

---

### **Paso 7: Configurar Dominio**

#### **A. Comprar Dominio (opcional)**
- Namecheap: $10/año
- Google Domains: $12/año

#### **B. Configurar DNS**
En tu proveedor de dominio, crea registros:

```
Tipo    Nombre    Valor
A       n8n       123.456.789.0
A       @         123.456.789.0
CNAME   www       tudominio.com
```

---

### **Paso 8: Actualizar URLs en la Web**

#### **En `citas.html`:**
```javascript
const N8N_CITAS_URL = '/api/citas';
```

#### **En `script.js`:**
```javascript
const N8N_CONTACTO_URL = 'https://n8n.tudominio.com/webhook/contacto';
```

---

## 🔒 Seguridad en Producción

### **1. Cambiar Contraseñas**
```bash
# En docker-compose.yml
N8N_BASIC_AUTH_PASSWORD=NUEVA_CONTRASEÑA_SEGURA_123!

# Evolution API Key
AUTHENTICATION_API_KEY=NUEVA_API_KEY_MUY_SEGURA_456!
```

### **2. Configurar Firewall**
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### **3. Configurar Backups Automáticos**
```bash
# Crear script de backup
nano ~/backup.sh
```

```bash
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/n8n/backups"

# Backup de base de datos N8N
docker exec n8n_clinica tar czf /tmp/n8n-backup-$TIMESTAMP.tar.gz /home/node/.n8n

# Copiar a directorio de backups
docker cp n8n_clinica:/tmp/n8n-backup-$TIMESTAMP.tar.gz $BACKUP_DIR/

# Mantener solo últimos 7 días
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
```

```bash
chmod +x ~/backup.sh

# Programar backup diario
crontab -e
# Agregar: 0 2 * * * /home/n8n/backup.sh
```

---

## 📊 Monitoreo

### **Instalar Uptime Kuma (Monitor de servicios)**

```bash
docker run -d --restart=always \
  --name uptime-kuma \
  -p 3001:3001 \
  -v uptime-kuma:/app/data \
  louislam/uptime-kuma:1
```

Accede: `http://123.456.789.0:3001`

Agrega monitores para:
- N8N (http://localhost:5678)
- Evolution API (http://localhost:8080)
- Tu web (https://tudominio.com)

---

## 🚀 Despliegue Alternativo: Railway.app

### **Más Fácil, Deploy en 5 minutos**

1. Ve a: https://railway.app
2. Login con GitHub
3. New Project → Deploy from GitHub repo
4. Selecciona tu repositorio
5. Railway detectará docker-compose.yml automáticamente
6. Agrega variables de entorno
7. Deploy!

Railway te dará una URL: `https://tu-app.railway.app`

---

## 🔄 Actualizaciones

### **Actualizar el sistema**

```bash
cd ~/n8n-automation

# Descargar última versión
git pull origin main

# Reconstruir contenedores
docker-compose down
docker-compose pull
docker-compose up -d

# Verificar
docker ps
docker logs n8n_clinica
```

---

## 📈 Escalabilidad

### **Cuando el tráfico aumente:**

1. **Upgrade VPS:**
   - 4GB RAM → $12/mes
   - 8GB RAM → $24/mes

2. **Separar servicios:**
   - N8N en un servidor
   - Evolution API en otro
   - Base de datos en servidor dedicado

3. **Load Balancer:**
   - Múltiples instancias de N8N
   - Nginx como load balancer

---

## 💰 Costos Mensuales en Producción

| Servicio | Costo |
|----------|-------|
| VPS (2GB RAM) | $6 |
| Dominio | $1 |
| Backups externos | $0-5 |
| SendGrid (opcional) | $0-15 |
| **TOTAL** | **$7-27/mes** |

---

## ✅ Checklist de Producción

- [ ] VPS configurado con Ubuntu
- [ ] Docker y Docker Compose instalados
- [ ] SSL configurado con Let's Encrypt
- [ ] Dominio apuntando al servidor
- [ ] Contraseñas cambiadas y seguras
- [ ] Firewall configurado
- [ ] Backups automáticos programados
- [ ] Monitoreo activo
- [ ] URLs actualizadas en la web
- [ ] Workflows probados en producción
- [ ] Documentación actualizada

---

## 🆘 Soporte de Emergencia

### **Si el sistema cae:**

```bash
# 1. Verificar servicios
docker ps -a

# 2. Revisar logs
docker logs n8n_clinica --tail 100
docker logs evolution_api_clinica --tail 100

# 3. Reiniciar servicios
docker-compose restart

# 4. Si persiste, rebuild
docker-compose down
docker-compose up -d --force-recreate
```

---

**¡Sistema listo para producción! 🎉**
