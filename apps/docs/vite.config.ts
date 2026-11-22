import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Must match your GitHub repository name so assets load on GitHub Pages
  base: '/elite-icons/',
});
