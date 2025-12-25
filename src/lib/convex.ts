import { ConvexReactClient } from 'convex/react'

let convexClient: ConvexReactClient | null = null

export function getConvexClient() {
  if (!convexClient && typeof window !== 'undefined') {
    convexClient = new ConvexReactClient(
      import.meta.env.VITE_CONVEX_URL ||
        'https://example.convex.cloud',
    )
  }
  return convexClient
}
