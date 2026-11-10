import { useEffect, useRef } from 'react'
import type { Player, RoomEvent, RoomView } from '../../shared/types'

export function Timer({ view, now, secondsLeft }: { view: RoomView; now: number; secondsLeft: number | null }) {
  const maxRef = useRef<Record<string, number>>({})
  const key = `${view.phase}-${view.round}-${view.turn}-${view.deadlineAt ?? 0}`
  useEffect(() => {
    if (view.deadlineAt == null) return
    const left = Math.max(0, view.deadlineAt - Date.now())
    if (!maxRef.current[key] || left > maxRef.current[key]) maxRef.current[key] = left
  }, [key, view.deadlineAt, now])

  if (secondsLeft === null) return null
  const maxMs = maxRef.current[key] ?? 60_000
  const leftMs = Math.max(0, view.deadlineAt! - now)
  const urgent = secondsLeft <= 5

  return (
    <div className={`timer ${urgent ? 'urgent' : ''}`}>
      <div className="n mono">{secondsLeft}</div>
      <div className="dim" style={{ marginBottom: 6 }}>
        秒
      </div>
      <div style={{ flex: 1, minWidth: 90 }}>
        <div className={`bar ${urgent ? 'urgent' : ''}`}>
          <i style={{ width: `${Math.min(100, (leftMs / Math.max(1, maxMs)) * 100)}%` }} />
        </div>
      </div>
    </div>
  )
}

export function Seats({
  view,
  turnId,
  compact,
}: {
  view: RoomView
  turnId?: string | null
  compact?: boolean
}) {
  const referee = view.refereeId
  return (
    <div className="seats" style={compact ? { gridTemplateColumns: 'repeat(auto-fill,minmax(112px,1fr))' } : undefined}>
      {view.players.map((p) => {
        const isTurn = turnId && p.id === turnId
        return (
          <div
            key={p.id}
            className={`seat ${p.alive ? '' : 'out'} ${view.me?.id === p.id ? 'me' : ''} ${isTurn ? 'turn' : ''}`}
          >
            <span className="av">{p.name.slice(0, 1)}</span>
            <span style={{ minWidth: 0 }}>
              <div className="nm">{p.name}</div>
              {!compact && (
                <div className="tag">
                  {p.isHost ? '房主' : `${p.seat} 号`}
                  {referee === p.id ? ' · 裁判' : ''}
                  {p.alive ? '' : ` · ${p.outReason ?? '出局'}`}
                  {view.judgeMode === 'ai' && p.score > 0 ? ` · ${p.score} 分` : ''}
                </div>
              )}
            </span>
            <span className={`dot ${p.connected ? '' : 'off'}`} style={{ marginLeft: 'auto' }} />
          </div>
        )
      })}
    </div>
  )
}

export function Ticker({ events, limit = 10 }: { events: RoomEvent[]; limit?: number }) {
  const list = events.slice(-limit).reverse()
  if (!list.length) return <p className="dim">还没有播报。</p>
  return (
    <div className="ticker">
      {list.map((e) => (
        <p key={e.seq} className={e.kind}>
          {e.text}
        </p>
      ))}
    </div>
  )
}

export function Scoreboard({ players, judge }: { players: Player[]; judge?: boolean }) {
  const sorted = players.slice().sort((a, b) => b.score - a.score || a.seat - b.seat)
  const top = sorted[0]?.score ?? 0
  return (
    <div className="stack" style={{ gap: 7 }}>
      {sorted.map((p, i) => (
        <div className="score-line" key={p.id}>
          <span>
            <b style={{ color: i === 0 && top > 0 ? 'var(--accent-2)' : undefined }}>{p.name}</b>
            {!p.alive && <span className="dim"> · 已出局</span>}
            {judge && p.isHost && <span className="dim"> · 房主</span>}
          </span>
          <b className="mono">{p.score}</b>
        </div>
      ))}
    </div>
  )
}

export function JudgeBadge({ view }: { view: RoomView }) {
  if (view.judgeMode === 'ai') {
    return (
      <span className="chip hot" title="本地规则引擎当裁判">
        🤖 AI 裁判
      </span>
    )
  }
  const ref = view.players.find((p) => p.id === view.refereeId)
  return <span className="chip cool">🧑‍⚖️ 真人裁判 · {ref?.name ?? '未指定'}</span>
}
