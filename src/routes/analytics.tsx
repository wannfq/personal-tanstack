import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useQuery } from 'convex/react'
import {
  IconChartBar,
  IconDevices,
  IconPin,
  IconUsers,
} from '@tabler/icons-react'

import { api } from '../../convex/_generated/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VisitorMap } from '@/components/visitor-map'
import { getReferrerIcon, getReferrerName } from '@/lib/referrer-parser'

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
  const devices = useQuery(api.visitors.getVisitorDevices)
  const referrals = useQuery(api.visitors.getVisitorReferrals)

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
        </header>

        {/* Stats Cards */}
        <Card className="border-dashed">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">
              Total Visitors
            </CardTitle>
            <IconUsers className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {visitorCount?.toLocaleString() ?? '—'}
            </div>
            <p className="text-xs text-muted-foreground">
              Unique visitors count
            </p>
          </CardContent>
        </Card>

        {/* Visitor Map */}
        <VisitorMap />

        {/* Top Locations Table */}
        {locations && locations.length > 0 && (
          <Card className="border-dashed">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg font-semibold">
                Top Visitor Locations
              </CardTitle>
              <IconPin className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {locations
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 5)
                  .map((location) => (
                    <div
                      key={`${location.city}-${location.country}`}
                      className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
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

        {/* Top Devices Table */}
        {devices && Object.keys(devices).length > 0 && (
          <Card className="border-dashed">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg font-semibold">
                Top Visitor Devices
              </CardTitle>
              <IconDevices className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(devices)
                  .sort((a, b) => b[1] - a[1])
                  .map(([device, count]) => (
                    <div
                      key={device}
                      className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="capitalize font-medium">{device}</p>
                          <p className="text-xs text-muted-foreground">
                            Device Type
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{count}</p>
                        <p className="text-xs text-muted-foreground">
                          {count === 1 ? 'visitor' : 'visitors'}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Top Traffic Sources Table */}
        {referrals && referrals.length > 0 && (
          <Card className="border-dashed">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg font-semibold">
                Top Traffic Sources
              </CardTitle>
              <IconUsers className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {referrals.slice(0, 10).map(({ referrer, count }) => {
                  const Icon = getReferrerIcon(referrer)
                  const name = getReferrerName(referrer)

                  return (
                    <div
                      key={referrer ?? 'direct'}
                      className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/30 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="size-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{name}</p>
                          <p className="text-xs text-muted-foreground">
                            Traffic Source
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{count}</p>
                        <p className="text-xs text-muted-foreground">
                          {count === 1 ? 'visitor' : 'visitors'}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
