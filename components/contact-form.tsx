"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Send } from "lucide-react"

export function ContactForm() {
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
    }

    if (!data.name || !data.email || !data.message) {
      toast.error("يرجى تعبئة الحقول المطلوبة")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      toast.success("تم إرسال رسالتك بنجاح")
      ;(e.target as HTMLFormElement).reset()
    } catch {
      toast.error("تعذّر إرسال الرسالة. حاول مرة أخرى")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">الاسم *</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">البريد الإلكتروني *</Label>
          <Input id="email" name="email" type="email" required dir="ltr" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="subject">الموضوع</Label>
        <Input id="subject" name="subject" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="message">الرسالة *</Label>
        <Textarea id="message" name="message" rows={6} required />
      </div>
      <Button type="submit" disabled={loading} className="gap-2 self-start">
        <Send className="h-4 w-4" aria-hidden="true" />
        {loading ? "جارٍ الإرسال..." : "إرسال الرسالة"}
      </Button>
    </form>
  )
}
