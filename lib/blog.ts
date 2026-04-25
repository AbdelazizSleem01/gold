import "server-only"
import { getDb } from "./mongodb"
import { ObjectId } from "mongodb"

export interface BlogPost {
  _id?: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  coverImage?: string
  published: boolean
  createdAt: Date
  updatedAt: Date
}

function serialize(doc: any): BlogPost {
  return {
    ...doc,
    _id: doc._id?.toString(),
    createdAt: new Date(doc.createdAt),
    updatedAt: new Date(doc.updatedAt),
  }
}

export async function getLatestPosts(limit = 6): Promise<BlogPost[]> {
  try {
    const db = await getDb()
    const posts = await db
      .collection("posts")
      .find({ published: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray()
    return posts.map(serialize)
  } catch (err) {
    console.error("[v0] getLatestPosts error:", err)
    return []
  }
}

export async function getAllPosts(includeUnpublished = false): Promise<BlogPost[]> {
  try {
    const db = await getDb()
    const filter = includeUnpublished ? {} : { published: true }
    const posts = await db.collection("posts").find(filter).sort({ createdAt: -1 }).toArray()
    return posts.map(serialize)
  } catch (err) {
    console.error("[v0] getAllPosts error:", err)
    return []
  }
}

export async function listPosts(opts: {
  publishedOnly?: boolean
  limit?: number
} = {}): Promise<BlogPost[]> {
  try {
    const db = await getDb()
    const filter = opts.publishedOnly ? { published: true } : {}
    const cursor = db.collection("posts").find(filter).sort({ createdAt: -1 })
    if (opts.limit) cursor.limit(opts.limit)
    const posts = await cursor.toArray()
    return posts.map(serialize)
  } catch (err) {
    console.error("[v0] listPosts error:", err)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const db = await getDb()
    const post = await db.collection("posts").findOne({ slug })
    return post ? serialize(post) : null
  } catch (err) {
    console.error("[v0] getPostBySlug error:", err)
    return null
  }
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  try {
    const db = await getDb()
    const post = await db.collection("posts").findOne({ _id: new ObjectId(id) })
    return post ? serialize(post) : null
  } catch (err) {
    console.error("[v0] getPostById error:", err)
    return null
  }
}

export async function createPost(data: Omit<BlogPost, "_id" | "createdAt" | "updatedAt">): Promise<string> {
  const db = await getDb()
  const now = new Date()
  const result = await db.collection("posts").insertOne({
    ...data,
    createdAt: now,
    updatedAt: now,
  })
  return result.insertedId.toString()
}

export async function updatePost(
  id: string,
  data: Partial<Omit<BlogPost, "_id" | "createdAt">>,
): Promise<void> {
  const db = await getDb()
  await db.collection("posts").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...data,
        updatedAt: new Date(),
      },
    },
  )
}

export async function deletePost(id: string): Promise<void> {
  const db = await getDb()
  await db.collection("posts").deleteOne({ _id: new ObjectId(id) })
}
