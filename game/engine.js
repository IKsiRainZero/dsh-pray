/**
 * dsh-pray v0.4 pure game engine.
 *
 * Five named levels form the progression. Level n produces level n-1; level 1
 * produces expectation. 催更 (global reset) resets levels/run amps for a
 * multiplier; 发版 (reset of the 催更 layer) resets 催更/levels for a bigger
 * multiplier; 释怀 resets the whole run for a permanent multiplier.
 *
 * No DSH imports, no I/O: Host routes call these functions, tests call them
 * directly. Costs/production are tuned in balance.js.
 */
import { randomUUID } from 'node:crypto'
import {
  ACHIEVEMENTS,
  ACTIVE_SECONDS_PER_WISH,
  DAILY_WISH_CAP,
  LAUNCH_MULTIPLIER,
  LEVELS,
  LEVEL_PURCHASE_MULTIPLIER,
  OFFLINE_CAP_PER_LEVEL_SECONDS,
  OFFLINE_CAP_SECONDS,
  PERMANENT_AMPS,
  RELEASE_THRESHOLD,
  SCHEMA,
  URGE_MULTIPLIER,
  VERSION,
  VERSION_BONUS_MS,
  VERSION_BONUS_MULTIPLIER,
  WAITING_BONUS_MAX,
  WAITING_BONUS_PER_DAY,
  launchCost,
  launchRequiredUrges,
  levelById,
  permanentAmpById,
  urgeCost,
} from './balance.js'

const MAX_VALUE = 1e300
const MAX_OFFLINE_SECONDS = 72 * 3600

function iso(now = Date.now()) {
  return new Date(now).toISOString()
}

function clamp(value, min = 0, max = MAX_VALUE) {
  const number = Number(value)
  if (!Number.isFinite(number)) return min
  return Math.min(max, Math.max(min, number))
}

function defaultChangelog() {
  return {
    date: null,
    headings: [],
    fetchedAt: null,
    ok: false,
    error: '尚未拉取更新日志',
    url: 'https://api-docs.deepseek.com/zh-cn/updates.md',
  }
}

function emptyLevels() {
  return Object.fromEntries(LEVELS.map((def) => [def.id, { owned: 0, bought: 0, produced: 0 }]))
}

export function createState(now = Date.now()) {
  return {
    schema: SCHEMA,
    version: VERSION,
    installationId: randomUUID(),
    installedAt: iso(now),
    lastTickAt: iso(now),
    expectation: 0,
    lifetimeExpectation: 0,
    runExpectation: 0,
    wish: 0,
    wishEarned: 0,
    release: 0,
    lastReleaseGain: 0,
    lastReleaseAt: null,
    urges: 0,
    launches: 0,
    achievements: [],
    levels: emptyLevels(),
    permanentAmps: Object.fromEntries(PERMANENT_AMPS.map((def) => [def.id, 0])),
    activity: {
      sessions: 0,
      rootSessions: 0,
      subagentSessions: 0,
      turns: 0,
      activeSeconds: 0,
      activeWishAwarded: 0,
      toolCalls: 0,
      tokens: 0,
      userMessages: 0,
      streak: 0,
      todayWish: 0,
      todayDate: null,
      todaySessions: 0,
      lastActiveDate: null,
      days: {},
    },
    eras: [],
    changelog: defaultChangelog(),
    settings: { notation: 'auto', mode: 'attention' },
    versionBonusUntil: null,
    lastVersionBonus: null,
    lastOffline: null,
  }
}

export function migrateState(raw, now = Date.now()) {
  if (!raw || typeof raw !== 'object') return createState(now)
  if (Number(raw.schema) >= SCHEMA) return normalizeState(raw, now)

  const state = createState(now)
  state.installationId = typeof raw.installationId === 'string' && raw.installationId
    ? raw.installationId
    : state.installationId
  state.installedAt = typeof raw.installedAt === 'string' ? raw.installedAt : state.installedAt
  state.expectation = clamp(raw.expectation ?? raw.points)
  state.lifetimeExpectation = clamp(raw.lifetimeExpectation ?? raw.points)
  state.runExpectation = clamp(raw.runExpectation ?? raw.points)
  state.wish = clamp(raw.wish)
  state.wishEarned = clamp(raw.wishEarned)
  state.release = clamp(raw.release)
  state.lastReleaseGain = clamp(raw.lastReleaseGain)
  state.lastReleaseAt = typeof raw.lastReleaseAt === 'string' ? raw.lastReleaseAt : null
  state.urges = Math.max(0, Math.floor(Number(raw.urges ?? raw.boosts) || 0))
  state.launches = Math.max(0, Math.floor(Number(raw.launches ?? raw.galaxies) || 0))
  state.achievements = Array.isArray(raw.achievements) ? raw.achievements : []
  state.permanentAmps = { ...state.permanentAmps, ...(raw.permanentAmps || {}) }
  state.activity = { ...state.activity, ...(raw.activity || {}) }
  state.activity.days = raw.activity?.days && typeof raw.activity.days === 'object' ? raw.activity.days : {}
  state.eras = Array.isArray(raw.eras) ? raw.eras : []
  state.changelog = raw.changelog && typeof raw.changelog === 'object'
    ? { ...state.changelog, ...raw.changelog }
    : state.changelog
  state.settings = raw.settings && typeof raw.settings === 'object'
    ? { ...state.settings, ...raw.settings }
    : state.settings
  if (state.settings.mode !== 'play') state.settings.mode = 'attention'
  state.versionBonusUntil = typeof raw.versionBonusUntil === 'string' ? raw.versionBonusUntil : null
  state.lastVersionBonus = raw.lastVersionBonus && typeof raw.lastVersionBonus === 'object'
    ? raw.lastVersionBonus
    : null

  if (Number(raw.schema) === 2 && raw.dimensions) {
    const map = ['A', 'B', 'C']
    for (let i = 0; i < map.length; i += 1) {
      const old = raw.dimensions[map[i]] || {}
      state.levels[`level${i + 1}`] = {
        owned: clamp(old.owned),
        bought: Math.max(0, Math.floor(Number(old.bought) || 0)),
        produced: 0,
      }
    }
  }
  if (Number(raw.schema) >= 3 && raw.levels) {
    for (const def of LEVELS) {
      const old = raw.levels[def.id] || {}
      state.levels[def.id] = {
        owned: clamp(old.owned),
        bought: Math.max(0, Math.floor(Number(old.bought) || 0)),
        produced: clamp(old.produced),
      }
    }
  }
  delete state.runAmps

  state.lastTickAt = iso(now)
  state.lastOffline = null
  return state
}

export function normalizeState(raw, now = Date.now()) {
  const base = createState(now)
  const state = { ...base, ...(raw && typeof raw === 'object' ? raw : {}) }
  state.schema = SCHEMA
  state.version = VERSION
  state.expectation = clamp(state.expectation)
  state.lifetimeExpectation = clamp(state.lifetimeExpectation)
  state.runExpectation = clamp(state.runExpectation)
  state.wish = clamp(state.wish)
  state.wishEarned = clamp(state.wishEarned)
  state.release = clamp(state.release)
  state.lastReleaseGain = clamp(state.lastReleaseGain)
  state.lastReleaseAt = typeof state.lastReleaseAt === 'string' ? state.lastReleaseAt : null
  state.urges = Math.max(0, Math.floor(Number(state.urges ?? state.boosts) || 0))
  state.launches = Math.max(0, Math.floor(Number(state.launches ?? state.galaxies) || 0))
  state.achievements = Array.isArray(state.achievements) ? state.achievements : []
  delete state.boosts
  delete state.galaxies
  state.installedAt = typeof state.installedAt === 'string' ? state.installedAt : base.installedAt
  state.lastTickAt = Number.isFinite(Date.parse(state.lastTickAt)) ? state.lastTickAt : iso(now)
  state.levels = state.levels && typeof state.levels === 'object' ? state.levels : {}
  for (const def of LEVELS) {
    const level = state.levels[def.id] || {}
    state.levels[def.id] = {
      owned: clamp(level.owned),
      bought: Math.max(0, Math.floor(Number(level.bought) || 0)),
      produced: clamp(level.produced),
    }
  }
  delete state.runAmps
  state.permanentAmps = state.permanentAmps && typeof state.permanentAmps === 'object'
    ? state.permanentAmps
    : {}
  for (const def of PERMANENT_AMPS) {
    state.permanentAmps[def.id] = Math.max(0, Math.floor(Number(state.permanentAmps[def.id]) || 0))
  }
  state.activity = state.activity && typeof state.activity === 'object' ? state.activity : base.activity
  state.activity.days = state.activity.days && typeof state.activity.days === 'object'
    ? state.activity.days
    : {}
  state.activity.todayWish = clamp(state.activity.todayWish)
  state.activity.todaySessions = Math.max(0, Math.floor(Number(state.activity.todaySessions) || 0))
  state.activity.streak = Math.max(0, Math.floor(Number(state.activity.streak) || 0))
  state.activity.activeSeconds = clamp(state.activity.activeSeconds)
  state.activity.activeWishAwarded = Math.max(0, Math.floor(Number(state.activity.activeWishAwarded) || 0))
  state.activity.tokens = clamp(state.activity.tokens)
  state.activity.toolCalls = Math.max(0, Math.floor(Number(state.activity.toolCalls) || 0))
  state.activity.userMessages = Math.max(0, Math.floor(Number(state.activity.userMessages) || 0))
  state.activity.turns = Math.max(0, Math.floor(Number(state.activity.turns) || 0))
  state.activity.sessions = Math.max(0, Math.floor(Number(state.activity.sessions) || 0))
  state.activity.rootSessions = Math.max(0, Math.floor(Number(state.activity.rootSessions) || 0))
  state.activity.subagentSessions = Math.max(0, Math.floor(Number(state.activity.subagentSessions) || 0))
  state.eras = Array.isArray(state.eras) ? state.eras : []
  state.changelog = state.changelog && typeof state.changelog === 'object'
    ? { ...base.changelog, ...state.changelog }
    : base.changelog
  state.settings = state.settings && typeof state.settings === 'object'
    ? { ...base.settings, ...state.settings }
    : base.settings
  if (state.settings.mode !== 'play') state.settings.mode = 'attention'
  state.versionBonusUntil = typeof state.versionBonusUntil === 'string' ? state.versionBonusUntil : null
  state.lastVersionBonus = state.lastVersionBonus && typeof state.lastVersionBonus === 'object'
    ? state.lastVersionBonus
    : null
  state.lastOffline = state.lastOffline && typeof state.lastOffline === 'object' ? state.lastOffline : null
  return state
}

export function waitingDays(state, now = Date.now()) {
  const date = state.changelog?.date
  if (!date) return 0
  const anchor = Date.parse(`${date}T00:00:00+08:00`)
  if (!Number.isFinite(anchor)) return 0
  return Math.max(0, (now - anchor) / 86400000)
}

export function waitingBonus(state, now = Date.now()) {
  return Math.min(0.5, waitingDays(state, now) * WAITING_BONUS_PER_DAY)
}

export function waitingMultiplier(state, now = Date.now()) {
  return 1 + waitingBonus(state, now)
}

export function versionBonus(state, now = Date.now()) {
  const until = Date.parse(state.versionBonusUntil)
  return Number.isFinite(until) && until > now ? 0.25 : 0
}

export function versionMultiplier(state, now = Date.now()) {
  return 1 + versionBonus(state, now)
}

export function offlineCapSeconds(state) {
  const cap = OFFLINE_CAP_SECONDS + (state.permanentAmps.offline || 0) * OFFLINE_CAP_PER_LEVEL_SECONDS
  return Math.min(MAX_OFFLINE_SECONDS, cap)
}

export function releaseBonus(state) {
  // Diminishing: at 1 release ~0.10, 10 ~0.79, 50 ~1.84, cap 2.
  return 2 * (1 - Math.exp(-(state.release || 0) / 20))
}

export function achievementBonus(state) {
  const unlocked = new Set(state.achievements || [])
  return ACHIEVEMENTS.reduce((sum, def) => sum + (unlocked.has(def.id) ? def.reward : 0), 0)
}

export function achievementMultiplier(state) {
  return 1 + achievementBonus(state)
}

export function urgeBonus(state) {
  return 0.02 * (state.urges || 0)
}

export function launchBonus(state) {
  return 0.05 * (state.launches || 0)
}

export function focusBonus(state) {
  return 0.05 * (state.permanentAmps.focus || 0)
}

export function permanentBonus(state) {
  return releaseBonus(state) + achievementBonus(state) + focusBonus(state) + launchBonus(state)
}

export function temporaryBonus(state, now = Date.now()) {
  return versionBonus(state, now) + waitingBonus(state, now)
}

export function checkAchievements(state) {
  const unlocked = new Set(state.achievements || [])
  const added = []
  for (const def of ACHIEVEMENTS) {
    if (unlocked.has(def.id)) continue
    if (def.check(state)) {
      unlocked.add(def.id)
      added.push(def.id)
    }
  }
  state.achievements = [...unlocked]
  return added
}

export function globalMultiplier(state, now = Date.now()) {
  return 1 + permanentBonus(state) + temporaryBonus(state, now) + urgeBonus(state)
}

export function levelMultiplier(state, id) {
  const level = state.levels[id]
  return Math.pow(LEVEL_PURCHASE_MULTIPLIER, Math.floor((level?.bought || 0) / 10))
}

export function production(state, now = Date.now()) {
  const global = globalMultiplier(state, now)
  const base = global
  const mult = [null]
  const prod = [null]
  for (const def of LEVELS) {
    const level = state.levels[def.id]
    mult[def.index] = levelMultiplier(state, def.id)
    const raw = level.owned * def.baseProduction * mult[def.index]
    const saturated = raw / (1 + raw / (def.throughput || 1e7))
    prod[def.index] = clamp(saturated * global)
  }
  return {
    base,
    prod,
    mult,
    rate: clamp(base + prod[1]),
    global,
  }
}

function simulate(state, dt, now) {
  const p = production(state, now)
  const gain = p.rate * dt
  state.expectation = clamp(state.expectation + gain)
  state.runExpectation = clamp(state.runExpectation + gain)
  state.lifetimeExpectation = clamp(state.lifetimeExpectation + gain)
  for (const def of LEVELS) {
    state.levels[def.id].produced = clamp(state.levels[def.id].produced + p.prod[def.index] * dt)
  }
  for (let index = 1; index < LEVELS.length; index += 1) {
    const lower = LEVELS[index - 1]
    state.levels[lower.id].owned = clamp(state.levels[lower.id].owned + p.prod[index + 1] * dt)
  }
}

export function advance(state, now = Date.now()) {
  const last = Date.parse(state.lastTickAt)
  const actualSeconds = Number.isFinite(last) ? Math.max(0, (now - last) / 1000) : 0
  const cap = offlineCapSeconds(state)
  const appliedSeconds = Math.min(actualSeconds, cap)
  const before = state.expectation
  let remaining = appliedSeconds
  const whole = Math.floor(remaining)
  for (let i = 0; i < whole; i += 1) simulate(state, 1, now)
  remaining -= whole
  if (remaining > 0) simulate(state, remaining, now)
  state.lastTickAt = iso(now)
  state.lastOffline = actualSeconds > 5
    ? {
        actualSeconds,
        appliedSeconds,
        capped: actualSeconds > cap,
        gained: clamp(state.expectation - before),
        at: iso(now),
      }
    : null
  checkAchievements(state)
  return state.lastOffline
}

export function levelUnitCost(state, def, bought = state.levels[def.id].bought) {
  const block = Math.floor(Math.max(0, bought) / 10)
  return def.baseCost * Math.pow(def.costGrowth, block)
}

export function levelCost(state, id, count = 1) {
  const def = levelById(id)
  if (!def) return null
  const bought = state.levels[id].bought
  const isMax = count === 'max'
  const limit = isMax ? 10000 : count
  const budget = isMax ? state.expectation : Infinity
  let total = 0
  let boughtCursor = bought
  let purchased = 0
  while (purchased < limit) {
    const unit = levelUnitCost(state, def, boughtCursor)
    if (!Number.isFinite(unit) || total + unit > budget) break
    total += unit
    boughtCursor += 1
    purchased += 1
  }
  return {
    purchased: isMax ? purchased : limit,
    total,
    affordable: isMax ? purchased > 0 : total <= state.expectation,
  }
}

export function buyLevel(state, id, count = 1) {
  const def = levelById(id)
  if (!def) return { ok: false, error: '未知 Level' }
  if (state.lifetimeExpectation < def.unlockAt) {
    return { ok: false, error: `累计期待达到 ${def.unlockAt} 后解锁` }
  }
  const plan = levelCost(state, id, count)
  if (!plan) return { ok: false, error: '未知 Level' }
  if (count !== 'max' && !plan.affordable) return { ok: false, error: '期待不足' }
  if (plan.purchased <= 0) return { ok: false, error: '期待不足' }
  state.expectation = clamp(state.expectation - plan.total)
  state.levels[id].owned = clamp(state.levels[id].owned + plan.purchased)
  state.levels[id].bought += plan.purchased
  return { ok: true, purchased: plan.purchased, total: plan.total }
}

export function permanentAmpCost(state, def) {
  const level = state.permanentAmps[def.id] || 0
  return def.baseCost * Math.pow(def.growth, level)
}

export function buyPermanentAmp(state, id) {
  const def = permanentAmpById(id)
  if (!def) return { ok: false, error: '未知习惯' }
  const cost = permanentAmpCost(state, def)
  if (state.wish < cost) return { ok: false, error: '愿力不足' }
  state.wish = clamp(state.wish - cost)
  state.permanentAmps[id] = (state.permanentAmps[id] || 0) + 1
  return { ok: true, level: state.permanentAmps[id], total: cost }
}

/**
 * Attention-protection mode: buy levels automatically, but never perform a
 * reset (催更 / 发版 / 释怀) on its own. Those remain deliberate checkpoints.
 */
export function applyAuto(state, passes = 3) {
  if (state.settings?.mode !== 'attention') return 0
  if (state.runExpectation >= RELEASE_THRESHOLD) return 0
  let actions = 0
  for (let pass = 0; pass < passes; pass += 1) {
    if (actions >= 1) break
    let changed = false
    for (const def of LEVELS) {
      if (actions >= 1) break
      if (state.lifetimeExpectation < def.unlockAt) continue
      const plan1 = levelCost(state, def.id, 1)
      if (plan1?.affordable) {
        const result = buyLevel(state, def.id, 1)
        if (result.ok) { actions += 1; changed = true }
      }
    }
    if (!changed) break
  }
  return actions
}

/**
 * A deliberate fresh run. Keeps meta progress: wish power, release points,
 * achievements, archive, story/era records, and settings. Resets all run
 * numbers, including lifetime, so Level 1 is the current Level again.
 */
export function resetRun(state, now = Date.now()) {
  state.expectation = 0
  state.lifetimeExpectation = 0
  state.runExpectation = 0
  state.levels = emptyLevels()
  state.urges = 0
  state.launches = 0
  state.lastOffline = null
  state.lastTickAt = iso(now)
  return { ok: true }
}

/**
 * Repair a save polluted by the v0.4.0 runaway. Unlike resetRun, this also
 * clears the release layer (which could have been inflated to millions of
 * permanent multiplier points by one huge release). Keeps wish power,
 * achievements, archive, and settings.
 */
export function repairState(state, now = Date.now()) {
  resetRun(state, now)
  state.release = 0
  state.lastReleaseGain = 0
  state.lastReleaseAt = null
  return { ok: true, repaired: true }
}

export function currentUrgeCost(state) {
  return urgeCost(state.urges || 0)
}

export function currentLaunchCost(state) {
  return launchCost(state.launches || 0)
}

export function currentLaunchRequired(state) {
  return launchRequiredUrges(state.launches || 0)
}

export function canUrge(state) {
  return state.expectation >= currentUrgeCost(state)
}

export function canLaunch(state) {
  return (state.urges || 0) >= currentLaunchRequired(state) &&
    state.expectation >= currentLaunchCost(state)
}

function resetLevels(state) {
  for (const def of LEVELS) {
    state.levels[def.id].owned = 0
    state.levels[def.id].bought = 0
  }
}

export function urge(state) {
  const cost = currentUrgeCost(state)
  if (state.expectation < cost) return { ok: false, error: '期待不足，无法催更' }
  state.expectation = 0
  state.urges = (state.urges || 0) + 1
  resetLevels(state)
  state.lastOffline = null
  checkAchievements(state)
  return { ok: true, cost, urges: state.urges }
}

export function launch(state) {
  const required = currentLaunchRequired(state)
  const cost = currentLaunchCost(state)
  if ((state.urges || 0) < required) {
    return { ok: false, error: `需要 ${required} 次催更才能发版` }
  }
  if (state.expectation < cost) return { ok: false, error: '期待不足，无法发版' }
  state.expectation = 0
  state.launches = (state.launches || 0) + 1
  state.urges = 0
  resetLevels(state)
  state.lastOffline = null
  checkAchievements(state)
  return { ok: true, cost, required, launches: state.launches }
}

export function releaseGain(state) {
  if (state.runExpectation < RELEASE_THRESHOLD) return 0
  return Math.max(1, Math.floor(Math.sqrt(state.runExpectation / RELEASE_THRESHOLD)))
}

export function release(state, now = Date.now()) {
  const gain = releaseGain(state)
  if (gain <= 0) {
    return { ok: false, error: `本轮累计期待达到 ${RELEASE_THRESHOLD} 后才能释怀` }
  }
  state.release = clamp(state.release + gain)
  state.lastReleaseGain = gain
  state.lastReleaseAt = iso(now)
  state.expectation = 0
  state.runExpectation = 0
  state.urges = 0
  state.launches = 0
  resetLevels(state)
  state.lastOffline = null
  checkAchievements(state)
  return { ok: true, gain, release: state.release }
}

function highestLevelIndex(state) {
  let index = 1
  for (const def of LEVELS) {
    if (state.lifetimeExpectation >= def.unlockAt) index = def.index
  }
  return index
}

export function syncEra(state, now = Date.now()) {
  const date = state.changelog?.date
  if (!date) return false
  const last = state.eras[state.eras.length - 1]
  if (last && last.date === date) return false
  const first = state.eras.length === 0
  const era = {
    date,
    headings: Array.isArray(state.changelog.headings) ? state.changelog.headings.slice(0, 4) : [],
    seenAt: iso(now),
  }
  state.eras.push(era)
  if (state.eras.length > 50) state.eras = state.eras.slice(-50)
  if (!first) {
    state.versionBonusUntil = iso(now + VERSION_BONUS_MS)
    state.lastVersionBonus = era
  }
  return true
}

export function view(state, now = Date.now()) {
  const p = production(state, now)
  const highestIndex = highestLevelIndex(state)
  const highest = LEVELS[highestIndex - 1]
  const next = LEVELS[highestIndex] || null
  const nextProgress = next
    ? Math.min(1, Math.max(0, (state.lifetimeExpectation - highest.unlockAt) / (next.unlockAt - highest.unlockAt)))
    : 1
  const dailyCap = DAILY_WISH_CAP + 3 * (state.permanentAmps.echo || 0)
  const levels = LEVELS.map((def) => {
    const level = state.levels[def.id]
    const cost1 = levelUnitCost(state, def, level.bought)
    const plan10 = levelCost(state, def.id, 10)
    const unlocked = state.lifetimeExpectation >= def.unlockAt
    return {
      ...def,
      owned: level.owned,
      bought: level.bought,
      produced: level.produced,
      unlocked,
      production: p.prod[def.index],
      multiplier: p.mult[def.index],
      cost1,
      cost10: plan10?.total ?? Infinity,
      canBuy1: unlocked && state.expectation >= cost1,
      canBuy10: unlocked && plan10?.affordable === true,
    }
  })
  const habits = PERMANENT_AMPS.map((def) => {
    const level = state.permanentAmps[def.id] || 0
    const cost = permanentAmpCost(state, def)
    return { ...def, level, cost, canBuy: state.wish >= cost }
  })
  const changelog = state.changelog || {}
  const anchor = changelog.date ? Date.parse(`${changelog.date}T00:00:00+08:00`) : null
  const secondsSinceUpdate = Number.isFinite(anchor)
    ? Math.max(0, Math.floor((now - anchor) / 1000))
    : null
  return {
    schema: SCHEMA,
    version: VERSION,
    installationId: state.installationId,
    installedAt: state.installedAt,
    now: iso(now),
    expectation: state.expectation,
    expectationPerSecond: p.rate,
    baseExpectationPerSecond: p.base,
    lifetimeExpectation: state.lifetimeExpectation,
    runExpectation: state.runExpectation,
    wish: state.wish,
    wishEarned: state.wishEarned,
    release: state.release,
    releaseMultiplier: 1 + releaseBonus(state),
    lastReleaseGain: state.lastReleaseGain,
    lastReleaseAt: state.lastReleaseAt,
    levels,
    highestLevel: {
      index: highest.index,
      name: highest.name,
    },
    nextLevel: next
      ? {
          index: next.index,
          name: next.name,
          at: next.unlockAt,
          progress: nextProgress,
        }
      : null,
    urges: state.urges || 0,
    launches: state.launches || 0,
    urgeCost: currentUrgeCost(state),
    launchCost: currentLaunchCost(state),
    launchRequiredUrges: currentLaunchRequired(state),
    canUrge: canUrge(state),
    canLaunch: canLaunch(state),
    urgeMultiplier: 1 + urgeBonus(state),
    launchMultiplier: 1 + launchBonus(state),
    habits,
    permanentBonus: permanentBonus(state),
    temporaryBonus: temporaryBonus(state, now),
    totalMultiplier: globalMultiplier(state, now),
    softcapActive: false,
    achievements: ACHIEVEMENTS.map((def) => ({
      id: def.id,
      name: def.name,
      desc: def.desc,
      reward: def.reward,
      unlocked: (state.achievements || []).includes(def.id),
    })),
    achievementMultiplier: 1 + achievementBonus(state),
    mode: state.settings?.mode || 'attention',
    nextUnlock: next
      ? { kind: 'level', index: next.index, name: next.name, at: next.unlockAt }
      : { kind: 'urge', name: '催更', at: currentUrgeCost(state) },
    canRelease: state.runExpectation >= RELEASE_THRESHOLD,
    releaseGain: releaseGain(state),
    releaseThreshold: RELEASE_THRESHOLD,
    dailyCap,
    activity: {
      ...state.activity,
      todayWish: state.activity.todayWish,
      dailyCap,
      activeHours: state.activity.activeSeconds / 3600,
    },
    eras: state.eras.slice(-5),
    versionBonusUntil: state.versionBonusUntil,
    versionBonusActive: versionMultiplier(state, now) > 1,
    versionMultiplier: versionMultiplier(state, now),
    waitMultiplier: waitingMultiplier(state, now),
    waitDays: waitingDays(state, now),
    latestUpdate: changelog.date || null,
    latestHeadings: Array.isArray(changelog.headings) ? changelog.headings : [],
    changelogOk: Boolean(changelog.ok),
    changelogFetchedAt: changelog.fetchedAt || null,
    changelogError: changelog.error || null,
    anchor: changelog.date ? `${changelog.date}T00:00:00+08:00` : null,
    secondsSinceUpdate,
    lastOffline: state.lastOffline,
    settings: state.settings,
    offlineCapSeconds: offlineCapSeconds(state),
    activeSecondsPerWish: ACTIVE_SECONDS_PER_WISH,
  }
}
