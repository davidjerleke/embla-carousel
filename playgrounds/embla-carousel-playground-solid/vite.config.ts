import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solid()],
  resolve: {
    alias: {
      consts: path.resolve(
        __dirname,
        '../../packages/embla-carousel-docs/src/consts'
      ),
      utils: path.resolve(
        __dirname,
        '../../packages/embla-carousel-docs/src/utils'
      ),
      hooks: path.resolve(
        __dirname,
        '../../packages/embla-carousel-docs/src/hooks'
      ),
      components: path.resolve(
        __dirname,
        '../../packages/embla-carousel-docs/src/components'
      ),
      assets: path.resolve(
        __dirname,
        '../../packages/embla-carousel-docs/src/assets'
      )
    }
  }
})
