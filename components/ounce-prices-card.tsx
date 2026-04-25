import { getGoldPricesForCountry } from "@/lib/gold-price"
import type { Country } from "@/lib/countries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale } from "lucide-react"

interface Props {
  country: Country
}

const OUNCE_KARATS = [
  { karat: 24, label: "أونصة عيار 24" },
  { karat: 22, label: "أونصة عيار 22" },
  { karat: 21, label: "أونصة عيار 21" },
  { karat: 18, label: "أونصة عيار 18" },
] as const

export async function OuncePricesCard({ country }: Props) {
  const data = await getGoldPricesForCountry(country)
  const formatPrice = (n: number) =>
    new Intl.NumberFormat("ar", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(n)

  return (
    <Card className="border-border/60">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Scale className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <CardTitle className="font-serif text-xl">أسعار الأونصة</CardTitle>
            <p className="text-sm text-muted-foreground">بعملة {country.currencyCode} - الأونصة = 31.1035 جرام</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {OUNCE_KARATS.map((k) => {
            const price = data.ounces[k.karat]
            return (
              <div
                key={k.karat}
                className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-muted/20 px-4 py-3"
              >
                <span className="text-sm text-muted-foreground">{k.label}</span>
                <span className="font-mono text-base font-semibold tabular-nums">
                  {formatPrice(price)} {country.currencyCode}
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
