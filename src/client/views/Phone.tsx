import { useState } from 'react'
import { useRoom } from '../hooks/useRoom'
import { useShareBase } from '../hooks/useShareBase'
import { uiFor } from '../games'
import { PlayerInput } from '../ui/PlayerInput'
import { RefereeConsole } from '../ui/RefereeConsole'
import { JudgeBadge, Seats, Ticker } from '../ui/common'
import { Result } from './Host'
import { go, joinHref, shareHostHref, tokenFor } from '../route'
import type { RoomView } from '../../shared/types'

export function Phone({ code, token }: { code: string; token: string | null }) {
  const { view, error, secondsLeft, now, run, offline } = useRoom(code, token)
  const [text, setText] = useState('')
  const [openExtra, setOpenExtra] = useState<string | null>(null)
  const base = useShareBase()

  if (!token) {
    return (
      <div className="app">
        <div className="wrap center-v center" style={{ minHeight: '80vh' }}>
          <h2>身份丢了</h2>
          <p className="sub">重新输一次名字就能回到这局。</p>
          <button className="btn primary big" onClick={() => go(joinHref(code))}>
            重新加入
          </button>
        </div>
      </div>
    )
  }

  if (error && !view) {
    return (
      <div className="app">
        <div className="wrap center-v center" style={{ minHeight: '80vh' }}>
          <h2>{error}</h2>
          <a className="btn" href={joinHref(code)}>
            回加入页
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
  const spec = ui.input?.(view) ?? null
  const isLobby = view.phase === 'lobby'
  const isOver = view.phase === 'over'
  const turnId = ui.turnId?.(view) ?? null
  const myTurn = !!view.me && turnId === view.me.id
  const extras = (ui.extras ?? []).filter((x) => view.me && x.when(view, view.me))

  return (
    <div className="app">
      <div className="wrap">
        <div className="phone-head">
          <div>
            <div style={{ fontWeight: 800 }}>
              {view.meta.emoji} {view.meta.name}
            </div>
            <div className="dim">
              房间 {view.code} · {view.me?.name ?? ''} {view.me ? `${view.me.seat} 号` : ''}
            </div>
          </div>
          <div className="row" style={{ gap: 6 }}>
            <JudgeBadge view={view} />
            {offline && <span className="chip" style={{ color: 'var(--bad)' }}>重连中</span>}
          </div>
        </div>

        {isLobby ? (
          <LobbyPhone view={view} />
        ) : (
          <>
            <SecretCard view={view} />

            {view.needs.prompt && (
              <div className={`banner ${myTurn ? '' : 'info'}`}>
                {myTurn && '👉 '}
                {view.needs.prompt}
              </div>
            )}

            {secondsLeft !== null && !isOver && (
              <div className="card tight" style={{ marginBottom: 14 }}>
                <TimerRow view={view} now={now} secondsLeft={secondsLeft} />
              </div>
            )}

            {view.needs.submitted && !spec && (
              <div className="done-state">
                <div className="k">✓</div>
                <b>已经交出去了</b>
                <p className="dim" style={{ margin: '6px 0 0' }}>
                  等其他人，或者抬头看大屏。
                </p>
              </div>
            )}

            {spec && !view.needs.submitted && view.needs.input !== 'none' && (
              <div className="card">
                {view.needs.inputHint && <p className="sub" style={{ marginTop: 0 }}>{view.needs.inputHint}</p>}
                <PlayerInput
                  needs={view.needs}
                  spec={spec}
                  onSubmit={(a, p) => run(a, p)}
                  disabled={false}
                />
              </div>
            )}

            {view.needs.input === 'pick' && view.needs.options?.length && spec && (
              <p className="notice center" style={{ marginTop: 10 }}>
                点一下就提交，改不了，想清楚再点。
              </p>
            )}

            {extras.length > 0 && (
              <div className="stack" style={{ marginTop: 14 }}>
                {extras.map((x) => (
                  <div key={x.action}>
                    {x.text && openExtra === x.action ? (
                      <div className="card tight">
                        <label className="blk">{x.text.label}</label>
                        <textarea
                          className="field"
                          value={text}
                          maxLength={x.text.max ?? 200}
                          placeholder={x.text.placeholder}
                          onChange={(e) => setText(e.target.value)}
                        />
                        <div className="row" style={{ marginTop: 10 }}>
                          <button
                            className="btn primary"
                            onClick={async () => {
                              await run(x.action, { [x.text!.field]: text.trim() })
                              setText('')
                              setOpenExtra(null)
                            }}
                          >
                            宣布
                          </button>
                          <button className="btn ghost tiny" onClick={() => setOpenExtra(null)}>
                            算了
                          </button>
                        </div>
                      </div>
                    ) : !x.text ? (
                      <button
                        className="btn big"
                        onClick={() => void run(x.action, x.payload ?? {})}
                      >
                        {x.label}
                      </button>
                    ) : (
                      <button className="btn big" onClick={() => setOpenExtra(x.action)}>
                        {x.label}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {view.role === 'referee' && (
              <div style={{ marginTop: 18 }}>
                <RefereeConsole view={view} run={(a, p) => run(a, p)} />
              </div>
            )}

            {isOver && view.finished && (
              <div style={{ marginTop: 18 }}>
                <Result view={view} />
              </div>
            )}

            <div className="panel" style={{ marginTop: 18 }}>
              <div className="h">最新播报</div>
              <Ticker events={view.events} limit={5} />
            </div>

            <div className="panel">
              <div className="h">在场</div>
              <Seats view={view} turnId={turnId} compact />
            </div>

            <p className="notice center" style={{ marginTop: 16 }}>
              投屏上的主持人页需要另一台设备打开：{shareHostHref(view.code, base)}
            </p>
          </>
        )}
      </div>
    </div>
  )
}

function TimerRow({ view, now, secondsLeft }: { view: RoomView; now: number; secondsLeft: number | null }) {
  return (
    <div className="row between">
      <span className="dim">本轮剩余</span>
      <span className={`mono ${secondsLeft !== null && secondsLeft <= 5 ? 'chip hot' : ''}`} style={{ fontWeight: 800 }}>
        {secondsLeft} 秒
      </span>
    </div>
  )
}

/** 把各游戏的私密字段翻译成人话。只有本人看得到。 */
function SecretCard({ view }: { view: RoomView }) {
  const s = view.secret as Record<string, any>
  if (!s || !view.me) return null
  const word = s.word ?? (view.gameId === 'twos' ? null : null)
  const isOver = view.phase === 'over'

  if (view.gameId === 'spy') {
    if (view.role === 'referee') {
      return (
        <div className="word-card">
          <div className="k">执法席</div>
          <div className="w">你是本局裁判</div>
          <div className="secret-hint">你不发词也不投票，只用在大屏上执行投票结果和临时判定。</div>
        </div>
      )
    }
    if (isOver) {
      return (
        <div className="word-card">
          <div className="k">复盘</div>
          <div className="w">{s.wasInsider ? '你是卧底' : '你是平民'}</div>
          <div className="secret-hint">
            大众词 {s.common} / 卧底词 {s.insider}
          </div>
        </div>
      )
    }
    if (!word) return null
    return (
      <div className="word-card">
        <div className="k">你的词 · 别给旁边的人看到</div>
        <div className="w">{word}</div>
        {!view.me.alive && <div className="secret-hint">你已经出局了，这个词留作纪念</div>}
      </div>
    )
  }

  if (view.gameId === 'mime' && word) {
    return (
      <div className="word-card">
        <div className="k">你是比划的人 · 只有你能看见</div>
        <div className="w">{word}</div>
        <div className="secret-hint">{(s.hint as string) ?? '不能说出这个词里的任何一个字'}</div>
      </div>
    )
  }

  if (view.gameId === 'twos' && s.card) {
    const c = s.card as { statements: string[]; lieIndex: number }
    return (
      <div className="card secret">
        <div className="h" style={{ fontSize: 12, letterSpacing: '0.16em', color: 'var(--cool)' }}>
          你自己写的三条
        </div>
        {c.statements.map((t, i) => (
          <p key={i} className="sub" style={{ margin: '4px 0' }}>
            {i === c.lieIndex ? '🤥 ' : '✓ '}
            {t}
          </p>
        ))}
      </div>
    )
  }

  if (view.gameId === 'never' && s.claim) {
    return (
      <div className="card secret">
        <div className="h" style={{ fontSize: 12, letterSpacing: '0.16em', color: 'var(--cool)' }}>
          你出的题
        </div>
        <p style={{ margin: 0, fontWeight: 700 }}>{s.claim}</p>
      </div>
    )
  }

  if (view.gameId === 'soup' && typeof s.asked === 'number') {
    return (
      <div className="row" style={{ gap: 8, marginBottom: 12 }}>
        <span className="chip cool">你已经提了 {s.asked} 个问题</span>
      </div>
    )
  }

  return null
}

function LobbyPhone({ view }: { view: RoomView }) {
  const host = view.players.find((p) => p.isHost)
  return (
    <>
      <div className="card accent">
        <h2>等房主点开始</h2>
        <p className="sub">
          你现在是 {view.me?.seat} 号 · {view.me?.name}。房主是 {host?.name}。
        </p>
      </div>
      <div className="panel">
        <div className="h">这局怎么开始</div>
        <p className="sub">{view.meta.desc}</p>
        <ol className="howto">
          {view.meta.howTo.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ol>
        <div className="row" style={{ marginTop: 12 }}>
          <span className="chip">{view.meta.needs.phones === 'each' ? '每一步都要在手机上交' : '主要看大屏'}</span>
          <span className="chip">
            {view.meta.minPlayers}–{view.meta.maxPlayers} 人
          </span>
        </div>
      </div>
      <div className="panel">
        <div className="h">已经进来的人</div>
        <Seats view={view} />
      </div>
      <p className="notice">
        这个页面会自动刷新，不用手动重进。房间号 {view.code}，关掉页面可以从{' '}
        <a href={joinHref(view.code)}>加入页</a> 再进来（名字会重新排一次号）。
      </p>
      {!tokenFor(view.code) && (
        <div className="banner err" style={{ marginTop: 12 }}>
          没存住你的身份，刷新可能要重新加入。
        </div>
      )}
    </>
  )
}
