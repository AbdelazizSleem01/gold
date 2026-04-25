import { ShopForm } from "@/components/admin/shop-form"

export default function NewShopPage() {
  return (
    <main className="max-w-3xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">محل جديد</h1>
        <p className="text-sm text-muted-foreground mt-1">أضف محلاً أو تاجر ذهب جديد.</p>
      </header>
      <ShopForm mode="create" />
    </main>
  )
}
