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

interface GeoData {
  city: string | null
  country: string | null
  loc: string | null
}

async function extractIP(headers: Headers): Promise<string | null> {
  let ip =
    headers.get('x-nf-client-connection-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    null

  if (!ip) {
    try {
      const ipRes = await fetch('https://ipinfo.io/ip')
      if (ipRes.ok) {
        ip = (await ipRes.text()).trim()
      }
    } catch {
      return null
    }
  }

  return ip
}

function extractUserAgent(headers: Headers): string | null {
  return headers.get('user-agent') || null
}

function extractReferrerHostname(referrer: string | null): string | null {
  if (!referrer) {
    return null
  }

  try {
    const referrerUrl = new URL(referrer)
    return referrerUrl.hostname
  } catch {
    return null
  }
}

function detectDeviceType(
  userAgent: string,
): 'mobile' | 'tablet' | 'desktop' | null {
  const parser = new UAParser(userAgent)
  const result = parser.getResult()
  const device = result.device.type

  if (device === 'mobile') {
    return 'mobile'
  }
  if (device === 'tablet') {
    return 'tablet'
  }
  return 'desktop'
}

function parseLocationCoordinates(loc: string): {
  lat: number | null
  lng: number | null
} {
  const [latStr, lngStr] = loc.split(',')
  const lat = parseFloat(latStr) || null
  const lng = parseFloat(lngStr) || null

  return { lat, lng }
}

async function fetchGeoLocation(ip: string): Promise<GeoData | null> {
  const token = process.env.IPINFO_TOKEN
  const url = token
    ? `https://ipinfo.io/${ip}/json?token=${token}`
    : `https://ipinfo.io/${ip}/json`

  try {
    const res = await fetch(url)

    if (!res.ok) {
      console.error(`ipinfo.io request failed: ${res.status}`)
      return null
    }

    const data = await res.json()

    return {
      city: data.city || null,
      country: data.country || null,
      loc: data.loc || null,
    }
  } catch (error) {
    console.error('Failed to fetch geo location:', error)
    return null
  }
}

/**
 * Get visitor's IP address, geographic location, and device type
 * Reads IP and user-agent from request headers
 * Calls ipinfo.io for geo resolution and ua-parser-js for device detection
 */
export const getVisitorData = createServerFn({ method: 'GET' })
  .inputValidator((data: { referrer?: string | null } | undefined) => ({
    referrer: data?.referrer ?? null,
  }))
  .handler(async ({ referrer }): Promise<VisitorData | null> => {
    try {
      const request = getRequest()
      const headers = request.headers

      const userAgent = extractUserAgent(headers)
      const referrerHostname = extractReferrerHostname(referrer)
      const ip = await extractIP(headers)

      if (!ip) {
        return null
      }

      const deviceType = userAgent ? detectDeviceType(userAgent) : null
      const geoData = await fetchGeoLocation(ip)
      const { lat, lng } = geoData?.loc
        ? parseLocationCoordinates(geoData.loc)
        : { lat: null, lng: null }

      return {
        ip,
        city: geoData?.city || null,
        country: geoData?.country || null,
        lat,
        lng,
        deviceType,
        userAgent,
        referrer: referrerHostname,
      }
    } catch (error) {
      console.error('Failed to get visitor data:', error)
      return null
    }
  })
