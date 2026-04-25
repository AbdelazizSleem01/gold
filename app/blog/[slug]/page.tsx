import Link from "next/link"
import { notFound } from "next/navigation"
import { getPostBySlug, getLatestPosts } from "@/lib/blog"
import { Calendar, User, ArrowLeft, Newspaper, Tag, Clock, BookOpen } from "lucide-react"
import { PostActions } from "@/components/blog/post-actions"
import type { Metadata } from "next"

export const revalidate = 60

// TinyMCE content is already safe HTML, no need to sanitize
// Just ensure proper rendering

// Format reading time
function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: "المقال غير موجود" }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post || !post.published) notFound()

  const [related] = await Promise.all([getLatestPosts(4)])
  const relatedPosts = related.filter((p) => p.slug !== post.slug).slice(0, 3)
  
  const readingTime = getReadingTime(post.content)

  return (
    <main className="relative mx-auto px-12 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-8 flex flex-wrap items-end gap-2 text-sm text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-primary">
          الرئيسية
        </Link>
        <span>/</span>
        <Link href="/blog" className="transition-colors hover:text-primary">
          المدونة
        </Link>
        <span>/</span>
        <span className="line-clamp-1 text-foreground">{post.title}</span>
      </nav>

      <article className="relative  max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Tag className="h-3 w-3" />
              مقال
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              <Clock className="h-3 w-3" />
              {readingTime} دقائق قراءة
            </span>
          </div>
          
          <h1 className="mb-6 text-balance font-serif text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={new Date(post.createdAt).toISOString()}>
                {new Date(post.createdAt).toLocaleDateString("ar", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </span>
            <span className="inline-flex items-center gap-2">
              <User className="h-4 w-4" aria-hidden="true" />
              {post.author || "فريق التحرير"}
            </span>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="group relative mb-12 overflow-hidden rounded-2xl shadow-xl">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-auto w-full transform object-contain transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          </div>
        )}

        {/* Content - Render TinyMCE HTML exactly as written */}
        <div 
          className="
            prose prose-lg max-w-none leading-loose
            prose-headings:font-serif 
            prose-headings:text-foreground 
            prose-h1:text-4xl prose-h1:mb-6
            prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8
            prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6
            prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-4
            prose-p:text-foreground/90 
            prose-p:leading-[1.9]
            prose-p:mb-5
            prose-a:text-primary 
            prose-a:no-underline 
            prose-a:transition-colors 
            prose-a:hover:text-primary/80 
            prose-a:hover:underline
            prose-strong:text-primary prose-strong:font-semibold
            prose-em:italic
            prose-ul:list-disc prose-ul:mr-6 prose-ul:space-y-2
            prose-ol:list-decimal prose-ol:mr-6 prose-ol:space-y-2
            prose-li:text-foreground/90 prose-li:leading-relaxed
            prose-blockquote:border-r-4 prose-blockquote:border-primary
            prose-blockquote:bg-primary/5 
            prose-blockquote:px-6 prose-blockquote:py-4 
            prose-blockquote:rounded-lg
            prose-blockquote:italic prose-blockquote:text-foreground/80
            prose-img:rounded-xl prose-img:shadow-md prose-img:my-6 prose-img:mx-auto
            prose-figure:my-6
            prose-figcaption:text-sm prose-figcaption:text-muted-foreground prose-figcaption:text-center prose-figcaption:mt-2
            prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 
            prose-code:rounded-md prose-code:text-sm prose-code:text-primary prose-code:font-mono
            prose-pre:bg-muted prose-pre:rounded-xl prose-pre:p-4 prose-pre:overflow-x-auto
            prose-table:border-collapse prose-table:w-full prose-table:my-6
            prose-th:border prose-th:border-border prose-th:bg-muted prose-th:p-3 prose-th:font-semibold prose-th:text-right
            prose-td:border prose-td:border-border prose-td:p-3 prose-td:text-right
            prose-hr:border-border prose-hr:my-8
            dark:prose-invert
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Post Actions - Client Component */}
        <PostActions slug={post.slug} title={post.title} />
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 border-t border-border/60 pt-12">
          <div className="mb-8 text-center">
            <h2 className="font-serif text-2xl font-bold md:text-3xl">مقالات ذات صلة</h2>
            <p className="mt-2 text-sm text-muted-foreground">قد تهمك أيضاً هذه المقالات</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {relatedPosts.map((p, idx) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                style={{
                  animationDelay: `${idx * 100}ms`
                }}
              >
                <div className="relative">
                  <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <Newspaper className="h-3 w-3 text-primary" aria-hidden="true" />
                    <span>مقال</span>
                  </div>
                  
                  <h3 className="mb-2 line-clamp-2 font-serif text-base font-semibold transition-colors group-hover:text-primary">
                    {p.title}
                  </h3>
                  
                  <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {p.excerpt}
                  </p>
                  
                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                    <span>اقرأ المقال</span>
                    <ArrowLeft className="h-3 w-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}