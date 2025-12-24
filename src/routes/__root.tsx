import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useEffect, useState } from 'react'
import { ConvexProvider, ConvexReactClient } from 'convex/react'

import appCss from '../styles.css?url'
import { NotFound } from '@/components/not-found'
import { PostHogProvider } from '@/components/ui/posthog-provider'
import { initWebVitals } from '@/lib/telemetry'
import { Navigation } from '@/components/navigation'
import { VisitorCounter } from '@/components/visitor-counter'

export const Route = createRootRoute({
  head: () => ({
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/logo.svg' },
    ],
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  }),
  notFoundComponent: NotFound,
  component: RootComponent,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools />
        <Scripts />
      </body>
    </html>
  )
}

function RootComponent() {
  const [convexClient, setConvexClient] = useState<ConvexReactClient | null>(
    null,
  )

  useEffect(() => {
    initWebVitals()
    if (typeof window !== 'undefined') {
      const client = new ConvexReactClient(
        import.meta.env.VITE_CONVEX_URL ||
          'https://doting-lemming-385.convex.cloud',
      )
      setConvexClient(client)
    }
  }, [])

  return (
    <RootDocument>
      {convexClient ? (
        <ConvexProvider client={convexClient}>
          <Navigation />
          <PostHogProvider>
            <Outlet />
          </PostHogProvider>
          <VisitorCounter />
        </ConvexProvider>
      ) : (
        <>
          <Navigation />
          <PostHogProvider>
            <Outlet />
          </PostHogProvider>
        </>
      )}
    </RootDocument>
  )
}
