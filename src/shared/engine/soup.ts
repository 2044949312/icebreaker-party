import { SOUP_PUZZLES } from '../content'
import type { SoupPuzzle } from '../content'
import { judge, rankByScore } from '../judge'
import type {
  FinalResult,
  Player,
  Room,
  RoomView,
  SoupAnswer,
  SoupData,
  SoupQuestion,
  ViewNeeds,
} from '../types'
import type { GameEngine } from './contract'
import { addScore, clip, ev, grams, nameOf, overlap, phase, pick, sanitize, soup } from './util'

/* ----------------------------- 常量 ----------------------------- */

/** 提问阶段的大限时：20 分钟 */
const ASK_MS = 20 * 60 * 1000
/** 大限时到点前 2 分钟播一次催促（全场只播这一次） */
const URGE_BEFORE_MS = 120_000
/** 催促哨兵：靠这个 id 保证幂等，SoupData 里没有专门字段记「播过没有」 */
const URGE_ID = '__urge'
const URGE_BY = '__system'
const URGE_TEXT = '（系统提示：还剩 2 分钟）'

/** 宣布答案时，与汤底的词面重合率阈值：达到即判还原成功 */
const SOLVE_RATIO = 0.3

const ASK_MAX = 60
const SOLVE_MAX = 200
const SOLVE_POINTS = 6
const ASK_POINTS_CAP = 5

const ANSWER_LABEL: Record<SoupAnswer, string> = {
  yes: '是',
  no: '不是',
  partial: '部分是',
  none: '这与真相无关',
  pending: '等裁判回答',
}

const VALID_ANSWERS: SoupAnswer[] = ['yes', 'no', 'partial', 'none']

const ASK_INPUT_HINT = '问一个只能用「是 / 不是」回答的问题，别问「是谁」这种开放式问题'

/* ----------------------------- 内部工具 ----------------------------- */

const PUZZLE_BY_ID: Map<string, SoupPuzzle> = new Map(
  SOUP_PUZZLES.map((p): [string, SoupPuzzle] => [p.id, p]),
)

/** 短词表不入库，按 puzzleId 回内容表取，避免 room.data 里堆一堆冗余 */
function puzzleOf(d: SoupData): SoupPuzzle | null {
  return PUZZLE_BY_ID.get(d.puzzleId) ?? null
}

/** 命中计数：问题里出现了这一组的几个短词（少于 2 字的不算命中） */
function hitCount(text: string, words: string[]) {
  let n = 0
  for (const w of words) if (w.length >= 2 && text.includes(w)) n += 1
  return n
}

/**
 * 本地关键词裁判：命中数最多的一组就是答案。
 * 三组都 0 命中 -> none；并列时按 partial > no > yes 的保守顺序取，并标记「方向不足」。
 */
function aiAnswer(text: string, p: SoupPuzzle): { answer: SoupAnswer; vague: boolean } {
  const groups: { answer: SoupAnswer; n: number }[] = [
    { answer: 'partial', n: hitCount(text, p.partial ?? []) },
    { answer: 'no', n: hitCount(text, p.no ?? []) },
    { answer: 'yes', n: hitCount(text, p.yes ?? []) },
  ]
  const max = Math.max(groups[0].n, groups[1].n, groups[2].n)
  if (max <= 0) return { answer: 'none', vague: false }
  const tied = groups.filter((g) => g.n === max)
  return { answer: tied[0].answer, vague: tied.length > 1 }
}

function pendingQueue(d: SoupData) {
  return d.queue.filter((q) => q.answer === 'pending')
}

/** 真实提问数：排除系统哨兵那条 */
function realQuestionCount(d: SoupData) {
  return d.queue.filter((q) => q.by !== URGE_BY).length
}

/** 全场提问最少的人，用来点名催促 */
function quietestName(room: Room, d: SoupData) {
  let target: Player | null = null
  let min = Infinity
  for (const p of room.players) {
    const n = d.asked[p.id] ?? 0
    if (n < min) {
      min = n
      target = p
    }
  }
  return target?.name ?? '还没开口的那位'
}

/**
 * 统一的收尾入口：只有不在 'over' 时才走，保证评分只算一次。
 * reason: solved=有人猜对, timeout=大限时到点, stop=主持人主动收桌
 */
function toOver(room: Room, reason: 'solved' | 'timeout' | 'stop') {
  const d = soup(room)
  if (room.phase === 'over') return
  scoreSoup(room)
  phase(room, 'over')
  if (reason === 'solved') {
    ev(room, 'judge', `${nameOf(room, d.solvedBy)} 把这碗汤还原了。汤底：${clip(d.truth, 90)}`)
  } else if (reason === 'timeout') {
    ev(room, 'judge', '20 分钟到了，汤凉了——这碗没人喝完。')
  } else {
    ev(room, 'judge', d.solved ? '主持人收桌，真相已经还原。' : '主持人收桌，这碗汤先记「没喝完」。')
  }
  ev(
    room,
    'score',
    d.solved
      ? `${nameOf(room, d.solvedBy)} +${SOLVE_POINTS}，其余按提问数各拿最多 ${ASK_POINTS_CAP} 分；${d.hintsUsed} 个提示让每人扣 ${d.hintsUsed} 分。`
      : `没人猜中，全员按提问数计分；提示用了 ${d.hintsUsed} 个，每人扣 ${d.hintsUsed} 分。`,
  )
  ev(room, 'judge', judge('close'))
}

/** 猜对 +6；其他人按提问数 min(次数,5)；用过的提示每人 -1（addScore 自己兜到 0） */
function scoreSoup(room: Room) {
  const d = soup(room)
  for (const p of room.players) {
    if (d.solved && d.solvedBy === p.id) addScore(room, p.id, SOLVE_POINTS)
    else addScore(room, p.id, Math.min(d.asked[p.id] ?? 0, ASK_POINTS_CAP))
    if (d.hintsUsed > 0) addScore(room, p.id, -d.hintsUsed)
  }
}

function hostHintFor(room: Room) {
  const d = soup(room)
  switch (room.phase) {
    case 'lobby':
      return `本题《${d.title || '未选题'}》。玩家轮流提「是 / 不是」的问题，裁判只回答 是 / 不是 / 部分是 / 与真相无关；有人举手复述真相，说对即胜。人齐了点开始。`
    case 'ask': {
      const parts = [`${realQuestionCount(d)} 个问题已问`, `提示用了 ${d.hintsUsed} 个`]
      if (room.judgeMode === 'human') parts.push(`${pendingQueue(d).length} 个问题等裁判点答案`)
      if (d.declaredBy) parts.push(`${nameOf(room, d.declaredBy)} 刚宣布过复述`)
      parts.push(
        room.deadlineAt === null
          ? '按「下一步」收尾'
          : d.solved
            ? '已还原，按「下一步」进结算'
            : '有人宣布且说对会自动结束；觉得差不多就按「下一步」收尾',
      )
      return parts.join('；') + '。'
    }
    case 'over':
      return '结算页已生成，按「下一步」继续停留或开新局。'
    default:
      return ''
  }
}

/* ----------------------------- 引擎 ----------------------------- */

export const soupEngine: GameEngine = {
  id: 'soup',

  create(room: Room) {
    const d = soup(room)
    const p = pick(SOUP_PUZZLES)
    d.puzzleId = p?.id ?? ''
    d.title = p?.title ?? '没配好的汤'
    d.tags = p ? [...(p.tags ?? [])] : []
    d.question = p?.question ?? '题目加载失败，请重开一局。'
    // 汤底一直留在 room.data 里，靠 publicData 在 'ask' 阶段不返回它来保证不泄露
    d.truth = p?.truth ?? ''
    d.queue = []
    d.asked = {}
    d.hintsUsed = 0
    d.declaredBy = null
    d.declaredAnswer = ''
    d.solved = false
    d.solvedBy = null
    d.startedAt = 0
    d.elapsedMs = 0
    phase(room, 'lobby')
  },

  start(room: Room) {
    const d = soup(room)
    const now = Date.now()
    d.startedAt = now
    room.startedAt = now
    d.elapsedMs = 0
    d.queue = []
    d.asked = {}
    d.hintsUsed = 0
    d.declaredBy = null
    d.declaredAnswer = ''
    d.solved = false
    d.solvedBy = null
    ev(room, 'info', `本题《${d.title}》${d.tags.length ? ` · ${d.tags.join(' / ')}` : ''}`)
    ev(room, 'judge', `汤面：${d.question}`)
    ev(room, 'judge', judge('open') + ' 只能回答「是 / 不是 / 部分是 / 与真相无关」，想清楚了再举手宣布。')
    phase(room, 'ask', { ms: ASK_MS })
  },

  act(room: Room, actor: Player, action: string, payload: any) {
    const d = soup(room)
    if (room.phase !== 'ask') return

    /* ---------- 提问 ---------- */
    if (action === 'ask') {
      // 裁判不提问，只回答
      if (room.refereeId === actor.id) return
      const text = sanitize(payload?.text, ASK_MAX)
      if (!text) return
      d.asked[actor.id] = (d.asked[actor.id] ?? 0) + 1

      const p = puzzleOf(d)
      const needHuman = room.judgeMode === 'human' || !p
      const auto = p ? aiAnswer(text, p) : { answer: 'none' as SoupAnswer, vague: false }
      const answer: SoupAnswer = needHuman ? 'pending' : auto.answer
      const item: SoupQuestion = {
        id: `${actor.id}-${d.queue.length}`,
        by: actor.id,
        byName: actor.name,
        text,
        answer,
        at: Date.now(),
      }
      d.queue.push(item)

      if (answer === 'pending') {
        // 人类裁判模式：大屏只播问题，答案等裁判点
        ev(room, 'info', `${actor.name} 问：${text}`)
      } else {
        ev(
          room,
          'judge',
          `${actor.name} 问：${text} → ${ANSWER_LABEL[answer]}${
            auto.vague ? '（裁判表示这个问题还不足以定方向）' : ''
          }`,
        )
      }
      return
    }

    /* ---------- 人类裁判回答 ---------- */
    if (action === 'answer') {
      if (room.judgeMode !== 'human' || room.refereeId !== actor.id) return
      const id = String(payload?.id ?? '')
      const raw = String(payload?.answer ?? '') as SoupAnswer
      if (!VALID_ANSWERS.includes(raw)) return
      const item = d.queue.find((q) => q.id === id)
      if (!item || item.answer !== 'pending') return
      item.answer = raw
      ev(room, 'judge', `裁判回答 ${item.byName}「${item.text}」—— ${ANSWER_LABEL[raw]}。`)
      return
    }

    /* ---------- 举手宣布还原 ---------- */
    if (action === 'solve') {
      const text = sanitize(payload?.answer, SOLVE_MAX)
      if (!text) return
      d.declaredBy = actor.id
      d.declaredAnswer = text

      if (room.judgeMode === 'human') {
        ev(room, 'judge', `${actor.name} 举手宣布还原真相，等裁判判定「说对了 / 还差一点」。`)
        return
      }

      // AI 模式：词面重合率 = 复述里命中汤底的词片数 / 汤底词片总数
      const denom = Math.max(1, grams(d.truth).size)
      const ratio = overlap(d.truth, text) / denom
      const percent = Math.round(ratio * 100)
      if (ratio >= SOLVE_RATIO) {
        d.solved = true
        d.solvedBy = actor.id
        ev(room, 'judge', `${actor.name} 的复述和汤底重合 ${percent}%，够上了——判还原成功。`)
        toOver(room, 'solved')
      } else {
        ev(
          room,
          'judge',
          `${actor.name} 的复述只重合到 ${percent}%：接近了，但关键的一环还差着。裁判可以给个提示，或者接着问。`,
        )
      }
      return
    }

    /* ---------- 人类裁判判定宣布 ---------- */
    if (action === 'verdict') {
      if (room.judgeMode !== 'human' || room.refereeId !== actor.id) return
      if (!d.declaredBy) return
      const ok = payload?.ok === true || payload?.ok === 'true'
      if (ok) {
        d.solved = true
        d.solvedBy = d.declaredBy
        ev(room, 'judge', `裁判认定 ${nameOf(room, d.declaredBy)} 说对了，汤底揭开。`)
        toOver(room, 'solved')
      } else {
        ev(room, 'judge', '裁判摇头：接近了，但关键的一环还差着。接着问，别停。')
      }
      return
    }

    /* ---------- 提示 ---------- */
    if (action === 'hint') {
      if (!actor.isHost && room.refereeId !== actor.id) return
      const list = puzzleOf(d)?.hints ?? []
      if (!list.length) {
        ev(room, 'info', '这碗汤没准备提示。')
        return
      }
      d.hintsUsed += 1
      const idx = Math.min(Math.max(1, d.hintsUsed), list.length) - 1
      ev(room, 'judge', `提示 ${d.hintsUsed}：${list[idx]}（提示每多用一个，结算时每人扣 1 分。）`)
      return
    }
  },

  next(room: Room, actor: Player | null) {
    if (room.phase === 'lobby') {
      this.start(room)
      return
    }
    if (room.phase === 'ask') {
      // 房主觉得差不多就结束
      toOver(room, 'stop')
      return
    }
    void actor
  },

  tick(room: Room, now: number) {
    if (room.phase !== 'ask') return
    const d = soup(room)
    const base = d.startedAt || room.startedAt
    if (base) d.elapsedMs = Math.max(0, now - base)
    if (room.deadlineAt === null) return

    if (now >= room.deadlineAt) {
      toOver(room, 'timeout')
      return
    }

    // 只播一次的限时提醒：哨兵问题进队列即为「已播过」
    if (now > room.deadlineAt - URGE_BEFORE_MS && !d.queue.some((q) => q.id === URGE_ID)) {
      d.queue.push({
        id: URGE_ID,
        by: URGE_BY,
        byName: '裁判',
        text: URGE_TEXT,
        answer: 'none',
        at: Date.now(),
      })
      ev(room, 'judge', `还剩最后 2 分钟，没人举手这碗汤就凉透了。${judge('hurry', { name: quietestName(room, d) })}`)
    }
  },

  publicData(room: Room): Record<string, any> {
    const d = soup(room)
    const over = room.phase === 'over'
    return {
      soup: {
        puzzleId: d.puzzleId,
        title: d.title,
        tags: d.tags,
        question: d.question,
        // 'ask' 阶段绝不出汤底；'over' 才揭开
        truth: over ? d.truth : '',
        solved: over ? d.solved : false,
        solvedBy: over ? d.solvedBy : null,
        // 问答全量公开，这是玩法本身要求
        queue: d.queue,
        asked: d.asked,
        hintsUsed: d.hintsUsed,
        declaredBy: d.declaredBy,
        declaredAnswer: d.declaredAnswer,
        elapsedMs: d.elapsedMs,
        questionCount: realQuestionCount(d),
        pendingCount: pendingQueue(d).length,
        judgeMode: room.judgeMode,
      },
    }
  },

  secretFor(room: Room, me: Player) {
    const d = soup(room)
    return { asked: d.asked[me.id] ?? 0 }
  },

  refereeExtra(room: Room) {
    const d = soup(room)
    const p = puzzleOf(d)
    return {
      truth: d.truth,
      hints: p?.hints ?? [],
      hintTotal: (p?.hints ?? []).length,
      pending: pendingQueue(d).map((q) => ({ id: q.id, by: q.by, byName: q.byName, text: q.text })),
      declaredBy: d.declaredBy,
      declaredName: d.declaredBy ? nameOf(room, d.declaredBy) : '',
      declaredAnswer: d.declaredAnswer,
      solved: d.solved,
      note:
        room.judgeMode === 'ai'
          ? '本地关键词裁判已自动回答，你只用盯节奏；差不多就按「下一步」收尾。'
          : '照汤底回答：是 / 不是 / 部分是 / 与真相无关。有人复述时点「说对了 / 还差一点」。',
    }
  },

  needs(room: Room, me: Player | null, view: RoomView): ViewNeeds {
    const d = soup(room)
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
        prompt: '大屏上是汤面，先想好你的第一个是非问题',
        inputHint: '裁判只回答「是 / 不是 / 部分是 / 与真相无关」，别问开放式问题',
      }
    }

    if (room.phase === 'ask') {
      if (room.judgeMode === 'human' && room.refereeId === me.id) {
        const n = pendingQueue(d).length
        return {
          ...base,
          prompt: n ? `有 ${n} 个问题等你回答` : '暂时没有待答问题',
          inputHint: '在裁判面板上点答案：是 / 不是 / 部分是 / 与真相无关',
        }
      }
      const mine = d.asked[me.id] ?? 0
      return {
        ...base,
        prompt:
          d.declaredBy === me.id
            ? `你已举手复述（共问了 ${mine} 个问题），等裁判判定`
            : `你已经问了 ${mine} 个问题，想清楚了就举手宣布`,
        input: 'text',
        inputHint: ASK_INPUT_HINT,
      }
    }

    if (room.phase === 'over') {
      return { ...base, prompt: d.solved ? '本局结束，汤底已揭开' : '本局结束，这碗汤没人喝完' }
    }

    return base
  },

  finish(room: Room): FinalResult {
    const d = soup(room)
    const ranked = rankByScore(room.players)
    const top = ranked[0]?.rank ?? 0
    const winners = ranked
      .filter((r) => r.rank === top)
      .map((r) => ({ name: r.player.name, score: r.player.score }))

    const askedList = Object.entries(d.asked).sort((a, b) => b[1] - a[1])
    const timedOut = !d.solved && d.elapsedMs >= ASK_MS - 2000
    const bestName = askedList.length ? nameOf(room, askedList[0][0]) : ''
    const award = bestName ? ' ' + judge('award', { name: bestName, title: '最会提问奖' }) : ''

    return {
      title: d.solved ? '真相还原' : timedOut ? '时间用尽' : '汤没喝完',
      lines: [
        `汤底：${d.truth || '（本题没有汤底）'}`,
        d.solvedBy
          ? `第一个宣布并还原真相的是 ${nameOf(room, d.solvedBy)}。`
          : d.declaredBy
            ? `${nameOf(room, d.declaredBy)} 举手复述过，但没能对上关键的一环。`
            : '全程没人举手宣布还原。',
        `共提问 ${realQuestionCount(d)} 个，用了 ${d.hintsUsed} 个提示，跑了 ${Math.max(1, Math.round(d.elapsedMs / 60000))} 分钟。`,
        askedList.length
          ? `最会提问：${askedList
              .slice(0, 3)
              .map(([id, n]) => `${nameOf(room, id)}（${n} 问）`)
              .join('、')}。`
          : '大家全程靠猜，一个问题都没问。',
      ],
      winners,
      verdict:
        (d.solved
          ? '真相被一句一句问出来了，这一局是推理赢的。'
          : '没人把这碗汤喝完，惩罚环节照常执行。') + award + ' ' + judge('close'),
    }
  },
}
