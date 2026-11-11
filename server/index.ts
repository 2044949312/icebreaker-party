import express, { type Request } from 'express'
import path from 'node:path'
import os from 'node:os'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { tickAll } from './rooms'
import {
  actionRoute,
  configureRoute,
  createRoomRoute,
  health,
  joinRoute,
  metaBody,
  nextRoute,
  viewRoute,
  type ApiResponse,
} from './api'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env.PORT ?? 8787)

const app = express()
app.disable('x-powered-by')
app.use(express.json({ limit: '48kb' }))

const lanAddresses = () =>
  Object.values(os.networkInterfaces())
    .flat()
    .filter((n) => n && n.family === 'IPv4' && !n.internal)
    .map((n) => n!.address)

const requestOrigin = (req: Request) => {
  const forwarded = String(req.headers['x-forwarded-host'] ?? '').split(',')[0].trim()
  const hostHeader = forwarded || String(req.headers.host ?? '')
  const proto =
    String(req.headers['x-forwarded-proto'] ?? '').split(',')[0].trim() || (req.secure ? 'https' : 'http')
  return `${proto}://${hostHeader}`
}

/** 本机用 localhost 打开时，换成局域网地址，手机才扫得开 */
const lanOrigin = () => {
  const lan = lanAddresses()[0]
  return lan ? `http://${lan}:${PORT}` : null
}

const route =
  (fn: (req: Request) => ApiResponse | Promise<ApiResponse>) =>
  (req: Request, res: express.Response) => {
    void Promise.resolve(fn(req))
      .then((r) => res.status(r.status).json(r.body))
      .catch((err) => {
        console.error('[api]', req.method, req.path, err)
        res.status(500).json({ error: '服务端出错了' })
      })
  }

const code = (req: Request) => String(req.params.code ?? '')
const token = (req: Request) => (req.query.token ? String(req.query.token) : String(req.body?.token ?? '')) || null

const api = express.Router()

api.get('/health', route(() => health()))
api.get('/meta', route((req) => metaBody(requestOrigin(req), lanOrigin())))
api.post('/rooms', route((req) => createRoomRoute(req.body ?? {})))
api.post('/join', route((req) => joinRoute(req.body ?? {})))
api.get(
  '/rooms/:code',
  route((req) => viewRoute(code(req), token(req), req.query.watch === '1')),
)
api.post(
  '/rooms/:code/action',
  route((req) => actionRoute(code(req), String(req.body?.token ?? ''), String(req.body?.action ?? ''), req.body?.payload)),
)
api.post(
  '/rooms/:code/next',
  route((req) => nextRoute(code(req), String(req.body?.token ?? ''), !!req.body?.force)),
)
api.post(
  '/rooms/:code/configure',
  route((req) =>
    configureRoute(code(req), String(req.body?.token ?? ''), {
      judgeMode: req.body?.judgeMode === undefined ? undefined : req.body.judgeMode === 'human' ? 'human' : 'ai',
      refereeId:
        req.body?.refereeId === undefined
          ? undefined
          : req.body.refereeId === null
            ? null
            : String(req.body.refereeId),
    }),
  ),
)

// 前端统一走 Sites 的函数前缀，本机也要接住，否则构建版在本地开房间就是 404
app.use('/api', api)
app.use('/functions/v1/app/api', api)

// 打包后 __dirname 是 dist/server，源码直跑时是项目根，两种布局都要能找到 index.html
const clientDir =
  [path.resolve(__dirname, '..', 'client'), path.resolve(__dirname, 'dist', 'client')].find((p) =>
    fs.existsSync(path.join(p, 'index.html')),
  ) ?? path.resolve(process.cwd(), 'dist/client')
app.use(express.static(clientDir))
app.get(/^\/(?!api\/).*/, (_req, res) => {
  res.sendFile(path.join(clientDir, 'index.html'), (err) => {
    if (err) res.status(404).send('先运行 npm run build')
  })
})

setInterval(() => void tickAll(Date.now()).catch((err) => console.error('[tickAll]', err)), 400).unref()

app.listen(PORT, () => {
  console.log(`本机访问  http://localhost:${PORT}`)
  lanAddresses().forEach((ip) => console.log(`聚会访问  http://${ip}:${PORT}`))
})
