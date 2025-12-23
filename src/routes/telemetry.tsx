import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { OverviewCards } from '@/components/telemetry/overview-cards'
import { LatencyChart } from '@/components/telemetry/latency-chart'
import { GeoMap } from '@/components/telemetry/geo-map'
import { PagePerformance } from '@/components/telemetry/page-table'
import { getDashboardMetrics, getGeoData, getPagePerformance, getTimeSeriesData } from '@/lib/posthog-queries'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/telemetry')({
  component: TelemetryDashboard,
})

function TelemetryDashboard() {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h')
  const [loading, setLoading] = useState(true)
  const [overviewMetrics, setOverviewMetrics] = useState({
    totalPageViews: 0,
    averageLcp: 0,
    averageFcp: 0,
    averageInp: 0,
    averageCls: 0,
  })
  const [timeSeriesData, setTimeSeriesData] = useState<Array<{
    timestamp: number
    lcp: number
    fcp: number
    inp: number
    cls: number
  }>>([])
  const [geoData, setGeoData] = useState<Array<{
    city: string
    country: string
    latitude: number
    longitude: number
    count: number
    averageLcp: number
  }>>([])
  const [pageData, setPageData] = useState<Array<{
    path: string
    views: number
    averageLcp: number
    averageFcp: number
    averageInp: number
    averageCls: number
  }>>([])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [overview, timeSeries, geo, pages] = await Promise.all([
        getDashboardMetrics({ data: timeRange }),
        getTimeSeriesData({ data: timeRange }),
        getGeoData({ data: timeRange }),
        getPagePerformance({ data: timeRange }),
      ])

      setOverviewMetrics(overview)
      setTimeSeriesData(timeSeries)
      setGeoData(geo)
      setPageData(pages)
    } catch (error) {
      console.error('Failed to fetch telemetry data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchData()
  }, [timeRange])

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData()
    }, 5 * 60 * 1000) // 5 minutes

    return () => clearInterval(interval)
  }, [timeRange])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading telemetry data...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Telemetry Dashboard</h1>
          <p className="text-muted-foreground">Real-time performance monitoring</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={timeRange === '24h' ? 'default' : 'outline'}
            onClick={() => setTimeRange('24h')}
          >
            24h
          </Button>
          <Button
            variant={timeRange === '7d' ? 'default' : 'outline'}
            onClick={() => setTimeRange('7d')}
          >
            7d
          </Button>
          <Button
            variant={timeRange === '30d' ? 'default' : 'outline'}
            onClick={() => setTimeRange('30d')}
          >
            30d
          </Button>
        </div>
      </div>

      <div className="mb-8 grid gap-6">
        <OverviewCards metrics={overviewMetrics} timeRange={timeRange} />
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Latency Trends</h2>
          <LatencyChart data={timeSeriesData} timeRange={timeRange} />
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Geographic Distribution</h2>
          <GeoMap data={geoData} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-semibold">Page Performance</h2>
        <PagePerformance data={pageData} />
      </div>
    </div>
  )
}
