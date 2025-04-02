import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Frontend runs on 3001
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
//    proxy: {
//      '/graphql': {
//        target: 'http://localhost:3000', // Backend runs on 3000
//        changeOrigin: true,
//        secure: false,
//      },
//    },
  },
});
