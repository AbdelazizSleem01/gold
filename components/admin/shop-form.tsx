"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { COUNTRIES } from "@/lib/countries"
import { createShop, updateShop } from "@/app/admin/actions/shops"

type ShopFormProps = {
  mode: "create" | "edit"
  initial?: {
    _id?: string
    name?: string
    description?: string
    countrySlug?: string
    city?: string
    address?: string
    phone?: string
    website?: string
    mapUrl?: string
    published?: boolean
  }
}

export function ShopForm({ mode, initial }: ShopFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [name, setName] = useState(initial?.name ?? "")
  const [description, setDescription] = useState(initial?.description ?? "")
  const [countrySlug, setCountrySlug] = useState(initial?.countrySlug ?? "")
  const [city, setCity] = useState(initial?.city ?? "")
  const [address, setAddress] = useState(initial?.address ?? "")
  const [phone, setPhone] = useState(initial?.phone ?? "")
  const [website, setWebsite] = useState(initial?.website ?? "")
  const [mapUrl, setMapUrl] = useState(initial?.mapUrl ?? "")
  const [published, setPublished] = useState(initial?.published ?? true)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!countrySlug) {
      toast.error("اختر الدولة")
      return
    }
    startTransition(async () => {
      try {
        const data = { name, description, countrySlug, city, address, phone, website, mapUrl, published }
        if (mode === "create") {
          await createShop(data)
          toast.success("تم إضافة المحل بنجاح")
        } else if (initial?._id) {
          await updateShop(initial._id, data)
          toast.success("تم تحديث بيانات المحل")
        }
        router.push("/admin/shops")
        router.refresh()
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "حدث خطأ غير متوقع")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">اسم المحل</FieldLabel>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field>
            <FieldLabel htmlFor="country">الدولة</FieldLabel>
            <Select value={countrySlug} onValueChange={setCountrySlug}>
              <SelectTrigger id="country">
                <SelectValue placeholder="اختر الدولة" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>
                    {c.flag} {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="city">المدينة</FieldLabel>
            <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="address">العنوان</FieldLabel>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="الشارع / الحي / رقم المبنى"
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field>
            <FieldLabel htmlFor="phone">رقم الهاتف</FieldLabel>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              dir="ltr"
              placeholder="+966 5X XXX XXXX"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="website">الموقع الإلكتروني</FieldLabel>
            <Input
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              dir="ltr"
              placeholder="https://..."
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="mapUrl">رابط الخريطة (Google Maps)</FieldLabel>
          <Input
            id="mapUrl"
            value={mapUrl}
            onChange={(e) => setMapUrl(e.target.value)}
            dir="ltr"
            placeholder="https://maps.google.com/..."
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="description">الوصف</FieldLabel>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </Field>

        <Field orientation="horizontal">
          <div className="flex items-center gap-3">
            <Switch id="published" checked={published} onCheckedChange={setPublished} />
            <Label htmlFor="published" className="cursor-pointer">
              عرض المحل للزوار
            </Label>
          </div>
        </Field>
      </FieldGroup>

      <div className="flex items-center gap-3 mt-8">
        <Button type="submit" disabled={isPending}>
          {isPending && <Spinner className="size-4 ms-2" />}
          {mode === "create" ? "إضافة المحل" : "حفظ التعديلات"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          إلغاء
        </Button>
      </div>
    </form>
  )
}
