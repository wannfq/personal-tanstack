import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  visitors: defineTable({
    visitorId: v.string(),
    timestamp: v.number(),
    ip: v.optional(v.string()),
    city: v.optional(v.string()),
    country: v.optional(v.string()),
    lat: v.optional(v.number()),
    lng: v.optional(v.number()),
    userAgent: v.optional(v.string()),
    deviceType: v.optional(
      v.union(v.literal('mobile'), v.literal('tablet'), v.literal('desktop')),
    ),
    referrer: v.optional(v.string()),
  })
    .index('by_visitor_id', ['visitorId'])
    .index('by_timestamp', ['timestamp'])
    .index('by_country', ['country'])
    .index('by_device_type', ['deviceType'])
    .index('by_referrer', ['referrer']),
})
