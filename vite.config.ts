import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/fred': {
        target: 'https://api.stlouisfed.org',
        changeOrigin: true,
      },
    }
  }
})


// https://api.stlouisfed.org/fred/series/
