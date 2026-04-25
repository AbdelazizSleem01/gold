// components/admin/admin-sidebar.tsx
"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Newspaper, Store, Mail, LogOut, Coins, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import { useState, useEffect } from "react"

const MENU = [
  { href: "/admin", label: "الرئيسية", icon: LayoutDashboard },
  { href: "/admin/posts", label: "المقالات", icon: Newspaper },
  { href: "/admin/shops", label: "محلات الذهب", icon: Store },
  { href: "/admin/messages", label: "الرسائل", icon: Mail },
] as const

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      // Auto-close on mobile, open on desktop
      if (window.innerWidth < 1024) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  async function logout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      toast.success("تم تسجيل الخروج")
      router.push("/admin/login")
      router.refresh()
    } catch {
      toast.error("تعذّر تسجيل الخروج")
    }
  }

  const sidebarWidth = isOpen ? "w-64" : "w-16"

  // Sync sidebar width to CSS variable so the layout can respond
  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', isOpen ? '16rem' : '4rem')
  }, [isOpen])

  return (
    <>
      {/* Sidebar */}
      <aside 
        className={`fixed bottom-0 right-0 top-0 z-40 flex flex-col border-l border-border/60 bg-card shadow-xl transition-all duration-300 ease-in-out ${sidebarWidth} ${
          isOpen ? "translate-x-0" : isMobile ? "translate-x-full" : "translate-x-0"
        }`}
      >
        {/* Logo / Toggle section */}
        <div className={`border-b border-border/60 transition-all duration-200 ${isOpen ? "p-6" : "p-3"}`}>
          {isOpen ? (
            <Link href="/admin" className="flex items-center gap-2 font-serif text-lg font-bold">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Coins className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="whitespace-nowrap">لوحة التحكم</span>
            </Link>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-card p-0 shadow-md transition-all hover:bg-accent"
              aria-label="فتح القائمة"
            >
              <ChevronRight className="h-5 w-5 rotate-180" />
            </button>
          )}
          {/* Close button when open */}
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="absolute left-4 top-5 rounded-lg border border-border/60 bg-card p-2 shadow-md transition-all hover:bg-accent"
              aria-label="إغلاق القائمة"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4" aria-label="قائمة الإدارة">
          {MENU.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative mx-2 mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                } ${!isOpen && "justify-center"}`}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className={`whitespace-nowrap transition-all duration-200 ${!isOpen ? "hidden" : "block"}`}>
                  {item.label}
                </span>
                {/* Tooltip for collapsed state */}
                {!isOpen && (
                  <span className="absolute right-full mr-2 hidden rounded-md bg-foreground px-2 py-1 text-xs text-background whitespace-nowrap group-hover:block">
                    {item.label}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
        
        {/* Logout button */}
        <div className={`border-t border-border/60 p-4 transition-all duration-200 ${!isOpen && "p-2"}`}>
          <Button 
            variant="outline" 
            size="sm" 
            className={`gap-2 bg-transparent transition-all duration-200 ${!isOpen ? "w-full justify-center px-2" : "w-full"}`} 
            onClick={logout}
          >
            <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className={`whitespace-nowrap transition-all duration-200 ${!isOpen ? "hidden" : "block"}`}>
              تسجيل الخروج
            </span>
          </Button>
        </div>
      </aside>

      {/* Mobile toggle button - visible when sidebar is hidden */}
      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed right-4 top-20 z-50 rounded-lg border border-border/60 bg-card p-2 shadow-md hover:bg-accent"
          aria-label="فتح القائمة"
        >
          <ChevronRight className="h-5 w-5 rotate-180" />
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}