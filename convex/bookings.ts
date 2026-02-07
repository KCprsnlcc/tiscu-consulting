import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("pending"),
        v.literal("confirmed"),
        v.literal("completed"),
        v.literal("cancelled")
      )
    ),
  },
  handler: async (ctx, args) => {
    if (args.status) {
      return await ctx.db
        .query("bookings")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .collect();
    }
    return await ctx.db.query("bookings").order("desc").collect();
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("bookings").collect();
    const pending = all.filter((b) => b.status === "pending").length;
    const confirmed = all.filter((b) => b.status === "confirmed").length;
    const completed = all.filter((b) => b.status === "completed").length;
    const cancelled = all.filter((b) => b.status === "cancelled").length;
    return { total: all.length, pending, confirmed, completed, cancelled };
  },
});

export const getById = query({
  args: { id: v.id("bookings") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    service: v.string(),
    date: v.string(),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const bookingId = await ctx.db.insert("bookings", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
    });
    return bookingId;
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("bookings"),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});

export const updateNotes = mutation({
  args: {
    id: v.id("bookings"),
    notes: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      notes: args.notes,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("bookings") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
