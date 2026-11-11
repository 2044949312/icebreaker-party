import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'

/** 房间页要能被别的设备直接打开，而 Sites 关掉了目录索引，所以每个路由都要有一个真实 html */
const ROUTE_PAGES = ['join', 'host', 'p', 'watch']

function routePages(): Plugin {
  const pattern = new RegExp(`^/(${ROUTE_PAGES.join('|')})(\\.html)?$`)
  let outDir = ''
  return {
    name: 'route-pages',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      const index = await readFile(join(outDir, 'index.html'), 'utf8')
      for (const name of ROUTE_PAGES) await writeFile(join(outDir, `${name}.html`), index)
    },
    configureServer(server) {
      // 开发时这些地址还没有生成文件，让 Vite 按 SPA 一样回 index.html
      server.middlewares.use((req, _res, next) => {
        if (pattern.test((req.url ?? '').split('?')[0])) req.url = '/index.html'
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), routePages()],
  build: { outDir: 'dist/client' },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': { target: 'http://localhost:8787', changeOrigin: true },
      '/functions': { target: 'http://localhost:8787', changeOrigin: false },
    },
  },
  preview: {
    port: 4173,
    strictPort: true,
    proxy: {
      // 本地验证 Sites 形态的产物：静态页 + Edge Function 假数据库壳
      // changeOrigin 关掉，函数才能算出「别人真的能打开」的 4173 地址
      '/functions': { target: 'http://localhost:8788', changeOrigin: false },
    },
  },
})
