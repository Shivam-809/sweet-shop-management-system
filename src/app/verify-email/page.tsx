"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token")
      const type = searchParams.get("type")

      if (!token || type !== "email") {
        setStatus("error")
        setMessage("Invalid or missing verification token")
        return
      }

      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: "email"
        })

        if (error) {
          setStatus("error")
          setMessage(error.message || "Verification failed")
        } else {
          setStatus("success")
          setMessage("Email verified successfully!")
          setTimeout(() => router.push("/dashboard"), 2000)
        }
      } catch (err) {
        setStatus("error")
        setMessage("An unexpected error occurred")
      }
    }

    verifyEmail()
  }, [searchParams, router, supabase.auth])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-amber-50 p-4">
      <Card className="w-full max-w-md border-rose-200 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="text-6xl mb-2">
            {status === "loading" && "⏳"}
            {status === "success" && "✅"}
            {status === "error" && "❌"}
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
            Email Verification
          </CardTitle>
          <CardDescription className="text-rose-600">
            {status === "loading" && "Verifying your email..."}
            {status === "success" && "Success!"}
            {status === "error" && "Verification Failed"}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">{message}</p>
          {status === "error" && (
            <div className="space-y-2">
              <Button
                onClick={() => router.push("/register")}
                className="w-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600"
              >
                Register Again
              </Button>
              <Link href="/login" className="block text-rose-600 hover:underline text-sm">
                Or go to login
              </Link>
            </div>
          )}
          {status === "success" && (
            <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
