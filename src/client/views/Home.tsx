import { useMemo, useState } from 'react'
import { createRoom } from '../api'
import { GAMES, GAME_BY_ID } from '../../shared/games'
import { recommend } from '../../shared/recommend'
import type { Intimacy, Profile, Setting, Vibe } from '../../shared/types'
import { go, hostHref, saveToken } from '../route'

const VIBES: { v: Vibe; label: string; hint: string }[] = [
  { v: 'laugh', label: '爆笑', hint: '笑到缺氧，拍照留念' },
  { v: 'warm', label: '走心', hint: '聊出点平时不会说的话' },
  { v: 'brain', label: '烧脑', hint: '推理、还原、抓内鬼' },
  { v: 'rival', label: '竞技', hint: '要有输赢，要有惩罚' },
]

const SETTINGS: { s: Setting; label: string; hint: string }[] = [
  { s: 'seated', label: '围着桌子坐', hint: '饭店、会议桌、烧烤摊' },
  { s: 'standing', label: '站着 / 有空间走动', hint: '客厅、露台、活动室' },
  { s: 'lounging', label: '沙发上瘫着', hint: 'KTV、民宿、家里趴着' },
]

const INTIMACY: { i: Intimacy; label: string }[] = [
  { i: 'strangers', label: '基本不认识' },
  { i: 'colleagues', label: '同事，但不熟' },
  { i: 'friends', label: '都是老朋友' },
  { i: 'family', label: '亲戚 / 有大有小' },
]

const SHY = [
  { n: 0, label: '全是社牛' },
  { n: 1, label: '有几个慢热' },
  { n: 2, label: '一半以上不敢开口' },
] as const

export function Home() {
  const [stage, setStage] = useState<'intro' | 'survey' | 'result'>('intro')
  const [profile, setProfile] = useState<Profile>({
    count: 8,
    minutes: 12,
    setting: 'seated',
    vibes: ['laugh'],
    intimacy: 'friends',
    shyLevel: 1,
    propsOk: true,
    phonePerPerson: true,
    wantMove: false,
  })
  const [hostName, setHostName] = useState('')
  const [rank, setRank] = useState(0)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const { picked, dropped } = useMemo(() => recommend(profile), [profile])
  const shown = stage === 'result' ? picked.slice(0, 4) : []
  const current = shown[Math.min(rank, shown.length - 1)]

  const set = <K extends keyof Profile>(k: K, v: Profile[K]) =>
    setProfile((p) => ({ ...p, [k]: v }))

  const start = () => {
    setRank(0)
    setStage('survey')
    window.scrollTo(0, 0)
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
          <div className="center-v" style={{ minHeight: '82vh' }}>
            <p className="kicker">ICEBREAKER</p>
            <h1 className="big">
              破冰局
              <br />
              <span style={{ color: 'var(--accent-2)' }}>把冷场变成一场游戏</span>
            </h1>
            <p className="lead">
              填 8 个问题，我替你挑一局现在最合适的。满意就开房间，大家用手机输入 4
              位房间号加入，规则和计时我来盯。
            </p>
            <button className="btn primary big" onClick={start}>
              填写需求名单 →
            </button>
            <div className="divider" />
            <p className="notice">
              现场只需要一个人投屏或共享屏幕，其余人扫一下二维码就行。不需要下载任何东西。
            </p>
            <div className="row" style={{ marginTop: 14 }}>
              {GAMES.slice(0, 8).map((g) => (
                <span className="chip" key={g.id} title={g.name}>
                  {g.emoji} {g.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (stage === 'survey') {
    return (
      <div className="app">
        <div className="wrap">
          <div className="progress">
            <div className="row between">
              <b>需求名单</b>
              <span className="dim">第 1 / 2 步 · 填完就推荐</span>
            </div>
            <div className="bar">
              <i style={{ width: '55%' }} />
            </div>
          </div>

          <Question no="01" title="现场几个人？">
            <div className="countpick">
              {[3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24].map((n) => (
                <button
                  key={n}
                  className={profile.count === n ? 'on' : ''}
                  onClick={() => set('count', n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </Question>

          <Question no="02" title={`这一局你愿意花 ${profile.minutes} 分钟`}>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={profile.minutes}
              onChange={(e) => set('minutes', Number(e.target.value))}
            />
            <div className="row between dim">
              <span>5 分钟急救</span>
              <span>半小时沉浸</span>
            </div>
          </Question>

          <Question no="03" title="现在大家是什么姿势？">
            <div className="opts">
              {SETTINGS.map((x) => (
                <Option
                  key={x.s}
                  on={profile.setting === x.s}
                  onClick={() => set('setting', x.s)}
                  label={x.label}
                  hint={x.hint}
                />
              ))}
            </div>
          </Question>

          <Question no="04" title="想要什么氛围？（可多选）">
            <div className="opts c2">
              {VIBES.map((x) => (
                <Option
                  key={x.v}
                  multi
                  on={profile.vibes.includes(x.v)}
                  onClick={() =>
                    set(
                      'vibes',
                      profile.vibes.includes(x.v)
                        ? profile.vibes.filter((v) => v !== x.v)
                        : [...profile.vibes, x.v],
                    )
                  }
                  label={x.label}
                  hint={x.hint}
                />
              ))}
            </div>
          </Question>

          <Question no="05" title="彼此熟吗？">
            <div className="opts c2">
              {INTIMACY.map((x) => (
                <Option
                  key={x.i}
                  on={profile.intimacy === x.i}
                  onClick={() => set('intimacy', x.i)}
                  label={x.label}
                />
              ))}
            </div>
          </Question>

          <Question no="06" title="在场的人放得开吗？">
            <div className="opts c3">
              {SHY.map((x) => (
                <Option
                  key={x.n}
                  on={profile.shyLevel === x.n}
                  onClick={() => set('shyLevel', x.n)}
                  label={x.label}
                />
              ))}
            </div>
          </Question>

          <Question no="07" title="设备情况">
            <div className="opts">
              <Option
                on={profile.phonePerPerson}
                onClick={() => set('phonePerPerson', !profile.phonePerPerson)}
                label="人手一台手机"
                hint="游戏过程中每个人都要在手机上提交答案"
              />
              <Option
                on={profile.wantMove}
                onClick={() => set('wantMove', !profile.wantMove)}
                label="可以站起来闹"
                hint="不排斥起身、比划、来回走动"
              />
            </div>
          </Question>

          <Question no="08" title="谁来当房主？">
            <input
              className="field"
              placeholder="投屏上显示的名字，比如「小李」"
              value={hostName}
              maxLength={12}
              onChange={(e) => setHostName(e.target.value)}
            />
          </Question>

          <button
            className="btn primary big"
            disabled={!profile.vibes.length}
            onClick={() => {
              setStage('result')
              setRank(0)
              window.scrollTo(0, 0)
            }}
          >
            {profile.vibes.length ? '给我推荐 →' : '先选至少一个氛围'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="wrap">
        <div className="progress">
          <div className="row between">
            <b>推荐结果</b>
            <button className="btn link" onClick={() => setStage('survey')}>
              改一下条件
            </button>
          </div>
          <div className="bar">
            <i style={{ width: '100%' }} />
          </div>
        </div>

        {!current ? (
          <div className="card accent center">
            <h2>这几个条件凑不出合适的局</h2>
            <p className="sub">
              8 款都试过了，剩下的是硬条件没过。回去放宽一条——通常把时长或者「人手一台手机」调一下就有解。
            </p>
            <button className="btn primary" onClick={() => setStage('survey')}>
              回去改条件
            </button>
          </div>
        ) : (
          <>
            <div className="rec" style={{ ['--c' as any]: current.game.color }}>
              <div className="top">
                <div className="row between">
                  <div className="emoji">{current.game.emoji}</div>
                  <span className="chip hot">第 {Math.min(rank, shown.length - 1) + 1} 推荐</span>
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

                {err && <div className="banner err">{err}</div>}

                <div className="grid c2" style={{ gap: 10 }}>
                  <button className="btn go big" disabled={busy} onClick={() => void accept(current.game.id)}>
                    {busy ? <span className="spin" /> : '就这个，开房间'}
                  </button>
                  <button
                    className="btn big"
                    disabled={busy}
                    onClick={() => setRank((r) => r + 1)}
                  >
                    {rank + 1 < shown.length ? '不满意，换一个' : '不满意，看剩下的'}
                  </button>
                </div>
                <p className="notice center" style={{ marginTop: 12 }}>
                  不满意就换，我按匹配度从高到低往下走，一共 {shown.length} 个候选。
                </p>
              </div>
            </div>

            <div className="panel" style={{ marginTop: 16 }}>
              <div className="h">其它候选，直接点也可以</div>
              <div className="alts">
                {picked_other(picked, current.game.id).map((x) => (
                  <button className="alt" key={x.game.id} disabled={busy} onClick={() => void accept(x.game.id)}>
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

function picked_other(all: ReturnType<typeof recommend>['picked'], id: string) {
  return all.filter((x) => x.game.id !== id).slice(0, 4)
}

function Question(props: { no: string; title: string; children: React.ReactNode }) {
  return (
    <div className="q">
      <div className="head">
        <span className="no">{props.no}</span>
        <span className="t">{props.title}</span>
      </div>
      {props.children}
    </div>
  )
}

function Option(props: {
  label: string
  hint?: string
  on: boolean
  multi?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className={`opt ${props.on ? 'on' : ''}`}
      onClick={props.onClick}
      style={props.on && props.multi ? { borderColor: 'var(--accent)' } : undefined}
    >
      <b>
        {props.on ? (props.multi ? '✓ ' : '● ') : props.multi ? '○ ' : '○ '}
        {props.label}
      </b>
      {props.hint && <span>{props.hint}</span>}
    </button>
  )
}
