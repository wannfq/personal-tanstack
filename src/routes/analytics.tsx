import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useQuery } from 'convex/react'
import { IconChartBar, IconFlag, IconUsers } from '@tabler/icons-react'

import { api } from '../../convex/_generated/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VisitorMap } from '@/components/visitor-map'

export const Route = createFileRoute('/analytics')({
  component: AnalyticsPage,
})

function AnalyticsPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading analytics...</p>
      </div>
    )
  }

  return <AnalyticsContent />
}

function AnalyticsContent() {
  const visitorCount = useQuery(api.visitors.getVisitorCount)
  const locations = useQuery(api.visitors.getVisitorLocations)

  const topCountries = locations
    ? [...new Set(locations.map((l) => l.country))].length
    : 0

  return (
    <div className="bg-background text-foreground">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 sm:px-10 lg:px-12">
        {/* Header */}
        <header className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
            <IconChartBar className="size-4" aria-hidden="true" />
            Analytics
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Visitor Analytics
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Real-time visitor tracking and geographic distribution of site
            visitors.
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-dashed">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Visitors
              </CardTitle>
              <IconUsers className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {visitorCount?.toLocaleString() ?? '—'}
              </div>
              <p className="text-xs text-muted-foreground">
                Unique visitors tracked
              </p>
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Countries
              </CardTitle>
              <IconFlag className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{topCountries}</div>
              <p className="text-xs text-muted-foreground">
                Countries represented
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Visitor Map */}
        <VisitorMap />

        {/* Top Locations Table */}
        {locations && locations.length > 0 && (
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Top Visitor Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {locations
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 10)
                  .map((location, index) => (
                    <div
                      key={`${location.city}-${location.country}`}
                      className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium">{location.city}</p>
                          <p className="text-xs text-muted-foreground">
                            {location.country}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{location.count}</p>
                        <p className="text-xs text-muted-foreground">
                          {location.count === 1 ? 'visitor' : 'visitors'}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

