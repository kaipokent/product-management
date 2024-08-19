import { fileURLToPath, URL } from 'node:url'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VueRouter(), vue(), VueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  }
})
