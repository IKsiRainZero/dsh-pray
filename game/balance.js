/**
 * dsh-pray v0.4 balance sheet.
 *
 * Five named levels, 催更 / 发版 reset layers, 释怀 prestige.
 * The Level 5 name is a phrase, not an image. Attention protection is a
 * first-class setting: automatic purchases, card hidden by default.
 */

export const VERSION = '0.6.1'
export const SCHEMA = 5

export const RELEASE_THRESHOLD = 1e12
export const LEVEL_PURCHASE_MULTIPLIER = 1.2
export const DAILY_WISH_CAP = 30
export const ACTIVE_SECONDS_PER_WISH = 600
export const OFFLINE_CAP_SECONDS = 8 * 3600
export const OFFLINE_CAP_PER_LEVEL_SECONDS = 2 * 3600
export const WAITING_BONUS_PER_DAY = 0.25 / 7
export const WAITING_BONUS_MAX = 1
export const VERSION_BONUS_MULTIPLIER = 1.5
export const VERSION_BONUS_MS = 24 * 3600 * 1000

export const URGE_COST_BASE = 1e4
export const URGE_COST_GROWTH = 100
export const URGE_MULTIPLIER = 1.5
export const LAUNCH_COST_BASE = 1e6
export const LAUNCH_COST_GROWTH = 100
export const LAUNCH_REQUIRED_URGES = 3
export const LAUNCH_MULTIPLIER = 2

export const LEVELS = [
  {
    id: 'level1',
    index: 1,
    name: '期待下次更新',
    baseCost: 1,
    costGrowth: 1e4,
    baseProduction: 1,
    throughput: 1e7,
    unlockAt: 0,
    description: '直接产出期待。',
    term: 'SemVer 语义化版本',
    termText: '版本号 MAJOR.MINOR.PATCH；-rc.N 是候选版，不是正式版。',
    termUse: '看到 0.2.1-rc.3，知道它是 0.2.1 的第 3 个候选版；升级前先看 breaking change。',
    story: '你第一次打开它。更新日志停在 2026-10-17，等待开始有了形状。',
  },
  {
    id: 'level2',
    index: 2,
    name: '别打扰梁叔叔搞AGI',
    baseCost: 10,
    costGrowth: 1e5,
    baseProduction: 1,
    throughput: 1e6,
    unlockAt: 1e3,
    description: '产出 Level 1。',
    term: 'AGI 与 MoE',
    termText: 'AGI 是通用人工智能；MoE（混合专家）用多个专家网络分摊计算，是工程路线，不等于 AGI 已实现。',
    termUse: '听到“梁叔叔搞 AGI”时，先问：是模型能力、产品形态，还是工程架构？',
    story: '你开始认真等。听说梁叔叔在搞 AGI，你决定不催，只把期待攒起来。',
  },
  {
    id: 'level3',
    index: 3,
    name: '谁给ds报名的憋气大赛？',
    baseCost: 1000,
    costGrowth: 1e6,
    baseProduction: 1,
    throughput: 1e5,
    unlockAt: 1e5,
    description: '产出 Level 2。',
    term: '延迟与吞吐',
    termText: '延迟是单个请求等多久；吞吐是单位时间能处理多少请求。两者经常互相拉扯。',
    termUse: '“憋气”像延迟；真正难的是长尾延迟和稳定性，不是平均值。',
    story: 'DeepSeek 迟迟不出声，群里开始比谁憋得久。你发现等待也能变成一种战绩。',
  },
  {
    id: 'level4',
    index: 4,
    name: 'Pro来✋🏻😡🤚🏻',
    baseCost: 1e5,
    costGrowth: 1e7,
    baseProduction: 1,
    throughput: 1e4,
    unlockAt: 1e7,
    description: '产出 Level 3。',
    term: '训练与推理',
    termText: '训练是学参数，推理是用参数；模型服务的日常成本主要在推理。',
    termUse: '看到 Pro/Flash 时，先分清是训练能力、推理价格，还是产品入口。',
    story: 'Pro 来了。你拍桌，但桌子是本地 JSON，没人受伤。',
  },
  {
    id: 'level5',
    index: 5,
    name: '我们的deepseek···会变成什么样子',
    baseCost: 1e7,
    costGrowth: 1e8,
    baseProduction: 1,
    throughput: 1e3,
    unlockAt: 1e9,
    description: '产出 Level 4。',
    term: '缩放定律与涌现',
    termText: '缩放定律是 loss 随参数/数据/算力变化的经验规律；涌现指能力突然出现，但定义和可复现性有争议。',
    termUse: '别把“更大”直接等同于“更可靠”；看任务评测和失败模式。',
    story: '你攒到最后一层。更新还没来，但你已经开始想象它来的时候。',
  },
]

export const PERMANENT_AMPS = [
  { id: 'focus', name: '专注习惯', effect: '永久：期待产出 +5%/级（加法）', baseCost: 5, growth: 1.8 },
  { id: 'echo', name: '回声习惯', effect: '永久：愿力获取 +3%/级，每日上限 +3/级', baseCost: 8, growth: 1.8 },
  { id: 'offline', name: '离线习惯', effect: '永久：离线上限 +1 小时/级', baseCost: 6, growth: 1.8 },
]

/**
 * Achievements are checked in the engine. Each one is a small permanent
 * multiplier, so they survive 释怀; none of them require spending money.
 */
export const ACHIEVEMENTS = [
  { id: 'first_release', name: '第一次释怀', desc: '完成一次释怀', reward: 0.02, check: (s) => s.release >= 1 },
  { id: 'level3', name: '憋气季军', desc: '解锁 Level 3', reward: 0.02, check: (s) => s.lifetimeExpectation >= 1e5 },
  { id: 'level5', name: '看到最后', desc: '解锁 Level 5', reward: 0.05, check: (s) => s.lifetimeExpectation >= 1e9 },
  { id: 'sessions10', name: '十次开张', desc: '累计开 10 个会话', reward: 0.02, check: (s) => s.activity.sessions >= 10 },
  { id: 'turns100', name: '一百轮', desc: '完成 100 轮对话', reward: 0.02, check: (s) => s.activity.turns >= 100 },
  { id: 'streak7', name: '七天', desc: '连续活跃 7 天', reward: 0.02, check: (s) => s.activity.streak >= 7 },
  { id: 'urge10', name: '催更十次', desc: '累计催更 10 次', reward: 0.02, check: (s) => s.urges >= 10 },
  { id: 'launch3', name: '三次发版', desc: '累计发版 3 次', reward: 0.03, check: (s) => s.launches >= 3 },
]

export function levelById(id) {
  return LEVELS.find((item) => item.id === id)
}

export function permanentAmpById(id) {
  return PERMANENT_AMPS.find((item) => item.id === id)
}

export function achievementById(id) {
  return ACHIEVEMENTS.find((item) => item.id === id)
}

export function urgeCost(urges) {
  return URGE_COST_BASE * Math.pow(URGE_COST_GROWTH, Math.max(0, urges))
}

export function launchCost(launches) {
  return LAUNCH_COST_BASE * Math.pow(LAUNCH_COST_GROWTH, Math.max(0, launches))
}

export function launchRequiredUrges(launches) {
  return LAUNCH_REQUIRED_URGES + Math.max(0, launches)
}
