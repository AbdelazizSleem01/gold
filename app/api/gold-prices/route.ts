import { NextRequest, NextResponse } from "next/server"
import { getGoldPricesForCountry } from "@/lib/gold-price"
import { getCountryBySlug } from "@/lib/countries"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const countrySlug = searchParams.get("country")

  if (!countrySlug) {
    return NextResponse.json({ error: "Country slug is required" }, { status: 400 })
  }

  const country = getCountryBySlug(countrySlug)
  if (!country) {
    return NextResponse.json({ error: "Country not found" }, { status: 404 })
  }

  try {
    const prices = await getGoldPricesForCountry(country)
    return NextResponse.json(prices)
  } catch (error) {
    console.error("Error fetching gold prices:", error)
    return NextResponse.json({ error: "Failed to fetch gold prices" }, { status: 500 })
  }
}
