import assert from 'node:assert/strict'
import {
  advance,
  buyDimension,
  createState,
  dimensionCost,
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

assert.equal(dimensionCost(state, 'A', 1).total > 0, true)
const before = state.expectation
const buy = buyDimension(state, 'A', 1)
assert.equal(buy.ok, true, 'buy one A')
assert.ok(state.expectation < before, 'buying spends expectation')
assert.equal(state.dimensions.A.owned, 1)

const old = migrateState({
  schema: 1,
  points: 1280,
  installedAt: new Date(now - 3600_000).toISOString(),
  changelog: { date: '2026-10-17', headings: ['x'], ok: true },
})
assert.equal(old.expectation, 1280)
assert.equal(old.lifetimeExpectation, 1280)
assert.equal(view(old, now).realm.name, '别打扰梁叔叔搞AGI')

const releaseState = createState(now)
releaseState.runExpectation = 4e6
assert.equal(releaseGain(releaseState), 2)
releaseState.dimensions.A = { owned: 10, bought: 10 }
releaseState.runAmps.global = 3
const released = release(releaseState, now)
assert.equal(released.ok, true)
assert.equal(releaseState.release, 2)
assert.equal(releaseState.runExpectation, 0)
assert.equal(releaseState.dimensions.A.owned, 0)
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
assert.equal(v.schema, 2)
assert.equal(v.dimensions.length, 3)
assert.equal(v.realms[3].name, 'Pro来✋🏻😡🤚🏻')
assert.equal(v.realms[4].image, 'assets/realm-5.png')

console.log('engine/activity tests ok')
