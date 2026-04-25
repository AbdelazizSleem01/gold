import Link from "next/link"
import { Mail, MessageCircle, Send, Phone, MapPin, Clock, Heart, Sparkles, CheckCircle, Users, Headphones, Globe, Shield } from "lucide-react"
import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "تواصل معنا - دليل أسعار الذهب العربي",
  description: "نسعد باستقبال استفساراتك واقتراحاتك وملاحظاتك. فريقنا جاهز للرد عليك في أقرب وقت ممكن",
  keywords: "تواصل معنا, اتصل بنا, دعم العملاء, استفسارات الذهب",
  openGraph: {
    title: "تواصل معنا - دليل أسعار الذهب العربي",
    description: "نرحب باستفساراتك واقتراحاتك لتحسين خدماتنا",
    type: "website",
  },
}

const contactChannels = [
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    description: "للاستفسارات العامة والدعم",
    value: "support@alrogaib.com",
    subValue: "نرد خلال 24 ساعة",
    color: "from-primary/20 to-bg-linear/20",
  },
  {
    icon: Phone,
    title: "الاتصال المباشر",
    description: "خدمة العملاء",
    value: "+20 11 5636 1792",
    subValue: "السبت - الخميس: 9ص - 9م",
    color: "from-primary/20 to-bg-linear/20",
  },
  {
    icon: Send,
    title: "اقتراحات المحتوى",
    description: "شاركنا أفكارك للمقالات",
    value: "suggest@alrogaib.com",
    subValue: "نقترحات المقالات والنصائح",
    color: "from-primary/20 to-bg-linear/20",
  },
  {
    icon: Globe,
    title: "التواصل الاجتماعي",
    description: "تابعنا على وسائل التواصل",
    value: "@alrogaib_gold",
    subValue: "فيسبوك، تويتر، انستقرام",
    color: "from-primary/20 to-bg-linear/20",
  },
]

const faqs = [
  {
    question: "متى يتم الرد على الاستفسارات؟",
    answer: "نحرص على الرد على جميع الاستفسارات خلال 24 ساعة في أيام العمل الرسمية.",
  },
  {
    question: "هل يمكنني طلب تحديثات الأسعار؟",
    answer: "نعم، الأسعار تُحدث تلقائياً كل 5 دقائق. يمكنك متابعة الصفحة الرئيسية للحصول على أحدث الأسعار.",
  },
  {
    question: "كيف يمكنني الإبلاغ عن مشكلة؟",
    answer: "يمكنك استخدام نموذج التواصل أو مراسلتنا مباشرة على البريد الإلكتروني مع وصف المشكلة بالتفصيل.",
  },
]

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden">
      {/* Background animated effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 -left-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 -right-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/3 blur-3xl animate-pulse delay-500" />

        {/* Floating particles */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 7}s`,
            }}
          >
            <Sparkles className="h-1.5 w-1.5 text-primary/30" />
          </div>
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-primary">
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">تواصل معنا</span>
        </nav>

        {/* Header */}
        <header className="mb-12 text-center animate-slide-up">
          <div className="flex justify-center w-fit mx-auto items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
            <Heart className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-primary">نسعد بخدمتك</span>
          </div>

          <div className="relative block">
            <div className="absolute -inset-4 bg-linear-to-r from-primary/20 to-accent/20 rounded-full blur-3xl" />
            <h1 className="relative font-serif text-4xl font-bold md:text-5xl lg:text-6xl bg-linear-to-l from-foreground via-primary to-foreground bg-clip-text text-transparent">
              تواصل معنا
            </h1>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            نسعد باستقبال استفساراتك واقتراحاتك وملاحظاتك لتحسين خدماتنا.
            فريقنا جاهز للرد عليك في أقرب وقت ممكن.
          </p>
        </header>

        {/* Trust Badges */}
        <div className="mb-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="flex items-center justify-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs">
            <CheckCircle className="h-3.5 w-3.5 text-primary" />
            <span>رد سريع</span>
          </div>
          <div className="flex items-center justify-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs">
            <Users className="h-3.5 w-3.5 text-primary" />
            <span>دعم متخصص</span>
          </div>
          <div className="flex items-center justify-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs">
            <Headphones className="h-3.5 w-3.5 text-primary" />
            <span>خدمة 24/7</span>
          </div>
          <div className="flex items-center justify-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span>خصوصية تامة</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact Form */}
          <div className="lg:col-span-3 animate-slide-up animation-delay-100">
            <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-card to-background p-6 transition-all duration-500 hover:shadow-2xl md:p-8">
              <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-6">
                  <h2 className="font-serif text-2xl font-bold">أرسل لنا رسالة</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    سنرد عليك في أقرب وقت ممكن
                  </p>
                </div>

                <ContactForm />
              </div>
            </div>
          </div>

          {/* Contact Channels */}
          <div className="lg:col-span-2 animate-slide-up animation-delay-200">
            <div className="space-y-4">


              {contactChannels.map((channel, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                  style={{
                    animationDelay: `${idx * 100}ms`
                  }}
                >
                  <div className={`absolute inset-0 bg-linear-to-br ${channel.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                  <div className="relative">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-primary/20 to-accent/20 text-primary transition-all duration-300 group-hover:scale-110">
                      <channel.icon className="h-5 w-5" />
                    </div>

                    <h3 className="font-serif text-base font-semibold">{channel.title}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">{channel.description}</p>

                    <div className="mt-3">
                      <p className="font-mono text-sm font-medium text-foreground">{channel.value}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{channel.subValue}</p>
                    </div>

                    {channel.title === "التواصل الاجتماعي" && (
                      <div className="mt-3 flex gap-2">
                        <div className="rounded-full bg-primary/10 px-2 py-1 text-[10px]">فيسبوك</div>
                        <div className="rounded-full bg-primary/10 px-2 py-1 text-[10px]">تويتر</div>
                        <div className="rounded-full bg-primary/10 px-2 py-1 text-[10px]">انستقرام</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Office Info */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 animate-slide-up animation-delay-300">
          <div className="flex items-center gap-4 rounded-xl border border-border/60 bg-card p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">موقعنا</h3>
              <p className="text-sm text-muted-foreground">المملكة العربية السعودية، الرياض</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-border/60 bg-card p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">ساعات العمل</h3>
              <p className="text-sm text-muted-foreground">السبت - الخميس: 9 صباحاً - 9 مساءً</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 rounded-2xl bg-linear-to-br from-muted/30 to-background p-6 md:p-8 animate-slide-up animation-delay-400">
          <div className="mb-6 text-center">
            <h2 className="font-serif text-xl font-bold md:text-2xl">الأسئلة الشائعة</h2>
            <p className="mt-1 text-sm text-muted-foreground">إجابات لأكثر الأسئلة شيوعاً</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-border/60 bg-card p-4">
                <h3 className="mb-2 font-semibold text-sm">{faq.question}</h3>
                <p className="text-xs text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Response Time Note */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>نلتزم بالرد على جميع الاستفسارات خلال 24 ساعة في أيام العمل الرسمية</p>
        </div>
      </div>
    </main>
  )
}