/** 极短路由：不引第三方库，靠 pathname + query 分发。 */

export type Route =
  | { name: 'home' }
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

export const joinHref = (code: string) => `${location.origin}/join.html?c=${code.toUpperCase()}`

export const hostHref = (code: string) => `/host.html?c=${code.toUpperCase()}`

/** 下面两个是给「别的设备」看的地址，所以用服务端算出来的可访问 base */
export const shareJoinHref = (code: string, base: string | null) =>
  `${base ?? location.origin}/join.html?c=${code.toUpperCase()}`

export const shareHostHref = (code: string, base: string | null) =>
  `${base ?? location.origin}/host.html?c=${code.toUpperCase()}`
