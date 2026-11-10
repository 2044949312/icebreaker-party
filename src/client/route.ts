/** 极短路由：不引第三方库，靠 pathname + query 分发。 */

export type Route =
  | { name: 'home' }
  | { name: 'join'; code: string }
  | { name: 'host'; code: string }
  | { name: 'phone'; code: string }
  | { name: 'watch'; code: string }

export function parse(): Route {
  const path = location.pathname.replace(/\/+$/, '') || '/'
  const q = new URLSearchParams(location.search)
  const code = (q.get('c') ?? '').toUpperCase()
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

type Creds = Record<string, string>

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

export function saveToken(code: string, token: string) {
  const all = read()
  all[code.toUpperCase()] = token
  try {
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch {
    /* 隐私模式下写不进去，不影响本次会话 */
  }
}

export const joinHref = (code: string) => `${location.origin}/join?c=${code.toUpperCase()}`

export const hostHref = (code: string) => `/host?c=${code.toUpperCase()}`
