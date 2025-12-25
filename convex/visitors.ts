import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getVisitorCount = query({
  handler: async (ctx) => {
    const visitors = await ctx.db.query('visitors').collect()
    const uniqueVisitors = new Set(visitors.map((visitor) => visitor.visitorId))
    return uniqueVisitors.size
  },
})

export const recordVisit = mutation({
  args: {
    visitorId: v.string(),
    ip: v.optional(v.string()),
    city: v.optional(v.string()),
    country: v.optional(v.string()),
    lat: v.optional(v.number()),
    lng: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const existingVisitor = await ctx.db
      .query('visitors')
      .withIndex('by_visitor_id', (q) => q.eq('visitorId', args.visitorId))
      .first()

    if (!existingVisitor) {
      // New visitor - insert with geo data
      await ctx.db.insert('visitors', {
        visitorId: args.visitorId,
        timestamp: Date.now(),
        ip: args.ip,
        city: args.city,
        country: args.country,
        lat: args.lat,
        lng: args.lng,
      })
    } else if (!existingVisitor.lat && args.lat) {
      // Existing visitor without geo data - update with geo data
      await ctx.db.patch(existingVisitor._id, {
        ip: args.ip,
        city: args.city,
        country: args.country,
        lat: args.lat,
        lng: args.lng,
      })
    }
  },
})

export interface VisitorLocation {
  city: string
  country: string
  lat: number
  lng: number
  count: number
}

export const getVisitorLocations = query({
  handler: async (ctx): Promise<Array<VisitorLocation>> => {
    const visitors = await ctx.db.query('visitors').collect()

    // Aggregate visitors by location
    const locationMap = new Map<string, VisitorLocation>()

    for (const visitor of visitors) {
      // Skip visitors without valid geo data
      if (!visitor.lat || !visitor.lng || !visitor.city || !visitor.country) {
        continue
      }

      const key = `${visitor.city}-${visitor.country}`
      const existing = locationMap.get(key)

      if (existing) {
        existing.count += 1
      } else {
        locationMap.set(key, {
          city: visitor.city,
          country: visitor.country,
          lat: visitor.lat,
          lng: visitor.lng,
          count: 1,
        })
      }
    }

    return Array.from(locationMap.values())
  },
})
