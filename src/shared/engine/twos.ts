import { TWOS_ANGLES } from '../content'
import { judge, rankByScore } from '../judge'
import type { FinalResult, Player, Room, RoomView, TwosCard, ViewNeeds } from '../types'
import type { GameEngine } from './contract'
import { addScore, byId, clip, ev, nameOf, phase, sanitize, seated, shuffle, twos } from './util'

const WRITE_MS = 90_000
const VOTE_MS = 90_000
const STATEMENT_MAX = 60
const LABELS = ['第一条', '第二条', '第三条']

/* ---------------------------- 内部小工具 ---------------------------- */

function cardOf(room: Room, id: string | null | undefined): TwosCard | null {
  if (!id) return null
  return twos(room).cards[id] ?? null
}

/** 本局真的写出三条的人 */
const writersOf = (room: Room) => seated(room).filter((p) => !!twos(room).cards[p.id])

/** 当前该给谁投票（作者本人不投自己） */
const votersOf = (room: Room, authorId: string | null) =>
  seated(room).filter((p) => p.id !== authorId)

const votesOf = (room: Room, authorId: string | null): Record<string, number> =>
  authorId ? twos(room).votes[authorId] ?? {} : {}

function tallyOf(card: TwosCard | null, votes: Record<string, number>) {
  const tally = [0, 0, 0]
  if (!card) return tally
  for (const n of Object.values(votes)) {
    if (n === 0 || n === 1 || n === 2) tally[n] += 1
  }
  return tally
}

/** 从 from 起找下一个真的写了三条的人，顺手把 cursor 挪过去；没有则返回 null */
function skipEmpty(room: Room, from: number): string | null {
  const d = twos(room)
  for (let i = Math.max(0, from); i < d.order.length; i++) {
    const id = d.order[i]
    if (d.cards[id]) {
      d.cursor = i
      return id
    }
  }
  d.cursor = d.order.length
  return null
}

/** 进入「公开 + 投票」。prelude 是先播的一句大屏文案，可以给空串 */
function enterShow(room: Room, from: number, prelude: string) {
  const d = twos(room)
  const id = skipEmpty(room, from)
  if (!id) {
    ev(room, 'judge', '没有可公开的三条了，这局就地收摊。')
    phase(room, 'over')
    return
  }
  room.round = d.cursor + 1
  if (!d.votes[id]) d.votes[id] = {}
  phase(room, 'show', { ms: VOTE_MS })
  if (prelude) ev(room, 'info', prelude)
  ev(room, 'info', `现在公开 ${nameOf(room, id)} 的三条，其他人猜哪一条是编的。`)
}

/** 写阶段的正常收口：所有人交齐，公布发言顺序（只有名字，绝不带内容） */
function openShow(room: Room) {
  const d = twos(room)
  d.cursor = 0
  const names = d.order.map((id) => nameOf(room, id)).join(' → ')
  enterShow(room, 0, `三条收齐。发言顺序：${names}。`)
}

/** 强制推进：没写的人逐个跳过并说明 */
function forceFromWrite(room: Room) {
  const d = twos(room)
  const seats = seated(room)
  const missing = seats.filter((p) => !d.cards[p.id])
  if (missing.length) {
    ev(room, 'judge', `${clip(missing.map((p) => p.name).join('、'), 60)} 没交三条，跳过他们，大屏不念没写的人。`)
  }
  if (missing.length === seats.length) {
    ev(room, 'judge', '一个人都没写，那就不猜了，本局结束。')
    phase(room, 'over')
    return
  }
  d.waiting = writersOf(room).length
  d.cursor = 0
  enterShow(room, 0, '')
}

/** 结算当前这位作者的票：猜对 +2，作者按骗到的人数加分 */
function settleAuthor(room: Room) {
  const d = twos(room)
  const author = d.order[d.cursor]
  const card = cardOf(room, author)
  if (!author || !card) return

  const votes = votesOf(room, author)
  const picked = Object.keys(votes).filter((id) => !!byId(room, id))
  const correctIds = picked.filter((id) => votes[id] === card.lieIndex)
  const fooled = picked.length - correctIds.length
  const abstain = votersOf(room, author).length - picked.length

  d.fooled[author] = fooled
  d.revealed[author] = true

  for (const id of correctIds) addScore(room, id, 2)
  addScore(room, author, fooled === 0 ? 5 : fooled)

  ev(
    room,
    'judge',
    `${nameOf(room, author)} 的假话是${LABELS[card.lieIndex]}「${clip(card.statements[card.lieIndex] ?? '', 40)}」，共 ${fooled} 人上当${abstain > 0 ? `，${abstain} 人没来得及投` : ''}。`,
  )
  const hitNames = correctIds.map((id) => nameOf(room, id)).join('、')
  ev(
    room,
    'score',
    hitNames
      ? `猜中的 ${clip(hitNames, 48)} 各 +2；${nameOf(room, author)} ${fooled === 0 ? '骗过全场 +5' : `骗到 ${fooled} 人 +${fooled}`}。`
      : `没人猜中，${nameOf(room, author)} 骗过全场 +5。`,
  )
  phase(room, 'reveal')
}

/** 每人猜中了几条（评「最会读人奖」），完全从票数反推，不另存状态 */
function readerStats(room: Room) {
  const d = twos(room)
  const out: Record<string, number> = {}
  for (const author of d.order) {
    const card = d.cards[author]
    if (!card || !d.revealed[author]) continue
    for (const [voter, index] of Object.entries(d.votes[author] ?? {})) {
      if (index === card.lieIndex) out[voter] = (out[voter] ?? 0) + 1
    }
  }
  return out
}

/** 用 room.round 做下标取角度，保证同一阶段里提示不随轮询抖动 */
function angleHint(room: Room) {
  const pool = TWOS_ANGLES
  if (!pool.length) return '写三条，挑一条编：编的那条要像真的，真的那条要像编的。'
  const base = (Math.max(0, room.round - 1) * 3) % pool.length
  const idx = [base, (base + 7) % pool.length, (base + 13) % pool.length]
  return `可以试试：${idx.map((i) => pool[i]).join(' / ')}。`
}

/* ---------------------------- 引擎 ---------------------------- */

export const twosEngine: GameEngine = {
  id: 'twos',

  create(room: Room) {
    const d = twos(room)
    d.cards = {}
    d.order = []
    d.cursor = 0
    d.votes = {}
    d.revealed = {}
    d.fooled = {}
    d.waiting = 0
    phase(room, 'lobby')
  },

  start(room: Room) {
    const d = twos(room)
    const seats = seated(room)
    d.order = shuffle(seats.map((p) => p.id))
    d.cursor = 0
    d.cards = {}
    d.votes = {}
    d.revealed = {}
    d.fooled = {}
    d.waiting = 0
    for (const p of seats) d.cards[p.id] = null
    room.round = 1
    phase(room, 'write', { ms: WRITE_MS })
    ev(room, 'judge', `${judge('open')} 每人三件关于自己的事，其中一件是编的。`)
    ev(room, 'info', `${seats.length} 个人全部交齐就自动开始互猜。`)
  },

  act(room: Room, actor: Player, action: string, payload: any) {
    const d = twos(room)

    if (action === 'write') {
      if (room.phase !== 'write') return
      if (d.cards[actor.id]) return
      const raw = Array.isArray(payload?.statements) ? payload.statements : []
      if (raw.length !== 3) return
      const statements = raw.map((s: unknown) => sanitize(s, STATEMENT_MAX))
      if (statements.some((s: string) => !s)) return
      const lie = Number(payload?.lieIndex)
      if (lie !== 0 && lie !== 1 && lie !== 2) return

      d.cards[actor.id] = { statements, lieIndex: lie }
      d.waiting = writersOf(room).length
      ev(room, 'info', `${actor.name} 交了三条（${d.waiting}/${seated(room).length}）。`)
      if (writersOf(room).length === seated(room).length) openShow(room)
      return
    }

    if (action === 'vote') {
      if (room.phase !== 'show') return
      const author = d.order[d.cursor]
      if (!author || author === actor.id) return
      if (!d.cards[author]) return
      const index = Number(payload?.index)
      if (index !== 0 && index !== 1 && index !== 2) return
      if (!d.votes[author]) d.votes[author] = {}
      if (d.votes[author][actor.id] !== undefined) return

      d.votes[author][actor.id] = index
      const left = votersOf(room, author).filter((p) => d.votes[author][p.id] === undefined)
      if (!left.length) settleAuthor(room)
      return
    }
  },

  next(room: Room, actor: Player | null) {
    const d = twos(room)
    if (room.phase === 'lobby') {
      this.start(room)
      return
    }
    if (room.phase === 'write') {
      forceFromWrite(room)
      return
    }
    if (room.phase === 'show') {
      const author = d.order[d.cursor]
      const left = votersOf(room, author).filter((p) => votesOf(room, author)[p.id] === undefined)
      if (left.length) ev(room, 'info', `还有 ${left.length} 个人没投，按已收到的票结算。`)
      settleAuthor(room)
      return
    }
    if (room.phase === 'reveal') {
      enterShow(room, d.cursor + 1, '')
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
      const d = twos(room)
      const author = d.order[d.cursor]
      const left = votersOf(room, author).filter((p) => votesOf(room, author)[p.id] === undefined)
      if (left.length) {
        ev(room, 'judge', `${clip(left.map((x) => x.name).join('、'), 48)} 投票超时，这轮算弃权。`)
      }
      settleAuthor(room)
    }
  },

  publicData(room: Room): Record<string, any> {
    const d = twos(room)
    const author = d.order[d.cursor] ?? null
    const card = cardOf(room, author)
    const votes = votesOf(room, author)
    const isShow = room.phase === 'show'
    const isReveal = room.phase === 'reveal' || room.phase === 'over'
    // 写阶段连「谁写了什么」都不能出现，只给谁交了
    const showText = isShow || isReveal
    const seats = seated(room)
    return {
      twos: {
        order: showText ? d.order : [],
        cursor: d.cursor,
        authorId: showText ? author : null,
        authorName: showText && author ? nameOf(room, author) : '',
        statements: showText && card ? card.statements : null,
        lieIndex: isReveal && card ? card.lieIndex : null,
        tally: isReveal && card ? tallyOf(card, votes) : null,
        votedCount: Object.keys(votes).length,
        votedNames: isReveal ? Object.keys(votes).map((id) => nameOf(room, id)) : [],
        written: seats.filter((p) => !!d.cards[p.id]).map((p) => ({ id: p.id, name: p.name })),
        skipped: showText ? seats.filter((p) => !d.cards[p.id]).map((p) => p.name) : [],
        waiting: d.waiting,
        fooled: isReveal ? d.fooled : {},
        revealed: isReveal ? d.revealed : {},
        cards: room.phase === 'over' ? d.cards : null,
      },
    }
  },

  secretFor(room: Room, me: Player) {
    const d = twos(room)
    const author = d.order[d.cursor] ?? null
    const out: Record<string, unknown> = { card: d.cards[me.id] ?? null }
    if (author && author !== me.id) {
      const mine = votesOf(room, author)[me.id]
      out.myVote = mine === undefined ? null : mine
      out.myVoteLabel = mine === undefined ? '' : LABELS[mine] ?? ''
    }
    if (room.phase === 'over') {
      out.fooled = d.fooled[me.id] ?? null
      out.guessedRight = readerStats(room)[me.id] ?? 0
    }
    return out
  },

  refereeExtra(room: Room) {
    const d = twos(room)
    const author = d.order[d.cursor] ?? null
    const card = cardOf(room, author)
    const votes = votesOf(room, author)
    const voters = votersOf(room, author)
    return {
      author: author ? nameOf(room, author) : '',
      lieIndex: card ? card.lieIndex : null,
      lieText: card ? card.statements[card.lieIndex] ?? '' : '',
      picks: voters.map((p) => ({
        name: p.name,
        pick: votes[p.id] === undefined ? '还没投' : LABELS[votes[p.id]] ?? '?',
        right: card ? votes[p.id] === card.lieIndex : false,
      })),
      pending: voters.filter((p) => votes[p.id] === undefined).map((p) => p.name),
      note: card
        ? '答案只在你这一屏，别念出声。票收齐会自动揭晓，卡住就按「下一步」提前结算。'
        : '这一位没写三条，按「下一步」跳到下一个人。',
    }
  },

  needs(room: Room, me: Player | null, view: RoomView): ViewNeeds {
    void view
    const d = twos(room)
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
        prompt: '提前想好三件关于你的事，其中一件是编的',
        hostHint: hostHintFor(room),
      }
    }
    if (room.phase === 'write') {
      const done = !!d.cards[me.id]
      return {
        ...base,
        prompt: done ? '已提交，等其他人写完' : '写下你的三条，其中一条是假的',
        input: done ? 'none' : 'three',
        inputHint: done ? '等其他人交齐就开场。' : angleHint(room),
        submitted: done,
        hostHint: hostHintFor(room),
      }
    }
    if (room.phase === 'show') {
      const author = d.order[d.cursor] ?? null
      if (author === me.id) {
        return {
          ...base,
          prompt: '这三条是你的，念的时候别笑场',
          inputHint: '本人不参与自己的投票，等着看谁上当。',
          submitted: true,
          hostHint: hostHintFor(room),
        }
      }
      const mine = votesOf(room, author)[me.id]
      const voted = mine !== undefined
      return {
        ...base,
        prompt: voted ? '已投票，等大屏揭晓' : `猜 ${nameOf(room, author)} 的哪一条是编的`,
        input: voted ? 'none' : 'pick',
        options: LABELS.map((label, value) => ({ value, label })),
        valueKey: 'index',
        inputHint: voted ? '揭晓的时候见分晓。' : '猜中 +2，被他骗过去的人替他数钱。',
        submitted: voted,
        hostHint: hostHintFor(room),
      }
    }
    if (room.phase === 'reveal') {
      return {
        ...base,
        prompt: '大屏看揭晓：假的那条是哪条、几个人上当',
        hostHint: hostHintFor(room),
      }
    }
    return { ...base, prompt: '本局已结束', hostHint: hostHintFor(room) }
  },

  finish(room: Room): FinalResult {
    const d = twos(room)
    const ranked = rankByScore(room.players)
    const top = ranked[0]
    const bottom = ranked[ranked.length - 1]
    const winners = ranked
      .filter((r) => r.rank === 0)
      .map((r) => ({ name: r.player.name, score: r.player.score }))

    const revealedIds = d.order.filter((id) => d.revealed[id] && d.cards[id])
    const actorBest = revealedIds
      .map((id) => ({ id, fooled: d.fooled[id] ?? 0 }))
      .sort((a, b) => b.fooled - a.fooled)[0]
    const readerBest = Object.entries(readerStats(room)).sort((a, b) => b[1] - a[1])[0]
    const totalVotes = d.order.reduce((n, id) => n + Object.keys(d.votes[id] ?? {}).length, 0)
    const skipped = seated(room).filter((p) => !d.cards[p.id]).map((p) => p.name)

    const lines: string[] = []
    lines.push(`揭了 ${revealedIds.length} 个人的三条，一共收到 ${totalVotes} 张票。`)
    lines.push(
      actorBest && actorBest.fooled > 0
        ? `${nameOf(room, actorBest.id)} 一个人骗到 ${actorBest.fooled} 个人，全场最会藏。`
        : '没人被骗到，你们的直觉有点吓人。',
    )
    lines.push(
      readerBest
        ? `${byId(room, readerBest[0])?.name ?? '某人'} 猜中 ${readerBest[1]} 条假话，「最会读人奖」归他。`
        : '这一场没人猜中，读人这项能力建议回炉。',
    )
    lines.push(
      skipped.length
        ? `${clip(skipped.join('、'), 48)} 一直没交三条，全程当观众。`
        : `每个人都交齐了三条${top ? `，总分最高 ${top.player.name}（${top.player.score} 分）` : ''}。`,
    )
    if (bottom && top && bottom.player.score !== top.player.score) {
      lines.push(`垫底的是 ${bottom.player.name}（${bottom.player.score} 分），按规矩讲一件真事当惩罚。`)
    }

    return {
      title: `两真一假 · 揭穿 ${revealedIds.length} 人`,
      lines,
      winners,
      verdict:
        (actorBest && actorBest.fooled > 0
          ? judge('award', { name: nameOf(room, actorBest.id), title: '最佳演技奖' })
          : judge('tie')) + ' ' + judge('close'),
    }
  },
}

function hostHintFor(room: Room) {
  const d = twos(room)
  switch (room.phase) {
    case 'lobby':
      return '人到齐了就点开始，大家在手机上写三条。'
    case 'write': {
      const left = seated(room).filter((p) => !d.cards[p.id]).map((p) => p.name)
      return left.length
        ? `还差 ${left.length} 个人：${clip(left.join('、'), 40)}。卡住了按「下一步」跳过他们。`
        : '都交齐了，马上进入互猜。'
    }
    case 'show': {
      const author = d.order[d.cursor] ?? null
      const left = votersOf(room, author).filter((p) => votesOf(room, author)[p.id] === undefined)
      return `正在猜 ${author ? nameOf(room, author) : '?'} 的三条。还差 ${left.length} 个人投票，也可以按「下一步」提前结算。`
    }
    case 'reveal':
      return '看完揭晓按「下一步」换下一个人，或者结束本局。'
    case 'over':
      return '按「下一步」回到结算页继续停留，或开新局。'
    default:
      return ''
  }
}
