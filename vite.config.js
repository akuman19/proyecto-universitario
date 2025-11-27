import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync, copyFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Plugin para crear .nojekyll después del build
const nojekyllPlugin = () => {
  return {
    name: 'nojekyll',
    closeBundle() {
      try {
        writeFileSync(resolve(__dirname, 'dist/.nojekyll'), '');
        console.log('✓ Created .nojekyll file for GitHub Pages');
      } catch (err) {
        console.warn('⚠ Could not create .nojekyll file:', err.message);
      }
    }
  };
};

// Plugin para copiar imágenes de src/img a dist/img
const copyImagesPlugin = () => {
  return {
    name: 'copy-images',
    closeBundle() {
      try {
        const srcImgDir = resolve(__dirname, 'src/img');
        const distImgDir = resolve(__dirname, 'dist/img');
        
        if (!existsSync(srcImgDir)) {
          console.warn('⚠ src/img directory does not exist');
          return;
        }

        // Crear directorio dist/img si no existe
        if (!existsSync(distImgDir)) {
          mkdirSync(distImgDir, { recursive: true });
        }

        // Copiar todas las imágenes
        const files = readdirSync(srcImgDir);
        files.forEach(file => {
          const srcPath = join(srcImgDir, file);
          const distPath = join(distImgDir, file);
          
          if (statSync(srcPath).isFile()) {
            copyFileSync(srcPath, distPath);
          }
        });

        console.log('✓ Copied images from src/img to dist/img');
      } catch (err) {
        console.warn('⚠ Could not copy images:', err.message);
      }
    }
  };
};

// Detectar si estamos en Netlify (sin base path) o GitHub Pages/Vercel (con base path)
const isNetlify = process.env.NETLIFY === 'true' || process.env.CONTEXT === 'production';
const base = isNetlify ? '/' : '/proyecto-universitario/';

export default defineConfig({
  base: base,
  root: 'src',
  plugins: [nojekyllPlugin(), copyImagesPlugin()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        propiedades: resolve(__dirname, 'src/propiedades.html')
      },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  publicDir: false
});

