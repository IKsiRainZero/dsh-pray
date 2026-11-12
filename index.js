/**
 * dsh-pray v0.4 — Host half.
 *
 * Local single-player incremental game. It owns:
 *   - the changelog fetch/cache (the only network request),
 *   - the game state and its migrations,
 *   - core DSH event collection (sessions / turns / active time),
 *   - the HTTP routes used by the browser half.
 *
 * There is no total repository, no push tool, and no telemetry.
 */
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { homedir } from 'node:os'
import {
  applyAuto,
  checkAchievements,
  launch,
  urge,
  buyLevel,
  buyPermanentAmp,
  createState,
  advance,
  migrateState,
  release,
  repairState,
  resetRun,
  syncEra,
  view,
} from './game/engine.js'
import { onSessionCreated, onSessionDisposed, onSessionEvent } from './game/activity.js'

export const name = 'dsh-pray'
export const inject = ['webServer']

const VERSION = '0.4.1'
const DEFAULT_CHANGELOG_URL = 'https://api-docs.deepseek.com/zh-cn/updates.md'
const CHANGELOG_TTL_MS = 30 * 60 * 1000
const CHANGELOG_RETRY_MS = 2 * 60 * 1000
const ANCHOR_OFFSET = '+08:00'
const ALLOWED_NOTATIONS = new Set(['auto', 'standard', 'scientific', 'engineering', 'letters'])

function dataRoot() {
  return join(process.env.DSH_HOME || join(homedir(), '.dsh'), 'dsh-pray')
}

function stateFile() {
  return join(dataRoot(), 'state.json')
}

async function readJson(file, fallback) {
  try {
    return JSON.parse(await readFile(file, 'utf8'))
  } catch {
    return fallback
  }
}

async function writeJson(file, value) {
  await mkdir(dirname(file), { recursive: true })
  const tmp = `${file}.${process.pid}.tmp`
  await writeFile(tmp, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
  await rename(tmp, file)
}

async function loadState() {
  const raw = await readJson(stateFile(), null)
  if (!raw) {
    const state = createState(Date.now())
    await writeJson(stateFile(), state)
    return state
  }
  const state = migrateState(raw)
  await writeJson(stateFile(), state)
  return state
}

let writeChain = Promise.resolve()

function persist(state) {
  const snapshot = JSON.parse(JSON.stringify(state))
  writeChain = writeChain.then(
    () => writeJson(stateFile(), snapshot),
    () => writeJson(stateFile(), snapshot),
  )
  return writeChain
}

let persistTimer = null

function schedulePersist(state, immediate = false) {
  if (immediate) {
    if (persistTimer) clearTimeout(persistTimer)
    persistTimer = null
    return persist(state)
  }
  if (persistTimer) return Promise.resolve()
  persistTimer = setTimeout(() => {
    persistTimer = null
    persist(state).catch(() => {})
  }, 2000)
  return Promise.resolve()
}

function parseChangelog(markdown) {
  const lines = String(markdown || '').split(/\r?\n/)
  let date = null
  let start = -1
  for (let i = 0; i < lines.length; i += 1) {
    const match = /^##\s+(?:Date|时间)\s*[:：]\s*(\d{4}-\d{2}-\d{2})\s*$/.exec(lines[i].trim())
    if (match) {
      date = match[1]
      start = i
      break
    }
  }
  if (!date) return null
  const headings = []
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i].trim()
    if (/^##\s+/.test(line)) break
    const heading = /^###\s+(.+?)\s*$/.exec(line)
    if (heading) headings.push(heading[1].replace(/\s+/g, ' ').trim())
  }
  return { date, headings: headings.slice(0, 4) }
}

let changelogInFlight = null

async function refreshChangelog(state, force = false) {
  const current = state.changelog || {}
  if (!force && current.fetchedAt) {
    const age = Date.now() - Date.parse(current.fetchedAt)
    const ttl = current.ok === false ? CHANGELOG_RETRY_MS : CHANGELOG_TTL_MS
    if (Number.isFinite(age) && age >= 0 && age < ttl) return current
  }
  if (changelogInFlight) return changelogInFlight

  changelogInFlight = (async () => {
    const url = state.settings?.changelogUrl || DEFAULT_CHANGELOG_URL
    try {
      const response = await fetch(url, {
        headers: { 'user-agent': `dsh-pray/${VERSION}` },
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const parsed = parseChangelog(await response.text())
      if (!parsed) throw new Error('未在更新日志中找到日期')
      state.changelog = {
        ...parsed,
        fetchedAt: new Date().toISOString(),
        ok: true,
        error: null,
        url,
      }
      syncEra(state, Date.now())
    } catch (error) {
      state.changelog = {
        ...(state.changelog || {}),
        fetchedAt: new Date().toISOString(),
        ok: false,
        error: String(error?.message || error),
        url,
      }
    } finally {
      changelogInFlight = null
    }
    return state.changelog
  })()

  return changelogInFlight
}

function json(res, status, value) {
  res.statusCode = status
  res.setHeader('content-type', 'application/json; charset=utf-8')
  res.setHeader('cache-control', 'no-store')
  res.end(JSON.stringify(value))
}

async function readBody(req, limit = 64 * 1024) {
  let size = 0
  const chunks = []
  for await (const chunk of req) {
    size += chunk.length
    if (size > limit) throw new Error('请求体过大')
    chunks.push(chunk)
  }
  const text = Buffer.concat(chunks).toString('utf8')
  return text ? JSON.parse(text) : {}
}

function handler(fn, statePromise) {
  return (req, res) => {
    Promise.resolve(fn(req, res, statePromise)).catch((error) => {
      if (!res.headersSent) json(res, 500, { ok: false, error: String(error?.message || error) })
      else res.destroy?.()
    })
  }
}

function actionError(res, message) {
  return json(res, 200, { ok: false, error: message })
}

async function handleState(req, res, statePromise) {
  if (req.method !== 'GET') return json(res, 405, { ok: false, error: 'GET only' })
  const state = await statePromise
  await refreshChangelog(state, false)
  advance(state, Date.now())
  if (state.settings?.mode === 'attention') applyAuto(state)
  checkAchievements(state)
  syncEra(state, Date.now())
  schedulePersist(state)
  return json(res, 200, view(state, Date.now()))
}

async function handleAction(req, res, statePromise) {
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'POST only' })
  let payload
  try {
    payload = await readBody(req)
  } catch (error) {
    return json(res, 400, { ok: false, error: String(error?.message || error) })
  }
  const state = await statePromise
  await refreshChangelog(state, false)
  advance(state, Date.now())
  const type = payload?.type
  let result = { ok: false, error: '未知操作' }
  if (type === 'buyLevel') {
    result = buyLevel(state, payload.id, payload.count === 'max' ? 'max' : Number(payload.count) === 10 ? 10 : 1)
  } else if (type === 'buyPermanentAmp') {
    result = buyPermanentAmp(state, payload.id)
  } else if (type === 'urge') {
    result = urge(state)
  } else if (type === 'launch') {
    result = launch(state)
  } else if (type === 'release') {
    result = release(state, Date.now())
  } else if (type === 'resetRun') {
    result = resetRun(state, Date.now())
  } else if (type === 'repairState') {
    result = repairState(state, Date.now())
  } else if (type === 'setMode') {
    const mode = String(payload.mode || '')
    if (mode !== 'attention' && mode !== 'play') {
      result = { ok: false, error: '未知模式' }
    } else {
      state.settings.mode = mode
      result = { ok: true, mode }
    }
  } else if (type === 'setNotation') {
    const notation = String(payload.notation || '')
    if (!ALLOWED_NOTATIONS.has(notation)) {
      result = { ok: false, error: '未知记数法' }
    } else {
      state.settings.notation = notation
      result = { ok: true }
    }
  }
  if (!result.ok) return actionError(res, result.error)
  if (state.settings?.mode === 'attention') applyAuto(state)
  checkAchievements(state)
  await schedulePersist(state, true)
  return json(res, 200, { ok: true, result, state: view(state, Date.now()) })
}

async function handleExport(req, res, statePromise) {
  if (req.method !== 'GET') return json(res, 405, { ok: false, error: 'GET only' })
  const state = await statePromise
  res.statusCode = 200
  res.setHeader('content-type', 'application/json; charset=utf-8')
  res.setHeader('content-disposition', 'attachment; filename="dsh-pray-state.json"')
  res.end(`${JSON.stringify(state, null, 2)}\n`)
}

function registerActivity(ctx, statePromise) {
  const wrap = (fn) => (...args) => {
    statePromise.then((state) => {
      fn(state, ...args)
      checkAchievements(state)
      schedulePersist(state)
    }).catch(() => {})
  }

  ctx.effect(() => ctx.on('session/created', wrap(onSessionCreated)))
  ctx.effect(() => ctx.on('session/event', wrap(onSessionEvent)))
  ctx.effect(() => ctx.on('session/disposed', wrap(onSessionDisposed)))
}

export function apply(ctx) {
  const statePromise = loadState()
  statePromise.then((state) => persist(state)).catch(() => {})

  ctx.effect(() => ctx.webServer.register({
    kind: 'exact',
    path: '/dsh-pray/state',
    handler: handler(handleState, statePromise),
  }))
  ctx.effect(() => ctx.webServer.register({
    kind: 'exact',
    path: '/dsh-pray/action',
    handler: handler(handleAction, statePromise),
  }))
  ctx.effect(() => ctx.webServer.register({
    kind: 'exact',
    path: '/dsh-pray/export',
    handler: handler(handleExport, statePromise),
  }))

  registerActivity(ctx, statePromise)

  ctx.effect(() => () => {
    if (persistTimer) clearTimeout(persistTimer)
    statePromise.then((state) => persist(state)).catch(() => {})
  })
}
