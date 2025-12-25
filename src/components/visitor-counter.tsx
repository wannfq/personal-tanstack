import { useMutation, useQuery } from 'convex/react'
import { useEffect, useState } from 'react'
import { api } from '../../convex/_generated/api'
import type { VisitorGeoData } from '@/lib/visitor';
import {  getVisitorGeoData } from '@/lib/visitor'

export function VisitorCounter() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="text-sm text-muted-foreground">Loading...</div>
  }

  return <VisitorCounterClient />
}

function VisitorCounterClient() {
  const [visitorId, setVisitorId] = useState<string | null>(null)
  const [geoData, setGeoData] = useState<VisitorGeoData | null>(null)
  const [geoFetched, setGeoFetched] = useState(false)
  const recordVisit = useMutation(api.visitors.recordVisit)
  const visitorCount = useQuery(api.visitors.getVisitorCount)

  // Get visitor ID from localStorage
  useEffect(() => {
    const existingVisitorId = localStorage.getItem('visitorId')
    const id = existingVisitorId || crypto.randomUUID()
    localStorage.setItem('visitorId', id)
    setVisitorId(id)
  }, [])

  // Fetch geo data from server function
  useEffect(() => {
    if (geoFetched) return

    getVisitorGeoData()
      .then((data) => {
        setGeoData(data)
        setGeoFetched(true)
      })
      .catch(() => {
        setGeoFetched(true)
      })
  }, [geoFetched])

  // Record visit once we have both visitor ID and geo data (or geo fetch completed)
  useEffect(() => {
    if (visitorId && geoFetched) {
      recordVisit({
        visitorId,
        ip: geoData?.ip ?? undefined,
        city: geoData?.city ?? undefined,
        country: geoData?.country ?? undefined,
        lat: geoData?.lat ?? undefined,
        lng: geoData?.lng ?? undefined,
      })
    }
  }, [visitorId, geoFetched, geoData, recordVisit])

  if (visitorCount === undefined) {
    return <div className="text-sm text-muted-foreground">Loading...</div>
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
