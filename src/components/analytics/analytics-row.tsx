interface AnalyticsRowProps {
  count: number
  children: React.ReactNode
}

export function AnalyticsRow({ count, children }: AnalyticsRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-3">
      {children}
      <div className="text-right">
        <p className="font-semibold">{count}</p>
        <p className="text-xs text-muted-foreground">
          {count === 1 ? 'visitor' : 'visitors'}
        </p>
      </div>
    </div>
  )
}
