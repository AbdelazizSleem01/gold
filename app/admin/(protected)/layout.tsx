// app/admin/layout.tsx
import { redirect } from "next/navigation"
import Link from "next/link"
import { isAdminAuthenticated } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "لوحة التحكم",
  robots: { index: false, follow: false },
}

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const ok = await isAdminAuthenticated()
  if (!ok) redirect("/admin/login")

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <AdminSidebar />
      <div className="transition-[margin] duration-300" style={{ marginRight: 'var(--sidebar-width, 16rem)' }}>
        <div className="px-4 py-8 md:px-8">
          <div className="mx-auto max-w-5xl">
            <nav aria-label="breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                الموقع
              </Link>
              <span>/</span>
              <Link href="/admin" className="hover:text-primary">
                لوحة التحكم
              </Link>
            </nav>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}