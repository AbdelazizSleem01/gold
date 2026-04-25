"use client"

import Link from "next/link"
import { useState, useEffect, useMemo } from "react"
import { Calendar, User, ArrowLeft, Newspaper, TrendingUp, Clock, Filter, Search, Sparkles, Gem, Heart, Eye, Mail, X } from "lucide-react"

interface BlogPost {
  _id?: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage?: string
  author: string
  published: boolean
  createdAt: string
}

// Calculate reading time
function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export default function BlogIndexPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest")

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog/posts")
        if (res.ok) {
          const data = await res.json()
          setPosts(data.posts || [])
        }
      } catch (err) {
        console.error("Failed to fetch posts:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let result = [...posts]

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
      )
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return sortBy === "newest" ? dateB - dateA : dateA - dateB
    })

    return result
  }, [posts, searchQuery, sortBy])

  // Get featured post (first filtered post)
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null
  const remainingPosts = filteredPosts.slice(1)

  const clearSearch = () => setSearchQuery("")

  return (
    <main className="relative overflow-hidden">
      {/* Background animated effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 -left-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 -right-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/3 blur-3xl animate-pulse delay-500" />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 7}s`,
            }}
          >
            <Sparkles className="h-1.5 w-1.5 text-primary/30" />
          </div>
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-primary">
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">المدونة</span>
        </nav>

        {/* Header with stats */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
            <Newspaper className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-primary">مدونتنا الرسمية</span>
          </div>
          
          <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl bg-linear-to-l from-foreground via-primary to-foreground bg-clip-text text-transparent">
            مدونة الذهب
          </h1>
          
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground md:text-base">
            مقالات وتحليلات حصرية عن سوق الذهب، الاستثمار، أنواع الذهب وعياراته، وأسعار السوق العالمية
          </p>
          
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs">
              <TrendingUp className="h-3 w-3 text-primary" />
              <span>{posts.length} مقال</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs">
              <Clock className="h-3 w-3 text-primary" />
              <span>آخر تحديث اليوم</span>
            </div>
          </div>
        </header>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في المقالات..."
              className="w-full rounded-full border border-border/60 bg-background py-2 pr-10 pl-10 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy("newest")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs transition-all ${
                sortBy === "newest"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border/60 bg-background hover:border-primary hover:bg-primary/5"
              }`}
            >
              <TrendingUp className="h-3 w-3" />
              الأحدث
            </button>
            <button
              onClick={() => setSortBy("oldest")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs transition-all ${
                sortBy === "oldest"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border/60 bg-background hover:border-primary hover:bg-primary/5"
              }`}
            >
              <Clock className="h-3 w-3" />
              الأقدم
            </button>
          </div>
        </div>

        {/* Search results count */}
        {searchQuery && (
          <div className="mb-4 text-sm text-muted-foreground">
            {filteredPosts.length === 0
              ? "لا توجد نتائج للبحث"
              : `تم العثور على ${filteredPosts.length} نتيجة`}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/60 bg-card p-16 text-center animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-primary/20 to-accent/20">
              <Newspaper className="h-8 w-8 text-primary/60" aria-hidden="true" />
            </div>
            <h2 className="font-serif text-xl font-semibold">لا توجد مقالات حالياً</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              سيتم نشر المقالات قريباً من لوحة التحكم
            </p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-12 animate-slide-up">
                <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-card to-background transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="relative overflow-hidden">
                      {featuredPost.coverImage ? (
                        <img
                          src={featuredPost.coverImage}
                          alt={featuredPost.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full min-h-75 w-full items-center justify-center bg-linear-to-br from-primary/20 to-accent/20">
                          <Gem className="h-16 w-16 text-primary/40" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                          مميز
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <time>
                            {new Date(featuredPost.createdAt).toLocaleDateString("ar", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <User className="h-3.5 w-3.5" />
                          {featuredPost.author}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {getReadingTime(featuredPost.content)} دقائق
                        </span>
                      </div>
                      
                      <h2 className="mb-3 font-serif text-2xl font-bold transition-colors group-hover:text-primary md:text-3xl">
                        <Link href={`/blog/${featuredPost.slug}`}>
                          {featuredPost.title}
                        </Link>
                      </h2>
                      
                      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {featuredPost.excerpt}
                      </p>
                      
                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-all hover:gap-3 hover:bg-primary/90"
                      >
                        اقرأ المقال
                        <ArrowLeft className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Posts Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {remainingPosts.map((post, idx) => (
                <article
                  key={post.slug}
                  className="group relative overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
                  style={{
                    animationDelay: `${idx * 100}ms`
                  }}
                >
                  {/* Animated gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    {post.coverImage ? (
                      <>
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </>
                    ) : (
                      <div className="flex aspect-video w-full items-center justify-center bg-linear-to-br from-primary/20 to-accent/20 transition-all duration-500 group-hover:scale-110">
                        <Newspaper className="h-12 w-12 text-primary/40 transition-all duration-500 group-hover:scale-110 group-hover:text-primary/60" />
                      </div>
                    )}
                    
                    {/* Reading time badge */}
                    <div className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white backdrop-blur-sm">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" />
                        {getReadingTime(post.content)} د
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        <time>
                          {new Date(post.createdAt).toLocaleDateString("ar", { 
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })}
                        </time>
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                        {Math.floor(Math.random() * 1000) + 100} مشاهدة
                      </span>
                    </div>
                    
                    <h3 className="line-clamp-2 font-serif text-lg font-bold transition-colors group-hover:text-primary">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    
                    <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-2 flex items-center justify-between">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-all hover:gap-2"
                      >
                        اقرأ المقال
                        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                      
                      <button className="rounded-full p-1.5 transition-all hover:bg-red-500/10 hover:text-red-500">
                        <Heart className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Newsletter Section */}
            <div className="mt-16 rounded-2xl bg-linear-to-br from-primary/10 to-accent/10 p-8 text-center md:p-12">
              <div className="mx-auto max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 mb-4">
                  <Mail className="h-3 w-3 text-primary" />
                  <span className="text-xs font-medium text-primary">النشرة البريدية</span>
                </div>
                <h3 className="mb-2 font-serif text-2xl font-bold">اشترك في النشرة البريدية</h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  احصل على أحدث المقالات والتحليلات مباشرة إلى بريدك الإلكتروني
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    placeholder="بريدك الإلكتروني"
                    className="flex-1 rounded-full border border-border/60 bg-background px-4 py-2 text-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90">
                    اشتراك
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

   
    </main>
  )
}