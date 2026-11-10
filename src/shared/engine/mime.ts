import { MIME_WORDS, NUDGE_LINES, type MimeDifficulty } from '../content'
import { judge } from '../judge'
import type { FinalResult, MimeData, MimeLogItem, Player, Room, RoomView, ViewNeeds } from '../types'
import type { GameEngine } from './contract'
import {
  addScore,
  byId,
  clip,
  ev,
  isRefereeAct,
  mime,
  nameOf,
  phase,
  pick,
  seated,
  secondsLeft,
  shuffle,
} from './util'

const ROUND_MS = 60_000
const WORDS_PER_ROUND = 18
const SKIP_PENALTY_MS = 3000
const STREAK_FROM = 3
const MAX_ROUND_WHEN_CROWDED = 4
const CROWDED_FROM = 6

/** 难度对应的单词分值：越硬核越值钱 */
const BASE_POINTS: Record<MimeDifficulty, number> = { easy: 1, mid: 2, hard: 3 }
const DIFF_LABEL: Record<MimeDifficulty, string> = { easy: '简单', mid: '普通', hard: '硬核' }
const LEVELS: { value: string; label: string }[] = [
  { value: 'easy', label: '简单' },
  { value: 'mid', label: '普通' },
  { value: 'hard', label: '硬核' },
]

const asLevel = (v: unknown): MimeDifficulty | null => {
  const s = String(v ?? '')
  return (MIME_WORDS as Record<string, string[]>)[s] ? (s as MimeDifficulty) : null
}

/* ---------------------------- 轮次与词 ---------------------------- */

/**
 * MimeData 里没有 order 字段，所以「第几轮谁上台」由座位号稳定算出来：
 * 第 N 轮 = 座位第 N 靠前的那个人，人数超过轮数时反复用最后一位。
 */
function actorForRound(room: Room, d: MimeData, round = d.round) {
  const seats = seated(room)
  if (!seats.length) return null
  return seats[Math.min(Math.max(1, round) - 1, seats.length - 1)].id
}

/** index 越界时兜到最后一个词，别让比划者对着空白发呆 */
function currentWord(d: MimeData) {
  if (!d.list.length) return ''
  return d.list[Math.min(d.index, d.list.length - 1)]
}

const remainingMs = (room: Room) =>
  room.deadlineAt === null ? 0 : Math.max(0, room.deadlineAt - Date.now())

function usedSeconds(room: Room, d: MimeData) {
  return Math.max(0, Math.round((d.timeMs - remainingMs(room)) / 1000))
}

/**
 * 本轮的 log 尾巴：correct + skips 恰好等于本轮推入的条数。
 * run 阶段只把这段发给大屏，历史轮次的词先收着，避免和下一轮的词表撞车。
 */
function roundLog(d: MimeData): MimeLogItem[] {
  const n = Math.max(0, d.correct + d.skips)
  return d.log.slice(Math.max(0, d.log.length - n))
}

function wordCount(d: MimeData, ok: boolean) {
  return d.log.filter((x) => x.ok === ok).length
}

function beginRun(room: Room, d: MimeData) {
  d.list = shuffle(MIME_WORDS[d.difficulty] ?? []).slice(0, WORDS_PER_ROUND)
  d.index = 0
  d.actorId = actorForRound(room, d)
  d.correct = 0
  d.skips = 0
  d.streak = 0
  phase(room, 'run', { ms: d.timeMs })
  const name = nameOf(room, d.actorId)
  ev(
    room,
    'judge',
    `第 ${d.round} 轮开跑：${name} 上台，${DIFF_LABEL[d.difficulty]}难度，${d.list.length} 个词、${Math.round(d.timeMs / 1000)} 秒。${judge('hurry', { name })}`,
  )
}

function endRound(room: Room, d: MimeData, why: string) {
  const actorId = d.actorId ?? ''
  ev(
    room,
    'score',
    `第 ${d.round} 轮收工：${nameOf(room, actorId)} 让全场猜中 ${d.correct} 个，换词 ${d.skips} 次，最长连击 ${d.bestStreak}，个人总分 ${d.scores[actorId] ?? 0} 分。${why}`,
  )
  phase(room, 'gap')
}

/** gap → 下一轮的 ready；轮完所有人就 over */
function gotoReady(room: Room, d: MimeData) {
  if (d.round < d.maxRound) {
    d.round += 1
    // 提前把 actorId 换成下一位：ready 阶段大屏/裁判面板得和「下一位是谁」对上
    d.actorId = actorForRound(room, d)
    phase(room, 'ready')
    const name = nameOf(room, d.actorId)
    ev(room, 'judge', `第 ${d.round} 轮准备，下一位上台的是 ${name}，先把难度定下来。`)
    return
  }
  phase(room, 'over')
  ev(
    room,
    'score',
    `${wordCount(d, true)} 个词被猜中、${wordCount(d, false)} 个词被换掉，${d.round} 个人都轮过一次了。${judge('close')}`,
  )
}

function startMime(room: Room) {
  const d = mime(room)
  const seats = seated(room)
  d.maxRound = seats.length > CROWDED_FROM ? MAX_ROUND_WHEN_CROWDED : Math.max(1, seats.length)
  d.round = 1
  d.list = []
  d.index = 0
  d.correct = 0
  d.skips = 0
  d.streak = 0
  d.bestStreak = 0
  d.log = []
  d.scores = {}
  d.timeMs = ROUND_MS
  d.actorId = actorForRound(room, d)
  phase(room, 'ready')
  ev(room, 'judge', `第 1 轮，比划者是 ${nameOf(room, d.actorId)}，先选难度。${judge('open')}`)
  ev(room, 'info', `一共轮 ${d.maxRound} 个人，每人 ${Math.round(d.timeMs / 1000)} 秒冲词。`)
}

export const mimeEngine: GameEngine = {
  id: 'mime',

  create(room: Room) {
    const d = mime(room)
    const seats = seated(room)
    d.difficulty = 'mid'
    d.list = []
    d.index = 0
    d.actorId = null
    d.correct = 0
    d.skips = 0
    d.streak = 0
    d.bestStreak = 0
    d.log = []
    d.timeMs = ROUND_MS
    d.round = 0
    d.maxRound = seats.length > CROWDED_FROM ? MAX_ROUND_WHEN_CROWDED : Math.max(1, seats.length)
    d.scores = {}
    phase(room, 'lobby')
  },

  start(room: Room) {
    startMime(room)
  },

  act(room: Room, actor: Player, action: string, payload: any) {
    const d = mime(room)

    if (action === 'setDifficulty') {
      if (room.phase !== 'ready') return
      if (!actor.isHost && actor.id !== actorForRound(room, d)) return
      const level = asLevel(payload?.level)
      if (!level) return
      d.difficulty = level
      ev(room, 'info', `${clip(actor.name, 12)} 把难度定成「${DIFF_LABEL[level]}」，一个词 ${BASE_POINTS[level]} 分。`)
      return
    }

    if (action === 'startRun') {
      if (!actor.isHost) return
      if (room.phase === 'lobby') {
        startMime(room)
        beginRun(room, d)
        return
      }
      if (room.phase !== 'ready') return
      beginRun(room, d)
      return
    }

    // 裁判/房主点「猜对了」：分给比划者，考的就是一个人让全场听懂
    if (action === 'wordCorrect') {
      if (room.phase !== 'run') return
      if (!actor.isHost && room.refereeId !== actor.id) return
      const word = currentWord(d)
      if (!word) {
        endRound(room, d, '词表已经见底了。')
        return
      }
      const actorId = d.actorId ?? ''
      d.correct += 1
      d.streak += 1
      if (d.streak > d.bestStreak) d.bestStreak = d.streak
      const gain = BASE_POINTS[d.difficulty] + (d.streak >= STREAK_FROM ? 1 : 0)
      d.scores[actorId] = (d.scores[actorId] ?? 0) + gain
      addScore(room, actorId, gain)
      d.log.push({ word, ok: true, by: actorId, seconds: usedSeconds(room, d) })
      d.index += 1
      const name = nameOf(room, actorId)
      ev(
        room,
        'score',
        `「${word}」猜中！${judge('praise', { name })} ${name} +${gain} 分${d.streak >= STREAK_FROM ? `（连击 ${d.streak}）` : ''}。`,
      )
      if (d.index >= d.list.length) endRound(room, d, '词提前猜完，直接换人。')
      return
    }

    if (action === 'wordSkip') {
      if (room.phase !== 'run') return
      if (!d.actorId || actor.id !== d.actorId) return
      const word = currentWord(d)
      if (!word) return
      d.skips += 1
      d.streak = 0
      d.log.push({ word, ok: false, by: d.actorId, seconds: usedSeconds(room, d) })
      d.index += 1
      if (room.deadlineAt !== null) room.deadlineAt -= SKIP_PENALTY_MS
      ev(
        room,
        'judge',
        `${clip(actor.name, 12)} 换掉「${word}」，扣 3 秒，还剩 ${Math.ceil(remainingMs(room) / 1000)} 秒。`,
      )
      if (d.index >= d.list.length) {
        endRound(room, d, '词表猜完了。')
        return
      }
      if (room.deadlineAt !== null && room.deadlineAt <= Date.now()) endRound(room, d, '时间被扣光了。')
      return
    }

    // 不限流：卡壳的人想要鼓励就多点几下，反正只是大屏上一句话
    if (action === 'nudge') {
      if (room.phase === 'lobby' || room.phase === 'over') return
      ev(room, 'judge', `${clip(actor.name, 12)} 说没思路：${pick(NUDGE_LINES)}`)
      return
    }
  },

  next(room: Room, actor: Player | null) {
    const d = mime(room)
    if (room.phase === 'lobby') {
      startMime(room)
      return
    }
    if (room.phase === 'ready') {
      beginRun(room, d)
      return
    }
    if (room.phase === 'run') {
      endRound(room, d, '这是大屏手动提前收的。')
      return
    }
    if (room.phase === 'gap') {
      gotoReady(room, d)
      return
    }
    void actor
  },

  tick(room: Room, now: number) {
    if (room.phase !== 'run') return
    if (room.deadlineAt === null || now < room.deadlineAt) return
    endRound(room, mime(room), '时间到。')
  },

  /**
   * 脱敏要点：词表 list 在 run 阶段一个都不给，只给长度和进度；
   * log 在 run 阶段只给本轮尾部（这些词现场已经喊出来了），
   * 历史轮次的词等 gap/over 再放，防止和下一轮抽到的词撞车。
   */
  publicData(room: Room): Record<string, any> {
    const d = mime(room)
    const running = room.phase === 'run'
    return {
      mime: {
        difficulty: d.difficulty,
        round: d.round,
        maxRound: d.maxRound,
        actorId: d.actorId,
        correct: d.correct,
        skips: d.skips,
        streak: d.streak,
        bestStreak: d.bestStreak,
        log: running ? roundLog(d) : d.log,
        scores: d.scores,
        timeMs: d.timeMs,
        listLength: d.list.length,
        index: d.index,
        list: running ? [] : d.list,
      },
    }
  },

  /** 词只发给台上那个人，且只在 run 阶段 */
  secretFor(room: Room, me: Player) {
    const d = mime(room)
    if (room.phase !== 'run') return {}
    if (!d.actorId || me.id !== d.actorId) return {}
    const word = currentWord(d)
    if (!word) return {}
    return { word, hint: '不能说出词里的任何一个字' }
  },

  /** 裁判必须看到当前词，否则没法判「算不算猜对」 */
  refereeExtra(room: Room) {
    const d = mime(room)
    return {
      word: room.phase === 'run' ? currentWord(d) : '',
      actor: nameOf(room, d.actorId ?? actorForRound(room, d)),
      remaining: Math.max(0, d.list.length - d.index),
      note:
        room.phase === 'run'
          ? '答案接近就算猜对，点「猜对了」；比划者把词里的字念出来了就让他换词（自动扣 3 秒）。'
          : '不在冲词阶段，没有需要判的词。',
    }
  },

  needs(room: Room, me: Player | null, view: RoomView): ViewNeeds {
    const d = mime(room)
    const base: ViewNeeds = {
      prompt: null,
      input: 'none',
      inputHint: '',
      submitted: false,
      hostHint: '',
    }
    const left = secondsLeft(room, view.serverNow)
    const lead = actorForRound(room, d)

    if (room.phase === 'lobby') {
      base.hostHint = `人到齐了点「开始这局」，第一轮先由 ${clip(nameOf(room, lead), 12)} 上台选难度。`
      if (!me) return base
      return { ...base, prompt: '等着，第一个上台的是他' }
    }

    if (room.phase === 'ready') {
      base.hostHint = `第 ${d.round}/${d.maxRound} 轮，上台的是 ${clip(nameOf(room, lead), 12)}。难度定好后点「下一步」开跑。`
      if (!me) return base
      if (me.id === lead) {
        return {
          ...base,
          prompt: `第 ${d.round} 轮轮到你上台，先选难度`,
          input: 'pick',
          options: LEVELS,
          valueKey: 'level',
          inputHint: `难度越高一个词越值钱：简单 ${BASE_POINTS.easy} 分 / 普通 ${BASE_POINTS.mid} 分 / 硬核 ${BASE_POINTS.hard} 分，连击 ${STREAK_FROM} 个以上每个再加 1 分`,
        }
      }
      return {
        ...base,
        prompt: `这轮由 ${clip(nameOf(room, lead), 12)} 上台，等他选难度`,
        inputHint: isRefereeAct(room, me) ? '难度定好后点大屏的「下一步」开跑' : '',
      }
    }

    if (room.phase === 'run') {
      base.hostHint = `倒计时 ${left ?? Math.ceil(d.timeMs / 1000)} 秒，台上是 ${clip(nameOf(room, d.actorId), 12)}，还剩 ${Math.max(0, d.list.length - d.index)} 个词。猜对了就点「猜对」，答错不用管，时间到自动换人。`
      if (!me) return base
      if (d.actorId && me.id === d.actorId) {
        const opts: { value: string; label: string }[] = [{ value: 'skip', label: '换词（扣 3 秒）' }]
        if (isRefereeAct(room, me)) opts.unshift({ value: 'correct', label: '猜对了' })
        return {
          ...base,
          prompt: '词只有你看得到，动嘴动腿别念字',
          input: 'pick',
          options: opts,
          valueKey: 'value',
          inputHint: `已猜中 ${d.correct} 个，换掉 ${d.skips} 个，连击 ${d.streak}`,
        }
      }
      if (isRefereeAct(room, me)) {
        return {
          ...base,
          prompt: '听到对的答案就点「猜对了」',
          input: 'pick',
          options: [{ value: 'correct', label: '猜对了' }],
          valueKey: 'value',
          inputHint: `本轮已猜中 ${d.correct} 个，换词 ${d.skips} 次`,
        }
      }
      return { ...base, prompt: '看大屏，动嘴动腿抢答' }
    }

    if (room.phase === 'gap') {
      base.hostHint = `本轮战报在大屏上，点「下一步」${d.round < d.maxRound ? `换 ${clip(nameOf(room, actorForRound(room, d, d.round + 1)), 12)} 上台` : '出结算'}。`
      if (!me) return base
      return { ...base, prompt: `刚才 ${clip(nameOf(room, d.actorId), 12)} 猜中 ${d.correct} 个，歇口气` }
    }

    base.hostHint = '所有人都轮过了，看结算页。'
    if (!me) return base
    return { ...base, prompt: '本局已结束' }
  },

  /** 纯读：分数在 act 里已经落到 scores 和 player.score 上了 */
  finish(room: Room): FinalResult {
    const d = mime(room)
    const seats = seated(room)

    const agg: Record<string, { ok: number; skip: number }> = {}
    for (const it of d.log) {
      const a = agg[it.by] ?? { ok: 0, skip: 0 }
      if (it.ok) a.ok += 1
      else a.skip += 1
      agg[it.by] = a
    }

    // 轮到过的人 = 第 1..N 轮的上台者；一个词没猜中也要在战报里留一行
    const played = Math.min(Math.max(d.round, 0), Math.max(d.maxRound, 0), seats.length)
    const acted = seats.slice(0, played).map((p) => p.id)
    for (const id of Object.keys(agg)) if (!acted.includes(id)) acted.push(id)

    const lines: string[] = [
      `全场一共猜中 ${wordCount(d, true)} 个词，换掉 ${wordCount(d, false)} 个，最长连击 ${d.bestStreak}。`,
    ]
    for (const id of acted) {
      const a = agg[id] ?? { ok: 0, skip: 0 }
      lines.push(
        `${clip(nameOf(room, id), 12)}：猜中 ${a.ok} 个，换词 ${a.skip} 次，拿 ${d.scores[id] ?? 0} 分。`,
      )
    }
    const ranked = Object.entries(d.scores).sort((a, b) => b[1] - a[1])
    if (ranked.length) {
      lines.push(`总分排行：${ranked.map(([id, s]) => `${clip(nameOf(room, id), 12)} ${s} 分`).join('、')}。`)
    }

    const top = ranked.length ? ranked[0][1] : 0
    let winners: { name: string; score: number }[] =
      top > 0
        ? ranked
            .filter(([, s]) => s === top)
            .map(([id]) => ({ name: nameOf(room, id), score: byId(room, id)?.score ?? d.scores[id] ?? 0 }))
        : []
    if (!winners.length) {
      const fallback = seats.slice().sort((a, b) => b.score - a.score)[0]
      if (fallback) winners = [{ name: fallback.name, score: fallback.score }]
    }

    return {
      title: '本场比划王',
      lines,
      winners,
      verdict:
        (winners.length ? judge('award', { name: winners.map((w) => w.name).join('、'), title: '反应冠军' }) + ' ' : '') +
        judge('close'),
    }
  },
}
