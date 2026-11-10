import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchView, sendAction, sendNext } from '../api'
import type { RoomView } from '../../shared/types'

export interface RoomSocket {
  view: RoomView | null
  error: string | null
  offline: boolean
  /** 与服务端对齐的当前时间 */
  now: number
  /** 本地倒计时的剩余秒数，无计时返回 null */
  secondsLeft: number | null
  run: (action: string, payload?: unknown) => Promise<string | null>
  step: () => Promise<string | null>
  refresh: () => void
}

export function useRoom(code: string | null, token: string | null, watch = false): RoomSocket {
  const [view, setView] = useState<RoomView | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [offline, setOffline] = useState(false)
  const [now, setNow] = useState(() => Date.now())
  const offset = useRef(0)
  const busy = useRef(false)

  const load = useCallback(async () => {
    if (!code) return
    try {
      const v = await fetchView(code, token, watch)
      offset.current = v.serverNow - Date.now()
      setView(v)
      setError(null)
      setOffline(false)
    } catch (err: any) {
      setError(err?.message ?? '连不上服务器')
      setOffline(true)
    }
  }, [code, token, watch])

  useEffect(() => {
    if (!code) return
    let stop = false
    const loop = async () => {
      if (!stop && !busy.current) {
        busy.current = true
        await load()
        busy.current = false
      }
    }
    loop()
    const fast = window.setInterval(loop, 1200)
    const slow = window.setInterval(() => {
      if (document.hidden) loop()
    }, 4000)
    const onVisible = () => {
      if (!document.hidden) loop()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      stop = true
      window.clearInterval(fast)
      window.clearInterval(slow)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [code, load])

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now() + offset.current), 200)
    return () => window.clearInterval(t)
  }, [])

  const secondsLeft =
    view?.deadlineAt == null ? null : Math.max(0, Math.ceil((view.deadlineAt - now) / 1000))

  const run = useCallback(
    async (action: string, payload?: unknown) => {
      if (!code || !token) return '身份失效，请重新加入'
      try {
        const v = await sendAction(code, token, action, payload)
        offset.current = v.serverNow - Date.now()
        setView(v)
        setError(null)
        return null
      } catch (err: any) {
        setError(err?.message ?? '提交失败')
        return err?.message ?? '提交失败'
      }
    },
    [code, token],
  )

  const step = useCallback(async () => {
    if (!code) return '没有房间号'
    try {
      const r = await sendNext(code, token ?? '')
      if (r.view) {
        offset.current = r.view.serverNow - Date.now()
        setView(r.view)
      }
      setError(null)
      return r.error
    } catch (err: any) {
      setError(err?.message ?? '操作失败')
      return err?.message ?? '操作失败'
    }
  }, [code, token])

  return { view, error, offline, now, secondsLeft, run, step, refresh: () => void load() }
}
