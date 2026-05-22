import { Link } from '@tanstack/react-router'
import { IconChartBar } from '@tabler/icons-react'
import { VisitorCounter } from '@/components/visitor-counter'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-12">
        <VisitorCounter />
        <Link
          to="/analytics"
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          activeProps={{ className: 'text-foreground' }}
        >
          <IconChartBar className="size-4" aria-hidden="true" />
          Analytics
        </Link>
      </div>
    </footer>
  )
}
