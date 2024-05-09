import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Establece un alias para la importación de CommonJS
      '@commonjs': 'commonjs:',
    },
  },
});