"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"

export function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const password = String(formData.get("password") || "")
    if (!password) {
      toast.error("كلمة المرور مطلوبة")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "كلمة المرور غير صحيحة")
      }
      toast.success("تم تسجيل الدخول")
      router.push("/admin")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "فشل تسجيل الدخول")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input id="password" name="password" type="password" required dir="ltr" autoComplete="current-password" />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "جارٍ التحقق..." : "تسجيل الدخول"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
