import Link from "next/link"
import { Mail, MessageCircle, Send } from "lucide-react"
import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "نرحب باستفساراتك واقتراحاتك وملاحظاتك لتحسين خدماتنا",
}

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      <nav aria-label="breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          الرئيسية
        </Link>
        <span>/</span>
        <span className="text-foreground">تواصل معنا</span>
      </nav>

      <header className="mb-10">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">تواصل معنا</h1>
        <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          نسعد باستقبال استفساراتك واقتراحاتك لتحسين خدماتنا. راسلنا عبر النموذج التالي أو من خلال قنوات التواصل.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-5">
        <div className="md:col-span-3">
          <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8">
            <h2 className="mb-1 font-serif text-xl font-bold">أرسل لنا رسالة</h2>
            <p className="mb-6 text-sm text-muted-foreground">سنرد عليك في أقرب وقت ممكن</p>
            <ContactForm />
          </div>
        </div>

        <aside className="md:col-span-2">
          <div className="space-y-4">
            <ContactChannel
              icon={<Mail className="h-5 w-5" aria-hidden="true" />}
              title="البريد الإلكتروني"
              description="للاستفسارات العامة"
              value="support@goldprices.ar"
            />
            <ContactChannel
              icon={<MessageCircle className="h-5 w-5" aria-hidden="true" />}
              title="التواصل السريع"
              description="الرد خلال ساعات العمل"
              value="من خلال نموذج التواصل"
            />
            <ContactChannel
              icon={<Send className="h-5 w-5" aria-hidden="true" />}
              title="اقتراحات المحتوى"
              description="شاركنا أفكارك للمقالات"
              value="suggest@goldprices.ar"
            />
          </div>
        </aside>
      </div>
    </main>
  )
}

function ContactChannel({
  icon,
  title,
  description,
  value,
}: {
  icon: React.ReactNode
  title: string
  description: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
        {icon}
      </div>
      <h3 className="font-serif text-base font-semibold">{title}</h3>
      <p className="mb-2 text-xs text-muted-foreground">{description}</p>
      <p className="font-mono text-sm tabular-nums text-foreground">{value}</p>
    </div>
  )
}
