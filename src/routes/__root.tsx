import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { ConvexProvider } from 'convex/react'
import { useEffect, useState } from 'react'

import appCss from '../styles.css?url'
import { getConvexClient } from '../lib/convex'
import { Footer } from '@/components/footer'
import { NotFound } from '@/components/not-found'
import { Navigation } from '@/components/navigation'

export const Route = createRootRoute({
  head: () => ({
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/logo.png' },
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
      <body className="flex min-h-screen flex-col">
        {children}
        <TanStackDevtools />
        <Scripts />
      </body>
    </html>
  )
}

function RootComponent() {
  const [client, setClient] = useState<ReturnType<
    typeof getConvexClient
  > | null>(null)

  useEffect(() => {
    const convex = getConvexClient()
    setClient(convex)
  }, [])

  return (
    <RootDocument>
      {client ? (
        <ConvexProvider client={client}>
          <Navigation />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </ConvexProvider>
      ) : (
        <>
          <Navigation />
          <main className="flex-1">
            <Outlet />
          </main>
        </>
      )}
    </RootDocument>
  )
}
