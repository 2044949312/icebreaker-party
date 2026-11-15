import { useEffect, useMemo, useRef, useState } from 'react'
import { createRoom } from '../api'
import { GAMES } from '../../shared/games'
import type { GameMeta, JudgeMode, Profile, Vibe } from '../../shared/types'
import { go, hostHref, saveToken } from '../route'

/** 氛围标签取自 needs 的强项（>=2），和推荐引擎同一套口径 */
const VIBE_DEFS: { v: Vibe; attr: 'chaos' | 'warmth' | 'thinking' | 'rivalry'; label: string; emoji: string }[] = [
  { v: 'laugh', attr: 'chaos', label: '爆笑', emoji: '😂' },
  { v: 'warm', attr: 'warmth', label: '走心', emoji: '💞' },
  { v: 'brain', attr: 'thinking', label: '烧脑', emoji: '🧠' },
  { v: 'rival', attr: 'rivalry', label: '竞技', emoji: '⚔️' },
]

const strongVibes = (g: GameMeta) => VIBE_DEFS.filter((d) => g.needs[d.attr] >= 2)

const PHONE_LABEL: Record<GameMeta['needs']['phones'], string> = {
  each: '人手一机',
  some: '一台设备',
  none: '不用手机',
}

const COUNTS = [3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24]

type SortKey = 'default' | 'fast' | 'easy' | 'crowd'

const SORTS: { k: SortKey; label: string }[] = [
  { k: 'default', label: '默认排序' },
  { k: 'fast', label: '⚡ 最快开局' },
  { k: 'easy', label: '🌱 最省脑' },
  { k: 'crowd', label: '👥 人数上限' },
]

const sorters: Record<SortKey, (a: GameMeta, b: GameMeta) => number> = {
  default: () => 0,
  fast: (a, b) => a.minutes[0] - b.minutes[0] || a.minutes[1] - b.minutes[1],
  easy: (a, b) => a.needs.thinking - b.needs.thinking || a.minutes[0] - b.minutes[0],
  crowd: (a, b) => b.maxPlayers - a.maxPlayers,
}

function defaultCount(g: GameMeta) {
  return Math.round((g.bestPlayers[0] + g.bestPlayers[1]) / 2)
}

function profileFor(g: GameMeta, count: number): Profile {
  return {
    count,
    minutes: Math.round((g.minutes[0] + g.minutes[1]) / 2),
    setting: g.needs.move ? 'standing' : 'seated',
    vibes: strongVibes(g).map((d) => d.v),
    intimacy: 'friends',
    shyLevel: g.needs.shyFriendly >= 2 ? 1 : 0,
    propsOk: true,
    phonePerPerson: g.needs.phones === 'each',
    wantMove: g.needs.move,
  }
}

export function AllGames() {
  const [query, setQuery] = useState('')
  const [vibe, setVibe] = useState<Vibe | null>(null)
  const [count, setCount] = useState<number | null>(null)
  const [sort, setSort] = useState<SortKey>('default')
  const [openId, setOpenId] = useState<string | null>(null)

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = GAMES.filter((g) => {
      if (vibe && g.needs[VIBE_DEFS.find((d) => d.v === vibe)!.attr] < 2) return false
      if (count !== null && (count < g.minPlayers || count > g.maxPlayers)) return false
      if (!q) return true
      const hay = `${g.name} ${g.latin} ${g.tagline} ${g.desc} ${strongVibes(g)
        .map((d) => d.label)
        .join(' ')}`.toLowerCase()
      return hay.includes(q)
    })
    return sort === 'default' ? list : list.slice().sort(sorters[sort])
  }, [query, vibe, count, sort])

  const filtered = query.trim() !== '' || vibe !== null || count !== null || sort !== 'default'
  const openGame = openId ? GAMES.find((g) => g.id === openId) ?? null : null

  const reset = () => {
    setQuery('')
    setVibe(null)
    setCount(null)
    setSort('default')
  }

  return (
    <div className="app">
      <div className="wrap wide games-wrap">
        <header className="games-head">
          <button type="button" className="wizard-back" onClick={() => go('/')}>
            <ChevronLeft />
            返回首页
          </button>
          <div className="games-title-row">
            <div>
              <p className="kicker">GAME LIBRARY · 游戏库</p>
              <h1 className="big games-title">
                所有游戏<span className="games-total">{GAMES.length} 款</span>
              </h1>
            </div>
            <button type="button" className="btn tiny games-match-btn" onClick={() => go('/')}>
              🎯 不知道玩什么？让系统帮你挑
            </button>
          </div>
          <p className="lead games-lead">
            不想答问卷就直接挑。点开任意一张卡片看玩法，选好了当场开房间，大家扫码加入。
          </p>
        </header>

        <div className="games-toolbar">
          <div className="games-toolbar-row">
            <div className="games-search">
              <span className="games-search-icon" aria-hidden="true">🔍</span>
              <input
                className="field"
                type="search"
                placeholder="搜游戏名、玩法、关键词…"
                value={query}
                aria-label="搜索游戏"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="games-selects">
              <label className="games-select">
                <span>人数</span>
                <select
                  value={count ?? ''}
                  aria-label="按人数筛选"
                  onChange={(e) => setCount(e.target.value === '' ? null : Number(e.target.value))}
                >
                  <option value="">不限</option>
                  {COUNTS.map((n) => (
                    <option key={n} value={n}>{n} 人</option>
                  ))}
                </select>
              </label>
              <label className="games-select">
                <span>排序</span>
                <select
                  value={sort}
                  aria-label="排序方式"
                  onChange={(e) => setSort(e.target.value as SortKey)}
                >
                  {SORTS.map((s) => (
                    <option key={s.k} value={s.k}>{s.label}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="games-vibes" role="group" aria-label="按氛围筛选">
            <button
              type="button"
              className={`vibe-pill all ${vibe === null ? 'on' : ''}`}
              aria-pressed={vibe === null}
              onClick={() => setVibe(null)}
            >
              全部
            </button>
            {VIBE_DEFS.map((d) => (
              <button
                key={d.v}
                type="button"
                className={`vibe-pill ${d.v} ${vibe === d.v ? 'on' : ''}`}
                aria-pressed={vibe === d.v}
                onClick={() => setVibe((v) => (v === d.v ? null : d.v))}
              >
                <i aria-hidden="true">{d.emoji}</i>
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="games-count-row">
          <span className="dim">
            {filtered ? `筛出 ${shown.length} / ${GAMES.length} 款` : `共 ${GAMES.length} 款，全部可直接开局`}
            {count !== null && shown.length > 0 && ` · 按 ${count} 人过滤`}
          </span>
          {filtered && (
            <button type="button" className="btn link" onClick={reset}>
              清空筛选
            </button>
          )}
        </div>

        {shown.length === 0 ? (
          <div className="card accent center games-empty">
            <div className="games-empty-emoji" aria-hidden="true">🫥</div>
            <h2>这个条件下没有能开的游戏</h2>
            <p className="sub" style={{ marginBottom: 16 }}>
              换个氛围、放宽人数，或者清掉关键词再试试。
            </p>
            <button type="button" className="btn primary" onClick={reset}>
              清空筛选，看全部
            </button>
          </div>
        ) : (
          <div className="games-grid">
            {shown.map((g, i) => (
              <GameCard
                key={g.id}
                game={g}
                index={i}
                count={count}
                onOpen={() => setOpenId(g.id)}
              />
            ))}
          </div>
        )}

        <p className="notice center games-foot">
          现场只要一台设备投屏，其他人扫码加入 · 想按场合精准匹配，回首页答 8 个问题。
        </p>
      </div>

      {openGame && (
        <GameDetail
          game={openGame}
          initialCount={count ?? defaultCount(openGame)}
          onClose={() => setOpenId(null)}
        />
      )}
    </div>
  )
}

function GameCard(props: { game: GameMeta; index: number; count: number | null; onOpen: () => void }) {
  const { game: g, count } = props
  const best = count !== null && count >= g.bestPlayers[0] && count <= g.bestPlayers[1]
  return (
    <button
      type="button"
      className="game-card"
      style={{ ['--c' as any]: g.color, ['--i' as any]: props.index }}
      onClick={props.onOpen}
      aria-label={`查看 ${g.name} 的玩法并开房间`}
    >
      <div className="game-card-top">
        <span className="game-emoji" aria-hidden="true">{g.emoji}</span>
        <span className="game-judge chip dim">
          {g.judgeModes.length > 1 ? '🤖 / 🧑 裁判' : '🤖 AI 裁判'}
        </span>
      </div>
      <div className="game-name">{g.name}</div>
      <div className="game-latin">{g.latin}</div>
      <div className="game-tagline">{g.tagline}</div>
      <div className="game-meta">
        <span className="chip">👥 {g.minPlayers}–{g.maxPlayers} 人</span>
        <span className="chip">⏱ {g.minutes[0]}–{g.minutes[1]} 分钟</span>
        <span className="chip">📱 {PHONE_LABEL[g.needs.phones]}</span>
      </div>
      <div className="game-vibes">
        {strongVibes(g).map((d) => (
          <span key={d.v} className={`game-vibe ${d.v}`}>{d.label}</span>
        ))}
        {g.needs.move && <span className="game-vibe move">要起身</span>}
        {best && <span className="game-vibe best">✨ {count} 人最佳</span>}
      </div>
      <span className="game-cta">
        看玩法 · 选这个
        <ArrowRight />
      </span>
    </button>
  )
}

function GameDetail(props: { game: GameMeta; initialCount: number; onClose: () => void }) {
  const { game: g } = props
  const [hostName, setHostName] = useState('')
  const [judgeMode, setJudgeMode] = useState<JudgeMode>(g.judgeModes[0])
  const [count, setCount] = useState(props.initialCount)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    lastFocus.current = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') props.onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      lastFocus.current?.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const countOptions = useMemo(() => {
    const out: number[] = []
    for (let n = g.minPlayers; n <= g.maxPlayers; n++) out.push(n)
    return out
  }, [g])

  const start = async () => {
    setBusy(true)
    setErr(null)
    try {
      const res = await createRoom({
        gameId: g.id,
        hostName: hostName.trim() || '房主',
        judgeMode,
        profile: profileFor(g, count),
      })
      saveToken(res.code, res.token, { gameId: g.id, role: 'host' })
      go(hostHref(res.code))
    } catch (e: any) {
      setErr(e?.message ?? '开房间失败了，重试一下')
      setBusy(false)
    }
  }

  return (
    <div className="modal-scrim" onClick={props.onClose}>
      <div
        className="modal game-detail"
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-detail-title"
        style={{ ['--c' as any]: g.color }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="game-detail-top">
          <button
            type="button"
            className="game-detail-close"
            ref={closeRef}
            aria-label="关闭详情"
            onClick={props.onClose}
          >
            ✕
          </button>
          <div className="game-detail-emoji" aria-hidden="true">{g.emoji}</div>
          <h2 className="game-detail-name" id="game-detail-title">{g.name}</h2>
          <div className="game-latin">{g.latin}</div>
          <div className="game-detail-tagline">{g.tagline}</div>
          <div className="game-meta">
            <span className="chip">👥 {g.minPlayers}–{g.maxPlayers} 人</span>
            <span className="chip">⏱ {g.minutes[0]}–{g.minutes[1]} 分钟</span>
            <span className="chip">📱 {PHONE_LABEL[g.needs.phones]}</span>
            {g.needs.move && <span className="chip"> 要起身活动</span>}
          </div>
        </div>

        <div className="game-detail-body">
          <p className="sub game-detail-desc">{g.desc}</p>

          <h3>怎么玩</h3>
          <ol className="howto">
            {g.howTo.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ol>

          <div className="game-judge-note">
            <b>裁判</b>
            <span>{g.judgeNote}</span>
          </div>

          <div className="game-setup">
            <div className="h">开局设置</div>
            <div className="game-setup-grid">
              <label className="blk">
                房主名字（出现在投屏上）
                <input
                  className="field"
                  placeholder="比如「小李」"
                  value={hostName}
                  maxLength={12}
                  onChange={(e) => setHostName(e.target.value)}
                />
              </label>
              <label className="blk">
                这局几个人
                <select
                  className="field"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                >
                  {countOptions.map((n) => (
                    <option key={n} value={n}>
                      {n} 人{n >= g.bestPlayers[0] && n <= g.bestPlayers[1] ? '（最佳）' : ''}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {g.judgeModes.length > 1 ? (
              <div className="seg game-judge-seg" role="group" aria-label="裁判模式">
                <button
                  type="button"
                  className={judgeMode === 'ai' ? 'on' : ''}
                  aria-pressed={judgeMode === 'ai'}
                  onClick={() => setJudgeMode('ai')}
                >
                  🤖 AI 裁判
                </button>
                <button
                  type="button"
                  className={judgeMode === 'human' ? 'on' : ''}
                  aria-pressed={judgeMode === 'human'}
                  onClick={() => setJudgeMode('human')}
                >
                  🧑 真人裁判
                </button>
              </div>
            ) : (
              <p className="field-note">这一局由 AI 裁判全程主持。</p>
            )}
          </div>

          {err && <div className="banner err">{err}</div>}
        </div>

        <div className="game-detail-foot">
          <button type="button" className="btn go big" disabled={busy} onClick={() => void start()}>
            {busy ? (
              <>
                <span className="spin" /> 开房间中…
              </>
            ) : (
              `开房间，玩「${g.name}」`
            )}
          </button>
          <p className="notice center">开好后把二维码给大家扫，手机加入，不用下载。</p>
        </div>
      </div>
    </div>
  )
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <path
        d="M10 3.5L5.5 8l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true">
      <path
        d="M3 8h9.5M9 4.5L12.5 8 9 11.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
