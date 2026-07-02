import { cva, type VariantProps } from 'class-variance-authority'
import type { ReactNode } from 'react'

const externalLinkVariants = cva(
  'text-primary underline hover:text-primary/80',
  {
    variants: {
      weight: {
        medium: 'font-medium',
        normal: '',
      },
      offset: {
        2: 'underline-offset-2',
        4: 'underline-offset-4',
      },
    },
    defaultVariants: {
      weight: 'medium',
      offset: 4,
    },
  },
)

interface ExternalLinkProps
  extends VariantProps<typeof externalLinkVariants> {
  href: string
  children: ReactNode
  className?: string
}

export function ExternalLink({
  href,
  children,
  weight,
  offset,
  className,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={externalLinkVariants({ weight, offset, className })}
    >
      {children}
    </a>
  )
}
