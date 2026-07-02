import { cn } from '@/lib/utils'

type PageHeadingProps = React.ComponentProps<'h2'> & {
  /**
   * Heading level. Defaults to `h2` (the most common usage). Use `h1` for
   * page-level titles (analytics, not-found).
   */
  as?: 'h1' | 'h2'
}

/**
 * Page heading primitive. Owns the shared heading typography so the
 * `text-3xl font-semibold tracking-tight sm:text-4xl` token lives in one place.
 */
export function PageHeading({
  as: Tag = 'h2',
  className,
  ...props
}: PageHeadingProps) {
  return (
    <Tag
      className={cn(
        'text-3xl font-semibold tracking-tight sm:text-4xl',
        className,
      )}
      {...props}
    />
  )
}
