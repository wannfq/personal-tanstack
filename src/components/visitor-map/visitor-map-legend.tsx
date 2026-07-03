interface MapLegendProps {
  uniqueCountries: number
  totalVisitors: number
  colorRGB: { r: number; g: number; b: number }
}

export function MapLegend({
  uniqueCountries,
  totalVisitors,
  colorRGB,
}: MapLegendProps) {
  const getColorWithOpacity = (opacity: number): string => {
    return `rgba(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}, ${opacity})`
  }

  return (
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
  )
}
