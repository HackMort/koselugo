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
    css: {
      devSourcemap: true
    },
    build: {
      minify: false,
      sourcemap: true,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/css/style[extname]'
        }
      }
    }
  }
})
