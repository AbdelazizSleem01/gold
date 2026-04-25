import { NextResponse } from "next/server"
import { getAllPosts } from "@/lib/blog"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const posts = await getAllPosts(false)
    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Failed to fetch posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    )
  }
}
