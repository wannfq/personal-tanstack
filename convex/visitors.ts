import { v as vString } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getVisitorCount = query({
  handler: async (ctx) => {
    const visitors = await ctx.db.query('visitors').collect()
    const uniqueVisitors = new Set(visitors.map((v) => v.visitorId))
    return uniqueVisitors.size
  },
})

export const recordVisit = mutation({
  args: { visitorId: vString.string() },
  handler: async (ctx, args) => {
    const existingVisitor = await ctx.db
      .query('visitors')
      .withIndex('by_visitor_id', (q) => q.eq('visitorId', args.visitorId))
      .first()

    if (!existingVisitor) {
      await ctx.db.insert('visitors', {
        visitorId: args.visitorId,
        timestamp: Date.now(),
      })
    }
  },
})
