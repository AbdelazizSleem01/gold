import "server-only"
import { getDb } from "./mongodb"
import { ObjectId } from "mongodb"

export interface Shop {
  _id: string
  name: string
  description?: string
  countrySlug: string
  city: string
  address?: string
  phone?: string
  website?: string
  mapUrl?: string
  published: boolean
  createdAt: string
  updatedAt: string
}

function serialize(doc: Record<string, unknown>): Shop {
  return {
    _id: String(doc._id),
    name: String(doc.name ?? ""),
    description: doc.description ? String(doc.description) : "",
    countrySlug: String(doc.countrySlug ?? doc.country ?? ""),
    city: String(doc.city ?? ""),
    address: doc.address ? String(doc.address) : "",
    phone: doc.phone ? String(doc.phone) : "",
    website: doc.website ? String(doc.website) : "",
    mapUrl: doc.mapUrl ? String(doc.mapUrl) : "",
    published: doc.published === undefined ? true : Boolean(doc.published),
    createdAt:
      doc.createdAt instanceof Date
        ? doc.createdAt.toISOString()
        : String(doc.createdAt ?? new Date().toISOString()),
    updatedAt:
      doc.updatedAt instanceof Date
        ? doc.updatedAt.toISOString()
        : String(doc.updatedAt ?? new Date().toISOString()),
  }
}

export async function listShops(opts: {
  countrySlug?: string
  publishedOnly?: boolean
  limit?: number
} = {}): Promise<Shop[]> {
  try {
    const db = await getDb()
    const filter: Record<string, unknown> = {}
    if (opts.countrySlug) filter.countrySlug = opts.countrySlug
    if (opts.publishedOnly) filter.published = true
    const cursor = db
      .collection("shops")
      .find(filter)
      .sort({ createdAt: -1 })
    if (opts.limit) cursor.limit(opts.limit)
    const docs = await cursor.toArray()
    return docs.map(serialize)
  } catch (err) {
    console.error("[v0] listShops error:", err)
    return []
  }
}

export async function getShopsByCountry(countrySlug: string): Promise<Shop[]> {
  return listShops({ countrySlug, publishedOnly: true })
}

export async function getAllShops(): Promise<Shop[]> {
  return listShops({ publishedOnly: true })
}

export async function getShopById(id: string): Promise<Shop | null> {
  try {
    const db = await getDb()
    const doc = await db.collection("shops").findOne({ _id: new ObjectId(id) })
    return doc ? serialize(doc as Record<string, unknown>) : null
  } catch (err) {
    console.error("[v0] getShopById error:", err)
    return null
  }
}

type ShopInput = Omit<Shop, "_id" | "createdAt" | "updatedAt">

export async function createShop(data: ShopInput): Promise<string> {
  const db = await getDb()
  const now = new Date()
  const result = await db.collection("shops").insertOne({
    ...data,
    createdAt: now,
    updatedAt: now,
  })
  return result.insertedId.toString()
}

export async function updateShop(id: string, data: Partial<ShopInput>): Promise<void> {
  const db = await getDb()
  await db.collection("shops").updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } }
  )
}

export async function deleteShop(id: string): Promise<void> {
  const db = await getDb()
  await db.collection("shops").deleteOne({ _id: new ObjectId(id) })
}
