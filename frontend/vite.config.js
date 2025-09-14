import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser', // Use Terser for advanced JS minification
    cssCodeSplit: true, // Split CSS for better optimization
  },
})
