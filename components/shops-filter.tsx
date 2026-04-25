"use client"

import Link from "next/link"
import { COUNTRIES } from "@/lib/countries"
import { Search } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

interface Props {
  currentCountry: string | null
}

export function ShopsFilter({ currentCountry }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <section className="mb-8 rounded-xl border border-border/60 bg-card p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium">
          <Search className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>تصفية حسب الدولة</span>
        </div>
        <div className="h-10 w-full rounded-md border border-border/60 bg-muted/50" />
      </section>
    )
  }

  return (
    <section className="mb-8 rounded-xl border border-border/60 bg-card p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium">
        <Search className="h-4 w-4 text-primary" aria-hidden="true" />
        <span>تصفية حسب الدولة</span>
      </div>
      <Select value={currentCountry || "all"} onValueChange={(value) => {
        if (value === "all") {
          router.push("/shops")
        } else {
          router.push(`/shops?country=${value}`)
        }
      }}>
        <SelectTrigger className="w-full border-border/60 bg-muted/50">
          <SelectValue placeholder="الكل" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            <span>الكل</span>
          </SelectItem>
          {COUNTRIES.map((c) => (
            <SelectItem key={c.slug} value={c.slug}>
              <div className="flex items-center gap-2">
                <img
                  src={`https://flagcdn.com/w20/${c.isoCode.toLowerCase()}.png`}
                  alt={c.name}
                  className="h-3 w-4 object-cover rounded-sm"
                  loading="lazy"
                />
                <span>{c.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </section>
  )
}
