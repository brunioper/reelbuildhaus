import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative asset URLs work on GitHub Pages project sites.
export default defineConfig({
  plugins: [react()],
  base: './',
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  publicDir: 'public',
});
