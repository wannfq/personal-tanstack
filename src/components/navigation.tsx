import { Link } from '@tanstack/react-router'
import { ThemeToggle } from '@/components/theme-toggle'

export function Navigation() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-10 lg:px-12">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: 'text-foreground' }}
          >
            Home
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
