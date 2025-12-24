import { useEffect, useState } from 'react'
import {
  PostHogProvider as PHProvider,
  usePostHog as usePH,
} from 'posthog-js/react'
import type { PostHog } from 'posthog-js/react'
import { posthog } from '@/lib/posthog'

interface PostHogProviderProps {
  children: React.ReactNode
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <>{children}</>
  }

  return (
    <PHProvider client={posthog as unknown as PostHog}>{children}</PHProvider>
  )
}

export function usePostHog() {
  return usePH()
}
