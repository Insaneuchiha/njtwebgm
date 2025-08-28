// frontend/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This tells Vite that the root of your source code is the current directory.
  root: '.',
  build: {
    // This tells Vite to put the built files into a folder named 'dist'.
    outDir: 'dist',
  },
});
