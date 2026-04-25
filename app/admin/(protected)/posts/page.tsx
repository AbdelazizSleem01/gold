import Link from "next/link"
import { listPosts } from "@/lib/blog"
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
import { DeletePostButton } from "@/components/admin/delete-post-button"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/ui/empty"

export const dynamic = "force-dynamic"

export default async function AdminPostsPage() {
  const posts = await listPosts({ publishedOnly: false, limit: 200 })

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">إدارة المقالات</h1>
          <p className="text-sm text-muted-foreground mt-1">
            إنشاء وتعديل وحذف مقالات المدونة.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="size-4 ms-1" />
            مقال جديد
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card">
        {posts.length === 0 ? (
          <Empty className="py-12">
            <EmptyHeader>
              <EmptyTitle>لا توجد مقالات بعد</EmptyTitle>
              <EmptyDescription>
                ابدأ بإنشاء أول مقال في المدونة.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>العنوان</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>تاريخ الإنشاء</TableHead>
                <TableHead className="text-start">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    {post.published ? (
                      <Badge variant="default">منشور</Badge>
                    ) : (
                      <Badge variant="secondary">مسودة</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString("ar-EG")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/posts/${post._id}`}>
                          <Pencil className="size-3.5" />
                          تعديل
                        </Link>
                      </Button>
                      <DeletePostButton id={post._id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </main>
  )
}
