import { SPY_PAIRS } from '../content'
import { judge } from '../judge'
import type { FinalResult, Player, Room, RoomView, ViewNeeds } from '../types'
import type { GameEngine } from './contract'
import {
  addScore,
  alive,
  allSubmitted,
  byId,
  clip,
  ev,
  nameOf,
  phase,
  pick,
  randInt,
  sanitize,
  seated,
  shuffle,
  spy,
} from './util'

const DESC_MS = 40_000
const VOTE_MS = 30_000
const MAX_ROUND = 6

/** 卧底判定以词本身为唯一真相，避免额外状态漂移。 */
function idHasWord(room: Room, id: string) {
  const d = spy(room)
  const mine = d.words[id]
  return mine !== undefined && mine !== d.common
}

function insidersOf(room: Room) {
  const d = spy(room)
  return room.players.filter((p) => p.alive && d.words[p.id] && d.words[p.id] !== d.common)
}

function civiliansOf(room: Room) {
  const d = spy(room)
  return room.players.filter((p) => p.alive && d.words[p.id] === d.common)
}

/** 真人裁判只执法不发词：把他从发词、描述、投票的池子里摘出去 */
function isJudge(room: Room, id: string) {
  return room.judgeMode === 'human' && room.refereeId === id
}

function inGame(room: Room) {
  return alive(room).filter((p) => !isJudge(room, p.id))
}

function seatedInGame(room: Room) {
  return seated(room).filter((p) => !isJudge(room, p.id))
}

function startDescribe(room: Room) {
  const d = spy(room)
  d.order = shuffle(inGame(room).map((p) => p.id))
  d.descriptions = {}
  d.votes = {}
  d.tally = {}
  const first = byId(room, d.order[0])
  phase(room, 'describe', { ms: DESC_MS, turn: 0 })
  ev(room, 'judge', judge('round', { round: room.round }) + `先从 ${first?.name ?? '1 号'} 开始。`)
}

function settleVotes(room: Room, forcedOut: string | null) {
  const d = spy(room)
  const voters = inGame(room).map((p) => p.id)
  const tally: Record<string, number> = {}
  for (const v of voters) {
    const t = d.votes[v]
    if (t && byId(room, t)) tally[t] = (tally[t] ?? 0) + 1
  }
  d.tally = tally

  const entries = Object.entries(tally).sort((a, b) => b[1] - a[1])
  const top = entries[0]?.[1] ?? 0
  const tied = entries.filter(([, n]) => n === top).length > 1 && top > 0

  let outId = forcedOut ?? null
  if (!outId && !tied) outId = entries[0]?.[0] ?? null

  d.lastOut = outId
  phase(room, 'reveal')

  if (!outId) {
    ev(room, 'judge', top === 0 ? '没人投票，这轮算你们集体沉默。' : judge('safe'))
    return
  }

  d.eliminated.push(outId)
  const p = byId(room, outId)
  if (p) {
    p.alive = false
    p.outReason = `第 ${room.round} 轮被投出`
    const wasInsider = idHasWord(room, outId)
    if (wasInsider) {
      for (const v of voters) if (d.votes[v] === outId) addScore(room, v, 2)
      ev(room, 'judge', `${p.name} 出局，词是「${d.words[outId]}」——正是卧底。猜对的人各 +2。`)
    } else {
      addScore(room, outId, 1)
      ev(room, 'judge', judge('out', { name: p.name, word: d.words[outId] }) + ` 他是平民，你们自己人打自己人。`)
    }
  }
}

function checkEnd(room: Room) {
  const ins = insidersOf(room).length
  const civ = civiliansOf(room).length
  if (ins === 0) {
    spy(room).result = 'civilians'
    return true
  }
  if (ins >= civ) {
    spy(room).result = 'insider'
    return true
  }
  if (room.round >= MAX_ROUND) {
    spy(room).result = 'insider'
    return true
  }
  return false
}

export const spyEngine: GameEngine = {
  id: 'spy',

  create(room: Room) {
    const d = spy(room)
    const [common, insider] = pick(SPY_PAIRS)
    d.common = common
    d.insider = insider
    d.insiderCount = room.players.length >= 8 ? 2 : 1
    d.round = 0
    d.order = []
    d.descriptions = {}
    d.votes = {}
    d.tally = {}
    d.eliminated = []
    d.lastOut = null
    d.words = {}
    d.result = null
    phase(room, 'lobby')
  },

  start(room: Room) {
    const d = spy(room)
    const order = seatedInGame(room)
    d.insiderCount = Math.max(1, Math.min(d.insiderCount, order.length - 2))
    const insiderSeats = shuffle(order.map((p) => p.id)).slice(0, d.insiderCount)
    for (const p of order) {
      d.words[p.id] = insiderSeats.includes(p.id) ? d.insider : d.common
    }
    room.round = 1
    ev(room, 'judge', `${d.insiderCount} 个卧底藏在 ${order.length} 个人里。${judge('open')}`)
    startDescribe(room)
  },

  act(room: Room, actor: Player, action: string, payload: any) {
    const d = spy(room)

    if (action === 'describe') {
      if (room.phase !== 'describe') return
      const currentId = d.order[room.turn]
      if (actor.id !== currentId || d.descriptions[actor.id] !== undefined) return
      const text = sanitize(payload?.text, 80)
      if (!text) return
      d.descriptions[actor.id] = text
      const word = d.words[actor.id]
      if (word && text.includes(word)) {
        ev(room, 'judge', `${actor.name} 的描述里直接出现了词，裁判判定无效，请重新描述。`)
        delete d.descriptions[actor.id]
        return
      }
      const nextTurn = room.turn + 1
      const livingOrder = d.order.filter((id) => byId(room, id)?.alive)
      if (nextTurn >= livingOrder.length) {
        ev(room, 'judge', '描述完毕，开始投票。每人投一个你觉得最不像同类的人。')
        phase(room, 'vote', { ms: VOTE_MS })
      } else {
        room.turn = nextTurn
        const nx = byId(room, d.order[nextTurn])
        ev(room, 'info', `轮到 ${nx?.name ?? '?'}。`)
      }
      return
    }

    if (action === 'vote') {
      if (room.phase !== 'vote') return
      if (!actor.alive) return
      const target = String(payload?.target ?? '')
      if (!byId(room, target) || !byId(room, target)!.alive || target === actor.id) return
      d.votes[actor.id] = target
      const voters = inGame(room).map((p) => p.id)
      if (allSubmitted(room, voters, 'votes', 'spy')) {
        settleVotes(room, null)
        if (checkEnd(room)) phase(room, 'over')
      }
      return
    }

    // 人类裁判模式：裁判可以现场判定某人出局（比如自己承认、违规暴露）
    if (action === 'refereeOut') {
      if (room.judgeMode !== 'human' || room.refereeId !== actor.id) return
      if (room.phase !== 'vote' && room.phase !== 'reveal') return
      if (room.phase === 'vote') {
        settleVotes(room, String(payload?.target ?? '') || null)
        if (checkEnd(room)) phase(room, 'over')
      }
      return
    }
  },

  next(room: Room, actor: Player | null) {
    const d = spy(room)
    if (room.phase === 'lobby') {
      this.start(room)
      return
    }
    if (room.phase === 'describe') {
      // 房主跳过卡住的人
      const livingOrder = d.order.filter((id) => byId(room, id)?.alive)
      if (room.turn < livingOrder.length - 1) {
        const stuck = byId(room, livingOrder[room.turn])
        if (stuck && d.descriptions[stuck.id] === undefined) {
          d.descriptions[stuck.id] = '（跳过）'
          ev(room, 'judge', judge('hurry', { name: stuck.name }))
        }
        room.turn += 1
        return
      }
      ev(room, 'judge', '描述环节结束，投票。')
      phase(room, 'vote', { ms: VOTE_MS })
      return
    }
    if (room.phase === 'vote') {
      settleVotes(room, null)
      if (checkEnd(room)) phase(room, 'over')
      return
    }
    if (room.phase === 'reveal') {
      if (checkEnd(room)) {
        phase(room, 'over')
        return
      }
      room.round += 1
      startDescribe(room)
      return
    }
    void actor
  },

  tick(room: Room, now: number) {
    if (room.phase !== 'describe' && room.phase !== 'vote') return
    if (room.deadlineAt === null || now < room.deadlineAt) return

    if (room.phase === 'describe') {
      const d = spy(room)
      const livingOrder = d.order.filter((id) => byId(room, id)?.alive)
      const cur = byId(room, livingOrder[room.turn])
      if (cur && d.descriptions[cur.id] === undefined) {
        d.descriptions[cur.id] = '（超时）'
        ev(room, 'judge', judge('timeout', { name: cur.name }))
      }
      if (room.turn >= livingOrder.length - 1) {
        phase(room, 'vote', { ms: VOTE_MS })
      } else {
        room.turn += 1
        phase(room, 'describe', { ms: DESC_MS, turn: room.turn })
      }
      return
    }

    if (room.phase === 'vote') {
      const d = spy(room)
      for (const p of alive(room)) {
        if (d.votes[p.id] === undefined) {
          const targets = alive(room).filter((x) => x.id !== p.id)
          if (targets.length) d.votes[p.id] = targets[randInt(0, targets.length - 1)].id
        }
      }
      settleVotes(room, null)
      if (checkEnd(room)) phase(room, 'over')
    }
  },

  publicData(room: Room): Record<string, any> {
    const d = spy(room)
    const show = room.phase === 'reveal' || room.phase === 'over'
    const livingOrder = d.order.filter((id) => byId(room, id)?.alive)
    return {
      spy: {
        common: show ? d.common : '',
        insider: show ? d.insider : '',
        insiderCount: d.insiderCount,
        round: d.round,
        order: d.order,
        livingOrder,
        descriptions: show || room.phase === 'vote' ? d.descriptions : pickMasked(d),
        votes: show ? d.votes : {},
        tally: show ? d.tally : {},
        eliminated: d.eliminated,
        lastOut: show ? d.lastOut : null,
        result: d.result,
        aliveCount: alive(room).length,
      },
    }
  },

  secretFor(room: Room, me: Player) {
    const d = spy(room)
    const word = d.words[me.id]
    const out: Record<string, unknown> = {}
    if (word) out.word = word
    if (room.phase === 'over') {
      out.common = d.common
      out.insider = d.insider
      out.wasInsider = !!word && word !== d.common
    }
    if (!me.alive && d.eliminated.includes(me.id)) out.eliminated = true
    return out
  },

  refereeExtra(room: Room) {
    const d = spy(room)
    return {
      answer: `${d.common} / ${d.insider}`,
      insiderSeats: room.players.filter((p) => d.words[p.id] && d.words[p.id] !== d.common).map((p) => p.name),
      pending: alive(room).filter((p) => d.votes[p.id] === undefined).map((p) => p.name),
      note: d.result ? '' : '可以手动判定某人出局，或替大家推进轮次。',
    }
  },

  needs(room: Room, me: Player | null, view: RoomView): ViewNeeds {
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
      return { ...base, prompt: '看清自己的词，别被旁边的人瞄到', hostHint: hostHintFor(room) }
    }
    if (!me.alive) {
      return {
        ...base,
        prompt: '你已经出局了，这轮当个安静的观众',
        hostHint: hostHintFor(room),
      }
    }

    const d = spy(room)
    if (isJudge(room, me.id)) {
      const pending = inGame(room).filter((p) => d.votes[p.id] === undefined)
      return {
        ...base,
        prompt:
          room.phase === 'vote'
            ? pending.length
              ? `还有 ${pending.length} 个人没投票：${pending.map((p) => p.name).join('、')}`
              : '票齐了，等大屏公布票型'
            : '你是本局裁判，不发词、不投票，只用执法',
        hostHint: hostHintFor(room),
      }
    }
    if (room.phase === 'describe') {
      const currentId = d.order[room.turn]
      const mine = currentId === me.id
      const done = d.descriptions[me.id] !== undefined
      return {
        ...base,
        prompt: mine ? '轮到你了，说一句描述' : done ? '你已经说过了，等其他人' : '等着，别剧透',
        input: mine && !done ? 'textarea' : 'none',
        inputHint: `你的词是「${d.words[me.id] ?? ''}」，用一句话描述它，不能出现这个词本身`,
        submitted: done,
        hostHint: hostHintFor(room),
      }
    }
    if (room.phase === 'vote') {
      const done = d.votes[me.id] !== undefined
      const targets = (view.players ?? []).filter((p) => p.alive && p.id !== me.id && !isJudge(room, p.id))
      return {
        ...base,
        prompt: done ? '已投票，等票型公布' : '投一个你觉得最不像同类的人',
        input: done ? 'none' : 'pick',
        options: targets.map((p) => ({ value: p.id, label: p.name })),
        valueKey: 'target',
        inputHint: '不能投自己',
        submitted: done,
        hostHint: hostHintFor(room),
      }
    }
    if (room.phase === 'reveal') {
      return { ...base, prompt: '大屏看结果', hostHint: hostHintFor(room) }
    }
    return { ...base, prompt: '本局已结束', hostHint: hostHintFor(room) }
  },

  finish(room: Room): FinalResult {
    const d = spy(room)
    const sorted = room.players.slice().sort((a, b) => b.score - a.score)
    const winners = sorted.slice(0, Math.max(1, sorted.filter((p) => p.score === sorted[0]?.score).length))
    const result = d.result === 'insider' ? '卧底方获胜' : '平民方获胜'
    const survived = room.players.filter((p) => d.words[p.id] !== d.common && p.alive)
    return {
      title: `${result} · 历时 ${d.round} 轮`,
      lines: [
        `大众词「${d.common}」，卧底词「${d.insider}」。`,
        survived.length
          ? `卧底 ${survived.map((p) => p.name).join('、')} 活到了最后。`
          : '卧底被全部揪出来了。',
        d.eliminated.length
          ? `出局顺序：${d.eliminated.map((id) => nameOf(room, id)).join(' → ')}`
          : '居然没有人被淘汰过。',
      ],
      winners: winners.map((p) => ({ name: p.name, score: p.score })),
      verdict: (d.result === 'insider' ? judge('winBad') : judge('winGood')) + ' ' + judge('close'),
    }
  },
}

/** 描述阶段中：只公开「谁说过了」，不公开内容，避免大屏提前爆料 */
function pickMasked(d: { order: string[]; descriptions: Record<string, string> }) {
  const out: Record<string, string> = {}
  for (const id of d.order) {
    if (d.descriptions[id] !== undefined) out[id] = '••••'
  }
  return out
}

function hostHintFor(room: Room) {
  switch (room.phase) {
    case 'lobby':
      return '人到齐了就点开始，系统会自动发词。'
    case 'describe': {
      const d = spy(room)
      const cur = byId(room, d.order[room.turn])
      return `现在等 ${cur ? clip(cur.name, 12) : '?'} 描述。卡住了按「下一步」跳过。`
    }
    case 'vote':
      return '投票中。所有人投完会自动公布，也可以按「下一步」强制结算。'
    case 'reveal':
      return '看完结果按「下一步」进入新一轮，或者结束本局。'
    case 'over':
      return '按「下一步」回到结算页继续停留，或开新局。'
    default:
      return ''
  }
}
