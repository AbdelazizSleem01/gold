import Link from "next/link"
import { HeroSection } from "@/components/hero-section"
import { CountriesGrid } from "@/components/countries-grid"
import { GoldPricesCard } from "@/components/gold-prices-card"
import { getCountryBySlug, COUNTRIES } from "@/lib/countries"
import { Calculator, Store, Newspaper, Info, ArrowLeft, Gem, TrendingUp, Shield, Sparkles, Clock, Award, BarChart3, Heart } from "lucide-react"
import { getLatestPosts } from "@/lib/blog"

export const revalidate = 300 // 5 minutes

export default async function HomePage() {
  const defaultCountry = getCountryBySlug("egypt")!
  const latestPosts = await getLatestPosts(3)

  return (
    <main className="relative overflow-hidden">
      {/* Background animated glow effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 -left-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-primary/3 blur-3xl animate-pulse delay-500" />
        
        {/* Floating gold particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          >
            <Sparkles 
              className="h-1 w-1 text-primary/20" 
              style={{
                opacity: 0.1 + Math.random() * 0.3
              }}
            />
          </div>
        ))}
      </div>

      <HeroSection />

      {/* Featured prices - Premium Card */}
      <section className="relative mx-auto max-w-6xl px-4 py-16">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent opacity-0 animate-fade-in" />
        
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Gem className="h-6 w-6 text-primary animate-pulse" />
              <h2 className="font-serif text-2xl font-bold md:text-3xl bg-linear-to-l from-foreground to-primary bg-clip-text text-transparent">
                سعر الذهب اليوم
              </h2>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              عرض افتراضي لمصر - يتم تحديث الأسعار كل 5 دقائق
            </p>
          </div>
          <Link
            href={`/${defaultCountry.slug}`}
            className="group hidden items-center gap-1 text-sm font-medium text-primary transition-all hover:gap-2 md:inline-flex"
          >
            تفاصيل أكثر
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
        
        <div className="animate-slide-up">
          <GoldPricesCard country={defaultCountry} />
        </div>
      </section>

      {/* Countries grid */}
      <section id="countries" className="relative border-t border-border/60 bg-linear-to-b from-muted/30 to-background py-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-primary">أسعار لحظية محدثة</span>
            </div>
            <h2 className="font-serif text-3xl font-bold md:text-4xl bg-linear-to-l from-foreground to-primary bg-clip-text text-transparent">
              أسعار الذهب حسب الدولة
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-2xl mx-auto">
              اختر بلدك لعرض أسعار الذهب بالعملة المحلية والجرام والأونصة لعيارات مختلفة
            </p>
          </div>
          <div className="animate-slide-up animation-delay-100">
            <CountriesGrid />
          </div>
        </div>
      </section>

      {/* Quick tools */}
      <section className="relative mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-primary">أدوات متكاملة</span>
          </div>
          <h2 className="font-serif text-3xl font-bold md:text-4xl">أدوات سريعة</h2>
          <p className="mt-2 text-sm text-muted-foreground">كل ما تحتاجه لمتابعة الذهب في مكان واحد</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <ToolCard
            href="/zakat"
            icon={<Calculator className="h-6 w-6" aria-hidden="true" />}
            title="حاسبة زكاة الذهب"
            description="احسب زكاة ذهبك بدقة وفق النصاب الشرعي والسعر الحالي للذهب"
            gradient="from-primary/20 to-primary/20"
          />
          <ToolCard
            href="/shops"
            icon={<Store className="h-6 w-6" aria-hidden="true" />}
            title="محلات الذهب"
            description="دليل شامل لمحلات وصاغة الذهب في جميع الدول العربية مع التقييمات"
            gradient="from-primary/20 to-primary/20"
          />
          <ToolCard
            href="/blog"
            icon={<Newspaper className="h-6 w-6" aria-hidden="true" />}
            title="مدونة الذهب"
            description="مقالات وتحليلات حصرية عن سوق الذهب والاستثمار والنصائح العملية"
            gradient="from-primary/20 to-primary/20"
          />
        </div>
      </section>

      {/* Latest posts */}
      {latestPosts.length > 0 && (
        <section className="relative border-t border-border/60 bg-linear-to-t from-muted/30 to-background py-16">
          <div className="relative mx-auto max-w-6xl px-4">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Newspaper className="h-5 w-5 text-primary" />
                  <h2 className="font-serif text-2xl font-bold md:text-3xl">أحدث المقالات</h2>
                </div>
                <p className="text-sm text-muted-foreground">تحليلات ونصائح حصرية حول سوق الذهب</p>
              </div>
              <Link 
                href="/blog" 
                className="group inline-flex items-center gap-1 text-sm font-medium text-primary transition-all hover:gap-2"
              >
                كل المقالات
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              {latestPosts.map((post, idx) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group relative overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
                  style={{
                    animationDelay: `${idx * 100}ms`
                  }}
                >
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Cover Image */}
                  {post.coverImage && (
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />
                    </div>
                  )}
                  
                  <div className="relative p-5">
                    <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <time>
                        {new Date(post.createdAt).toLocaleDateString("ar", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    
                    <h3 className="mb-2 line-clamp-2 font-serif text-xl font-bold transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>
                    
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
                      <span>اقرأ المزيد</span>
                      <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Info section */}
      <section className="relative mx-auto max-w-6xl px-4 py-16">
        <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-card to-background p-8 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 md:p-10">
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:gap-8">
            <div className="group/icon relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl transition-all duration-500 group-hover/icon:scale-150" />
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-accent shadow-lg">
                <Info className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <h2 className="font-serif text-2xl font-bold md:text-3xl">عن أسعار الذهب في موقعنا</h2>
              
              <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p className="flex items-start gap-2">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  نعتمد على Metal Sentinel API لتوفير أسعار الذهب لحظية بالدولار الأمريكي، ثم نحوّل السعر إلى عملة كل
                  دولة عربية باستخدام أسعار الصرف المحدّثة.
                </p>
                <p className="flex items-start gap-2">
                  <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  تعرض أسعار الجرام لكافة العيارات الشائعة (24، 22، 21، 18، 14، 12، 10) والأونصة للعيارات الرئيسية.
                </p>
                <p className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  يتم تحديث الأسعار تلقائياً كل 5 دقائق. جميع الأسعار المعروضة هي أسعار استرشادية للذهب الخام ولا تشمل
                  المصنعية أو ضريبة القيمة المضافة.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs">
                  <Heart className="h-3 w-3 text-primary" />
                  <span>دقة عالية</span>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs">
                  <Clock className="h-3 w-3 text-primary" />
                  <span>تحديث لحظي</span>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs">
                  <Award className="h-3 w-3 text-primary" />
                  <span>موثوقية 99.9%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

function ToolCard({
  href,
  icon,
  title,
  description,
  gradient,
}: {
  href: string
  icon: React.ReactNode
  title: string
  description: string
  gradient?: string
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* Animated gradient background */}
      <div className={`absolute inset-0 bg-linear-to-br ${gradient || 'from-primary/10 to-accent/10'} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
      
      <div className="relative">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-accent/20 text-primary transition-all duration-500 group-hover:scale-110 group-hover:from-primary group-hover:to-accent group-hover:text-white">
          {icon}
        </div>
        
        <h3 className="mb-2 font-serif text-xl font-bold transition-colors group-hover:text-primary">
          {title}
        </h3>
        
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
          <span>ابدأ الآن</span>
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

// Suppress unused - used only if countries list needed elsewhere
void COUNTRIES