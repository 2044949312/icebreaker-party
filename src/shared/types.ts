/** 全局数据契约：房主大屏、玩家手机、服务端游戏引擎共用。 */

export type JudgeMode = 'ai' | 'human'
export type Role = 'host' | 'player' | 'referee' | 'watcher'

/* ------------------------------------------------------------------ *
 * 问卷 → 推荐
 * ------------------------------------------------------------------ */

export type Vibe = 'laugh' | 'warm' | 'brain' | 'rival'
export type Setting = 'seated' | 'standing' | 'lounging'
export type Intimacy = 'strangers' | 'colleagues' | 'friends' | 'family'

/** 用户填写的需求名单 */
export interface Profile {
  count: number
  minutes: number
  setting: Setting
  vibes: Vibe[]
  intimacy: Intimacy
  shyLevel: 0 | 1 | 2
  propsOk: boolean
  phonePerPerson: boolean
  wantMove: boolean
}

export interface GameNeeds {
  move: boolean
  props: string[]
  thinking: 0 | 1 | 2
  chaos: 0 | 1 | 2
  warmth: 0 | 1 | 2
  rivalry: 0 | 1 | 2
  talking: 0 | 1 | 2
  shyFriendly: 0 | 1 | 2
  phones: 'none' | 'some' | 'each'
}

export interface GameMeta {
  id: string
  name: string
  latin: string
  emoji: string
  tagline: string
  desc: string
  minPlayers: number
  maxPlayers: number
  bestPlayers: [number, number]
  minutes: [number, number]
  needs: GameNeeds
  judgeModes: JudgeMode[]
  judgeNote: string
  howTo: string[]
  props: string[]
  color: string
}

export interface Recommendation {
  gameId: string
  score: number
  percent: number
  why: string[]
  watch: string[]
}

/* ------------------------------------------------------------------ *
 * 房间
 * ------------------------------------------------------------------ */

export interface Player {
  id: string
  name: string
  seat: number
  isHost: boolean
  connected: boolean
  lastSeen: number
  score: number
  alive: boolean
  outReason: string | null
}

export interface RoomEvent {
  seq: number
  at: number
  kind: 'info' | 'judge' | 'score' | 'leave'
  text: string
}

export interface Room {
  code: string
  createdAt: number
  updatedAt: number
  seq: number
  gameId: string
  profile: Profile
  judgeMode: JudgeMode
  refereeId: string | null

  phase: string
  round: number
  turn: number
  startedAt: number | null
  deadlineAt: number | null
  pausedMs: number

  players: Player[]
  data: GameData
  events: RoomEvent[]
  finished: FinalResult | null
}

export interface FinalResult {
  title: string
  lines: string[]
  winners: { name: string; score: number }[]
  verdict: string
}

/** 每个游戏把自己的私密状态塞进对应的可选字段。 */
export interface GameData {
  spy?: SpyData
  twos?: TwosData
  soup?: SoupData
  bomb?: BombData
  seven?: SevenData
  story?: StoryData
  never?: NeverData
  mime?: MimeData
}

/* ---------------------------- 谁是卧底 ---------------------------- */
export interface SpyData {
  common: string
  insider: string
  insiderCount: number
  round: number
  /** 本轮描述顺序（playerId） */
  order: string[]
  /** playerId -> 分到的词 */
  words: Record<string, string>
  descriptions: Record<string, string>
  votes: Record<string, string>
  tally: Record<string, number>
  eliminated: string[]
  lastOut: string | null
  result: 'civilians' | 'insider' | null
}

/* ---------------------------- 两真一假 ---------------------------- */
export interface TwosCard {
  statements: string[]
  lieIndex: number
}
export interface TwosData {
  /** playerId -> 三条陈述 */
  cards: Record<string, TwosCard | null>
  /** 公开顺序（playerId） */
  order: string[]
  /** 当前正在公开第几个人的三条 */
  cursor: number
  /** authorId -> voterId -> 猜的下标 */
  votes: Record<string, Record<string, number>>
  /** authorId -> 是否已揭晓 */
  revealed: Record<string, boolean>
  /** authorId -> 被骗过的人数 */
  fooled: Record<string, number>
  /** 已经写完三条的人数 */
  waiting: number
}

/* ----------------------------- 海龟汤 ----------------------------- */
export type SoupAnswer = 'yes' | 'no' | 'partial' | 'none' | 'pending'
export interface SoupQuestion {
  id: string
  by: string
  byName: string
  text: string
  answer: SoupAnswer
  at: number
}
export interface SoupData {
  puzzleId: string
  title: string
  tags: string[]
  question: string
  truth: string
  /** 玩家提交的是非问句队列 */
  queue: SoupQuestion[]
  /** playerId -> 提问次数，用于评「最会提问奖」 */
  asked: Record<string, number>
  hintsUsed: number
  /** 有人举手宣布知道了 */
  declaredBy: string | null
  declaredAnswer: string
  solved: boolean
  solvedBy: string | null
  startedAt: number
  elapsedMs: number
}

/* ----------------------------- 数字炸弹 ----------------------------- */
export interface BombData {
  /** 当前区间 [low, high]，闭区间 */
  low: number
  high: number
  target: number
  history: { by: string; value: number }[]
  order: string[]
  cursor: number
  round: number
  maxRound: number
  /** playerId -> 踩雷次数 */
  booms: Record<string, number>
  loser: string | null
}

/* ------------------------------ 逢七过 ------------------------------ */
export interface SevenData {
  /** 下一个该处理的数字 */
  count: number
  /** 报数顺序（playerId） */
  order: string[]
  cursor: number
  /** playerId -> 失误次数 */
  mistakes: Record<string, number>
  /** 累计 3 次失误淘汰的人 */
  struck: string[]
  lastCall: { by: string; expect: number; kind: 'say' | 'pass'; correct: boolean } | null
  /** 每人反应时限（ms），会随数字变大而收紧 */
  speedMs: number
}

/* ----------------------------- 故事接龙 ----------------------------- */
export interface StoryPart {
  by: string
  byName: string
  text: string
  round: number
  score: number
  note: string
}
export interface StoryData {
  opening: string
  constraint: string
  parts: StoryPart[]
  /** playerId -> 本轮草稿，用于刷新页面不丢字 */
  drafts: Record<string, string>
  round: number
  maxRound: number
  scores: Record<string, number>
  /** 本轮最佳句子的 playerId */
  best: Record<number, string>
}

/* ---------------------------- 我有你没有 ---------------------------- */
export interface NeverData {
  /** playerId -> 出题内容 */
  claims: Record<string, string>
  order: string[]
  cursor: number
  /** 出题者 playerId -> 承认「我做过」的人的 playerId 列表 */
  didIt: Record<string, string[]>
  settled: Record<string, boolean>
  /** 出题者 -> 冷门加成 */
  cold: Record<string, number>
  /** 每人初始分 */
  startScore: number
}

/* ----------------------------- 你比我猜 ----------------------------- */
export interface MimeLogItem {
  word: string
  ok: boolean
  by: string
  seconds: number
}
export interface MimeData {
  difficulty: 'easy' | 'mid' | 'hard'
  /** 本场词表 */
  list: string[]
  index: number
  /** 当前比划者 */
  actorId: string | null
  correct: number
  skips: number
  streak: number
  bestStreak: number
  log: MimeLogItem[]
  /** 单轮时长 ms */
  timeMs: number
  round: number
  maxRound: number
  /** 每位比划者的得分 */
  scores: Record<string, number>
}

/* ------------------------------------------------------------------ *
 * 下发给某一端的视图：服务端按角色脱敏
 * ------------------------------------------------------------------ */

export interface RoomView {
  code: string
  seq: number
  gameId: string
  meta: GameMeta
  phase: string
  round: number
  turn: number
  deadlineAt: number | null
  serverNow: number
  judgeMode: JudgeMode
  refereeId: string | null
  role: Role
  me: Player | null
  players: Player[]
  events: RoomEvent[]
  finished: FinalResult | null
  /** 服务端已脱敏的公开数据，字段结构由各游戏自己决定 */
  publicData: Record<string, any>
  secret: Record<string, unknown>
  /** 仅房主（AI 裁判模式）或受命裁判可见 */
  referee: Record<string, any> | null
  needs: ViewNeeds
}

export interface ViewNeeds {
  /** 需要每个玩家做点什么 */
  prompt: string | null
  /**
   * options 非空时优先按按钮组渲染（忽略 input 的默认控件），
   * value 原样放进 act 的 payload 对应字段。
   */
  input: 'none' | 'text' | 'textarea' | 'number' | 'three' | 'pick'
  inputHint: string
  submitted: boolean
  /** 供按钮组/选择器使用 */
  options?: { value: string | number; label: string; hint?: string }[]
  /** 提交时 payload 里承载选中值的字段名，默认 'value' */
  valueKey?: string
  /** 大屏上的主持人提示 */
  hostHint: string
}
