import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
    },
    hmr: {
      clientPort: 443,
      protocol: 'wss',
      host: 'maisongansou.com'
    },
    allowedHosts: [
      'maisongansou.com',
      'www.maisongansou.com',
      'localhost',
      '185.170.214.139'
    ]
  }
})