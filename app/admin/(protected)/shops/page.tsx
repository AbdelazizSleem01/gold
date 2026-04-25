import Link from "next/link"
import { listShops } from "@/lib/shops"
import { COUNTRIES } from "@/lib/countries"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil } from "lucide-react"
import { DeleteShopButton } from "@/components/admin/delete-shop-button"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/ui/empty"

export const dynamic = "force-dynamic"

export default async function AdminShopsPage() {
  const shops = await listShops({})

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">إدارة المحلات</h1>
          <p className="text-sm text-muted-foreground mt-1">
            إنشاء وتعديل محلات وتجار الذهب الموثوقين.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/shops/new">
            <Plus className="size-4 ms-1" />
            محل جديد
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card">
        {shops.length === 0 ? (
          <Empty className="py-12">
            <EmptyHeader>
              <EmptyTitle>لا توجد محلات بعد</EmptyTitle>
              <EmptyDescription>أضف أول محل ذهب موثوق.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم المحل</TableHead>
                <TableHead>المدينة</TableHead>
                <TableHead>الدولة</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-start">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shops.map((shop) => {
                const country = COUNTRIES.find((c) => c.slug === shop.countrySlug)
                return (
                  <TableRow key={shop._id}>
                    <TableCell className="font-medium">{shop.name}</TableCell>
                    <TableCell>{shop.city}</TableCell>
                    <TableCell>{country?.name ?? shop.countrySlug}</TableCell>
                    <TableCell>
                      {shop.published ? (
                        <Badge variant="default">ظاهر</Badge>
                      ) : (
                        <Badge variant="secondary">مخفي</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/admin/shops/${shop._id}`}>
                            <Pencil className="size-3.5" />
                            تعديل
                          </Link>
                        </Button>
                        <DeleteShopButton id={shop._id} />
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </main>
  )
}
