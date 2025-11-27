# Guía de Despliegue - Altura Inmobiliaria

Este proyecto está configurado para desplegarse en diferentes plataformas. Elige la plataforma que prefieras:

## 🚀 Opciones de Despliegue

### 1. Vercel (Recomendado)

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. Despliega:
```bash
vercel
```

O conecta tu repositorio en [vercel.com](https://vercel.com) y el despliegue será automático.

**Archivo de configuración:** `vercel.json` (ya incluido)

---

### 2. Netlify

1. Instala Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Despliega:
```bash
netlify deploy --prod
```

O conecta tu repositorio en [netlify.com](https://netlify.com) y el despliegue será automático.

**Archivo de configuración:** `netlify.toml` (ya incluido)

---

### 3. GitHub Pages

El proyecto ya tiene configurado GitHub Actions para despliegue automático.

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: selecciona "GitHub Actions"
4. Cada push a `main` o `master` desplegará automáticamente

**Archivo de configuración:** `.github/workflows/deploy.yml` (ya incluido)

---

## 📝 Notas Importantes

- **Base Path:** El proyecto está configurado con base path `/proyecto-universitario/`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

## 🔧 Build Local

Para probar el build localmente:

```bash
npm run build
npm run preview
```

## 📦 Estructura de Despliegue

```
dist/
├── index.html
├── propiedades.html
├── css/
├── js/
└── img/
```

---

## ⚙️ Configuración Personalizada

Si necesitas cambiar el base path, edita `vite.config.js`:

```javascript
export default defineConfig({
  base: '/tu-nuevo-path/',  // Cambia esto
  // ...
});
```

Y actualiza los archivos de configuración de despliegue correspondientes.

