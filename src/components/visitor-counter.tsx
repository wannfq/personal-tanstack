import { useMutation, useQuery } from 'convex/react'
import { useEffect, useState } from 'react'
import { api } from '../../convex/_generated/api'
import type { VisitorData } from '@/lib/visitor'
import { ClientOnly } from '@/components/client-only'
import { getVisitorData } from '@/lib/visitor'

const fallbackContent = (
  <div className="text-sm text-muted-foreground">Thank you for visiting!</div>
)

export function VisitorCounter() {
  return (
    <ClientOnly fallback={fallbackContent}>
      <VisitorCounterClient />
    </ClientOnly>
  )
}

function VisitorCounterClient() {
  const [visitorId, setVisitorId] = useState<string | null>(null)
  const [visitorData, setVisitorData] = useState<VisitorData | null>(null)
  const [referrerHostname, setReferrerHostname] = useState<string | null>(null)
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

  // Extract referrer hostname from document.referrer
  useEffect(() => {
    const documentReferrer = document.referrer || null

    if (!documentReferrer) {
      setReferrerHostname(null)
      return
    }

    try {
      const url = new URL(documentReferrer)
      setReferrerHostname(url.hostname)
    } catch {
      setReferrerHostname(null)
    }
  }, [])

  // Fetch visitor data from server function
  useEffect(() => {
    if (dataFetched) return

    getVisitorData()
      .then((data: VisitorData | null) => {
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
        referrer: referrerHostname ?? undefined,
      })
    }
  }, [visitorId, dataFetched, visitorData, referrerHostname, recordVisit])

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
