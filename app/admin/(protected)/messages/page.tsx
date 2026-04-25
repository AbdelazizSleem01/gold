import { getDb } from "@/lib/mongodb"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { Mail, MailOpen } from "lucide-react"
import { MessageActions } from "@/components/admin/message-actions"

export const dynamic = "force-dynamic"

type Message = {
  _id: string
  name: string
  email: string
  subject?: string
  message: string
  read: boolean
  createdAt: string
}

async function getMessages(): Promise<Message[]> {
  const db = await getDb()
  const docs = await db
    .collection("messages")
    .find({})
    .sort({ createdAt: -1 })
    .limit(200)
    .toArray()
  return docs.map((d: Record<string, unknown>) => ({
    _id: String(d._id),
    name: String(d.name ?? ""),
    email: String(d.email ?? ""),
    subject: d.subject ? String(d.subject) : undefined,
    message: String(d.message ?? ""),
    read: Boolean(d.read),
    createdAt: d.createdAt instanceof Date ? d.createdAt.toISOString() : String(d.createdAt ?? ""),
  }))
}

export default async function AdminMessagesPage() {
  const messages = await getMessages()

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">الرسائل الواردة</h1>
        <p className="text-sm text-muted-foreground mt-1">
          رسائل الزوار من صفحة التواصل.
        </p>
      </div>

      {messages.length === 0 ? (
        <Empty className="py-12">
          <EmptyHeader>
            <EmptyTitle>لا توجد رسائل</EmptyTitle>
            <EmptyDescription>لم يصلك أي رسالة بعد.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid gap-4">
          {messages.map((msg) => (
            <Card key={msg._id} className={msg.read ? "opacity-80" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    {msg.read ? (
                      <MailOpen className="size-5 text-muted-foreground shrink-0 mt-1" />
                    ) : (
                      <Mail className="size-5 text-primary shrink-0 mt-1" />
                    )}
                    <div>
                      <CardTitle className="text-lg">
                        {msg.subject || "رسالة بدون عنوان"}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        من <strong>{msg.name}</strong> &mdash;{" "}
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-primary hover:underline"
                          dir="ltr"
                        >
                          {msg.email}
                        </a>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {msg.read ? (
                      <Badge variant="secondary">مقروءة</Badge>
                    ) : (
                      <Badge>جديدة</Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {new Date(msg.createdAt).toLocaleString("ar-EG")}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                <MessageActions id={msg._id} read={msg.read} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}
