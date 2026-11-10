import { GAMES } from './games'
import type { GameMeta, Profile, Recommendation, Vibe } from './types'

/** 需求名单 → 排序后的推荐结果（含可解释理由） */

const VIBE_ATTR: Record<Vibe, 'chaos' | 'warmth' | 'thinking' | 'rivalry'> = {
  laugh: 'chaos',
  warm: 'warmth',
  brain: 'thinking',
  rival: 'rivalry',
}

const VIBE_LABEL: Record<Vibe, string> = {
  laugh: '爆笑',
  warm: '走心',
  brain: '烧脑',
  rival: '竞技',
}

/** 不同熟悉度下，对「表达量 / 私人暴露 / 门槛」的偏好 */
const INTIMACY_PREFER: Record<Profile['intimacy'], (g: GameMeta) => number> = {
  strangers: (g) =>
    clamp01(g.needs.shyFriendly / 2) * 0.6 + clamp01(g.needs.warmth / 2) * 0.4,
  colleagues: (g) =>
    clamp01(g.needs.shyFriendly / 2) * 0.45 +
    clamp01(1 - g.needs.talking / 2) * 0.15 +
    clamp01(g.needs.thinking / 2) * 0.4,
  friends: (g) => clamp01(g.needs.chaos / 2) * 0.5 + clamp01(g.needs.rivalry / 2) * 0.5,
  family: (g) =>
    clamp01(1 - g.needs.thinking / 2) * 0.5 + clamp01(g.needs.shyFriendly / 2) * 0.5,
}

const PHONE_LABEL = { none: '不看手机', some: '一两台设备', each: '人手一台手机' } as const

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n))
}

/** 人数落进最佳区间给满分，区间外按距离衰减，超出可玩范围直接不推荐 */
function crowdFit(g: GameMeta, count: number) {
  const [lo, hi] = g.bestPlayers
  if (count >= lo && count <= hi) return 1
  if (count >= g.minPlayers && count <= g.maxPlayers) {
    const dist = count < lo ? lo - count : count - hi
    return Math.max(0.45, 1 - dist * 0.18)
  }
  return 0
}

function timeFit(g: GameMeta, minutes: number) {
  const [lo, hi] = g.minutes
  if (minutes >= lo && minutes <= hi) return 1
  if (minutes < lo) return clamp01(1 - (lo - minutes) / Math.max(lo, 1))
  return clamp01(1 - (minutes - hi) / 25)
}

function vibeFit(g: GameMeta, vibes: Vibe[]) {
  if (!vibes.length) return 0.6
  let sum = 0
  for (const v of vibes) sum += clamp01(g.needs[VIBE_ATTR[v]] / 2)
  return clamp01(sum / vibes.length)
}

function energyFit(g: GameMeta, p: Profile) {
  if (!g.needs.move) return p.wantMove ? 0.75 : 1
  if (p.wantMove) return 1
  if (p.setting === 'standing') return 0.9
  if (p.setting === 'lounging') return 0.25
  return 0.4
}

function shyFit(g: GameMeta, p: Profile) {
  if (p.shyLevel === 0) return 1
  return clamp01(0.35 + (g.needs.shyFriendly / 2) * 0.65 - (p.shyLevel - 1) * 0.05)
}

function deviceFit(g: GameMeta, p: Profile) {
  if (g.needs.phones === 'none') return 1
  if (g.needs.phones === 'some') return 1
  if (p.phonePerPerson) return 1
  if (p.setting === 'standing') return 0.3
  return 0.15
}

function settingFit(g: GameMeta, p: Profile) {
  if (p.setting === 'seated') return g.needs.talking >= 2 ? 0.85 : 1
  if (p.setting === 'lounging') return g.needs.move ? 0.5 : 1
  return 1
}

/** 命中硬条件，直接判死 */
function blockers(g: GameMeta, p: Profile): string[] {
  const out: string[] = []
  if (p.count < g.minPlayers) out.push(`人不够，至少需要 ${g.minPlayers} 人`)
  if (p.count > g.maxPlayers) out.push(`人太多，最多容得下 ${g.maxPlayers} 人`)
  if (!p.phonePerPerson && g.needs.phones === 'each')
    out.push('需要人手一台手机，你的场合不满足')
  if (p.minutes < 4 && g.minutes[0] > 8) out.push('时间太短，这一局收不了尾')
  return out
}

function buildWhy(g: GameMeta, p: Profile, parts: Record<string, number>) {
  const why: string[] = []
  const [lo, hi] = g.bestPlayers

  if (p.count >= lo && p.count <= hi) {
    why.push(
      lo === hi
        ? `${p.count} 人正好卡在它的最佳人数上`
        : `${p.count} 人落在它最舒服的 ${lo}–${hi} 人区间`,
    )
  } else if (crowdFit(g, p.count) >= 0.7) {
    why.push(`${p.count} 人也能玩，只是不在最舒服的 ${lo}–${hi} 人段`)
  }

  if (parts.vibe >= 0.8) {
    const hits = p.vibes.filter((v) => g.needs[VIBE_ATTR[v]] >= 1)
    if (hits.length) {
      why.push(
        `你想要${hits.map((v) => VIBE_LABEL[v]).join('、')}，它在这一点上几乎是全场最强（${p.vibes
          .map((v) => `${VIBE_LABEL[v]} ${g.needs[VIBE_ATTR[v]]}/2`)
          .join('、')})`,
      )
    }
  }

  if (parts.time >= 0.9) {
    why.push(`一局大约 ${g.minutes[0]}–${g.minutes[1]} 分钟，和你留出的 ${p.minutes} 分钟很合`)
  }

  if (p.shyLevel >= 1 && g.needs.shyFriendly >= 2) {
    why.push(
      p.shyLevel === 2
        ? '有社恐的伙伴也没事：不用主动表演，轮到才说一句'
        : '节奏温和，内向的人不会被推着上台',
    )
  }

  if (p.setting === 'standing' && g.needs.move) {
    why.push('需要站起来走动，正好配你们站着玩的状态')
  }
  if (!g.needs.move && p.setting !== 'standing' && parts.setting >= 0.95) {
    why.push('全程坐着就行，围桌或沙发都合适')
  }

  if (p.intimacy === 'strangers' && g.needs.warmth >= 2) {
    why.push('彼此还不熟时，这一局天然会聊出很多背景故事')
  }
  if (p.intimacy === 'friends' && g.needs.chaos >= 2) {
    why.push('熟人局放得开，笑点会被放大')
  }
  if (p.intimacy === 'family' && g.needs.thinking === 0) {
    why.push('规则一句话讲完，不用动脑也能立刻上手')
  }

  if (g.judgeModes.length === 2 && parts.device >= 0.9) {
    why.push('AI 裁判和真人裁判都能选，现场谁顺手就交给谁')
  }

  return why.slice(0, 4)
}

function buildWatch(g: GameMeta, p: Profile, parts: Record<string, number>) {
  const watch: string[] = []
  if (g.needs.move && !p.wantMove) {
    watch.push('必须起身活动，你们如果不想动会有点勉强')
  }
  if (g.needs.phones === 'each' && p.phonePerPerson) {
    watch.push('每一步都要在手机上提交，记得提醒大家手机要有电')
  }
  if (g.needs.shyFriendly === 0 && p.shyLevel >= 1) {
    watch.push('比划者会被全场盯着，内向的人最好先自愿报名')
  }
  if (timeFit(g, p.minutes) < 0.8) {
    watch.push(
      p.minutes < g.minutes[0]
        ? `完整一局要 ${g.minutes[0]} 分钟起，你们只留了 ${p.minutes} 分钟，可以只打半场`
        : `它 ${g.minutes[1]} 分钟就会腻，剩下时间建议换下一个游戏`,
    )
  }
  if (p.count > g.bestPlayers[1]) {
    watch.push(`超过 ${g.bestPlayers[1]} 人后等待轮次会变长，建议分成两桌`)
  }
  if (g.needs.talking === 2 && p.setting === 'lounging') {
    watch.push('发言密集，嘈杂环境里要有人维持秩序')
  }
  if (g.props.length) watch.push(`需要道具：${g.props.join('、')}`)
  return watch.slice(0, 3)
}

export interface RankedGame {
  rec: Recommendation
  game: GameMeta
}

export function recommend(p: Profile): { picked: RankedGame[]; dropped: RankedGame[] } {
  const picked: RankedGame[] = []
  const dropped: RankedGame[] = []

  for (const g of GAMES) {
    const parts = {
      crowd: crowdFit(g, p.count),
      time: timeFit(g, p.minutes),
      vibe: vibeFit(g, p.vibes),
      energy: energyFit(g, p),
      shy: shyFit(g, p),
      device: deviceFit(g, p),
      setting: settingFit(g, p),
      intimacy: clamp01(INTIMACY_PREFER[p.intimacy](g)),
    }

    const total =
      parts.crowd * 0.2 +
      parts.time * 0.13 +
      parts.vibe * 0.28 +
      parts.energy * 0.09 +
      parts.shy * 0.08 +
      parts.device * 0.08 +
      parts.setting * 0.06 +
      parts.intimacy * 0.08

    const hard = blockers(g, p)
    const score = hard.length ? 0 : total

    const rec: Recommendation = {
      gameId: g.id,
      score,
      percent: Math.round(score * 100),
      why: hard.length ? [] : buildWhy(g, p, parts),
      watch: hard.length ? [] : buildWatch(g, p, parts),
    }

    if (hard.length) {
      rec.watch = hard
      dropped.push({ rec, game: g })
    } else {
      picked.push({ rec, game: g })
    }
  }

  picked.sort((a, b) => b.rec.score - a.rec.score || a.game.name.localeCompare(b.game.name))
  dropped.sort((a, b) => a.game.name.localeCompare(b.game.name))
  return { picked, dropped }
}
