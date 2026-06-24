/**
 * Contribution graph — SVG heatmap of daily activity.
 * Compound component pattern (ContributionGraph → Calendar/Block/Footer/Total/Legend).
 * Inspired by kibo-ui's contribution graph, written without date-fns.
 */

import {
  createContext,
  Fragment,
  type HTMLAttributes,
  type ReactNode,
  useContext,
  useMemo,
} from 'react'
import { cn } from '@/lib/utils'

export type ContributionLevel = 0 | 1 | 2 | 3 | 4

export type Activity = {
  date: string
  count: number
  level: ContributionLevel
}

type Week = Array<Activity | null>

export type ContributionLabels = {
  months?: string[]
  weekdays?: string[]
  totalCount?: string
  legend?: {
    less?: string
    more?: string
  }
}

const DEFAULT_MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const DEFAULT_LABELS: Required<ContributionLabels> = {
  months: DEFAULT_MONTH_LABELS,
  weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  totalCount: '{{count}} contributions in {{year}}',
  legend: { less: 'Less', more: 'More' },
}

// Level 0 (no activity) uses muted-foreground so empty days recede like
// secondary text. Levels 1-4 use the primary color in 15% steps from
// 40% up to 85% (capped so peak days stay slightly muted).
const LEVEL_CLASSES = [
  'data-[level="0"]:fill-muted-foreground/20',
  'data-[level="1"]:fill-primary/40',
  'data-[level="2"]:fill-primary/55',
  'data-[level="3"]:fill-primary/70',
  'data-[level="4"]:fill-primary/85',
] as const

const MS_PER_DAY = 24 * 60 * 60 * 1000

type ContextValue = {
  data: Activity[]
  weeks: Week[]
  blockMargin: number
  blockRadius: number
  blockSize: number
  fontSize: number
  labels: Required<ContributionLabels>
  labelHeight: number
  maxLevel: number
  totalCount: number
  weekStart: number
  year: number
  width: number
  height: number
}

const ContributionGraphContext = createContext<ContextValue | null>(null)

function useContributionGraph(): ContextValue {
  const ctx = useContext(ContributionGraphContext)
  if (!ctx) {
    throw new Error(
      'ContributionGraph subcomponents must be rendered inside <ContributionGraph>',
    )
  }
  return ctx
}

// Parse "YYYY-MM-DD" as a local date (avoid UTC off-by-one near year boundaries).
function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1)
}

function formatISODate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Fill the gap between first and last day with zero-activity entries so
// the grid renders a continuous calendar.
function fillHoles(activities: Activity[]): Activity[] {
  if (activities.length === 0) return []

  const sorted = [...activities].sort((a, b) => a.date.localeCompare(b.date))
  const calendar = new Map(activities.map((a) => [a.date, a]))
  const first = sorted[0]!
  const last = sorted.at(-1)!
  const start = parseISODate(first.date)
  const end = parseISODate(last.date)
  const filled: Activity[] = []

  for (let t = start.getTime(); t <= end.getTime(); t += MS_PER_DAY) {
    const date = new Date(t)
    const iso = formatISODate(date)
    const existing = calendar.get(iso)
    filled.push(existing ?? { date: iso, count: 0, level: 0 })
  }
  return filled
}

// Chunk days into Sun-start weeks (configurable) and pad the start of the
// first week so the grid aligns to the chosen day-of-week column.
function groupByWeeks(activities: Activity[], weekStart: number): Week[] {
  if (activities.length === 0) return []

  const filled = fillHoles(activities)
  const firstDate = parseISODate(filled[0]!.date)
  const padBefore = (firstDate.getDay() - weekStart + 7) % 7
  const padded: Array<Activity | null> = [
    ...new Array<null>(padBefore).fill(null),
    ...filled,
  ]

  const weeks: Week[] = []
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7))
  }
  return weeks
}

// Reduce week columns to month labels, dropping labels that are too close
// together to be legible. Returns the column index + month name.
function getMonthLabels(
  weeks: Week[],
  monthNames: string[],
): Array<{ weekIndex: number; label: string }> {
  const labels = weeks.reduce<Array<{ weekIndex: number; label: string }>>(
    (acc, week, weekIndex) => {
      const firstDay = week.find((day) => day !== null)
      if (!firstDay) return acc
      const month = monthNames[parseISODate(firstDay.date).getMonth()]
      if (!month) return acc
      const prev = acc.at(-1)
      if (weekIndex === 0 || !prev || prev.label !== month) {
        acc.push({ weekIndex, label: month })
      }
      return acc
    },
    [],
  )

  return labels.filter(({ weekIndex }, index, all) => {
    const minWeeks = 3
    if (index === 0) {
      return all[1] !== undefined && all[1].weekIndex - weekIndex >= minWeeks
    }
    if (index === all.length - 1) {
      return weeks.slice(weekIndex).length >= minWeeks
    }
    return true
  })
}

export type ContributionGraphProps = HTMLAttributes<HTMLDivElement> & {
  data: Activity[]
  blockMargin?: number
  blockRadius?: number
  blockSize?: number
  fontSize?: number
  labels?: ContributionLabels
  maxLevel?: number
  totalCount?: number
  weekStart?: number
  children: ReactNode
}

export function ContributionGraph({
  data,
  blockMargin = 3,
  blockRadius = 1,
  blockSize = 11,
  fontSize = 12,
  labels: labelsProp,
  maxLevel: maxLevelProp = 4,
  totalCount: totalCountProp,
  weekStart = 0,
  className,
  children,
  style,
  ...props
}: ContributionGraphProps) {
  const maxLevel = Math.max(1, maxLevelProp)
  const weeks = useMemo(() => groupByWeeks(data, weekStart), [data, weekStart])

  const labels: Required<ContributionLabels> = useMemo(
    () => ({ ...DEFAULT_LABELS, ...labelsProp }),
    [labelsProp],
  )

  const labelHeight = fontSize + 8
  const year =
    data.length > 0
      ? parseISODate(data[0]!.date).getFullYear()
      : new Date().getFullYear()

  const totalCount =
    typeof totalCountProp === 'number'
      ? totalCountProp
      : data.reduce((sum, a) => sum + a.count, 0)

  const width = weeks.length * (blockSize + blockMargin) - blockMargin
  const height = labelHeight + (blockSize + blockMargin) * 7 - blockMargin

  if (data.length === 0) return null

  return (
    <ContributionGraphContext.Provider
      value={{
        data,
        weeks,
        blockMargin,
        blockRadius,
        blockSize,
        fontSize,
        labels,
        labelHeight,
        maxLevel,
        totalCount,
        weekStart,
        year,
        width,
        height,
      }}
    >
      <div
        className={cn('flex w-max max-w-full flex-col gap-2', className)}
        style={{ fontSize, ...style }}
        {...props}
      >
        {children}
      </div>
    </ContributionGraphContext.Provider>
  )
}

export type ContributionGraphCalendarProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  hideMonthLabels?: boolean
  title?: string
  children: (props: {
    activity: Activity
    dayIndex: number
    weekIndex: number
  }) => ReactNode
}

export function ContributionGraphCalendar({
  title = 'Contribution Graph',
  hideMonthLabels = false,
  className,
  children,
  ...props
}: ContributionGraphCalendarProps) {
  const { weeks, width, height, blockSize, blockMargin, labels, fontSize } =
    useContributionGraph()

  const monthLabels = useMemo(
    () => getMonthLabels(weeks, labels.months),
    [weeks, labels.months],
  )

  return (
    <div
      className={cn('max-w-full overflow-x-auto overflow-y-hidden', className)}
      {...props}
    >
      <svg
        className="block overflow-visible text-muted-foreground"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        aria-label={title}
        role="img"
      >
        <title>{title}</title>
        {!hideMonthLabels && (
          <g className="fill-current" style={{ fontSize }}>
            {monthLabels.map(({ label, weekIndex }) => (
              <text
                dominantBaseline="hanging"
                key={`${weekIndex}-${label}`}
                x={(blockSize + blockMargin) * weekIndex}
              >
                {label}
              </text>
            ))}
          </g>
        )}
        {weeks.map((week, weekIndex) =>
          week.map((activity, dayIndex) => {
            if (!activity) return null
            return (
              <Fragment key={`${weekIndex}-${dayIndex}-${activity.date}`}>
                {children({ activity, dayIndex, weekIndex })}
              </Fragment>
            )
          }),
        )}
      </svg>
    </div>
  )
}

export type ContributionGraphBlockProps = HTMLAttributes<SVGRectElement> & {
  activity: Activity
  dayIndex: number
  weekIndex: number
}

export function ContributionGraphBlock({
  activity,
  dayIndex,
  weekIndex,
  className,
  ...props
}: ContributionGraphBlockProps) {
  const { blockSize, blockMargin, blockRadius, labelHeight } =
    useContributionGraph()

  return (
    <rect
      className={cn(LEVEL_CLASSES, className)}
      data-count={activity.count}
      data-date={activity.date}
      data-level={activity.level}
      height={blockSize}
      rx={blockRadius}
      ry={blockRadius}
      width={blockSize}
      x={(blockSize + blockMargin) * weekIndex}
      y={labelHeight + (blockSize + blockMargin) * dayIndex}
      {...props}
    />
  )
}

export function ContributionGraphFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-4 gap-y-2 whitespace-nowrap px-0.5 text-xs text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

export type ContributionGraphTotalCountProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  children?: (props: { totalCount: number; year: number }) => ReactNode
}

export function ContributionGraphTotalCount({
  className,
  children,
  ...props
}: ContributionGraphTotalCountProps) {
  const { totalCount, year, labels } = useContributionGraph()

  if (children) return <>{children({ totalCount, year })}</>

  return (
    <div className={cn('text-muted-foreground', className)} {...props}>
      {labels.totalCount
        .replace('{{count}}', totalCount.toLocaleString('en'))
        .replace('{{year}}', String(year))}
    </div>
  )
}

export type ContributionGraphLegendProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  children?: (props: { level: number }) => ReactNode
}

export function ContributionGraphLegend({
  className,
  children,
  ...props
}: ContributionGraphLegendProps) {
  const { labels, maxLevel, blockSize, blockRadius } = useContributionGraph()

  return (
    <div
      className={cn('ml-auto flex items-center gap-1', className)}
      {...props}
    >
      <span>{labels.legend.less}</span>
      {new Array(maxLevel + 1).fill(null).map((_, level) =>
        children ? (
          <Fragment key={level}>{children({ level })}</Fragment>
        ) : (
          <svg
            aria-hidden="true"
            height={blockSize}
            key={level}
            width={blockSize}
          >
            <title>{`${level} contributions`}</title>
            <rect
              className={cn(LEVEL_CLASSES)}
              data-level={level}
              height={blockSize}
              rx={blockRadius}
              ry={blockRadius}
              width={blockSize}
            />
          </svg>
        ),
      )}
      <span>{labels.legend.more}</span>
    </div>
  )
}
