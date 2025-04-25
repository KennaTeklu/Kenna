import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"

export async function getSession() {
  const supabase = createServerClient()

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return session
}

export async function getUserProfile() {
  const session = await getSession()

  if (!session) {
    return null
  }

  const supabase = createServerClient()

  try {
    const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

    if (error) throw error

    return profile
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return null
  }
}

export async function updateLastSignIn() {
  const session = await getSession()

  if (!session) {
    return
  }

  const supabase = createServerClient()

  try {
    await supabase.from("profiles").update({ last_sign_in: new Date().toISOString() }).eq("id", session.user.id)
  } catch (error) {
    console.error("Error updating last sign in:", error)
  }
}
