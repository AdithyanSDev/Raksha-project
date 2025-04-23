import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Point to your subdomain
        changeOrigin: true,
        secure: false, // If you don't have HTTPS, this bypasses SSL checks
      },
      '/socket.io': {
        target: 'https://api.raksha.cloud',
        ws: true, // Enable WebSocket proxying
        changeOrigin: true,
      },
    },
  },
});
