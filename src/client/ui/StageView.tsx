import type { StageModel } from '../games/model'

const TONE_CLASS = {
  normal: '',
  hot: 'hot',
  cool: 'cool',
  danger: 'danger',
  win: 'win',
} as const

export function StageView({ model }: { model: StageModel }) {
  const tone = model.tone ?? 'normal'
  const max = model.bars?.reduce((m, b) => Math.max(m, b.value), 0) || 1

  return (
    <div className="stack">
      <div className={`row ${TONE_CLASS[tone] === 'hot' ? 'hot' : ''}`} style={{ gap: 8 }}>
        <span className={`chip ${TONE_CLASS[tone] === 'danger' ? 'hot' : tone === 'win' ? 'hot' : 'dim'}`}>
          {model.eyebrow}
        </span>
        {model.chips?.map((c, i) => (
          <span className="chip" key={i}>
            {c}
          </span>
        ))}
      </div>

      <div className={`mega ${tone === 'danger' ? '' : ''}`} style={bigStyle(tone)}>
        {model.focus}
      </div>
      {model.focusHint && (
        <p
          className="sub"
          style={{ fontSize: 'clamp(16px, 2.1vw, 22px)', maxWidth: '22em', marginTop: 6 }}
        >
          {model.focusHint}
        </p>
      )}

      {model.paras && model.paras.length > 0 && (
        <div className="biglist" style={{ marginTop: 18 }}>
          {model.paras.map((p, i) => (
            <div className="bigrow" key={i}>
              <span className="who">{p.head}</span>
              <span className="what">{p.body}</span>
            </div>
          ))}
        </div>
      )}

      {model.rows && model.rows.length > 0 && (
        <div className="biglist" style={{ marginTop: 18 }}>
          {model.rows.map((r, i) => (
            <div className={`bigrow ${r.win ? 'win' : ''}`} key={i}>
              {r.who && <span className="who">{r.who}</span>}
              <span className="what">{r.what}</span>
              {r.right && <span className="pct">{r.right}</span>}
            </div>
          ))}
        </div>
      )}

      {model.bars && model.bars.length > 0 && (
        <div className="stack" style={{ gap: 10, marginTop: 20 }}>
          {model.bars.map((b, i) => (
            <div key={i}>
              <div className="row between" style={{ fontSize: 14, marginBottom: 3 }}>
                <span>
                  {b.label}
                  {b.mark ? <span className="chip hot" style={{ marginLeft: 8 }}>{b.mark}</span> : null}
                </span>
                <b className="mono">{b.value}</b>
              </div>
              <div className="bar">
                <i style={{ width: `${(b.value / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {model.note && (
        <p className="notice" style={{ marginTop: 20, maxWidth: '46ch' }}>
          {model.note}
        </p>
      )}
    </div>
  )
}

function bigStyle(tone: string) {
  if (tone === 'danger') return { color: 'var(--accent)' }
  if (tone === 'hot') return { color: 'var(--accent-2)' }
  if (tone === 'cool') return { color: 'var(--cool)' }
  if (tone === 'win') return { color: 'var(--good)' }
  return undefined
}
