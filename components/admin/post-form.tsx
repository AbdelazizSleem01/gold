"use client"

import { useState, useTransition, useCallback } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  FileText,
  Image as ImageIcon,
  Link2,
  Eye,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Hash,
  Type,
  AlignLeft,
  Globe,
  Calendar,
  Settings,
  ArrowLeft,
  PenLine,
  BookOpen,
  Clock,
  Sparkles,
  Upload,
  Code
} from "lucide-react"
import dynamic from "next/dynamic"
// TinyMCE Editor (dynamic import for SSR)
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-96 items-center justify-center rounded-lg border bg-muted/20 text-sm text-muted-foreground">
        جاري تحميل المحرر...
      </div>
    ),
  }
)

import { createPost, updatePost } from "@/app/admin/actions/posts"

type PostFormProps = {
  mode: "create" | "edit"
  initial?: {
    _id?: string
    title?: string
    slug?: string
    excerpt?: string
    content?: string
    coverImage?: string
    published?: boolean
    createdAt?: string
  }
}

export function PostForm({ mode, initial }: PostFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [activeTab, setActiveTab] = useState("content")
  const [title, setTitle] = useState(initial?.title ?? "")
  const [slug, setSlug] = useState(initial?.slug ?? "")
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "")
  const [content, setContent] = useState(initial?.content ?? "")
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? "")
  const [published, setPublished] = useState(initial?.published ?? false)
  const [imageError, setImageError] = useState(false)
  const [editorMode, setEditorMode] = useState<"visual" | "html">("visual")

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    
    if (mode === "create" && !slug) {
      const generatedSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
      setSlug(generatedSlug)
    }
  }

  // Preview slug
  const previewSlug = slug || generatePreviewSlug(title)

  function generatePreviewSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "your-post-slug"
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!title.trim()) {
      toast.error("الرجاء إدخال عنوان المقال")
      return
    }
    
    if (!content.trim()) {
      toast.error("الرجاء إدخال محتوى المقال")
      return
    }
    
    startTransition(async () => {
      try {
        if (mode === "create") {
          await createPost({ 
            title: title.trim(), 
            slug: slug.trim() || undefined, 
            excerpt: excerpt.trim(), 
            content: content.trim(), 
            coverImage: coverImage.trim() || undefined, 
            published 
          })
          toast.success("تم إنشاء المقال بنجاح")
          router.push("/admin/posts")
        } else if (initial?._id) {
          await updatePost(initial._id, { 
            title: title.trim(), 
            slug: slug.trim() || undefined, 
            excerpt: excerpt.trim(), 
            content: content.trim(), 
            coverImage: coverImage.trim() || undefined, 
            published 
          })
          toast.success("تم تحديث المقال بنجاح")
          router.push("/admin/posts")
        }
        router.refresh()
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "حدث خطأ غير متوقع")
      }
    })
  }

  const characterCount = {
    title: title.length,
    excerpt: excerpt.length,
    content: content.length
  }

  return (
    <form onSubmit={handleSubmit} >
      {/* Header with actions */}
      <div className="sticky top-0 z-10 -mx-4 border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60 md:-mx-8 md:px-8">
        <div className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              onClick={() => router.back()}
              className="h-9 w-9 shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <PenLine className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  {mode === "create" ? "مقال جديد" : "تعديل المقال"}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {mode === "create" ? "أنشئ محتوى جديد لمدونتك" : "قم بتعديل محتوى المقال"}
                </p>
              </div>
            </div>
          </div>
          
          <Badge 
            variant={published ? "default" : "outline"} 
            className={`gap-1.5 rounded-full px-3 ${published ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : ""}`}
          >
            {published ? (
              <>
                <CheckCircle className="h-3 w-3" />
                منشور
              </>
            ) : (
              <>
                <FileText className="h-3 w-3" />
                مسودة
              </>
            )}
          </Badge>
        </div>
      </div>

      <div className="mt-6 max-w-none">
        <div className="w-full">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content" className="gap-2">
                <FileText className="h-4 w-4" />
                المحتوى
              </TabsTrigger>
              <TabsTrigger value="seo" className="gap-2">
                <Globe className="h-4 w-4" />
                تحسين محركات البحث
              </TabsTrigger>
              <TabsTrigger value="preview" className="gap-2">
                <Eye className="h-4 w-4" />
                معاينة
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="mt-6 space-y-6" dir="rtl">
              {/* Title */}
              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Type className="h-4 w-4 text-primary" />
                      عنوان المقال
                    </Label>
                    <Input
                      value={title}
                      onChange={handleTitleChange}
                      placeholder="مثال: دليل شامل لسعر الذهب في السعودية"
                      className="h-12 text-right text-lg font-semibold border-dashed"
                      dir="rtl"
                      disabled={isPending}
                    />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{characterCount.title} حرف</span>
                      <span className={`flex items-center gap-1 ${characterCount.title > 10 ? "text-emerald-600" : "text-muted-foreground"}`}>
                        {characterCount.title > 10 && <CheckCircle className="h-3 w-3" />}
                        {characterCount.title > 10 ? "جيد" : "قصير"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WYSIWYG Rich Text Editor */}
              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Header with mode toggle and tools */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Label className="flex items-center gap-2 text-sm font-medium">
                          <AlignLeft className="h-4 w-4 text-primary" />
                          محتوى المقال
                        </Label>
                        <div className="flex items-center gap-1 rounded-lg border bg-muted/40 p-1">
                          <Button
                            type="button"
                            variant={editorMode === "visual" ? "secondary" : "ghost"}
                            size="sm"
                            className="h-7 gap-1.5 px-2 text-xs"
                            onClick={() => setEditorMode("visual")}
                          >
                            <Eye className="h-3.5 w-3.5" />
                            وضع المرئي
                          </Button>
                    
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{characterCount.content} حرف</span>
                        <span>·</span>
                        <span>~{Math.floor(content.split(/\s+/).length)} كلمة</span>
                      </div>
                    </div>

                    {/* TinyMCE Editor */}
                    {editorMode === "visual" && (
                      <Editor
                        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || ""}
                        value={content}
                        onEditorChange={(newContent) => setContent(newContent || "")}
                        init={{
                          height: 600,
                          menubar: true,
                          plugins: [
                            "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
                            "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
                            "insertdatetime", "media", "table", "help", "wordcount", "directionality"
                          ],
                          toolbar:
                            "undo redo | formatselect | " +
                            "bold italic underline strikethrough | forecolor backcolor | " +
                            "alignleft aligncenter alignright alignjustify | " +
                            "bullist numlist outdent indent | " +
                            "link image media table | " +
                            "ltr rtl | " +
                            "removeformat code fullscreen | help",
                          toolbar_sticky: true,
                          toolbar_sticky_offset: 0,
                          content_style: `
                            body { 
                              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                              font-size: 16px; 
                              direction: rtl; 
                              text-align: right;
                              padding: 16px;
                            }
                            p { margin: 0 0 12px 0; }
                            h1, h2, h3, h4 { margin: 16px 0 8px 0; }
                            ul, ol { margin: 8px 0; padding-right: 24px; }
                            blockquote { 
                              border-right: 3px solid #e5e7eb; 
                              margin: 12px 0; 
                              padding: 8px 16px; 
                              background: #f9fafb;
                            }
                          `,
                          directionality: "rtl",
                          language: "ar",
                          branding: false,
                          statusbar: true,
                          resize: true,
                          placeholder: "ابدأ بكتابة مقالك هنا...",
                        }}
                      />
                    )}

                    {/* HTML Editor */}
                    {editorMode === "html" && (
                      <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={20}
                        className="min-h-112.5 resize-y font-mono text-sm bg-muted/30"
                        dir="ltr"
                        spellCheck={false}
                      />
                    )}

                  </div>
                </CardContent>
              </Card>

              {/* Excerpt */}
              <Card className="shadow-sm mb-6">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Hash className="h-4 w-4 text-primary" />
                      المقتطف
                      <span className="ms-auto text-xs font-normal text-muted-foreground">يظهر في قائمة المقالات</span>
                    </Label>
                    <Textarea
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      rows={3}
                      placeholder="ملخص مختصر للمقال..."
                      className="resize-y text-right text-sm leading-relaxed"
                      dir="rtl"
                      disabled={isPending}
                    />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{characterCount.excerpt}/160 حرف</span>
                      <span className={`flex items-center gap-1 ${characterCount.excerpt > 160 ? "text-amber-600" : characterCount.excerpt > 0 ? "text-emerald-600" : "text-muted-foreground"}`}>
                        {characterCount.excerpt > 160 ? (
                          <><AlertCircle className="h-3 w-3" /> طويل</>
                        ) : characterCount.excerpt > 0 ? (
                          <><CheckCircle className="h-3 w-3" /> مناسب</>
                        ) : (
                          "اختياري"
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo" className="mt-6 space-y-6">
              {/* Permalink */}
              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Link2 className="h-4 w-4 text-primary" />
                      الرابط الدائم
                    </Label>
                    <div className="flex items-center overflow-hidden rounded-lg border bg-muted/30 px-3 py-2">
                      <Globe className="me-2 h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="shrink-0 text-sm text-muted-foreground">alrogaib.com/blog/</span>
                      <Input
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="your-post-slug"
                        className="h-6 border-0 bg-transparent px-1 text-sm shadow-none focus-visible:ring-0"
                        dir="ltr"
                        disabled={isPending}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      الرابط النهائي: <span className="font-medium text-foreground" dir="ltr">alrogaib.com/blog/{previewSlug}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Cover Image */}
              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <ImageIcon className="h-4 w-4 text-primary" />
                      صورة الغلاف
                    </Label>
                    <div className="relative">
                      <Input
                        value={coverImage}
                        onChange={(e) => {
                          setCoverImage(e.target.value)
                          setImageError(false)
                        }}
                        placeholder="https://example.com/image.jpg"
                        dir="ltr"
                        disabled={isPending}
                        className="ps-10"
                      />
                      <Upload className="absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                    
                    {coverImage && !imageError && (
                      <div className="group relative overflow-hidden rounded-lg border bg-muted/20">
                        <img 
                          src={coverImage} 
                          alt="معاينة صورة الغلاف" 
                          className="aspect-1200/630 w-full object-cover transition-opacity group-hover:opacity-80"
                          onError={() => setImageError(true)}
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          size="icon"
                          className="absolute inset-s-2 top-2 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={() => { setCoverImage(""); setImageError(false) }}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )}
                    
                    {imageError && (
                      <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        تعذر تحميل الصورة. تحقق من الرابط.
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground">
                      يُفضل صور بدقة 1200×630 بكسل
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Publish Settings */}
              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Settings className="h-4 w-4 text-primary" />
                      إعدادات النشر
                    </Label>
                    <div className="flex items-center justify-between rounded-lg border bg-muted/20 p-4">
                      <div className="space-y-1">
                        <Label htmlFor="published" className="text-sm font-semibold">
                          نشر المقال مباشرة
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          إذا ألغيت التفعيل، يُحفظ كمسودة
                        </p>
                      </div>
                      <Switch 
                        id="published" 
                        checked={published} 
                        onCheckedChange={setPublished}
                        disabled={isPending}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="mt-6">
              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <article className="space-y-6">
                    {coverImage && !imageError && (
                      <div className="overflow-hidden rounded-xl">
                        <img 
                          src={coverImage} 
                          alt={title} 
                          className="aspect-1200/630 w-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>{Math.ceil(content.split(/\s+/).length / 200)} دقائق قراءة</span>
                        <span>·</span>
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{new Date().toLocaleDateString('ar-SA')}</span>
                      </div>
                      <h1 className="text-3xl font-bold leading-tight">{title || "عنوان المقال"}</h1>
                      {excerpt && (
                        <p className="text-base leading-relaxed text-muted-foreground">{excerpt}</p>
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div className="prose prose-sm max-w-none leading-relaxed dark:prose-invert">
                      {content ? content.split('\n\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      )) : (
                        <p className="text-muted-foreground">ابدأ بكتابة محتوى المقال...</p>
                      )}
                    </div>
                  </article>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        
      </div>

      {/* Bottom submit bar */}
      <div className="sticky bottom-0 z-10 -mx-4 border-t bg-background/95 px-4 py-4 backdrop-blur supports-backdrop-filter:bg-background/60 md:-mx-8 md:px-8">
        <div className="flex items-center justify-between">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={() => router.back()}
            className="gap-2 text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            إلغاء
          </Button>
          <Button 
            type="submit" 
            disabled={isPending} 
            className="min-w-32 gap-2 shadow-sm"
          >
            {isPending ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                جاري الحفظ...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {mode === "create" ? "نشر المقال" : "حفظ التغييرات"}
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}