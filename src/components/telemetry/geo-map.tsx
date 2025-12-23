import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getPerformanceBadgeColor, getPerformanceBadgeText, getPerformanceRating } from '@/lib/performance'

interface GeoMapProps {
  data: Array<{
    city: string
    country: string
    latitude: number
    longitude: number
    count: number
    averageLcp: number
  }>
}

export function GeoMap({ data }: GeoMapProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  // Simple world map viewBox
  const viewBox = "0 0 1000 500"
  const mapWidth = 1000
  const mapHeight = 500

  // Convert lat/long to x/y coordinates
  const projectCoordinates = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * mapWidth
    const y = ((-lat + 90) / 180) * mapHeight
    return { x, y }
  }

  // Calculate marker size based on count
  const getMarkerSize = (count: number) => {
    const baseSize = 8
    const scaleFactor = 0.15
    return baseSize + Math.sqrt(count) * scaleFactor
  }

  // Get marker color based on performance
  const getMarkerColor = (lcp: number) => {
    const rating = getPerformanceRating('lcp', lcp)
    switch (rating) {
      case 'good':
        return '#10B981' // green-500
      case 'needs-improvement':
        return '#F59E0B' // yellow-500
      case 'poor':
        return '#EF4444' // red-500
      default:
        return '#6B7280' // gray-500
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Geographic Distribution
      </h3>

      <div className="flex gap-6">
        {/* Map */}
        <div className="flex-1">
          <svg viewBox={viewBox} className="w-full h-auto">
            {/* Simple world map outline (simplified) */}
            <path
              d="M 0 250 Q 250 200 500 250 T 1000 250"
              fill="#1F2937"
              stroke="#374151"
              strokeWidth={2}
            />

            {/* Continental outlines (simplified for demo) */}
            <path
              d="M 150 200 Q 200 180 250 200 Q 300 180 350 200"
              fill="#374151"
              opacity={0.3}
            />
            <path
              d="M 500 180 Q 550 160 600 180 Q 650 160 700 180"
              fill="#374151"
              opacity={0.3}
            />
            <path
              d="M 200 350 Q 250 330 300 350 Q 350 330 400 350"
              fill="#374151"
              opacity={0.3}
            />
            <path
              d="M 750 250 Q 800 230 850 250 Q 900 230 950 250"
              fill="#374151"
              opacity={0.3}
            />

            {/* City markers */}
            {data.map((city) => {
              const { x, y } = projectCoordinates(
                city.latitude,
                city.longitude,
              )
              const size = getMarkerSize(city.count)
              const isSelected = selectedCity === city.city

              return (
                <g key={city.city}>
                  {/* Marker glow effect */}
                  <circle
                    cx={x}
                    cy={y}
                    r={size + 4}
                    fill={getMarkerColor(city.averageLcp)}
                    opacity={isSelected ? 0.4 : 0.2}
                  />

                  {/* Main marker */}
                  <circle
                    cx={x}
                    cy={y}
                    r={size}
                    fill={getMarkerColor(city.averageLcp)}
                    stroke="#FFFFFF"
                    strokeWidth={isSelected ? 2 : 0}
                    className="cursor-pointer transition-all hover:opacity-80"
                    onClick={() => setSelectedCity(city.city)}
                  />

                  {/* City name label for large markers */}
                  {size > 15 && (
                    <text
                      x={x}
                      y={y - size - 5}
                      fill="#FFFFFF"
                      fontSize="10"
                      textAnchor="middle"
                      className="pointer-events-none"
                    >
                      {city.city}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        
      </div>
      <div className="flex gap-6">
{/* City details panel */}
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-400 mb-4">
            Top Locations
          </h4>
          <div className="space-y-3">
            {data.slice(0, 10).map((city) => {
              const rating = getPerformanceRating('lcp', city.averageLcp)
              const isSelected = selectedCity === city.city

              return (
                <div
                  key={city.city}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }`}
                  onClick={() => setSelectedCity(city.city)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-gray-400">{city.country} <span className="font-medium text-white">{city.city}</span></p>
                      <p className="text-sm text-gray-400">Visitors <span className="font-medium text-white">{city.count}</span></p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-gray-400">Avg LCP <span className="font-medium text-white">{city.averageLcp.toFixed(0)}ms</span></p>
                      <Badge className={`${getPerformanceBadgeColor(rating)} text-white`}>
                        {getPerformanceBadgeText(rating)}
                      </Badge>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {data.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No geo data available
            </div>
          )}
        </div>
      </div>
      
    </Card>
  )
}
