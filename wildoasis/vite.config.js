import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'date-fns': 'date-fns/esm',
    },
  },
  plugins: [react()],
})
