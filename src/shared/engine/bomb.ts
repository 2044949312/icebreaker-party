import { judge, rankByScore } from '../judge'
import type { BombData, FinalResult, Player, Room, RoomView, ViewNeeds } from '../types'
import type { GameEngine } from './contract'
import { addScore, byId, bomb, ev, nameOf, phase, pick, randInt, retime, shuffle } from './util'

/* ----------------------------- 常量 ----------------------------- */

/** 每人报数的时限 */
const HUNT_MS = 15_000
/** 总轮数 */
const MAX_ROUND = 3
const MIN_VALUE = 1
const MAX_VALUE = 100
/** 活过一轮的安全分 */
const SAFE_POINTS = 1

const PRESS_NORMAL = [
  '安全。区间又紧了一格，概率就大了一格。',
  '没炸，别高兴太早，下一个继续。',
  '活着的人排队，别插队。',
]
const PRESS_TIGHT = [
  '区间只剩个位数的可能了，现在报数等于在刀尖上排队。',
  '剩下的数一只手数得过来，谁开口谁心虚。',
  '这已经是近距离接触了，屏住呼吸。',
]
const PRESS_DEADLY = [
  '这不叫猜数字，这叫抽签。',
  '就剩这么两三个数，下一张嘴基本预定惩罚。',
  '我看着大屏都替下一个人数手心出汗。',
]

/* ----------------------------- 内部工具 ----------------------------- */

function widthOf(d: BombData) {
  return Math.max(0, d.high - d.low)
}

function sizeOf(d: BombData) {
  return Math.max(0, d.high - d.low + 1)
}

function currentId(d: BombData) {
  return d.order[d.cursor] ?? null
}

function currentName(room: Room, d: BombData) {
  const p = byId(room, currentId(d) ?? '')
  return p?.name ?? '下一位'
}

function boomCount(d: BombData, id: string) {
  return d.booms[id] ?? 0
}

/** 开新一轮：重新埋雷、复位区间、重洗牌顺序 */
function newRound(room: Room) {
  const d = bomb(room)
  d.target = randInt(MIN_VALUE, MAX_VALUE)
  d.low = MIN_VALUE
  d.high = MAX_VALUE
  d.history = []
  d.order = shuffle(room.players.map((p) => p.id))
  d.cursor = 0
  d.loser = null
  // round 同时镜像到 room.round，大屏的「第 X 轮」标签直接读它
  phase(room, 'hunt', { ms: HUNT_MS, round: d.round })
  ev(
    room,
    'judge',
    `第 ${d.round} 颗雷已经埋进 ${MIN_VALUE} 到 ${MAX_VALUE} 之间，全场没人知道是哪个。先从 ${currentName(room, d)} 开始，15 秒一个。`,
  )
}

/** 换到下一个报数的人 */
function advance(room: Room) {
  const d = bomb(room)
  if (d.order.length === 0) {
    retime(room, HUNT_MS)
    return
  }
  d.cursor = (d.cursor + 1) % d.order.length
  retime(room, HUNT_MS)
}

/** 每轮结束时，安全活下来的人各 +1，保证结算页有排序意义 */
function awardSafe(room: Room) {
  const d = bomb(room)
  let safe = 0
  for (const p of room.players) {
    if (p.id === d.loser) continue
    addScore(room, p.id, SAFE_POINTS)
    safe += 1
  }
  ev(
    room,
    'score',
    `${d.loser ? nameOf(room, d.loser) : '上一个人'} 踩响了雷，剩下 ${safe} 个人安全过关，各 +${SAFE_POINTS}。`,
  )
}

/** 结算时把踩雷次数换算成正分：一轮没踩的人补得分高，踩得越多补得越少 */
function settleBoomBonus(room: Room) {
  const d = bomb(room)
  for (const p of room.players) {
    addScore(room, p.id, Math.max(0, d.maxRound - boomCount(d, p.id)))
  }
}

function toOver(room: Room) {
  const d = bomb(room)
  if (room.phase === 'over') return
  settleBoomBonus(room)
  phase(room, 'over')
  const worst = worstBoomer(room, d)
  ev(
    room,
    'judge',
    `${d.round} 轮打完了。最后一轮的雷是 ${d.target}，${
      worst ? `踩得最狠的是 ${worst.name}（${worst.n} 次），惩罚环节归他。` : '居然没人踩响，惩罚环节你们自己商量。'
    }`,
  )
  ev(room, 'judge', judge('close'))
}

function worstBoomer(room: Room, d: BombData) {
  let target: { name: string; n: number } | null = null
  for (const p of room.players) {
    const n = boomCount(d, p.id)
    if (n > 0 && (!target || n > target.n)) target = { name: p.name, n }
  }
  return target
}

function boomsLine(room: Room, d: BombData) {
  const rows = room.players
    .map((p) => ({ name: p.name, n: boomCount(d, p.id) }))
    .sort((a, b) => b.n - a.n || a.name.localeCompare(b.name, 'zh'))
  if (!rows.length) return '没人参与报数。'
  return `踩雷榜：${rows.map((r) => `${r.name} ×${r.n}`).join('、')}。`
}

function hostHintFor(room: Room) {
  const d = bomb(room)
  switch (room.phase) {
    case 'lobby':
      return `开始后系统在 ${MIN_VALUE}~${MAX_VALUE} 之间随机埋一个数，按洗好的顺序轮流报，共 ${MAX_ROUND} 轮。人齐了点开始。`
    case 'hunt':
      return `第 ${d.round}/${d.maxRound} 轮，区间 ${d.low}~${d.high}，还剩 ${sizeOf(d)} 个数，下一个是 ${currentName(room, d)}。${
        widthOf(d) <= 2 ? '已经很悬了，盯紧他。' : '卡住就按「下一步」跳过这个人。'
      }`
    case 'boom':
      return `这轮的雷是 ${d.target}，被 ${nameOf(room, d.loser)} 踩中。按「下一步」${
        d.round < d.maxRound ? `进入第 ${d.round + 1} 轮` : '收尾进结算'
      }。`
    case 'over':
      return '结算页已生成，按「下一步」继续停留或开新局。'
    default:
      return ''
  }
}

/* ----------------------------- 引擎 ----------------------------- */

export const bombEngine: GameEngine = {
  id: 'bomb',

  create(room: Room) {
    const d = bomb(room)
    d.low = MIN_VALUE
    d.high = MAX_VALUE
    d.target = randInt(MIN_VALUE, MAX_VALUE)
    d.history = []
    d.order = []
    d.cursor = 0
    d.round = 0
    d.maxRound = MAX_ROUND
    d.booms = {}
    d.loser = null
    // 犹豫次数没有专属字段，借用通用的 room.turn 记全场累计（不算踩雷）
    room.turn = 0
    room.round = 0
    phase(room, 'lobby')
  },

  start(room: Room) {
    const d = bomb(room)
    d.maxRound = MAX_ROUND
    d.round = 1
    d.booms = {}
    d.loser = null
    room.turn = 0
    ev(room, 'judge', judge('open') + ` 我在 ${MIN_VALUE} 到 ${MAX_VALUE} 之间埋了一个数，${MAX_ROUND} 轮，谁踩谁上惩罚。`)
    newRound(room)
  },

  act(room: Room, actor: Player, action: string, payload: any) {
    const d = bomb(room)

    if (action === 'guess') {
      if (room.phase !== 'hunt') return
      // 只有轮到的人能报数，其他人点了当没发生
      if (actor.id !== currentId(d)) return

      const raw = payload?.value
      if (raw === null || raw === undefined || raw === '') return
      const value = Math.trunc(Number(raw))
      if (!Number.isFinite(value)) return
      if (value < MIN_VALUE || value > MAX_VALUE || value < d.low || value > d.high) {
        // 越界不惩罚，诚实报错也要给个台阶
        ev(room, 'info', `${actor.name} 报的 ${value} 不在 ${d.low}~${d.high} 里，这个数不算，重新报一个。`)
        return
      }

      d.history.push({ by: actor.id, value })

      if (value === d.target) {
        d.booms[actor.id] = boomCount(d, actor.id) + 1
        d.loser = actor.id
        phase(room, 'boom')
        ev(
          room,
          'judge',
          `嘭！${actor.name} 报的 ${value} 就是那颗雷。第 ${d.round} 轮的雷在这里，踩雷记账 +1。`,
        )
        return
      }

      if (value < d.target) d.low = Math.max(d.low, value + 1)
      else d.high = Math.min(d.high, value - 1)

      d.cursor = d.order.length ? (d.cursor + 1) % d.order.length : 0
      retime(room, HUNT_MS)

      const width = widthOf(d)
      const pressure = pick(width <= 2 ? PRESS_DEADLY : width <= 5 ? PRESS_TIGHT : PRESS_NORMAL)
      ev(
        room,
        'judge',
        `${actor.name} 报 ${value}，没炸。区间夹到 ${d.low} ~ ${d.high}，还剩 ${sizeOf(d)} 个数。${pressure} 轮到 ${currentName(room, d)}。`,
      )
      return
    }
  },

  next(room: Room, actor: Player | null) {
    const d = bomb(room)
    if (room.phase === 'lobby') {
      this.start(room)
      return
    }
    if (room.phase === 'hunt') {
      // 房主替卡住的人跳过：不算踩雷，只是换人
      ev(room, 'judge', judge('hurry', { name: currentName(room, d) }))
      advance(room)
      return
    }
    if (room.phase === 'boom') {
      awardSafe(room)
      if (d.round < d.maxRound) {
        d.round += 1
        newRound(room)
      } else {
        toOver(room)
      }
      return
    }
    void actor
  },

  tick(room: Room, now: number) {
    if (room.phase !== 'hunt') return
    const d = bomb(room)

    // 中途有人退出：跳过不在场的当前人，别让全场干等
    const cur = byId(room, currentId(d) ?? '')
    if (!cur) {
      // 一个能报数的人都不剩就安静等着，避免每个 tick 刷屏
      if (!d.order.some((id) => byId(room, id))) return
      advance(room)
      ev(room, 'info', '这位不在现场，先跳过，继续报数。')
      return
    }
    if (room.deadlineAt === null || now < room.deadlineAt) return

    // 超时只记犹豫，不记踩雷
    room.turn += 1
    ev(room, 'judge', `${judge('timeout', { name: cur.name })} 犹豫不算踩雷，但全房间都听见了。`)
    advance(room)
  },

  publicData(room: Room): Record<string, any> {
    const d = bomb(room)
    const revealed = room.phase === 'boom' || room.phase === 'over'
    return {
      bomb: {
        low: d.low,
        high: d.high,
        size: sizeOf(d),
        width: widthOf(d),
        history: d.history,
        round: d.round,
        maxRound: d.maxRound,
        order: d.order,
        cursor: d.cursor,
        current: currentId(d),
        booms: d.booms,
        hesitations: room.turn,
        // 'hunt' 阶段雷和上一轮的输家都不给
        target: revealed ? d.target : null,
        loser: revealed ? d.loser : null,
        judgeMode: room.judgeMode,
      },
    }
  },

  secretFor(_room: Room, _me: Player) {
    // 数字炸弹没有私密信息：区间、顺序、踩雷榜全是大屏上的公开事实
    return {}
  },

  refereeExtra(room: Room) {
    const d = bomb(room)
    return {
      target: d.target,
      range: `${d.low} ~ ${d.high}`,
      note:
        room.phase === 'hunt'
          ? `第 ${d.round}/${d.maxRound} 轮，裁判心里的数是 ${d.target}，下一个报数的是 ${currentName(room, d)}。本地裁判自己会夹紧区间，你只管节奏。`
          : room.phase === 'boom'
            ? `这轮的雷 ${d.target} 已被 ${nameOf(room, d.loser)} 踩中，按「下一步」${d.round < d.maxRound ? '开下一轮' : '进结算'}。`
            : room.phase === 'over'
              ? '本局结束，惩罚环节不要跳过。'
              : `开始后自动埋一个 ${MIN_VALUE}~${MAX_VALUE} 的数。`,
    }
  },

  needs(room: Room, me: Player | null, view: RoomView): ViewNeeds {
    const d = bomb(room)
    void view
    const base: ViewNeeds = {
      prompt: null,
      input: 'none',
      inputHint: '',
      submitted: false,
      hostHint: hostHintFor(room),
    }

    if (!me) return base

    if (room.phase === 'lobby') {
      return {
        ...base,
        prompt: '看好大屏区间，轮到你就直接报数',
        inputHint: `在 ${MIN_VALUE} 到 ${MAX_VALUE} 之间报一个整数`,
      }
    }

    if (room.phase === 'hunt') {
      if (me.id === currentId(d)) {
        return {
          ...base,
          prompt: '轮到你报数了',
          input: 'number',
          inputHint: `在 ${d.low} 到 ${d.high} 之间报一个数`,
          submitted: false,
        }
      }
      return {
        ...base,
        prompt: d.order.length ? '等轮到你，别帮别人出主意' : '等待裁判排报数顺序',
        inputHint: `当前区间 ${d.low} ~ ${d.high}`,
      }
    }

    if (room.phase === 'boom') {
      const hit = d.loser === me.id
      return {
        ...base,
        prompt: hit ? `你踩中了 ${d.target}，准备接受惩罚` : `恭喜你活过一轮，雷是 ${d.target}`,
        inputHint: hit ? '别学别人怎么躲，这轮已经定了' : '按「下一步」开下一轮',
      }
    }

    return { ...base, prompt: '本局结束，大屏看踩雷榜' }
  },

  finish(room: Room): FinalResult {
    const d = bomb(room)
    const ranked = rankByScore(room.players)
    const top = ranked[0]?.rank ?? 0
    const winners = ranked
      .filter((r) => r.rank === top)
      .map((r) => ({ name: r.player.name, score: r.player.score }))

    const safest = room.players
      .map((p) => ({ name: p.name, n: boomCount(d, p.id) }))
      .sort((a, b) => a.n - b.n)[0]
    const worst = worstBoomer(room, d)

    return {
      title: '踩雷榜',
      lines: [
        `${d.round} 轮共埋了 ${d.round} 颗雷，最后一轮的雷是 ${d.target}，${
          d.loser ? `由 ${nameOf(room, d.loser)} 踩响。` : '还没人踩响就被收场了。'
        }（每一轮的雷和踩雷人都记在大屏事件流里。）`,
        boomsLine(room, d),
        worst
          ? `最该接受惩罚的是 ${worst.name}（${worst.n} 次踩雷）。`
          : '全场零踩雷，惩罚环节改成集体表演一个节目。',
        safest && safest.n === 0
          ? `最稳的是 ${safest.name}，一次没踩。全场犹豫 ${room.turn} 次（犹豫不算踩雷）。`
          : `全场犹豫 ${room.turn} 次（犹豫不算踩雷）。`,
      ],
      winners,
      verdict:
        (worst
          ? `这一局的结论很简单：${worst.name} 的运气最差。`
          : '这一局没人倒霉，说明区间收得还不够狠。') +
        ' ' +
        (safest && safest.n === 0 ? judge('award', { name: safest.name, title: '全场最稳' }) + ' ' : '') +
        judge('close'),
    }
  },
}
