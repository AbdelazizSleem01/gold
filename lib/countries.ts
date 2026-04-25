export type Country = {
  slug: string
  name: string
  currencyCode: string
  currencyName: string
  flag: string
  isoCode: string
}

export const COUNTRIES: Country[] = [
  { slug: "saudi-arabia", name: "السعودية", currencyCode: "SAR", currencyName: "ريال سعودي", flag: "🇸🇦", isoCode: "SA" },
  { slug: "egypt", name: "مصر", currencyCode: "EGP", currencyName: "جنيه مصري", flag: "🇪🇬", isoCode: "EG" },
  { slug: "uae", name: "الإمارات", currencyCode: "AED", currencyName: "درهم إماراتي", flag: "🇦🇪", isoCode: "AE" },
  { slug: "kuwait", name: "الكويت", currencyCode: "KWD", currencyName: "دينار كويتي", flag: "🇰🇼", isoCode: "KW" },
  { slug: "qatar", name: "قطر", currencyCode: "QAR", currencyName: "ريال قطري", flag: "🇶🇦", isoCode: "QA" },
  { slug: "bahrain", name: "البحرين", currencyCode: "BHD", currencyName: "دينار بحريني", flag: "🇧🇭", isoCode: "BH" },
  { slug: "oman", name: "عُمان", currencyCode: "OMR", currencyName: "ريال عماني", flag: "🇴🇲", isoCode: "OM" },
  { slug: "jordan", name: "الأردن", currencyCode: "JOD", currencyName: "دينار أردني", flag: "🇯🇴", isoCode: "JO" },
  { slug: "iraq", name: "العراق", currencyCode: "IQD", currencyName: "دينار عراقي", flag: "🇮🇶", isoCode: "IQ" },
  { slug: "yemen", name: "اليمن", currencyCode: "YER", currencyName: "ريال يمني", flag: "🇾🇪", isoCode: "YE" },
  { slug: "syria", name: "سوريا", currencyCode: "SYP", currencyName: "ليرة سورية", flag: "🇸🇾", isoCode: "SY" },
  { slug: "lebanon", name: "لبنان", currencyCode: "LBP", currencyName: "ليرة لبنانية", flag: "🇱🇧", isoCode: "LB" },
  { slug: "palestine", name: "فلسطين", currencyCode: "ILS", currencyName: "شيكل", flag: "🇵🇸", isoCode: "PS" },
  { slug: "algeria", name: "الجزائر", currencyCode: "DZD", currencyName: "دينار جزائري", flag: "🇩🇿", isoCode: "DZ" },
  { slug: "morocco", name: "المغرب", currencyCode: "MAD", currencyName: "درهم مغربي", flag: "🇲🇦", isoCode: "MA" },
  { slug: "tunisia", name: "تونس", currencyCode: "TND", currencyName: "دينار تونسي", flag: "🇹🇳", isoCode: "TN" },
  { slug: "libya", name: "ليبيا", currencyCode: "LYD", currencyName: "دينار ليبي", flag: "🇱🇾", isoCode: "LY" },
  { slug: "sudan", name: "السودان", currencyCode: "SDG", currencyName: "جنيه سوداني", flag: "🇸🇩", isoCode: "SD" },
]

export function getCountryBySlug(slug: string): Country | undefined {
  return COUNTRIES.find((c) => c.slug === slug)
}

/** Karat purity ratios used for per-gram price calculation. */
export const KARAT_PURITY: Record<number, number> = {
  24: 0.999,
  22: 22 / 24,
  21: 21 / 24,
  18: 18 / 24,
  14: 14 / 24,
  12: 12 / 24,
  10: 10 / 24,
}

/** 1 troy ounce = 31.1034768 grams */
export const GRAMS_PER_OUNCE = 31.1034768
