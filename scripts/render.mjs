/**
 * Render 部署脚本（按 Render 官方 OpenAPI 的 POST /services 形状）。
 * 用法：
 *   node scripts/render.mjs owners                 # 验 key、拿 workspace id
 *   node scripts/render.mjs create                 # 建 Docker web service
 *   node scripts/render.mjs list                   # 列出服务与地址
 *   node scripts/render.mjs watch <serviceId>      # 轮询构建到 live 并打印公网地址
 *   node scripts/render.mjs logs <serviceId>       # 最近一次构建日志
 * key 只从环境变量 RENDER_KEY 或 ~/.render_key 读取，任何输出都不带出它。
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const API = 'https://api.render.com/v1'
const KEY_FILE = path.join(os.homedir(), '.render_key')
const REPO_URL = 'https://github.com/2044949312/icebreaker-party'
const SERVICE_NAME = 'icebreaker-party'

const NEW_SERVICE = (ownerId) => ({
  type: 'web_service',
  name: SERVICE_NAME,
  ownerId,
  repo: REPO_URL,
  branch: 'main',
  autoDeployTrigger: 'commit',
  rootDir: '',
  envVars: [{ key: 'NODE_ENV', value: 'production' }],
  serviceDetails: {
    runtime: 'docker',
    plan: 'free',
    region: 'singapore',
    healthCheckPath: '/api/health',
    pullRequestPreviewsEnabled: 'no',
  },
})

class Stop extends Error {}
const fail = (msg) => {
  throw new Stop(msg)
}
const redact = (s) => String(s).replace(/rnd_[A-Za-z0-9]+/g, 'rnd_***')

function readKey() {
  if (process.env.RENDER_KEY) return process.env.RENDER_KEY.trim()
  let raw = ''
  try {
    raw = fs.readFileSync(KEY_FILE, 'utf8')
  } catch {
    fail(`还没找到 key 文件：往 ${KEY_FILE} 里写入 rnd_ 开头的那串`)
  }
  if (!raw.trim()) fail(`${KEY_FILE} 是空的`)
  return raw.trim()
}

async function raw(method, pathname, { query, body } = {}) {
  const url = new URL(API + pathname)
  if (query) for (const [k, v] of Object.entries(query)) url.searchParams.set(k, v)
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${readKey()}`, accept: 'application/json', 'content-type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  const text = await res.text()
  let data
  try {
    data = JSON.parse(text)
  } catch {
    data = text
  }
  return { status: res.status, data, path: url.pathname }
}

async function call(method, pathname, opts) {
  const r = await raw(method, pathname, opts)
  if (r.status >= 400) {
    const d = typeof r.data === 'string' ? r.data.slice(0, 400) : JSON.stringify(r.data).slice(0, 500)
    fail(`${method} ${r.path} -> ${r.status} ${redact(d)}`)
  }
  return r.data
}

const brief = (x) => redact(typeof x === 'string' ? x.slice(0, 800) : JSON.stringify(x).slice(0, 800))
const ownerOf = (list) => list?.[0]?.owner ?? list?.[0]
const svcOf = (item) => item?.service ?? item
const urlOf = (svc) => svc?.serviceDetails?.url ?? svc?.url ?? svc?.srvUrl ?? null

const cmd = process.argv[2]

async function main() {
  if (cmd === 'owners') {
    for (const x of await call('GET', '/owners')) {
      const o = ownerOf([x])
      console.log(`${o.id}  ${o.type}  ${o.name ?? ''}`)
    }
  } else if (cmd === 'list') {
    const owner = ownerOf(await call('GET', '/owners'))
    const list = await call('GET', '/services', { query: { ownerId: owner.id, limit: '20' } })
    if (!list.length) return console.log('（这个 workspace 里还没有服务）')
    for (const item of list) {
      const s = svcOf(item)
      console.log(`${s.id}  ${s.name}  状态=${s.status ?? '?'}  地址=${urlOf(s) ?? '(未生成)'}`)
    }
  } else if (cmd === 'create') {
    const owner = ownerOf(await call('GET', '/owners'))
    if (!owner?.id) fail('拿不到 workspace id，key 范围可能不对')
    const r = await raw('POST', '/services', { query: { ownerId: owner.id }, body: NEW_SERVICE(owner.id) })
    console.log(`POST /services -> ${r.status}`)
    console.log(brief(r.data))
    if (r.status >= 400) fail('创建被拒，看上面的错误体')
  } else if (cmd === 'watch') {
    const id = process.argv[3]
    if (!id) fail('用法：node scripts/render.mjs watch <serviceId>')
    const owner = ownerOf(await call('GET', '/owners'))
    const query = { ownerId: owner.id }
    for (let i = 0; i < 90; i++) {
      const list = await call('GET', `/services/${id}/deploys`, { query: { ...query, limit: '1' } })
      const d = Array.isArray(list) ? list[0]?.deploy : list?.[0]?.deploy
      const svc = await call('GET', `/services/${id}`, { query })
      const s = svcOf(svc)
      console.log(`[${i}] deploy=${d?.status ?? '?'}  service=${s?.status ?? '?'}  ${d?.statusUserMessage ?? ''}`.trimEnd())
      if (d?.status === 'live') {
        console.log('构建完成 ✓  公网地址：', urlOf(s) ?? '(接口没给，稍后用 list 再看)')
        return
      }
      if (['build_failed', 'canceled', 'timed_out'].includes(d?.status)) {
        console.log('构建失败，日志：node scripts/render.mjs logs', id)
        return
      }
      await new Promise((r) => setTimeout(r, 5000))
    }
    console.log('轮询超时，稍后再看：node scripts/render.mjs list')
  } else if (cmd === 'logs') {
    const id = process.argv[3]
    if (!id) fail('用法：node scripts/render.mjs logs <serviceId>')
    const owner = ownerOf(await call('GET', '/owners'))
    const query = { ownerId: owner.id }
    const list = await call('GET', `/services/${id}/deploys`, { query: { ...query, limit: '1' } })
    const d = Array.isArray(list) ? list[0]?.deploy : list?.[0]?.deploy
    if (!d?.id) fail('没有 deployment 记录')
    console.log(`deployment ${d.id}  状态=${d.status}  ${d.statusUserMessage ?? ''}`)
    console.log(redact(brief(await call('GET', `/deploys/${d.id}/logs`, { query }))).slice(-3500))
  } else {
    console.log('用法：node scripts/render.mjs owners | create | list | watch <serviceId> | logs <serviceId>')
  }
}

await main().catch((e) => {
  if (e instanceof Stop) {
    console.error('✗ ' + e.message)
    process.exitCode = 1
    return
  }
  console.error('✗ ' + redact(e?.message ?? e))
  process.exitCode = 1
})
