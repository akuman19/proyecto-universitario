import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync } from 'fs';

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

export default defineConfig({
  base: '/proyecto-universitario/',
  root: 'src',
  plugins: [nojekyllPlugin()],
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
  publicDir: '../public'
});

