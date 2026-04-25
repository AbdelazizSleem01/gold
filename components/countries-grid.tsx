import Link from "next/link"
import { COUNTRIES } from "@/lib/countries"
import { ArrowLeft } from "lucide-react"

export function CountriesGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {COUNTRIES.map((country) => (
        <Link
          key={country.slug}
          href={`/${country.slug}`}
          className="group flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-card px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5"
        >
          <div className="flex items-center gap-3">
            <img
              src={`https://flagcdn.com/w40/${country.isoCode.toLowerCase()}.png`}
              alt={country.name}
              className="h-6 w-8 object-cover rounded-sm"
            />
            <div>
              <div className="font-serif text-sm font-semibold text-foreground">{country.name}</div>
            </div>
          </div>
          <ArrowLeft
            className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-x-1 group-hover:text-primary"
            aria-hidden="true"
          />
        </Link>
      ))}
    </div>
  )
}
