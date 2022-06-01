import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from "unplugin-vue-components/vite";
import { resolve  } from "path";

function pathResolve(dir: string){
  return resolve(process.cwd(), '.', dir)
}


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: pathResolve('src') + '/'
      }
    ]
  },
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
    port: 3100,
    open: true,
  },
})
