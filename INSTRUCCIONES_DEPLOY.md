# Instrucciones para desplegar cambios manualmente

Este paquete contiene el proyecto completo actualizado.

## 1) Descomprimir el archivo

1. Copia `clinica-project-actualizado.zip` a tu computadora.
2. En una terminal, ubícate en la carpeta donde descargaste el ZIP.
3. Descomprime:

```bash
unzip clinica-project-actualizado.zip
cd clinica-project
```

> Si tu sistema te pregunta por reemplazos de archivos, acepta reemplazar.

## 2) Subir cambios a GitHub (git add, commit, push)

Dentro de la carpeta del proyecto:

```bash
git status
```

Si ves cambios pendientes, ejecuta:

```bash
git add .
git commit -m "Aplicar correcciones completas de sitio y blog"
git push origin main
```

Si ya aparecen commits pendientes (por ejemplo `ahead`), puedes hacer solo:

```bash
git push origin main
```

Si GitHub solicita autenticación, usa tu cuenta/token con permisos de escritura al repositorio.

## 3) Verificar despliegue en Vercel

1. Ve al proyecto en Vercel Dashboard.
2. Espera a que termine el deployment asociado al último push.
3. Abre la URL de producción y valida:
   - Home: `/`
   - Blog: `/blog.html` (y también prueba `/blog` si tienes reglas de rewrite)
   - Citas: `/citas.html`
4. Si `/blog` sigue en 404, agrega/ajusta rewrites en Vercel para rutas limpias o usa enlaces con `.html`.

## Verificación rápida sugerida

```bash
# Ver últimos commits

git log --oneline -n 5

# Ver rama y estado

git status -sb
```
