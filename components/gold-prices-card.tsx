import { getGoldPricesForCountry } from "@/lib/gold-price"
import type { Country } from "@/lib/countries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Coins } from "lucide-react"

const KARATS = [
  { karat: 24, label: "عيار 24" },
  { karat: 22, label: "عيار 22" },
  { karat: 21, label: "عيار 21" },
  { karat: 18, label: "عيار 18" },
  { karat: 14, label: "عيار 14" },
  { karat: 12, label: "عيار 12" },
  { karat: 10, label: "عيار 10" },
] as const

interface Props {
  country: Country
}

export async function GoldPricesCard({ country }: Props) {
  const data = await getGoldPricesForCountry(country)
  const formatPrice = (n: number) =>
    new Intl.NumberFormat("ar", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(n)

  return (
    <Card className="overflow-hidden border-border/60">
      <CardHeader className="bg-linear-to-l from-primary/10 via-transparent to-transparent">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Coins className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <CardTitle className="font-serif text-xl">أسعار الذهب في {country.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                سعر الجرام بعملة {country.currencyName} ({country.currencyCode})
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="hidden items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1 text-xs text-muted-foreground sm:flex">
              <TrendingUp className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span>محدّث</span>
            </div>
            {data.ouncePriceUSD === 2600 && (
              <span className="text-[10px] text-amber-600 dark:text-amber-400">
                * أسعار تقديرية
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/60">
          <div className="grid grid-cols-3 gap-4 bg-muted/40 px-6 py-3 text-xs font-medium text-muted-foreground">
            <span>العيار</span>
            <span className="text-center">سعر الجرام</span>
            <span className="text-left">العملة</span>
          </div>
          {KARATS.map((k) => {
            const price = data.karats[k.karat]
            return (
              <div
                key={k.karat}
                className="grid grid-cols-3 items-center gap-4 px-6 py-4 text-sm transition-colors hover:bg-muted/30"
              >
                <span className="font-serif text-base font-semibold text-foreground">{k.label}</span>
                <span className="text-center font-mono text-base text-foreground tabular-nums">
                  {formatPrice(price)}
                </span>
                <span className="text-left text-muted-foreground">{country.currencyCode}</span>
              </div>
            )
          })}
        </div>
        <div className="border-t border-border/60 bg-muted/30 px-6 py-3 text-xs text-muted-foreground">
          آخر تحديث:{" "}
          {new Date(data.lastUpdate).toLocaleString("ar", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </div>
      </CardContent>
    </Card>
  )
}
