import assert from 'node:assert/strict'
import {
  advance,
  applyAuto,
  buyLevel,
  checkAchievements,
  createState,
  launch,
  levelCost,
  migrateState,
  release,
  releaseGain,
  repairState,
  resetRun,
  syncEra,
  urge,
  view,
} from './game/engine.js'
import { awardWish, onSessionCreated, onSessionEvent } from './game/activity.js'

const now = Date.now()
const state = createState(now)
state.changelog.date = '2026-10-17'
state.changelog.ok = true
advance(state, now + 1000)
assert.ok(state.expectation >= 1, 'one second of base expectation')
assert.ok(state.expectation < 10, 'base expectation is still small')

assert.equal(levelCost(state, 'level1', 1).total > 0, true)
const before = state.expectation
const buy = buyLevel(state, 'level1', 1)
assert.equal(buy.ok, true, 'buy one Level 1')
assert.ok(state.expectation < before, 'buying spends expectation')
assert.equal(state.levels.level1.owned, 1)

const old = migrateState({
  schema: 3,
  expectation: 1280,
  lifetimeExpectation: 1280,
  runExpectation: 1280,
  installedAt: new Date(now - 3600_000).toISOString(),
  levels: {
    level1: { owned: 3, bought: 3, produced: 9 },
    level2: { owned: 2, bought: 2, produced: 4 },
    level3: { owned: 0, bought: 0, produced: 0 },
    level4: { owned: 0, bought: 0, produced: 0 },
    level5: { owned: 0, bought: 0, produced: 0 },
  },
  runAmps: { level1: 1, level2: 2, level3: 0, level4: 0, level5: 0, global: 1 },
  boosts: 4,
  galaxies: 2,
  changelog: { date: '2026-10-17', headings: ['x'], ok: true },
})
assert.equal(old.schema, 4)
assert.equal(old.levels.level1.owned, 3)
assert.equal(old.runAmps.level1, 1)
assert.equal(old.urges, 4)
assert.equal(old.launches, 2)
assert.equal(view(old, now).highestLevel.name, '别打扰梁叔叔搞AGI')

const urged = createState(now)
urged.changelog.date = '2026-10-17'
urged.expectation = 1e6
const urgeResult = urge(urged)
assert.equal(urgeResult.ok, true)
assert.equal(urged.urges, 1)
assert.equal(urged.expectation, 0)

const launched = createState(now)
launched.changelog.date = '2026-10-17'
launched.urges = 3
launched.expectation = 1e6
const launchResult = launch(launched)
assert.equal(launchResult.ok, true)
assert.equal(launched.launches, 1)
assert.equal(launched.urges, 0)

const autoState = createState(now)
autoState.settings.mode = 'attention'
autoState.expectation = 1e6
applyAuto(autoState)
assert.ok(autoState.levels.level1.owned > 0, 'attention mode auto-buys levels')
autoState.settings.mode = 'play'
const beforePlay = autoState.levels.level1.owned
applyAuto(autoState)
assert.equal(autoState.levels.level1.owned, beforePlay, 'play mode does not auto-buy')

const releaseState = createState(now)
releaseState.runExpectation = 4e12
releaseState.urges = 5
releaseState.launches = 2
releaseState.levels.level1 = { owned: 10, bought: 10, produced: 123 }
releaseState.runAmps.global = 3
assert.equal(releaseGain(releaseState), 2)
const released = release(releaseState, now)
assert.equal(released.ok, true)
assert.equal(releaseState.release, 2)
assert.equal(releaseState.runExpectation, 0)
assert.equal(releaseState.urges, 0)
assert.equal(releaseState.launches, 0)
assert.equal(releaseState.levels.level1.owned, 0)
assert.equal(releaseState.levels.level1.produced, 123)
assert.equal(releaseState.runAmps.global, 0)
assert.ok(releaseState.achievements.includes('first_release'))

const achievementState = createState(now)
achievementState.release = 1
checkAchievements(achievementState)
assert.ok(achievementState.achievements.includes('first_release'))

const pausedAuto = createState(now)
pausedAuto.settings.mode = 'attention'
pausedAuto.expectation = 1e6
pausedAuto.runExpectation = 1e12
applyAuto(pausedAuto)
assert.equal(pausedAuto.levels.level1.owned, 0, 'auto pauses at release threshold')

const resetState = createState(now)
resetState.expectation = 123
resetState.lifetimeExpectation = 456
resetState.runExpectation = 456
resetState.wish = 9
resetState.release = 2
resetState.achievements = ['first_release']
resetState.levels.level1 = { owned: 10, bought: 10, produced: 99 }
resetState.urges = 3
resetState.launches = 1
const resetResult = resetRun(resetState, now)
assert.equal(resetResult.ok, true)
assert.equal(resetState.lifetimeExpectation, 0)
assert.equal(resetState.expectation, 0)
assert.equal(resetState.levels.level1.owned, 0)
assert.equal(resetState.urges, 0)
assert.equal(resetState.launches, 0)
assert.equal(resetState.wish, 9, 'reset keeps wish')
assert.equal(resetState.release, 2, 'reset keeps release')
assert.ok(resetState.achievements.includes('first_release'))

const repaired = createState(now)
repaired.release = 38_170_117
repaired.wish = 7
repaired.achievements = ['first_release']
repaired.lifetimeExpectation = 1e27
const repairResult = repairState(repaired, now)
assert.equal(repairResult.ok, true)
assert.equal(repaired.release, 0)
assert.equal(repaired.lifetimeExpectation, 0)
assert.equal(repaired.wish, 7)
assert.ok(repaired.achievements.includes('first_release'))

const activity = createState(now)
const session = { id: 's1', header: { createdAt: now } }
onSessionCreated(activity, session, now)
assert.ok(activity.wish >= 1, 'new session gives wish')
assert.equal(activity.activity.rootSessions, 1)
onSessionEvent(activity, session, { type: 'turn/end', time: now + 10, data: { reason: { kind: 'completed' } } }, now + 10)
assert.ok(activity.activity.turns >= 1)
onSessionEvent(activity, session, { type: 'step/start', time: now + 20_000 }, now + 20_000)
onSessionEvent(activity, session, { type: 'step/end', time: now + 1_220_000 }, now + 1_220_000)
assert.ok(activity.activity.activeSeconds >= 1200)
assert.ok(activity.activity.activeWishAwarded >= 2)

const capState = createState(now)
awardWish(capState, 100, 'test', now)
assert.equal(capState.activity.todayWish, 30)
assert.equal(awardWish(capState, 100, 'test', now), 0)

const eraState = createState(now)
eraState.changelog.date = '2026-10-17'
assert.equal(syncEra(eraState, now), true)
assert.equal(eraState.versionBonusUntil, null)
eraState.changelog.date = '2026-11-01'
assert.equal(syncEra(eraState, now), true)
assert.ok(eraState.versionBonusUntil)

const v = view(state, now)
assert.equal(v.schema, 4)
assert.equal(v.levels.length, 5)
assert.equal(v.levels[4].name, '我们的deepseek···会变成什么样子')
assert.equal(v.urgeCost, 1e4)
assert.equal(v.mode, 'attention')
assert.equal(typeof v.canUrge, 'boolean')
assert.ok(Array.isArray(v.achievements))

console.log('engine/activity tests ok')
