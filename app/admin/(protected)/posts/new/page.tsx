import { PostForm } from "@/components/admin/post-form"

export default function NewPostPage() {
  return (
    <main className="max-w-3xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">مقال جديد</h1>
        <p className="text-sm text-muted-foreground mt-1">
          أضف مقالاً جديداً إلى المدونة.
        </p>
      </header>
      <PostForm mode="create" />
    </main>
  )
}
