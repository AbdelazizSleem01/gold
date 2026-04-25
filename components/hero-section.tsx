import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calculator, ArrowLeft, MapPin } from "lucide-react"
import { HeroCountrySelector } from "./hero-country-selector"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 min-h-[90vh] flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-bl from-primary/10 via-background/80 to-background" />
      </div>
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-50">
        <div className="absolute right-1/4 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      </div>
      <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-16 md:pt-4">
        <div className="mx-auto w-full max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span>أسعار مباشرة من Metal Sentinel</span>
          </div>
          <h1 className="mb-4 text-balance font-serif text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            أسعار الذهب اليوم
            <span className="mt-2 block text-primary">في الدول العربية</span>
          </h1>
          <p className="mb-8 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            تابع أحدث أسعار الذهب لحظة بلحظة في جميع العيارات الشائعة، واحسب زكاة الذهب، واكتشف أفضل محلات الذهب
            في بلدك.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="gap-2">
              <Link href="#countries">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                اختر بلدك
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 bg-transparent">
              <Link href="/zakat">
                <Calculator className="h-4 w-4" aria-hidden="true" />
                حاسبة الزكاة
              </Link>
            </Button>
          </div>
        </div>

        {/* Country Selector with Live Prices */}
        <div className=" w-full">
          <HeroCountrySelector />
        </div>
      </div>
    </section>
  )
}
