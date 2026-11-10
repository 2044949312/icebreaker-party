import type { RoomView } from '../../shared/types'
import { nameOf, type ExtraButton, type GameUI, type StageModel } from './model'

/** 每个游戏的公开数据都挂在和自己 id 同名的键下 */
const pd = (view: RoomView) => (view.publicData?.[view.gameId] ?? {}) as Record<string, any>

const living = (view: RoomView) => view.players.filter((p) => p.alive)

const PHASE_CN: Record<string, string> = {
  lobby: '等待进场',
  write: '填写中',
  ask: '提问阶段',
  ready: '准备上台',
  run: '进行中',
  hunt: '夹区间',
  boom: '踩雷',
  describe: '轮流描述',
  show: '公开中',
  vote: '投票',
  reveal: '揭晓',
  read: '朗读',
  settle: '结算',
  gap: '换人',
  over: '本局结束',
}

const phaseName = (view: RoomView) => PHASE_CN[view.phase] ?? view.phase

const idle = (eyebrow: string, focus: string, focusHint: string, chips: string[] = []): StageModel => ({
  eyebrow,
  focus,
  focusHint,
  chips,
})

const progress = (n: number, total: number) => `已提交 ${n} / ${total}`

const ONE_OF = ['一', '二', '三']

/* ----------------------------- 谁是卧底 ----------------------------- */

const spyUI: GameUI = {
  phaseName,
  turnId: (view) => {
    const d = pd(view)
    if (view.phase !== 'describe') return null
    return (d.livingOrder ?? d.order ?? [])[view.turn] ?? null
  },
  input: (view) => {
    if (view.phase === 'describe') return { action: 'describe', field: 'text' }
    if (view.phase === 'vote') return { action: 'vote' }
    return null
  },
  stage: (view) => {
    const d = pd(view)
    const ids = living(view).map((p) => p.id)
    if (view.phase === 'lobby') {
      return idle('谁是卧底', '发词之前', '人到齐就开始，系统会把近义词悄悄塞给其中一两个人。', [
        `${view.players.length} 人`,
        `${d.insiderCount ?? 1} 个卧底`,
      ])
    }
    if (view.phase === 'describe') {
      const t = spyUI.turnId!(view)
      const said = ids.filter((id) => d.descriptions?.[id]).length
      return {
        eyebrow: `第 ${view.round} 轮 · 描述`,
        focus: nameOf(view, t),
        focusHint: '用一句话说说自己手里那个词，但不能直接说出来',
        tone: 'cool',
        rows: (d.livingOrder ?? d.order ?? []).map((id: string) => ({
          who: nameOf(view, id),
          what: d.descriptions?.[id] ?? '……还没开口',
        })),
        chips: [progress(said, ids.length), '说出来就判无效'],
      }
    }
    if (view.phase === 'vote') {
      const voted = ids.filter((id) => d.votes?.[id]).length
      return {
        eyebrow: `第 ${view.round} 轮 · 投票`,
        focus: '投出那个不像同类的人',
        focusHint: '每个人一票，不能投自己，投完自动公布',
        tone: 'hot',
        chips: [progress(voted, ids.length)],
        rows: living(view).map((p) => ({ who: p.name, what: d.votes?.[p.id] ? '已投' : '还在犹豫' })),
      }
    }
    if (view.phase === 'reveal') {
      const bars = Object.entries(d.tally ?? {})
        .map(([id, n]) => ({ label: nameOf(view, id), value: Number(n) }))
        .sort((a, b) => b.value - a.value)
      const out = d.lastOut
      return {
        eyebrow: `第 ${view.round} 轮 · 揭晓`,
        focus: out ? `${nameOf(view, out)} 出局` : '这轮平票',
        focusHint: out ? '他的身份已经在大屏右侧的播报里说明' : '没有人被抬走，尴尬的是你们',
        tone: out ? 'danger' : 'normal',
        bars,
        chips: [`大众词 ${d.common}`, `卧底词 ${d.insider}`, `${d.aliveCount ?? living(view).length} 人在场`],
        rows: (d.order ?? []).map((id: string) => ({
          who: nameOf(view, id),
          what: d.descriptions?.[id] ?? '—',
          right: d.eliminated?.includes(id) ? '已出局' : undefined,
          win: !d.eliminated?.includes(id),
        })),
      }
    }
    return {
      eyebrow: '终局',
      focus: d.result === 'insider' ? '卧底赢了' : '卧底被抓干净了',
      focusHint: `大众词「${d.common}」 / 卧底词「${d.insider}」`,
      tone: 'win',
      chips: [`共 ${d.round ?? view.round} 轮`],
      rows: view.players
        .slice()
        .sort((a, b) => b.score - a.score)
        .map((p) => ({ who: p.name, what: `${p.score} 分`, right: d.eliminated?.includes(p.id) ? '中途出局' : '活到最后' })),
    }
  },
}

/* ----------------------------- 两真一假 ----------------------------- */

const twosUI: GameUI = {
  phaseName,
  input: (view) => {
    if (view.phase === 'write') return { action: 'write' }
    if (view.phase === 'show') return { action: 'vote' }
    return null
  },
  stage: (view) => {
    const d = pd(view)
    const total = view.players.length
    if (view.phase === 'lobby') {
      return idle('两真一假', '三件关于你的事', '两件是真的，一件是编的。别人负责猜。', [`${total} 人`])
    }
    if (view.phase === 'write') {
      const written = (d.written ?? []).length
      return {
        eyebrow: '写下你的三条',
        focus: '两件真的，一件假的',
        focusHint: '越具体越可信，越夸张越像假的——这就是这门学问',
        chips: [progress(written, total)],
        note: d.skipped?.length ? `已经跳过没写的：${d.skipped.join('、')}` : '别人在提交前看不到你写了什么。',
      }
    }
    const statements: string[] | null = d.statements ?? null
    if (view.phase === 'show') {
      return {
        eyebrow: `${d.authorName ?? '下一位'} 的三条`,
        focus: '哪一条是编的？',
        focusHint: '本人念的时候别笑场',
        tone: 'cool',
        rows: (statements ?? []).map((s, i) => ({ who: `第${ONE_OF[i]}条`, what: s })),
        chips: [`${d.votedCount ?? 0} 人已投`, '本人不用投'],
      }
    }
    if (view.phase === 'reveal') {
      const lie: number = d.lieIndex ?? 0
      const tally: number[] = d.tally ?? [0, 0, 0]
      return {
        eyebrow: '揭晓',
        focus: `假的是第${ONE_OF[lie]}条`,
        focusHint: statements?.[lie] ?? '',
        tone: 'hot',
        bars: tally.map((n, i) => ({ label: `第${ONE_OF[i]}条`, value: n, mark: i === lie ? '假' : undefined })),
        rows: [{ who: d.authorName ?? '', what: `${d.fooled?.[d.authorId] ?? 0} 个人上当` }],
        chips: [`${(d.votedNames ?? []).length} 人参与猜测`],
      }
    }
    return {
      eyebrow: '最佳演技',
      focus: `${
        view.players.slice().sort((a, b) => b.score - a.score)[0]?.name ?? '—'
      } 骗过了最多人`,
      tone: 'win',
      rows: view.players
        .slice()
        .sort((a, b) => b.score - a.score)
        .map((p) => ({ who: p.name, what: `${p.score} 分`, right: `${d.fooled?.[p.id] ?? 0} 人上当` })),
    }
  },
}

/* ------------------------------ 海龟汤 ------------------------------ */

const ANSWER_CN: Record<string, string> = { yes: '是', no: '不是', partial: '部分是', none: '无关' }

const soupUI: GameUI = {
  phaseName,
  input: (view) => (view.phase === 'ask' ? { action: 'ask', field: 'text' } : null),
  extras: [
    {
      action: 'solve',
      label: '我想到真相了',
      text: {
        label: '用一段话复述你理解的真相',
        placeholder: '比如：其实那个人是因为……最后才发现……',
        field: 'answer',
        max: 200,
      },
      when: (_view, me) => _view.phase === 'ask' && me.alive,
    },
  ],
  stage: (view) => {
    const d = pd(view)
    if (view.phase === 'lobby') {
      return idle('海龟汤', d.title ?? '一段离奇的场景', '你只看到表面现象，真相得靠提问问出来。', [
        (d.tags ?? []).join(' / '),
      ])
    }
    const queue: any[] = (d.queue ?? []).filter((q: any) => q.by !== '__system')
    const rows = queue
      .slice(-9)
      .reverse()
      .map((q) => ({
        who: q.byName ?? nameOf(view, q.by),
        what: q.text,
        right: q.answer === 'pending' ? '等裁判' : ANSWER_CN[q.answer] ?? q.answer,
        win: q.answer === 'yes',
      }))
    const chips = [
      `提问 ${d.questionCount ?? queue.length} 个`,
      `提示 ${d.hintsUsed ?? 0} / 4`,
      ...(d.pendingCount ? [`${d.pendingCount} 个等裁判`] : []),
    ]
    if (view.phase === 'ask') {
      return {
        eyebrow: `汤面 · ${d.title ?? ''}`,
        focus: '是？不是？还是不重要？',
        focusHint: d.question ?? '',
        tone: 'cool',
        rows,
        chips,
        note: '裁判手里有完整真相。提问要能回答「是 / 不是」，别问「是谁」这种开放问题。',
      }
    }
    return {
      eyebrow: d.solved ? '真相还原' : '汤没喝完',
      focus: d.solved ? `${nameOf(view, d.solvedBy)} 还原了汤底` : '没人还原成功',
      focusHint: d.truth ?? '',
      tone: d.solved ? 'win' : 'normal',
      rows,
      chips,
    }
  },
}

/* ----------------------------- 数字炸弹 ----------------------------- */

const bombUI: GameUI = {
  phaseName,
  turnId: (view) => {
    const d = pd(view)
    if (view.phase !== 'hunt') return null
    return d.current ?? d.order?.[d.cursor ?? 0] ?? null
  },
  input: (view) => (view.phase === 'hunt' ? { action: 'guess', field: 'value' } : null),
  stage: (view) => {
    const d = pd(view)
    if (view.phase === 'lobby') {
      return idle('数字炸弹', '1 — 100', '裁判心里藏了一个数，你们轮流把它夹出来。', [
        `${d.maxRound ?? 3} 轮`,
        '每人 15 秒',
      ])
    }
    if (view.phase === 'hunt') {
      const size = d.size ?? Math.max(0, (d.high ?? 100) - (d.low ?? 1) + 1)
      return {
        eyebrow: `第 ${view.round} 轮 · 区间`,
        focus: `${d.low} — ${d.high}`,
        focusHint: `${nameOf(view, bombUI.turnId!(view))} 报数 · 区间里还剩 ${size} 个数`,
        tone: size <= 3 ? 'danger' : size <= 8 ? 'hot' : 'normal',
        rows: (d.history ?? []).slice(-7).reverse().map((h: any) => ({
          who: nameOf(view, h.by),
          what: String(h.value),
        })),
        chips: [`第 ${view.round} / ${d.maxRound ?? 3} 轮`, `犹豫 ${d.hesitations ?? 0} 次`],
      }
    }
    if (view.phase === 'boom') {
      return {
        eyebrow: '嘭',
        focus: `${nameOf(view, d.loser)} 踩中了`,
        focusHint: `这一轮的炸弹是 ${d.target}`,
        tone: 'danger',
        note: '按「下一步」开下一轮，或者结束本局。',
      }
    }
    return {
      eyebrow: '踩雷榜',
      focus: `${
        view.players
          .slice()
          .sort((a, b) => (d.booms?.[b.id] ?? 0) - (d.booms?.[a.id] ?? 0))[0]?.name ?? '—'
      } 最倒霉`,
      tone: 'win',
      rows: view.players
        .slice()
        .sort((a, b) => (d.booms?.[b.id] ?? 0) - (d.booms?.[a.id] ?? 0))
        .map((p) => ({ who: p.name, what: `${d.booms?.[p.id] ?? 0} 次踩雷`, right: `${p.score} 分` })),
    }
  },
}

/* ------------------------------ 逢七过 ------------------------------ */

const sevenUI: GameUI = {
  phaseName,
  turnId: (view) => {
    const d = pd(view)
    if (view.phase !== 'run') return null
    return d.current ?? d.order?.[d.cursor ?? 0] ?? null
  },
  input: (view) => (view.phase === 'run' ? { action: 'call' } : null),
  stage: (view) => {
    const d = pd(view)
    if (view.phase === 'lobby') {
      return idle('逢七过', '7 的倍数，和带 7 的数', '不能念出来，要拍桌子喊「过」。', [
        `${view.players.length} 人围圈`,
        '三次失误淘汰',
      ])
    }
    if (view.phase === 'run') {
      const count: number = d.count ?? 1
      return {
        eyebrow: '现在这个数',
        focus: String(count),
        focusHint: `${nameOf(view, sevenUI.turnId!(view))} 决定：报数，还是拍桌过？`,
        tone: (d.speedMs ?? 3000) <= 1600 ? 'hot' : 'normal',
        note: `反应时限 ${(Math.round((d.speedMs ?? 3000) / 100) / 10).toFixed(1)} 秒，数字越大越快`,
        bars: Object.entries(d.mistakes ?? {})
          .map(([id, n]) => ({ label: nameOf(view, id), value: Number(n) }))
          .sort((a, b) => b.value - a.value),
        chips: [`${(d.struck ?? []).length} 人已淘汰`, `${d.aliveCount ?? living(view).length} 人在圈里`],
      }
    }
    return {
      eyebrow: '反应审判',
      focus: `整场一口气数到 ${d.count ?? 0}`,
      tone: 'win',
      rows: view.players
        .slice()
        .sort((a, b) => (d.mistakes?.[a.id] ?? 0) - (d.mistakes?.[b.id] ?? 0))
        .map((p) => ({
          who: p.name,
          what: `${d.mistakes?.[p.id] ?? 0} 次失误`,
          right: (d.struck ?? []).includes(p.id) ? '淘汰' : '存活',
          win: !(d.struck ?? []).includes(p.id),
        })),
    }
  },
}

/* ----------------------------- 故事接龙 ----------------------------- */

const storyUI: GameUI = {
  phaseName,
  input: (view) => (view.phase === 'write' ? { action: 'line', field: 'text' } : null),
  stage: (view) => {
    const d = pd(view)
    const parts: any[] = d.parts ?? []
    const total = living(view).length
    if (view.phase === 'lobby') {
      return idle('故事接龙', '一人一句，偷偷写', '谁也不知道别人会往哪儿接。', [
        `${view.players.length} 人`,
        `${d.maxRound ?? 3} 轮`,
      ])
    }
    if (view.phase === 'write') {
      const doneN = (d.done ?? []).length
      return {
        eyebrow: `第 ${d.round ?? view.round} 轮 · 悄悄写`,
        focus: d.constraint ?? '本局的隐形规则',
        focusHint: d.tail ? `上一句停在：「${d.tail}」` : '接着往下写一句',
        tone: 'cool',
        chips: [progress(doneN, total), ...(d.pending?.length ? [`还在憋：${d.pending.join('、')}`] : [])],
        paras: [
          { head: '开头', body: d.opening ?? '' },
          ...parts.slice(-5).map((x) => ({ head: x.byName ?? nameOf(view, x.by), body: x.text })),
        ],
        note: '别人看不到你的内容，只看到你有没有交。',
      }
    }
    if (view.phase === 'read') {
      const thisRound: any[] = (d.parts ?? []).filter((x: any) => x.round === (d.round ?? view.round))
      return {
        eyebrow: `第 ${d.round ?? view.round} 轮 · 朗读`,
        focus: '连起来看看变成了什么',
        focusHint: `隐形规则：${d.constraint ?? ''}`,
        tone: 'hot',
        paras: [
          { head: '开头', body: d.opening ?? '' },
          ...thisRound.map((x) => ({
            head: `${x.byName ?? nameOf(view, x.by)}${x.score ? ` · ${x.score} 分` : ''}`,
            body: x.text,
          })),
        ],
        note: thisRound.find((x) => x.note)?.note,
      }
    }
    const best = view.players.slice().sort((a, b) => (d.scores?.[b.id] ?? 0) - (d.scores?.[a.id] ?? 0))[0]
    return {
      eyebrow: '完整故事',
      focus: `${best?.name ?? '—'} 是最强接龙`,
      focusHint: `一共 ${parts.length} 句 · 规则：${d.constraint ?? ''}`,
      tone: 'win',
      paras: [
        { head: '开头', body: d.opening ?? '' },
        ...parts.map((x) => ({ head: `${x.byName} · ${x.score} 分`, body: x.text })),
      ],
    }
  },
}

/* ---------------------------- 我有你没有 ---------------------------- */

const neverUI: GameUI = {
  phaseName,
  turnId: (view) => {
    const d = pd(view)
    if (view.phase !== 'show') return null
    return d.authorId ?? d.order?.[d.cursor ?? 0] ?? null
  },
  input: (view) => {
    if (view.phase === 'write') return { action: 'claim', field: 'text' }
    if (view.phase === 'show') return { action: 'didIt' }
    return null
  },
  stage: (view) => {
    const d = pd(view)
    const total = view.players.length
    if (view.phase === 'lobby') {
      return idle('我有你没有', '说一件你做过的事', '没做过的人不用动，做过的人扣分。', [
        `每人初始 ${d.startScore ?? 10} 分`,
      ])
    }
    if (view.phase === 'write') {
      return {
        eyebrow: '每人出一道',
        focus: '我有你没有：……',
        focusHint: '写一件你真的做过、但你觉得大多数人没做过的事',
        tone: 'cool',
        chips: [progress((d.written ?? []).length, total)],
        note: d.pending?.length ? `还没想好：${d.pending.join('、')}` : '题目在别人提交前不会公开。',
      }
    }
    const raised: string[] = d.raised ?? []
    if (view.phase === 'show') {
      return {
        eyebrow: `${d.authorName ?? ''} 出题`,
        focus: d.claim ?? '……',
        focusHint: '现场真的做过的人，在手机上点「我做过」',
        tone: 'hot',
        rows: raised.map((n) => ({ who: n, what: '我做过（扣 2 分）' })),
        chips: [`${raised.length} 人举手`, `${d.quietCount ?? 0} 人清白`],
      }
    }
    if (view.phase === 'settle') {
      return {
        eyebrow: '本轮结算',
        focus: raised.length === 0 ? '全场没人做过，冷门加成' : `${raised.length} 人中招`,
        focusHint: d.claim ?? '',
        tone: 'danger',
        rows: raised.map((n) => ({ who: n, what: '-2 分' })),
      }
    }
    const top = view.players.slice().sort((a, b) => b.score - a.score)[0]
    return {
      eyebrow: '计分板',
      focus: `${top?.name ?? '—'} 守住了全场`,
      tone: 'win',
      rows: view.players
        .slice()
        .sort((a, b) => b.score - a.score)
        .map((p) => ({
          who: p.name,
          what: `${p.score} 分`,
          right: d.cold?.[p.id] ? `冷门 +${d.cold[p.id]}` : undefined,
        })),
    }
  },
}

/* ----------------------------- 你比我猜 ----------------------------- */

const mimeUI: GameUI = {
  phaseName,
  turnId: (view) => pd(view).actorId ?? null,
  input: (view) => {
    const vals = (view.needs.options ?? []).map((o) => String(o.value))
    if (view.phase === 'ready') return { action: 'setDifficulty' }
    if (view.phase === 'run') {
      return { action: 'wordSkip', map: { correct: 'wordCorrect', skip: 'wordSkip' } }
    }
    void vals
    return null
  },
  extras: [
    {
      action: 'nudge',
      label: '我没思路了',
      when: (view) => view.phase === 'run',
    },
  ],
  stage: (view) => {
    const d = pd(view)
    const actor = d.actorId ? nameOf(view, d.actorId) : ''
    if (view.phase === 'lobby') {
      return idle('你比我猜', '一个人比划，全场抢答', `一共 ${d.maxRound ?? '—'} 轮，每人轮流上台。`, [
        '词只有比划者看得到',
      ])
    }
    if (view.phase === 'ready') {
      return {
        eyebrow: `第 ${view.round} 轮 · 准备`,
        focus: actor || '下一位上台',
        focusHint: '上台的人先在手机上选难度，然后大屏点「下一步」开跑',
        tone: 'cool',
        chips: [`难度 ${d.difficulty ?? 'mid'}`, `词库 ${d.listLength ?? 18} 个`],
      }
    }
    if (view.phase === 'run') {
      return {
        eyebrow: `第 ${view.round} 轮 · ${actor} 在比划`,
        focus: `猜中 ${d.correct ?? 0} 个`,
        focusHint: `换词 ${d.skips ?? 0} 次 · 连击 ${d.streak ?? 0} · 最佳连击 ${d.bestStreak ?? 0}`,
        tone: (d.streak ?? 0) >= 3 ? 'hot' : 'normal',
        note: '词只出现在比划者的手机上。主持人点「猜对了」才计分。',
        chips: [`已翻 ${(d.index ?? 0) + 1} / ${d.listLength ?? 0} 个词`],
      }
    }
    if (view.phase === 'gap') {
      return {
        eyebrow: `${actor} 的战报`,
        focus: `${d.correct ?? 0} 个`,
        focusHint: `中途换了 ${d.skips ?? 0} 次词，最长连击 ${d.bestStreak ?? 0}`,
        tone: 'win',
        rows: (d.log ?? []).slice(-8).reverse().map((x: any) => ({
          who: x.ok ? '✓' : '✗',
          what: x.word,
          right: x.ok ? `${Math.round(x.seconds)} 秒` : '跳过',
          win: x.ok,
        })),
      }
    }
    const board = Object.entries(d.scores ?? {})
      .sort((a, b) => Number(b[1]) - Number(a[1]))
      .map(([id, n]) => ({ who: nameOf(view, id), what: `${n} 分` }))
    return {
      eyebrow: '本场比划王',
      focus: `${board[0]?.who ?? '—'}`,
      focusHint: `最佳连击 ${d.bestStreak ?? 0}`,
      tone: 'win',
      rows: board,
    }
  },
}

export const GAME_UI: Record<string, GameUI> = {
  spy: spyUI,
  twos: twosUI,
  soup: soupUI,
  bomb: bombUI,
  seven: sevenUI,
  story: storyUI,
  never: neverUI,
  mime: mimeUI,
}

export const uiFor = (view: RoomView): GameUI => GAME_UI[view.gameId] ?? spyUI

export type { ExtraButton } from './model'
