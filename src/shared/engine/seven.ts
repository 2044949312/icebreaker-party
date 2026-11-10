import { judge } from '../judge'
import type { FinalResult, Player, Room, RoomView, SevenData, ViewNeeds } from '../types'
import type { GameEngine } from './contract'
import {
  addScore,
  byId,
  clip,
  ev,
  nameOf,
  phase,
  retime,
  seated,
  secondsLeft,
  seven,
} from './util'

const START_MS = 3000
const MIN_MS = 1200
const MAX_MISTAKES = 3

/**
 * 逢七过的唯一真相：这个数是不是「该拍桌」的数。
 * 服务端权威 count + 限时应答，把口头游戏拆成手机上能点的两个按钮。
 */
const isSevenish = (n: number) => n % 7 === 0 || String(n).includes('7')

/* ---------------------------- 圈子状态 ---------------------------- */

/** 还在圈里：进了报数顺序，没攒满三次失误，人也还在座位上 */
function inCircle(room: Room, d: SevenData, id: string | null | undefined) {
  if (!id || !d.order.includes(id)) return false
  if (d.struck.includes(id)) return false
  const p = byId(room, id)
  return !!p && p.alive
}

function circle(room: Room, d: SevenData) {
  return d.order.filter((id) => inCircle(room, d, id))
}

/** 此刻该应答的人；没人应答（圈子空了）时返回 null */
function currentId(room: Room, d: SevenData) {
  const id = d.order[d.cursor]
  return inCircle(room, d, id) ? id : null
}

/** 收尾：只在 run 阶段触发一次，分数在这里结清，finish 保持纯读 */
function enterOver(room: Room, d: SevenData) {
  if (room.phase !== 'run') return
  const rest = circle(room, d)
  const survivor = rest.length === 1 ? rest[0] : null

  for (const id of rest) addScore(room, id, id === survivor ? 5 : 3)
  for (const id of d.order) {
    const bonus = MAX_MISTAKES - 1 - (d.mistakes[id] ?? 0)
    if (bonus > 0) addScore(room, id, bonus)
  }

  phase(room, 'over')
  ev(
    room,
    'score',
    survivor
      ? `数字停在 ${d.count}，圈里只剩 ${nameOf(room, survivor)} 一个人还站着。${judge('award', { name: nameOf(room, survivor), title: '反应冠军' })}`
      : `数字停在 ${d.count}，这一圈没人笑到最后。`,
  )
}

/** 数字往下走一格，cursor 跳过已淘汰的人；只剩一个人就直接收尾 */
function stepCircle(room: Room, d: SevenData) {
  if (circle(room, d).length <= 1) {
    enterOver(room, d)
    return
  }
  const n = d.order.length
  let idx = d.cursor
  for (let i = 0; i < n; i++) {
    idx = (idx + 1) % n
    if (inCircle(room, d, d.order[idx])) {
      d.cursor = idx
      break
    }
  }
  retime(room, d.speedMs)
  const nextId = currentId(room, d)
  const nx = nextId ? byId(room, nextId) : null
  ev(room, 'info', `轮到 ${nx ? clip(nx.name, 12) : '下一位'}，数字 ${d.count}。`)
}

/** 收紧时限：数字越大越快， floor(count/5)*200 递减，最快 1.2 秒 */
function tighten(d: SevenData) {
  d.speedMs = Math.max(MIN_MS, START_MS - Math.floor(d.count / 5) * 200)
}

/**
 * 记一次失误：答错 / 超时 / 裁判现场判，三条路都走这里。
 * kind 记录的是「他实际干了什么」，how 决定播报口径。
 */
function applyMiss(
  room: Room,
  d: SevenData,
  id: string,
  kind: 'say' | 'pass',
  how: 'wrong' | 'timeout' | 'referee',
) {
  const name = nameOf(room, id)
  const expect = d.count
  d.mistakes[id] = (d.mistakes[id] ?? 0) + 1
  d.lastCall = { by: id, expect, kind, correct: false }

  if (how === 'timeout') ev(room, 'judge', judge('timeout', { name }) + ` 数字 ${expect} 就这么滑过去了。`)
  else if (how === 'referee') ev(room, 'judge', `裁判现场判给 ${name} 一次失误，数字 ${expect} 不算。`)
  else ev(room, 'judge', `数字 ${expect}，${name} 处理错了。`)

  if (d.mistakes[id] >= MAX_MISTAKES) {
    d.struck.push(id)
    const p = byId(room, id)
    if (p) {
      p.alive = false
      p.outReason = '三次失误'
    }
    ev(room, 'judge', judge('out', { name, word: '三次失误' }) + ` ${name} 三次失误攒满，离场，圈里少一个人。`)
  }

  d.count += 1
  stepCircle(room, d)
}

function startSeven(room: Room) {
  const d = seven(room)
  for (const p of seated(room)) {
    p.alive = true
    p.outReason = null
  }
  d.order = seated(room).map((p) => p.id)
  d.cursor = 0
  d.count = 1
  d.mistakes = {}
  d.struck = []
  d.lastCall = null
  d.speedMs = START_MS
  phase(room, 'run', { ms: d.speedMs })
  const first = byId(room, d.order[0])
  ev(
    room,
    'judge',
    `7 的倍数、带 7 的数都不许念出口，拍桌子喊「过」。慢半拍或者嘴瓢记一次失误，三次就离场。${judge('open')}`,
  )
  ev(room, 'info', `现在该处理数字 1，${first ? clip(first.name, 12) : '第一号'} 先来。`)
}

export const sevenEngine: GameEngine = {
  id: 'seven',

  create(room: Room) {
    const d = seven(room)
    d.count = 1
    d.order = seated(room).map((p) => p.id)
    d.cursor = 0
    d.mistakes = {}
    d.struck = []
    d.lastCall = null
    d.speedMs = START_MS
    phase(room, 'lobby')
  },

  start(room: Room) {
    startSeven(room)
  },

  act(room: Room, actor: Player, action: string, payload: any) {
    const d = seven(room)

    if (action === 'call') {
      if (room.phase !== 'run') return
      if (actor.id !== currentId(room, d)) return
      const raw = payload?.kind
      const kind = raw === 'pass' ? 'pass' : raw === 'say' ? 'say' : null
      if (!kind) return

      if ((kind === 'pass') === isSevenish(d.count)) {
        d.lastCall = { by: actor.id, expect: d.count, kind, correct: true }
        d.count += 1
        tighten(d)
        stepCircle(room, d)
      } else {
        applyMiss(room, d, actor.id, kind, 'wrong')
      }
      return
    }

    // 人类裁判模式：现场口头判定谁失误了，直接在手机上记一笔
    if (action === 'refereeMiss') {
      if (room.judgeMode !== 'human' || room.refereeId !== actor.id) return
      if (room.phase !== 'run') return
      const target = String(payload?.target ?? '')
      if (!inCircle(room, d, target)) return
      applyMiss(room, d, target, isSevenish(d.count) ? 'say' : 'pass', 'referee')
      return
    }
  },

  next(room: Room, actor: Player | null) {
    const d = seven(room)
    if (room.phase === 'lobby') {
      startSeven(room)
      return
    }
    if (room.phase === 'run') {
      // 房主放过当前这位，不记失误，数字照样往下走
      const cur = currentId(room, d)
      ev(room, 'judge', `裁判放过 ${cur ? nameOf(room, cur) : '这一位'} 的「数字 ${d.count}」，这一下不记失误。`)
      d.count += 1
      tighten(d)
      stepCircle(room, d)
      return
    }
    void actor
  },

  tick(room: Room, now: number) {
    if (room.phase !== 'run') return
    if (room.deadlineAt === null || now < room.deadlineAt) return
    const d = seven(room)
    const cur = currentId(room, d)
    if (!cur) {
      enterOver(room, d)
      return
    }
    applyMiss(room, d, cur, 'say', 'timeout')
  },

  /**
   * 脱敏要点：isSevenish 是「答案」，run 阶段绝不进 publicData，
   * 否则手机上人人都能提前算；答案只在 lastCall.correct / lastCall.expect 里事后回放，
   * 实时小抄只走 refereeExtra。
   */
  publicData(room: Room): Record<string, any> {
    const d = seven(room)
    return {
      seven: {
        count: d.count,
        order: d.order,
        cursor: d.cursor,
        current: currentId(room, d),
        mistakes: d.mistakes,
        struck: d.struck,
        lastCall: d.lastCall,
        speedMs: d.speedMs,
        aliveCount: circle(room, d).length,
      },
    }
  },

  /** 逢七过没有任何私密信息：每个人看到的公开状态完全一致 */
  secretFor(_room: Room, _me: Player) {
    return {}
  },

  refereeExtra(room: Room) {
    const d = seven(room)
    const nextSevenish: { n: number; hit: boolean }[] = []
    for (let i = 1; i <= 5; i++) {
      const n = d.count + i
      nextSevenish.push({ n, hit: isSevenish(n) })
    }
    const cur = currentId(room, d)
    return {
      expect: d.count,
      isSevenish: isSevenish(d.count),
      nextSevenish,
      note: room.phase === 'run'
        ? `该 ${cur ? nameOf(room, cur) : '没人'} 应答；这个数${isSevenish(d.count) ? '要拍桌喊过' : '要照常报出来'}。谁慢半拍或嘴瓢就点「记失误」。`
        : '不在应答阶段，无需盯人。',
    }
  },

  needs(room: Room, me: Player | null, view: RoomView): ViewNeeds {
    const d = seven(room)
    const base: ViewNeeds = {
      prompt: null,
      input: 'none',
      inputHint: '',
      submitted: false,
      hostHint: '',
    }
    const cur = currentId(room, d)
    const left = secondsLeft(room, view.serverNow)

    if (room.phase === 'lobby') {
      base.hostHint = `座位上有 ${d.order.length} 个人，人齐了点「开始这局」，从数字 1 开始。`
      if (!me) return base
      return { ...base, prompt: '围成一圈，手放桌上准备拍' }
    }

    if (room.phase === 'over') {
      base.hostHint = `本局已经结束，数字停在 ${d.count}。按「下一步」不会改分，可以直接开下一局。`
      if (!me) return base
      return { ...base, prompt: '本局结束，看榜单' }
    }

    base.hostHint = `现在处理数字 ${d.count}，应答人是 ${cur ? clip(nameOf(room, cur), 12) : '没人'}，时限还剩 ${left ?? Math.ceil(d.speedMs / 1000)} 秒。卡住了按「下一步」放过，嘴瓢了点「记失误」。`
    if (!me) return base

    if (!inCircle(room, d, me.id)) {
      return { ...base, prompt: '你已经被抬出去了，这局当个合格的观众' }
    }
    if (me.id !== cur) {
      return { ...base, prompt: '盯紧，下一个可能是你' }
    }
    return {
      ...base,
      prompt: `轮到你了，${clip(nameOf(room, me.id), 12)}`,
      input: 'pick',
      options: [
        { value: 'say', label: '报数' },
        { value: 'pass', label: '拍桌喊过' },
      ],
      valueKey: 'kind',
      inputHint: `数字 ${d.count} —— 快速决定`,
      submitted: false,
    }
  },

  /** 纯读：分数在 enterOver 里就已经结清了 */
  finish(room: Room): FinalResult {
    const d = seven(room)
    const handled = Math.max(0, d.count - 1)
    const rest = circle(room, d)
    const ranked = d.order.slice().sort((a, b) => (d.mistakes[a] ?? 0) - (d.mistakes[b] ?? 0))
    const fewest = ranked.length ? (d.mistakes[ranked[0]] ?? 0) : 0
    const best = ranked.filter((id) => (d.mistakes[id] ?? 0) === fewest)

    let winners = best.map((id) => ({ name: nameOf(room, id), score: byId(room, id)?.score ?? 0 }))
    if (!winners.length) {
      const top = room.players.slice().sort((a, b) => b.score - a.score)[0]
      if (top) winners = [{ name: top.name, score: top.score }]
    }

    return {
      title: '反应审判',
      lines: [
        `从 1 一路数到 ${handled}，一共处理了 ${handled} 个数字。`,
        ranked.length
          ? `失误统计：${ranked.map((id) => `${nameOf(room, id)} ${d.mistakes[id] ?? 0} 次`).join('、')}。`
          : '没人参与报数。',
        d.struck.length
          ? `离场顺序：${d.struck.map((id) => nameOf(room, id)).join(' → ')}。`
          : '全程没人攒满三次失误。',
        rest.length === 1
          ? `站到最后的是 ${nameOf(room, rest[0])}。`
          : rest.length
            ? `最后还留在圈里的：${rest.map((id) => nameOf(room, id)).join('、')}。`
            : '所有人都被抬走了，赢家你们自己吵。',
      ],
      winners,
      verdict:
        (winners.length ? judge('award', { name: winners.map((w) => w.name).join('、'), title: '反应冠军' }) + ' ' : '') +
        judge('close'),
    }
  },
}
