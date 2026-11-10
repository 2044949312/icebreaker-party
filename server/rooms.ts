import type { GameData, Profile, Room, RoomView, Player } from '../src/shared/types'
import { GAME_BY_ID } from '../src/shared/games'
import { engineFor } from '../src/shared/engine'

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const ROOM_TTL_MS = 3 * 60 * 60 * 1000
const PLAYER_OFFLINE_MS = 45_000

export interface CreateInput {
  profile: Profile
  gameId: string
  judgeMode: 'ai' | 'human'
  hostName: string
}

const rooms = new Map<string, Room>()
const tokens = new Map<string, string>()

function makeCode() {
  for (let attempt = 0; attempt < 40; attempt++) {
    let code = ''
    for (let i = 0; i < 4; i++) code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]
    if (!rooms.has(code)) return code
  }
  return Date.now().toString(36).slice(-4).toUpperCase()
}

const makeToken = () =>
  Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')

export function codeOf(token: string): string | null {
  return tokens.get(token) ?? null
}

export function createRoom(input: CreateInput): { room: Room; host: Player } {
  const meta = GAME_BY_ID[input.gameId]
  if (!meta) throw new Error('unknown game')
  const engine = engineFor(input.gameId)
  if (!engine) throw new Error('engine missing')

  const code = makeCode()
  const now = Date.now()
  const host: Player = {
    id: makeToken(),
    name: sanitizeName(input.hostName) || '房主',
    seat: 1,
    isHost: true,
    connected: true,
    lastSeen: now,
    score: 0,
    alive: true,
    outReason: null,
  }

  const room: Room = {
    code,
    createdAt: now,
    updatedAt: now,
    seq: 1,
    gameId: input.gameId,
    profile: input.profile,
    judgeMode: meta.judgeModes.includes(input.judgeMode) ? input.judgeMode : meta.judgeModes[0],
    refereeId: null,
    phase: 'lobby',
    round: 0,
    turn: 0,
    startedAt: null,
    deadlineAt: null,
    pausedMs: 0,
    players: [host],
    data: {} as GameData,
    events: [],
    finished: null,
  }

  tokens.set(host.id, code)
  rooms.set(code, room)
  engine.create(room)
  touch(room)
  return { room, host }
}

export function getRoom(code: string): Room | null {
  return rooms.get(normalize(code)) ?? null
}

export function normalize(code: string) {
  return String(code ?? '').trim().toUpperCase().slice(0, 6)
}

export function sanitizeName(name: unknown) {
  return String(name ?? '').replace(/\s+/g, ' ').trim().slice(0, 12)
}

export function joinRoom(code: string, name: string): { room: Room; player: Player } | null {
  const room = getRoom(code)
  if (!room) return null
  if (room.phase !== 'lobby') return null

  const clean = sanitizeName(name)
  if (!clean) return null

  const taken = new Set(room.players.map((p) => p.name))
  let finalName = clean
  let n = 2
  while (taken.has(finalName)) finalName = `${clean}${n++}`

  const player: Player = {
    id: makeToken(),
    name: finalName,
    seat: room.players.length + 1,
    isHost: false,
    connected: true,
    lastSeen: Date.now(),
    score: 0,
    alive: true,
    outReason: null,
  }
  room.players.push(player)
  tokens.set(player.id, room.code)
  room.seq += 1
  room.events.push({
    seq: room.seq,
    at: Date.now(),
    kind: 'leave',
    text: `${player.name} 加入，现在 ${room.players.length} 个人`,
  })
  touch(room)
  return { room, player }
}

export function touch(room: Room) {
  room.updatedAt = Date.now()
  if (room.events.length > 60) room.events.splice(0, room.events.length - 60)
}

/** 房主在 lobby 里设定裁判模式与真人裁判 */
export function configureRoom(
  room: Room,
  opts: { judgeMode?: 'ai' | 'human'; refereeId?: string | null },
): string | null {
  const meta = GAME_BY_ID[room.gameId]
  if (opts.judgeMode) {
    if (!meta.judgeModes.includes(opts.judgeMode)) return `${meta.name} 不支持这种裁判方式`
    room.judgeMode = opts.judgeMode
    if (opts.judgeMode === 'ai') room.refereeId = null
  }
  if (opts.refereeId !== undefined) {
    if (room.judgeMode !== 'human') return '当前是 AI 裁判，先切换成真人裁判'
    if (opts.refereeId === null) {
      room.refereeId = null
    } else {
      const p = room.players.find((x) => x.id === opts.refereeId)
      if (!p) return '找不到这名玩家'
      room.refereeId = p.id
    }
  }
  if (room.judgeMode === 'human' && !room.refereeId && room.phase === 'lobby') {
    return '还差一步：指定一名真人裁判'
  }
  touch(room)
  return null
}

export function startRoom(room: Room, hostToken: string): string | null {
  if (!room.players.some((p) => p.id === hostToken && p.isHost)) return '只有房主能开始这局'
  const meta = GAME_BY_ID[room.gameId]
  if (room.players.length < meta.minPlayers) return `至少 ${meta.minPlayers} 个人才能开这局`
  if (room.judgeMode === 'human' && !room.refereeId) return '请先指定一名真人裁判'
  const engine = engineFor(room.gameId)
  if (!engine) return '游戏引擎缺失'
  room.startedAt = Date.now()
  room.seq += 1
  engine.start(room)
  touch(room)
  return null
}

export function act(
  room: Room,
  token: string,
  action: string,
  payload: any,
): string | null {
  const engine = engineFor(room.gameId)
  const actor = room.players.find((p) => p.id === token)
  if (!engine || !actor) return '身份失效，请重新加入房间'
  if (!/^[a-zA-Z][a-zA-Z0-9]{1,24}$/.test(action)) return '未知操作'
  engine.act(room, actor, action, payload ?? {})
  touch(room)
  return null
}

export function nextStep(room: Room, token: string | null): string | null {
  const engine = engineFor(room.gameId)
  if (!engine) return '游戏引擎缺失'
  const actor = token ? room.players.find((p) => p.id === token) ?? null : null
  if (token && !actor) return '身份失效，请重新加入房间'
  if (room.phase === 'lobby') return startRoom(room, actor?.id ?? '')
  engine.next(room, actor)
  touch(room)
  return null
}

/* ---------------------------- 视图构建 ---------------------------- */

function isRefereeViewer(room: Room, me: Player | null) {
  if (me && room.judgeMode === 'human' && room.refereeId === me.id) return true
  if (me?.isHost) return true
  return false
}

export function buildView(room: Room, token: string | null, asWatcher = false): RoomView | null {
  const meta = GAME_BY_ID[room.gameId]
  const engine = engineFor(room.gameId)
  if (!meta || !engine) return null

  const now = Date.now()
  const me = token ? room.players.find((p) => p.id === token) ?? null : null
  const role: RoomView['role'] = asWatcher || !me
    ? 'watcher'
    : me.isHost
      ? 'host'
      : room.judgeMode === 'human' && room.refereeId === me.id
        ? 'referee'
        : 'player'

  const players = room.players.map((p) => ({
    ...p,
    connected: now - p.lastSeen < PLAYER_OFFLINE_MS,
  }))

  const view: RoomView = {
    code: room.code,
    seq: room.seq,
    gameId: room.gameId,
    meta,
    phase: room.phase,
    round: room.round,
    turn: room.turn,
    deadlineAt: room.deadlineAt,
    serverNow: now,
    judgeMode: room.judgeMode,
    refereeId: room.refereeId,
    role,
    me: me ? players.find((p) => p.id === me.id) ?? null : null,
    players,
    events: room.events.slice(-14),
    finished: room.finished,
    publicData: engine.publicData(room),
    secret: me && !asWatcher ? engine.secretFor(room, me) : {},
    referee: isRefereeViewer(room, me) ? engine.refereeExtra(room) : null,
    needs: { prompt: null, input: 'none', inputHint: '', submitted: false, hostHint: '' },
  }

  view.needs = engine.needs(room, role === 'watcher' ? null : me, view)
  return view
}

/* ---------------------------- 心跳 ---------------------------- */

export function tickAll(now: number) {
  for (const room of rooms.values()) {
    if (now - room.updatedAt > ROOM_TTL_MS) {
      for (const p of room.players) tokens.delete(p.id)
      rooms.delete(room.code)
      continue
    }
    const engine = engineFor(room.gameId)
    if (!engine) continue
    try {
      engine.tick(room, now)
    } catch (err) {
      console.error('[tick]', room.code, room.gameId, err)
      room.seq += 1
      room.events.push({
        seq: room.seq,
        at: now,
        kind: 'info',
        text: '裁判这边卡了一下，按「下一步」继续。',
      })
    }
    if (room.phase === 'over' && !room.finished) {
      try {
        room.finished = engine.finish(room)
      } catch (err) {
        console.error('[finish]', room.code, err)
        room.finished = {
          title: '本局结束',
          lines: [],
          winners: [],
          verdict: '结算时裁判打了个盹，分数以现场记忆为准。',
        }
      }
      touch(room)
    }
  }
}

export const roomCount = () => rooms.size
