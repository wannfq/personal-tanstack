/**
 * Server-side fetch for GitHub contribution data.
 * Two-tier fallback (jogruber → GitHub direct) with 24h in-memory cache.
 */

import { createServerFn } from '@tanstack/react-start'
import type { Activity, ContributionLevel } from '@/components/contribution-graph'

const GITHUB_USERNAME = 'wannfq'
const USER_AGENT = 'personal-tanstack-portfolio'
const CACHE_TTL_MS = 24 * 60 * 60 * 1000

type CacheEntry = {
  data: Activity[]
  expiresAt: number
}

let cache: CacheEntry | null = null

function isValidLevel(level: number): level is ContributionLevel {
  return Number.isInteger(level) && level >= 0 && level <= 4
}

function normalizeActivity(input: unknown): Activity | null {
  if (!input || typeof input !== 'object') return null
  const candidate = input as Record<string, unknown>
  const date = typeof candidate.date === 'string' ? candidate.date : null
  const count =
    typeof candidate.count === 'number' ? candidate.count : Number.NaN
  const rawLevel =
    typeof candidate.level === 'number' ? candidate.level : Number.NaN
  if (
    !date ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !Number.isFinite(count) ||
    !isValidLevel(rawLevel)
  ) {
    return null
  }
  return { date, count, level: rawLevel }
}

// Primary source — jogruber's cached GraphQL mirror. No token required,
// returns a clean JSON shape that maps 1:1 to Activity.
async function fetchFromJogruber(): Promise<Activity[]> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
    { signal: AbortSignal.timeout(7000) },
  )
  if (!res.ok) {
    throw new Error(`jogruber responded ${res.status}`)
  }
  const data = (await res.json()) as { contributions?: unknown }
  if (!data || !Array.isArray(data.contributions)) {
    throw new Error('jogruber returned unexpected shape')
  }
  const activities: Activity[] = []
  for (const entry of data.contributions) {
    const normalized = normalizeActivity(entry)
    if (normalized) activities.push(normalized)
  }
  if (activities.length === 0) {
    throw new Error('jogruber returned no valid activities')
  }
  return activities
}

// Fallback — scrape GitHub's own public contribution fragment. GitHub
// returns this HTML for every public profile; no auth needed.
async function fetchFromGitHubDirect(): Promise<Activity[]> {
  const res = await fetch(
    `https://github.com/users/${GITHUB_USERNAME}/contributions`,
    {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': USER_AGENT,
      },
      signal: AbortSignal.timeout(10000),
    },
  )
  if (!res.ok) {
    throw new Error(`github direct responded ${res.status}`)
  }
  const html = await res.text()
  const elementRegex = /<(?:td|rect)\s+([^>]*?)\/?>/g
  const activities: Activity[] = []
  for (const match of html.matchAll(elementRegex)) {
    const attrs = match[1] ?? ''
    if (!attrs.includes('data-date')) continue
    const date = attrs.match(/data-date="(\d{4}-\d{2}-\d{2})"/)?.[1]
    const countStr = attrs.match(/data-count="(\d+)"/)?.[1]
    const levelStr = attrs.match(/data-level="(\d+)"/)?.[1]
    if (!date || countStr === undefined) continue
    const count = Number.parseInt(countStr, 10)
    const level = levelStr ? Number.parseInt(levelStr, 10) : 0
    if (!Number.isFinite(count) || !isValidLevel(level)) continue
    activities.push({ date, count, level })
  }
  if (activities.length === 0) {
    throw new Error('github direct returned no valid activities')
  }
  return activities
}

const FETCHERS: ReadonlyArray<() => Promise<Activity[]>> = [
  fetchFromJogruber,
  fetchFromGitHubDirect,
]

/**
 * Returns ~365 days of GitHub contribution activity for the configured user.
 * Cached for 24h on the server. Returns an empty array if every source fails
 * (callers should render an "unable to load" state in that case).
 */
export const getGitHubContributions = createServerFn({ method: 'GET' }).handler(
  async (): Promise<Activity[]> => {
    const now = Date.now()
    if (cache && cache.expiresAt > now) {
      return cache.data
    }

    let lastError: unknown = null
    for (const fetcher of FETCHERS) {
      try {
        const data = await fetcher()
        cache = { data, expiresAt: now + CACHE_TTL_MS }
        return data
      } catch (error) {
        lastError = error
      }
    }

    console.error('[github-contributions] all sources failed', lastError)
    return []
  },
)
