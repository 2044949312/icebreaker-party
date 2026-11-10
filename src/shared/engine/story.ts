import { STORY_CONSTRAINTS, STORY_OPENINGS } from '../content'
import { judge, rankByScore } from '../judge'
import type { FinalResult, Player, Room, RoomView, StoryPart, ViewNeeds } from '../types'
import type { GameEngine } from './contract'
import {
  addScore,
  clip,
  ev,
  nameOf,
  overlap,
  phase,
  pick,
  randInt,
  sanitize,
  seated,
  story,
} from './util'

const WRITE_MS = 60_000
const LINE_MAX = 100
const DRAFT_MAX = 200
const MAX_ROUND = 3
const MISSING_TEXT = '（没交）'
const MISSING_NOTE = '这一轮他隐身了'

/** 裁判认的转折词：出现任何一个就算「把故事拧了一下」 */
const TURN_WORDS = [
  '居然',
  '没想到',
  '结果',
  '突然',
  '其实',
  '后来',
  '从此',
  '原来',
  '于是',
  '偏偏',
  '谁知道',
]

/* ---------------------------- 本地裁判 ---------------------------- */

interface ConstraintRule {
  label: string
  test: (text: string) => boolean
}

/**
 * 从隐形规则的文本里提取可机检的线索。
 * 认不出线索的规则一律跳过：不加分也绝不扣分，避免误伤。
 */
function constraintRule(constraint: string): ConstraintRule | null {
  const c = constraint || ''
  if (c.includes('不能出现')) return null
  if (c.includes('数字')) {
    return { label: '句子里有数字', test: (t) => /\d|[一二三四五六七八九十百]/.test(t) }
  }
  if (c.includes('问号') || c.includes('问句')) {
    return { label: '句子收在问号上', test: (t) => /[？?]/.test(t.trim()) }
  }
  if (c.includes('因为')) {
    return { label: '写清了原因', test: (t) => t.includes('因为') }
  }
  if (c.includes('动作') || c.includes('动词')) {
    return { label: '动词收尾', test: (t) => /[了着过][。！？!?,，]?$/.test(t.trim()) }
  }
  if (c.includes('感官')) {
    return { label: '有感官细节', test: (t) => /(看|听|闻|摸|尝|瞧|盯|触|smell)/i.test(t) }
  }
  return null
}

/** 给本轮每条句子打分并写短评，然后选出本轮最佳 */
function scoreRound(room: Room) {
  const d = story(room)
  const rule = constraintRule(d.constraint)
  const judged: StoryPart[] = []

  d.parts.forEach((part, i) => {
    if (part.round !== d.round || part.note) return

    const reasons: string[] = []
    let score = 1

    // 上一句：整条故事的前一句；第 1 轮第 1 句对标开场
    const prev = i === 0 ? d.opening : d.parts[i - 1]?.text || d.opening
    if (overlap(prev, part.text) >= 2) {
      score += 1
      reasons.push('接住了上一句的线索')
    }
    if (TURN_WORDS.some((w) => part.text.includes(w))) {
      score += 1
      reasons.push('转折漂亮')
    }
    if (rule) {
      if (rule.test(part.text)) {
        score += 1
        reasons.push(`规则到位：${rule.label}`)
      } else {
        reasons.push('规则没执行')
      }
    }
    // 和任意一句撞车：抄袭或复读
    const dup = d.parts.some((o, j) => j !== i && !!o.text && o.text !== MISSING_TEXT && overlap(o.text, part.text) >= 10)
    if (dup) {
      score -= 1
      reasons.push('和已有的句子太像')
    }

    part.score = Math.max(0, Math.min(4, score))
    part.note = reasons.length ? reasons.join('；') : '平铺直叙，把故事往前推了一步'
    d.scores[part.by] = (d.scores[part.by] ?? 0) + part.score
    judged.push(part)
  })

  if (!judged.length) {
    ev(room, 'judge', '这一轮没有可评的句子，故事原地停了一下。')
    return
  }

  const top = Math.max(...judged.map((p) => p.score))
  const tied = judged.filter((p) => p.score === top)
  const chosen = tied[randInt(0, tied.length - 1)]
  d.best[d.round] = chosen.by
  addScore(room, chosen.by, 2)
  ev(room, 'judge', judge('praise', { name: chosen.byName }))
  ev(
    room,
    'judge',
    judge('award', { name: chosen.byName, title: '神转折奖' }) +
      (tied.length > 1 ? `本轮 ${tied.length} 人同为 ${top} 分，并列，我随机点了一个。` : ''),
  )
}

/** 一轮收口：forced 时给没交的人补一条「隐身」，然后评分、进入朗读 */
function closeRound(room: Room, forced: boolean) {
  const d = story(room)
  if (forced) {
    const missing: Player[] = []
    for (const p of seated(room)) {
      if (!d.parts.some((x) => x.by === p.id && x.round === d.round)) {
        d.parts.push({
          by: p.id,
          byName: p.name,
          text: MISSING_TEXT,
          round: d.round,
          score: 0,
          note: MISSING_NOTE,
        })
        missing.push(p)
      }
    }
    if (missing.length === 1) {
      ev(room, 'judge', `${judge('timeout', { name: missing[0].name })}这一轮给他记一句「隐身」。`)
    } else if (missing.length) {
      ev(
        room,
        'judge',
        `${clip(missing.map((x) => x.name).join('、'), 48)} 这轮没交，各记一句「隐身」，下一轮别再跑了。`,
      )
    }
  }
  scoreRound(room)
  phase(room, 'read')
  ev(room, 'info', `第 ${d.round} 轮写完，大屏按顺序把这一段念出来。`)
}

function nextRound(room: Room) {
  const d = story(room)
  d.round += 1
  room.round = d.round
  phase(room, 'write', { ms: WRITE_MS, round: d.round })
  const tail = d.parts.length ? d.parts[d.parts.length - 1].text : d.opening
  ev(room, 'judge', `${judge('round', { round: d.round })}接在「${clip(tail, 40)}」后面，只写一句。`)
}

function endStory(room: Room) {
  const d = story(room)
  ev(room, 'judge', `${d.maxRound} 轮写完了。裁判把整个故事从头念一遍，然后发奖。`)
  phase(room, 'over')
}

const submittedThisRound = (room: Room, id: string) => {
  const d = story(room)
  return d.parts.some((p) => p.by === id && p.round === d.round)
}

/* ---------------------------- 引擎 ---------------------------- */

export const storyEngine: GameEngine = {
  id: 'story',

  create(room: Room) {
    const d = story(room)
    d.opening = STORY_OPENINGS.length ? pick(STORY_OPENINGS) : '那天早上，闹钟比平时早响了十分钟。'
    d.constraint = STORY_CONSTRAINTS.length
      ? pick(STORY_CONSTRAINTS)
      : '本句必须包含一个数字，但不能是年份。'
    d.round = 0
    d.maxRound = MAX_ROUND
    d.parts = []
    d.drafts = {}
    d.scores = {}
    d.best = {}
    for (const p of seated(room)) d.scores[p.id] = 0
    phase(room, 'lobby')
  },

  start(room: Room) {
    const d = story(room)
    const seats = seated(room)
    d.round = 1
    d.maxRound = MAX_ROUND
    d.parts = []
    d.drafts = {}
    d.best = {}
    d.scores = {}
    for (const p of seats) d.scores[p.id] = 0
    room.round = 1
    phase(room, 'write', { ms: WRITE_MS, round: 1 })
    ev(room, 'judge', judge('open'))
    ev(room, 'info', `开场第一句：${d.opening}`)
    ev(room, 'info', `隐形规则：${d.constraint}（只有裁判会逐句检查这条）`)
    ev(room, 'info', `${seats.length} 个人、每人一句、共 ${d.maxRound} 轮。这一轮先写第 2 句。`)
  },

  act(room: Room, actor: Player, action: string, payload: any) {
    const d = story(room)

    // 手机端防丢字：只存，不广播内容
    if (action === 'draft') {
      if (room.phase !== 'write') return
      d.drafts[actor.id] = sanitize(payload?.text, DRAFT_MAX)
      return
    }

    if (action === 'line') {
      if (room.phase !== 'write') return
      if (submittedThisRound(room, actor.id)) return
      const text = sanitize(payload?.text, LINE_MAX)
      if (!text) return
      d.parts.push({
        by: actor.id,
        byName: actor.name,
        text,
        round: d.round,
        score: 0,
        note: '',
      })
      delete d.drafts[actor.id]
      ev(room, 'info', `${actor.name} 交了一句（${d.parts.filter((p) => p.round === d.round).length}/${seated(room).length}）。`)
      const left = seated(room).filter((p) => !submittedThisRound(room, p.id))
      if (!left.length) closeRound(room, false)
      return
    }
  },

  next(room: Room, actor: Player | null) {
    const d = story(room)
    if (room.phase === 'lobby') {
      this.start(room)
      return
    }
    if (room.phase === 'write') {
      closeRound(room, true)
      return
    }
    if (room.phase === 'read') {
      if (d.round < d.maxRound) nextRound(room)
      else endStory(room)
      return
    }
    void actor
    void d
  },

  tick(room: Room, now: number) {
    if (room.phase !== 'write') return
    if (room.deadlineAt === null || now < room.deadlineAt) return
    closeRound(room, true)
  },

  publicData(room: Room): Record<string, any> {
    const d = story(room)
    const started = room.phase !== 'lobby'
    const open = room.phase === 'read' || room.phase === 'over'
    const seats = seated(room)
    return {
      story: {
        opening: started ? d.opening : '',
        constraint: started ? d.constraint : '',
        round: d.round,
        maxRound: d.maxRound,
        // 写阶段只能看到往轮的句子，本轮内容要等朗读才见光
        parts: open ? d.parts : d.parts.filter((p) => p.round < d.round),
        thisRound: open
          ? d.parts.filter((p) => p.round === d.round).map((p) => ({ id: p.by, name: p.byName }))
          : [],
        done: seats.filter((p) => submittedThisRound(room, p.id)).map((p) => ({ id: p.id, name: p.name })),
        pending: seats.filter((p) => !submittedThisRound(room, p.id)).map((p) => p.name),
        tail: started ? clip(d.parts.length ? d.parts[d.parts.length - 1].text : d.opening, 60) : '',
        scores: open ? d.scores : {},
        best: open ? d.best : {},
      },
    }
  },

  secretFor(room: Room, me: Player) {
    const d = story(room)
    return {
      draft: d.drafts[me.id] ?? '',
      mine: d.parts
        .filter((p) => p.by === me.id)
        .map((p) => ({ round: p.round, text: p.text, score: p.score, note: p.note })),
      roundScore: d.scores[me.id] ?? 0,
    }
  },

  refereeExtra(room: Room) {
    const d = story(room)
    const thisRound = d.parts.filter((p) => p.round === d.round)
    const rule = constraintRule(d.constraint)
    return {
      round: d.round,
      maxRound: d.maxRound,
      constraint: d.constraint,
      machineChecked: rule ? rule.label : '这条规则没法机检，本轮不参与加分，只按连贯度和转折打分',
      lines: thisRound.map((p) => ({
        name: p.byName,
        text: p.text,
        score: p.score,
        note: p.note,
      })),
      pending: seated(room).filter((p) => !submittedThisRound(room, p.id)).map((p) => p.name),
      best: d.best[d.round] ? nameOf(room, d.best[d.round]) : '',
      note: rule
        ? `裁判只按写死的规则打分：基础 1 分，接上上一句 +1，有转折 +1，「${rule.label}」+1，撞车 -1，最高 4 分。`
        : '裁判只按写死的规则打分：基础 1 分，接上上一句 +1，有转折 +1，撞车 -1，最高 4 分。',
    }
  },

  needs(room: Room, me: Player | null, view: RoomView): ViewNeeds {
    void view
    const d = story(room)
    const base: ViewNeeds = {
      prompt: null,
      input: 'none',
      inputHint: '',
      submitted: false,
      hostHint: '等待玩家加入后点「开始这局」。',
    }
    if (!me) {
      return { ...base, hostHint: hostHintFor(room) }
    }
    if (room.phase === 'lobby') {
      return {
        ...base,
        prompt: '开局后大屏给一句开头和一条隐形规则',
        hostHint: hostHintFor(room),
      }
    }
    if (room.phase === 'write') {
      const done = submittedThisRound(room, me.id)
      const tail = d.parts.length ? d.parts[d.parts.length - 1].text : d.opening
      return {
        ...base,
        prompt: done
          ? '已交，等其他人写完这一轮'
          : `第 ${d.round}/${d.maxRound} 轮：写一句话接上去`,
        input: done ? 'none' : 'textarea',
        inputHint: `隐形规则：${d.constraint}只写一句，接在后面的情节上。当前最后一句：「${clip(tail, 40)}」`,
        submitted: done,
        hostHint: hostHintFor(room),
      }
    }
    if (room.phase === 'read') {
      return {
        ...base,
        prompt: '大屏朗读，听别人怎么圆',
        inputHint: '你本轮的得分和短评就在大屏上。',
        hostHint: hostHintFor(room),
      }
    }
    return { ...base, prompt: '本局已结束', hostHint: hostHintFor(room) }
  },

  finish(room: Room): FinalResult {
    const d = story(room)
    const ranked = rankByScore(room.players)
    const top = ranked[0]
    const bottom = ranked[ranked.length - 1]
    const winners = ranked
      .filter((r) => r.rank === 0)
      .map((r) => ({ name: r.player.name, score: r.player.score }))

    const played = d.parts.filter((p) => p.text !== MISSING_TEXT)
    const hidden = d.parts.filter((p) => p.text === MISSING_TEXT)
    const full = played.filter((p) => p.score >= 4)
    const bestLine = Object.entries(d.best)
      .map(([round, id]) => {
        const part = d.parts.find((p) => p.round === Number(round) && p.by === id && p.text !== MISSING_TEXT)
        return `第 ${round} 轮 ${nameOf(room, id)}（${part ? part.score : 0} 分）`
      })
      .join('；')
    const maxScore = played.length ? Math.max(...played.map((p) => p.score)) : 0

    const lines: string[] = []
    lines.push(
      `开头「${clip(d.opening, 26)}」后面接了 ${played.length} 句，隐形规则是「${clip(d.constraint, 22)}」`,
    )
    lines.push(bestLine ? `神转折奖归属 —— ${bestLine}。` : '三轮都没评出神转折，大家写得太一致了。')
    lines.push(
      full.length
        ? `拿满 4 分的有 ${clip([...new Set(full.map((p) => p.byName))].join('、'), 48)}。`
        : `全场单句最高只有 ${maxScore} 分，裁判觉得你们还能再野一点。`,
    )
    lines.push(
      hidden.length
        ? `${clip([...new Set(hidden.map((p) => p.byName))].join('、'), 48)} 中途隐身过 ${hidden.length} 次。`
        : '每一轮所有人都交上了，这很难得。',
    )
    if (top && bottom && top.player.score !== bottom.player.score) {
      lines.push(`总分最高 ${top.player.name}（${top.player.score} 分），最低 ${bottom.player.name}（${bottom.player.score} 分）。`)
    }

    return {
      title: `故事接龙 · ${d.maxRound} 轮 ${played.length} 句`,
      lines,
      winners,
      verdict:
        (top
          ? judge('award', { name: top.player.name, title: '最强圆场奖' })
          : judge('tie')) + ' ' + judge('close'),
    }
  },
}

function hostHintFor(room: Room) {
  const d = story(room)
  switch (room.phase) {
    case 'lobby':
      return '人到齐了就点开始，系统会抽开头和隐形规则。'
    case 'write': {
      const left = seated(room).filter((p) => !submittedThisRound(room, p.id)).map((p) => p.name)
      return left.length
        ? `还差 ${left.length} 个人：${clip(left.join('、'), 40)}。等不及就按「下一步」强制结算。`
        : '都交齐了，马上进入朗读。'
    }
    case 'read':
      return '念完这一段按「下一步」进下一轮，最后一轮之后按「下一步」结算。'
    case 'over':
      return '按「下一步」回到结算页继续停留，或开新局。'
    default:
      return ''
  }
}
