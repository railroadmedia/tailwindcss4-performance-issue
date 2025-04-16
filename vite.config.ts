import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

// Base configuration that can be extended
export const baseConfig = {
  plugins: [tailwindcss(), vue(), svgLoader()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
      '@application': fileURLToPath(new URL('./src/application', import.meta.url)),
      '@common': fileURLToPath(new URL('./src/shared', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@icons': fileURLToPath(new URL('./src/assets/icons', import.meta.url)),
      '@iconsv2': fileURLToPath(new URL('./src/assets/iconsv2', import.meta.url)),
      '@ui': fileURLToPath(new URL('./src/ui', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/shared/utils', import.meta.url)),
    },
  },
  build: {
    commonjsOptions: { transformMixedEsModules: true },
  },
}

// https://vite.dev/config/
export default defineConfig(baseConfig)
