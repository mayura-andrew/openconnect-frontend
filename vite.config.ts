import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Fix source map issues
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        sourcemapExcludeSources: false
      }
    }
  },
  // Configure development server to help with source maps
  server: {
    fs: {
      strict: false
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      sourcemap: true
    }
  }
})