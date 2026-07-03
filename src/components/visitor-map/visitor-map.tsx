import { useMemo, useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps'
import { useQuery } from 'convex/react'
import { IconMap } from '@tabler/icons-react'
import { api } from '../../../convex/_generated/api'
import { ClientOnly } from '@/components/client-only'
import { useThemeColor } from '@/lib/use-theme-color'
import { GEO_URL, toAlpha2, getCountryName } from '@/lib/country-codes'
import { MapTooltip, type TooltipData } from './visitor-map-tooltip'
import { MapLegend } from './visitor-map-legend'

const visitorMapFallback = (
  <div>
    <h3 className="mb-4 text-lg font-semibold">Visitor Locations</h3>
    <div className="flex h-[400px] items-center justify-center">
      <p className="text-sm text-muted-foreground">Loading map...</p>
    </div>
  </div>
)

export function VisitorMap() {
  return (
    <ClientOnly fallback={visitorMapFallback}>
      <VisitorMapClient />
    </ClientOnly>
  )
}

function VisitorMapClient() {
  const locations = useQuery(api.visitors.getVisitorLocations)
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)
  const { colorRGB, isDarkMode } = useThemeColor()

  // Aggregate visitors by country
  const countryData = useMemo(() => {
    if (!locations)
      return new Map<string, { count: number; cities: Array<string> }>()

    const countryMap = new Map<
      string,
      { count: number; cities: Array<string> }
    >()

    for (const loc of locations) {
      const existing = countryMap.get(loc.country)
      if (existing) {
        existing.count += loc.count
        if (!existing.cities.includes(loc.city)) {
          existing.cities.push(loc.city)
        }
      } else {
        countryMap.set(loc.country, { count: loc.count, cities: [loc.city] })
      }
    }

    return countryMap
  }, [locations])

  // Get max count for color scaling
  const maxCount = useMemo(() => {
    let max = 1
    countryData.forEach((data) => {
      if (data.count > max) max = data.count
    })
    return max
  }, [countryData])

  // Generate color with opacity from primary color
  const getColorWithOpacity = (opacity: number): string => {
    return `rgba(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}, ${opacity})`
  }

  // Theme-aware colors
  const noDataColor = isDarkMode ? '#000000' : '#e5e5e5'
  const noDataHoverColor = isDarkMode ? '#1a1a1a' : '#d4d4d4'
  const strokeColor = isDarkMode ? '#111111' : '#a3a3a3'

  // Get fill color based on visitor count
  const getFillColor = (countryCode: string | undefined | null): string => {
    const alpha2 = toAlpha2(countryCode)
    const data = alpha2 ? countryData.get(alpha2) : null

    if (!data) {
      return noDataColor
    }

    // Color intensity based on count (0.5 to 1.0 range)
    const intensity = 0.5 + (data.count / maxCount) * 0.5
    return getColorWithOpacity(intensity)
  }

  // Check if country has visitors
  const hasVisitors = (countryCode: string | undefined | null): boolean => {
    const alpha2 = toAlpha2(countryCode)
    return alpha2 ? countryData.has(alpha2) : false
  }

  // Get country data for tooltip
  const getCountryInfo = (countryCode: string | undefined | null) => {
    const alpha2 = toAlpha2(countryCode)
    if (!alpha2) return null

    const data = countryData.get(alpha2)
    if (!data) return null

    return {
      countryCode: alpha2,
      country: getCountryName(alpha2),
      count: data.count,
      cities: data.cities,
    }
  }

  if (locations === undefined) {
    return (
      <div>
        <div className="flex h-[400px] items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    )
  }

  if (locations.length === 0) {
    return (
      <div>
        <h3 className="mb-4 text-lg font-semibold">Visitor Locations</h3>
        <div className="flex h-[400px] items-center justify-center">
          <p className="text-sm text-muted-foreground">
            No visitor location data available yet
          </p>
        </div>
      </div>
    )
  }

  const uniqueCountries = countryData.size
  const totalVisitors = locations.reduce((acc, l) => acc + l.count, 0)

  return (
    <div className="relative">
      <div className="flex flex-row items-center justify-between">
        <h3 className="mb-4 text-lg font-semibold">Visitor Locations</h3>
        <IconMap className="size-4 text-muted-foreground" />
      </div>
      <p className="max-w-2xl text-muted-foreground">
        Real-time visitor tracking and geographic distribution of site visitors.
      </p>

      <div className="relative h-[400px] w-full overflow-hidden bg-background/50">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 120,
            center: [0, 20],
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  // Try multiple country code formats
                  const countryCode =
                    geo.properties?.ISO_A3 ||
                    geo.properties?.ISO_A2 ||
                    geo.properties?.['Alpha-3'] ||
                    geo.id
                  const countryHasVisitors = hasVisitors(countryCode)

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getFillColor(countryCode)}
                      stroke={strokeColor}
                      strokeWidth={0.3}
                      style={{
                        default: {
                          outline: 'none',
                          transition: 'fill 0.2s ease',
                        },
                        hover: {
                          outline: 'none',
                          fill: countryHasVisitors
                            ? getColorWithOpacity(1)
                            : noDataHoverColor,
                          cursor: countryHasVisitors ? 'pointer' : 'default',
                        },
                        pressed: { outline: 'none' },
                      }}
                      onMouseEnter={(e) => {
                        const info = getCountryInfo(countryCode)
                        if (info) {
                          const rect = (
                            e.target as SVGElement
                          ).getBoundingClientRect()
                          setTooltip({
                            ...info,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          })
                        }
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  )
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Tooltip */}
      {tooltip && <MapTooltip data={tooltip} />}

      {/* Legend */}
      <MapLegend
        uniqueCountries={uniqueCountries}
        totalVisitors={totalVisitors}
        colorRGB={colorRGB}
      />
    </div>
  )
}
