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
import { VisitorMap } from '@/components/visitor-map'
import { Container, PageHeading } from '@/components/layout'
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
      <Container as="main" className="flex flex-col gap-12 py-12">
        {/* Header */}
        <header>
          <PageHeading as="h1">Visitor Analytics</PageHeading>
        </header>

        {/* Stats */}
        <section>
          <div className="flex items-center gap-2">
            <IconUsers className="size-4 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Total Visitors</h2>
          </div>
          <p className="mt-2 text-3xl font-bold">
            {visitorCount?.toLocaleString() ?? '\u2014'}
          </p>
          <p className="text-xs text-muted-foreground">Unique visitors count</p>
        </section>

        {/* Visitor Map */}
        <VisitorMap />

        {/* Top Locations */}
        {locations && locations.length > 0 && (
          <section>
            <div className="flex items-center gap-2">
              <IconPin className="size-4 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Top Visitor Locations</h2>
            </div>
            <div className="mt-4 space-y-3">
              {locations
                .sort((a, b) => b.count - a.count)
                .slice(0, 5)
                .map((location) => (
                  <div
                    key={`${location.city}-${location.country}`}
                    className="flex items-center justify-between border-b border-border pb-3"
                  >
                    <div>
                      <p className="font-medium">{location.city}</p>
                      <p className="text-xs text-muted-foreground">
                        {location.country}
                      </p>
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
          </section>
        )}

        {/* Top Devices */}
        {devices && Object.keys(devices).length > 0 && (
          <section>
            <div className="flex items-center gap-2">
              <IconDevices className="size-4 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Top Visitor Devices</h2>
            </div>
            <div className="mt-4 space-y-3">
              {Object.entries(devices)
                .sort((a, b) => b[1] - a[1])
                .map(([device, count]) => (
                  <div
                    key={device}
                    className="flex items-center justify-between border-b border-border pb-3"
                  >
                    <div>
                      <p className="capitalize font-medium">{device}</p>
                      <p className="text-xs text-muted-foreground">
                        Device Type
                      </p>
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
          </section>
        )}

        {/* Top Traffic Sources */}
        {referrals && referrals.length > 0 && (
          <section>
            <div className="flex items-center gap-2">
              <IconChartBar className="size-4 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Top Traffic Sources</h2>
            </div>
            <div className="mt-4 space-y-3">
              {referrals.slice(0, 10).map(({ referrer, count }) => {
                const Icon = getReferrerIcon(referrer)
                const name = getReferrerName(referrer)

                return (
                  <div
                    key={referrer ?? 'direct'}
                    className="flex items-center justify-between border-b border-border pb-3"
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
          </section>
        )}
      </Container>
    </div>
  )
}
