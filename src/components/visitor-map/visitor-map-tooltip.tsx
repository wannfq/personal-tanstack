export interface TooltipData {
  country: string
  countryCode: string
  count: number
  cities: Array<string>
  x: number
  y: number
}

interface MapTooltipProps {
  data: TooltipData
}

export function MapTooltip({ data }: MapTooltipProps) {
  return (
    <div
      className="pointer-events-none fixed z-50 rounded-md border border-border bg-popover px-3 py-2 text-sm shadow-md"
      style={{
        left: data.x,
        top: data.y - 10,
        transform: 'translate(-50%, -100%)',
      }}
    >
      <p className="font-medium text-popover-foreground">{data.country}</p>
      <p className="text-xs text-muted-foreground">
        {data.count} {data.count === 1 ? 'visitor' : 'visitors'}
      </p>
      {data.cities.length > 0 && (
        <p className="mt-1 text-xs text-muted-foreground">
          Cities: {data.cities.slice(0, 3).join(', ')}
          {data.cities.length > 3 && ` +${data.cities.length - 3} more`}
        </p>
      )}
    </div>
  )
}
