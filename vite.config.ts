
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    // Memastikan process.env.API_KEY tersedia saat runtime di Vercel
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  server: {
    port: 3000
  }
});
