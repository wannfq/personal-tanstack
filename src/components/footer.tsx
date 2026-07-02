import { Link } from '@tanstack/react-router'
import { IconChartBar } from '@tabler/icons-react'
import { VisitorCounter } from '@/components/visitor-counter'
import { Container } from '@/components/layout'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <Container className="flex items-center justify-between py-4">
        <VisitorCounter />
        <Link
          to="/analytics"
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          activeProps={{ className: 'text-foreground' }}
        >
          <IconChartBar className="size-4" aria-hidden="true" />
          Analytics
        </Link>
      </Container>
    </footer>
  )
}
