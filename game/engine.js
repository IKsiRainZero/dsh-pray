/**
 * dsh-pray v0.2 pure game engine.
 *
 * No DSH imports, no I/O: Host routes call these functions, tests call them
 * directly. Costs/production are tuned in balance.js.
 */
import { randomUUID } from 'node:crypto'
import {
  ACTIVE_SECONDS_PER_WISH,
  DAILY_WISH_CAP,
  DIMENSIONS,
  OFFLINE_CAP_PER_LEVEL_SECONDS,
  OFFLINE_CAP_SECONDS,
  PERMANENT_AMPS,
  RELEASE_THRESHOLD,
  REALMS,
  RUN_AMPS,
  SCHEMA,
  VERSION,
  VERSION_BONUS_MS,
  VERSION_BONUS_MULTIPLIER,
  WAITING_BONUS_MAX,
  WAITING_BONUS_PER_DAY,
  dimensionById,
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
    dimensions: Object.fromEntries(DIMENSIONS.map((def) => [def.id, { owned: 0, bought: 0 }])),
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
  const oldPoints = clamp(raw.points)
  state.installationId = typeof raw.installationId === 'string' && raw.installationId
    ? raw.installationId
    : state.installationId
  state.installedAt = typeof raw.installedAt === 'string' ? raw.installedAt : state.installedAt
  state.expectation = oldPoints
  state.lifetimeExpectation = oldPoints
  state.runExpectation = oldPoints
  if (raw.changelog && typeof raw.changelog === 'object') {
    state.changelog = { ...state.changelog, ...raw.changelog }
  }
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
  state.installedAt = typeof state.installedAt === 'string' ? state.installedAt : base.installedAt
  state.lastTickAt = Number.isFinite(Date.parse(state.lastTickAt)) ? state.lastTickAt : iso(now)
  state.dimensions = state.dimensions && typeof state.dimensions === 'object' ? state.dimensions : {}
  for (const def of DIMENSIONS) {
    const dim = state.dimensions[def.id] || {}
    state.dimensions[def.id] = {
      owned: clamp(dim.owned),
      bought: Math.max(0, Math.floor(Number(dim.bought) || 0)),
    }
  }
  state.runAmps = state.runAmps && typeof state.runAmps === 'object' ? state.runAmps : {}
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
    versionMultiplier(state, now)
}

export function dimensionMultiplier(state, id) {
  const dim = state.dimensions[id]
  const amp = state.runAmps[id] || 0
  return (1 + 0.5 * amp) * (2 ** Math.floor((dim?.bought || 0) / 10))
}

export function production(state, now = Date.now()) {
  const global = globalMultiplier(state, now)
  const base = waitingMultiplier(state, now) * global
  const dimA = dimensionMultiplier(state, 'A')
  const dimB = dimensionMultiplier(state, 'B')
  const dimC = dimensionMultiplier(state, 'C')
  const dims = state.dimensions
  const prodA = clamp(dims.A.owned * 1 * dimA * global)
  const prodB = clamp(dims.B.owned * 1 * dimB * global)
  const prodC = clamp(dims.C.owned * 1 * dimC * global)
  return {
    base,
    prodA,
    prodB,
    prodC,
    rate: clamp(base + prodA),
    global,
    dimA,
    dimB,
    dimC,
  }
}

function simulate(state, dt, now) {
  const p = production(state, now)
  state.expectation = clamp(state.expectation + p.rate * dt)
  state.runExpectation = clamp(state.runExpectation + p.rate * dt)
  state.lifetimeExpectation = clamp(state.lifetimeExpectation + p.rate * dt)
  state.dimensions.A.owned = clamp(state.dimensions.A.owned + p.prodB * dt)
  state.dimensions.B.owned = clamp(state.dimensions.B.owned + p.prodC * dt)
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

export function dimensionUnitCost(state, def, bought = state.dimensions[def.id].bought) {
  const block = Math.floor(Math.max(0, bought) / 10)
  return def.baseCost * Math.pow(def.costGrowth, block)
}

export function dimensionCost(state, id, count = 1) {
  const def = dimensionById(id)
  if (!def) return null
  const bought = state.dimensions[id].bought
  const isMax = count === 'max'
  const limit = isMax ? 10000 : count
  const budget = isMax ? state.expectation : Infinity
  let total = 0
  let boughtCursor = bought
  let purchased = 0
  while (purchased < limit) {
    const unit = dimensionUnitCost(state, def, boughtCursor)
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

export function buyDimension(state, id, count = 1) {
  const def = dimensionById(id)
  if (!def) return { ok: false, error: '未知维度' }
  if (state.lifetimeExpectation < def.unlockAt) {
    return { ok: false, error: `累计期待达到 ${def.unlockAt} 后解锁` }
  }
  const plan = dimensionCost(state, id, count)
  if (!plan) return { ok: false, error: '未知维度' }
  if (count !== 'max' && !plan.affordable) return { ok: false, error: '期待不足' }
  if (plan.purchased <= 0) return { ok: false, error: '期待不足' }
  state.expectation = clamp(state.expectation - plan.total)
  state.dimensions[id].owned = clamp(state.dimensions[id].owned + plan.purchased)
  state.dimensions[id].bought += plan.purchased
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
  for (const def of DIMENSIONS) {
    state.dimensions[def.id] = { owned: 0, bought: 0 }
  }
  for (const def of RUN_AMPS) state.runAmps[def.id] = 0
  state.lastOffline = null
  return { ok: true, gain, release: state.release }
}

export function realmFor(lifetimeExpectation) {
  let index = 0
  for (let i = 0; i < REALMS.length; i += 1) {
    if (lifetimeExpectation >= REALMS[i].at) index = i
  }
  const current = REALMS[index]
  const next = REALMS[index + 1] || null
  const span = next ? next.at - current.at : 0
  return {
    index,
    current,
    next,
    progress: next && span > 0 ? Math.min(1, (lifetimeExpectation - current.at) / span) : 1,
  }
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

function nextUnlock(state) {
  const nextDimension = DIMENSIONS.find((def) => state.lifetimeExpectation < def.unlockAt)
  if (nextDimension) {
    return { kind: 'dimension', id: nextDimension.id, name: nextDimension.name, at: nextDimension.unlockAt }
  }
  const nextRealm = REALMS.find((realm) => state.lifetimeExpectation < realm.at)
  if (nextRealm) {
    return { kind: 'realm', name: nextRealm.name, at: nextRealm.at, image: nextRealm.image || null }
  }
  return null
}

export function view(state, now = Date.now()) {
  const p = production(state, now)
  const realm = realmFor(state.lifetimeExpectation)
  const dailyCap = DAILY_WISH_CAP + 5 * (state.permanentAmps.echo || 0)
  const dimensions = DIMENSIONS.map((def) => {
    const dim = state.dimensions[def.id]
    const cost1 = dimensionUnitCost(state, def, dim.bought)
    const plan10 = dimensionCost(state, def.id, 10)
    const unlocked = state.lifetimeExpectation >= def.unlockAt
    return {
      ...def,
      owned: dim.owned,
      bought: dim.bought,
      unlocked,
      production: def.id === 'A' ? p.prodA : def.id === 'B' ? p.prodB : p.prodC,
      multiplier: def.id === 'A' ? p.dimA : def.id === 'B' ? p.dimB : p.dimC,
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
    dimensions,
    runAmps,
    permanentAmps,
    realm: {
      index: realm.index,
      at: realm.current.at,
      name: realm.current.name,
      image: realm.current.image || null,
      next: realm.next ? { at: realm.next.at, name: realm.next.name, image: realm.next.image || null } : null,
      progress: realm.progress,
    },
    realms: REALMS,
    nextUnlock: nextUnlock(state),
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
