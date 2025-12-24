import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  visitors: defineTable({
    visitorId: v.string(),
    timestamp: v.number(),
  })
    .index('by_visitor_id', ['visitorId'])
    .index('by_timestamp', ['timestamp']),
})
