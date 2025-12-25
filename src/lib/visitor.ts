/**
 * Server-side functions for visitor geo-location tracking
 * Uses ipinfo.io to resolve IP addresses to geographic data
 */

import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

export interface VisitorGeoData {
  ip: string
  city: string | null
  country: string | null
  lat: number | null
  lng: number | null
}

/**
 * Get visitor's IP address and resolve it to geographic location
 * Reads IP from Netlify headers and calls ipinfo.io for geo data
 */
export const getVisitorGeoData = createServerFn({ method: 'GET' }).handler(
  async (): Promise<VisitorGeoData | null> => {
    try {
      const request = await getRequest()

      // Get IP from Netlify headers or standard forwarded header
      let ip =
        request.headers.get('x-nf-client-connection-ip') ||
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.headers.get('x-real-ip') ||
        null

      // Fallback for local development: detect public IP via ipinfo.io
      if (!ip) {
        try {
          const ipRes = await fetch('https://ipinfo.io/ip')
          if (ipRes.ok) {
            ip = (await ipRes.text()).trim()
          }
        } catch {
          // Ignore fallback errors
        }
      }

      if (!ip) {
        return null
      }

      // Call ipinfo.io for geo resolution (free tier, no key needed for basic use)
      // If IPINFO_TOKEN env var is set, use it for higher rate limits
      const token = process.env.IPINFO_TOKEN
      const url = token
        ? `https://ipinfo.io/${ip}/json?token=${token}`
        : `https://ipinfo.io/${ip}/json`

      const res = await fetch(url)

      if (!res.ok) {
        console.error(`ipinfo.io request failed: ${res.status}`)
        return { ip, city: null, country: null, lat: null, lng: null }
      }

      const data = await res.json()

      // Parse location coordinates (format: "lat,lng")
      let lat: number | null = null
      let lng: number | null = null

      if (data.loc) {
        const [latStr, lngStr] = data.loc.split(',')
        lat = parseFloat(latStr) || null
        lng = parseFloat(lngStr) || null
      }

      return {
        ip,
        city: data.city || null,
        country: data.country || null,
        lat,
        lng,
      }
    } catch (error) {
      console.error('Failed to get visitor geo data:', error)
      return null
    }
  },
)
