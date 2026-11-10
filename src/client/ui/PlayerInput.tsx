import { useEffect, useState } from 'react'
import type { ViewNeeds } from '../../shared/types'

export interface InputSpec {
  /** 提交时调用的引擎动作名 */
  action: string
  /** 文本类内容放进 payload 的哪个字段 */
  field?: string
  /** 一个控件承载多个动作时，按选项值分派 */
  map?: Record<string, string>
}

const NUM_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

/**
 * 按 needs.input 渲染唯一的提交控件。
 * 八个游戏共用，所以新加游戏不需要新写输入框。
 */
export function PlayerInput({
  needs,
  spec,
  onSubmit,
  disabled,
}: {
  needs: ViewNeeds
  spec: InputSpec
  onSubmit: (action: string, payload: unknown) => Promise<string | null>
  disabled?: boolean
}) {
  const [text, setText] = useState('')
  const [num, setNum] = useState('')
  const [three, setThree] = useState(['', '', ''])
  const [lie, setLie] = useState<number | null>(null)
  const [sending, setSending] = useState(false)
  const [fail, setFail] = useState<string | null>(null)

  useEffect(() => {
    if (needs.submitted) {
      setText('')
      setNum('')
    }
  }, [needs.submitted, needs.input])

  const fire = async (payload: unknown, actionOverride?: string) => {
    setSending(true)
    setFail(null)
    const err = await onSubmit(actionOverride ?? spec.action, payload)
    setSending(false)
    if (err) setFail(err)
  }

  if (needs.input === 'pick' && needs.options?.length) {
    return (
      <div className="stack">
        {fail && <div className="banner err">{fail}</div>}
        <div className="opts">
          {needs.options.map((o) => (
            <button
              key={String(o.value)}
              className="opt"
              disabled={disabled || sending}
              onClick={() =>
                void fire(
                  { [needs.valueKey ?? 'value']: o.value },
                  spec.map?.[String(o.value)] ?? spec.action,
                )
              }
            >
              <b>{o.label}</b>
              {o.hint && <span>{o.hint}</span>}
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (needs.input === 'number') {
    return (
      <div className="stack">
        {fail && <div className="banner err">{fail}</div>}
        <input
          className="field num"
          inputMode="numeric"
          pattern="[0-9]*"
          value={num}
          placeholder="—"
          onChange={(e) => setNum(e.target.value.replace(/\D/g, '').slice(0, 3))}
        />
        <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {NUM_KEYS.concat('清除', '提交').map((k) => {
            const isSubmit = k === '提交'
            const isClear = k === '清除'
            return (
              <button
                key={k}
                className={isSubmit ? 'btn go' : 'btn'}
                style={isSubmit ? { gridColumn: 'span 2' } : undefined}
                disabled={disabled || sending || (!isClear && !isSubmit && num.length >= 3)}
                onClick={() => {
                  if (isClear) setNum('')
                  else if (isSubmit) {
                    const v = Number(num)
                    if (num && Number.isFinite(v)) void fire({ [spec.field ?? 'value']: v })
                  } else setNum((s) => (s + k).slice(0, 3))
                }}
              >
                {k}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (needs.input === 'three') {
    const ready = three.every((t) => t.trim().length > 1) && lie !== null
    return (
      <div className="stack">
        {fail && <div className="banner err">{fail}</div>}
        {three.map((t, i) => (
          <div key={i}>
            <label className="blk">第 {['一', '二', '三'][i]} 件事</label>
            <textarea
              className="field"
              style={{ minHeight: 62 }}
              maxLength={60}
              value={t}
              placeholder={i === lie ? '这条是假的' : '写一件关于你的事'}
              onChange={(e) => setThree((arr) => arr.map((x, j) => (j === i ? e.target.value : x)))}
            />
          </div>
        ))}
        <label className="blk" style={{ marginTop: 12 }}>
          哪一条是你编的？
        </label>
        <div className="seg">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              className={lie === i ? 'on' : ''}
              onClick={() => setLie(i)}
              disabled={disabled}
            >
              第{['一', '二', '三'][i]}条
            </button>
          ))}
        </div>
        <button
          className="btn primary big"
          disabled={!ready || disabled || sending}
          onClick={() =>
            void fire({ statements: three.map((s) => s.trim()), lieIndex: lie ?? 0 })
          }
        >
          {sending ? <span className="spin" /> : '提交我的三条'}
        </button>
      </div>
    )
  }

  if (needs.input === 'none') return null

  const isLong = needs.input === 'textarea'
  const canSend = text.trim().length > 0 && !disabled && !sending
  return (
    <div className="stack">
      {fail && <div className="banner err">{fail}</div>}
      <textarea
        className="field"
        style={isLong ? undefined : { minHeight: 60 }}
        maxLength={isLong ? 100 : 80}
        value={text}
        placeholder={needs.inputHint || '写点什么'}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="row between dim">
        <span>{text.length} 字</span>
        {text.trim().length === 0 && <span>空着不算回答</span>}
      </div>
      <button className="btn primary big" disabled={!canSend} onClick={() => void fire({ [spec.field ?? 'text']: text.trim() })}>
        {sending ? <span className="spin" /> : '提交'}
      </button>
    </div>
  )
}
