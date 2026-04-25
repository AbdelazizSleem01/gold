"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Check, Trash2 } from "lucide-react"
import { markMessageRead, deleteMessage } from "@/app/admin/actions/messages"

export function MessageActions({ id, read }: { id: string; read: boolean }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleMarkRead() {
    startTransition(async () => {
      try {
        await markMessageRead(id, !read)
        router.refresh()
      } catch {
        toast.error("فشل التحديث")
      }
    })
  }

  function handleDelete() {
    if (!confirm("هل أنت متأكد من حذف هذه الرسالة؟")) return
    startTransition(async () => {
      try {
        await deleteMessage(id)
        toast.success("تم حذف الرسالة")
        router.refresh()
      } catch {
        toast.error("فشل الحذف")
      }
    })
  }

  return (
    <div className="flex items-center gap-2 pt-2 border-t border-border/50">
      <Button size="sm" variant="outline" onClick={handleMarkRead} disabled={isPending}>
        <Check className="size-3.5" />
        {read ? "وضع كغير مقروءة" : "وضع كمقروءة"}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={handleDelete}
        disabled={isPending}
        className="text-destructive hover:text-destructive"
      >
        <Trash2 className="size-3.5" />
        حذف
      </Button>
    </div>
  )
}
