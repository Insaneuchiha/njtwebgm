// frontend/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This is the crucial change.
  // It tells Vite to generate asset paths as absolute paths (e.g., /assets/index.js)
  // instead of relative paths. This is essential for single-page applications
  // to work correctly when deployed.
  base: '/',
  build: {
    outDir: 'dist',
  },
});
