import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "سياسة الخصوصية - حماية بياناتك في دليل أسعار الذهب",
  description: "نحن نحمي خصوصية بياناتك. تعرف على كيفية جمع واستخدام وحماية معلوماتك الشخصية في دليل أسعار الذهب العربي",
  keywords: "سياسة الخصوصية, حماية البيانات, خصوصية الذهب, أمان المعلومات",
  openGraph: {
    title: "سياسة الخصوصية - دليل أسعار الذهب",
    description: "نحن نحمي خصوصية بياناتك ونتعهد بحمايتها",
    type: "website",
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
