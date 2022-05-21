import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => /^micro-app/.test(tag)
        }
      }
    }),

    /**
     * @see https://github.com/antfu/unplugin-vue-components
     */
    Components({
      dirs: ['src/components', 'src/apps'],
      extensions: ['vue'],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/],
    })
  ],
  server: {
    port: 3000,
    open: true,
  },
})
