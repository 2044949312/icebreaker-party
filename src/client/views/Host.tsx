import { useState } from 'react'
import { configure } from '../api'
import { useRoom } from '../hooks/useRoom'
import { useShareBase } from '../hooks/useShareBase'
import { uiFor } from '../games'
import { JudgeBadge, QrImage, Seats, Scoreboard, Ticker, Timer } from '../ui/common'
import { StageView } from '../ui/StageView'
import { RefereeConsole } from '../ui/RefereeConsole'
import { joinHref, shareJoinHref } from '../route'
import type { RoomView } from '../../shared/types'

export function Host({ code, token, watch }: { code: string; token: string | null; watch?: boolean }) {
  const { view, error, secondsLeft, now, run, step, offline } = useRoom(code, token, watch)

  if (error && !view) {
    return (
      <div className="app">
        <div className="wrap center center-v" style={{ minHeight: '80vh' }}>
          <h2>连不上这个房间</h2>
          <p className="sub">{error}</p>
          <a className="btn" href="/">
            回首页开一局新的
          </a>
        </div>
      </div>
    )
  }
  if (!view) {
    return (
      <div className="app">
        <div className="wrap center-v center" style={{ minHeight: '80vh' }}>
          <span className="spin" />
        </div>
      </div>
    )
  }

  const ui = uiFor(view)
  const model = ui.stage(view)
  const isLobby = view.phase === 'lobby'
  const isOver = view.phase === 'over'

  return (
    <div className="app">
      <div className="stage">
        <div className="stage-head">
          <div style={{ fontSize: 26 }}>{view.meta.emoji}</div>
          <div>
            <div className="g">{view.meta.name}</div>
            <div className="dim">{view.meta.latin}</div>
          </div>
          <div style={{ marginLeft: 'auto' }} className="row">
            <span className="chip hot">{isLobby ? '房间号' : ui.phaseName(view)}</span>
            {!isLobby && <JudgeBadge view={view} />}
            <span className="chip">{view.players.length} 人</span>
            {offline && <span className="chip" style={{ color: 'var(--bad)' }}>重连中…</span>}
          </div>
        </div>

        {isLobby ? (
          <Lobby view={view} token={token} step={step} run={run} now={now} />
        ) : (
          <div className="stage-body">
            <div className="stage-main">
              <StageView model={model} />
              {(view.phase === 'describe' || view.phase === 'run' || view.phase === 'hunt') && (
                <div style={{ marginTop: 22, maxWidth: 420 }}>
                  <Timer view={view} now={now} secondsLeft={secondsLeft} />
                </div>
              )}

              {!watch && (
                <div className="stagebar">
                  <button className="btn go" onClick={() => void step()}>
                    {isOver ? '停在这一页' : '下一步 →'}
                  </button>
                  <a className="btn ghost tiny" href={joinHref(view.code)}>
                    手机加入页
                  </a>
                  {!isOver && (
                    <button
                      className="btn ghost tiny"
                      onClick={() => {
                        if (confirm('直接结算这一局？正在填写的内容会丢掉。')) void step()
                      }}
                      style={{ marginLeft: 'auto' }}
                    >
                      提前结束
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="stage-side">
              {!watch && <RefereeConsole view={view} run={run} />}
              <div className="panel">
                <div className="h">裁判播报</div>
                <Ticker events={view.events} limit={9} />
              </div>
              <div className="panel">
                <div className="h">在场玩家</div>
                <Seats view={view} turnId={ui.turnId?.(view) ?? null} compact />
              </div>
              {view.judgeMode === 'ai' && (
                <div className="panel">
                  <div className="h">分数</div>
                  <Scoreboard players={view.players} />
                </div>
              )}
              {isOver && view.finished && <Result view={view} />}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Lobby({
  view,
  token,
  step,
  now,
}: {
  view: RoomView
  token: string | null
  step: () => Promise<string | null>
  run: (a: string, p?: unknown) => Promise<string | null>
  now: number
}) {
  const [err, setErr] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const base = useShareBase()
  const href = shareJoinHref(view.code, base)
  const canStart = view.players.length >= view.meta.minPlayers
  const needReferee = view.judgeMode === 'human' && !view.refereeId
  const aiOnly = view.meta.judgeModes.length === 1 && view.meta.judgeModes[0] === 'ai'

  const setMode = async (m: 'ai' | 'human') => {
    if (!token) return
    setBusy(true)
    const r = await configure(view.code, token, { judgeMode: m })
    setErr(r.error ?? null)
    setBusy(false)
  }

  const setReferee = async (id: string | null) => {
    if (!token) return
    setBusy(true)
    const r = await configure(view.code, token, { refereeId: id })
    setErr(r.error ?? null)
    setBusy(false)
  }

  return (
    <div className="stage-body">
      <div className="stage-main">
        <div className="card accent" style={{ display: 'flex', gap: 22, alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="qr">
            <QrImage text={href} />
          </div>
          <div style={{ minWidth: 220 }}>
            <div className="dim" style={{ letterSpacing: '0.2em' }}>
              房间号
            </div>
            <div className="mega" style={{ color: 'var(--accent-2)' }}>
              {view.code}
            </div>
            <p className="sub" style={{ marginTop: 4 }}>
              大家在手机浏览器打开
            </p>
            <a href={href} style={{ wordBreak: 'break-all', fontWeight: 700 }}>
              {href}
            </a>
            <p className="notice" style={{ marginTop: 10 }}>
              扫上面的码，或者手动输入网址，然后填房间号。
              {base && new URL(base).host !== location.host && '手机要和这台电脑连同一个 WiFi 才打得开这个地址。'}
            </p>
          </div>
        </div>

        <div className="panel">
          <div className="h">这局怎么玩</div>
          <p className="sub" style={{ marginBottom: 12 }}>
            {view.meta.desc}
          </p>
          <ol className="howto">
            {view.meta.howTo.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ol>
          <div className="row" style={{ marginTop: 14 }}>
            <span className="chip">
              {view.meta.minPlayers}–{view.meta.maxPlayers} 人
            </span>
            <span className="chip">
              {view.meta.minutes[0]}–{view.meta.minutes[1]} 分钟
            </span>
            <span className="chip">
              {view.meta.needs.phones === 'each'
                ? '需要人手一台手机'
                : view.meta.needs.phones === 'none'
                  ? '完全不用手机'
                  : '一台设备就够'}
            </span>
          </div>
        </div>

        <div className="panel">
          <div className="h">裁判由谁当</div>
          <div className="seg" style={{ marginBottom: 14 }}>
            <button
              className={view.judgeMode === 'ai' ? 'on' : ''}
              disabled={busy || aiOnly}
              onClick={() => void setMode('ai')}
            >
              🤖 AI 裁判
            </button>
            <button
              className={view.judgeMode === 'human' ? 'on' : ''}
              disabled={busy || aiOnly}
              onClick={() => void setMode('human')}
            >
              🧑‍⚖️ 真人裁判
            </button>
          </div>
          <p className="notice" style={{ marginBottom: 12 }}>
            {view.meta.judgeNote}
          </p>
          {view.judgeMode === 'human' && (
            <>
              <label className="blk">从下面这些人里选一个当裁判</label>
              <div className="seats">
                {view.players.map((p) => (
                  <button
                    key={p.id}
                    className={`opt ${view.refereeId === p.id ? 'on' : ''}`}
                    style={{ width: 'auto' }}
                    disabled={busy}
                    onClick={() => void setReferee(p.id)}
                  >
                    <b>{p.name}</b>
                    <span>{p.isHost ? '房主' : `${p.seat} 号`}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {err && <div className="banner err">{err}</div>}
        {needReferee && <div className="banner info">真人裁判模式还差一步：上面选一个裁判。</div>}

        <div className="stagebar">
          <button
            className="btn primary big"
            style={{ maxWidth: 380 }}
            disabled={!canStart || needReferee || busy}
            onClick={async () => {
              setBusy(true)
              const e = await step()
              setErr(e)
              setBusy(false)
            }}
          >
            {canStart ? `开始这局（${view.players.length} 人）` : `还差 ${view.meta.minPlayers - view.players.length} 个人`}
          </button>
          <span className="dim">
            最少 {view.meta.minPlayers} 人。现在 {view.players.length} 人 · {Math.round((now / 1000) % 60)}
          </span>
        </div>
      </div>

      <div className="stage-side">
        <div className="panel">
          <div className="h">已经进来的人</div>
          <Seats view={view} />
          {view.players.length < view.meta.minPlayers && (
            <p className="notice" style={{ marginTop: 12 }}>
              把上面那个链接发到聚会群里，人齐了就自动能开始。
            </p>
          )}
        </div>
        <div className="panel">
          <div className="h">进场记录</div>
          <Ticker events={view.events} limit={6} />
        </div>
      </div>
    </div>
  )
}

function Result({ view }: { view: RoomView }) {
  const f = view.finished
  if (!f) return null
  return (
    <div className="panel" style={{ borderColor: 'rgba(10,159,131,.38)' }}>
      <div className="h">结算</div>
      <h2 style={{ marginBottom: 8 }}>{f.title}</h2>
      {f.lines.map((l, i) => (
        <p className="sub" key={i} style={{ margin: '4px 0' }}>
          {l}
        </p>
      ))}
      <div className="divider" />
      <div className="stack" style={{ gap: 8 }}>
        {f.winners.map((w, i) => (
          <div className="rank" key={i}>
            <span className="no">{i + 1}</span>
            <b>{w.name}</b>
            <span className="sc">{w.score}</span>
          </div>
        ))}
      </div>
      <p className="notice" style={{ marginTop: 12 }}>
        {f.verdict}
      </p>
    </div>
  )
}

export { Result }
