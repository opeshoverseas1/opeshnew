import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Set to '/' for custom domain (opeshoverseas.com)
  build: {
    // Increase chunk size warning threshold since three-globe is inherently large
    chunkSizeWarningLimit: 1400,
    rollupOptions: {
      output: {
        // Manual chunk splitting: keep gsap, lenis separate from app code
        manualChunks(id) {
          if (id.includes('node_modules/gsap')) return 'gsap';
          if (id.includes('node_modules/lenis')) return 'lenis';
          // three and three-globe are already lazy — no need to separate further
        }
      }
    }
  },
  // Optimise for production: enable CSS minification and tree-shaking
  css: {
    devSourcemap: false,
  }
})
