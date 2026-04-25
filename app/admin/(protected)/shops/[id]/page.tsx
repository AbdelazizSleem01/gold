import { notFound } from "next/navigation"
import { getShopById } from "@/lib/shops"
import { ShopForm } from "@/components/admin/shop-form"

export default async function EditShopPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const shop = await getShopById(id)
  if (!shop) return notFound()

  return (
    <main className="max-w-3xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">تعديل بيانات المحل</h1>
        <p className="text-sm text-muted-foreground mt-1">{shop.name}</p>
      </header>
      <ShopForm
        mode="edit"
        initial={{
          _id: shop._id,
          name: shop.name,
          description: shop.description,
          countrySlug: shop.countrySlug,
          city: shop.city,
          address: shop.address,
          phone: shop.phone,
          website: shop.website,
          mapUrl: shop.mapUrl,
          published: shop.published,
        }}
      />
    </main>
  )
}
