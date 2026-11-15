import type { GameData, Profile, Room, RoomView, Player } from '../src/shared/types'
import { ROOM_CODE_LENGTH } from '../src/shared/types'
import { GAME_BY_ID } from '../src/shared/games'
import { engineFor } from '../src/shared/engine'
import { memoryStore, ROOM_TTL_MS, type Loaded, type RoomStore } from './store'

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const TOKEN_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789'
const PLAYER_OFFLINE_MS = 45_000
/** 在线状态写库的最小间隔，避免每次轮询都产生一次写 */
const PRESENCE_WRITE_MS = 10_000
const CAS_ATTEMPTS = 4

export interface CreateInput {
  profile: Profile
  gameId: string
  judgeMode: 'ai' | 'human'
  hostName: string
}

let store: RoomStore = memoryStore()

/** 换房间存储：本机 Express 用内存，Sites Function 用数据库 */
export function useRoomStore(next: RoomStore) {
  store = next
}

/** 房间号和玩家令牌在公网部署后就是访问凭证，不能用 Math.random */
function randomPick(alphabet: string, length: number) {
  const limit = 256 - (256 % alphabet.length)
  let out = ''
  while (out.length < length) {
    const bytes = new Uint8Array(length * 2)
    crypto.getRandomValues(bytes)
    for (const b of bytes) {
      if (out.length >= length) break
      if (b < limit) out += alphabet[b % alphabet.length]
    }
  }
  return out
}

async function makeCode() {
  for (let attempt = 0; attempt < 40; attempt++) {
    const code = randomPick(CODE_CHARS, ROOM_CODE_LENGTH)
    if (!(await store.load(code))) return code
  }
  return randomPick(CODE_CHARS, ROOM_CODE_LENGTH)
}

const makeToken = () => randomPick(TOKEN_CHARS, 32)

export function normalize(code: string) {
  return String(code ?? '').trim().toUpperCase().slice(0, ROOM_CODE_LENGTH)
}

export function sanitizeName(name: unknown) {
  return String(name ?? '').replace(/\s+/g, ' ').trim().slice(0, 12)
}

export type MutateResult<T> =
  | { ok: true; value: T; room: Room }
  | { ok: false; reason: 'not_found' | 'conflict' }

/** 读房间 → 改 → 按 seq 写回；写回撞车就重读再来 */
export async function mutateRoom<T>(code: string, fn: (room: Room) => T): Promise<MutateResult<T>> {
  for (let attempt = 0; attempt < CAS_ATTEMPTS; attempt++) {
    const loaded = await store.load(code)
    if (!loaded) return { ok: false, reason: 'not_found' }
    const value = fn(loaded.room)
    if (JSON.stringify(loaded.room) === loaded.json) return { ok: true, value, room: loaded.room }
    // 版本号必须前进，否则只改 lastSeen 这类不动 seq 的写入躲得过并发检查
    loaded.room.seq = Math.max(loaded.room.seq, loaded.expectedSeq + 1)
    if (await store.commit(loaded, loaded.room)) return { ok: true, value, room: loaded.room }
  }
  return { ok: false, reason: 'conflict' }
}

/** 每次请求顺带把时间往前推一格，替代常驻进程里的 setInterval */
export function advance(room: Room, now: number) {
  const engine = engineFor(room.gameId)
  if (!engine) return
  try {
    engine.tick(room, now)
  } catch (err) {
    console.error('[tick]', room.code, room.gameId, err)
    room.seq += 1
    room.events.push({ seq: room.seq, at: now, kind: 'info', text: '裁判这边卡了一下，按「下一步」继续。' })
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
  }
}

export async function createRoom(input: CreateInput): Promise<{ room: Room; host: Player }> {
  const meta = GAME_BY_ID[input.gameId]
  if (!meta) throw new Error('unknown game')
  const engine = engineFor(input.gameId)
  if (!engine) throw new Error('engine missing')

  const code = await makeCode()
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

  engine.create(room)
  touch(room)
  if (!(await store.insert(room))) throw new Error('code taken')
  return { room, host }
}

export const loadRoom = (code: string): Promise<Loaded | null> => store.load(normalize(code))

export async function joinRoom(
  code: string,
  name: string,
): Promise<{ room: Room; player: Player } | null> {
  const clean = sanitizeName(name)
  if (!clean) return null
  const result = await mutateRoom(normalize(code), (room) => {
    if (room.phase !== 'lobby') return null

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
    room.seq += 1
    room.events.push({
      seq: room.seq,
      at: Date.now(),
      kind: 'join',
      text: `${player.name} 加入，现在 ${room.players.length} 个人`,
    })
    touch(room)
    return { room, player }
  })
  return result.ok ? result.value : null
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

/* ---------------------------- 在线状态 ---------------------------- */

/** 超过 PRESENCE_WRITE_MS 才动 lastSeen，免得每次轮询都产生一次写 */
export function markSeen(room: Room, token: string | null, now = Date.now()) {
  if (!token) return
  const p = room.players.find((x) => x.id === token)
  if (!p || now - p.lastSeen < PRESENCE_WRITE_MS) return
  p.lastSeen = now
}

/* ---------------------------- 心跳 ---------------------------- */

/** 常驻进程用：把所有房间推一格；Serverless 走请求里的 advance() */
export async function tickAll(now: number) {
  for (const room of (await store.all?.()) ?? []) {
    if (now - room.updatedAt > ROOM_TTL_MS) {
      await store.remove(room.code)
      continue
    }
    advance(room, now)
  }
}

export const roomCount = () => store.count()
