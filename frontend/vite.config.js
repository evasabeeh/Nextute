import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser', // Use Terser for advanced JS minification
    cssCodeSplit: true, // Split CSS for better optimization
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.match(/react-dom/)) return 'react-dom';
            if (id.match(/react-router-dom/)) return 'react-router-dom';
            if (id.match(/framer-motion/)) return 'framer-motion';
            if (id.match(/lucide-react/)) return 'lucide-react';
            if (id.match(/swiper/)) return 'swiper';
            if (id.match(/axios/)) return 'axios';
            if (id.match(/react/)) return 'react';
            return 'vendor';
          }
        },
      },
    },
  },
})
