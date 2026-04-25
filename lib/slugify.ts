/**
 * Slugify Arabic and English text into a URL-friendly slug.
 * Keeps Arabic letters intact (URL-encoded), lowercases Latin, replaces spaces with hyphens.
 */
export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\s\u200c\u200f]+/g, "-") // spaces & RTL marks -> hyphen
    .replace(/[^\u0600-\u06FFa-z0-9-]/g, "") // keep Arabic + ascii alnum + hyphen
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}
