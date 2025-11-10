import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/medvault_copy",
  build: {
    // Increase the warning limit so the build log isn't noisy for larger bundles
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Put vendor libs like react into their own chunk to improve caching
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'vendor-react'
            return 'vendor'
          }
        }
      }
    }
  }
})
