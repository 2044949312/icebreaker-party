import { useState } from 'react'
import type { RoomView } from '../../shared/types'

const ANSWERS: { v: string; label: string }[] = [
  { v: 'yes', label: '是' },
  { v: 'no', label: '不是' },
  { v: 'partial', label: '部分是' },
  { v: 'none', label: '不重要' },
]

/**
 * 裁判 / 房主操作台。AI 裁判模式下它出现在大屏右侧（房主是执行人），
 * 真人裁判模式下它出现在裁判自己的手机上。
 */
export function RefereeConsole({
  view,
  run,
}: {
  view: RoomView
  run: (action: string, payload?: unknown) => Promise<string | null>
}) {
  const [err, setErr] = useState<string | null>(null)
  const [picked, setPicked] = useState<string | null>(null)

  const fire = async (action: string, payload?: unknown) => {
    const e = await run(action, payload ?? {})
    setErr(e)
  }

  const info = (view.referee ?? {}) as Record<string, any>
  const pub = (view.publicData?.[view.gameId] ?? {}) as Record<string, any>
  const canJudge = view.role === 'host' || view.role === 'referee'
  if (!canJudge) return null

  /* ------------------------- 海龟汤 ------------------------- */
  if (view.gameId === 'soup') {
    const queue: any[] = pub.queue ?? []
    const pending = queue.filter((q) => q.answer === 'pending')
    const declared = pub.declaredBy && !pub.solved
    return (
      <div className="panel" style={{ borderColor: 'rgba(207,63,63,.3)' }}>
        <div className="h">裁判台 · 海龟汤</div>
        <p className="notice" style={{ marginBottom: 12 }}>
          汤底只在这个面板上，别把大屏投出去。
        </p>
        {info.truth && (
          <div className="card judge" style={{ marginBottom: 12 }}>
            <b>汤底</b>
            <p className="sub" style={{ margin: '6px 0 0' }}>
              {info.truth}
            </p>
          </div>
        )}

        {pending.length > 0 && (
          <>
            <label className="blk">
              待回答 {pending.length} 个：{pending[0].text}
            </label>
            <div className="grid c2" style={{ gap: 8, marginBottom: 14 }}>
              {ANSWERS.map((a) => (
                <button key={a.v} className="btn" onClick={() => void fire('answer', { id: pending[0].id, answer: a.v })}>
                  {a.label}
                </button>
              ))}
            </div>
          </>
        )}

        {declared && (
          <>
            <label className="blk">有人宣布还原：</label>
            <p className="sub" style={{ marginBottom: 8 }}>
              {pub.declaredAnswer || '（口头说的，没打字）'}
            </p>
            <div className="grid c2" style={{ gap: 8 }}>
              <button className="btn go" onClick={() => void fire('verdict', { ok: true })}>
                说对了
              </button>
              <button className="btn" onClick={() => void fire('verdict', { ok: false })}>
                还差一点
              </button>
            </div>
          </>
        )}

        <div className="divider" />
        <div className="row">
          <button className="btn tiny" onClick={() => void fire('hint')}>
            给一条提示（已用 {pub.hintsUsed ?? 0}）
          </button>
        </div>
        {err && <div className="banner err" style={{ marginTop: 10 }}>{err}</div>}
      </div>
    )
  }

  /* ------------------------- 你比我猜 ------------------------- */
  if (view.gameId === 'mime') {
    if (view.phase !== 'run') return null
    return (
      <div className="panel" style={{ borderColor: 'rgba(207,63,63,.3)' }}>
        <div className="h">裁判台 · 你比我猜</div>
        {info.word && (
          <div className="bigword" style={{ marginBottom: 12, fontSize: 30 }}>
            {info.word}
          </div>
        )}
        <p className="notice" style={{ marginBottom: 12 }}>
          这个词只有你和比划的人看得到。猜对了就点下面。
        </p>
        <div className="grid c2" style={{ gap: 8 }}>
          <button className="btn go" onClick={() => void fire('wordCorrect')}>
            猜对了
          </button>
          <button className="btn" onClick={() => void fire('wordSkip')}>
            这词作废
          </button>
        </div>
        <p className="dim" style={{ marginTop: 10 }}>
          已猜中 {pub.correct ?? 0} · 换词 {pub.skips ?? 0} · 连击 {pub.streak ?? 0}
        </p>
        {err && <div className="banner err" style={{ marginTop: 10 }}>{err}</div>}
      </div>
    )
  }

  /* --------------------- 谁是卧底 / 逢七过：手动判人 --------------------- */
  if (view.gameId === 'spy' || view.gameId === 'seven') {
    if (view.judgeMode !== 'human') return null
    const act = view.gameId === 'spy' ? 'refereeOut' : 'refereeMiss'
    const eligible =
      view.gameId === 'spy' ? view.phase === 'vote' : view.phase === 'run'
    if (!eligible) return null
    return (
      <div className="panel" style={{ borderColor: 'rgba(207,63,63,.3)' }}>
        <div className="h">裁判台 · 现场判定</div>
        <p className="notice" style={{ marginBottom: 10 }}>
          {view.gameId === 'spy'
            ? '有人自己承认了、或者明显违规暴露，可以直接抬走。'
            : '谁嘴瓢了、该过没过，点他记一次失误。'}
        </p>
        <div className="seats">
          {view.players
            .filter((p) => p.alive && p.id !== view.refereeId)
            .map((p) => (
              <button
                key={p.id}
                className={`opt ${picked === p.id ? 'on' : ''}`}
                style={{ width: 'auto' }}
                onClick={() => {
                  setPicked(p.id)
                  void fire(act, { target: p.id })
                }}
              >
                <b>{p.name}</b>
                <span>
                  {view.gameId === 'seven'
                    ? `失误 ${pub.mistakes?.[p.id] ?? 0} 次`
                    : `${p.score} 分`}
                </span>
              </button>
            ))}
        </div>
        {err && <div className="banner err" style={{ marginTop: 10 }}>{err}</div>}
      </div>
    )
  }

  /* ------------------------- 其它游戏：只读小抄 ------------------------- */
  const LABELS: Record<string, string> = {
    round: '当前轮次',
    maxRound: '总轮次',
    constraint: '隐形规则',
    machineChecked: '规则机检',
    author: '本轮作者',
    lieIndex: '假话是第几条',
    lieText: '假话原文',
    waiting: '还差几人',
    cursor: '轮到第几位',
    count: '当前数字',
    speedMs: '反应时限',
    target: '炸弹区间',
    hesitations: '犹豫次数',
    lead: '台上的人',
    index: '第几个词',
  }
  const keys = Object.entries(info).filter(
    ([k, v]) => k !== 'note' && typeof v !== 'object' && v !== undefined && v !== null && String(v).length < 200,
  )
  if (!keys.length) return null
  return (
    <div className="panel">
      <div className="h">裁判小抄</div>
      {keys.map(([k, v]) => (
        <div className="score-line" key={k}>
          <span className="dim">{LABELS[k] ?? k}</span>
          <b>{String(v)}</b>
        </div>
      ))}
      {info.note && <p className="notice" style={{ marginTop: 10 }}>{info.note}</p>}
    </div>
  )
}
