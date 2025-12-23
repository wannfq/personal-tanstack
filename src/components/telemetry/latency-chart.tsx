import { Card } from '@/components/ui/card'

interface LatencyChartProps {
  data: Array<{
    timestamp: number
    lcp: number
    fcp: number
    inp: number
    cls: number
  }>
  timeRange: string
}

export function LatencyChart({ data, timeRange }: LatencyChartProps) {
  // Chart dimensions
  const width = 800
  const height = 400
  const padding = { top: 20, right: 20, bottom: 40, left: 60 }

  // Calculate scales
  const maxY = Math.max(
    ...data.map((d) => Math.max(d.lcp, d.fcp, d.inp)),
  ) * 1.1
  const minY = 0

  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  // Convert data points to SVG coordinates
  const xScale = (i: number) =>
    padding.left + (i / (data.length - 1)) * chartWidth
  const yScale = (value: number) =>
    padding.top + chartHeight - (value / maxY) * chartHeight

  // Format timestamp for x-axis labels
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    if (timeRange === '1h') {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Latency Over Time ({timeRange})
      </h3>

      <svg width={width} height={height} className="w-full">
        {/* Y-axis grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((percent) => (
          <g key={percent}>
            <line
              x1={padding.left}
              y1={padding.top + chartHeight * percent}
              x2={width - padding.right}
              y2={padding.top + chartHeight * percent}
              stroke="#374151"
              strokeWidth={1}
              strokeDasharray="4"
            />
            <text
              x={padding.left - 10}
              y={padding.top + chartHeight * percent + 4}
              fill="#9CA3AF"
              fontSize="12"
              textAnchor="end"
            >
              {(maxY * (1 - percent)).toFixed(0)}
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {data
          .filter((_, i) => i % Math.ceil(data.length / 6) === 0)
          .map((point, i) => {
            const index = data.indexOf(point)
            return (
              <text
                key={point.timestamp}
                x={xScale(index)}
                y={height - 10}
                fill="#9CA3AF"
                fontSize="12"
                textAnchor="middle"
              >
                {formatTimestamp(point.timestamp)}
              </text>
            )
          })}

        {/* LCP line */}
        <polyline
          fill="none"
          stroke="#10B981"
          strokeWidth={2}
          points={data
            .map((d, i) => `${xScale(i)},${yScale(d.lcp)}`)
            .join(' ')}
        />

        {/* FCP line */}
        <polyline
          fill="none"
          stroke="#3B82F6"
          strokeWidth={2}
          points={data
            .map((d, i) => `${xScale(i)},${yScale(d.fcp)}`)
            .join(' ')}
        />

        {/* INP line */}
        <polyline
          fill="none"
          stroke="#8B5CF6"
          strokeWidth={2}
          points={data
            .map((d, i) => `${xScale(i)},${yScale(d.inp)}`)
            .join(' ')}
        />
      </svg>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm text-gray-400">LCP</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-sm text-gray-400">FCP</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500" />
          <span className="text-sm text-gray-400">INP</span>
        </div>
      </div>
    </Card>
  )
}
