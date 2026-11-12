/**
 * DSH activity → 愿力 / archive.
 *
 * Core events only: session/created, session/event, session/disposed.
 * Tokens are archive-only. No prompt text, no cost, no network.
 */
import { ACTIVE_SECONDS_PER_WISH, DAILY_WISH_CAP } from './balance.js'

const stepStarts = new Map()

function pad(value) {
  return String(value).padStart(2, '0')
}

export function localDateKey(time = Date.now()) {
  const date = new Date(time)
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function previousDateKey(dateKey) {
  const [year, month, day] = dateKey.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  date.setDate(date.getDate() - 1)
  return localDateKey(date.getTime())
}

function ensureDay(state, dateKey) {
  if (!state.activity.days[dateKey]) {
    state.activity.days[dateKey] = {
      wish: 0,
      sessions: 0,
      turns: 0,
      activeSeconds: 0,
      tokens: 0,
    }
  }
  return state.activity.days[dateKey]
}

function trimDays(state) {
  const keys = Object.keys(state.activity.days).sort()
  while (keys.length > 90) {
    delete state.activity.days[keys.shift()]
  }
}

function dailyCap(state) {
  return DAILY_WISH_CAP + 5 * (state.permanentAmps.echo || 0)
}

function touchDay(state, time = Date.now()) {
  const dateKey = localDateKey(time)
  if (state.activity.todayDate === dateKey) {
    ensureDay(state, dateKey)
    return { newDay: false, dateKey, streakBonus: 0 }
  }
  const previous = state.activity.lastActiveDate
  state.activity.streak = previous === previousDateKey(dateKey)
    ? (state.activity.streak || 0) + 1
    : 1
  state.activity.lastActiveDate = dateKey
  state.activity.todayDate = dateKey
  state.activity.todayWish = 0
  state.activity.todaySessions = 0
  ensureDay(state, dateKey)
  trimDays(state)
  const streakBonus = Math.min(5, state.activity.streak)
  if (streakBonus > 0) addWishRaw(state, streakBonus, 'streak', time)
  return { newDay: true, dateKey, streakBonus }
}

function addWishRaw(state, rawAmount, reason, time = Date.now()) {
  const cap = dailyCap(state)
  const echo = 1 + 0.05 * (state.permanentAmps.echo || 0)
  let amount = Math.round(Math.max(0, rawAmount) * echo)
  if (rawAmount > 0 && amount < 1) amount = 1
  const room = Math.max(0, cap - state.activity.todayWish)
  const granted = Math.min(amount, room)
  if (granted <= 0) return 0
  state.wish += granted
  state.wishEarned += granted
  state.activity.todayWish += granted
  ensureDay(state, localDateKey(time)).wish += granted
  return granted
}

export function awardWish(state, amount, reason, time = Date.now()) {
  touchDay(state, time)
  return addWishRaw(state, amount, reason, time)
}

export function onSessionCreated(state, session, now = Date.now()) {
  const time = Number.isFinite(session?.header?.createdAt) ? session.header.createdAt : now
  touchDay(state, time)
  state.activity.sessions += 1
  const isSubagent = session?.header?.origin === 'subagent' || Boolean(session?.header?.parentSession)
  if (isSubagent) {
    state.activity.subagentSessions += 1
    ensureDay(state, localDateKey(time)).sessions += 1
    return
  }
  state.activity.rootSessions += 1
  const firstToday = state.activity.todaySessions === 0
  state.activity.todaySessions += 1
  ensureDay(state, localDateKey(time)).sessions += 1
  awardWish(state, 1, 'session', time)
  if (firstToday) awardWish(state, 3, 'first-session', time)
}

export function onSessionEvent(state, session, event, now = Date.now()) {
  const time = Number.isFinite(event?.time) ? event.time : now
  const isSubagent = session?.header?.origin === 'subagent' || Boolean(session?.header?.parentSession)
  touchDay(state, time)
  const day = ensureDay(state, localDateKey(time))
  const type = event?.type
  if (type === 'turn/end') {
    if (event.data?.reason?.kind === 'completed') {
      state.activity.turns += 1
      day.turns += 1
      if (!isSubagent) awardWish(state, 1, 'turn', time)
    }
    return
  }
  if (type === 'assistant/message') {
    const usage = event.data?.usage
    if (usage && typeof usage === 'object') {
      const tokens =
        (Number(usage.inputTokens) || 0) +
        (Number(usage.outputTokens) || 0) +
        (Number(usage.cacheReadTokens) || 0) +
        (Number(usage.cacheWriteTokens) || 0)
      state.activity.tokens += tokens
      day.tokens += tokens
    }
    return
  }
  if (type === 'step/start') {
    if (Number.isFinite(time)) stepStarts.set(session.id, time)
    return
  }
  if (type === 'step/end') {
    const start = stepStarts.get(session.id)
    if (!Number.isFinite(start)) return
    stepStarts.delete(session.id)
    const seconds = Math.min(3600, Math.max(0, (time - start) / 1000))
    state.activity.activeSeconds += seconds
    day.activeSeconds += seconds
    if (isSubagent) return
    const earned = Math.floor(state.activity.activeSeconds / ACTIVE_SECONDS_PER_WISH) -
      state.activity.activeWishAwarded
    if (earned > 0) {
      state.activity.activeWishAwarded += earned
      awardWish(state, earned, 'active', time)
    }
    return
  }
  if (type === 'tool/result') {
    state.activity.toolCalls += 1
    return
  }
  if (type === 'user/message') {
    state.activity.userMessages += 1
  }
}

export function onSessionDisposed(state, session, now = Date.now()) {
  const start = stepStarts.get(session?.id)
  if (!Number.isFinite(start)) return
  stepStarts.delete(session.id)
  const seconds = Math.min(3600, Math.max(0, (now - start) / 1000))
  state.activity.activeSeconds += seconds
  ensureDay(state, localDateKey(now)).activeSeconds += seconds
}
