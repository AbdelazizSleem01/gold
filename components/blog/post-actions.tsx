"use client"

import { useState, useEffect } from "react"
import { Share2, Heart, Check, Copy, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface PostActionsProps {
  slug: string
  title: string
}

export function PostActions({ slug, title }: PostActionsProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [showShareTooltip, setShowShareTooltip] = useState(false)
  const [copied, setCopied] = useState(false)

  // Load like count and user status from API
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await fetch(`/api/likes?slug=${encodeURIComponent(slug)}`)
        if (res.ok) {
          const data = await res.json()
          setLikeCount(data.count)
          setLiked(data.hasLiked)
        }
      } catch (err) {
        console.error("Failed to fetch likes:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchLikes()
  }, [slug])

  const handleLike = async () => {
    if (actionLoading) return
    setActionLoading(true)

    try {
      const action = liked ? "unlike" : "like"
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, action }),
      })

      if (res.ok) {
        const data = await res.json()
        setLikeCount(data.count)
        setLiked(!liked)
        if (!liked) {
          toast.success("شكراً لإعجابك بالمقال!")
        }
      } else {
        toast.error("حدث خطأ، يرجى المحاولة مرة أخرى")
      }
    } catch (err) {
      console.error("Like error:", err)
      toast.error("حدث خطأ في الاتصال")
    } finally {
      setActionLoading(false)
    }
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/blog/${slug}`
    
    if (navigator.share) {
      // Use native share on mobile
      try {
        await navigator.share({
          title: title,
          url: url,
        })
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        // Fallback for older browsers
        const input = document.createElement("input")
        input.value = url
        document.body.appendChild(input)
        input.select()
        document.execCommand("copy")
        document.body.removeChild(input)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
    
    setShowShareTooltip(true)
    setTimeout(() => setShowShareTooltip(false), 2000)
  }

  return (
    <div className="mt-12 flex items-center justify-between border-t border-border/60 pt-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>استمتعت بالمقال؟ شاركه مع الآخرين</span>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Share Button */}
        <div className="relative">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-medium transition-all hover:bg-primary hover:text-white"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>تم النسخ</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                <span>مشاركة</span>
              </>
            )}
          </button>
          
          {showShareTooltip && copied && (
            <div className="absolute -top-10 right-1/2 translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs text-background">
              تم نسخ الرابط
              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-foreground" />
            </div>
          )}
        </div>

        {/* Like Button */}
        <button
          onClick={handleLike}
          disabled={loading || actionLoading}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all disabled:opacity-50 ${
            liked
              ? "bg-red-500 text-white"
              : "bg-muted hover:bg-red-500 hover:text-white"
          }`}
        >
          {actionLoading || loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
          )}
          <span>{liked ? "أعجبني" : "إعجاب"}</span>
          {likeCount > 0 && !loading && (
            <span className="text-xs opacity-80">({likeCount})</span>
          )}
        </button>
      </div>
    </div>
  )
}
