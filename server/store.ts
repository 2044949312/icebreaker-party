import type { Room } from '../src/shared/types'

export const ROOM_TTL_MS = 3 * 60 * 60 * 1000

export interface Loaded {
  room: Room
  /** 读取时的原始 JSON，用来判断这次请求到底有没有改动 */
  json: string
  /** 读取时的 seq，写回时作为乐观并发条件 */
  expectedSeq: number
}

export interface RoomStore {
  load(code: string): Promise<Loaded | null>
  insert(room: Room): Promise<boolean>
  /** seq 对不上说明有别人先写了，返回 false 让调用方重读重试 */
  commit(loaded: Loaded, room: Room): Promise<boolean>
  remove(code: string): Promise<void>
  sweep(now: number): Promise<void>
  count(): Promise<number>
  /** 只有常驻进程需要遍历全部房间；Serverless 里不存在这个方法 */
  all?(): Promise<Room[]>
}

const serialize = (room: Room) => JSON.stringify(room)

/** 本机跑 Express 用：进程内 Map，没有并发问题 */
export function memoryStore(): RoomStore {
  const rooms = new Map<string, Room>()
  return {
    async load(code) {
      const room = rooms.get(code)
      if (!room) return null
      const json = serialize(room)
      return { room: JSON.parse(json), json, expectedSeq: room.seq }
    },
    async insert(room) {
      rooms.set(room.code, room)
      return true
    },
    async commit(loaded, room) {
      const current = rooms.get(room.code)
      if (!current || current.seq !== loaded.expectedSeq) return false
      rooms.set(room.code, room)
      return true
    },
    async remove(code) {
      rooms.delete(code)
    },
    async sweep(now) {
      for (const [code, room] of rooms) if (now - room.updatedAt > ROOM_TTL_MS) rooms.delete(code)
    },
    async count() {
      return rooms.size
    },
    async all() {
      return [...rooms.values()]
    },
  }
}

const TABLE = 'rooms'

/** Sites 数据库用：一行一个房间，seq 做 compare-and-set */
export function dbStore(db: any, fail: (code: string, status: number) => never): RoomStore {
  const unwrap = (result: any) => {
    if (result?.error) fail('database_unavailable', 503)
    return result?.data
  }

  return {
    async load(code) {
      // SDK 没有 maybeSingle，也没有 single 的「查不到给 null」
      const found = unwrap(
        await db.from(TABLE).select('code,seq,state').eq('code', code).limit(1),
      )
      const row = found?.[0]
      if (!row?.state) return null
      const room = row.state as Room
      return { room, json: JSON.stringify(room), expectedSeq: row.seq }
    },
    async insert(room) {
      const result = await db
        .from(TABLE)
        .insertIfAbsent(
          { code: room.code, seq: room.seq, state: room, updated_at: new Date(room.updatedAt).toISOString() },
          { onConflict: 'code' },
        )
        .select('code')
      if (result?.error) fail('database_unavailable', 503)
      // 撞号时 SDK 返回空数组，让调用方换个房间号重试
      return !!result?.data?.length
    },
    async commit(loaded, room) {
      const written = unwrap(
        await db
          .from(TABLE)
          .update({ seq: room.seq, state: room, updated_at: new Date(room.updatedAt).toISOString() })
          .eq('code', room.code)
          .eq('seq', loaded.expectedSeq)
          .select('code'),
      )
      return !!written?.length
    },
    async remove(code) {
      unwrap(await db.from(TABLE).delete().eq('code', code).select('code'))
    },
    async sweep(now) {
      unwrap(
        await db
          .from(TABLE)
          .delete()
          .lt('updated_at', new Date(now - ROOM_TTL_MS).toISOString())
          .select('code'),
      )
    },
    async count() {
      const result = await db.from(TABLE).select('code', { count: 'exact' }).limit(1)
      if (result?.error) fail('database_unavailable', 503)
      return Number.isSafeInteger(result?.count) ? result.count : 0
    },
  }
}
