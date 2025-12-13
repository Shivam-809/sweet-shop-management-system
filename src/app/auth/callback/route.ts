import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const type = requestUrl.searchParams.get("type")
  const origin = requestUrl.origin

  console.log("Auth callback - type:", type, "code:", code ? "exists" : "missing")

  if (code) {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    console.log("exchangeCodeForSession - error:", error?.message, "user:", data?.user?.id)

    if (!error && data.user) {
      if (type === "recovery") {
        console.log("Redirecting to reset-password page")
        return NextResponse.redirect(`${origin}/reset-password`)
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single()

      if (!profile) {
        await supabase.from("profiles").insert({
          id: data.user.id,
          email: data.user.email!,
          full_name: data.user.user_metadata.full_name || data.user.user_metadata.name || data.user.email!.split("@")[0],
          role: "user"
        })
      }

      return NextResponse.redirect(`${origin}/dashboard`)
    }

    if (error) {
      console.error("Auth callback error:", error.message)
      if (type === "recovery") {
        return NextResponse.redirect(`${origin}/reset-password?error=access_denied&error_description=${encodeURIComponent(error.message)}`)
      }
    }
  }

  console.log("No code found, redirecting to login")
  return NextResponse.redirect(`${origin}/login`)
}