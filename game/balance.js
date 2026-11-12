/**
 * dsh-pray v0.2 balance sheet.
 *
 * Pure data only. Tune here, never inside the UI.
 * Costs are in 期待 for dimensions / run amplifiers, in 愿力 for permanent
 * amplifiers. The first-release threshold and the daily wish cap are here too.
 */

export const VERSION = '0.2.0'
export const SCHEMA = 2

export const RELEASE_THRESHOLD = 1e6
export const DAILY_WISH_CAP = 30
export const ACTIVE_SECONDS_PER_WISH = 600
export const OFFLINE_CAP_SECONDS = 8 * 3600
export const OFFLINE_CAP_PER_LEVEL_SECONDS = 2 * 3600
export const WAITING_BONUS_PER_DAY = 0.25 / 7
export const WAITING_BONUS_MAX = 1
export const VERSION_BONUS_MULTIPLIER = 1.5
export const VERSION_BONUS_MS = 24 * 3600 * 1000

/**
 * Three expectation dimensions. Cost is per unit inside a ten-block; buying ten
 * doubles that dimension's output. The base values are roughly AD's first three
 * dimensions at one tenth scale, so the first release is reachable in 1-2 days.
 */
export const DIMENSIONS = [
  {
    id: 'A',
    name: '维度 A',
    short: 'A',
    baseCost: 1,
    costGrowth: 100,
    baseProduction: 1,
    unlockAt: 0,
    description: '直接产出期待。',
  },
  {
    id: 'B',
    name: '维度 B',
    short: 'B',
    baseCost: 10,
    costGrowth: 1e3,
    baseProduction: 1,
    unlockAt: 100,
    description: '产出维度 A。',
  },
  {
    id: 'C',
    name: '维度 C',
    short: 'C',
    baseCost: 1000,
    costGrowth: 1e4,
    baseProduction: 1,
    unlockAt: 1e4,
    description: '产出维度 B。',
  },
]

/** Run amplifiers: bought with 期待, reset by 释怀. */
export const RUN_AMPS = [
  { id: 'dimA', name: 'A 层增幅器', effect: 'A 层产出 +50%/级', baseCost: 100, growth: 3 },
  { id: 'dimB', name: 'B 层增幅器', effect: 'B 层产出 +50%/级', baseCost: 500, growth: 3 },
  { id: 'dimC', name: 'C 层增幅器', effect: 'C 层产出 +50%/级', baseCost: 5000, growth: 3 },
  { id: 'global', name: '全局增幅器', effect: '所有产出 +25%/级', baseCost: 2500, growth: 4 },
]

/** Permanent amplifiers: bought with 愿力, never reset. */
export const PERMANENT_AMPS = [
  { id: 'focus', name: '专注', effect: '期待产出 +10%/级', baseCost: 5, growth: 1.8 },
  { id: 'echo', name: '回声', effect: '愿力获取 +5%/级，每日上限 +5/级', baseCost: 8, growth: 1.8 },
  { id: 'offline', name: '挂机', effect: '离线上限 +2 小时/级', baseCost: 6, growth: 1.8 },
]

/**
 * Realm milestones use lifetime expectation, so 释怀 never drops the realm.
 * The fifth realm is a user-provided image; the name is only a fallback.
 */
export const REALMS = [
  { at: 0, name: '期待下次更新' },
  { at: 1e3, name: '别打扰梁叔叔搞AGI' },
  { at: 1e5, name: '谁给ds报名的憋气大赛？' },
  { at: 1e7, name: 'Pro来✋🏻😡🤚🏻' },
  { at: 1e9, name: '境界 5', image: 'assets/realm-5.png' },
]

export function dimensionById(id) {
  return DIMENSIONS.find((item) => item.id === id)
}

export function runAmpById(id) {
  return RUN_AMPS.find((item) => item.id === id)
}

export function permanentAmpById(id) {
  return PERMANENT_AMPS.find((item) => item.id === id)
}
