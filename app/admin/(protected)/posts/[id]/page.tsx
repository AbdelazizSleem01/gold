import { notFound } from "next/navigation"
import { getPostById } from "@/lib/blog"
import { PostForm } from "@/components/admin/post-form"

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPostById(id)
  if (!post) return notFound()

  return (
    <main className="max-w-3xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">تعديل المقال</h1>
        <p className="text-sm text-muted-foreground mt-1">{post.title}</p>
      </header>
      <PostForm
        mode="edit"
        initial={{
          _id: post._id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage,
          published: post.published,
        }}
      />
    </main>
  )
}
