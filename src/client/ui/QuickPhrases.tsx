import { useState } from 'react'
import { QUICK_PHRASES, QUICK_REACTIONS } from '../../shared/phrases'

/** 线下会喊出口的话，一键发到大屏播报。服务端只接受名单里的内容。 */
export function QuickPhrases({
  onSay,
  disabled,
}: {
  onSay: (text: string) => Promise<string | null>
  disabled?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [cooling, setCooling] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const fire = async (text: string) => {
    setCooling(true)
    setErr(null)
    const e = await onSay(text)
    if (e) setErr(e)
    window.setTimeout(() => setCooling(false), 2000)
  }

  const off = disabled || cooling

  return (
    <div className="panel phrases">
      <button type="button" className="phrases-toggle" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span>📣 喊一句话给大家</span>
        <span className="caret">{open ? '收起 ▲' : '展开 ▼'}</span>
      </button>

      {open && (
        <div className="phrases-body">
          <div className="phrases-group">
            <div className="phrases-label">喊话</div>
            <div className="phrases-grid">
              {QUICK_PHRASES.map((p) => (
                <button key={p} type="button" className="phrase" disabled={off} onClick={() => void fire(p)}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="phrases-group">
            <div className="phrases-label">反应</div>
            <div className="phrases-grid">
              {QUICK_REACTIONS.map((p) => (
                <button key={p} type="button" className="phrase react" disabled={off} onClick={() => void fire(p)}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          {err && <div className="banner err" style={{ marginTop: 12 }}>{err}</div>}
          <p className="notice" style={{ marginTop: 10 }}>
            会出现在大屏的播报里。2 秒内只能发一条。
          </p>
        </div>
      )}
    </div>
  )
}