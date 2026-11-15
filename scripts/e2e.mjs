/**
 * 无头端到端：用真实 HTTP 接口把 8 个游戏各跑一局，顺带做答案泄露检查。
 * 用法：node scripts/e2e.mjs [gameId ...]
 */
const BASE = process.env.BASE ?? 'http://localhost:8787'

async function j(pathname, body) {
  const res = await fetch(BASE + pathname, {
    method: body === undefined ? 'GET' : 'POST',
    // 浏览器同源 POST 一定带 Origin，Sites 网关会拦掉没有 Origin 的写请求
    headers: { 'content-type': 'application/json', origin: new URL(BASE).origin },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`${pathname} -> ${res.status} ${data.error ?? ''}`)
  return data
}

const profile = (count) => ({
  count,
  minutes: 15,
  setting: 'seated',
  vibes: ['laugh', 'rival'],
  intimacy: 'friends',
  shyLevel: 1,
  propsOk: true,
  phonePerPerson: true,
  wantMove: false,
})

const rnd = (n) => Math.floor(Math.random() * n)
const one = (a) => a[rnd(a.length)]

const CLAIMS = ['我去过南极', '我中过五千块以上的彩票', '我会转笔', '我吃过后空翻', '我和明星合过影']
const DESCRIPTIONS = ['这个东西挺常见的', '小时候经常见到', '它一般成对出现', '颜色偏浅，摸起来软', '很多人第一天就会用到']
const QUESTIONS = ['跟时间有关吗', '现场还有别人吗', '如果换成白天结果会不同吗', '主角是自愿的吗', '跟天气有关吗']
const LINES = ['就在这时，灯突然灭了。', '他这才想起口袋里那把钥匙。', '门外站着一个没穿鞋的人。', '所有人都假装没听见。']

const isSevenish = (n) => n % 7 === 0 || String(n).includes('7')

/** 返回 { action, payload }，没有要做的就返回 null */
function botMove(view, selfId) {
  const g = view.gameId
  const n = view.needs
  const pid = (x) => x === selfId

  if (g === 'soup') {
    if (view.judgeMode === 'human' && view.role === 'referee') {
      const extra = view.referee ?? {}
      const pending = extra.pending ?? []
      if (pending.length) return { action: 'answer', payload: { id: pending[0].id, answer: one(['yes', 'no', 'partial', 'none']) } }
      if (extra.declaredBy) return { action: 'verdict', payload: { ok: true } }
      return null
    }
    if (n.input === 'text') {
      if (Math.random() < 0.18) return { action: 'solve', payload: { answer: one(CLAIMS) } }
      return { action: 'ask', payload: { text: one(QUESTIONS) } }
    }
    return null
  }

  if (n.input === 'three') return { action: 'write', payload: { statements: [one(CLAIMS), one(DESCRIPTIONS), one(LINES)], lieIndex: 1 } }
  if (n.input === 'number') {
    const m = /(\d+)\s*到\s*(\d+)/.exec(n.inputHint ?? '')
    const lo = m ? Number(m[1]) : 1
    const hi = m ? Number(m[2]) : 100
    return { action: 'guess', payload: { value: Math.floor((lo + hi) / 2) } }
  }

  if (n.input === 'pick') {
    const opts = n.options ?? []
    if (!opts.length) return null
    const key = n.valueKey ?? 'value'
    let value = opts[0].value
    if (g === 'seven') {
      // 全对的机器人永远淘汰不掉人，按 20% 概率嘴瓢
      const right = isSevenish(view.publicData.seven?.count ?? 1) ? 'pass' : 'say'
      value = Math.random() < 0.2 ? (right === 'say' ? 'pass' : 'say') : right
    } else if (g === 'never') value = Math.random() < 0.35 ? 'yes' : 'no'
    else if (g === 'twos') value = one(opts.map((o) => o.value))
    else if (g === 'spy') value = one(opts.map((o) => o.value))
    else if (g === 'mime') value = opts.some((o) => o.value === 'correct') ? 'correct' : opts[0].value
    const action = g === 'mime' ? (value === 'correct' ? 'wordCorrect' : 'wordSkip') : n.actionHint ?? specAction(g, view.phase)
    void pid
    return { action, payload: { [key]: value } }
  }

  if (n.input === 'text' || n.input === 'textarea') {
    if (n.submitted) return null
    const action = specAction(g, view.phase)
    const text = g === 'spy' ? one(DESCRIPTIONS) : g === 'story' ? one(LINES) : g === 'never' ? '我有你没有：' + one(CLAIMS) : one(QUESTIONS)
    return { action, payload: { text } }
  }
  return null
}

function specAction(g, phase) {
  if (g === 'spy') return phase === 'describe' ? 'describe' : 'vote'
  if (g === 'twos') return phase === 'write' ? 'write' : 'vote'
  if (g === 'story') return 'line'
  if (g === 'never') return phase === 'write' ? 'claim' : 'didIt'
  if (g === 'bomb') return 'guess'
  if (g === 'seven') return 'call'
  if (g === 'soup') return 'ask'
  if (g === 'mime') return 'wordSkip'
  return 'noop'
}

const LEAK_KEYS = {
  spy: (host) => ({ words: [host.referee?.insider].filter(Boolean), until: 'reveal' }),
  soup: (host) => ({ words: [host.referee?.truth].filter(Boolean), until: 'over' }),
}

async function playGame(gameId, count, judgeMode) {
  const created = await j('/api/rooms', { gameId, hostName: '主持人', judgeMode, profile: profile(count) })
  const code = created.code
  const host = created.token
  const tokens = [host]
  for (let i = 1; i < count; i++) {
    const r = await j('/api/join', { code, name: '玩家' + i })
    tokens.push(r.token)
  }
  if (judgeMode === 'human') {
    await j(`/api/rooms/${code}/configure`, { token: host, judgeMode: 'human', refereeId: tokens[1] })
  }
  await j(`/api/rooms/${code}/next`, { token: host })

  const phases = []
  const leaks = []
  let lastPhase = ''
  let iter = 0
  for (; iter < 500; iter++) {
    const hv = (await j(`/api/rooms/${code}?token=${host}`)).view
    if (hv.phase !== lastPhase) {
      phases.push(hv.phase)
      lastPhase = hv.phase
    }
    if (hv.phase === 'over') break

    const rule = LEAK_KEYS[gameId]?.(hv)
    for (const t of tokens) {
      const v = (await j(`/api/rooms/${code}?token=${t}`)).view
      if (!v) throw new Error(`${gameId}: 玩家视图为空`)
      if (rule && v.phase !== rule.until && v.phase !== 'over' && v.role !== 'referee' && !v.role.startsWith('host')) {
        const blob = JSON.stringify(v)
        for (const w of rule.words) if (w && blob.includes(w)) leaks.push(`${v.phase}: 视图里出现了「${w}」`)
      }
      const mv = botMove(v, t)
      if (mv) await j(`/api/rooms/${code}/action`, { token: t, action: mv.action, payload: mv.payload })
    }
    // 逢七过靠倒计时淘汰人、海龟汤靠 20 分钟收尾，这两个不能狂按「下一步」
    if (gameId === 'seven') {
      await new Promise((r) => setTimeout(r, 200))
    } else if (gameId !== 'soup' || iter % 25 === 24) {
      await j(`/api/rooms/${code}/next`, { token: host })
    }
  }

  let final = (await j(`/api/rooms/${code}?token=${host}`)).view
  for (let k = 0; k < 12 && final.phase === 'over' && !final.finished; k++) {
    await new Promise((r) => setTimeout(r, 400))
    final = (await j(`/api/rooms/${code}?token=${host}`)).view
  }
  const scores = final.players.map((p) => `${p.name}:${p.score}`)
  const ok = final.phase === 'over' && !!final.finished
  const tag = ok ? '✓' : '✗'
  console.log(
    `${tag} ${gameId}(${judgeMode}) ${count}人 iters=${iter} phases=${phases.join('>') || '—'} ` +
      `winner=${(final.finished?.winners ?? []).map((w) => w.name).join('、') || '无'} 分=${scores.join(' ')} 事件=${final.events.length}`,
  )
  if (leaks.length) console.log('   !! 泄露:', [...new Set(leaks)].slice(0, 3).join(' / '))
  if (!ok) console.log('   !! 没打完，卡在', final.phase, JSON.stringify(final.needs))
  return ok && leaks.length === 0
}

const TABLE = [
  ['spy', 6, 'ai'],
  ['spy', 6, 'human'],
  ['twos', 5, 'ai'],
  ['soup', 4, 'ai'],
  ['soup', 4, 'human'],
  ['bomb', 5, 'ai'],
  ['seven', 6, 'ai'],
  ['seven', 6, 'human'],
  ['story', 5, 'ai'],
  ['never', 5, 'ai'],
  ['mime', 5, 'ai'],
]

const wanted = process.argv.slice(2)
let pass = 0
let total = 0
for (const [g, n, mode] of TABLE) {
  if (wanted.length && !wanted.includes(g)) continue
  total++
  try {
    if (await playGame(g, n, mode)) pass++
  } catch (err) {
    console.log(`✗ ${g}(${mode}) 抛错: ${err.message}`)
  }
}
console.log(`\n${pass}/${total} 通过`)
process.exit(pass === total ? 0 : 1)
