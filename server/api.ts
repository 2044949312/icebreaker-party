/**
 * 业务路由层：Express（本机局域网）和 Sites Edge Function（公网）共用这一份实现，
 * 只把「房间存哪儿」和「对外地址怎么算」留给各自的入口。
 */
import type { Profile } from '../src/shared/types'
import { GAME_BY_ID } from '../src/shared/games'
import {
  act,
  advance,
  buildView,
  configureRoom,
  createRoom,
  joinRoom,
  loadRoom,
  markSeen,
  mutateRoom,
  nextStep,
  normalize,
  roomCount,
  sanitizeName,
  startRoom,
  type CreateInput,
} from './rooms'

export interface ApiResponse {
  status: number
  body: unknown
}

const ok = (body: unknown): ApiResponse => ({ status: 200, body })
const bad = (status: number, error: string): ApiResponse => ({ status, body: { error } })

/** origin 传 null 表示服务端算不出访客能打开的地址，让前端用自己的来源 */
export function metaBody(origin: string | null, lan?: string | null): ApiResponse {
  if (!origin) return ok({ base: null })
  const host = origin.split('//')[1]?.split(':')[0] ?? ''
  const isLocal = !host || host === 'localhost' || host.startsWith('127.') || host === '::1'
  return ok({ base: isLocal && lan ? lan : origin })
}

export async function health(): Promise<ApiResponse> {
  return ok({ ok: true, rooms: await roomCount() })
}

const clampProfile = (p: any): Profile => ({
  count: Math.max(2, Math.min(30, Math.round(p?.count ?? 6))),
  minutes: Math.max(3, Math.min(90, Math.round(p?.minutes ?? 10))),
  setting: ['seated', 'standing', 'lounging'].includes(p?.setting) ? p.setting : 'seated',
  vibes: Array.isArray(p?.vibes)
    ? p.vibes.filter((v: string) => ['laugh', 'warm', 'brain', 'rival'].includes(v)).slice(0, 4)
    : [],
  intimacy: ['strangers', 'colleagues', 'friends', 'family'].includes(p?.intimacy) ? p.intimacy : 'friends',
  shyLevel: [0, 1, 2].includes(p?.shyLevel) ? p.shyLevel : 1,
  propsOk: !!p?.propsOk,
  phonePerPerson: !!p?.phonePerPerson,
  wantMove: !!p?.wantMove,
})

export async function createRoomRoute(b: any): Promise<ApiResponse> {
  if (!b?.profile || typeof b.profile.count !== 'number' || !GAME_BY_ID[b.gameId]) {
    return bad(400, '缺少房间信息')
  }
  const input: CreateInput = {
    gameId: String(b.gameId),
    hostName: sanitizeName(b.hostName ?? ''),
    judgeMode: b.judgeMode === 'human' ? 'human' : 'ai',
    profile: clampProfile(b.profile),
  }
  try {
    const { room, host } = await createRoom(input)
    return ok({ code: room.code, token: host.id, view: buildView(room, host.id) })
  } catch (e: any) {
    // 数据库故障不是「输入不对」，压成 400 会让线上只剩一个查不下去的错误
    if (typeof e?.status === 'number' && e.status >= 500) throw e
    return bad(400, '建房失败')
  }
}

export async function joinRoute(b: any): Promise<ApiResponse> {
  const code = normalize(b?.code)
  const result = await joinRoom(code, String(b?.name ?? ''))
  if (result) return ok({ code: result.room.code, token: result.player.id, view: buildView(result.room, result.player.id) })

  const loaded = await loadRoom(code)
  if (!loaded) return bad(404, '找不到这个房间，检查一下房间号')
  if (loaded.room.phase !== 'lobby') return bad(400, '这局已经开始了，等下一局再加入吧')
  return bad(400, '名字不太对，换一个试试')
}

export async function viewRoute(code: string, token: string | null, watch = false): Promise<ApiResponse> {
  const result = await mutateRoom(normalize(code), (room) => {
    const now = Date.now()
    advance(room, now)
    markSeen(room, token, now)
    return buildView(room, token, watch)
  })
  if (!result.ok) return bad(404, result.reason === 'conflict' ? '房间太挤了，再刷一次' : '房间不存在或已结束')
  return ok({ view: result.value })
}

export async function actionRoute(code: string, token: string, action: string, payload: any): Promise<ApiResponse> {
  const size = JSON.stringify(payload ?? {}).length
  if (size > 4000) return bad(400, '这段内容太长了')
  const result = await mutateRoom(normalize(code), (room) => {
    advance(room, Date.now())
    return act(room, token, action, payload)
  })
  if (!result.ok) return bad(404, result.reason === 'conflict' ? '这一步没写上，再点一次' : '房间不存在或已结束')
  return ok({ error: result.value, view: buildView(result.room, token) })
}

export async function nextRoute(code: string, token: string, force = false): Promise<ApiResponse> {
  const result = await mutateRoom(normalize(code), (room) => {
    advance(room, Date.now())
    return force ? startRoom(room, token) : nextStep(room, token || null)
  })
  if (!result.ok) return bad(404, result.reason === 'conflict' ? '这一步没写上，再点一次' : '房间不存在或已结束')
  return ok({ error: result.value, view: buildView(result.room, token) })
}

export async function configureRoute(code: string, token: string, opts: any): Promise<ApiResponse> {
  const result = await mutateRoom(normalize(code), (room) => {
    if (!room.players.some((p) => p.id === token && p.isHost)) return { denied: true as const, error: null }
    return { denied: false as const, error: configureRoom(room, opts) }
  })
  if (!result.ok) return bad(404, result.reason === 'conflict' ? '这一步没写上，再点一次' : '房间不存在或已结束')
  if (result.value.denied) return bad(403, '只有房主能设置裁判')
  return ok({ error: result.value.error, view: buildView(result.room, token) })
}
