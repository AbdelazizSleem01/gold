"use client"

import { useState, useEffect } from "react"
import { Bot, X, Send, Sparkles, Loader2 } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { Button } from "@/components/ui/button"

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "مرحباً بك! أنا مساعدك الذكي في دليل أسعار الذهب العربي. كيف يمكنني مساعدتك اليوم؟" }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowButtons(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = { role: "user" as const, content: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      const data = await response.json()
      if (data.message) {
        setMessages(prev => [...prev, data.message])
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "عذراً، حدث خطأ ما. يرجى المحاولة لاحقاً." }])
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "عذراً، لم أستطع الاتصال بالخادم." }])
    } finally {
      setIsLoading(false)
    }
  }

  const whatsappNumber = "+201156361792"
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace("+", "")}`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* Chatbot Window */}
      {isOpen && (
        <div className="-mb-20 w-[calc(100vw-2rem)] z-50 overflow-hidden rounded-2xl border border-border/60 bg-background/90 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300 md:w-96">
          <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground shadow-lg">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-white/20 p-1.5 backdrop-blur-md">
                  <Bot className="h-full w-full" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-primary bg-green-500 animate-pulse" />
              </div>
              <div>
                <div className="text-sm font-bold">مساعد الذهب الذكي</div>
                <div className="text-[10px] opacity-90">متصل الآن - مدعوم بالذكاء الاصطناعي</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex h-[350px] flex-col gap-4 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-primary/20">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-muted text-foreground rounded-tl-none border border-border/50"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-end">
                <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>يفكر...</span>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border/30 bg-muted/30 p-4">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اسأل عن أسعار الذهب، الاستثمار..."
                className="flex-1 rounded-full border border-border/60 bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button 
                type="submit"
                size="icon" 
                className="h-9 w-9 rounded-full shadow-lg shadow-primary/20 transition-transform active:scale-95"
                disabled={isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}

      <div className={`flex flex-col gap-3 transition-all duration-700 ${showButtons ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[#25D366]/40"
          title="تواصل عبر واتساب"
        >
          <div className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/20" />
          <FaWhatsapp className="relative h-7 w-7" />
          
          {/* Tooltip */}
          <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-all group-hover:opacity-100">
            تواصل معنا
          </span>
        </a>

        {/* Chatbot Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-primary/40 ${isOpen ? "rotate-90 shadow-none" : ""}`}
          title="مساعد الذهب"
        >
          <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20" />
          {isOpen ? <X className="relative h-6 w-6" /> : <Bot className="relative h-7 w-7" />}
          
          {/* Tooltip */}
          {!isOpen && (
            <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-all group-hover:opacity-100">
              المساعد الذكي
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
