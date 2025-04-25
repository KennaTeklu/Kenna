import { type NextRequest, NextResponse } from "next/server"

// Simple in-memory store for rate limiting
// In production, use Redis or another distributed cache
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>()

export function rateLimiter(
  request: NextRequest,
  maxRequests = 100,
  windowMs = 60 * 1000, // 1 minute
) {
  const ip = request.ip || "unknown"
  const now = Date.now()

  // Get or initialize request count data for this IP
  let data = ipRequestCounts.get(ip)
  if (!data || now > data.resetTime) {
    data = { count: 0, resetTime: now + windowMs }
    ipRequestCounts.set(ip, data)
  }

  // Increment request count
  data.count++

  // Check if rate limit is exceeded
  if (data.count > maxRequests) {
    return NextResponse.json({ error: "Too many requests, please try again later" }, { status: 429 })
  }

  // Clean up old entries periodically
  if (ipRequestCounts.size > 10000) {
    const oldEntries = [...ipRequestCounts.entries()].filter(([_, data]) => now > data.resetTime)

    for (const [key] of oldEntries) {
      ipRequestCounts.delete(key)
    }
  }

  return null // No rate limit exceeded
}
