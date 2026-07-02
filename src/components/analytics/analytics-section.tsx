import type { ComponentType } from 'react'

import { cn } from '@/lib/utils'

interface AnalyticsSectionProps {
  icon: ComponentType<{ className?: string }>
  title: string
  className?: string
  children: React.ReactNode
}

export function AnalyticsSection({
  icon: Icon,
  title,
  className,
  children,
}: AnalyticsSectionProps) {
  return (
    <section className={cn(className)}>
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-muted-foreground" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  )
}
