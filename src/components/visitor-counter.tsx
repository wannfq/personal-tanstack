import { useMutation, useQuery } from 'convex/react'
import { useEffect, useState } from 'react'
import { api } from '../../convex/_generated/api'
import type { VisitorData } from '@/lib/visitor'
import { getVisitorData } from '@/lib/visitor'

const fallbackContent = (
  <div className="text-sm text-muted-foreground">Thank you for visiting!</div>
)

export function VisitorCounter() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return fallbackContent
  }

  return <VisitorCounterClient />
}

function VisitorCounterClient() {
  const [visitorId, setVisitorId] = useState<string | null>(null)
  const [visitorData, setVisitorData] = useState<VisitorData | null>(null)
  const [dataFetched, setDataFetched] = useState(false)
  const recordVisit = useMutation(api.visitors.recordVisit)
  const visitorCount = useQuery(api.visitors.getVisitorCount)

  // Get visitor ID from localStorage
  useEffect(() => {
    const existingVisitorId = localStorage.getItem('visitorId')
    const id = existingVisitorId || crypto.randomUUID()
    localStorage.setItem('visitorId', id)
    setVisitorId(id)
  }, [])

  // Fetch visitor data from server function
  useEffect(() => {
    if (dataFetched) return

    getVisitorData()
      .then((data) => {
        setVisitorData(data)
        setDataFetched(true)
      })
      .catch(() => {
        setDataFetched(true)
      })
  }, [dataFetched])

  // Record visit once we have both visitor ID and visitor data (or data fetch completed)
  useEffect(() => {
    if (visitorId && dataFetched) {
      recordVisit({
        visitorId,
        ip: visitorData?.ip ?? undefined,
        city: visitorData?.city ?? undefined,
        country: visitorData?.country ?? undefined,
        lat: visitorData?.lat ?? undefined,
        lng: visitorData?.lng ?? undefined,
        userAgent: visitorData?.userAgent ?? undefined,
        deviceType: visitorData?.deviceType ?? undefined,
      })
    }
  }, [visitorId, dataFetched, visitorData, recordVisit])

  if (visitorCount === undefined) {
    return fallbackContent
  }

  return (
    <div className="text-center text-sm font-medium text-muted-foreground">
      Thank you for being the visitor number{' '}
      <span className="font-semibold text-foreground">
        {visitorCount.toLocaleString()}
      </span>
      !
    </div>
  )
}
