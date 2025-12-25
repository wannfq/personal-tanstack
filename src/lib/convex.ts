import { ConvexReactClient } from 'convex/react'

let convexClient: ConvexReactClient | null = null

export function getConvexClient() {
  if (!convexClient && typeof window !== 'undefined') {
    convexClient = new ConvexReactClient(
      import.meta.env.CONVEX_URL || 'https://deployment.convex.cloud',
    )
  }
  return convexClient
}
