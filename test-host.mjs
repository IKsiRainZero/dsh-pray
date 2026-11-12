/**
 * Standalone v0.4 Host smoke test. Not shipped.
 * Uses a throwaway DSH_HOME and a mock Cordis context.
 */
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Readable } from 'node:stream'
import { apply } from './index.js'

const home = await mkdtemp(join(tmpdir(), 'dsh-pray-v4-'))
process.env.DSH_HOME = home
await mkdir(join(home, 'dsh-pray'), { recursive: true })
await writeFile(join(home, 'dsh-pray', 'state.json'), JSON.stringify({
  schema: 3,
  expectation: 1280,
  lifetimeExpectation: 1280,
  runExpectation: 1280,
  installedAt: new Date(Date.now() - 3600_000).toISOString(),
  levels: {
    level1: { owned: 2, bought: 2, produced: 9 },
    level2: { owned: 0, bought: 0, produced: 0 },
    level3: { owned: 0, bought: 0, produced: 0 },
    level4: { owned: 0, bought: 0, produced: 0 },
    level5: { owned: 0, bought: 0, produced: 0 },
  },
  runAmps: { level1: 1, level2: 0, level3: 0, level4: 0, level5: 0, global: 0 },
  boosts: 2,
  galaxies: 1,
  changelog: { date: '2026-10-17', headings: ['DeepSeek-V4.1-Flash-1017 更新'], ok: true },
}), 'utf8')

const routes = new Map()
const listeners = new Map()
const ctx = {
  effect(fn) { return fn() },
  on(name, fn) { listeners.set(name, fn); return () => listeners.delete(name) },
  webServer: {
    register(route) { routes.set(route.path, route); return () => routes.delete(route.path) },
  },
}

apply(ctx)

function response() {
  const res = {
    statusCode: 200,
    headers: {},
    headersSent: false,
    body: '',
    setHeader(key, value) { this.headers[key] = value },
    end(body) { this.body = body; this.headersSent = true; this.resolve?.() },
    destroy() {},
  }
  return res
}

function call(path, method = 'GET', body = undefined) {
  const route = routes.get(path)
  if (!route) throw new Error(`route not found: ${path}`)
  const req = method === 'POST'
    ? Object.assign(Readable.from(body === undefined ? [] : [Buffer.from(JSON.stringify(body))]), { method })
    : { method }
  const res = response()
  return new Promise((resolve, reject) => {
    res.resolve = () => {
      try {
        resolve({ status: res.statusCode, contentType: res.headers['content-type'], body: res.body })
      } catch (error) {
        reject(error)
      }
    }
    try { route.handler(req, res) } catch (error) { reject(error) }
  })
}

async function callJson(path, method = 'GET', body = undefined) {
  const result = await call(path, method, body)
  return { ...result, body: JSON.parse(result.body) }
}

await new Promise((resolve) => setTimeout(resolve, 1800))

const state1 = await callJson('/dsh-pray/state')
console.log('state1', JSON.stringify({
  schema: state1.body.schema,
  expectation: state1.body.expectation,
  lifetime: state1.body.lifetimeExpectation,
  highest: state1.body.highestLevel?.name,
  levels: state1.body.levels?.length,
  urges: state1.body.urges,
  launches: state1.body.launches,
  mode: state1.body.mode,
  wish: state1.body.wish,
  latest: state1.body.latestUpdate,
  changelogOk: state1.body.changelogOk,
}, null, 2))
if (state1.body.schema !== 5) throw new Error('v5 schema expected')
if (state1.body.lifetimeExpectation < 1280) throw new Error('migration lost points')
if (state1.body.levels.length !== 5) throw new Error('five levels expected')
if (state1.body.urges !== 2 || state1.body.launches !== 1) throw new Error('urge/launch migration failed')

const mode = await callJson('/dsh-pray/action', 'POST', { type: 'setMode', mode: 'play' })
if (!mode.body.ok || mode.body.state.mode !== 'play') throw new Error('mode switch failed')

const buy = await callJson('/dsh-pray/action', 'POST', { type: 'buyLevel', id: 'level1', count: 1 })
console.log('buy', buy.body.ok, buy.body.result?.purchased, buy.body.state?.levels?.[0]?.owned)
if (!buy.body.ok) throw new Error('buy failed')

const notation = await callJson('/dsh-pray/action', 'POST', { type: 'setNotation', notation: 'scientific' })
if (notation.body.state.settings.notation !== 'scientific') throw new Error('notation failed')

const created = listeners.get('session/created')
const event = listeners.get('session/event')
if (!created || !event) throw new Error('activity listeners missing')
const now = Date.now()
created({ id: 's1', header: { createdAt: now } })
event({ id: 's1' }, { type: 'turn/end', time: now + 100, data: { reason: { kind: 'completed' } } })
await new Promise((resolve) => setTimeout(resolve, 80))

const state2 = await callJson('/dsh-pray/state')
console.log('activity', JSON.stringify({
  sessions: state2.body.activity?.sessions,
  turns: state2.body.activity?.turns,
  wish: state2.body.wish,
  todayWish: state2.body.activity?.todayWish,
  achievements: state2.body.achievements?.filter((a) => a.unlocked).map((a) => a.id),
}, null, 2))
if (state2.body.activity.sessions < 1) throw new Error('session not counted')
if (state2.body.activity.turns < 1) throw new Error('turn not counted')

const exported = await call('/dsh-pray/export')
const parsed = JSON.parse(exported.body)
console.log('export', parsed.schema, parsed.expectation, parsed.activity?.sessions, parsed.levels?.level1?.owned, parsed.urges, parsed.launches)
if (parsed.schema !== 5) throw new Error('export failed')

console.log('host smoke ok', home)
