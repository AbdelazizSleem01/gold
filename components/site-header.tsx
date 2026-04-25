"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Menu, X, Home, Newspaper, Store, Calculator, Info, Mail, Sparkles, BarChart3, ChevronDown, Gem, TrendingUp, Shield, Phone, MapPin, Loader2 } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { COUNTRIES } from "@/lib/countries"

// Gold Price Ticker Component
function GoldPriceTicker() {
  const [price, setPrice] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch("/api/gold-price/current?country=egypt")
        if (res.ok) {
          const data = await res.json()
          setPrice(data.gram21)
        }
      } catch (err) {
        console.error("Failed to fetch gold price:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPrice()
    const interval = setInterval(fetchPrice, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="hidden items-center gap-2 rounded-full bg-primary/10 px-3 py-1 md:flex">
        <Loader2 className="h-3 w-3 animate-spin text-primary" />
        <span className="text-xs font-medium text-primary">جاري التحميل...</span>
      </div>
    )
  }

  if (!price) {
    return (
      <div className="hidden items-center gap-2 rounded-full bg-primary/10 px-3 py-1 md:flex">
        <Gem className="h-3 w-3 text-primary" />
        <span className="text-xs font-medium text-primary">غير متوفر</span>
      </div>
    )
  }

  return (
    <div className="hidden items-center gap-2 rounded-full bg-primary/10 px-3 py-1 md:flex">
      <Gem className="h-3 w-3 animate-pulse text-primary" />
      <span className="text-xs font-medium text-primary">
        جرام الذهب 21: {price.toFixed(2)} ج.م
      </span>
    </div>
  )
}

const NAV_LINKS = [
  { href: "/", label: "الرئيسية", icon: Home, description: "الصفحة الرئيسية" },
  { href: "/blog", label: "المدونة", icon: Newspaper, description: "آخر المقالات والأخبار" },
  { href: "/shops", label: "محلات الذهب", icon: Store, description: "دليل محلات الذهب" },
  { href: "/zakat", label: "حاسبة الزكاة", icon: Calculator, description: "احسب زكاة ذهبك" },
  { href: "/about", label: "من نحن", icon: Info, description: "تعرف علينا" },
  { href: "/contact", label: "تواصل معنا", icon: Mail, description: "تواصل مع فريق الدعم" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showCountries, setShowCountries] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCountries(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousedown", handleClickOutside)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
            ? "border-b border-border/60 bg-background/95 shadow-lg backdrop-blur-md"
            : "border-b border-border/30 bg-background/80 backdrop-blur-sm"
          }`}
      >
        {/* Animated gold glow effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/20 blur-2xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-primary/10 blur-2xl animate-pulse delay-700" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="group relative flex items-center gap-2 text-lg font-bold">
              {/* Animated border glow */}
              <div className="absolute -inset-1 rounded-lg bg-linear-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 blur-xl transition-all duration-700 group-hover:opacity-100 group-hover:duration-300" />

              <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-primary/20 to-accent/20 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30">
                <Image
                  src="/logo.png"
                  alt="شعار أسعار الذهب"
                  width={36}
                  height={36}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gold sparkle effect */}
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 animate-pulse text-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>

              <span className="hidden font-serif sm:inline bg-linear-to-l from-foreground via-primary to-foreground bg-clip-text text-transparent transition-all duration-500 group-hover:scale-105">
                أسعار الذهب
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="القائمة الرئيسية">
              {NAV_LINKS.map((l, idx) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group relative flex items-center gap-2 overflow-hidden rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
                  style={{
                    animationDelay: `${idx * 50}ms`
                  }}
                >
                  {/* Animated background */}
                  <span className="absolute inset-0 bg-linear-to-r from-primary to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <l.icon className="relative h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <span className="relative">{l.label}</span>

                  {/* Tooltip on hover */}
                  <span className="absolute -top-10 left-1/2 hidden -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs text-background whitespace-nowrap opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-top-12 lg:block">
                    {l.description}
                  </span>
                </Link>
              ))}

              {/* Countries Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowCountries(!showCountries)}
                  className={`group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    showCountries 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
                      : "text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/30"
                  }`}
                >
                  <BarChart3 className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>أسعار الدول</span>
                  <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${showCountries ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown menu */}
                {showCountries && (
                  <div
                    className="absolute left-0 top-full mt-2 w-80 rounded-lg border border-border/60 bg-card shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    <div className="absolute -top-2 left-4 h-3 w-3 rotate-45 border-l border-t border-border/60 bg-card" />
                    <div className="p-3">
                      <div className="mb-2 flex items-center gap-2 border-b border-border/60 pb-2">
                        <Gem className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold">أحدث أسعار الذهب في الدول العربية</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 max-h-96 overflow-y-auto">
                        {COUNTRIES.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/${c.slug}`}
                            onClick={() => setShowCountries(false)}
                            className="group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground hover:translate-x-1"
                          >
                            <span className={`fi fi-${c.isoCode.toLowerCase()} rounded-xs shadow-sm transition-transform duration-300 group-hover:scale-110`} />
                            <span>{c.name}</span>
                            <TrendingUp className="mr-auto h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              {/* Live Gold Price Indicator */}
              <GoldPriceTicker />

              <Button
                variant="ghost"
                size="icon"
                className="relative lg:hidden"
                onClick={() => setOpen((s) => !s)}
                aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
                aria-expanded={open}
              >
                {open ? (
                  <X className="h-5 w-5 transition-all duration-300 rotate-90" />
                ) : (
                  <Menu className="h-5 w-5 transition-all duration-300" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {open && (
            <nav
              className="flex flex-col gap-1 border-t border-border/60 pb-4 pt-3 lg:hidden animate-in fade-in slide-in-from-top-2 duration-300"
              aria-label="القائمة المتنقلة"
            >
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="group relative flex items-center gap-3 overflow-hidden rounded-md px-3 py-3 text-foreground transition-all duration-300 hover:bg-accent hover:shadow-md hover:-translate-x-1"
                >
                  <span className="rounded-lg bg-primary/10 p-1.5 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <l.icon className="h-4 w-4" />
                  </span>
                  <div className="flex-1">
                    <div className="font-medium">{l.label}</div>
                    <div className="text-xs text-muted-foreground">{l.description}</div>
                  </div>
                  <ChevronDown className="h-4 w-4 -rotate-90 opacity-0 transition-all group-hover:opacity-100" />
                </Link>
              ))}

              <div className="my-2 border-t border-border/60" />

              <p className="px-3 py-2 text-xs font-semibold text-muted-foreground flex items-center gap-2">
                <BarChart3 className="h-3 w-3" />
                أسعار الذهب حسب الدول
              </p>

              <div className="grid grid-cols-2 gap-1">
                {COUNTRIES.slice(0, 10).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}`}
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground hover:shadow-sm hover:translate-x-1"
                  >
                    <span className={`fi fi-${c.isoCode.toLowerCase()} rounded-xs shadow-sm transition-transform duration-300 group-hover:scale-110`} />
                    <span>{c.name}</span>
                  </Link>
                ))}
              </div>

              {/* Contact info in mobile menu */}
              <div className="mt-3 rounded-lg bg-muted/30 p-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  <span>دعم العملاء: +20 11 5636 1792</span>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

    </>
  )
}