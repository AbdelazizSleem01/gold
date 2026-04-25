import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "من نحن - دليل أسعار الذهب العربي | قصتنا ورؤيتنا",
  description: "تعرف على قصتنا ومهمتنا في تقديم أسعار الذهب بدقة وشفافية لجميع الدول العربية. نؤمن بأن الوصول للمعلومات الموثوقة حق للجميع",
  keywords: "من نحن, أسعار الذهب, دليل الذهب العربي, عن الموقع",
  openGraph: {
    title: "من نحن - دليل أسعار الذهب العربي",
    description: "تعرف على مهمتنا في تقديم أسعار الذهب بدقة وشفافية",
    type: "website",
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
