/**
 * 本地跑 Edge Function：用 Node 的 HTTP 服务模拟 Sites 网关，
 * 数据库换成 dev/db-fake.mjs，这样 e2e 脚本能原样打在函数上。
 * 用法：node dev/function-node.mjs [port]
 */
import { createServer } from 'node:http'
import { fakeDb, FakeBackendError } from './db-fake.mjs'
import { application } from '../functions/application.mjs'

const port = Number(process.argv[2] ?? 8788)
const db = fakeDb()
const handle = application({ db, BackendError: FakeBackendError })

const server = createServer(async (req, res) => {
  const host = req.headers.host ?? `127.0.0.1:${port}`
  const url = new URL(req.url ?? '/', `http://${host}`)
  const body = await new Promise((resolve) => {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => resolve(Buffer.concat(chunks)))
  })
  const headers = new Headers()
  for (const [k, v] of Object.entries(req.headers)) if (typeof v === 'string') headers.set(k, v)

  const request = new Request(url, {
    method: req.method ?? 'GET',
    headers,
    body: body.length && req.method !== 'GET' && req.method !== 'HEAD' ? body : undefined,
  })

  try {
    const response = await handle({ request })
    const buf = Buffer.from(await response.arrayBuffer())
    res.writeHead(response.status, Object.fromEntries(response.headers))
    res.end(buf)
  } catch (err) {
    console.error('[function]', err)
    res.writeHead(503, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ error: 'function_failed' }))
  }
})

server.listen(port, '127.0.0.1', () => {
  console.log(`edge function (fake db) on http://127.0.0.1:${port}/functions/v1/app`)
})
