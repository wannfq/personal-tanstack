/**
 * Performance thresholds and helpers for rating metrics
 */

export interface PerformanceThresholds {
  good: number
  needsImprovement: number
}

export type PerformanceRating = 'good' | 'needs-improvement' | 'poor'

export const performanceThresholds: Record<string, PerformanceThresholds> = {
  // Latency metrics (lower is better)
  lcp: { good: 1000, needsImprovement: 5000 },
  fcp: { good: 1000, needsImprovement: 5000 },
  ttfb: { good: 800, needsImprovement: 1800 },
  inp: { good: 1000, needsImprovement: 5000 },

  // CLS is a ratio (lower is better)
  cls: { good: 0.1, needsImprovement: 0.25 },
}

export function getPerformanceRating(
  metricName: string,
  value: number,
): PerformanceRating {
  const thresholds = performanceThresholds[metricName]
  if (value < thresholds.good) {
    return 'good'
  }

  if (value <= thresholds.needsImprovement) {
    return 'needs-improvement'
  }

  return 'poor'
}

export function getPerformanceBadgeColor(rating: PerformanceRating): string {
  switch (rating) {
    case 'good':
      return 'bg-green-500'
    case 'needs-improvement':
      return 'bg-yellow-500'
    case 'poor':
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
}

export function getPerformanceTextColor(rating: PerformanceRating): string {
  switch (rating) {
    case 'good':
      return 'text-green-500'
    case 'needs-improvement':
      return 'text-yellow-500'
    case 'poor':
      return 'text-red-500'
    default:
      return 'text-white'
  }
}

export function getPerformanceBadgeText(rating: PerformanceRating): string {
  switch (rating) {
    case 'good':
      return 'Good'
    case 'needs-improvement':
      return 'Needs Improvement'
    case 'poor':
      return 'Poor'
    default:
      return 'Unknown'
  }
}
