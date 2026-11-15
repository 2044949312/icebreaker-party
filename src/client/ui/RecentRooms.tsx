import { useState } from 'react'
import { GAME_BY_ID } from '../../shared/games'
import { forgetRoom, go, hostHref, joinHref, recentRooms, tokenFor } from '../route'

function when(at: number) {
  const diff = Date.now() - at
  if (diff < 60_000) return '刚刚'
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)} 分钟前`
  const d = new Date(at)
  const hm = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  const now = new Date()
  if (d.toDateString() === now.toDateString()) return hm
  if (d.toDateString() === new Date(now.getTime() - 86_400_000).toDateString()) return `昨天 ${hm}`
  return `${d.getMonth() + 1}/${d.getDate()} ${hm}`
}

/** 手输 6 位房间号很痛，进过的房间一键回去。没有 token 就退回加入页重填名字。 */
export function RecentRooms({ onPick }: { onPick?: (code: string) => void }) {
  const [list, setList] = useState(recentRooms)
  if (!list.length) return null

  const enter = (code: string, role: 'host' | 'player') => {
    if (!tokenFor(code)) {
      if (onPick) onPick(code)
      else go(joinHref(code))
      return
    }
    go(role === 'host' ? hostHref(code) : `/p.html?c=${code}`)
  }

  return (
    <div className="panel recent">
      <div className="h">最近进入过的房间</div>
      <div className="recent-list">
        {list.map((r) => {
          const meta = r.gameId ? GAME_BY_ID[r.gameId] : null
          return (
            <div className="recent-row" key={r.code}>
              <button type="button" className="recent-main" onClick={() => enter(r.code, r.role)}>
                <span className="recent-emoji">{meta?.emoji ?? '🎲'}</span>
                <span className="recent-copy">
                  <b className="mono">{r.code}</b>
                  <span>
                    {meta?.name ?? '未知游戏'} · {r.role === 'host' ? '我是房主' : '我是玩家'} · {when(r.at)}
                  </span>
                </span>
                <span className="recent-go">{tokenFor(r.code) ? '进入 →' : '重填名字 →'}</span>
              </button>
              <button
                type="button"
                className="recent-drop"
                title="从列表里移除"
                aria-label={`移除房间 ${r.code}`}
                onClick={() => {
                  forgetRoom(r.code)
                  setList(recentRooms())
                }}
              >
                ×
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}