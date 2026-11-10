import { useState } from 'react'
import { joinRoom } from '../api'
import { go, saveToken } from '../route'

export function Join({ initialCode }: { initialCode: string }) {
  const [code, setCode] = useState(initialCode.slice(0, 4))
  const [name, setName] = useState(() => localStorage.getItem('icebreaker.name') ?? '')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const submit = async () => {
    if (code.length !== 4) return setErr('房间号是 4 位，看看大屏上的方块数字')
    if (!name.trim()) return setErr('起个名字，大家才知道谁是谁')
    setBusy(true)
    setErr(null)
    try {
      const res = await joinRoom(code.toUpperCase(), name.trim())
      localStorage.setItem('icebreaker.name', name.trim())
      saveToken(res.code, res.token)
      go(`/p?c=${res.code}`)
    } catch (e: any) {
      setErr(e?.message ?? '进不去这个房间')
      setBusy(false)
    }
  }

  return (
    <div className="app">
      <div className="wrap">
        <div className="center-v" style={{ minHeight: '88vh' }}>
          <p className="kicker">JOIN THE ROOM</p>
          <h1 className="big">加入房间</h1>
          <p className="sub">
            照着大屏上的 4 位房间号填。手机只需要这一个网页，什么都不用装。
          </p>

          <div className="card" style={{ width: '100%', marginTop: 20 }}>
            <label className="blk">房间号</label>
            <input
              className="field code"
              value={code}
              inputMode="text"
              autoCapitalize="characters"
              maxLength={4}
              placeholder="————"
              onChange={(e) => {
                setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4))
                setErr(null)
              }}
            />
            <label className="blk" style={{ marginTop: 16 }}>
              你的名字
            </label>
            <input
              className="field"
              value={name}
              maxLength={12}
              placeholder="真名或外号都行"
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && void submit()}
            />
            {err && <div className="banner err" style={{ marginTop: 14 }}>{err}</div>}
            <button
              className="btn primary big"
              style={{ marginTop: 16 }}
              disabled={busy}
              onClick={() => void submit()}
            >
              {busy ? <span className="spin" /> : '进场'}
            </button>
          </div>

          <p className="notice center" style={{ marginTop: 18 }}>
            投屏的那台设备？
            <button className="btn link" onClick={() => go(`/host?c=${code || ''}`)}>
              打开主持人屏
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
