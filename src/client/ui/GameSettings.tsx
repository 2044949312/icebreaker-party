import { useState } from 'react'
import { configure } from '../api'
import type { RoomView } from '../../shared/types'

const INSIDER_OPTIONS = [1, 2, 3, 4]

/** 等待阶段的本局配置。非法选项直接禁用并说明原因，而不是让人选了再报错。 */
export function GameSettings({
  view,
  token,
  refresh,
}: {
  view: RoomView
  token: string | null
  refresh: () => void
}) {
  const [err, setErr] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (view.gameId !== 'spy' || view.phase !== 'lobby') return null

  const d = (view.publicData?.spy ?? {}) as Record<string, any>
  const canEdit = view.role === 'host' && !!token
  const seated = Number(d.seatedCount ?? 0)
  const insiders = Number(d.insiderCount ?? 1)
  const max = Number(d.insiderMax ?? 1)
  const auto = Number(d.insiderAuto ?? 1)
  const pref = (d.insiderPref ?? null) as number | null
  const oral = d.describeMode !== 'typed'

  const send = async (game: Record<string, unknown>) => {
    if (!canEdit || !token) return
    setBusy(true)
    const r = await configure(view.code, token, { game })
    setErr(r.error ?? null)
    setBusy(false)
    // 标签页在后台时轮询会被浏览器节流，点完要立刻拉一次才有反馈
    refresh()
  }

  const disabled = !canEdit || busy

  return (
    <div className="panel settings">
      <div className="h">{canEdit ? '本局配置，你可以修改' : '本局配置，只有房主能改'}</div>

      <label className="blk">卧底数量</label>
      <div className="seg" style={{ marginBottom: 8 }}>
        <button
          className={pref === null ? 'on' : ''}
          disabled={disabled}
          onClick={() => void send({ insiderPref: null })}
        >
          自动
        </button>
        {INSIDER_OPTIONS.map((n) => (
          <button
            key={n}
            className={pref === n ? 'on' : ''}
            disabled={disabled || n > max}
            title={n > max ? `当前配置最多支持 ${max} 个卧底` : undefined}
            onClick={() => void send({ insiderPref: n })}
          >
            {n}
          </button>
        ))}
      </div>
      <p className="notice" style={{ marginBottom: 14 }}>
        {max < INSIDER_OPTIONS[INSIDER_OPTIONS.length - 1]
          ? `当前配置最多支持 ${max} 个卧底。自动 = ${auto} 个（8 人以上给 2 个）。`
          : `自动 = ${auto} 个（8 人以上给 2 个）。`}
      </p>

      <label className="blk">描述方式</label>
      <div className="seg" style={{ marginBottom: 8 }}>
        <button className={oral ? 'on' : ''} disabled={disabled} onClick={() => void send({ describeMode: 'oral' })}>
          🗣 口头描述
        </button>
        <button className={!oral ? 'on' : ''} disabled={disabled} onClick={() => void send({ describeMode: 'typed' })}>
          ⌨️ 打字描述
        </button>
      </div>
      <p className="notice" style={{ marginBottom: 14 }}>
        {oral
          ? '大家围坐着开口说，手机只负责发词、计时和投票。说完点「我说完了」。'
          : '每人在手机上打一句描述，大屏统一公开。适合不方便开口的场合。'}
      </p>

      <div className="settings-summary">
        {seated >= 2 ? `平民 ${Math.max(0, seated - insiders)} 人 · 卧底 ${insiders} 人` : '人进来之后自动算'}
        {view.judgeMode === 'human' && view.refereeId ? ' · 另有 1 名裁判不参与发词' : ''}
      </div>

      {err && <div className="banner err" style={{ marginTop: 12 }}>{err}</div>}
    </div>
  )
}