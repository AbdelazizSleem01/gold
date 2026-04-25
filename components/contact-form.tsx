"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Send, User, Mail, MessageSquare, AlertCircle, CheckCircle, Sparkles } from "lucide-react"

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const isFormValid = () => {
    return formData.name.trim() !== "" &&
      validateEmail(formData.email) &&
      formData.message.trim() !== ""
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Validation
    if (!formData.name.trim()) {
      toast.error("الرجاء إدخال الاسم")
      return
    }

    if (!validateEmail(formData.email)) {
      toast.error("الرجاء إدخال بريد إلكتروني صحيح")
      return
    }

    if (!formData.message.trim()) {
      toast.error("الرجاء إدخال الرسالة")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error()

      toast.success("تم إرسال رسالتك بنجاح", {
        icon: <CheckCircle className="h-4 w-4" />,
        duration: 4000,
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch {
      toast.error("تعذّر إرسال الرسالة. حاول مرة أخرى", {
        icon: <AlertCircle className="h-4 w-4" />,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative flex flex-col gap-6">
      {/* Animated background effect on focus */}
      <div className={`absolute -inset-1 rounded-2xl bg-linear-to-r from-primary/20 to-accent/20 opacity-0 transition-opacity duration-500 `} />

      <div className="relative space-y-5">
        {/* Name and Email Grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Name Field */}
          <div className="group relative space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
              <User className="h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
              الاسم <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                required
                className="h-11 border-border/60 bg-background pr-4 transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/10"
                placeholder="أدخل اسمك الكامل"
              />
              {formData.name && (
                <CheckCircle className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-500" />
              )}
            </div>
            <p className="text-[11px] text-muted-foreground">سيتم استخدامه للرد عليك</p>
          </div>

          {/* Email Field */}
          <div className="group relative space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
              <Mail className="h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
              البريد الإلكتروني <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                required
                dir="ltr"
                className="h-11 border-border/60 bg-background transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/10"
                placeholder="example@email.com"
              />
              {formData.email && validateEmail(formData.email) && (
                <CheckCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-500" />
              )}
              {formData.email && !validateEmail(formData.email) && (
                <AlertCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-500" />
              )}
            </div>
            <p className="text-[11px] text-muted-foreground">لن يتم مشاركته مع أي طرف ثالث</p>
          </div>
        </div>

        {/* Subject Field */}
        <div className="group relative space-y-2">
          <Label htmlFor="subject" className="flex items-center gap-2 text-sm font-medium">
            <MessageSquare className="h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            الموضوع
          </Label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onFocus={() => setFocusedField("subject")}
            onBlur={() => setFocusedField(null)}
            className="h-11 border-border/60 bg-background transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/10"
            placeholder="مثال: استفسار عن أسعار الذهب"
          />
        </div>

        {/* Message Field */}
        <div className="group relative space-y-2">
          <Label htmlFor="message" className="flex items-center gap-2 text-sm font-medium">
            <MessageSquare className="h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            الرسالة <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              rows={6}
              required
              className="resize-none border-border/60 bg-background transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/10"
              placeholder="اكتب رسالتك هنا... سعداء بسماع رأيك واستفساراتك"
            />
            {/* Character counter */}
            {formData.message && (
              <div className="absolute bottom-2 left-3 text-[10px] text-muted-foreground">
                {formData.message.length} حرف
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading || !isFormValid()}
            className="group relative w-full overflow-hidden bg-linear-to-l from-primary to-accent text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/25 sm:w-auto sm:min-w-[180px]"
          >
            {/* Animated sparkle effect */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <Sparkles className="h-16 w-16 text-white/20 animate-pulse" />
            </div>

            <span className="relative flex items-center gap-2">
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  إرسال الرسالة
                </>
              )}
            </span>
          </Button>

          {/* Form validity hint */}
          {!isFormValid() && (
            <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <AlertCircle className="h-3 w-3" />
              الحقول المطلوبة: الاسم، البريد الإلكتروني، الرسالة
            </p>
          )}
        </div>
      </div>
    </form>
  )
}