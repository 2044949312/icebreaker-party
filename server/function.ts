/**
 * Sites Edge Function 的业务入口：和 server/index.ts 走同一套 api.ts，
 * 差别只有两件事——房间放在数据库里，以及对外地址就是本次请求的来源。
 * 这个文件会被 esbuild 打包成 functions/application.mjs，不要在里面 import 任何 node: 模块。
 */
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
import { useRoomStore, normalize } from './rooms'
import { dbStore } from './store'

const json = (r: ApiResponse) => Response.json(r.body as never, { status: r.status })

const readJson = async (request: Request): Promise<any> => {
  const text = await request.text()
  if (text.length > 48_000) throw new Error('payload_too_large')
  if (!text) return {}
  return JSON.parse(text)
}

export function application(deps: { db: any; BackendError: new (code: string, status: number) => Error }) {
  const fail = (code: string, status: number): never => {
    throw new deps.BackendError(code, status)
  }
  const store = dbStore(deps.db, fail)
  useRoomStore(store)

  return async (ctx: any) => {
    const request: Request = ctx?.request ?? ctx
    // 网关会把逻辑名 app 换成部署出来的物理名，只保留后面的业务路径
    const url = new URL(request.url)
    const match = url.pathname.match(/^\/(?:functions\/v1\/)?(?:app|app-d[0-9a-f]{32})(\/.*)?$/)
    if (!match) return Response.json({ error: 'not_found' }, { status: 404 })
    const path = match[1] ?? '/'
    const get = (name: string) => url.searchParams.get(name)

    if (request.method === 'GET' && path === '/api/health') return json(await health())
    // url.origin 在这里是网关的内网地址，不能当访客链接；前端会退回自己的 location.origin
    if (request.method === 'GET' && path === '/api/meta') return json(metaBody(null))

    if (request.method === 'POST' && path === '/api/rooms') {
      // 顺手清掉过期房间：这里没有常驻进程可以跑定时任务
      await store.sweep(Date.now())
      return json(await createRoomRoute(await readJson(request)))
    }
    if (request.method === 'POST' && path === '/api/join') {
      return json(await joinRoute(await readJson(request)))
    }

    const room = path.match(/^\/api\/rooms\/([^/]+)$/)
    if (room && request.method === 'GET') {
      return json(await viewRoute(normalize(room[1]), get('token'), get('watch') === '1'))
    }

    const sub = path.match(/^\/api\/rooms\/([^/]+)\/(action|next|configure)$/)
    if (sub) {
      const code = normalize(sub[1])
      const body = await readJson(request)
      const token = String(body?.token ?? '')
      if (sub[2] === 'action') return json(await actionRoute(code, token, String(body?.action ?? ''), body?.payload))
      if (sub[2] === 'next') return json(await nextRoute(code, token, !!body?.force))
      return json(
        await configureRoute(code, token, {
          judgeMode: body?.judgeMode === undefined ? undefined : body.judgeMode === 'human' ? 'human' : 'ai',
          refereeId: body?.refereeId === undefined ? undefined : body.refereeId === null ? null : String(body.refereeId),
        }),
      )
    }

    return Response.json({ error: 'not_found' }, { status: 404 })
  }
}
