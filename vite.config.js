import { defineConfig } from 'vite'

export default defineConfig({
  base: '/v1/',
  server: {
    port: 3000,
    open: true
  }
})
