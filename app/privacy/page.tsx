import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية وحماية البيانات على دليل أسعار الذهب العربي",
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      <nav aria-label="breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          الرئيسية
        </Link>
        <span>/</span>
        <span className="text-foreground">سياسة الخصوصية</span>
      </nav>

      <header className="mb-10">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">سياسة الخصوصية</h1>
        <p className="mt-2 text-sm text-muted-foreground">آخر تحديث: 2026/04/25</p>
      </header>

      <div className="space-y-8 text-sm leading-relaxed text-foreground/90 md:text-base">
        <section>
          <h2 className="mb-3 font-serif text-xl font-bold">مقدمة</h2>
          <p className="text-muted-foreground">
            نحن في دليل أسعار الذهب العربي نحترم خصوصية مستخدمينا ونلتزم بحماية بياناتهم الشخصية. توضّح هذه السياسة
            أنواع المعلومات التي نجمعها وكيفية استخدامها وحمايتها.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-xl font-bold">البيانات التي نجمعها</h2>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>بيانات نموذج التواصل: الاسم، البريد الإلكتروني، الرسالة. تُستخدم فقط للرد على استفساراتك.</li>
            <li>إحصائيات استخدام مجهولة الهوية (عدد الزيارات، الصفحات الأكثر زيارة) لتحسين تجربة الموقع.</li>
            <li>بيانات التنقل (ملفات Cookies تقنية) لحفظ تفضيلاتك مثل الوضع الداكن.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-xl font-bold">كيف نستخدم بياناتك</h2>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>الرد على استفساراتك وطلباتك عبر نموذج التواصل.</li>
            <li>تحسين محتوى الموقع وتطوير خدماتنا.</li>
            <li>لا نبيع أو نشارك بياناتك مع أي طرف ثالث لأغراض تسويقية.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-xl font-bold">ملفات تعريف الارتباط (Cookies)</h2>
          <p className="text-muted-foreground">
            نستخدم ملفات تعريف ارتباط تقنية فقط لحفظ تفضيلات العرض الخاصة بك (مثل الوضع الليلي). يمكنك تعطيلها من
            إعدادات متصفحك في أي وقت.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-xl font-bold">مصادر البيانات الخارجية</h2>
          <p className="text-muted-foreground">
            نعتمد على Metal Sentinel API للحصول على أسعار الذهب العالمية. لا يتم إرسال أي من بياناتك الشخصية إلى هذه
            الخدمات.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-xl font-bold">حقوقك</h2>
          <p className="text-muted-foreground">
            يحق لك طلب الاطلاع على بياناتك أو تعديلها أو حذفها في أي وقت. للتواصل معنا بشأن بياناتك، يرجى زيارة{" "}
            <Link href="/contact" className="text-primary hover:underline">
              صفحة التواصل
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-serif text-xl font-bold">التعديلات</h2>
          <p className="text-muted-foreground">
            قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. ستُنشر أي تعديلات على هذه الصفحة مع تحديث تاريخ "آخر تحديث"
            أعلاه.
          </p>
        </section>
      </div>
    </main>
  )
}
