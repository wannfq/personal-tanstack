import { cn } from '@/lib/utils'

/**
 * Section wrapper primitive. Owns the `id` + vertical rhythm seam so section
 * spacing is consistent and configurable in one place. Does not compose the
 * heading — header markup varies across sections (some have a description
 * paragraph, some do not), so keeping it separate avoids a leaky interface.
 */
export function Section({
  className,
  ...props
}: React.ComponentProps<'section'>) {
  return (
    <section className={cn('space-y-10', className)} {...props} />
  )
}
