import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../website/src'),
      '@packages': path.resolve(__dirname, '../../packages'),
      '@root/*': path.resolve(__dirname, '../../'),
      '@vendor/*': path.resolve(__dirname, '../../website/vendor'),
      utils: path.resolve(__dirname, '../../website/src/utils'),
      hooks: path.resolve(__dirname, '../../website/src/hooks'),
      components: path.resolve(__dirname, '../../website/src/components'),
      assets: path.resolve(__dirname, '../../website/src/assets'),
      content: path.resolve(__dirname, '../../website/src/content')
    }
  }
})
