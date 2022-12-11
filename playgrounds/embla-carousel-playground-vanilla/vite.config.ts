import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      consts: path.resolve(
        __dirname,
        '../../packages/embla-carousel-docs/src/consts',
      ),
      utils: path.resolve(
        __dirname,
        '../../packages/embla-carousel-docs/src/utils',
      ),
      hooks: path.resolve(
        __dirname,
        '../../packages/embla-carousel-docs/src/hooks',
      ),
      components: path.resolve(
        __dirname,
        '../../packages/embla-carousel-docs/src/components',
      ),
      assets: path.resolve(
        __dirname,
        '../../packages/embla-carousel-docs/src/assets',
      ),
    },
  },
})
