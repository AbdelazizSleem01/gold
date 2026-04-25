"use server"

import { revalidatePath } from "next/cache"
import {
  createPost as dbCreatePost,
  updatePost as dbUpdatePost,
  deletePost as dbDeletePost,
  getPostBySlug,
} from "@/lib/blog"
import { slugify } from "@/lib/slugify"
import { requireAdmin } from "@/lib/auth"

type PostInput = {
  title: string
  slug?: string
  excerpt?: string
  content: string
  coverImage?: string
  published: boolean
}

function buildUniqueSlug(base: string) {
  const cleaned = slugify(base)
  return cleaned || `post-${Date.now()}`
}

export async function createPost(data: PostInput) {
  await requireAdmin()
  if (!data.title?.trim()) throw new Error("العنوان مطلوب")
  if (!data.content?.trim()) throw new Error("المحتوى مطلوب")

  let slug = buildUniqueSlug(data.slug?.trim() || data.title)

  // Ensure uniqueness
  let suffix = 1
  while (await getPostBySlug(slug)) {
    slug = `${buildUniqueSlug(data.slug?.trim() || data.title)}-${suffix++}`
    if (suffix > 50) break
  }

  const id = await dbCreatePost({
    title: data.title.trim(),
    slug,
    excerpt: data.excerpt?.trim() || "",
    content: data.content.trim(),
    author: "المحرر",
    coverImage: data.coverImage?.trim() || undefined,
    published: data.published,
  })

  revalidatePath("/blog")
  revalidatePath("/")
  revalidatePath("/admin/posts")
  return id
}

export async function updatePost(id: string, data: PostInput) {
  await requireAdmin()
  if (!id) throw new Error("معرّف المقال مفقود")
  if (!data.title?.trim()) throw new Error("العنوان مطلوب")
  if (!data.content?.trim()) throw new Error("المحتوى مطلوب")

  const slug = buildUniqueSlug(data.slug?.trim() || data.title)

  await dbUpdatePost(id, {
    title: data.title.trim(),
    slug,
    excerpt: data.excerpt?.trim() || "",
    content: data.content.trim(),
    coverImage: data.coverImage?.trim() || undefined,
    published: data.published,
  })

  revalidatePath("/blog")
  revalidatePath(`/blog/${slug}`)
  revalidatePath("/")
  revalidatePath("/admin/posts")
}

export async function deletePost(id: string) {
  await requireAdmin()
  await dbDeletePost(id)
  revalidatePath("/blog")
  revalidatePath("/")
  revalidatePath("/admin/posts")
}
