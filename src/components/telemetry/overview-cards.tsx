import { Card } from '@/components/ui/card'
import {
  getPerformanceRating,
  getPerformanceBadgeColor,
  getPerformanceBadgeText,
} from '@/lib/performance'

interface OverviewCardProps {
  title: string
  value: string | number
  change?: string
  changeDirection?: 'up' | 'down' | 'neutral'
  badge?: {
    text: string
    color: string
  }
}

function OverviewCard({
  title,
  value,
  change,
  changeDirection,
  badge,
}: OverviewCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          {change && (
            <p
              className={`mt-2 text-sm ${
                changeDirection === 'up'
                  ? 'text-green-500'
                  : changeDirection === 'down'
                    ? 'text-red-500'
                    : 'text-gray-400'
              }`}
            >
              {change}
            </p>
          )}
        </div>
        {badge && (
          <span
            className={`px-3 py-1 text-xs font-medium text-white rounded-full ${badge.color}`}
          >
            {badge.text}
          </span>
        )}
      </div>
    </Card>
  )
}

interface OverviewCardsProps {
  metrics: {
    totalPageViews: number
    averageLcp: number
    averageFcp: number
    averageInp: number
    averageCls: number
  }
  timeRange: string
}

export function OverviewCards({ metrics, timeRange }: OverviewCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
      <OverviewCard
        title="Total Page Views"
        value={metrics.totalPageViews.toLocaleString()}
        change={`Last ${timeRange}`}
      />

      <OverviewCard
        title="Avg LCP"
        value={`${metrics.averageLcp.toFixed(0)}ms`}
        badge={{
          text: getPerformanceBadgeText(
            getPerformanceRating('lcp', metrics.averageLcp),
          ),
          color: getPerformanceBadgeColor(
            getPerformanceRating('lcp', metrics.averageLcp),
          ),
        }}
      />

      <OverviewCard
        title="Avg FCP"
        value={`${metrics.averageFcp.toFixed(0)}ms`}
        badge={{
          text: getPerformanceBadgeText(
            getPerformanceRating('fcp', metrics.averageFcp),
          ),
          color: getPerformanceBadgeColor(
            getPerformanceRating('fcp', metrics.averageFcp),
          ),
        }}
      />

      <OverviewCard
        title="Avg INP"
        value={`${metrics.averageInp.toFixed(0)}ms`}
        badge={{
          text: getPerformanceBadgeText(
            getPerformanceRating('inp', metrics.averageInp),
          ),
          color: getPerformanceBadgeColor(
            getPerformanceRating('inp', metrics.averageInp),
          ),
        }}
      />

      <OverviewCard
        title="Avg CLS"
        value={metrics.averageCls.toFixed(3)}
        badge={{
          text: getPerformanceBadgeText(
            getPerformanceRating('cls', metrics.averageCls),
          ),
          color: getPerformanceBadgeColor(
            getPerformanceRating('cls', metrics.averageCls),
          ),
        }}
      />
    </div>
  )
}
