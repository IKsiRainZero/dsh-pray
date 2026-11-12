/**
 * dsh-pray v0.4 balance sheet.
 *
 * Five named levels, 催更 / 发版 reset layers, 释怀 prestige.
 * The Level 5 name is a phrase, not an image. Attention protection is a
 * first-class setting: automatic purchases, card hidden by default.
 */

export const VERSION = '0.4.1'
export const SCHEMA = 4

export const RELEASE_THRESHOLD = 1e12
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
    costGrowth: 1e3,
    baseProduction: 1,
    unlockAt: 0,
    description: '直接产出期待。',
  },
  {
    id: 'level2',
    index: 2,
    name: '别打扰梁叔叔搞AGI',
    baseCost: 10,
    costGrowth: 1e4,
    baseProduction: 1,
    unlockAt: 1e3,
    description: '产出 Level 1。',
  },
  {
    id: 'level3',
    index: 3,
    name: '谁给ds报名的憋气大赛？',
    baseCost: 1000,
    costGrowth: 1e5,
    baseProduction: 1,
    unlockAt: 1e5,
    description: '产出 Level 2。',
  },
  {
    id: 'level4',
    index: 4,
    name: 'Pro来✋🏻😡🤚🏻',
    baseCost: 1e5,
    costGrowth: 1e6,
    baseProduction: 1,
    unlockAt: 1e7,
    description: '产出 Level 3。',
  },
  {
    id: 'level5',
    index: 5,
    name: '我们的deepseek···会变成什么样子',
    baseCost: 1e7,
    costGrowth: 1e7,
    baseProduction: 1,
    unlockAt: 1e9,
    description: '产出 Level 4。',
  },
]

export const RUN_AMPS = [
  { id: 'level1', name: 'Level 1 增幅器', effect: 'Level 1 产出 +50%/级', baseCost: 1e3, growth: 10 },
  { id: 'level2', name: 'Level 2 增幅器', effect: 'Level 2 产出 +50%/级', baseCost: 5e3, growth: 10 },
  { id: 'level3', name: 'Level 3 增幅器', effect: 'Level 3 产出 +50%/级', baseCost: 5e4, growth: 10 },
  { id: 'level4', name: 'Level 4 增幅器', effect: 'Level 4 产出 +50%/级', baseCost: 5e5, growth: 10 },
  { id: 'level5', name: 'Level 5 增幅器', effect: 'Level 5 产出 +50%/级', baseCost: 5e6, growth: 10 },
  { id: 'global', name: '全局增幅器', effect: '所有产出 +25%/级', baseCost: 1e4, growth: 10 },
]

export const PERMANENT_AMPS = [
  { id: 'focus', name: '专注', effect: '期待产出 +10%/级', baseCost: 5, growth: 1.8 },
  { id: 'echo', name: '回声', effect: '愿力获取 +5%/级，每日上限 +5/级', baseCost: 8, growth: 1.8 },
  { id: 'offline', name: '挂机', effect: '离线上限 +2 小时/级', baseCost: 6, growth: 1.8 },
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

export function runAmpById(id) {
  return RUN_AMPS.find((item) => item.id === id)
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
