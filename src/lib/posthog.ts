import posthogLib from 'posthog-js'
import type { PostHog } from 'posthog-js'

export function initPosthog(): PostHog | null {
  if (typeof window === 'undefined') {
    return null
  }

  const key = import.meta.env.POSTHOG_KEY
  if (!key || key === '') {
    console.warn('PostHog key not configured')
    return null
  }

  posthogLib.init(key, {
    api_host: import.meta.env.POSTHOG_HOST,
    capture_pageview: false, // We'll handle page views manually
    capture_pageleave: true,
    loaded: (ph: PostHog) => {
      ph.identify()
    },
  })

  return posthogLib
}

export const posthog = initPosthog()
