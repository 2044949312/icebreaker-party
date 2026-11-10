import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(fileURLToPath(import.meta.url), '../..')
const run = (script, args) =>
  spawn(process.execPath, [path.join(root, script), ...args], {
    stdio: 'inherit',
    cwd: root,
    shell: false,
    env: { ...process.env, FORCE_COLOR: '1' },
  })

const api = run('node_modules/tsx/dist/cli.mjs', ['server/index.ts'])
const web = run('node_modules/vite/bin/vite.js', ['--port', '5173', '--strictPort'])

let closing = false
const kill = () => {
  if (closing) return
  closing = true
  api.kill()
  web.kill()
  process.exit(0)
}
api.on('exit', kill)
web.on('exit', kill)
process.on('SIGINT', kill)
process.on('SIGTERM', kill)
