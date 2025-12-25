import { Link } from '@tanstack/react-router'
import { IconChartBar } from '@tabler/icons-react'
import { VisitorCounter } from '@/components/visitor-counter'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 px-6 py-8 sm:px-10 lg:px-12">
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

