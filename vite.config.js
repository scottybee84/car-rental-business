import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/car-rental-business/',
  plugins: [react()],
  optimizeDeps: {
    include: ['react-router-dom'],
    force: true
  }
})
