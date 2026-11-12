/**
 * dsh-pray v0.3 balance sheet.
 *
 * Pure data only. Tune here, never inside the UI.
 * Five named levels replace the old three abstract dimensions; the level names
 * are the progression itself. Costs are in 期待 for levels / run amplifiers,
 * in 愿力 for permanent amplifiers.
 */

export const VERSION = '0.3.0'
export const SCHEMA = 3

export const RELEASE_THRESHOLD = 1e6
export const DAILY_WISH_CAP = 30
export const ACTIVE_SECONDS_PER_WISH = 600
export const OFFLINE_CAP_SECONDS = 8 * 3600
export const OFFLINE_CAP_PER_LEVEL_SECONDS = 2 * 3600
export const WAITING_BONUS_PER_DAY = 0.25 / 7
export const WAITING_BONUS_MAX = 1
export const VERSION_BONUS_MULTIPLIER = 1.5
export const VERSION_BONUS_MS = 24 * 3600 * 1000

export const BOOST_COST_BASE = 1e4
export const BOOST_COST_GROWTH = 100
export const BOOST_MULTIPLIER = 1.5
export const GALAXY_COST_BASE = 1e6
export const GALAXY_COST_GROWTH = 100
export const GALAXY_REQUIRED_BOOSTS = 3
export const GALAXY_MULTIPLIER = 2

/**
 * Five levels. The first four are the user's names; the fifth is an image.
 * Level n produces level n-1; level 1 produces 期待.
 */
export const LEVELS = [
  {
    id: 'level1',
    index: 1,
    name: '期待下次更新',
    baseCost: 1,
    costGrowth: 100,
    baseProduction: 1,
    unlockAt: 0,
    description: '直接产出期待。',
  },
  {
    id: 'level2',
    index: 2,
    name: '别打扰梁叔叔搞AGI',
    baseCost: 10,
    costGrowth: 1e3,
    baseProduction: 1,
    unlockAt: 1e3,
    description: '产出 Level 1。',
  },
  {
    id: 'level3',
    index: 3,
    name: '谁给ds报名的憋气大赛？',
    baseCost: 1000,
    costGrowth: 1e4,
    baseProduction: 1,
    unlockAt: 1e5,
    description: '产出 Level 2。',
  },
  {
    id: 'level4',
    index: 4,
    name: 'Pro来✋🏻😡🤚🏻',
    baseCost: 1e5,
    costGrowth: 1e5,
    baseProduction: 1,
    unlockAt: 1e7,
    description: '产出 Level 3。',
  },
  {
    id: 'level5',
    index: 5,
    name: 'Level 5',
    image: 'assets/realm-5.jpg',
    baseCost: 1e7,
    costGrowth: 1e6,
    baseProduction: 1,
    unlockAt: 1e9,
    description: '产出 Level 4。',
  },
]

/** Run amplifiers: bought with 期待, reset by Boost / Galaxy / 释怀. */
export const RUN_AMPS = [
  { id: 'level1', name: 'Level 1 增幅器', effect: 'Level 1 产出 +50%/级', baseCost: 1e3, growth: 10 },
  { id: 'level2', name: 'Level 2 增幅器', effect: 'Level 2 产出 +50%/级', baseCost: 5e3, growth: 10 },
  { id: 'level3', name: 'Level 3 增幅器', effect: 'Level 3 产出 +50%/级', baseCost: 5e4, growth: 10 },
  { id: 'level4', name: 'Level 4 增幅器', effect: 'Level 4 产出 +50%/级', baseCost: 5e5, growth: 10 },
  { id: 'level5', name: 'Level 5 增幅器', effect: 'Level 5 产出 +50%/级', baseCost: 5e6, growth: 10 },
  { id: 'global', name: '全局增幅器', effect: '所有产出 +25%/级', baseCost: 1e4, growth: 10 },
]

/** Permanent amplifiers: bought with 愿力, never reset. */
export const PERMANENT_AMPS = [
  { id: 'focus', name: '专注', effect: '期待产出 +10%/级', baseCost: 5, growth: 1.8 },
  { id: 'echo', name: '回声', effect: '愿力获取 +5%/级，每日上限 +5/级', baseCost: 8, growth: 1.8 },
  { id: 'offline', name: '挂机', effect: '离线上限 +2 小时/级', baseCost: 6, growth: 1.8 },
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

export function boostCost(boosts) {
  return BOOST_COST_BASE * Math.pow(BOOST_COST_GROWTH, Math.max(0, boosts))
}

export function galaxyCost(galaxies) {
  return GALAXY_COST_BASE * Math.pow(GALAXY_COST_GROWTH, Math.max(0, galaxies))
}

export function galaxyRequiredBoosts(galaxies) {
  return GALAXY_REQUIRED_BOOSTS + Math.max(0, galaxies)
}
