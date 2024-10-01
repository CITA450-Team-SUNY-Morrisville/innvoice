// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/routes': {
        target: 'http://localhost:3000', // Proxy requests to your Node.js backend
        changeOrigin: true,
      },
    },
  },
});
