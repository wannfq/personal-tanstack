import { Link } from '@tanstack/react-router'
import { IconArrowLeft } from '@tabler/icons-react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-foreground">
      <div className="flex flex-col items-center gap-6 text-center">
        <span className="text-8xl" role="img" aria-label="Confused face">
          😕
        </span>

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Page not found
          </h1>
          <p className="max-w-md text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link to="/" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
          <IconArrowLeft className="size-4" aria-hidden="true" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

