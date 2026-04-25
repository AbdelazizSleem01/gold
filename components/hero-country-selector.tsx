"use client"

import { useState, useCallback, useEffect } from "react"
import { COUNTRIES } from "@/lib/countries"
import type { Country } from "@/lib/countries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TrendingDown, TrendingUp, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface GoldPriceData {
  currency: string
  ouncePriceUSD: number
  ouncePriceLocal: number
  pureGramPrice: number
  karats: Record<number, number>
  ounces: Record<number, number>
  lastUpdate: string
}

export function HeroCountrySelector() {
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES.find(c => c.slug === "egypt") || COUNTRIES[0])
  const [prices, setPrices] = useState<GoldPriceData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPrices = useCallback(async (country: Country) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/gold-prices?country=${country.slug}`)
      if (!res.ok) throw new Error("Failed to fetch prices")
      const data = await res.json()
      setPrices(data)
    } catch (err) {
      setError("تعذر تحميل الأسعار")
    } finally {
      setLoading(false)
    }
  }, [])

  const handleCountryChange = (slug: string) => {
    const country = COUNTRIES.find((c) => c.slug === slug)
    if (country) {
      setSelectedCountry(country)
      fetchPrices(country)
    }
  }

  // Load default country on mount
  useEffect(() => {
    fetchPrices(selectedCountry)
  }, [])

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("ar", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(n)

  const karat24Price = prices?.karats[24] ?? 0
  const karat24Change = 0 // TODO: Calculate change from previous price

  return (
    <Card className="mx-auto mt-8 w-full max-w-md border-border/60 bg-card/95 backdrop-blur-sm">
      <CardHeader >
        <CardTitle className="text-center font-serif text-xl">السعر الآن</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Country Selector */}
        <Select onValueChange={handleCountryChange} value={selectedCountry.slug}>
          <SelectTrigger className="w-full border-border/60 bg-muted/50">
            <SelectValue>
              <div className="flex items-center gap-2">
                <img
                  src={`https://flagcdn.com/w40/${selectedCountry.isoCode.toLowerCase()}.png`}
                  alt={selectedCountry.name}
                  className="h-5 w-6 object-cover rounded-sm"
                  loading="lazy"
                />
                <span>{selectedCountry.name}</span>
                <span className="text-muted-foreground">{selectedCountry.currencyCode}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {COUNTRIES.map((country) => (
              <SelectItem key={country.slug} value={country.slug}>
                <div className="flex items-center gap-2">
                  <img
                    src={`https://flagcdn.com/w40/${country.isoCode.toLowerCase()}.png`}
                    alt={country.name}
                    className="h-4 w-5 object-cover rounded-sm"
                    loading="lazy"
                  />
                  <span>{country.name}</span>
                  <span className="text-muted-foreground">{country.currencyCode}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Price Display */}
        {loading ? (
          <div className="py-8 text-center text-muted-foreground">جاري التحميل...</div>
        ) : error ? (
          <div className="py-8 text-center text-destructive">{error}</div>
        ) : prices ? (
          <div className="space-y-4">
            <div className="text-center">
              <p className="mb-1 text-sm text-muted-foreground">
                عيار 24 ({selectedCountry.currencyName})
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-destructive">
                  {karat24Change > 0 ? (
                    <TrendingUp className="h-5 w-5" />
                  ) : (
                    <TrendingDown className="h-5 w-5" />
                  )}
                </span>
                <span className="font-mono text-3xl font-bold text-foreground">
                  {formatPrice(karat24Price)}
                </span>
              </div>
            </div>

            <Button asChild className="w-full gap-2">
              <Link href={`/${selectedCountry.slug}`}>
                عرض التفاصيل
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            اختر دولة لعرض الأسعار
          </div>
        )}
      </CardContent>
    </Card>
  )
}
