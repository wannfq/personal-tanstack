import { Link } from '@tanstack/react-router'
// import { IconActivity } from '@tabler/icons-react'
import { ThemeToggle } from '@/components/theme-toggle'

export function Navigation() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-10 lg:px-12">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: 'text-foreground' }}
          >
            Home
          </Link>
          {/* <Link
            to="/telemetry"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: 'text-foreground' }}
          >
            <IconActivity className="size-4" aria-hidden="true" />
            Telemetry
          </Link> */}
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
