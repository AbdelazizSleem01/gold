import { NextResponse } from "next/server"
import { getGoldPricesForCountry } from "@/lib/gold-price"
import { getCountryBySlug } from "@/lib/countries"

export const dynamic = "force-dynamic"
export const revalidate = 300 // 5 minutes

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get("country") || "egypt"
    
    const countryData = getCountryBySlug(country)
    if (!countryData) {
      return NextResponse.json({ error: "Country not found" }, { status: 404 })
    }

    const prices = await getGoldPricesForCountry(countryData)
    
    return NextResponse.json({
      country: countryData.name,
      currency: countryData.currencyCode,
      gram24: prices.karats[24],
      gram22: prices.karats[22],
      gram21: prices.karats[21],
      ounce: prices.ouncePriceLocal,
      updatedAt: prices.lastUpdate,
    })
  } catch (error) {
    console.error("Gold price API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch gold prices" },
      { status: 500 }
    )
  }
}
