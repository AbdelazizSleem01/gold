import { NextResponse } from "next/server"
import { setAdminSession } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "كلمة المرور مطلوبة" }, { status: 400 })
    }
    const ok = await setAdminSession(password)
    if (!ok) {
      return NextResponse.json({ error: "كلمة المرور غير صحيحة" }, { status: 401 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[v0] admin login error:", err)
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 })
  }
}
