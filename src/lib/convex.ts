import { ConvexReactClient } from 'convex/react'

let convexClient: ConvexReactClient | null = null

export function getConvexClient() {
  if (!convexClient && typeof window !== 'undefined') {
    const convexUrl = import.meta.env.VITE_CONVEX_URL
    if (!convexUrl) {
      console.error(
        'VITE_CONVEX_URL is not set. Please add it to your .env file.',
      )
      return null
    }
    convexClient = new ConvexReactClient(convexUrl)
  }
  return convexClient
}
