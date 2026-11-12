import assert from 'node:assert/strict'
import {
  advance,
  boost,
  buyLevel,
  createState,
  galaxy,
  levelCost,
  migrateState,
  release,
  releaseGain,
  syncEra,
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
  schema: 2,
  expectation: 1280,
  lifetimeExpectation: 1280,
  runExpectation: 1280,
  installedAt: new Date(now - 3600_000).toISOString(),
  dimensions: { A: { owned: 3, bought: 3 }, B: { owned: 2, bought: 2 }, C: { owned: 0, bought: 0 } },
  runAmps: { dimA: 1, dimB: 2, dimC: 0, global: 1 },
  changelog: { date: '2026-10-17', headings: ['x'], ok: true },
})
assert.equal(old.schema, 3)
assert.equal(old.levels.level1.owned, 3)
assert.equal(old.levels.level2.owned, 2)
assert.equal(old.runAmps.level1, 1)
assert.equal(old.runAmps.level2, 2)
assert.equal(old.runAmps.global, 1)
assert.equal(view(old, now).highestLevel.name, '别打扰梁叔叔搞AGI')

const boosted = createState(now)
boosted.changelog.date = '2026-10-17'
boosted.expectation = 1e6
const boostResult = boost(boosted)
assert.equal(boostResult.ok, true)
assert.equal(boosted.boosts, 1)
assert.equal(boosted.expectation, 0)
assert.equal(boosted.levels.level1.owned, 0)

const galaxyState = createState(now)
galaxyState.changelog.date = '2026-10-17'
galaxyState.boosts = 3
galaxyState.expectation = 1e6
const galaxyResult = galaxy(galaxyState)
assert.equal(galaxyResult.ok, true)
assert.equal(galaxyState.galaxies, 1)
assert.equal(galaxyState.boosts, 0)

const releaseState = createState(now)
releaseState.runExpectation = 4e6
releaseState.boosts = 5
releaseState.galaxies = 2
releaseState.levels.level1 = { owned: 10, bought: 10, produced: 123 }
releaseState.runAmps.global = 3
assert.equal(releaseGain(releaseState), 2)
const released = release(releaseState, now)
assert.equal(released.ok, true)
assert.equal(releaseState.release, 2)
assert.equal(releaseState.runExpectation, 0)
assert.equal(releaseState.boosts, 0)
assert.equal(releaseState.galaxies, 0)
assert.equal(releaseState.levels.level1.owned, 0)
assert.equal(releaseState.levels.level1.produced, 123)
assert.equal(releaseState.runAmps.global, 0)

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
assert.equal(v.schema, 3)
assert.equal(v.levels.length, 5)
assert.equal(v.levels[3].name, 'Pro来✋🏻😡🤚🏻')
assert.equal(v.levels[4].image, 'assets/realm-5.jpg')
assert.equal(v.boostCost, 1e4)
assert.equal(typeof v.canBoost, 'boolean')

console.log('engine/activity tests ok')
