import { fileURLToPath, URL } from 'node:url'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    vue({
      template: {
        compilerOptions: { isCustomElement: (element) => element.startsWith('iconify-icon') }
      }
    }),
    AutoImport({
      // targets to transform
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      // global imports to register
      imports: ['vue', VueRouterAutoImports],
      dts: true,
      viteOptimizeDeps: true
    }),
    Components(),
    VueDevTools()
  ],
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
