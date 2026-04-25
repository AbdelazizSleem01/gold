"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Shield, Lock, Eye, Cookie, Database, UserCheck, FileText, Heart, Sparkles, CheckCircle, Server, Mail, Settings } from "lucide-react"

const privacySections = [
  {
    icon: FileText,
    title: "مقدمة",
    content: "نحن في دليل أسعار الذهب العربي نحترم خصوصية مستخدمينا ونلتزم بحماية بياناتهم الشخصية. توضّح هذه السياسة أنواع المعلومات التي نجمعها وكيفية استخدامها وحمايتها.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Database,
    title: "البيانات التي نجمعها",
    list: [
      "بيانات نموذج التواصل: الاسم، البريد الإلكتروني، الرسالة. تُستخدم فقط للرد على استفساراتك.",
      "إحصائيات استخدام مجهولة الهوية (عدد الزيارات، الصفحات الأكثر زيارة) لتحسين تجربة الموقع.",
      "بيانات التنقل (ملفات Cookies تقنية) لحفظ تفضيلاتك مثل الوضع الداكن.",
    ],
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: Eye,
    title: "كيف نستخدم بياناتك",
    list: [
      "الرد على استفساراتك وطلباتك عبر نموذج التواصل.",
      "تحسين محتوى الموقع وتطوير خدماتنا.",
      "لا نبيع أو نشارك بياناتك مع أي طرف ثالث لأغراض تسويقية.",
    ],
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: Cookie,
    title: "ملفات تعريف الارتباط (Cookies)",
    content: "نستخدم ملفات تعريف ارتباط تقنية فقط لحفظ تفضيلات العرض الخاصة بك (مثل الوضع الليلي). يمكنك تعطيلها من إعدادات متصفحك في أي وقت.",
    color: "from-orange-500/20 to-amber-500/20",
  },
  {
    icon: Server,
    title: "مصادر البيانات الخارجية",
    content: "نعتمد على Metal Sentinel API للحصول على أسعار الذهب العالمية. لا يتم إرسال أي من بياناتك الشخصية إلى هذه الخدمات.",
    color: "from-indigo-500/20 to-blue-500/20",
  },
  {
    icon: UserCheck,
    title: "حقوقك",
    content: "يحق لك طلب الاطلاع على بياناتك أو تعديلها أو حذفها في أي وقت. للتواصل معنا بشأن بياناتك، يرجى زيارة ",
    color: "from-red-500/20 to-rose-500/20",
  },
  {
    icon: Settings,
    title: "التعديلات",
    content: "قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. ستُنشر أي تعديلات على هذه الصفحة مع تحديث تاريخ 'آخر تحديث' أعلاه.",
    color: "from-slate-500/20 to-gray-500/20",
  },
]

export default function PrivacyPage() {
  const [particles, setParticles] = useState<{ left: string; top: string; delay: string; duration: string }[]>([])

  useEffect(() => {
    setParticles([...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 7}s`,
    })))
  }, [])

  return (
    <main className="relative overflow-hidden">
      {/* Background animated effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-20 -left-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 -right-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/3 blur-3xl animate-pulse delay-500" />

        {/* Floating particles */}
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          >
            <Sparkles className="h-1.5 w-1.5 text-primary/30" />
          </div>
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-primary">
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">سياسة الخصوصية</span>
        </nav>

        {/* Header */}
        <header className="mb-12 text-center animate-slide-up">
          <div className="flex w-32 mx-auto items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-primary">خصوصية وأمان</span>
          </div>

          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-linear-to-r from-primary/20 to-accent/20 rounded-full blur-3xl" />
            <h1 className="relative font-serif text-4xl font-bold md:text-5xl lg:text-6xl bg-linear-to-l from-foreground via-primary to-foreground bg-clip-text text-transparent">
              سياسة الخصوصية
            </h1>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs">
              <Lock className="h-3 w-3 text-primary" />
              <span>محدثة: 2026/04/25</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs">
              <Heart className="h-3 w-3 text-primary" />
              <span>نحمي خصوصيتك</span>
            </div>
          </div>
        </header>

        {/* Trust Badges */}
        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-card p-4 text-center transition-all hover:-translate-y-1 hover:border-primary/40">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xs font-medium">حماية متكاملة</span>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-card p-4 text-center transition-all hover:-translate-y-1 hover:border-primary/40">
            <Lock className="h-6 w-6 text-primary" />
            <span className="text-xs font-medium">بيانات مشفرة</span>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-card p-4 text-center transition-all hover:-translate-y-1 hover:border-primary/40">
            <CheckCircle className="h-6 w-6 text-primary" />
            <span className="text-xs font-medium">ملتزمون بالشفافية</span>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-card p-4 text-center transition-all hover:-translate-y-1 hover:border-primary/40">
            <UserCheck className="h-6 w-6 text-primary" />
            <span className="text-xs font-medium">أنت تتحكم</span>
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-6">
          {privacySections.map((section, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-card to-background p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 md:p-8"
              style={{
                animationDelay: `${idx * 100}ms`
              }}
            >
              {/* Animated gradient background */}
              <div className={`absolute inset-0 bg-linear-to-br ${section.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

              <div className="relative">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-accent/20 text-primary transition-all duration-300 group-hover:scale-110 group-hover:from-primary group-hover:to-accent group-hover:text-white">
                    <section.icon className="h-6 w-6" />
                  </div>
                  <h2 className="font-serif text-xl font-bold md:text-2xl">{section.title}</h2>
                </div>

                {section.content && (
                  <div className="space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                    <p>{section.content}</p>
                    {section.title === "حقوقك" && (
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-primary transition-all hover:gap-3"
                      >
                        صفحة التواصل
                        <Mail className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                )}

                {section.list && (
                  <ul className="space-y-3">
                    {section.list.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 rounded-2xl bg-linear-to-br from-primary/10 to-accent/10 p-8 text-center animate-slide-up animation-delay-700">
          <div className="mx-auto max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 mb-4">
              <Heart className="h-3 w-3 text-primary" />
              <span className="text-xs font-medium text-primary">نسعد بخدمتك</span>
            </div>
            <h3 className="mb-2 font-serif text-2xl font-bold">لديك استفسار؟</h3>
            <p className="mb-6 text-sm text-muted-foreground">
              إذا كان لديك أي سؤال حول سياسة الخصوصية، لا تتردد في التواصل معنا
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:gap-3 hover:bg-primary/90"
            >
              تواصل معنا
              <Mail className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>باستخدامك للموقع، فإنك توافق على سياسة الخصوصية هذه</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-3px) translateX(3px);
          }
          75% {
            transform: translateY(3px) translateX(-3px);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </main>
  )
}