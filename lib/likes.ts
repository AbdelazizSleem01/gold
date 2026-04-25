import "server-only"
import { getDb } from "./mongodb"

export interface PostLike {
  postSlug: string
  ipHash: string
  createdAt: Date
}

// Hash IP for privacy
function hashIp(ip: string): string {
  // Simple hash - in production use a proper hash function
  let hash = 0
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}

// Get total likes for a post
export async function getPostLikes(postSlug: string): Promise<number> {
  try {
    const db = await getDb()
    const count = await db.collection("likes").countDocuments({ postSlug })
    return count
  } catch (err) {
    console.error("[v0] getPostLikes error:", err)
    return 0
  }
}

// Check if user already liked
export async function hasUserLiked(postSlug: string, ip: string): Promise<boolean> {
  try {
    const db = await getDb()
    const ipHash = hashIp(ip)
    const exists = await db.collection("likes").findOne({ postSlug, ipHash })
    return !!exists
  } catch (err) {
    console.error("[v0] hasUserLiked error:", err)
    return false
  }
}

// Add like
export async function addLike(postSlug: string, ip: string): Promise<boolean> {
  try {
    const db = await getDb()
    const ipHash = hashIp(ip)

    // Check if already liked
    const exists = await db.collection("likes").findOne({ postSlug, ipHash })
    if (exists) return false

    await db.collection("likes").insertOne({
      postSlug,
      ipHash,
      createdAt: new Date(),
    })
    return true
  } catch (err) {
    console.error("[v0] addLike error:", err)
    return false
  }
}

// Remove like
export async function removeLike(postSlug: string, ip: string): Promise<boolean> {
  try {
    const db = await getDb()
    const ipHash = hashIp(ip)

    const result = await db.collection("likes").deleteOne({ postSlug, ipHash })
    return result.deletedCount > 0
  } catch (err) {
    console.error("[v0] removeLike error:", err)
    return false
  }
}
