/**
 * 把 server/function.ts 打成 Site 能用的单文件 Edge Function。
 * 平台的打包器不装依赖，所以业务代码必须自包含：一个 application.mjs 走完。
 */
import { build } from 'esbuild'

const out = await build({
  entryPoints: ['server/function.ts'],
  outfile: 'functions/application.mjs',
  bundle: true,
  format: 'esm',
  platform: 'neutral',
  target: 'es2022',
  logLevel: 'info',
})

if (out.errors.length) process.exit(1)
