/**
 * 线下聚会时大家会喊出口的话，做成一键按钮。
 * 只允许这份名单里的内容：服务端按名单校验，所以喊话不会被拿来刷屏或注入任意文本。
 */

export const QUICK_PHRASES = [
  '开始吧',
  '大家往前坐，不等了',
  '等一分钟开',
  '等三分钟开',
  '房主加个位置',
  '请操作快一点',
  '等我思考 30 秒',
  '我临时有事，等我几分钟',
  '我挂机了，你们玩',
  '我有事不玩了，拜拜',
  '最后一局，玩完这局我下了',
  '再来一局',
] as const

export const QUICK_REACTIONS = ['好啊', '抱歉，不行', '哈哈', '谢谢', '嘿嘿', '呜呜', '饶命'] as const

const ALLOWED = new Set<string>([...QUICK_PHRASES, ...QUICK_REACTIONS])

export const isQuickPhrase = (s: unknown): s is string => typeof s === 'string' && ALLOWED.has(s)