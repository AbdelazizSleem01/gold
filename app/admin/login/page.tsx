import { redirect } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/auth"
import { LoginForm } from "@/components/admin/login-form"
import { Lock } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "تسجيل دخول المدير",
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin")
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <Lock className="h-7 w-7" aria-hidden="true" />
          </div>
          <h1 className="font-serif text-2xl font-bold">لوحة تحكم المدير</h1>
          <p className="mt-1 text-sm text-muted-foreground">يرجى إدخال كلمة المرور للمتابعة</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
