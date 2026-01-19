# 🚀 Instrucciones para Deploy a GitHub y Vercel

## ✅ Cambios Realizados

### 📞 Teléfono Actualizado
- **Nuevo número:** +506 8820-2058
- **Actualizado en:** Navbar, Footer, Chat, WhatsApp, Contacto, Citas

### 🖼️ Foto del Doctor
- **Agregada:** `/public/doctor.png`
- **Mostrada en:** Hero section de la página Home

### 📦 Git Inicializado
- ✅ Repositorio Git creado
- ✅ Commit inicial realizado

---

## 📋 Paso 1: Crear Repositorio en GitHub

### Opción A: Desde la Web de GitHub (Recomendado)

1. **Ir a GitHub:**
   - Abre https://github.com
   - Inicia sesión con tu cuenta

2. **Crear Nuevo Repositorio:**
   - Click en el botón "+" arriba a la derecha
   - Selecciona "New repository"

3. **Configurar el Repositorio:**
   ```
   Repository name: clinica-dr-william-cruz
   Description: Aplicación web moderna para Clínica Dr. William Cruz
   Visibility: ☐ Public o ☑ Private (tú decides)
   
   ⚠️ NO marques:
   [ ] Add a README file
   [ ] Add .gitignore
   [ ] Choose a license
   ```

4. **Crear Repository:**
   - Click en "Create repository"

5. **Copiar la URL del repositorio:**
   - GitHub te mostrará algo como:
   ```
   https://github.com/TU-USUARIO/clinica-dr-william-cruz.git
   ```

### Opción B: Desde PowerShell con GitHub CLI

```powershell
# Instalar GitHub CLI si no lo tienes
winget install GitHub.cli

# Login
gh auth login

# Crear repositorio
gh repo create clinica-dr-william-cruz --private --source=. --remote=origin --push
```

---

## 📋 Paso 2: Conectar y Subir a GitHub

### Usando la URL de GitHub (Después de crear el repo en la web):

```powershell
# Navegar al proyecto
cd "C:\Users\Chus\Clinica-Dr-William-Cruz\clinica-react-app"

# Agregar remote (reemplaza TU-USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU-USUARIO/clinica-dr-william-cruz.git

# Verificar remote
git remote -v

# Subir a GitHub
git branch -M main
git push -u origin main
```

### Si encuentras error de autenticación:

```powershell
# Usar token de acceso personal
# 1. Ve a GitHub → Settings → Developer settings → Personal access tokens
# 2. Genera un nuevo token con permisos de "repo"
# 3. Usa el token como contraseña cuando hagas push
```

---

## 📋 Paso 3: Deploy a Vercel

### Opción A: Desde la Web de Vercel (Más Fácil)

1. **Ir a Vercel:**
   - Abre https://vercel.com
   - Inicia sesión (puedes usar tu cuenta de GitHub)

2. **Importar Proyecto:**
   - Click en "Add New" → "Project"
   - Selecciona "Import Git Repository"
   - Autoriza a Vercel para acceder a tus repositorios de GitHub

3. **Seleccionar Repositorio:**
   - Busca "clinica-dr-william-cruz"
   - Click en "Import"

4. **Configurar el Proyecto:**
   ```
   Project Name: clinica-dr-william-cruz
   Framework Preset: Vite (detectado automáticamente)
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

5. **Variables de Entorno (Opcional):**
   ```
   VITE_API_URL=tu-api-url-aqui
   ```

6. **Deploy:**
   - Click en "Deploy"
   - Espera 2-3 minutos
   - ¡Listo! Tu sitio estará en: `https://clinica-dr-william-cruz.vercel.app`

### Opción B: Desde la Terminal con Vercel CLI

```powershell
# Instalar Vercel CLI
npm install -g vercel

# Navegar al proyecto
cd "C:\Users\Chus\Clinica-Dr-William-Cruz\clinica-react-app"

# Login
vercel login

# Deploy
vercel

# Seguir las instrucciones:
# ? Set up and deploy "~/clinica-react-app"? [Y/n] Y
# ? Which scope do you want to deploy to? [Tu usuario]
# ? Link to existing project? [N]
# ? What's your project's name? clinica-dr-william-cruz
# ? In which directory is your code located? ./
# ? Want to override the settings? [N]

# Deploy a producción
vercel --prod
```

---

## 🎯 URLs Finales

Después del deploy tendrás:

### GitHub Repository:
```
https://github.com/TU-USUARIO/clinica-dr-william-cruz
```

### Vercel (Producción):
```
https://clinica-dr-william-cruz.vercel.app
```

### Vercel (Preview):
```
https://clinica-dr-william-cruz-[hash].vercel.app
```

---

## 🔄 Actualizaciones Futuras

Cada vez que hagas cambios:

```powershell
# 1. Hacer cambios en el código

# 2. Guardar cambios en Git
cd "C:\Users\Chus\Clinica-Dr-William-Cruz\clinica-react-app"
git add .
git commit -m "Descripción de los cambios"
git push

# 3. Vercel desplegará automáticamente
# No necesitas hacer nada más, Vercel detecta el push y redeploya
```

---

## 🌐 Dominio Personalizado (Opcional)

Si tienes un dominio propio (ej: www.clinicawilliamcruz.com):

1. **En Vercel:**
   - Ve a tu proyecto
   - Settings → Domains
   - Add Domain → Escribe tu dominio
   - Sigue las instrucciones para configurar DNS

2. **En tu proveedor de dominio:**
   - Agrega los registros DNS que Vercel te indique
   - Tipo A: apunta a 76.76.21.21
   - O CNAME: apunta a cname.vercel-dns.com

---

## ✅ Verificación del Deploy

### Checklist Post-Deploy:

- [ ] Sitio cargando correctamente
- [ ] Logo visible
- [ ] Foto del doctor mostrándose
- [ ] Colores correctos (#2c7873, #6fb98f)
- [ ] Teléfono correcto (+506 8820-2058)
- [ ] WhatsApp funcionando
- [ ] Todas las páginas accesibles
- [ ] Responsivo en móvil
- [ ] Chat widget funcionando
- [ ] Formularios validando

---

## 🐛 Solución de Problemas

### Error: "Large files detected"
```powershell
# Si tienes archivos muy grandes
git rm --cached archivo-grande.ext
echo "archivo-grande.ext" >> .gitignore
git add .gitignore
git commit -m "Remove large files"
```

### Error: "Failed to compile"
```powershell
# Verificar que todas las dependencias estén instaladas
npm install
npm run build

# Si funciona localmente, el problema está en Vercel
# Revisa los logs en el dashboard de Vercel
```

### Imágenes no se cargan
- Las imágenes en `/public` deben referenciarse como `/imagen.png`
- NO uses `./public/imagen.png`
- Vercel sirve `/public` desde la raíz

---

## 📞 Contactos Actualizados en la App

- **Teléfono:** +506 8820-2058
- **WhatsApp:** +506 8820-2058
- **Email:** info@clinicawilliamcruz.com

---

## 🎉 ¡Listo!

Una vez completados estos pasos, tu aplicación estará:
- ✅ En GitHub (código fuente)
- ✅ En Vercel (sitio en producción)
- ✅ Accesible desde cualquier lugar
- ✅ Con deploy automático en cada push

---

**Comandos Resumen:**

```powershell
# GitHub
cd "C:\Users\Chus\Clinica-Dr-William-Cruz\clinica-react-app"
git remote add origin https://github.com/TU-USUARIO/clinica-dr-william-cruz.git
git push -u origin main

# Vercel (desde la web es más fácil)
# O con CLI:
npm install -g vercel
vercel
vercel --prod
```

**¿Necesitas ayuda con algún paso específico? ¡Avísame!** 🚀
