import type { Metadata, Viewport } from "next"
import { Cairo, Amiri } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
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
  title: {
    default: "أسعار الذهب اليوم في الدول العربية",
    template: "%s | أسعار الذهب",
  },
  description:
    "أحدث أسعار الذهب في الدول العربية لحظة بلحظة، عيار 24 و 22 و 21 و 18، مع تقارير ومتاجر وحاسبة زكاة الذهب.",
  keywords: ["أسعار الذهب", "سعر الذهب اليوم", "ذهب", "عيار 21", "عيار 24", "زكاة الذهب", "محلات الذهب"],
  generator: "v0.app",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    title: "أسعار الذهب اليوم في الدول العربية",
    description: "أحدث أسعار الذهب في الدول العربية لحظة بلحظة.",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf6" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1612" },
  ],
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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
          <Toaster richColors position="top-center" dir="rtl" />
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
