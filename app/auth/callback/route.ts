import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const next = requestUrl.searchParams.get("next") || "/dashboard"

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient()

    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // After successful authentication, update the user's profile
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          // Update last sign in time
          await supabase.from("profiles").update({ last_sign_in: new Date().toISOString() }).eq("id", session.user.id)

          // Log the successful authentication
          await supabase.from("audit_logs").insert({
            user_id: session.user.id,
            action: "AUTHENTICATION",
            table_name: "auth.users",
            record_id: session.user.id,
            new_data: { event: "sign_in_success" },
            ip_address: requestUrl.hostname,
            user_agent: request.headers.get("user-agent") || "unknown",
          })
        }
      } catch (profileError) {
        console.error("Error updating profile:", profileError)
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL(next, requestUrl.origin))
}
