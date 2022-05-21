import { defineConfig } from 'vite'
import type { ConfigEnv, UserConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import { join } from 'path'
import { writeFileSync } from 'fs'

function microPlugin () {
  let basePath = ''
  return {
    name: "app2",
    apply: 'build',
    configResolved(config) {
      basePath = `${config.base}${config.build.assetsDir}/`
    },
    writeBundle (options, bundle) {
      for (const chunkName in bundle) {
        if (Object.prototype.hasOwnProperty.call(bundle, chunkName)) {
          const chunk = bundle[chunkName]
          if (chunk.fileName && chunk.fileName.endsWith('.js')) {
            chunk.code = chunk.code.replace(/(from|import\()(\s*['"])(\.\.?\/)/g, (all, $1, $2, $3) => {
              return all.replace($3, new URL($3, basePath))
            })
            const fullPath = join(options.dir, chunk.fileName)
            writeFileSync(fullPath, chunk.code)
          }
        }
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig( ({command, mode}: ConfigEnv) :UserConfig => {

  const isBuild = command === 'build';

  const port = 3002;

  const base = isBuild ? `http://localhost:${port}` : "/sites/app2";

  return {
    root: process.cwd(),
    base,
    plugins: [
      vue(),
      microPlugin() as any
    ],
    server: {
      port,
    }
  }
})
