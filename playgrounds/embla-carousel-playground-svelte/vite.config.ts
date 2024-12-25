import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
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
