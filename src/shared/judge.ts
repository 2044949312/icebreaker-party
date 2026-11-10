import type { Player } from './types'

/**
 * 本地裁判文案引擎：不接任何外部模型，靠语料池 + 变量填充 + 去重轮换，
 * 让「AI 裁判」听起来不像复读机。所有函数都是纯字符串处理。
 */

type Pool = string[]

const P: Record<string, Pool> = {
  open: [
    '裁判就位。这局我盯紧一点，你们随意。',
    '我来当裁判。规则冲突的时候，以现场开心为准。',
    '裁判这边准备好了。记住：输的人负责惩罚，赢的人负责解释。',
    '本裁判不偏袒任何人——除非有人明显在装。',
  ],
  round: [
    '第 {round} 轮，开始。',
    '第 {round} 轮来了，节奏收紧一点。',
    '第 {round} 轮。这一轮我不接受「我不会」这种回答。',
  ],
  hurry: [
    '{name}，到你了，别让大家等你一个人的沉默。',
    '时间不多了，{name} 的想法我先记成「还没想好」。',
    '{name} 再不开口，我就当你自动弃权啦。',
    '还有人在憋大招吗？{name} 看起来在憋。',
    '倒计时开始了。慌是正常的，慌还能说对才叫本事。',
  ],
  praise: [
    '{name} 这句漂亮，我自己都没绕过来。',
    '{name} 说得挺稳，稳得可疑。',
    '记一下：{name} 刚才那波是教科书级别的。',
    '{name} 一开口，我就知道这轮有人要倒霉了。',
  ],
  suspect: [
    '{name} 刚才的描述有点泛，我先记在小本本上。',
    '{name} 说得太安全了，安全得像不知道自己是什么。',
    '有人注意到吗，{name} 这轮把话题推给别人了。',
  ],
  reveal: [
    '票型出来了。',
    '结算，我不做任何表情。',
    '大屏见分晓。',
  ],
  out: [
    '{name} 出局。走之前留一句遗言吧，这是规矩。',
    '{name} 被抬走了。房间里的空气突然就诚实了。',
    '{name} 淘汰。你的词是「{word}」。',
  ],
  safe: [
    '这轮平了，谁也没被抬走。尴尬的是你们。',
    '票散了，算你们团结。',
  ],
  winGood: [
    '平民胜利。卧底藏到最后也没藏住。',
    '这一局是「互相认识」赢了。',
    '正义方获胜——虽然过程非常不正义。',
  ],
  winBad: [
    '卧底获胜。说明你们对彼此的判断约等于抽签。',
    '卧底赢了。他刚才那句「我平常在家」骗过了全场。',
    '少数派胜利。这局之后你们要重新认识一下了。',
  ],
  award: [
    '{name} 拿到「{title}」。',
    '「{title}」——{name}，当之无愧。',
    '这个奖我给 {name}：{title}。',
  ],
  tie: [
    '分数打平，那就交给命运——或者交给下一轮。',
    '并列。我不做加赛裁决，你们自己商量谁请客。',
  ],
  close: [
    '本局结束。感谢配合，下次冷场的时候记得叫我。',
    '裁判下班。惩罚环节不要跳过，那是精髓。',
    '这局我判完了。总体评价：你们的默契比想象中好，也比想象中吵。',
  ],
  timeout: [
    '{name} 超时，这一手我按失误记了。',
    '时间到。{name} 的犹豫已经被全场听见。',
  ],
}

const lastUsed: Record<string, string[]> = {}

function roll(cat: string): string {
  const pool = P[cat] ?? P.open
  const used = lastUsed[cat] ?? []
  const fresh = pool.filter((x) => !used.includes(x))
  const chosen = (fresh.length ? fresh : pool)[Math.floor(Math.random() * (fresh.length || pool.length))]
  lastUsed[cat] = [chosen, ...used].slice(0, Math.max(1, pool.length - 1))
  return chosen
}

export function judge(cat: keyof typeof P | string, vars: Record<string, string | number> = {}) {
  let s = roll(cat)
  for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v))
  return s
}

const TITLES = [
  '最佳演技奖',
  '最会读人奖',
  '神转折奖',
  '最强圆场奖',
  '冷场急救奖',
  '最强大脑奖',
  '最会提问奖',
  '反应冠军',
  '背锅侠',
  '全场最稳',
]

export function titleFor(rank: number) {
  return TITLES[Math.min(rank, TITLES.length - 1)]
}

/** 按分数排出名次，同分同名 */
export function rankByScore(players: Player[]) {
  const sorted = players.slice().sort((a, b) => b.score - a.score)
  let rank = 0
  let prev: number | null = null
  return sorted.map((p, i) => {
    if (p.score !== prev) rank = i
    prev = p.score
    return { player: p, rank, title: titleFor(rank) }
  })
}

export const nudge = (lines: string[]) => lines[Math.floor(Math.random() * lines.length)]
