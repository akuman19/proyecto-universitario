import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  base: '/proyecto-universitario/',
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        propiedades: resolve(__dirname, 'src/propiedades.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  publicDir: '../public'
});

