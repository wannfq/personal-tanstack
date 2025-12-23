/**
 * Server-side query functions for PostHog analytics
 * These functions run on the server and fetch data from PostHog API
 */

import { createServerFn } from '@tanstack/react-start'

export interface DashboardMetrics {
  totalPageViews: number
  averageLcp: number
  averageFcp: number
  averageInp: number
  averageCls: number
}

export interface GeoDataPoint {
  city: string
  country: string
  latitude: number
  longitude: number
  count: number
  averageLcp: number
}

export interface PagePerformance {
  path: string
  views: number
  averageLcp: number
  averageFcp: number
  averageInp: number
  averageCls: number
}

export interface TimeSeriesDataPoint {
  timestamp: number
  lcp: number
  fcp: number
  inp: number
  cls: number
}

/**
 * Get overview metrics for a given time range
 */
export const getDashboardMetrics = createServerFn({ method: 'GET' })
  .inputValidator((timeRange: string) => timeRange)
  .handler(({ data: timeRange }) => {
    // Calculate timestamp based on timeRange
    const now = Date.now()
    let after = now - 24 * 60 * 60 * 1000 // Default: 24h

    switch (timeRange) {
      case '1h':
        after = now - 60 * 60 * 1000
        break
      case '24h':
        after = now - 24 * 60 * 60 * 1000
        break
      case '7d':
        after = now - 7 * 24 * 60 * 60 * 1000
        break
      case '30d':
        after = now - 30 * 24 * 60 * 60 * 1000
        break
      default:
        after = now - 24 * 60 * 60 * 1000
    }

    // TODO: Replace with actual PostHog API query
    // For now, return mock data
    return {
      totalPageViews: 1523,
      averageLcp: 1847,
      averageFcp: 1234,
      averageInp: 567,
      averageCls: 0.08,
    }
  })

/**
 * Get geo distribution data
 */
export const getGeoData = createServerFn({ method: 'GET' })
  .inputValidator((timeRange: string) => timeRange)
  .handler(({ data: _timeRange }) => {
    // TODO: Replace with actual PostHog API query
    return [
      {
        city: 'Singapore',
        country: 'SG',
        latitude: 1.3521,
        longitude: 103.8198,
        count: 342,
        averageLcp: 1523,
      },
      {
        city: 'Kuala Lumpur',
        country: 'MY',
        latitude: 3.139,
        longitude: 101.6869,
        count: 156,
        averageLcp: 1847,
      },
      {
        city: 'Jakarta',
        country: 'ID',
        latitude: -6.2088,
        longitude: 106.8456,
        count: 89,
        averageLcp: 2103,
      },
      {
        city: 'Bangkok',
        country: 'TH',
        latitude: 13.7563,
        longitude: 100.5018,
        count: 67,
        averageLcp: 1923,
      },
      {
        city: 'Manila',
        country: 'PH',
        latitude: 14.5995,
        longitude: 120.9842,
        count: 45,
        averageLcp: 2134,
      },
    ]
  })

/**
 * Get page-level performance data
 */
export const getPagePerformance = createServerFn({ method: 'GET' })
  .inputValidator((timeRange: string) => timeRange)
  .handler(({ data: _timeRange }) => {
    // TODO: Replace with actual PostHog API query
    return [
      {
        path: '/',
        views: 892,
        averageLcp: 1456,
        averageFcp: 987,
        averageInp: 432,
        averageCls: 0.05,
      },
      {
        path: '/telemetry',
        views: 234,
        averageLcp: 2134,
        averageFcp: 1456,
        averageInp: 678,
        averageCls: 0.12,
      },
      {
        path: '/blog',
        views: 156,
        averageLcp: 1890,
        averageFcp: 1234,
        averageInp: 512,
        averageCls: 0.08,
      },
      {
        path: '/about',
        views: 98,
        averageLcp: 1654,
        averageFcp: 1089,
        averageInp: 456,
        averageCls: 0.06,
      },
      {
        path: '/contact',
        views: 67,
        averageLcp: 2345,
        averageFcp: 1567,
        averageInp: 789,
        averageCls: 0.15,
      },
    ]
  })

/**
 * Get time series data for latency charts
 */
export const getTimeSeriesData = createServerFn({ method: 'GET' })
  .inputValidator((timeRange: string) => timeRange)
  .handler(({ data: _timeRange }) => {
    // TODO: Replace with actual PostHog API query
    // Generate mock time series data
    const now = Date.now()
    const points: Array<TimeSeriesDataPoint> = []

    // Generate 24 hourly data points
    for (let i = 24; i >= 0; i--) {
      const timestamp = now - i * 60 * 60 * 1000
      points.push({
        timestamp,
        lcp: 1500 + Math.random() * 800,
        fcp: 1000 + Math.random() * 600,
        inp: 400 + Math.random() * 400,
        cls: 0.05 + Math.random() * 0.15,
      })
    }

    return points
  })
