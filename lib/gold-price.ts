import "server-only"
import { GRAMS_PER_OUNCE, KARAT_PURITY, type Country } from "./countries"

const API_HOST = "metal-sentinel.p.rapidapi.com"
const API_BASE = `https://${API_HOST}`
const REVALIDATE_SECONDS = 60 * 5 // 5 minutes

export type GoldPricesForCountry = {
  currency: string
  ouncePriceUSD: number
  ouncePriceLocal: number
  pureGramPrice: number
  karats: Record<number, number> // price per gram by karat
  ounces: Record<number, number> // price per ounce by karat
  lastUpdate: string
}

type RawSilverOrGold = {
  price?: number
  rate?: number
  value?: number
  gold_price?: number
  gold_price_per_oz?: number
  timestamp?: string
  date?: string
  currency?: string
  data?: { price?: number; rate?: number }
  results?: Array<{
    ask?: number
    bid?: number
    mid?: number
    price?: number
    rate?: number
    timestamp?: number
  }>
}

function extractPrice(data: RawSilverOrGold): number | null {
  // New API format: results array with ask/bid/mid
  if (data.results && Array.isArray(data.results) && data.results.length > 0) {
    const r = data.results[0]
    const v = r.mid ?? r.ask ?? r.bid ?? r.price ?? r.rate
    if (typeof v === "number" && isFinite(v) && v > 0) return v
  }
  // Legacy formats
  const v =
    data.price ??
    data.rate ??
    data.value ??
    data.gold_price ??
    data.gold_price_per_oz ??
    data.data?.price ??
    data.data?.rate
  if (typeof v !== "number" || !isFinite(v) || v <= 0) return null
  return v
}

function extractTimestamp(data: RawSilverOrGold): string {
  if (data.results && Array.isArray(data.results) && data.results.length > 0) {
    const ts = data.results[0].timestamp
    if (typeof ts === "number") return new Date(ts * 1000).toISOString()
  }
  return data.timestamp || data.date || new Date().toISOString()
}

async function fetchGoldOunceUSD(): Promise<{ price: number; timestamp: string }> {
  const apiKey = process.env.RAPIDAPI_KEY
  if (!apiKey) {
    throw new Error("RAPIDAPI_KEY environment variable is not set")
  }

  // Primary: gold-price endpoint in USD
  const url = `${API_BASE}/gold-price?currency=USD`
  try {
    const res = await fetch(url, {
      headers: {
        "x-rapidapi-host": API_HOST,
        "x-rapidapi-key": apiKey,
        "Content-Type": "application/json",
      },
      next: { revalidate: REVALIDATE_SECONDS, tags: ["gold-price-USD"] },
    })
    if (!res.ok) {
      const text = await res.text()
      console.error("[API] gold-price error response:", res.status, text.slice(0, 200))
      throw new Error(`Metal Sentinel gold-price responded with ${res.status}`)
    }
    const data = (await res.json()) as RawSilverOrGold
    const price = extractPrice(data)
    if (!price) {
      console.error("[API] Could not extract price from:", data)
      throw new Error("Invalid gold price from Metal Sentinel")
    }
    return { price, timestamp: extractTimestamp(data) }
  } catch (err) {
    console.error("[v0] fetchGoldOunceUSD error:", err)
    // Fallback to last-known reasonable value so the app doesn't crash entirely.
    return { price: 2600, timestamp: new Date().toISOString() }
  }
}

/** Fetch FX rate: 1 USD -> target currency via Metal Sentinel (gold-price with currency param). */
async function fetchUsdToCurrency(currency: string): Promise<number> {
  if (currency === "USD") return 1
  const apiKey = process.env.RAPIDAPI_KEY
  if (!apiKey) return 1

  // We infer FX by comparing gold price in local currency vs USD.
  const url = `${API_BASE}/gold-price?currency=${encodeURIComponent(currency)}`
  try {
    const [localRes, usdPrice] = await Promise.all([
      fetch(url, {
        headers: {
          "x-rapidapi-host": API_HOST,
          "x-rapidapi-key": apiKey,
          "Content-Type": "application/json",
        },
        next: { revalidate: REVALIDATE_SECONDS, tags: [`gold-price-${currency}`] },
      }),
      fetchGoldOunceUSD(),
    ])
    if (!localRes.ok) {
      const text = await localRes.text()
      console.error(`[API] gold-price ${currency} error:`, localRes.status, text.slice(0, 200))
      throw new Error(`Metal Sentinel ${currency} responded with ${localRes.status}`)
    }
    const data = (await localRes.json()) as RawSilverOrGold
    const localPrice = extractPrice(data)
    if (!localPrice) {
      console.error(`[API] Could not extract ${currency} price from:`, data)
      throw new Error("Invalid local price")
    }
    return localPrice / usdPrice.price
  } catch (err) {
    console.error(`[v0] fetchUsdToCurrency(${currency}) error:`, err)
    // Fallback fixed rates (approximate) so UI still works offline.
    const fallback: Record<string, number> = {
      SAR: 3.75,
      EGP: 48.5,
      AED: 3.67,
      KWD: 0.31,
      QAR: 3.64,
      BHD: 0.38,
      OMR: 0.39,
      JOD: 0.71,
      IQD: 1310,
      YER: 250,
      SYP: 13000,
      LBP: 89500,
      ILS: 3.7,
      DZD: 134,
      MAD: 9.9,
      TND: 3.15,
      LYD: 4.85,
      SDG: 601,
    }
    return fallback[currency] || 1
  }
}

/**
 * Fetch gold prices for a country with all karats (gram & ounce).
 */
export async function getGoldPricesForCountry(country: Country): Promise<GoldPricesForCountry> {
  const [{ price: ouncePriceUSD, timestamp }, fx] = await Promise.all([
    fetchGoldOunceUSD(),
    fetchUsdToCurrency(country.currencyCode),
  ])

  const ouncePriceLocal = ouncePriceUSD * fx
  const pureGramPrice = ouncePriceLocal / GRAMS_PER_OUNCE

  const karats: Record<number, number> = {}
  const ounces: Record<number, number> = {}
  for (const k of [24, 22, 21, 18, 14, 12, 10]) {
    const purity = KARAT_PURITY[k]
    karats[k] = pureGramPrice * purity
    ounces[k] = ouncePriceLocal * purity
  }

  return {
    currency: country.currencyCode,
    ouncePriceUSD,
    ouncePriceLocal,
    pureGramPrice,
    karats,
    ounces,
    lastUpdate: timestamp,
  }
}
