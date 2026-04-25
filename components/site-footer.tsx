"use client"

import Link from "next/link"
import Image from "next/image"
import { COUNTRIES } from "@/lib/countries"
import {
  Home,
  Newspaper,
  Store,
  Calculator,
  Heart,
  Mail,
  Shield,
  LogIn,
  MapPin,
  Phone,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronUp,
  Sparkles,
  Gem
} from "lucide-react"
import { useState, useEffect, useMemo } from "react"

export function SiteFooter() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Deterministic sparkle positions to avoid hydration mismatch
  const sparkles = useMemo(() => {
    const seed = (i: number, offset: number) => {
      const x = Math.sin(i * 9301 + offset * 49297) * 49297
      return x - Math.floor(x)
    }
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: seed(i, 0) * 100,
      top: seed(i, 1) * 100,
      delay: seed(i, 2) * 5,
      duration: 3 + seed(i, 3) * 4,
    }))
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "فيسبوك", color: "hover:bg-[#1877f2]" },
    { icon: Twitter, href: "https://twitter.com", label: "تويتر", color: "hover:bg-[#1da1f2]" },
    { icon: Instagram, href: "https://instagram.com", label: "انستقرام", color: "hover:bg-[#e4405f]" },
    { icon: Linkedin, href: "https://linkedin.com", label: "لينكد إن", color: "hover:bg-[#0077b5]" },
  ]

  const quickLinks = [
    { href: "/", label: "الرئيسية", icon: Home },
    { href: "/blog", label: "المدونة", icon: Newspaper },
    { href: "/shops", label: "محلات الذهب", icon: Store },
    { href: "/zakat", label: "حاسبة الزكاة", icon: Calculator },
  ]

  const infoLinks = [
    { href: "/about", label: "من نحن", icon: Heart },
    { href: "/contact", label: "تواصل معنا", icon: Mail },
    { href: "/privacy", label: "سياسة الخصوصية", icon: Shield },
  ]

  return (
    <>
      <footer className="relative mt-20 overflow-hidden border-t border-border/60 bg-linear-to-b from-card to-background">
        {/* Animated gold glow effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl animate-pulse delay-500" />
        </div>

        {/* Gold sparkles animation */}
        <div className="absolute inset-0 pointer-events-none">
          {sparkles.map((s) => (
            <div
              key={s.id}
              className="absolute animate-float"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
              }}
            >
              <Sparkles className="h-2 w-2 text-primary/30" />
            </div>
          ))}
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-12">
          {/* Main footer grid */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* About section */}
            <div className="animate-slide-up group">
              <Link href="/" className="mb-4 flex items-center gap-2 text-xl font-bold transition-transform duration-300 group-hover:scale-105">
                <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-primary/20 to-primary/20 shadow-lg">
                  <Image
                    src="/logo.png"
                    alt="شعار أسعار الذهب"
                    width={40}
                    height={40}
                    className="h-full w-full object-contain p-1"
                  />
                  <div className="absolute inset-0 rounded-lg bg-primary/20 animate-pulse" />
                </span>
                <span className="bg-linear-to-l from-primary to-primary/70 bg-clip-text font-serif text-transparent">
                  أسعار الذهب
                </span>
              </Link>
              <p className="text-sm leading-relaxed text-muted-foreground transition-all duration-300 group-hover:text-foreground">
                موقعك الموثوق لمتابعة أسعار الذهب اليومية في جميع الدول العربية مع مدوّنة وحاسبة زكاة الذهب ودليل محلات
                الذهب.
              </p>

              {/* Social links */}
              <div className="mt-4 flex gap-2">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transform rounded-full bg-muted/50 p-2 transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
                  >
                    <social.icon className="h-4 w-4 transition-colors group-hover:text-white" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="animate-slide-up animation-delay-100">
              <h3 className="relative mb-4 inline-block font-serif text-sm font-semibold">
                روابط سريعة
                <div className="absolute -bottom-1 right-0 h-0.5 w-12 bg-linear-to-l from-primary to-transparent" />
              </h3>
              <ul className="space-y-2 text-sm">
                {quickLinks.map((link, idx) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-muted-foreground transition-all duration-300 hover:-translate-x-1 hover:text-primary"
                    >
                      <link.icon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Countries prices */}
            <div className="animate-slide-up animation-delay-200">
              <h3 className="relative mb-4 inline-block font-serif text-sm font-semibold">
                أسعار الدول
                <div className="absolute -bottom-1 right-0 h-0.5 w-12 bg-linear-to-l from-primary to-transparent" />
              </h3>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                {COUNTRIES.slice(0, 10).map((c, idx) => (
                  <li key={c.slug}>
                    <Link
                      href={`/${c.slug}`}
                      className="group flex items-center gap-2 text-muted-foreground transition-all duration-300 hover:-translate-x-1 hover:text-primary"
                    >
                      <span className={`fi fi-${c.isoCode.toLowerCase()} rounded-xs shadow-sm transition-transform duration-300 group-hover:scale-110`} />
                      <span>{c.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info section */}
            <div className="animate-slide-up animation-delay-300">
              <h3 className="relative mb-4 inline-block font-serif text-sm font-semibold">
                معلومات
                <div className="absolute -bottom-1 right-0 h-0.5 w-12 bg-linear-to-l from-primary to-transparent" />
              </h3>
              <ul className="space-y-2 text-sm">
                {infoLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-muted-foreground transition-all duration-300 hover:-translate-x-1 hover:text-primary"
                    >
                      <link.icon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Contact info */}
              <div className="mt-4 space-y-2 border-t border-border/30 pt-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  <span>+20 11 5636 1792</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  <span>info@alrogaib.com</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>السبت - الخميس: 9ص - 9م</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative mt-10 border-t border-border/60 pt-6">
            <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row">
              <p className="animate-fade-in">
                جميع الحقوق محفوظة &copy; {new Date().getFullYear()} - دليل أسعار الذهب العربي
              </p>
              <div className="flex items-center gap-3">
                <Link href="/sitemap" className="transition-colors hover:text-primary">
                  خريطة الموقع
                </Link>
                <span>•</span>
                <Link href="/terms" className="transition-colors hover:text-primary">
                  الشروط والأحكام
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 left-6 z-50 transform rounded-full bg-linear-to-r from-primary to-primary/70 p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${showScrollTop ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        aria-label="الذهاب للأعلى"
      >
        <ChevronUp className="h-5 w-5" />
      </button>

    </>
  )
}