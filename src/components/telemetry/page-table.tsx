import { useState } from 'react'
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  getPerformanceBadgeColor,
  getPerformanceBadgeText,
  getPerformanceRating,
} from '@/lib/performance'

interface PagePerformanceProps {
  data: Array<{
    path: string
    views: number
    averageLcp: number
    averageFcp: number
    averageInp: number
    averageCls: number
  }>
}

type SortField =
  | 'path'
  | 'views'
  | 'averageLcp'
  | 'averageFcp'
  | 'averageInp'
  | 'averageCls'
type SortDirection = 'asc' | 'desc'

export function PagePerformance({ data }: PagePerformanceProps) {
  const [sortField, setSortField] = useState<SortField>('views')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const sortedData = [...data].sort((a, b) => {
    let comparison = 0
    if (typeof a[sortField] === 'string') {
      comparison = String(a[sortField]).localeCompare(String(b[sortField]))
    } else {
      comparison = a[sortField] - b[sortField]
    }
    return sortDirection === 'asc' ? comparison : -comparison
  })

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? (
      <IconArrowUp className="w-4 h-4" />
    ) : (
      <IconArrowDown className="w-4 h-4" />
    )
  }

  const overallRating = (page: (typeof data)[0]) => {
    // Calculate overall rating based on all metrics
    const lcpRating = getPerformanceRating('lcp', page.averageLcp)
    const fcpRating = getPerformanceRating('fcp', page.averageFcp)
    const inpRating = getPerformanceRating('inp', page.averageInp)
    const clsRating = getPerformanceRating('cls', page.averageCls)

    // If any metric is poor, overall is poor
    if ([lcpRating, fcpRating, inpRating, clsRating].includes('poor')) {
      return 'poor'
    }
    // If any metric needs improvement, overall needs improvement
    if (
      [lcpRating, fcpRating, inpRating, clsRating].includes('needs-improvement')
    ) {
      return 'needs-improvement'
    }
    return 'good'
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Page Performance</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('path')}
                  className="text-gray-400 hover:text-white font-medium"
                >
                  Path
                  <SortIcon field="path" />
                </Button>
              </th>
              <th className="text-left py-3 px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('views')}
                  className="text-gray-400 hover:text-white font-medium"
                >
                  Views
                  <SortIcon field="views" />
                </Button>
              </th>
              <th className="text-left py-3 px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('averageLcp')}
                  className="text-gray-400 hover:text-white font-medium"
                >
                  Avg LCP
                  <SortIcon field="averageLcp" />
                </Button>
              </th>
              <th className="text-left py-3 px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('averageFcp')}
                  className="text-gray-400 hover:text-white font-medium"
                >
                  Avg FCP
                  <SortIcon field="averageFcp" />
                </Button>
              </th>
              <th className="text-left py-3 px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('averageInp')}
                  className="text-gray-400 hover:text-white font-medium"
                >
                  Avg INP
                  <SortIcon field="averageInp" />
                </Button>
              </th>
              <th className="text-left py-3 px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('averageCls')}
                  className="text-gray-400 hover:text-white font-medium"
                >
                  Avg CLS
                  <SortIcon field="averageCls" />
                </Button>
              </th>
              <th className="text-left py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((page) => {
              const rating = overallRating(page)
              return (
                <tr
                  key={page.path}
                  className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-3 px-4">
                    <code className="text-sm text-blue-400 font-mono bg-blue-500/10 px-2 py-1 rounded">
                      {page.path}
                    </code>
                  </td>
                  <td className="py-3 px-4 text-white">
                    {page.views.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-sm ${
                        getPerformanceRating('lcp', page.averageLcp) === 'good'
                          ? 'text-green-400'
                          : getPerformanceRating('lcp', page.averageLcp) ===
                              'needs-improvement'
                            ? 'text-yellow-400'
                            : 'text-red-400'
                      }`}
                    >
                      {page.averageLcp.toFixed(0)}ms
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-sm ${
                        getPerformanceRating('fcp', page.averageFcp) === 'good'
                          ? 'text-green-400'
                          : getPerformanceRating('fcp', page.averageFcp) ===
                              'needs-improvement'
                            ? 'text-yellow-400'
                            : 'text-red-400'
                      }`}
                    >
                      {page.averageFcp.toFixed(0)}ms
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-sm ${
                        getPerformanceRating('inp', page.averageInp) === 'good'
                          ? 'text-green-400'
                          : getPerformanceRating('inp', page.averageInp) ===
                              'needs-improvement'
                            ? 'text-yellow-400'
                            : 'text-red-400'
                      }`}
                    >
                      {page.averageInp.toFixed(0)}ms
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-sm ${
                        getPerformanceRating('cls', page.averageCls) === 'good'
                          ? 'text-green-400'
                          : getPerformanceRating('cls', page.averageCls) ===
                              'needs-improvement'
                            ? 'text-yellow-400'
                            : 'text-red-400'
                      }`}
                    >
                      {page.averageCls.toFixed(3)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      className={`${getPerformanceBadgeColor(rating)} text-white`}
                    >
                      {getPerformanceBadgeText(rating)}
                    </Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No performance data available
          </div>
        )}
      </div>
    </Card>
  )
}
