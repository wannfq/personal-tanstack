import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from 'convex/react'
import {
  IconChartBar,
  IconDevices,
  IconPin,
  IconUsers,
} from '@tabler/icons-react'

import { api } from '../../convex/_generated/api'
import { VisitorMap } from '@/components/visitor-map'
import { ClientOnly } from '@/components/client-only'
import { Container, PageHeading } from '@/components/layout'
import { AnalyticsSection, AnalyticsRow } from '@/components/analytics'
import { getReferrerIcon, getReferrerName } from '@/lib/referrer-parser'

export const Route = createFileRoute('/analytics')({
  component: AnalyticsPage,
})

function AnalyticsPage() {
  return (
    <ClientOnly
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      }
    >
      <AnalyticsContent />
    </ClientOnly>
  )
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
        <AnalyticsSection icon={IconUsers} title="Total Visitors">
          <p className="mt-2 text-3xl font-bold">
            {visitorCount?.toLocaleString() ?? '\u2014'}
          </p>
          <p className="text-xs text-muted-foreground">Unique visitors count</p>
        </AnalyticsSection>

        {/* Visitor Map */}
        <VisitorMap />

        {/* Top Locations */}
        {locations && locations.length > 0 && (
          <AnalyticsSection icon={IconPin} title="Top Visitor Locations">
            <div className="mt-4 space-y-3">
              {locations
                .sort((a, b) => b.count - a.count)
                .slice(0, 5)
                .map((location) => (
                  <AnalyticsRow key={`${location.city}-${location.country}`} count={location.count}>
                    <div>
                      <p className="font-medium">{location.city}</p>
                      <p className="text-xs text-muted-foreground">
                        {location.country}
                      </p>
                    </div>
                  </AnalyticsRow>
                ))}
            </div>
          </AnalyticsSection>
        )}

        {/* Top Devices */}
        {devices && Object.keys(devices).length > 0 && (
          <AnalyticsSection icon={IconDevices} title="Top Visitor Devices">
            <div className="mt-4 space-y-3">
              {Object.entries(devices)
                .sort((a, b) => b[1] - a[1])
                .map(([device, count]) => (
                  <AnalyticsRow key={device} count={count}>
                    <div>
                      <p className="capitalize font-medium">{device}</p>
                      <p className="text-xs text-muted-foreground">
                        Device Type
                      </p>
                    </div>
                  </AnalyticsRow>
                ))}
            </div>
          </AnalyticsSection>
        )}

        {/* Top Traffic Sources */}
        {referrals && referrals.length > 0 && (
          <AnalyticsSection icon={IconChartBar} title="Top Traffic Sources">
            <div className="mt-4 space-y-3">
              {referrals.slice(0, 10).map(({ referrer, count }) => {
                const Icon = getReferrerIcon(referrer)
                const name = getReferrerName(referrer)

                return (
                  <AnalyticsRow key={referrer ?? 'direct'} count={count}>
                    <div className="flex items-center gap-3">
                      <Icon className="size-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{name}</p>
                        <p className="text-xs text-muted-foreground">
                          Traffic Source
                        </p>
                      </div>
                    </div>
                  </AnalyticsRow>
                )
              })}
            </div>
          </AnalyticsSection>
        )}
      </Container>
    </div>
  )
}
