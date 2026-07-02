import { cn } from '@/lib/utils'

type ContainerProps<T extends keyof React.JSX.IntrinsicElements = 'div'> = {
  as?: T
  className?: string
} & Omit<React.ComponentProps<T>, 'as' | 'className'>

/**
 * Layout primitive owning the page container seam: max-width and horizontal
 * padding. Callers compose flex direction, gap, and vertical padding via
 * `className` — Container itself does not force a display mode so it serves
 * both row (nav, footer) and column (routes) layouts. Polymorphic `as` lets
 * routes render a semantic `<main>` while nav/footer keep a plain `<div>`.
 */
export function Container<
  T extends keyof React.JSX.IntrinsicElements = 'div',
>({
  as = 'div' as T,
  className,
  ...props
}: ContainerProps<T>) {
  const Tag = as as React.ElementType
  return (
    <Tag
      className={cn(
        'mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12',
        className,
      )}
      {...props}
    />
  )
}
