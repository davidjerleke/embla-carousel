import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
