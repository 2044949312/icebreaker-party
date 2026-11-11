import fs from 'node:fs'
import net from 'node:net'
import os from 'node:os'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PORT = Number(process.env.PORT ?? 8787)
const entry = path.join(root, 'dist', 'server', 'index.js')

const probe = (timeout = 700) =>
  new Promise((resolve) => {
    const sock = net.connect(PORT, '127.0.0.1')
    const timer = setTimeout(() => finish(false), timeout)
    const finish = (ok) => {
      clearTimeout(timer)
      sock.destroy()
      resolve(ok)
    }
    sock.once('connect', () => finish(true))
    sock.once('error', () => finish(false))
  })

const lanUrls = () =>
  Object.values(os.networkInterfaces())
    .flat()
    .filter((n) => n && n.family === 'IPv4' && !n.internal)
    .map((n) => `http://${n.address}:${PORT}`)

const openBrowser = (url) => {
  if (process.env.NO_BROWSER) return
  const [cmd, args] =
    process.platform === 'win32' ? ['cmd', ['/c', 'start', '', url]] : ['xdg-open', [url]]
  spawn(cmd, args, { stdio: 'ignore', detached: true }).unref()
}

const build = () =>
  new Promise((resolve, reject) => {
    const p = spawn('npm', ['run', 'build'], { cwd: root, stdio: 'inherit', shell: true })
    p.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`构建失败，退出码 ${code}`))))
  })

const waitForUp = async (ms) => {
  const deadline = Date.now() + ms
  while (Date.now() < deadline) {
    if (await probe(300)) return true
    await new Promise((r) => setTimeout(r, 400))
  }
  return false
}

const local = `http://localhost:${PORT}`

if (await probe()) {
  console.log(`\n服务已经在运行，无需重复启动。\n  本机      ${local}\n`)
  lanUrls().forEach((u) => console.log(`  聚会访问  ${u}`))
  openBrowser(local)
  process.exit(0)
}

if (!fs.existsSync(entry)) {
  console.log('首次运行，正在构建（大约一分钟）...')
  await build()
}

console.log('正在启动服务...')
const server = spawn(process.execPath, [entry], { cwd: root, env: process.env, stdio: 'inherit' })
server.on('exit', (code) => {
  if (code) console.error(`\n服务异常退出，退出码 ${code}`)
  process.exit(code ?? 0)
})

if (!(await waitForUp(20000))) {
  console.error('服务没能启动，请把上面的报错发给我。')
  server.kill()
  process.exit(1)
}

console.log('\n已启动。手机和电脑需要连同一个 WiFi 才能互相访问：')
console.log(`  本机      ${local}`)
lanUrls().forEach((u) => console.log(`  聚会访问  ${u}`))
console.log('\n这个窗口保持开着，服务就在跑；关掉窗口或按 Ctrl+C 即停止。\n')
openBrowser(local)
