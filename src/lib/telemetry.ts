/**
 * Web Vitals and telemetry capture using the web-vitals library
 */

import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals'
import { posthog } from './posthog'
import { getSessionInfo } from './session'
import type { Metric } from 'web-vitals'

// Types
interface TelemetryData {
  path: string
  referrer: string
  url: string
  session_id: string
  visitor_id: string
  viewport: { width: number; height: number }
  device_type: string
}

let currentTelemetryData: TelemetryData | null = null

export function setCurrentTelemetryData(data: TelemetryData) {
  currentTelemetryData = data
}

/**
 * Capture Web Vitals and send to PostHog
 */
function captureMetric(metric: Metric) {
  if (!posthog) {
    return
  }

  const telemetry = currentTelemetryData || {
    path: window.location.pathname,
    referrer: document.referrer,
    url: window.location.href,
    session_id: getSessionInfo().session_id,
    visitor_id: getSessionInfo().visitor_id,
    viewport: { width: window.innerWidth, height: window.innerHeight },
    device_type: getDeviceType(),
  }

  const eventName = 'web_vital'

  posthog.capture(eventName, {
    ...telemetry,
    metric_name: metric.name,
    metric_value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    timestamp: Date.now(),
  })
}

/**
 * Initialize Web Vitals tracking
 */
export function initWebVitals() {
  if (typeof window === 'undefined') {
    return
  }

  const reportHandler = (metric: Metric) => {
    captureMetric(metric)
  }

  // Capture all Web Vitals
  onCLS(reportHandler)
  onFCP(reportHandler)
  onINP(reportHandler)
  onLCP(reportHandler)
  onTTFB(reportHandler)
}

/**
 * Track a page view with Web Vitals context
 */
export function trackPageView(path: string) {
  if (!posthog) {
    return
  }

  const telemetry: TelemetryData = {
    path,
    referrer: document.referrer,
    url: window.location.href,
    session_id: getSessionInfo().session_id,
    visitor_id: getSessionInfo().visitor_id,
    viewport: { width: window.innerWidth, height: window.innerHeight },
    device_type: getDeviceType(),
  }

  setCurrentTelemetryData(telemetry)

  posthog.capture('page_view', telemetry)
}

/**
 * Get device type based on viewport
 */
function getDeviceType(): string {
  if (typeof window === 'undefined') {
    return 'unknown'
  }

  const width = window.innerWidth
  if (width < 640) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

/**
 * Track API latency manually
 */
export function trackApiLatency(endpoint: string, durationMs: number) {
  if (!posthog) {
    return
  }

  posthog.capture('api_call', {
    endpoint,
    duration_ms: durationMs,
    path: window.location.pathname,
    session_id: getSessionInfo().session_id,
    visitor_id: getSessionInfo().visitor_id,
  })
}

/**
 * Track custom performance event
 */
export function trackCustomEvent(
  eventName: string,
  properties: Record<string, unknown>,
) {
  if (!posthog) {
    return
  }

  posthog.capture(eventName, {
    ...properties,
    path: window.location.pathname,
    session_id: getSessionInfo().session_id,
    visitor_id: getSessionInfo().visitor_id,
  })
}
