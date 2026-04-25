"use server"

import { ObjectId } from "mongodb"
import { revalidatePath } from "next/cache"
import { getDb } from "@/lib/mongodb"
import { requireAdmin } from "@/lib/auth"

export async function markMessageRead(id: string, read: boolean) {
  await requireAdmin()
  const db = await getDb()
  await db.collection("messages").updateOne(
    { _id: new ObjectId(id) },
    { $set: { read, updatedAt: new Date() } }
  )
  revalidatePath("/admin/messages")
  revalidatePath("/admin")
}

export async function deleteMessage(id: string) {
  await requireAdmin()
  const db = await getDb()
  await db.collection("messages").deleteOne({ _id: new ObjectId(id) })
  revalidatePath("/admin/messages")
  revalidatePath("/admin")
}
