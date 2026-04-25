"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Coins, TrendingUp, Shield, Globe, Heart, Target, Award, Users, Sparkles, CheckCircle, Clock, MapPin, Phone, Mail, Crown, Diamond } from "lucide-react"

const features = [
  {
    icon: TrendingUp,
    title: "أسعار لحظية",
    description: "نعتمد على Metal Sentinel API العالمي ونحدّث الأسعار تلقائياً كل 5 دقائق.",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    icon: Globe,
    title: "تغطية عربية شاملة",
    description: "أسعار الذهب بجميع العملات المحلية العربية من السعودية إلى المغرب.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Coins,
    title: "جميع العيارات",
    description: "نعرض أسعار الذهب لجميع العيارات الشائعة 24، 22، 21، 18، 14، 12، 10.",
    color: "from-amber-500/20 to-yellow-500/20",
  },
  {
    icon: Shield,
    title: "شفافية وموثوقية",
    description: "مصادر بيانات معروفة وخوارزميات حساب واضحة بدون مبالغات تسويقية.",
    color: "from-purple-500/20 to-pink-500/20",
  },
]

const stats = [
  { value: "10+", label: "دولة عربية", icon: MapPin },
  { value: "24/7", label: "تحديث مستمر", icon: Clock },
  { value: "99.9%", label: "دقة البيانات", icon: Award },
  { value: "50K+", label: "مستخدم شهرياً", icon: Users },
]

const values = [
  {
    icon: Target,
    title: "الدقة",
    description: "نحرص على تقديم أدق الأسعار من مصادر موثوقة",
  },
  {
    icon: Heart,
    title: "الشفافية",
    description: "نكون واضحين في مصادر بياناتنا وخوارزمياتنا",
  },
  {
    icon: Crown,
    title: "الجودة",
    description: "نقدم أفضل تجربة مستخدم وأدوات مفيدة",
  },
  {
    icon: Users,
    title: "المصداقية",
    description: "نبني ثقتك من خلال محتوى موثوق ودقيق",
  },
]

export default function AboutPage() {
  const [particles, setParticles] = useState<{ left: string; top: string; delay: string; duration: string }[]>([])

  useEffect(() => {
    setParticles([...Array(25)].map(() => ({
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

      <div className="relative mx-auto max-w-5xl px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-primary">
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">من نحن</span>
        </nav>

        {/* Header */}
        <header className="mb-12 text-center animate-slide-up">
          <div className="flex w-32 mx-auto items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
            <Heart className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-primary">قصتنا ورؤيتنا</span>
          </div>

          <div className="relative block">
            <div className="absolute -inset-4 bg-linear-to-r from-primary/20 to-accent/20 rounded-full blur-3xl" />
            <h1 className="relative font-serif text-4xl font-bold md:text-5xl lg:text-6xl bg-linear-to-l from-foreground via-primary to-foreground bg-clip-text text-transparent">
              من نحن
            </h1>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            دليل أسعار الذهب العربي هو منصة متخصصة في تقديم أسعار الذهب اللحظية لجميع الدول العربية
            مع أدوات مفيدة لكل من يهتم بالاستثمار في الذهب أو متابعة أسعاره.
          </p>
        </header>

        {/* Stats Section */}
        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-card p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              style={{
                animationDelay: `${idx * 100}ms`
              }}
            >
              <div className="rounded-full bg-primary/10 p-2 transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                <stat.icon className="h-5 w-5 text-primary transition-colors group-hover:text-white" />
              </div>
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 md:items-center animate-slide-up animation-delay-100">
          <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-card to-background p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl md:p-8">
            <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-accent/20">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mb-3 font-serif text-2xl font-bold">مهمتنا</h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                نؤمن بأن الوصول إلى معلومات موثوقة عن أسعار الذهب يجب أن يكون سهلاً ومجانياً للجميع.
                لذلك نعمل على تقديم أسعار محدّثة بالعملات المحلية لجميع الدول العربية، مع أدوات إضافية
                مثل حاسبة الزكاة ودليل محلات الذهب لجعل تجربتك أكثر فائدة.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-primary/5 to-accent/5 transition-all duration-500 hover:shadow-xl">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src="/invest-gold.png"
                alt="الاستثمار في الذهب"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-12 animate-slide-up animation-delay-200">
          <div className="mb-6 text-center">
            <h2 className="font-serif text-2xl font-bold md:text-3xl">قيمنا التي نؤمن بها</h2>
            <p className="mt-2 text-sm text-muted-foreground">المبادئ التي توجه عملنا يومياً</p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="group text-center rounded-xl border border-border/60 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="mb-3 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-2 transition-all group-hover:scale-110 group-hover:bg-primary">
                    <value.icon className="h-5 w-5 text-primary transition-colors group-hover:text-white" />
                  </div>
                </div>
                <h3 className="mb-2 font-serif text-base font-semibold">{value.title}</h3>
                <p className="text-xs text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-12 animate-slide-up animation-delay-300">
          <div className="mb-6 text-center">
            <h2 className="font-serif text-2xl font-bold md:text-3xl">ما يميّزنا</h2>
            <p className="mt-2 text-sm text-muted-foreground">لماذا يثق بنا آلاف المستخدمين شهرياً</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className="relative flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-accent/20 text-primary transition-all duration-300 group-hover:scale-110">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-serif text-base font-semibold">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-br from-card to-background p-6 transition-all duration-300 hover:shadow-xl md:p-8 animate-slide-up animation-delay-400">
          <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/3 to-primary/0" />
          <div className="relative flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
              <Shield className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <h2 className="mb-2 font-serif text-xl font-bold md:text-2xl">إخلاء مسؤولية</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                جميع الأسعار المعروضة على هذا الموقع هي أسعار استرشادية للذهب الخام ولا تشمل المصنعية أو ضريبة القيمة
                المضافة أو أي رسوم إضافية تفرضها محلات الذهب. ننصح دائماً بالرجوع إلى تجار الذهب المعتمدين قبل اتخاذ أي
                قرار شراء أو بيع.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>نعمل دائماً على تحديث الأسعار للحفاظ على دقتها</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 rounded-2xl bg-linear-to-br from-primary/10 to-accent/10 p-8 text-center animate-slide-up animation-delay-500">
          <div className="mx-auto max-w-2xl">
            <Diamond className="mx-auto mb-4 h-10 w-10 text-primary" />
            <h3 className="mb-2 font-serif text-xl font-bold">تواصل معنا</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              هل لديك استفسار أو اقتراح؟ نرحب بتواصلك معنا
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-all hover:gap-3 hover:bg-primary/90"
              >
                اتصل بنا
                <Mail className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-2 text-sm font-medium transition-all hover:border-primary/40 hover:bg-primary/5"
              >
                استعرض الأسعار
                <TrendingUp className="h-4 w-4" />
              </Link>
            </div>
          </div>
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
      `}</style>
    </main>
  )
}