import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "إخلاء مسؤولية",
  description: "إخلاء مسؤولية وشروط استخدام موقع دليل أسعار الذهب العربي",
}

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      <nav aria-label="breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          الرئيسية
        </Link>
        <span>/</span>
        <span className="text-foreground">إخلاء مسؤولية</span>
      </nav>

      <header className="mb-10">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">إخلاء مسؤولية</h1>
        <p className="mt-2 text-sm text-muted-foreground">شروط استخدام الموقع والتحذيرات المهمة</p>
      </header>

      <div className="space-y-8 text-sm leading-relaxed text-foreground/90 md:text-base">
        <section>
          <h2 className="mb-3 font-serif text-xl font-bold">طبيعة الأسعار المعروضة</h2>
          <p className="text-muted-foreground">
            جميع أسعار الذهب المعروضة على هذا الموقع هي أسعار استرشادية للذهب الخام (السبائك) ولا تشمل:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-2 text-muted-foreground">
            <li>مصنعية الصياغة والتشكيل</li>
            <li>ضريبة القيمة المضافة (VAT)</li>
            <li>رسوم الاستيراد أو الجمارك</li>
            <li>هامش ربح تجار الذهب</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-xl font-bold">مصدر البيانات</h2>
          <p className="text-muted-foreground">
            نعتمد في جلب أسعار الذهب على Metal Sentinel API التي توفر أسعار الذهب العالمية. يتم تحويل الأسعار إلى
            العملات المحلية باستخدام أسعار صرف تقديرية قد تختلف slightly عن أسعار السوق الفعلية في كل دولة.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-xl font-bold">عدم تقديم نصائج استثمارية</h2>
          <p className="text-muted-foreground">
            لا يقدم هذا الموقع نصائح استثمارية أو توصيات شراء/بيع. المعلومات المعروضة هي لأغراض إعلامية فقط. يجب على
            المستثمرين استشارة متخصصين ماليين قبل اتخاذ أي قرارات استثمارية.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-xl font-bold">حسابات الزكاة</h2>
          <p className="text-muted-foreground">
            حاسبة الزكاة الموجودة على الموقع هي أداة استرشادية تعتمد على الأسعار المتاحة. للمسائل الفقهية التفصيلية
            (مثل زكاة الذهب المستعمل للزينة، أو الذهب المؤجر، أو المعادن الأخرى) ننصح بالرجوع إلى أهل العلم والمختصين.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-xl font-bold">محلات الذهب</h2>
          <p className="text-muted-foreground">
            المعلومات المتعلقة بمحلات الذهب مقدمة من أصحاب المحلات أو جُمعت من مصادر عامة. نحن لا نضمن دقة بيانات
            الاتصال أو العناوين. يتحمل المستخدم مسؤولية التحقق من صحة المعلومات قبل الزيارة أو التعامل.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-xl font-bold">التغييرات والتحديثات</h2>
          <p className="text-muted-foreground">
            نسعى لتحديث الأسعار باستمرار، لكننا لا نضمن أن تكون الأسعار دقيقة في كل لحظة. قد توجد تأخيرات في
            التحديث أو انقطاعات مؤقتة في الخدمة.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-xl font-bold">المسؤولية القانونية</h2>
          <p className="text-muted-foreground">
            باستخدامك لهذا الموقع، فإنك توافق على أن الموقع ومشغليه غير مسؤولين عن أي خسائر أو أضرار مباشرة أو غير
            مباشرة قد تنشأ عن استخدام المعلومات المقدمة.
          </p>
        </section>

        <section className="rounded-xl border border-border/60 bg-muted/30 p-5">
          <h2 className="mb-3 font-serif text-xl font-bold">للاستفسارات</h2>
          <p className="text-muted-foreground">
            إذا كان لديك أي استفسارات حول إخلاء المسؤولية، يرجى{" "}
            <Link href="/contact" className="text-primary hover:underline">
              التواصل معنا
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  )
}
