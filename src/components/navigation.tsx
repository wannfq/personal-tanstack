import { Link } from '@tanstack/react-router'
import { ThemeToggle } from '@/components/theme-toggle'
import { Container } from '@/components/layout'

export function Navigation() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-background">
      <Container className="flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: 'text-foreground' }}
          >
            Home
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </Container>
    </nav>
  )
}
