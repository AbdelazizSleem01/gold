import Link from "next/link"
import { COUNTRIES } from "@/lib/countries"
import { getGoldPricesForCountry } from "@/lib/gold-price"
import { ZakatCalculator } from "@/components/zakat-calculator"
import { BookOpen, CheckCircle2 } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "حاسبة زكاة الذهب",
  description:
    "احسب زكاة ذهبك بدقة وفق النصاب الشرعي (85 جرام ذهب خالص) ونسبة 2.5% وبسعر الذهب اليوم في بلدك",
}

export const revalidate = 300

export default async function ZakatPage() {
  // Pre-fetch prices for all countries (in parallel) to let user switch offline
  const all = await Promise.all(
    COUNTRIES.map(async (c) => {
      try {
        const p = await getGoldPricesForCountry(c)
        return [c.slug, { karats: p.karats, pureGramPrice: p.pureGramPrice }] as const
      } catch {
        return [c.slug, { karats: { 24: 0, 22: 0, 21: 0, 18: 0, 14: 0, 12: 0, 10: 0 }, pureGramPrice: 0 }] as const
      }
    }),
  )
  const pricesByCountry = Object.fromEntries(all) as Record<
    string,
    { karats: Record<number, number>; pureGramPrice: number }
  >

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      <nav aria-label="breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          الرئيسية
        </Link>
        <span>/</span>
        <span className="text-foreground">حاسبة زكاة الذهب</span>
      </nav>

      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">حاسبة زكاة الذهب</h1>
        <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          أداة دقيقة لحساب زكاة ذهبك وفق أحكام الشريعة الإسلامية. تعتمد الحاسبة على سعر الذهب الحالي في بلدك ونسبة
          الزكاة المعتمدة (2.5% من القيمة) إذا بلغ النصاب.
        </p>
      </header>

      <ZakatCalculator
        countries={COUNTRIES}
        initialCountrySlug="saudi-arabia"
        pricesByCountry={pricesByCountry}
      />

      {/* Info */}
      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <InfoCard
          icon={<BookOpen className="h-5 w-5" aria-hidden="true" />}
          title="نصاب زكاة الذهب"
          points={[
            "النصاب = 85 جرام من الذهب الخالص (عيار 24)",
            "تُخرج الزكاة إذا حال على الذهب حول هجري كامل",
            "نسبة الزكاة = 2.5% (ربع العشر)",
            "يحسب وزن الذهب الخالص الموجود في كل قطعة حسب عيارها",
          ]}
        />
        <InfoCard
          icon={<CheckCircle2 className="h-5 w-5" aria-hidden="true" />}
          title="كيف نحسب؟"
          points={[
            "نحوّل كل عيار إلى جرامات خالصة باستخدام نسبة النقاء",
            "مجموع الجرامات الخالصة يُقارن بالنصاب (85 جرام)",
            "القيمة بالعملة المحلية = مجموع (الوزن × سعر الجرام) لكل عيار",
            "الزكاة = القيمة الإجمالية × 2.5%",
          ]}
        />
      </section>

      <section className="mt-8 rounded-xl border border-border/60 bg-muted/30 p-5 text-sm leading-relaxed text-muted-foreground">
        <p>
          <strong className="text-foreground">ملاحظة:</strong> هذه الحاسبة أداة استرشادية تعتمد على متوسط سعر الذهب
          الحالي. للمسائل الفقهية التفصيلية (مثل زكاة الذهب المستعمل للزينة) ننصح بالرجوع إلى أهل العلم.
        </p>
      </section>
    </main>
  )
}

function InfoCard({ icon, title, points }: { icon: React.ReactNode; title: string; points: string[] }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary">{icon}</div>
        <h2 className="font-serif text-lg font-bold">{title}</h2>
      </div>
      <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
