import { HeadContent, Outlet, Scripts, createRootRoute, useRouter } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useEffect } from 'react'

import appCss from '../styles.css?url'
import { NotFound } from '@/components/not-found'
import { PostHogProvider } from '@/components/ui/posthog-provider'
import { initWebVitals } from '@/lib/telemetry'
import { Navigation } from '@/components/navigation'

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: RootErrorComponent,
  notFoundComponent: NotFound,
  wrapInSuspense: true,
})

function RootComponent() {
  const router = useRouter()

  useEffect(() => {
    // Initialize Web Vitals tracking
    initWebVitals()
  }, [])

  return (
    <RootDocument router={router}>
      <Navigation />
      <PostHogProvider>
        <Outlet />
      </PostHogProvider>
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode; router: ReturnType<typeof useRouter> }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        <link rel="stylesheet" href={appCss} />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

function RootErrorComponent() {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="flex min-h-screen items-center justify-center">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
