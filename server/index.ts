import express from 'express'
import QRCode from 'qrcode'
import path from 'node:path'
import os from 'node:os'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  act,
  configureRoom,
  createRoom,
  getRoom,
  joinRoom,
  nextStep,
  normalize,
  roomCount,
  startRoom,
  tickAll,
  buildView,
  type CreateInput,
} from './rooms'
import { GAME_BY_ID } from '../src/shared/games'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env.PORT ?? 8787)

const app = express()
app.disable('x-powered-by')
app.use(express.json({ limit: '48kb' }))

const fail = (res: any, code: number, msg: string) => res.status(code).json({ error: msg })

app.get('/api/health', (_req, res) => res.json({ ok: true, rooms: roomCount() }))

app.post('/api/rooms', (req, res) => {
  const b = req.body ?? {}
  const profile = b.profile
  if (!profile || typeof profile.count !== 'number' || !GAME_BY_ID[b.gameId]) {
    return fail(res, 400, '缺少房间信息')
  }
  const input: CreateInput = {
    gameId: String(b.gameId),
    hostName: String(b.hostName ?? ''),
    judgeMode: b.judgeMode === 'human' ? 'human' : 'ai',
    profile: {
      count: Math.max(2, Math.min(30, Math.round(profile.count))),
      minutes: Math.max(3, Math.min(90, Math.round(profile.minutes ?? 10))),
      setting: ['seated', 'standing', 'lounging'].includes(profile.setting) ? profile.setting : 'seated',
      vibes: Array.isArray(profile.vibes)
        ? profile.vibes.filter((v: string) => ['laugh', 'warm', 'brain', 'rival'].includes(v)).slice(0, 4)
        : [],
      intimacy: ['strangers', 'colleagues', 'friends', 'family'].includes(profile.intimacy)
        ? profile.intimacy
        : 'friends',
      shyLevel: [0, 1, 2].includes(profile.shyLevel) ? profile.shyLevel : 1,
      propsOk: !!profile.propsOk,
      phonePerPerson: !!profile.phonePerPerson,
      wantMove: !!profile.wantMove,
    },
  }
  try {
    const { room, host } = createRoom(input)
    res.json({ code: room.code, token: host.id, view: buildView(room, host.id) })
  } catch (err: any) {
    fail(res, 400, err?.message ?? '建房失败')
  }
})

app.post('/api/join', (req, res) => {
  const code = normalize(req.body?.code)
  const room = getRoom(code)
  if (!room) return fail(res, 404, '找不到这个房间，检查一下房间号')
  const result = joinRoom(code, String(req.body?.name ?? ''))
  if (!result) {
    return fail(
      res,
      400,
      room.phase === 'lobby' ? '名字不太对，换一个试试' : '这局已经开始了，等下一局再加入吧',
    )
  }
  res.json({ code: room.code, token: result.player.id, view: buildView(room, result.player.id) })
})

app.get('/api/rooms/:code', (req, res) => {
  const room = getRoom(req.params.code)
  if (!room) return fail(res, 404, '房间不存在或已结束')
  const token = req.query.token ? String(req.query.token) : null
  if (token) {
    const p = room.players.find((x) => x.id === token)
    if (p) p.lastSeen = Date.now()
  }
  res.json({ view: buildView(room, token, req.query.watch === '1') })
})

app.post('/api/rooms/:code/configure', (req, res) => {
  const room = getRoom(req.params.code)
  if (!room) return fail(res, 404, '房间不存在或已结束')
  const token = String(req.body?.token ?? '')
  if (!room.players.some((p) => p.id === token && p.isHost)) return fail(res, 403, '只有房主能设置裁判')
  const err = configureRoom(room, {
    judgeMode: req.body?.judgeMode === undefined ? undefined : req.body.judgeMode === 'human' ? 'human' : 'ai',
    refereeId:
      req.body?.refereeId === undefined ? undefined : req.body.refereeId === null ? null : String(req.body.refereeId),
  })
  res.json({ error: err, view: buildView(room, token) })
})

app.post('/api/rooms/:code/action', (req, res) => {
  const room = getRoom(req.params.code)
  if (!room) return fail(res, 404, '房间不存在或已结束')
  const token = String(req.body?.token ?? '')
  const size = JSON.stringify(req.body?.payload ?? {}).length
  if (size > 4000) return fail(res, 400, '这段内容太长了')
  const err = act(room, token, String(req.body?.action ?? ''), req.body?.payload)
  res.json({ error: err, view: buildView(room, token) })
})

app.post('/api/rooms/:code/next', (req, res) => {
  const room = getRoom(req.params.code)
  if (!room) return fail(res, 404, '房间不存在或已结束')
  const token = String(req.body?.token ?? '')
  const err = req.body?.force ? startRoom(room, token) : nextStep(room, token || null)
  res.json({ error: err, view: buildView(room, token) })
})

app.get('/api/qr', async (req, res) => {
  const text = String(req.query.t ?? '')
  if (!/^https?:\/\/[^\s]{1,180}$/.test(text)) return fail(res, 400, 'bad url')
  try {
    const png = await QRCode.toBuffer(text, {
      type: 'png',
      width: 320,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: { dark: '#1b1240', light: '#ffffff' },
    })
    res.setHeader('content-type', 'image/png')
    res.setHeader('cache-control', 'public, max-age=300')
    res.send(png)
  } catch {
    fail(res, 500, '二维码生成失败')
  }
})

// 打包后 __dirname 是 dist/server，源码直跑时是项目根，两种布局都要能找到 index.html
const clientDir =
  [path.resolve(__dirname, '..', 'client'), path.resolve(__dirname, 'dist', 'client')].find((p) =>
    fs.existsSync(path.join(p, 'index.html')),
  ) ?? path.resolve(process.cwd(), 'dist/client')
app.use(express.static(clientDir))
app.get(/^\/(?!api\/).*/, (_req, res) => {
  res.sendFile(path.join(clientDir, 'index.html'), (err) => {
    if (err) res.status(404).send('先运行 npm run build')
  })
})

setInterval(() => tickAll(Date.now()), 400).unref()

app.listen(PORT, () => {
  const lan = Object.values(os.networkInterfaces())
    .flat()
    .filter((n) => n && n.family === 'IPv4' && !n.internal)
    .map((n) => n!.address)
  console.log(`本机访问  http://localhost:${PORT}`)
  lan.forEach((ip) => console.log(`聚会访问  http://${ip}:${PORT}`))
})
