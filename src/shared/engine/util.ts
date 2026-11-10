import type {
  BombData,
  GameData,
  MimeData,
  NeverData,
  Player,
  Room,
  SevenData,
  SoupData,
  SpyData,
  StoryData,
  TwosData,
} from '../types'

/* ---------------------------- 随机 ---------------------------- */

export const randInt = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1))

export const pick = <T>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)]

export function shuffle<T>(arr: readonly T[]): T[] {
  const out = arr.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export const chance = (p: number) => Math.random() < p

/* ---------------------------- 房间 ---------------------------- */

export const seated = (room: Room) => room.players.slice().sort((a, b) => a.seat - b.seat)

export const alive = (room: Room) => seated(room).filter((p) => p.alive)

export const byId = (room: Room, id: string): Player | undefined =>
  room.players.find((p) => p.id === id)

export const nameOf = (room: Room, id: string | null | undefined) =>
  (id && byId(room, id)?.name) || '某人'

export const isRefereeAct = (room: Room, actor: Player | null) =>
  !!actor && (actor.isHost || room.refereeId === actor.id)

export function addScore(room: Room, id: string, delta: number) {
  const p = byId(room, id)
  if (p) p.score = Math.max(0, p.score + delta)
}

/** 当前阶段还剩下多少秒（无计时返回 null） */
export const secondsLeft = (room: Room, now: number) =>
  room.deadlineAt == null ? null : Math.max(0, Math.ceil((room.deadlineAt - now) / 1000))

export function ev(room: Room, kind: 'info' | 'judge' | 'score' | 'leave', text: string) {
  room.seq += 1
  room.events.push({ seq: room.seq, at: Date.now(), kind, text })
  if (room.events.length > 60) room.events.splice(0, room.events.length - 60)
}

/** 切阶段；ms 给了就开倒计时，不给则不倒计时 */
export function phase(room: Room, next: string, opts?: { ms?: number; round?: number; turn?: number }) {
  room.phase = next
  if (opts?.round !== undefined) room.round = opts.round
  if (opts?.turn !== undefined) room.turn = opts.turn
  room.deadlineAt = opts?.ms ? Date.now() + opts.ms : null
  room.updatedAt = Date.now()
}

/** 重新计时但不换阶段 */
export function retime(room: Room, ms: number) {
  room.deadlineAt = Date.now() + ms
}

/** 该玩家在本阶段是否已经交过 */
export const submitted = (room: Room, id: string, key: string) => {
  const d: any = room.data
  for (const bag of Object.values(d ?? {})) {
    if (bag && typeof bag === 'object' && (bag as any)[key]?.[id] !== undefined) return true
  }
  return false
}

/** 所有人都交完了吗 */
export function allSubmitted(room: Room, ids: string[], key: string, bag: keyof GameData) {
  const store: any = (room.data[bag] as any)?.[key]
  if (!store) return false
  return ids.every((id) => store[id] !== undefined && store[id] !== '' && store[id] !== null)
}

/* ------------------------ 各游戏数据取用 ------------------------ */

function slot<T extends object>(room: Room, key: keyof GameData): T {
  if (!(room.data as any)[key]) (room.data as any)[key] = {}
  return (room.data as any)[key] as T
}

export const spy = (room: Room) => slot<SpyData>(room, 'spy')
export const twos = (room: Room) => slot<TwosData>(room, 'twos')
export const soup = (room: Room) => slot<SoupData>(room, 'soup')
export const bomb = (room: Room) => slot<BombData>(room, 'bomb')
export const seven = (room: Room) => slot<SevenData>(room, 'seven')
export const story = (room: Room) => slot<StoryData>(room, 'story')
export const never = (room: Room) => slot<NeverData>(room, 'never')
export const mime = (room: Room) => slot<MimeData>(room, 'mime')

/* ---------------------------- 文本 ---------------------------- */

/** 粗略切词：中文按 2-gram，英文按单词。用于本地裁判做关键词命中判断。 */
export function grams(text: string): Set<string> {
  const clean = (text || '').replace(/\s+/g, '')
  const out = new Set<string>()
  const en = clean.toLowerCase().match(/[a-z]{2,}/g) ?? []
  en.forEach((w) => out.add(w))
  for (let i = 0; i < clean.length - 1; i++) out.add(clean.slice(i, i + 2))
  if (clean.length === 1) out.add(clean)
  return out
}

/** a 里有多少个 2-gram 出现在 b 里 */
export function overlap(a: string, b: string): number {
  const ga = grams(a)
  let hit = 0
  for (const g of grams(b)) if (ga.has(g)) hit += 1
  return hit
}

export const containsAny = (text: string, words: string[]) => {
  const t = text || ''
  return words.some((w) => w.length >= 2 && t.includes(w))
}

export const clip = (s: string, n = 60) => {
  const t = (s || '').trim()
  return t.length > n ? t.slice(0, n) + '…' : t
}

/** 玩家输入的清洗：限长、去首尾空白、折叠换行 */
export const sanitize = (s: unknown, max = 200) =>
  String(s ?? '')
    .replace(/\r?\n/g, ' ')
    .trim()
    .slice(0, max)

export const seatLabel = (p: Player) => `${p.seat} 号 · ${p.name}`
