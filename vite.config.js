import { defineConfig } from 'vite'; // Import defineConfig
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/routes': {
        target: 'http://localhost:3000', // Ensure this matches your backend address
        changeOrigin: true,
        secure: false, // Use false for development if you're not using HTTPS
      },
    },
  },
});