import { cookies } from "next/headers"

/**
 * Simple cookie-based admin authentication.
 * The session cookie contains a token that is compared against ADMIN_PASSWORD.
 * Cookie is httpOnly + secure for protection.
 */

const COOKIE_NAME = "admin-session"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

function getAdminPassword(): string {
  const pw = process.env.ADMIN_PASSWORD
  if (!pw) {
    throw new Error("ADMIN_PASSWORD environment variable is not set")
  }
  return pw
}

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get(COOKIE_NAME)?.value
    if (!session) return false
    return session === getAdminPassword()
  } catch {
    return false
  }
}

export async function setAdminSession(password: string): Promise<boolean> {
  if (password !== getAdminPassword()) return false
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  })
  return true
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    throw new Error("UNAUTHORIZED")
  }
}
