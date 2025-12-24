import { useMutation, useQuery } from 'convex/react'
import { useEffect, useState } from 'react'
import { api } from '../../convex/_generated/api'

export function VisitorCounter() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Don't render Convex hooks during SSR
  if (!isMounted) {
    return (
      <footer className="border-t border-border/40 py-8">
        <p className="text-center text-sm text-muted-foreground">
          Thank you for visiting
        </p>
      </footer>
    )
  }

  return <VisitorCounterClient />
}

function VisitorCounterClient() {
  const [visitorId, setVisitorId] = useState<string | null>(null)
  const recordVisit = useMutation(api.visitors.recordVisit)
  const visitorCount = useQuery(api.visitors.getVisitorCount)

  useEffect(() => {
    const existingVisitorId = localStorage.getItem('visitorId')
    const id = existingVisitorId || crypto.randomUUID()
    localStorage.setItem('visitorId', id)
    setVisitorId(id)
  }, [])

  useEffect(() => {
    if (visitorId) {
      recordVisit({ visitorId })
    }
  }, [visitorId, recordVisit])

  if (visitorCount === undefined) {
    return (
      <footer className="border-t border-border/40 py-8">
        <p className="text-center text-sm text-muted-foreground">
          Loading...
        </p>
      </footer>
    )
  }

  return (
    <footer className="border-t border-border/40 py-8">
      <p className="text-center text-sm text-muted-foreground">
        Thank you for being visitor number{' '}
        <span className="font-semibold text-foreground">
          {visitorCount.toLocaleString()}
        </span>
        !
      </p>
    </footer>
  )
}
