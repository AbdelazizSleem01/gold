"use server"

import { revalidatePath } from "next/cache"
import {
  createShop as dbCreateShop,
  updateShop as dbUpdateShop,
  deleteShop as dbDeleteShop,
} from "@/lib/shops"
import { requireAdmin } from "@/lib/auth"

type ShopInput = {
  name: string
  description?: string
  countrySlug: string
  city: string
  address?: string
  phone?: string
  website?: string
  mapUrl?: string
  published: boolean
}

function validate(data: ShopInput) {
  if (!data.name?.trim()) throw new Error("اسم المحل مطلوب")
  if (!data.countrySlug?.trim()) throw new Error("الدولة مطلوبة")
  if (!data.city?.trim()) throw new Error("المدينة مطلوبة")
}

export async function createShop(data: ShopInput) {
  await requireAdmin()
  validate(data)
  const id = await dbCreateShop({
    name: data.name.trim(),
    description: data.description?.trim() || "",
    countrySlug: data.countrySlug,
    city: data.city.trim(),
    address: data.address?.trim() || "",
    phone: data.phone?.trim() || "",
    website: data.website?.trim() || "",
    mapUrl: data.mapUrl?.trim() || "",
    published: data.published,
  })
  revalidatePath("/shops")
  revalidatePath(`/${data.countrySlug}`)
  revalidatePath("/admin/shops")
  return id
}

export async function updateShop(id: string, data: ShopInput) {
  await requireAdmin()
  if (!id) throw new Error("المعرف مفقود")
  validate(data)
  await dbUpdateShop(id, {
    name: data.name.trim(),
    description: data.description?.trim() || "",
    countrySlug: data.countrySlug,
    city: data.city.trim(),
    address: data.address?.trim() || "",
    phone: data.phone?.trim() || "",
    website: data.website?.trim() || "",
    mapUrl: data.mapUrl?.trim() || "",
    published: data.published,
  })
  revalidatePath("/shops")
  revalidatePath(`/${data.countrySlug}`)
  revalidatePath("/admin/shops")
}

export async function deleteShop(id: string) {
  await requireAdmin()
  await dbDeleteShop(id)
  revalidatePath("/shops")
  revalidatePath("/admin/shops")
}
