/** 极短路由：不引第三方库，靠 pathname + query 分发。 */

export type Route =
  | { name: 'home' }
  | { name: 'games' }
  | { name: 'join'; code: string }
  | { name: 'host'; code: string }
  | { name: 'phone'; code: string }
  | { name: 'watch'; code: string }

export function parse(): Route {
  // 静态托管没有目录索引，深层地址一律落在 /join.html 这样的真实文件上，
  // 但本机 dev 和旧链接给的是 /join，两种写法都要认。
  const path = (location.pathname.replace(/\.html$/, '').replace(/\/+$/, '') || '/') as string
  const q = new URLSearchParams(location.search)
  const code = (q.get('c') ?? '').toUpperCase()
  if (path === '/games') return { name: 'games' }
  if (path === '/join') return { name: 'join', code }
  if (path === '/host' && code) return { name: 'host', code }
  if (path === '/p' && code) return { name: 'phone', code }
  if (path === '/watch' && code) return { name: 'watch', code }
  return { name: 'home' }
}

export function go(to: string, replace = false) {
  if (replace) history.replaceState(null, '', to)
  else history.pushState(null, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

const KEY = 'icebreaker.creds'
const RECENT_KEY = 'icebreaker.recent'
const RECENT_MAX = 6

type Creds = Record<string, string>

export interface RecentRoom {
  code: string
  at: number
  gameId: string | null
  role: 'host' | 'player'
}

function read(): Creds {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}') as Creds
  } catch {
    return {}
  }
}

export function tokenFor(code: string): string | null {
  return read()[code.toUpperCase()] ?? null
}

export function saveToken(code: string, token: string, meta?: { gameId?: string; role?: 'host' | 'player' }) {
  const key = code.toUpperCase()
  const all = read()
  all[key] = token
  const recent: RecentRoom[] = [
    { code: key, at: Date.now(), gameId: meta?.gameId ?? null, role: meta?.role ?? 'player' },
    ...recentRooms().filter((r) => r.code !== key),
  ].slice(0, RECENT_MAX)
  try {
    localStorage.setItem(KEY, JSON.stringify(all))
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent))
  } catch {
    /* 隐私模式下写不进去，不影响本次会话 */
  }
}

export function recentRooms(): RecentRoom[] {
  try {
    const raw = JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]')
    if (!Array.isArray(raw)) return []
    return raw.filter((r) => r && typeof r.code === 'string' && typeof r.at === 'number')
  } catch {
    return []
  }
}

/** 房间 3 小时就被服务端清掉了，列表里得能手动扔掉死房间 */
export function forgetRoom(code: string) {
  const key = code.toUpperCase()
  const all = read()
  delete all[key]
  try {
    localStorage.setItem(KEY, JSON.stringify(all))
    localStorage.setItem(RECENT_KEY, JSON.stringify(recentRooms().filter((r) => r.code !== key)))
  } catch {
    /* 同上 */
  }
}

export const joinHref = (code: string) => `${location.origin}/join.html?c=${code.toUpperCase()}`

export const hostHref = (code: string) => `/host.html?c=${code.toUpperCase()}`

export const gamesHref = '/games.html'

/** 房主自己也是玩家时，打开本人的手机玩家页（私密输入，不上投屏） */
export const phoneHref = (code: string) => `/p?c=${code.toUpperCase()}`

/** 下面两个是给「别的设备」看的地址，所以用服务端算出来的可访问 base */
export const shareJoinHref = (code: string, base: string | null) =>
  `${base ?? location.origin}/join.html?c=${code.toUpperCase()}`

export const shareHostHref = (code: string, base: string | null) =>
  `${base ?? location.origin}/host.html?c=${code.toUpperCase()}`
