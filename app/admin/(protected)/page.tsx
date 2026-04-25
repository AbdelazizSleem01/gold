import Link from "next/link"
import { getDb } from "@/lib/mongodb"
import { Newspaper, Store, Mail, ArrowLeft, Eye, EyeOff } from "lucide-react"

async function getStats() {
  try {
    const db = await getDb()
    const [posts, publishedPosts, shops, messages, unread] = await Promise.all([
      db.collection("posts").countDocuments(),
      db.collection("posts").countDocuments({ published: true }),
      db.collection("shops").countDocuments(),
      db.collection("messages").countDocuments(),
      db.collection("messages").countDocuments({ read: false }),
    ])
    return { posts, publishedPosts, shops, messages, unread }
  } catch (err) {
    console.error("[v0] dashboard stats error:", err)
    return { posts: 0, publishedPosts: 0, shops: 0, messages: 0, unread: 0 }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold">مرحباً بك في لوحة التحكم</h1>
        <p className="mt-1 text-sm text-muted-foreground">إدارة المقالات ومحلات الذهب والرسائل الواردة</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={<Newspaper className="h-5 w-5" aria-hidden="true" />}
          title="المقالات"
          main={stats.posts.toString()}
          sub={`${stats.publishedPosts} منشور - ${stats.posts - stats.publishedPosts} مسودة`}
          href="/admin/posts"
        />
        <StatCard
          icon={<Store className="h-5 w-5" aria-hidden="true" />}
          title="محلات الذهب"
          main={stats.shops.toString()}
          sub="في جميع الدول"
          href="/admin/shops"
        />
        <StatCard
          icon={<Mail className="h-5 w-5" aria-hidden="true" />}
          title="الرسائل"
          main={stats.messages.toString()}
          sub={stats.unread > 0 ? `${stats.unread} غير مقروءة` : "كل الرسائل مقروءة"}
          href="/admin/messages"
          highlight={stats.unread > 0}
        />
      </div>

      <section className="mt-10">
        <h2 className="mb-4 font-serif text-xl font-bold">إجراءات سريعة</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <QuickAction
            href="/admin/posts/new"
            icon={<Newspaper className="h-5 w-5" aria-hidden="true" />}
            title="كتابة مقال جديد"
            description="انشر مقالاً في المدونة"
          />
          <QuickAction
            href="/admin/shops/new"
            icon={<Store className="h-5 w-5" aria-hidden="true" />}
            title="إضافة محل ذهب"
            description="أضف محلاً جديداً إلى الدليل"
          />
        </div>
      </section>
    </div>
  )
}

function StatCard({
  icon,
  title,
  main,
  sub,
  href,
  highlight,
}: {
  icon: React.ReactNode
  title: string
  main: string
  sub: string
  href: string
  highlight?: boolean
}) {
  return (
    <Link
      href={href}
      className={`group flex flex-col gap-3 rounded-xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg ${
        highlight ? "border-primary/40 bg-primary/5" : "border-border/60 bg-card hover:border-primary/40"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
          {icon}
        </div>
        <ArrowLeft
          className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-x-1 group-hover:text-primary"
          aria-hidden="true"
        />
      </div>
      <div>
        <div className="font-mono text-3xl font-bold tabular-nums">{main}</div>
        <div className="font-serif text-sm font-semibold">{title}</div>
        <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
      </div>
    </Link>
  )
}

function QuickAction({
  href,
  icon,
  title,
  description,
}: {
  href: string
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
          {icon}
        </div>
        <div>
          <div className="font-serif text-sm font-semibold">{title}</div>
          <div className="text-xs text-muted-foreground">{description}</div>
        </div>
      </div>
      <ArrowLeft
        className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-x-1 group-hover:text-primary"
        aria-hidden="true"
      />
    </Link>
  )
}

// suppress unused
void Eye
void EyeOff
