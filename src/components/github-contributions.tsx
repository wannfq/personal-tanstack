/**
 * "GitHub Contributions" section — shows a year of contribution activity
 * below the Experience section. Server function returns ~365 days; this
 * component handles the loading / error / render states and styles the
 * graph with the site's own muted-foreground + primary tokens.
 */

import { IconBrandGithub, IconLoader2 } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
  type Activity,
} from '@/components/contribution-graph'
import { ClientOnly } from '@/components/client-only'
import { getGitHubContributions } from '@/lib/github-contributions'

const GITHUB_PROFILE_URL = 'https://github.com/wannfq'

// "Jan 15, 2024" — friendlier than the raw ISO in the native title attribute.
const TOOLTIP_DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

function cellLabel(count: number, iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, (m ?? 1) - 1, d ?? 1)
  return `${count} contribution${count !== 1 ? 's' : ''} on ${TOOLTIP_DATE_FORMAT.format(date)}`
}

function LoadingState() {
  return (
    <div className="flex h-32 items-center gap-2 text-sm text-muted-foreground">
      <IconLoader2 aria-hidden="true" className="size-4 animate-spin" />
      Loading contributions from GitHub…
    </div>
  )
}

function ErrorState() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <IconBrandGithub aria-hidden="true" className="size-4" />
      <p>
        Unable to load contributions. View them directly on{' '}
        <a
          className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          href={GITHUB_PROFILE_URL}
          rel="noreferrer"
          target="_blank"
        >
          GitHub
        </a>
        .
      </p>
    </div>
  )
}

function ContributionGraphView({ data }: { data: Activity[] }) {
  return (
    <ContributionGraph
      blockMargin={3}
      blockSize={15}
      className="mx-auto"
      data={data}
    >
      <ContributionGraphCalendar title="GitHub Contributions">
        {({ activity, dayIndex, weekIndex }) => (
          <ContributionGraphBlock
            activity={activity}
            dayIndex={dayIndex}
            title={cellLabel(activity.count, activity.date)}
            weekIndex={weekIndex}
          />
        )}
      </ContributionGraphCalendar>

      <ContributionGraphFooter>
        <ContributionGraphTotalCount>
          {({ totalCount, year }) => (
            <span>
              <span className="font-medium text-foreground">
                {totalCount.toLocaleString('en')}
              </span>{' '}
              contributions in {year} on{' '}
              <a
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                href={GITHUB_PROFILE_URL}
                rel="noreferrer"
                target="_blank"
              >
                GitHub
              </a>
              .
            </span>
          )}
        </ContributionGraphTotalCount>
        <ContributionGraphLegend />
      </ContributionGraphFooter>
    </ContributionGraph>
  )
}

type LoadState =
  | { status: 'loading' }
  | { status: 'ready'; data: Activity[] }
  | { status: 'error' }

function GitHubContributionsClient() {
  const [state, setState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    void getGitHubContributions().then((data) => {
      if (cancelled) return
      setState(
        data.length > 0 ? { status: 'ready', data } : { status: 'error' },
      )
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (state.status === 'loading') return <LoadingState />
  if (state.status === 'error') return <ErrorState />
  return <ContributionGraphView data={state.data} />
}

export function GitHubContributions() {
  return (
    <section id="github">
      <ClientOnly fallback={<LoadingState />}>
        <GitHubContributionsClient />
      </ClientOnly>
    </section>
  )
}
