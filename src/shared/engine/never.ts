import { NEVER_STARTERS } from '../content'
import { judge, rankByScore } from '../judge'
import type { FinalResult, Player, Room, RoomView, ViewNeeds } from '../types'
import type { GameEngine } from './contract'
import {
  addScore,
  allSubmitted,
  byId,
  clip,
  ev,
  nameOf,
  never,
  phase,
  sanitize,
  seated,
  shuffle,
} from './util'

const WRITE_MS = 60_000
const RAISE_MS = 30_000
const START_SCORE = 10
const CLAIM_MAX = 80
const RAISE_PENALTY = -2
const COLD_BONUS = 3
const SOMEONE_RAISED_BONUS = 1

/* ---------------------------- 内部小工具 ---------------------------- */

const authorOf = (room: Room) => {
  const d = never(room)
  return d.order[d.cursor] ?? null
}

/** 大屏此刻应该显示哪一道题：show 看 cursor，settle 阶段 cursor 已经指向下一位，要还原「刚结算的那位」 */
function shownAuthor(room: Room): string | null {
  const d = never(room)
  if (room.phase === 'show') return d.order[d.cursor] ?? null
  if (room.phase === 'settle') {
    let last: string | null = null
    for (const id of d.order) if (d.settled[id]) last = id
    return last
  }
  return null
}

/** 当前这位作者名下已经承认「我做过」的人（只算还在房间里的） */
const raisedOf = (room: Room, authorId: string | null): string[] => {
  if (!authorId) return []
  return (never(room).didIt[authorId] ?? []).filter((id) => !!byId(room, id))
}

/** 已经出题（写了句子）的人 */
const claimedOf = (room: Room) => seated(room).filter((p) => !!never(room).claims[p.id])

/** 一个人都没出题 */
const nobodyClaimed = (room: Room) => claimedOf(room).length === 0

/** 从 from 起找下一个真的出了题的人，顺手把 cursor 挪过去 */
function nextClaimed(room: Room, from: number): string | null {
  const d = never(room)
  for (let i = Math.max(0, from); i < d.order.length; i++) {
    const id = d.order[i]
    if (d.claims[id]) {
      d.cursor = i
      return id
    }
  }
  d.cursor = d.order.length
  return null
}

/** 进入举手阶段：直接公布题目全文，这才是要现场炸出来的东西 */
function enterRaise(room: Room, from: number, prelude: string) {
  const d = never(room)
  const id = nextClaimed(room, from)
  if (!id) {
    ev(room, 'judge', prelude || '题都问完了，本局结算。')
    phase(room, 'over')
    return
  }
  room.round = d.cursor + 1
  if (!d.didIt[id]) d.didIt[id] = []
  phase(room, 'show', { ms: RAISE_MS })
  if (prelude) ev(room, 'info', prelude)
  ev(room, 'info', `${nameOf(room, id)}：「${d.claims[id]}」—— 真做过的人在手机上点「我做过」，没做过的不用动。`)
}

/** 强制结束写题阶段：没出题的人跳过，一分不扣 */
function forceFromWrite(room: Room) {
  const d = never(room)
  const seats = seated(room)
  const missing = seats.filter((p) => !d.claims[p.id])
  if (missing.length) {
    ev(room, 'judge', `${clip(missing.map((p) => p.name).join('、'), 60)} 没出题，跳过他们，一分不扣。`)
  }
  if (nobodyClaimed(room)) {
    ev(room, 'judge', '没人出题，那就不扣分了，本局结束。')
    phase(room, 'over')
    return
  }
  d.cursor = 0
  enterRaise(room, 0, '')
}

/** 结算当前这位作者的举手名单 */
function settleClaim(room: Room) {
  const d = never(room)
  const author = authorOf(room)
  const p = author ? byId(room, author) : undefined
  if (!author || !p || !d.claims[author]) return
  if (d.settled[author]) return

  const raised = raisedOf(room, author)
  for (const id of raised) addScore(room, id, RAISE_PENALTY)

  const names = raised.map((id) => nameOf(room, id)).join('、')
  if (!raised.length) {
    d.cold[author] = COLD_BONUS
    addScore(room, author, COLD_BONUS)
    ev(room, 'judge', `全场没人举手——${p.name} 这题拿到冷门加成 +3。`)
  } else {
    addScore(room, author, SOMEONE_RAISED_BONUS)
    ev(
      room,
      'judge',
      `${raised.length} 人举手（${clip(names, 48)}），每人 -2；${p.name} 这题不冷门，+1。`,
    )
  }
  d.settled[author] = true

  const lead = seated(room).slice().sort((a, b) => b.score - a.score)[0]
  ev(
    room,
    'score',
    `${p.name} 现在 ${p.score} 分${lead ? `，暂时领先的是 ${lead.name}（${lead.score} 分）` : ''}。`,
  )
  phase(room, 'settle')
}

/** 灵感句式：用 round 做偏移，保证同一阶段内大屏文案不随轮询抖动 */
function ideaLines(room: Room, n = 2): string[] {
  const pool = NEVER_STARTERS
  if (!pool.length) return []
  const base = (Math.max(0, room.round) * 3) % pool.length
  const out: string[] = []
  for (let i = 0; i < n && i < pool.length; i++) {
    const line = pool[(base + i * 7) % pool.length]
    if (line && !out.includes(line)) out.push(line)
  }
  return out
}

/* ---------------------------- 引擎 ---------------------------- */

export const neverEngine: GameEngine = {
  id: 'never',

  create(room: Room) {
    const d = never(room)
    d.startScore = START_SCORE
    for (const p of room.players) p.score = START_SCORE
    d.claims = {}
    d.order = []
    d.cursor = 0
    d.didIt = {}
    d.settled = {}
    d.cold = {}
    phase(room, 'lobby')
  },

  start(room: Room) {
    const d = never(room)
    const seats = seated(room)
    d.startScore = START_SCORE
    d.order = shuffle(seats.map((p) => p.id))
    d.cursor = 0
    d.claims = {}
    d.didIt = {}
    d.settled = {}
    d.cold = {}
    for (const p of seats) {
      d.claims[p.id] = ''
      p.score = d.startScore
    }
    room.round = 1
    phase(room, 'write', { ms: WRITE_MS })
    ev(room, 'judge', `${judge('open')} 每人 ${d.startScore} 分起步，做过一件别人没做过的事才有底气。`)
    const ideas = ideaLines(room)
    if (ideas.length) {
      ev(room, 'info', `灵感句式，照这个样子造自己的题：${ideas.join('；')}。`)
    }
  },

  act(room: Room, actor: Player, action: string, payload: any) {
    const d = never(room)

    if (action === 'claim') {
      if (room.phase !== 'write') return
      if (d.claims[actor.id]) return
      const text = sanitize(payload?.text, CLAIM_MAX)
      if (!text) return
      d.claims[actor.id] = text
      const seats = seated(room).map((p) => p.id)
      if (allSubmitted(room, seats, 'claims', 'never')) {
        d.cursor = 0
        enterRaise(room, 0, `题目收齐（${seats.length} 道），开始一题一题问。`)
      }
      return
    }

    if (action === 'didIt') {
      if (room.phase !== 'show') return
      const author = authorOf(room)
      if (!author || author === actor.id) return
      if (!d.claims[author]) return
      // 选「我没有」等于没点：不记录、不撤销
      const raw = payload?.ok ?? payload?.value
      if (raw !== undefined && raw !== null) {
        const s = String(raw).toLowerCase()
        if (s === 'no' || s === 'false' || s === '0') return
      }
      if (!d.didIt[author]) d.didIt[author] = []
      if (d.didIt[author].includes(actor.id)) return
      d.didIt[author].push(actor.id)
      ev(room, 'judge', `${actor.name} 承认了：他做过。`)
      return
    }
  },

  next(room: Room, actor: Player | null) {
    const d = never(room)
    if (room.phase === 'lobby') {
      this.start(room)
      return
    }
    if (room.phase === 'write') {
      forceFromWrite(room)
      return
    }
    if (room.phase === 'show') {
      const author = authorOf(room)
      const left = seated(room).filter((p) => p.id !== author && !raisedOf(room, author).includes(p.id))
      if (left.length) ev(room, 'info', `还有 ${left.length} 个人没表态，先按已经举的手结算。`)
      settleClaim(room)
      return
    }
    if (room.phase === 'settle') {
      enterRaise(room, d.cursor + 1, '')
      return
    }
    void actor
  },

  tick(room: Room, now: number) {
    if (room.deadlineAt === null || now < room.deadlineAt) return

    if (room.phase === 'write') {
      forceFromWrite(room)
      return
    }
    if (room.phase === 'show') {
      const author = authorOf(room)
      const count = raisedOf(room, author).length
      ev(room, 'judge', `举手时间到，${count} 人承认做过，直接结算。`)
      settleClaim(room)
    }
  },

  publicData(room: Room): Record<string, any> {
    const d = never(room)
    const author = shownAuthor(room)
    const live = room.phase === 'show' || room.phase === 'settle'
    const afterLobby = room.phase !== 'lobby' && room.phase !== 'write'
    const raised = live ? raisedOf(room, author) : []
    const seats = seated(room)
    return {
      never: {
        startScore: d.startScore,
        // 写题阶段绝对不给题目内容，只给「谁已出题」
        order: afterLobby ? d.order : [],
        cursor: d.cursor,
        written: seats.filter((p) => !!d.claims[p.id]).map((p) => ({ id: p.id, name: p.name })),
        pending: seats.filter((p) => !d.claims[p.id]).map((p) => p.name),
        authorId: live ? author : null,
        authorName: live && author ? nameOf(room, author) : '',
        claim: live && author ? d.claims[author] ?? '' : '',
        raised: raised.map((id) => nameOf(room, id)),
        raisedCount: raised.length,
        quietCount:
          live && author ? seats.filter((p) => p.id !== author && !raised.includes(p.id)).length : 0,
        settled: afterLobby ? d.settled : {},
        cold: room.phase === 'over' ? d.cold : {},
        claims: room.phase === 'over' ? d.claims : null,
      },
    }
  },

  secretFor(room: Room, me: Player) {
    const d = never(room)
    const author = shownAuthor(room)
    const raised = raisedOf(room, author)
    return {
      claim: d.claims[me.id] ?? '',
      isMyTurn: !!author && author === me.id,
      raised: !!author && author !== me.id && raised.includes(me.id),
      settled: !!author && !!d.settled[author],
    }
  },

  refereeExtra(room: Room) {
    const d = never(room)
    const author = shownAuthor(room)
    const raised = raisedOf(room, author)
    const seats = seated(room)
    return {
      author: author ? nameOf(room, author) : '',
      claim: author ? d.claims[author] ?? '' : '',
      raised: raised.map((id) => nameOf(room, id)),
      quiet: seats.filter((p) => p.id !== author && !raised.includes(p.id)).map((p) => p.name),
      cold: author ? d.cold[author] ?? 0 : 0,
      note: author
        ? '手机上点「我做过」才算举手，没做过的不用点。没人举手就自动给作者冷门加成 +3，现场看着办。'
        : '按「下一步」跳到下一个人。',
    }
  },

  needs(room: Room, me: Player | null, view: RoomView): ViewNeeds {
    void view
    const d = never(room)
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
        prompt: `每人先拿 ${d.startScore || START_SCORE} 分，想一件你真的做过的事`,
        hostHint: hostHintFor(room),
      }
    }
    if (room.phase === 'write') {
      const done = !!d.claims[me.id]
      return {
        ...base,
        prompt: done ? '已交题，等其他人写完' : '出一道「我有你没有」',
        input: done ? 'none' : 'text',
        inputHint: done ? '题目会在轮到你那题时才公开。' : '用「我有你没有：……」的句式，写一件你真的做过的事',
        submitted: done,
        hostHint: hostHintFor(room),
      }
    }
    if (room.phase === 'show') {
      const author = authorOf(room)
      if (author === me.id) {
        return {
          ...base,
          prompt: '大屏念的是你的题，盯着谁举手',
          inputHint: '本人不点对自己的题。',
          submitted: true,
          hostHint: hostHintFor(room),
        }
      }
      const raised = raisedOf(room, author).includes(me.id)
      return {
        ...base,
        prompt: raised ? '你已经承认了，等结算' : '这题你做过吗？',
        input: raised ? 'none' : 'pick',
        options: [
          { value: 'yes', label: '我做过（扣 2 分）' },
          { value: 'no', label: '我没有' },
        ],
        valueKey: 'ok',
        inputHint: raised ? '扣分会在结算时公布。' : '做过就点「我做过」，没做过什么都不用点。',
        submitted: raised,
        hostHint: hostHintFor(room),
      }
    }
    if (room.phase === 'settle') {
      return {
        ...base,
        prompt: '大屏看结算：几人举手、谁拿了冷门加成',
        hostHint: hostHintFor(room),
      }
    }
    return { ...base, prompt: '本局已结束', hostHint: hostHintFor(room) }
  },

  finish(room: Room): FinalResult {
    const d = never(room)
    const ranked = rankByScore(room.players)
    const top = ranked[0]
    const bottom = ranked[ranked.length - 1]
    const winners = ranked
      .filter((r) => r.rank === 0)
      .map((r) => ({ name: r.player.name, score: r.player.score }))

    const ids = seated(room).map((p) => p.id)
    const claims = ids.filter((id) => !!d.claims[id])
    const skipped = ids.filter((id) => !d.claims[id]).map((id) => nameOf(room, id))
    const totalRaised = ids.reduce((n, id) => n + (d.didIt[id] ?? []).length, 0)
    const coldIds = Object.keys(d.cold).filter((id) => (d.cold[id] ?? 0) > 0)
    const coldest = coldIds.sort((a, b) => (d.cold[b] ?? 0) - (d.cold[a] ?? 0))[0]
    const allTied = top && bottom && top.player.score === bottom.player.score

    const lines: string[] = []
    lines.push(`${claims.length} 道题问完，全场一共举了 ${totalRaised} 次手。`)
    lines.push(
      coldest
        ? `最冷门的一题是 ${nameOf(room, coldest)} 出的：「${clip(d.claims[coldest] ?? '', 34)}」，现场无人举手。`
        : '没有一题真正冷场，你们的经历其实挺像。',
    )
    lines.push(
      top
        ? `总分最高 ${top.player.name}：${top.player.score} 分（起步 ${d.startScore || START_SCORE} 分），「全场最会藏奖」归他。`
        : '没人拿分，奖励先发不出去。',
    )
    if (allTied) {
      lines.push(`全员都是 ${bottom ? bottom.player.score : d.startScore} 分，惩罚环节你们自己石头剪刀布。`)
    } else if (bottom) {
      const losers = ranked.filter((r) => r.player.score === bottom.player.score).map((r) => r.player.name)
      lines.push(`${clip(losers.join('、'), 48)} 掉到 ${bottom.player.score} 分，惩罚环节归他们。`)
    }
    if (skipped.length) {
      lines.push(`${clip(skipped.join('、'), 48)} 一题没出，全程围观。`)
    }

    return {
      title: `${claims.length} 道题 · ${totalRaised} 次举手`,
      lines,
      winners,
      verdict:
        (top
          ? judge('award', { name: top.player.name, title: '全场最会藏奖' })
          : judge('tie')) + ' ' + judge('close'),
    }
  },
}

function hostHintFor(room: Room) {
  const d = never(room)
  switch (room.phase) {
    case 'lobby':
      return `人到齐了就点开始，系统会给每人 ${d.startScore || START_SCORE} 分并抽灵感句式。`
    case 'write': {
      const left = seated(room).filter((p) => !d.claims[p.id]).map((p) => p.name)
      return left.length
        ? `还差 ${left.length} 个人出题：${clip(left.join('、'), 40)}。等不及就按「下一步」跳过他们。`
        : '题目收齐了，马上开始一题一题问。'
    }
    case 'show': {
      const author = authorOf(room)
      const raised = raisedOf(room, author).length
      return `正在问 ${author ? nameOf(room, author) : '?'} 的题。已有 ${raised} 人承认做过，按「下一步」立刻结算。`
    }
    case 'settle':
      return '看完比分按「下一步」换下一个人，或者结束本局。'
    case 'over':
      return '按「下一步」回到结算页继续停留，或开新局。'
    default:
      return ''
  }
}
