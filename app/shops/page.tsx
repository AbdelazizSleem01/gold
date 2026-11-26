import Link from "next/link"
import { getAllShops } from "@/lib/shops"
import { COUNTRIES, getCountryBySlug } from "@/lib/countries"
import { Store, MapPin, Phone, Globe } from "lucide-react"
import { ShopsFilter } from "@/components/shops-filter"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "دليل محلات الذهب في الدول العربية",
  description: "دليل شامل لأبرز محلات وصاغة الذهب في السعودية، الإمارات، مصر، الكويت وباقي الدول العربية",
}

export const revalidate = 60

export default async function ShopsPage({
  searchParams,
}: {
  searchParams: Promise<{ country?: string }>
}) {
  const { country: filterCountry } = await searchParams
  const allShops = await getAllShops()
  const shops = filterCountry ? allShops.filter((s) => s.countrySlug === filterCountry) : allShops
  const currentCountry = filterCountry ? getCountryBySlug(filterCountry) : null

  // group by country
  const byCountry = new Map<string, typeof allShops>()
  for (const s of shops) {
    const arr = byCountry.get(s.countrySlug) || []
    arr.push(s)
    byCountry.set(s.countrySlug, arr)
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <nav aria-label="breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          الرئيسية
        </Link>
        <span>/</span>
        <span className="text-foreground">محلات الذهب</span>
      </nav>

      <header className="mb-10">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Store className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold md:text-4xl">
              {currentCountry ? `محلات الذهب في ${currentCountry.name}` : "دليل محلات الذهب"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground md:text-base">
              {currentCountry
                ? `دليل محلات وصاغة الذهب في ${currentCountry.name}`
                : "دليل شامل لأبرز محلات وصاغة الذهب في الدول العربية"}
            </p>
          </div>
        </div>
      </header>

      {/* Country filter */}
      <ShopsFilter currentCountry={filterCountry || null} />

      {shops.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/60 bg-card p-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Store className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-lg font-semibold">لا توجد محلات حالياً</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {currentCountry
              ? `لم تتم إضافة محلات في ${currentCountry.name} بعد`
              : "سيتم إضافة المحلات قريباً من لوحة التحكم"}
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {Array.from(byCountry.entries()).map(([countrySlug, countryShops]) => {
            const country = getCountryBySlug(countrySlug)
            if (!country) return null
            return (
              <section key={countrySlug}>
                <div className="mb-4 flex items-center gap-3">
                  <img
                    src={`https://flagcdn.com/w40/${country.isoCode.toLowerCase()}.png`}
                    alt={country.name}
                    className="h-8 w-10 object-cover rounded-lg"
                  />
                  <h2 className="font-serif text-xl font-bold md:text-2xl">{country.name}</h2>
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                    {countryShops.length} محل
                  </span>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {countryShops.map((shop) => (
                    <article
                      key={shop._id}
                      className="group flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-serif text-lg font-bold text-foreground">{shop.name}</h3>
                        <span className="shrink-0 rounded-full bg-accent/15 px-2.5 py-0.5 text-xs text-accent">
                          {shop.city}
                        </span>
                      </div>
                      {shop.description && (
                        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {shop.description}
                        </p>
                      )}
                      <div className="space-y-2 pt-2 text-sm">
                        {shop.address && (
                          <div className="flex items-start gap-2 text-muted-foreground">
                            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                            <span className="leading-relaxed">{shop.address}</span>
                          </div>
                        )}
                        {shop.phone && (
                          <a
                            href={`tel:${shop.phone}`}
                            className="flex items-center gap-2 text-foreground hover:text-primary"
                            dir="ltr"
                          >
                            <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                            <span className="font-mono tabular-nums">{shop.phone}</span>
                          </a>
                        )}
                        {shop.website && (() => {
                          // Fail-closed: only absolute http(s) URLs are allowed in href.
                          let safeHref: string | null = null;
                          try {
                            const parsed = new URL(String(shop.website).trim());
                            if (parsed.protocol === "http:" || parsed.protocol === "https:") {
                              safeHref = parsed.href;
                            }
                          } catch {
                            safeHref = null;
                          }
                          if (!safeHref) return null;
                          return (
                            <a
                              href={safeHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-primary hover:underline"
                            >
                              <Globe className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                              <span className="truncate">{shop.website}</span>
                            </a>
                          );
                        })()}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </main>
  )
}
