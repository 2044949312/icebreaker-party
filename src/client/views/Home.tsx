import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { createRoom } from '../api'
import { GAME_BY_ID, GAMES } from '../../shared/games'
import { recommend } from '../../shared/recommend'
import type { Intimacy, Profile, Setting, Vibe } from '../../shared/types'
import { go, hostHref, saveToken } from '../route'

const VIBES: { v: Vibe; label: string; hint: string }[] = [
  { v: 'laugh', label: '爆笑', hint: '笑到缺氧，拍照留念' },
  { v: 'warm', label: '走心', hint: '聊出点平时不会说的话' },
  { v: 'brain', label: '烧脑', hint: '推理、还原、抓内鬼' },
  { v: 'rival', label: '竞技', hint: '要有输赢，要有惩罚' },
]

const SETTINGS: { s: Setting; label: string; hint: string; short: string }[] = [
  { s: 'seated', label: '围着桌子坐', hint: '饭店、会议桌、烧烤摊', short: '围桌坐' },
  { s: 'standing', label: '站着 / 有空间走动', hint: '客厅、露台、活动室', short: '有空间' },
  { s: 'lounging', label: '沙发上瘫着', hint: 'KTV、民宿、家里趴着', short: '瘫沙发' },
]

const INTIMACY: { i: Intimacy; label: string; hint: string }[] = [
  { i: 'strangers', label: '基本不认识', hint: '刚开始破冰，名字都还叫不全' },
  { i: 'colleagues', label: '同事，但不熟', hint: '工作关系为主，需要一点分寸感' },
  { i: 'friends', label: '都是老朋友', hint: '知根知底，玩笑可以开大一点' },
  { i: 'family', label: '亲戚 / 有大有小', hint: '年龄跨度大，最好人人能上手' },
]

const SHY = [
  { n: 0, label: '全是社牛', hint: '抢着表演，不怕被围观' },
  { n: 1, label: '有几个慢热', hint: '熟了之后放得开' },
  { n: 2, label: '一半以上不敢开口', hint: '最好不用主动表演' },
] as const

const COUNTS = [3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24]
const TOTAL_STEPS = 8

const DEFAULT_PROFILE: Profile = {
  count: 8,
  minutes: 12,
  setting: 'seated',
  vibes: ['laugh'],
  intimacy: 'friends',
  shyLevel: 1,
  propsOk: true,
  phonePerPerson: true,
  wantMove: false,
}

const SETTING_SHORT: Record<Setting, string> = {
  seated: '围桌坐',
  standing: '可走动',
  lounging: '瘫沙发',
}

export function Home() {
  const [stage, setStage] = useState<'intro' | 'survey' | 'result'>('intro')
  const [step, setStep] = useState(0)
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE)
  const [hostName, setHostName] = useState('')
  const [rank, setRank] = useState(0)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const { picked, dropped } = useMemo(() => recommend(profile), [profile])
  const shown = stage === 'result' ? picked.slice(0, 4) : []
  const safeRank = Math.min(rank, Math.max(0, shown.length - 1))
  const current = shown[safeRank] ?? null

  const canNext = step !== 3 || profile.vibes.length > 0

  const set = <K extends keyof Profile>(k: K, v: Profile[K]) =>
    setProfile((p) => ({ ...p, [k]: v }))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step, stage])

  const start = () => {
    setStep(0)
    setRank(0)
    setErr(null)
    setStage('survey')
  }

  /** 单选步骤点完稍等一下自动进入下一步，像系统设置里的选择列表 */
  const advanceSoon = () => {
    if (step >= TOTAL_STEPS - 1) return
    const from = step
    window.setTimeout(() => {
      setStep((s) => (s === from ? Math.min(TOTAL_STEPS - 1, from + 1) : s))
    }, 190)
  }

  const back = () => {
    if (step > 0) setStep((s) => s - 1)
    else setStage('intro')
  }

  const next = () => {
    if (!canNext) return
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1)
    else {
      setRank(0)
      setStage('result')
    }
  }

  const editConditions = () => {
    setStep(0)
    setStage('survey')
  }

  const accept = async (gameId: string) => {
    setBusy(true)
    setErr(null)
    try {
      const meta = GAME_BY_ID[gameId]
      const res = await createRoom({
        gameId,
        hostName: hostName.trim() || '房主',
        judgeMode: meta.judgeModes[0],
        profile,
      })
      saveToken(res.code, res.token)
      go(hostHref(res.code))
    } catch (e: any) {
      setErr(e?.message ?? '开房间失败了，重试一下')
      setBusy(false)
    }
  }

  if (stage === 'intro') {
    return (
      <div className="app">
        <div className="wrap">
          <div className="center-v home-hero">
            <p className="kicker">ICEBREAKER · 破冰局</p>
            <h1 className="big">
              把冷场
              <br />
              <span className="accent-text">变成一场游戏</span>
            </h1>
            <p className="lead">回答 8 个问题，替你挑出现在最合适的这一局。</p>
            <button className="btn primary big home-cta" onClick={start}>
              开始匹配 →
            </button>

            <div className="home-steps">
              {[
                ['1', '回答 8 个问题', '人数、场合、氛围，一项一项来'],
                ['2', '拿到推荐', '按匹配度排序，附上为什么'],
                ['3', '扫码开局', '大家用手机加入，不用下载'],
              ].map(([n, t, d]) => (
                <div className="home-step" key={n}>
                  <i className="n">{n}</i>
                  <div>
                    <b>{t}</b>
                    <span>{d}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="notice home-note">现场只要一台设备投屏，其他人扫码加入。</p>
          </div>
        </div>
      </div>
    )
  }

  if (stage === 'survey') {
    return (
      <div className="app">
        <div className="wrap wizard">
          <header className="wizard-top">
            <div className="wizard-head">
              <button type="button" className="wizard-back" onClick={back}>
                <ChevronLeft />
                {step === 0 ? '返回' : '上一步'}
              </button>
              <span className="wizard-count">
                第 {step + 1} / {TOTAL_STEPS} 步
              </span>
            </div>
            <div className="wizard-steps" aria-hidden="true">
              {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                <i key={i} className={i <= step ? 'on' : ''} />
              ))}
            </div>
          </header>

          <main className="wizard-main" key={step}>
            {step === 0 && (
              <Step no={0} title="现场几个人？" hint="算上你自己。人数会直接决定哪些游戏能开局。">
                <div className="num-grid" role="radiogroup" aria-label="现场人数">
                  {COUNTS.map((n) => (
                    <button
                      key={n}
                      type="button"
                      role="radio"
                      aria-checked={profile.count === n}
                      className={profile.count === n ? 'on' : ''}
                      onClick={() => {
                        set('count', n)
                        advanceSoon()
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <p className="field-note">不在列表里就选最接近的，推荐会按人数区间匹配。</p>
              </Step>
            )}

            {step === 1 && (
              <Step no={1} title="这一局玩多久？" hint="从坐下到收尾，留一点余量，中途还能换一局。">
                <div className="time-card">
                  <div className="time-big">
                    {profile.minutes}
                    <small>分钟</small>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={1}
                    value={profile.minutes}
                    aria-label="这一局玩多久"
                    style={
                      {
                        '--fill': `${((profile.minutes - 5) / 25) * 100}%`,
                      } as any
                    }
                    onChange={(e) => set('minutes', Number(e.target.value))}
                  />
                  <div className="range-labels">
                    <span>5 分钟急救</span>
                    <span>30 分钟沉浸</span>
                  </div>
                </div>
                <p className="field-note">时长只影响匹配度，不会硬性筛掉游戏。</p>
              </Step>
            )}

            {step === 2 && (
              <Step no={2} title="现在大家是什么姿势？" hint="场地决定了哪些游戏玩得开。">
                <div className="choice-list" role="radiogroup" aria-label="场地姿势">
                  {SETTINGS.map((x) => (
                    <Choice
                      key={x.s}
                      label={x.label}
                      hint={x.hint}
                      on={profile.setting === x.s}
                      onClick={() => {
                        set('setting', x.s)
                        advanceSoon()
                      }}
                    />
                  ))}
                </div>
              </Step>
            )}

            {step === 3 && (
              <Step no={3} title="想要什么氛围？" hint="可以多选。至少选一个，推荐才有方向。">
                <div className="choice-list" role="group" aria-label="想要的氛围">
                  {VIBES.map((x) => (
                    <Choice
                      key={x.v}
                      multi
                      label={x.label}
                      hint={x.hint}
                      on={profile.vibes.includes(x.v)}
                      onClick={() =>
                        set(
                          'vibes',
                          profile.vibes.includes(x.v)
                            ? profile.vibes.filter((v) => v !== x.v)
                            : [...profile.vibes, x.v],
                        )
                      }
                    />
                  ))}
                </div>
                <p className={`field-note ${profile.vibes.length ? '' : 'warn'}`}>
                  {profile.vibes.length
                    ? `已选 ${profile.vibes.length} 个，可以继续调整。`
                    : '至少选一个氛围，才能继续。'}
                </p>
              </Step>
            )}

            {step === 4 && (
              <Step no={4} title="彼此熟吗？" hint="熟悉程度会影响话题的打开方式。">
                <div className="choice-list" role="radiogroup" aria-label="彼此熟悉程度">
                  {INTIMACY.map((x) => (
                    <Choice
                      key={x.i}
                      label={x.label}
                      hint={x.hint}
                      on={profile.intimacy === x.i}
                      onClick={() => {
                        set('intimacy', x.i)
                        advanceSoon()
                      }}
                    />
                  ))}
                </div>
              </Step>
            )}

            {step === 5 && (
              <Step no={5} title="在场的人放得开吗？" hint="有慢热的人也没关系，我们会把门槛降下来。">
                <div className="choice-list" role="radiogroup" aria-label="在场的人放得开吗">
                  {SHY.map((x) => (
                    <Choice
                      key={x.n}
                      label={x.label}
                      hint={x.hint}
                      on={profile.shyLevel === x.n}
                      onClick={() => {
                        set('shyLevel', x.n)
                        advanceSoon()
                      }}
                    />
                  ))}
                </div>
              </Step>
            )}

            {step === 6 && (
              <Step no={6} title="设备情况" hint="只影响匹配，不会替你决定玩什么。">
                <div className="choice-list">
                  <SwitchRow
                    label="人手一台手机"
                    hint="游戏过程中每个人都要在手机上提交答案"
                    on={profile.phonePerPerson}
                    onClick={() => set('phonePerPerson', !profile.phonePerPerson)}
                  />
                  <SwitchRow
                    label="可以站起来闹"
                    hint="不排斥起身、比划、来回走动"
                    on={profile.wantMove}
                    onClick={() => set('wantMove', !profile.wantMove)}
                  />
                </div>
                <p className="field-note">关掉「人手一台手机」，需要人人用手机的游戏会被直接排除。</p>
              </Step>
            )}

            {step === 7 && (
              <Step no={7} title="最后，谁来当房主？" hint="这个名字会出现在投屏和结算里。">
                <input
                  className="field host-input"
                  placeholder="比如「小李」"
                  value={hostName}
                  maxLength={12}
                  aria-label="房主名字"
                  onChange={(e) => setHostName(e.target.value)}
                />
                <p className="field-note">不填就叫「房主」，之后也能改。</p>
                <div className="summary-chips">
                  <span className="chip">{profile.count} 人</span>
                  <span className="chip">{profile.minutes} 分钟</span>
                  <span className="chip">{SETTING_SHORT[profile.setting]}</span>
                  <span className="chip">
                    {profile.vibes
                      .map((v) => VIBES.find((x) => x.v === v)?.label)
                      .filter(Boolean)
                      .join(' · ')}
                  </span>
                </div>
              </Step>
            )}
          </main>

          <div className="wizard-nav">
            <button
              type="button"
              className="btn primary big"
              disabled={!canNext || busy}
              onClick={next}
            >
              {step === TOTAL_STEPS - 1 ? '给我推荐 →' : canNext ? '继续' : '先选一个氛围'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const vibesText = profile.vibes
    .map((v) => VIBES.find((x) => x.v === v)?.label)
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="app">
      <div className="wrap">
        <header className="result-head">
          <div>
            <p className="kicker">MATCH RESULT</p>
            <h1 className="result-title">最合适的一局</h1>
          </div>
          <button type="button" className="btn tiny" onClick={editConditions}>
            改条件
          </button>
        </header>

        <div className="row result-meta">
          <span className="chip">{profile.count} 人</span>
          <span className="chip">{profile.minutes} 分钟</span>
          <span className="chip">{SETTING_SHORT[profile.setting]}</span>
          <span className="chip">{vibesText}</span>
        </div>

        {!current ? (
          <div className="card accent center">
            <h2>这几个条件凑不出合适的局</h2>
            <p className="sub" style={{ marginBottom: 16 }}>
              8 款都试过了，剩下的是硬条件没过。回去放宽一条——通常把时长或者「人手一台手机」调一下就有解。
            </p>
            <button type="button" className="btn primary" onClick={editConditions}>
              回去改条件
            </button>
          </div>
        ) : (
          <>
            <div className="rec" style={{ ['--c' as any]: current.game.color }}>
              <div className="top">
                <div className="row between">
                  <div className="emoji">{current.game.emoji}</div>
                  <span className="chip hot">
                    {safeRank === 0 ? '最佳匹配' : `第 ${safeRank + 1} 推荐`}
                  </span>
                </div>
                <div className="name">{current.game.name}</div>
                <div className="latin">{current.game.latin}</div>
              </div>
              <div className="body">
                <div className="match">
                  <div className="ring" style={{ ['--p' as any]: current.rec.percent }}>
                    <i>{current.rec.percent}</i>
                  </div>
                  <div>
                    <div style={{ fontWeight: 800 }}>{current.game.tagline}</div>
                    <div className="dim">
                      {current.game.minPlayers}–{current.game.maxPlayers} 人 ·{' '}
                      {current.game.minutes[0]}–{current.game.minutes[1]} 分钟 ·{' '}
                      {current.game.needs.phones === 'each'
                        ? '人手一机'
                        : current.game.needs.phones === 'none'
                          ? '不用手机'
                          : '一台设备'}
                    </div>
                  </div>
                </div>

                <p className="sub" style={{ marginBottom: 14 }}>
                  {current.game.desc}
                </p>

                {err && <div className="banner err">{err}</div>}

                <div className="result-actions">
                  <button
                    type="button"
                    className="btn go big"
                    disabled={busy}
                    onClick={() => void accept(current.game.id)}
                  >
                    {busy ? (
                      <>
                        <span className="spin" /> 开房间中…
                      </>
                    ) : (
                      '就这个，开房间'
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn big"
                    disabled={busy || shown.length <= 1}
                    onClick={() => setRank((r) => (r + 1) % shown.length)}
                  >
                    {shown.length <= 1
                      ? '只有这一个候选'
                      : safeRank >= shown.length - 1
                        ? '回到第一个候选'
                        : '不满意，换一个'}
                  </button>
                </div>
                <p className="notice center" style={{ marginTop: 12 }}>
                  共 {shown.length} 个候选，按匹配度排序。换一个不会改变你填的条件。
                </p>

                <h3>为什么推它</h3>
                <ul className="reasons">
                  {current.rec.why.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                  {current.rec.watch.map((w, i) => (
                    <li className="warn" key={`w${i}`}>
                      注意：{w}
                    </li>
                  ))}
                </ul>

                <ol className="howto" style={{ marginBottom: 16 }}>
                  {current.game.howTo.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ol>

              </div>
            </div>

            <div className="panel" style={{ marginTop: 16 }}>
              <div className="h">其它候选，也可以直接开</div>
              <div className="alts">
                {pickedOther(picked, current.game.id).map((x) => (
                  <button
                    type="button"
                    className="alt"
                    key={x.game.id}
                    disabled={busy}
                    onClick={() => void accept(x.game.id)}
                  >
                    <span className="e">{x.game.emoji}</span>
                    <span>
                      <div className="n">{x.game.name}</div>
                      <div className="t">{x.game.tagline}</div>
                    </span>
                    <span className="m">{x.rec.percent}</span>
                  </button>
                ))}
              </div>
            </div>

            {dropped.length > 0 && (
              <div className="panel" style={{ marginTop: 16 }}>
                <div className="h">这次被硬条件刷掉的</div>
                <div className="alts">
                  {dropped.slice(0, 3).map((x) => (
                    <div className="alt" key={x.game.id} style={{ cursor: 'default' }}>
                      <span className="e">{x.game.emoji}</span>
                      <span>
                        <div className="n">{x.game.name}</div>
                        <div className="t">{x.rec.watch[0] ?? '条件不符'}</div>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function pickedOther(all: ReturnType<typeof recommend>['picked'], id: string) {
  return all.filter((x) => x.game.id !== id).slice(0, 4)
}

function Step(props: { no: number; title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="step" aria-labelledby={`step-title-${props.no}`}>
      <p className="step-index">STEP {String(props.no + 1).padStart(2, '0')}</p>
      <h1 className="step-title" id={`step-title-${props.no}`}>
        {props.title}
      </h1>
      {props.hint && <p className="step-lead">{props.hint}</p>}
      {props.children}
    </section>
  )
}

function Choice(props: {
  label: string
  hint?: string
  on: boolean
  multi?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      role={props.multi ? 'checkbox' : 'radio'}
      aria-checked={props.on}
      className={`choice-row ${props.on ? 'on' : ''}`}
      onClick={props.onClick}
    >
      <span className="choice-copy">
        <b>{props.label}</b>
        {props.hint && <span>{props.hint}</span>}
      </span>
      <span className="choice-tick" aria-hidden="true">
        {props.on && <Check />}
      </span>
    </button>
  )
}

function SwitchRow(props: {
  label: string
  hint: string
  on: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={props.on}
      className={`switch-row ${props.on ? 'on' : ''}`}
      onClick={props.onClick}
    >
      <span className="choice-copy">
        <b>{props.label}</b>
        <span>{props.hint}</span>
      </span>
      <span className="switch" aria-hidden="true" />
    </button>
  )
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.4 8.4l3.1 3.1 6.1-6.9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
