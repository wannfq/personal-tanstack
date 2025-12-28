/**
 * Server-side functions for visitor tracking
 * Uses ipinfo.io to resolve IP addresses to geographic data
 * Uses ua-parser-js to detect device type from user-agent
 */

import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { UAParser } from 'ua-parser-js'

export interface VisitorData {
  ip: string
  city: string | null
  country: string | null
  lat: number | null
  lng: number | null
  deviceType: 'mobile' | 'tablet' | 'desktop' | null
  userAgent: string | null
  referrer: string | null
}

/**
 * Get visitor's IP address, geographic location, and device type
 * Reads IP and user-agent from request headers
 * Calls ipinfo.io for geo resolution and ua-parser-js for device detection
 */
export const getVisitorData = createServerFn({ method: 'GET' }).handler(
  async (): Promise<VisitorData | null> => {
    try {
      const request = await getRequest()

      // Get IP from Netlify headers or standard forwarded header
      let ip =
        request.headers.get('x-nf-client-connection-ip') ||
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        request.headers.get('x-real-ip') ||
        null

      // Get user-agent from request headers
      const userAgent = request.headers.get('user-agent') || null

      // Extract referrer from Referer header
      let referrer = null
      const referrerHeader = request.headers.get('Referer')
      const hostHeader = request.headers.get('host')

      // Skip debug logs for internal requests
      const isInternalRequest =
        referrerHeader &&
        hostHeader &&
        new URL(referrerHeader).hostname ===
          new URL(`http://${hostHeader}`).hostname

      if (!isInternalRequest && referrerHeader) {
        console.log('🔍 Debug - Referer header:', referrerHeader)
        console.log('🔍 Debug - Host header:', hostHeader)
        console.log(
          '🔍 Debug - sec-fetch-site:',
          request.headers.get('sec-fetch-site'),
        )
      }

      if (referrerHeader) {
        try {
          const referrerUrl = new URL(referrerHeader)
          referrer = referrerUrl.hostname
          if (!isInternalRequest) {
            console.log('✅ Extracted referrer hostname:', referrer)
          }
        } catch {
          if (!isInternalRequest) {
            console.log('❌ Invalid referrer URL:', referrerHeader)
          }
        }
      } else {
        if (!isInternalRequest) {
          console.log('ℹ️ No Referer header found')
        }
      }

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

      // Parse user-agent to detect device type
      let deviceType: 'mobile' | 'tablet' | 'desktop' | null = null
      if (userAgent) {
        const parser = new UAParser(userAgent)
        const result = parser.getResult()
        const device = result.device.type

        if (device === 'mobile') {
          deviceType = 'mobile'
        } else if (device === 'tablet') {
          deviceType = 'tablet'
        } else {
          deviceType = 'desktop'
        }
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
        return {
          ip,
          city: null,
          country: null,
          lat: null,
          lng: null,
          deviceType,
          userAgent,
          referrer,
        }
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
        deviceType,
        userAgent,
        referrer,
      }
    } catch (error) {
      console.error('Failed to get visitor data:', error)
      return null
    }
  },
)
