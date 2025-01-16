import { defineConfig } from 'vite'; 
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  base: '/reliabilitygmrt/', 

  server: {
    proxy: {
      '/upload': {
        target: 'http://localhost:5000', // Backend server
        changeOrigin: true,
      },
    },
  },
});
