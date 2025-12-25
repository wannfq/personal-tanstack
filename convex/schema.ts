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
  })
    .index('by_visitor_id', ['visitorId'])
    .index('by_timestamp', ['timestamp'])
    .index('by_country', ['country']),
})
