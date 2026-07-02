import { useEffect, useState, type ReactNode } from 'react'

interface ClientOnlyProps {
  children: ReactNode
  fallback?: ReactNode
}

/**
 * Renders children only after the client has mounted.
 * During SSR and the first client paint, renders `fallback` instead.
 * This prevents hydration mismatches for components that read browser-only
 * APIs (localStorage, document.referrer, Convex queries, etc.).
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted ? children : fallback
}
