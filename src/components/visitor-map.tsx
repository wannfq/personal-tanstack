import { useEffect, useMemo, useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps'
import { useQuery } from 'convex/react'
import { IconMap } from '@tabler/icons-react'
import { api } from '../../convex/_generated/api'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// ISO Alpha-2 to Alpha-3 country code mapping (common countries)
const COUNTRY_CODE_MAP: Record<string, string> = {
  AF: 'AFG',
  AL: 'ALB',
  DZ: 'DZA',
  AD: 'AND',
  AO: 'AGO',
  AR: 'ARG',
  AM: 'ARM',
  AU: 'AUS',
  AT: 'AUT',
  AZ: 'AZE',
  BS: 'BHS',
  BH: 'BHR',
  BD: 'BGD',
  BY: 'BLR',
  BE: 'BEL',
  BZ: 'BLZ',
  BJ: 'BEN',
  BT: 'BTN',
  BO: 'BOL',
  BA: 'BIH',
  BW: 'BWA',
  BR: 'BRA',
  BN: 'BRN',
  BG: 'BGR',
  BF: 'BFA',
  BI: 'BDI',
  KH: 'KHM',
  CM: 'CMR',
  CA: 'CAN',
  CF: 'CAF',
  TD: 'TCD',
  CL: 'CHL',
  CN: 'CHN',
  CO: 'COL',
  CG: 'COG',
  CD: 'COD',
  CR: 'CRI',
  HR: 'HRV',
  CU: 'CUB',
  CY: 'CYP',
  CZ: 'CZE',
  DK: 'DNK',
  DJ: 'DJI',
  DO: 'DOM',
  EC: 'ECU',
  EG: 'EGY',
  SV: 'SLV',
  GQ: 'GNQ',
  ER: 'ERI',
  EE: 'EST',
  ET: 'ETH',
  FI: 'FIN',
  FR: 'FRA',
  GA: 'GAB',
  GM: 'GMB',
  GE: 'GEO',
  DE: 'DEU',
  GH: 'GHA',
  GR: 'GRC',
  GT: 'GTM',
  GN: 'GIN',
  GW: 'GNB',
  GY: 'GUY',
  HT: 'HTI',
  HN: 'HND',
  HU: 'HUN',
  IS: 'ISL',
  IN: 'IND',
  ID: 'IDN',
  IR: 'IRN',
  IQ: 'IRQ',
  IE: 'IRL',
  IL: 'ISR',
  IT: 'ITA',
  CI: 'CIV',
  JM: 'JAM',
  JP: 'JPN',
  JO: 'JOR',
  KZ: 'KAZ',
  KE: 'KEN',
  KP: 'PRK',
  KR: 'KOR',
  KW: 'KWT',
  KG: 'KGZ',
  LA: 'LAO',
  LV: 'LVA',
  LB: 'LBN',
  LS: 'LSO',
  LR: 'LBR',
  LY: 'LBY',
  LT: 'LTU',
  LU: 'LUX',
  MK: 'MKD',
  MG: 'MDG',
  MW: 'MWI',
  MY: 'MYS',
  ML: 'MLI',
  MR: 'MRT',
  MX: 'MEX',
  MD: 'MDA',
  MN: 'MNG',
  ME: 'MNE',
  MA: 'MAR',
  MZ: 'MOZ',
  MM: 'MMR',
  NA: 'NAM',
  NP: 'NPL',
  NL: 'NLD',
  NZ: 'NZL',
  NI: 'NIC',
  NE: 'NER',
  NG: 'NGA',
  NO: 'NOR',
  OM: 'OMN',
  PK: 'PAK',
  PA: 'PAN',
  PG: 'PNG',
  PY: 'PRY',
  PE: 'PER',
  PH: 'PHL',
  PL: 'POL',
  PT: 'PRT',
  QA: 'QAT',
  RO: 'ROU',
  RU: 'RUS',
  RW: 'RWA',
  SA: 'SAU',
  SN: 'SEN',
  RS: 'SRB',
  SL: 'SLE',
  SG: 'SGP',
  SK: 'SVK',
  SI: 'SVN',
  SO: 'SOM',
  ZA: 'ZAF',
  SS: 'SSD',
  ES: 'ESP',
  LK: 'LKA',
  SD: 'SDN',
  SR: 'SUR',
  SZ: 'SWZ',
  SE: 'SWE',
  CH: 'CHE',
  SY: 'SYR',
  TW: 'TWN',
  TJ: 'TJK',
  TZ: 'TZA',
  TH: 'THA',
  TL: 'TLS',
  TG: 'TGO',
  TN: 'TUN',
  TR: 'TUR',
  TM: 'TKM',
  UG: 'UGA',
  UA: 'UKR',
  AE: 'ARE',
  GB: 'GBR',
  US: 'USA',
  UY: 'URY',
  UZ: 'UZB',
  VE: 'VEN',
  VN: 'VNM',
  YE: 'YEM',
  ZM: 'ZMB',
  ZW: 'ZWE',
  HK: 'HKG',
  MO: 'MAC',
}

// Country names mapping for tooltip display
const COUNTRY_NAMES: Record<string, string> = {
  MY: 'Malaysia',
  SG: 'Singapore',
  US: 'United States',
  GB: 'United Kingdom',
  IN: 'India',
  CN: 'China',
  JP: 'Japan',
  KR: 'South Korea',
  AU: 'Australia',
  DE: 'Germany',
  FR: 'France',
  IT: 'Italy',
  ES: 'Spain',
  NL: 'Netherlands',
  CA: 'Canada',
  BR: 'Brazil',
  MX: 'Mexico',
  ID: 'Indonesia',
  TH: 'Thailand',
  VN: 'Vietnam',
  PH: 'Philippines',
  PK: 'Pakistan',
  BD: 'Bangladesh',
  RU: 'Russia',
  UA: 'Ukraine',
  PL: 'Poland',
  TR: 'Turkey',
  SA: 'Saudi Arabia',
  AE: 'UAE',
  EG: 'Egypt',
  ZA: 'South Africa',
  NG: 'Nigeria',
  KE: 'Kenya',
  AR: 'Argentina',
  CL: 'Chile',
  CO: 'Colombia',
  PE: 'Peru',
  HK: 'Hong Kong',
}

interface TooltipData {
  country: string
  countryCode: string
  count: number
  cities: Array<string>
  x: number
  y: number
}

export function VisitorMap() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div>
        <h3 className="mb-4 text-lg font-semibold">Visitor Locations</h3>
        <div className="flex h-[400px] items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    )
  }

  return <VisitorMapClient />
}

// Numeric ISO code to Alpha-2 mapping
const NUMERIC_TO_ALPHA2: Record<string, string> = {
  '458': 'MY',
  '702': 'SG',
  '840': 'US',
  '826': 'GB',
  '356': 'IN',
  '156': 'CN',
  '392': 'JP',
  '410': 'KR',
  '036': 'AU',
  '276': 'DE',
  '250': 'FR',
  '380': 'IT',
  '724': 'ES',
  '528': 'NL',
  '124': 'CA',
  '076': 'BR',
  '484': 'MX',
  '360': 'ID',
  '764': 'TH',
  '704': 'VN',
  '608': 'PH',
  '586': 'PK',
  '050': 'BD',
  '643': 'RU',
  '804': 'UA',
  '616': 'PL',
  '792': 'TR',
  '682': 'SA',
  '784': 'AE',
  '818': 'EG',
  '710': 'ZA',
  '566': 'NG',
  '404': 'KE',
  '032': 'AR',
  '152': 'CL',
  '170': 'CO',
  '604': 'PE',
  '344': 'HK',
  '446': 'MO',
}

function VisitorMapClient() {
  const locations = useQuery(api.visitors.getVisitorLocations)
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)
  const [colorRGB, setColorRGB] = useState({ r: 20, g: 184, b: 166 }) // Default teal
  const [isDarkMode, setIsDarkMode] = useState(true)

  // Detect theme and read computed primary color
  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setIsDarkMode(isDark)

      // Create a canvas to convert any color format to RGB
      const canvas = document.createElement('canvas')
      canvas.width = 1
      canvas.height = 1
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Create temp element to get the computed color
      const temp = document.createElement('div')
      temp.style.color = 'hsl(var(--primary))'
      document.body.appendChild(temp)
      const computed = getComputedStyle(temp).color
      document.body.removeChild(temp)

      // Draw the color to canvas and read it back as RGB
      ctx.fillStyle = computed
      ctx.fillRect(0, 0, 1, 1)
      const imageData = ctx.getImageData(0, 0, 1, 1).data

      if (imageData[0] !== 0 || imageData[1] !== 0 || imageData[2] !== 0) {
        setColorRGB({ r: imageData[0], g: imageData[1], b: imageData[2] })
      }
    }

    updateTheme()

    // Watch for theme changes
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

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

  // Convert country code to Alpha-2
  const toAlpha2 = (code: string | undefined | null): string | null => {
    if (!code) return null
    // Already Alpha-2
    if (code.length === 2 && COUNTRY_CODE_MAP[code]) return code
    // Alpha-3 to Alpha-2
    const fromAlpha3 = Object.entries(COUNTRY_CODE_MAP).find(
      ([, alpha3]) => alpha3 === code,
    )?.[0]
    if (fromAlpha3) return fromAlpha3
    // Numeric to Alpha-2
    return NUMERIC_TO_ALPHA2[code] || null
  }

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
      country: COUNTRY_NAMES[alpha2] || alpha2,
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
      {tooltip && (
        <div
          className="pointer-events-none fixed z-50 rounded-md border border-border bg-popover px-3 py-2 text-sm shadow-md"
          style={{
            left: tooltip.x,
            top: tooltip.y - 10,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <p className="font-medium text-popover-foreground">
            {tooltip.country}
          </p>
          <p className="text-xs text-muted-foreground">
            {tooltip.count} {tooltip.count === 1 ? 'visitor' : 'visitors'}
          </p>
          {tooltip.cities.length > 0 && (
            <p className="mt-1 text-xs text-muted-foreground">
              Cities: {tooltip.cities.slice(0, 3).join(', ')}
              {tooltip.cities.length > 3 &&
                ` +${tooltip.cities.length - 3} more`}
            </p>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>
            <span className="font-medium text-foreground">
              {uniqueCountries}
            </span>{' '}
            {uniqueCountries === 1 ? 'country' : 'countries'}
          </span>
          <span>
            <span className="font-medium text-foreground">{totalVisitors}</span>{' '}
            total visitors
          </span>
        </div>

        {/* Color scale legend */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex h-3 overflow-hidden rounded">
            <div
              className="w-4"
              style={{ backgroundColor: getColorWithOpacity(0.5) }}
            />
            <div
              className="w-4"
              style={{ backgroundColor: getColorWithOpacity(0.65) }}
            />
            <div
              className="w-4"
              style={{ backgroundColor: getColorWithOpacity(0.8) }}
            />
            <div
              className="w-4"
              style={{ backgroundColor: getColorWithOpacity(1) }}
            />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  )
}
