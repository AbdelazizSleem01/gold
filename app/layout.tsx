import type { Metadata, Viewport } from "next"
import { Cairo, Amiri } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingContact } from "@/components/floating-contact"
import "@/styles/globals.css"

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
})

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://gold-price-arab.vercel.app/"), // Replace with your actual domain
  title: {
    default: "دليل أسعار الذهب العربي | أسعار الذهب اليوم لحظة بلحظة",
    template: "%s | دليل أسعار الذهب العربي",
  },
  description:
    "أحدث أسعار الذهب في الدول العربية (السعودية، مصر، الإمارات، الكويت، قطر، المغرب) لحظة بلحظة. عيار 24، 22، 21، 18، مع تقارير يومية وحاسبة زكاة الذهب ودليل المحلات.",
  keywords: ["أسعار الذهب", "سعر الذهب اليوم", "ذهب", "عيار 21", "عيار 24", "سعر الذهب في السعودية", "سعر الذهب في مصر", "زكاة الذهب", "محلات الذهب"],
  authors: [{ name: "دليل أسعار الذهب العربي" }],
  creator: "Abdelaziz Sleem",
  publisher: "دليل أسعار الذهب العربي",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://gold-price-arab.vercel.app/",
    siteName: "دليل أسعار الذهب العربي",
    title: "أسعار الذهب اليوم في الدول العربية | تغطية شاملة ودقيقة",
    description: "أحدث أسعار الذهب في الدول العربية لحظة بلحظة. عيارات 24، 22، 21، 18 مع حاسبة الزكاة.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "دليل أسعار الذهب العربي",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "دليل أسعار الذهب العربي | أسعار الذهب اليوم",
    description: "أحدث أسعار الذهب في الدول العربية لحظة بلحظة. عيارات 24، 22، 21، 18 مع حاسبة الزكاة.",
    images: ["/logo.png"],
    creator: "@abdelaziz_sleem", // Replace with actual handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf6" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1612" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${cairo.variable} ${amiri.variable} bg-background`}
    >
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
          <FloatingContact />
          <Toaster richColors position="top-center" dir="rtl" />
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
