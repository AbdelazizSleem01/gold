import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: "الحقول المطلوبة ناقصة" }, { status: 400 })
    }

    const db = await getDb()
    await db.collection("messages").insertOne({
      name,
      email,
      subject: subject || "",
      message,
      read: false,
      createdAt: new Date(),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[v0] contact POST error:", err)
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 })
  }
}
