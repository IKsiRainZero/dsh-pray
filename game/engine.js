/**
 * dsh-pray v0.3 pure game engine.
 *
 * Five named levels form the progression. Level n produces level n-1; level 1
 * produces expectation. Boost (global reset) resets levels/run amps for a
 * multiplier; Galaxy (reset of the boost layer) resets boosts/levels for a
 * bigger multiplier; 释怀 resets the whole run for a permanent multiplier.
 *
 * No DSH imports, no I/O: Host routes call these functions, tests call them
 * directly. Costs/production are tuned in balance.js.
 */
import { randomUUID } from 'node:crypto'
import {
  ACTIVE_SECONDS_PER_WISH,
  BOOST_MULTIPLIER,
  DAILY_WISH_CAP,
  GALAXY_MULTIPLIER,
  LEVELS,
  OFFLINE_CAP_PER_LEVEL_SECONDS,
  OFFLINE_CAP_SECONDS,
  PERMANENT_AMPS,
  RELEASE_THRESHOLD,
  RUN_AMPS,
  SCHEMA,
  VERSION,
  VERSION_BONUS_MS,
  VERSION_BONUS_MULTIPLIER,
  WAITING_BONUS_MAX,
  WAITING_BONUS_PER_DAY,
  boostCost,
  galaxyCost,
  galaxyRequiredBoosts,
  levelById,
  permanentAmpById,
  runAmpById,
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
    boosts: 0,
    galaxies: 0,
    levels: emptyLevels(),
    runAmps: Object.fromEntries(RUN_AMPS.map((def) => [def.id, 0])),
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
    settings: { notation: 'auto' },
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
  state.boosts = Math.max(0, Math.floor(Number(raw.boosts) || 0))
  state.galaxies = Math.max(0, Math.floor(Number(raw.galaxies) || 0))
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
    state.runAmps.level1 = Math.max(0, Math.floor(Number(raw.runAmps?.dimA) || 0))
    state.runAmps.level2 = Math.max(0, Math.floor(Number(raw.runAmps?.dimB) || 0))
    state.runAmps.level3 = Math.max(0, Math.floor(Number(raw.runAmps?.dimC) || 0))
    state.runAmps.level4 = 0
    state.runAmps.level5 = 0
    state.runAmps.global = Math.max(0, Math.floor(Number(raw.runAmps?.global) || 0))
  }
  for (const legacy of ['dimA', 'dimB', 'dimC']) delete state.runAmps[legacy]

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
  state.boosts = Math.max(0, Math.floor(Number(state.boosts) || 0))
  state.galaxies = Math.max(0, Math.floor(Number(state.galaxies) || 0))
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
  state.runAmps = state.runAmps && typeof state.runAmps === 'object' ? state.runAmps : {}
  for (const legacy of ['dimA', 'dimB', 'dimC']) delete state.runAmps[legacy]
  for (const def of RUN_AMPS) {
    state.runAmps[def.id] = Math.max(0, Math.floor(Number(state.runAmps[def.id]) || 0))
  }
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

export function waitingMultiplier(state, now = Date.now()) {
  return 1 + Math.min(WAITING_BONUS_MAX, waitingDays(state, now) * WAITING_BONUS_PER_DAY)
}

export function versionMultiplier(state, now = Date.now()) {
  const until = Date.parse(state.versionBonusUntil)
  return Number.isFinite(until) && until > now ? VERSION_BONUS_MULTIPLIER : 1
}

export function offlineCapSeconds(state) {
  const cap = OFFLINE_CAP_SECONDS + (state.permanentAmps.offline || 0) * OFFLINE_CAP_PER_LEVEL_SECONDS
  return Math.min(MAX_OFFLINE_SECONDS, cap)
}

export function globalMultiplier(state, now = Date.now()) {
  return (1 + 0.25 * (state.runAmps.global || 0)) *
    (1 + 0.1 * (state.permanentAmps.focus || 0)) *
    (1 + 0.1 * state.release) *
    Math.pow(BOOST_MULTIPLIER, state.boosts || 0) *
    Math.pow(GALAXY_MULTIPLIER, state.galaxies || 0) *
    versionMultiplier(state, now)
}

export function levelMultiplier(state, id) {
  const level = state.levels[id]
  const amp = state.runAmps[id] || 0
  return (1 + 0.5 * amp) * (2 ** Math.floor((level?.bought || 0) / 10))
}

export function production(state, now = Date.now()) {
  const global = globalMultiplier(state, now)
  const base = waitingMultiplier(state, now) * global
  const mult = [null]
  const prod = [null]
  for (const def of LEVELS) {
    const level = state.levels[def.id]
    mult[def.index] = levelMultiplier(state, def.id)
    prod[def.index] = clamp(level.owned * def.baseProduction * mult[def.index] * global)
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
  state.expectation = clamp(state.expectation + p.rate * dt)
  state.runExpectation = clamp(state.runExpectation + p.rate * dt)
  state.lifetimeExpectation = clamp(state.lifetimeExpectation + p.rate * dt)
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

export function runAmpCost(state, def) {
  const level = state.runAmps[def.id] || 0
  return def.baseCost * Math.pow(def.growth, level)
}

export function buyRunAmp(state, id) {
  const def = runAmpById(id)
  if (!def) return { ok: false, error: '未知增幅器' }
  const cost = runAmpCost(state, def)
  if (state.expectation < cost) return { ok: false, error: '期待不足' }
  state.expectation = clamp(state.expectation - cost)
  state.runAmps[id] = (state.runAmps[id] || 0) + 1
  return { ok: true, level: state.runAmps[id], total: cost }
}

export function permanentAmpCost(state, def) {
  const level = state.permanentAmps[def.id] || 0
  return def.baseCost * Math.pow(def.growth, level)
}

export function buyPermanentAmp(state, id) {
  const def = permanentAmpById(id)
  if (!def) return { ok: false, error: '未知永久增幅' }
  const cost = permanentAmpCost(state, def)
  if (state.wish < cost) return { ok: false, error: '愿力不足' }
  state.wish = clamp(state.wish - cost)
  state.permanentAmps[id] = (state.permanentAmps[id] || 0) + 1
  return { ok: true, level: state.permanentAmps[id], total: cost }
}

export function currentBoostCost(state) {
  return boostCost(state.boosts || 0)
}

export function currentGalaxyCost(state) {
  return galaxyCost(state.galaxies || 0)
}

export function currentGalaxyRequired(state) {
  return galaxyRequiredBoosts(state.galaxies || 0)
}

export function canBoost(state) {
  return state.expectation >= currentBoostCost(state)
}

export function canGalaxy(state) {
  return (state.boosts || 0) >= currentGalaxyRequired(state) &&
    state.expectation >= currentGalaxyCost(state)
}

function resetLevelsAndAmps(state) {
  for (const def of LEVELS) {
    state.levels[def.id].owned = 0
    state.levels[def.id].bought = 0
  }
  for (const def of RUN_AMPS) state.runAmps[def.id] = 0
}

export function boost(state) {
  const cost = currentBoostCost(state)
  if (state.expectation < cost) return { ok: false, error: '期待不足，无法 Boost' }
  state.expectation = 0
  state.boosts = (state.boosts || 0) + 1
  resetLevelsAndAmps(state)
  state.lastOffline = null
  return { ok: true, cost, boosts: state.boosts }
}

export function galaxy(state) {
  const required = currentGalaxyRequired(state)
  const cost = currentGalaxyCost(state)
  if ((state.boosts || 0) < required) {
    return { ok: false, error: `需要 ${required} 次 Boost 才能 Galaxy` }
  }
  if (state.expectation < cost) return { ok: false, error: '期待不足，无法 Galaxy' }
  state.expectation = 0
  state.galaxies = (state.galaxies || 0) + 1
  state.boosts = 0
  resetLevelsAndAmps(state)
  state.lastOffline = null
  return { ok: true, cost, required, galaxies: state.galaxies }
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
  state.boosts = 0
  state.galaxies = 0
  resetLevelsAndAmps(state)
  state.lastOffline = null
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
  const dailyCap = DAILY_WISH_CAP + 5 * (state.permanentAmps.echo || 0)
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
  const runAmps = RUN_AMPS.map((def) => {
    const level = state.runAmps[def.id] || 0
    const cost = runAmpCost(state, def)
    return { ...def, level, cost, canBuy: state.expectation >= cost }
  })
  const permanentAmps = PERMANENT_AMPS.map((def) => {
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
    releaseMultiplier: 1 + 0.1 * state.release,
    lastReleaseGain: state.lastReleaseGain,
    lastReleaseAt: state.lastReleaseAt,
    levels,
    highestLevel: {
      index: highest.index,
      name: highest.name,
      image: highest.image || null,
    },
    nextLevel: next
      ? {
          index: next.index,
          name: next.name,
          image: next.image || null,
          at: next.unlockAt,
          progress: nextProgress,
        }
      : null,
    boosts: state.boosts || 0,
    galaxies: state.galaxies || 0,
    boostCost: currentBoostCost(state),
    galaxyCost: currentGalaxyCost(state),
    galaxyRequiredBoosts: currentGalaxyRequired(state),
    canBoost: canBoost(state),
    canGalaxy: canGalaxy(state),
    boostMultiplier: Math.pow(BOOST_MULTIPLIER, state.boosts || 0),
    galaxyMultiplier: Math.pow(GALAXY_MULTIPLIER, state.galaxies || 0),
    runAmps,
    permanentAmps,
    nextUnlock: next
      ? { kind: 'level', index: next.index, name: next.name, at: next.unlockAt }
      : { kind: 'boost', name: 'Boost', at: currentBoostCost(state) },
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
