import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  bookings: defineTable({
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    service: v.string(),
    date: v.string(),
    message: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
    notes: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_date", ["date"])
    .index("by_createdAt", ["createdAt"]),
});
