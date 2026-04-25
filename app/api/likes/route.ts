import { NextRequest, NextResponse } from "next/server"
import { getPostLikes, hasUserLiked, addLike, removeLike } from "@/lib/likes"

// Get like count for a post
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const postSlug = searchParams.get("slug")

    if (!postSlug) {
      return NextResponse.json({ error: "Missing post slug" }, { status: 400 })
    }

    // Get client IP
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
               request.headers.get("x-real-ip") ||
               "unknown"

    const [count, hasLiked] = await Promise.all([
      getPostLikes(postSlug),
      hasUserLiked(postSlug, ip),
    ])

    return NextResponse.json({ count, hasLiked })
  } catch (err) {
    console.error("[API] Likes GET error:", err)
    return NextResponse.json({ error: "Failed to get likes" }, { status: 500 })
  }
}

// Toggle like for a post
export async function POST(request: NextRequest) {
  try {
    const { slug: postSlug, action } = await request.json()

    if (!postSlug || !action) {
      return NextResponse.json({ error: "Missing slug or action" }, { status: 400 })
    }

    // Get client IP
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
               request.headers.get("x-real-ip") ||
               "unknown"

    let success: boolean
    if (action === "like") {
      success = await addLike(postSlug, ip)
    } else if (action === "unlike") {
      success = await removeLike(postSlug, ip)
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    // Get updated count
    const count = await getPostLikes(postSlug)

    return NextResponse.json({ success, count })
  } catch (err) {
    console.error("[API] Likes POST error:", err)
    return NextResponse.json({ error: "Failed to update like" }, { status: 500 })
  }
}
