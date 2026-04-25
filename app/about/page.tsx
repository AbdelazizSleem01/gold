import Link from "next/link"
import Image from "next/image"
import { Coins, TrendingUp, Shield, Globe } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "من نحن - دليل أسعار الذهب العربي",
  description: "تعرّف على مهمتنا في تقديم أسعار الذهب بدقة وشفافية لجميع الدول العربية",
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      <nav aria-label="breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          الرئيسية
        </Link>
        <span>/</span>
        <span className="text-foreground">من نحن</span>
      </nav>

      <header className="mb-10">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">من نحن</h1>
        <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          دليل أسعار الذهب العربي هو منصة متخصصة في تقديم أسعار الذهب اللحظية لجميع الدول العربية مع أدوات مفيدة لكل
          من يهتم بالاستثمار في الذهب أو متابعة أسعاره.
        </p>
      </header>

      <section className="mb-10 grid gap-6 md:grid-cols-2 md:items-center">
        <div className="rounded-2xl border border-border/60 bg-linear-to-bl from-primary/5 to-transparent p-6 md:p-8">
          <h2 className="mb-3 font-serif text-2xl font-bold">مهمتنا</h2>
          <p className="text-pretty text-base leading-relaxed text-muted-foreground">
            نؤمن بأن الوصول إلى معلومات موثوقة عن أسعار الذهب يجب أن يكون سهلاً ومجانياً للجميع. لذلك نعمل على تقديم
            أسعار محدّثة بالعملات المحلية لجميع الدول العربية، مع أدوات إضافية مثل حاسبة الزكاة ودليل محلات الذهب
            لجعل تجربتك أكثر فائدة.
          </p>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-border/60">
          <Image
            src="/invest-gold.png"
            alt="الاستثمار في الذهب"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="mb-10 grid gap-6 md:grid-cols-2 md:items-center">
        <div className="order-2 md:order-1">
          <h2 className="mb-6 font-serif text-2xl font-bold">ما يميّزنا</h2>
          <div className="grid gap-4">
          <Feature
            icon={<TrendingUp className="h-5 w-5" aria-hidden="true" />}
            title="أسعار لحظية"
            description="نعتمد على Metal Sentinel API العالمي ونحدّث الأسعار تلقائياً كل 5 دقائق."
          />
          <Feature
            icon={<Globe className="h-5 w-5" aria-hidden="true" />}
            title="تغطية عربية شاملة"
            description="أسعار الذهب بجميع العملات المحلية العربية من السعودية إلى المغرب."
          />
          <Feature
            icon={<Coins className="h-5 w-5" aria-hidden="true" />}
            title="جميع العيارات"
            description="نعرض أسعار الذهب لجميع العيارات الشائعة 24، 22، 21، 18، 14، 12، 10."
          />
          <Feature
            icon={<Shield className="h-5 w-5" aria-hidden="true" />}
            title="شفافية وموثوقية"
            description="مصادر بيانات معروفة وخوارزميات حساب واضحة بدون مبالغات تسويقية."
          />
          </div>
        </div>
        <div className="order-1 relative aspect-video overflow-hidden rounded-2xl border border-border/60 md:order-2">
          <Image
            src="/gold-jewelry.png"
            alt="مجوهرات الذهب"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-border/60 bg-card p-6 md:p-8">
        <h2 className="mb-3 font-serif text-2xl font-bold">إخلاء مسؤولية</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          جميع الأسعار المعروضة على هذا الموقع هي أسعار استرشادية للذهب الخام ولا تشمل المصنعية أو ضريبة القيمة
          المضافة أو أي رسوم إضافية تفرضها محلات الذهب. ننصح دائماً بالرجوع إلى تجار الذهب المعتمدين قبل اتخاذ أي
          قرار شراء أو بيع.
        </p>
      </section>
    </main>
  )
}

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-4 rounded-xl border border-border/60 bg-card p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
        {icon}
      </div>
      <div>
        <h3 className="mb-1 font-serif text-base font-semibold">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
