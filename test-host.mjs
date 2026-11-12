/**
 * Standalone v0.3 Host smoke test. Not shipped.
 * Uses a throwaway DSH_HOME and a mock Cordis context.
 */
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Readable } from 'node:stream'
import { apply } from './index.js'

const home = await mkdtemp(join(tmpdir(), 'dsh-pray-v3-'))
process.env.DSH_HOME = home
await mkdir(join(home, 'dsh-pray'), { recursive: true })
await writeFile(join(home, 'dsh-pray', 'state.json'), JSON.stringify({
  schema: 2,
  expectation: 1280,
  lifetimeExpectation: 1280,
  runExpectation: 1280,
  installedAt: new Date(Date.now() - 3600_000).toISOString(),
  dimensions: { A: { owned: 2, bought: 2 }, B: { owned: 0, bought: 0 }, C: { owned: 0, bought: 0 } },
  runAmps: { dimA: 1, dimB: 0, dimC: 0, global: 0 },
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
  wish: state1.body.wish,
  latest: state1.body.latestUpdate,
  changelogOk: state1.body.changelogOk,
}, null, 2))
if (state1.body.schema !== 3) throw new Error('v3 schema expected')
if (state1.body.expectation < 1280) throw new Error('migration lost points')
if (state1.body.levels.length !== 5) throw new Error('five levels expected')

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
}, null, 2))
if (state2.body.activity.sessions < 1) throw new Error('session not counted')
if (state2.body.activity.turns < 1) throw new Error('turn not counted')

const asset = await call('/dsh-pray/asset/realm-5')
console.log('asset', asset.status, asset.contentType, asset.body.length)
if (asset.status !== 200 || !String(asset.contentType).startsWith('image/')) throw new Error('asset failed')

const exported = await call('/dsh-pray/export')
const parsed = JSON.parse(exported.body)
console.log('export', parsed.schema, parsed.expectation, parsed.activity?.sessions, parsed.levels?.level1?.owned)
if (parsed.schema !== 3) throw new Error('export failed')

console.log('host smoke ok', home)
