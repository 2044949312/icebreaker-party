import type { FinalResult, Player, Room, RoomView, ViewNeeds } from '../types'

/**
 * 每个游戏实现这个接口。服务端是唯一权威：引擎只允许修改传入的 room，
 * 不允许发起 IO、不允许读时间以外的全局状态（tick 里的 now 由服务端传入）。
 */
export interface GameEngine {
  id: string

  /** 建房后调用：填好 data.xxx、把 phase 停在等待开始的状态 */
  create(room: Room): void

  /** 房主点「开始」后调用：分配身份/题目、进入第一个正式阶段 */
  start(room: Room): void

  /**
   * 玩家或裁判的一次提交。
   * action 由各游戏自定义，payload 已经在服务端做过 JSON 解析。
   * 非法/迟到的动作请静默忽略，不要抛错（手机端会重试）。
   */
  act(room: Room, actor: Player, action: string, payload: any): void

  /** 大屏或裁判面板上的「下一步」；done 表示主动结束本局 */
  next(room: Room, actor: Player | null): void

  /** 每个 tick（约 500ms）调用一次，用于倒计时到点、超时判负等 */
  tick(room: Room, now: number): void

  /** 下发给所有端的公开数据，必须不含任何他人隐私 */
  publicData(room: Room): Record<string, any>

  /** 当前玩家看到的自己那份私密信息 */
  secretFor(room: Room, me: Player): Record<string, unknown>

  /** 裁判（AI 模式时房主代看）额外能看到的答案 */
  refereeExtra(room: Room): Record<string, unknown>

  /** 告诉某一端现在该做什么 */
  needs(room: Room, me: Player | null, view: RoomView): ViewNeeds

  /** 结算 */
  finish(room: Room): FinalResult
}

export type EngineRegistry = Record<string, GameEngine>
