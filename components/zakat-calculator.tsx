"use client"

import { useMemo, useState } from "react"
import type { Country } from "@/lib/countries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, RotateCcw } from "lucide-react"

// نصاب الزكاة من الذهب الخالص = 85 جرام
const NISAB_GRAMS = 85
const ZAKAT_RATE = 0.025

const KARATS = [
  { karat: 24, purity: 0.9999 },
  { karat: 22, purity: 22 / 24 },
  { karat: 21, purity: 21 / 24 },
  { karat: 18, purity: 18 / 24 },
  { karat: 14, purity: 14 / 24 },
] as const

interface Props {
  countries: Country[]
  initialCountrySlug: string
  pricesByCountry: Record<string, { karats: Record<number, number>; pureGramPrice: number }>
}

export function ZakatCalculator({ countries, initialCountrySlug, pricesByCountry }: Props) {
  const [countrySlug, setCountrySlug] = useState(initialCountrySlug)
  const [weights, setWeights] = useState<Record<number, string>>({
    24: "",
    22: "",
    21: "",
    18: "",
    14: "",
  })
  const [cashValue, setCashValue] = useState("")

  const country = countries.find((c) => c.slug === countrySlug) || countries[0]
  const prices = pricesByCountry[countrySlug]

  const result = useMemo(() => {
    if (!prices) return null

    // نحسب الجرامات الصافية (خالص)
    let pureGrams = 0
    let totalValue = 0
    for (const k of KARATS) {
      const w = Number.parseFloat(weights[k.karat] || "0") || 0
      pureGrams += w * k.purity
      totalValue += w * (prices.karats[k.karat] || 0)
    }

    const cash = Number.parseFloat(cashValue || "0") || 0
    totalValue += cash

    // النصاب بالمال المحلي = سعر الجرام الخالص × 85
    const nisabInLocal = prices.pureGramPrice * NISAB_GRAMS
    const mustPay = pureGrams >= NISAB_GRAMS || totalValue >= nisabInLocal
    const zakatAmount = mustPay ? totalValue * ZAKAT_RATE : 0

    return {
      pureGrams,
      totalValue,
      nisabInLocal,
      mustPay,
      zakatAmount,
    }
  }, [weights, cashValue, prices])

  function reset() {
    setWeights({ 24: "", 22: "", 21: "", 18: "", 14: "" })
    setCashValue("")
  }

  const formatMoney = (n: number) =>
    new Intl.NumberFormat("ar", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(n)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-linear-to-l from-primary/10 via-transparent to-transparent">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Calculator className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <CardTitle className="font-serif text-xl">حاسبة زكاة الذهب</CardTitle>
            <p className="text-sm text-muted-foreground">
              النصاب: 85 جرام ذهب خالص - نسبة الزكاة: 2.5%
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Country selector */}
        <div className="flex flex-col gap-2">
          <Label>اختر الدولة</Label>
          <div className="flex flex-wrap gap-2">
            {countries.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setCountrySlug(c.slug)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  countrySlug === c.slug
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/60 bg-card hover:border-primary/40"
                }`}
              >
                <img
                  src={`https://flagcdn.com/w20/${c.isoCode.toLowerCase()}.png`}
                  alt={c.name}
                  className="h-3 w-4 object-cover rounded-sm"
                  loading="lazy"
                />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Gold weights */}
        <div>
          <h3 className="mb-3 font-serif text-base font-semibold">وزن الذهب الذي تملكه (بالجرام)</h3>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {KARATS.map((k) => (
              <div key={k.karat} className="flex flex-col gap-2">
                <Label htmlFor={`k-${k.karat}`}>عيار {k.karat}</Label>
                <Input
                  id={`k-${k.karat}`}
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  placeholder="0"
                  dir="ltr"
                  value={weights[k.karat]}
                  onChange={(e) => setWeights((prev) => ({ ...prev, [k.karat]: e.target.value }))}
                />
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <Label htmlFor="cash">نقد / مال زكوي ({country.currencyCode})</Label>
              <Input
                id="cash"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                placeholder="0"
                dir="ltr"
                value={cashValue}
                onChange={(e) => setCashValue(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="rounded-xl border border-border/60 bg-muted/30 p-5">
            <h3 className="mb-4 font-serif text-lg font-bold">النتيجة</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultRow
                label="الوزن الخالص"
                value={`${formatMoney(result.pureGrams)} جرام`}
              />
              <ResultRow
                label="القيمة الإجمالية"
                value={`${formatMoney(result.totalValue)} ${country.currencyCode}`}
              />
              <ResultRow
                label="النصاب الشرعي"
                value={`${formatMoney(result.nisabInLocal)} ${country.currencyCode}`}
              />
              <ResultRow label="هل تجب الزكاة؟" value={result.mustPay ? "نعم" : "لا، دون النصاب"} accent />
            </div>
            <div className="mt-5 rounded-lg border border-primary/30 bg-primary/5 p-5 text-center">
              <p className="text-sm text-muted-foreground">مقدار الزكاة الواجب إخراجها</p>
              <p className="mt-1 font-mono text-3xl font-bold tabular-nums text-primary">
                {formatMoney(result.zakatAmount)}{" "}
                <span className="text-base font-medium text-muted-foreground">{country.currencyCode}</span>
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-start">
          <Button type="button" variant="outline" onClick={reset} className="gap-2 bg-transparent">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            إعادة ضبط
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ResultRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-card px-4 py-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={`font-mono text-sm font-semibold tabular-nums ${accent ? "text-primary" : ""}`}>
        {value}
      </span>
    </div>
  )
}
