import type { RoomView } from '../../shared/types'
import type { InputSpec } from '../ui/PlayerInput'

/** 大屏的通用视觉模型：每个游戏只产出一个纯数据结构。 */
export interface StageModel {
  eyebrow: string
  focus: string
  focusHint?: string
  tone?: 'normal' | 'hot' | 'cool' | 'danger' | 'win'
  rows?: { who?: string; what: string; right?: string; win?: boolean }[]
  bars?: { label: string; value: number; mark?: string }[]
  paras?: { head: string; body: string }[]
  chips?: string[]
  note?: string
}

export interface ExtraButton {
  action: string
  label: string
  /** 给了就先展开一个输入框，把内容放进这个字段再提交 */
  text?: { label: string; placeholder: string; field: string; max?: number }
  payload?: Record<string, unknown>
  when: (view: RoomView, me: NonNullable<RoomView['me']>) => boolean
}

export interface GameUI {
  stage(view: RoomView): StageModel
  /** 轮到谁，用于座位高亮 */
  turnId?(view: RoomView): string | null
  /** 手机端主控件提交到哪个动作 */
  input?(view: RoomView): InputSpec | null
  /** 主控件之外的附加按钮 */
  extras?: ExtraButton[]
  /** 裁判面板里的判定按钮 */
  judgeActions?: ExtraButton[]
  /** 阶段中文名，大屏左上角 */
  phaseName(view: RoomView): string
}

export const nameOf = (view: RoomView, id: string | null | undefined) =>
  (id && view.players.find((p) => p.id === id)?.name) || '某人'

export const seatOf = (view: RoomView, id: string) => view.players.find((p) => p.id === id)

export const done = (n: number, total: number) => `已提交 ${n} / ${total}`

export const countDone = (map: Record<string, unknown> | undefined, ids: string[]) =>
  ids.filter((id) => {
    const v = map?.[id]
    return v !== undefined && v !== null && v !== ''
  }).length
