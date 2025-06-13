import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

const appName = 'widget'
const version = '1.0.0'
const buildId = new Date().getTime()

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: `js/${appName}-${version}.js`,
        chunkFileNames: `js/${appName}-chunk-${buildId}.js`,
        assetFileNames: (assetInfo) => {
          if (assetInfo.names.includes('css')) {
            return `css/${appName}-${version}.css`
          }
          return `assets/${appName}-[name].[ext]`
        },
      },
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => tag.includes('-'),
        },
      },
    }),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
