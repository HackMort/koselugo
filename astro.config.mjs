import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://koselugo.com/',
  build: {
    format: 'file',
    out: 'build',
    assets: 'css'
  },
  vite: {
    build: {
      minify: false,
      rollupOptions: {
        output: {
          assetFileNames: 'css/style[extname]'
        }
      }
    }
  }
})
