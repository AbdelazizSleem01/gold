import { notFound } from "next/navigation"
import Link from "next/link"
import { COUNTRIES, getCountryBySlug } from "@/lib/countries"
import { GoldPricesCard } from "@/components/gold-prices-card"
import { OuncePricesCard } from "@/components/ounce-prices-card"
import { getGoldPricesForCountry } from "@/lib/gold-price"
import { getShopsByCountry } from "@/lib/shops"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Store, ArrowLeft, Calculator, TrendingUp, Gem, Clock, MapPin, Phone, Award, Shield, Sparkles } from "lucide-react"
import type { Metadata } from "next"

export const revalidate = 300

export function generateStaticParams() {
  return COUNTRIES.map((c) => ({ country: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>
}): Promise<Metadata> {
  const { country } = await params
  const data = getCountryBySlug(country)
  if (!data) return { title: "الدولة غير موجودة" }
  return {
    title: `سعر الذهب اليوم في ${data.name} - جميع العيارات`,
    description: `أحدث أسعار الذهب في ${data.name} بعملة ${data.currencyName} لجميع العيارات 24، 22، 21، 18 بالجرام والأونصة.`,
    openGraph: {
      title: `سعر الذهب اليوم في ${data.name}`,
      description: `تعرف على أسعار الذهب لحظياً في ${data.name} بجميع العيارات`,
      images: [`https://flagcdn.com/w1200/${data.isoCode.toLowerCase()}.png`],
    },
  }
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country: slug } = await params
  const country = getCountryBySlug(slug)
  if (!country) notFound()

  const [prices, shops] = await Promise.all([getGoldPricesForCountry(country), getShopsByCountry(slug)])

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("ar", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(n)

  // Convert USD to local currency for ounce
  const ouncePriceLocal = prices.ouncePriceUSD * (prices.karats[24] / prices.ouncePriceUSD)

  return (
    <main className="relative overflow-hidden">
      {/* Background animated effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 -left-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 -right-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/3 blur-3xl animate-pulse delay-500" />
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-country"
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
          <Link href="/#countries" className="transition-colors hover:text-primary">
            الدول
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{country.name}</span>
        </nav>

        {/* Header with country info */}
        <header className="mb-10 rounded-2xl border border-border/60 bg-linear-to-br from-card to-background p-6 shadow-lg md:p-8 animate-slide-up">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/20 to-accent/20 blur-xl" />
                <img
                  src={`https://flagcdn.com/w40/${country.isoCode.toLowerCase()}.png`}
                  alt={country.name}
                  className="relative h-20 w-28 rounded-2xl object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 mb-2">
                  <Gem className="h-3 w-3 text-primary" />
                  <span className="text-xs font-medium text-primary">أسعار لحظية محدثة</span>
                </div>
                <h1 className="font-serif text-3xl font-bold md:text-4xl lg:text-5xl">
                  أسعار الذهب في {country.name}
                </h1>
                <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    العملة المحلية: {country.currencyName} ({country.currencyCode})
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    تحديث كل 5 دقائق
                  </span>
                </p>
              </div>
            </div>
            
            <div className="rounded-xl border border-border/60 bg-linear-to-br from-primary/5 to-accent/5 px-6 py-4 text-center">
              <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                <TrendingUp className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                <span>سعر الأونصة العالمي</span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-mono text-2xl font-bold text-primary tabular-nums">
                  ${formatPrice(prices.ouncePriceUSD)}
                </span>
                <span className="text-xs text-muted-foreground">USD</span>
              </div>
              
            </div>
          </div>
        </header>

        {/* Prices grid */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8 animate-slide-up">
          <div className="transform transition-all duration-300 hover:scale-[1.02]">
            <GoldPricesCard country={country} />
          </div>
          <div className="transform transition-all duration-300 hover:scale-[1.02]">
            <OuncePricesCard country={country} />
          </div>
        </div>

        {/* Summary / quick facts */}
        <section className="mb-8 animate-slide-up [animation-delay:0.2s]">
          <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-serif text-xl">
                <Award className="h-5 w-5 text-primary" />
                ملخص أسعار الذهب اليوم في {country.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                بلغ سعر جرام الذهب عيار 24 اليوم في {country.name} حوالي{" "}
                <strong className="font-mono font-semibold text-foreground">
                  {formatPrice(prices.karats[24])} {country.currencyCode}
                </strong>
              </p>
              <p className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                بينما سجّل جرام عيار 21 نحو{" "}
                <strong className="font-mono font-semibold text-foreground">
                  {formatPrice(prices.karats[21])} {country.currencyCode}
                </strong>
              </p>
              <p className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                وجاء جرام عيار 18 عند مستوى{" "}
                <strong className="font-mono font-semibold text-foreground">
                  {formatPrice(prices.karats[18])} {country.currencyCode}
                </strong>
              </p>
              <div className="mt-4 rounded-lg bg-muted/50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold">معلومات مهمة</span>
                </div>
                <p className="text-xs">
                  تُحدّث الأسعار تلقائياً اعتماداً على Metal Sentinel API وهي مجرد أسعار استرشادية للذهب الخام دون احتساب
                  المصنعية أو الضرائب المحلية.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick tools */}
        <section className="mb-8 grid gap-4 md:grid-cols-2 animate-slide-up animation-delay-300">
          <Link
            href="/zakat"
            className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-primary/20 to-accent/20 text-primary transition-all duration-300 group-hover:scale-110 group-hover:from-primary group-hover:to-accent group-hover:text-white">
                  <Calculator className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-serif text-base font-semibold">حاسبة زكاة الذهب</div>
                  <div className="text-xs text-muted-foreground">احسب زكاة ذهبك وفق السعر الحالي</div>
                </div>
              </div>
              <ArrowLeft
                className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-x-1 group-hover:text-primary"
                aria-hidden="true"
              />
            </div>
          </Link>
          
          <Link
            href={`/shops?country=${country.slug}`}
            className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-accent/20 to-primary/20 text-accent transition-all duration-300 group-hover:scale-110">
                  <Store className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-serif text-base font-semibold">محلات الذهب في {country.name}</div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">
                      {shops.length > 0 ? `${shops.length} محل متوفر` : "لا يوجد محلات بعد"}
                    </span>
                  </div>
                </div>
              </div>
              <ArrowLeft
                className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-x-1 group-hover:text-primary"
                aria-hidden="true"
              />
            </div>
          </Link>
        </section>

        {/* Shops preview */}
        {shops.length > 0 && (
          <section className="mb-10 animate-slide-up animation-delay-300">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Store className="h-5 w-5 text-primary" />
                  <h2 className="font-serif text-xl font-bold md:text-2xl">أبرز محلات الذهب في {country.name}</h2>
                </div>
                <p className="text-sm text-muted-foreground">دليل مختصر لمحلات وصاغة الذهب الموثوقة</p>
              </div>
              <Link
                href={`/shops?country=${country.slug}`}
                className="group inline-flex items-center gap-1 text-sm font-medium text-primary transition-all hover:gap-2"
              >
                كل المحلات
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {shops.slice(0, 6).map((shop, idx) => (
                <div
                  key={shop._id}
                  className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                  style={{
                    animationDelay: `${idx * 50}ms`
                  }}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-serif text-lg font-semibold transition-colors group-hover:text-primary">
                          {shop.name}
                        </h3>
                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{shop.city}</span>
                        </div>
                      </div>
                      <div className="rounded-full bg-primary/10 p-1.5">
                        <Store className="h-3.5 w-3.5 text-primary" />
                      </div>
                    </div>
                    
                    {shop.address && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{shop.address}</p>
                    )}
                    
                    {shop.phone && (
                      <div className="mt-3 flex items-center gap-2">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="font-mono text-xs tabular-nums text-foreground">{shop.phone}</span>
                      </div>
                    )}
                    
                    <div className="mt-3 inline-flex items-center gap-1 text-xs text-primary">
                      <span>عرض التفاصيل</span>
                      <ArrowLeft className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Other countries */}
        <section className="mt-8 animate-slide-up [animation-delay:0.4s]">
          <div className="mb-6 flex items-center gap-2">
            <Gem className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-xl font-bold">دول أخرى</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {COUNTRIES.filter((c) => c.slug !== country.slug).map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md"
              >
                <img
                  src={`https://flagcdn.com/w40/${c.isoCode.toLowerCase()}.png`}
                  alt={c.name}
                  className="h-4 w-5 rounded-sm object-cover"
                  loading="lazy"
                />
                <span className="transition-colors group-hover:text-primary">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

    </main>
  )
}