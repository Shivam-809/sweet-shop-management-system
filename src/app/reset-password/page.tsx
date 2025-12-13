"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const errorParam = searchParams.get("error")
    const errorDescription = searchParams.get("error_description")
    
    if (errorParam === "access_denied" || errorDescription) {
      if (errorDescription?.includes("expired") || errorDescription?.includes("invalid")) {
        setError("Password reset link has expired or is invalid. Please request a new one.")
      } else {
        setError(errorDescription || "An error occurred. Please try again.")
      }
    }
  }, [searchParams])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setTimeout(() => router.push("/login"), 2000)
  }

  if (error && error.includes("expired")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-amber-50 p-4">
        <Card className="w-full max-w-md border-rose-200 shadow-xl">
          <CardContent className="pt-8 text-center">
            <div className="text-6xl mb-4">⏰</div>
            <h2 className="text-2xl font-bold text-rose-600 mb-2">Link Expired</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 text-sm text-left">
              <p className="font-semibold text-amber-800 mb-2">💡 Tips:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Reset links expire in 1 hour</li>
                <li>Request a new reset link</li>
                <li>Check your spam folder</li>
                <li>Click the link immediately when received</li>
              </ul>
            </div>
            <Link href="/forgot-password">
              <Button className="w-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600">
                Request New Reset Link
              </Button>
            </Link>
            <Link href="/login" className="block mt-4 text-sm text-rose-600 hover:underline">
              Back to Login
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-amber-50 p-4">
        <Card className="w-full max-w-md border-rose-200 shadow-xl">
          <CardContent className="pt-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-rose-600 mb-2">Password Updated!</h2>
            <p className="text-gray-600">Redirecting you to login...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-amber-50 p-4">
      <Card className="w-full max-w-md border-rose-200 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="text-5xl mb-2">🔒</div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
            Reset Password
          </CardTitle>
          <CardDescription className="text-rose-600">
            Enter your new password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="border-rose-200 focus:border-rose-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="border-rose-200 focus:border-rose-400"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600"
              disabled={loading}
            >
              {loading ? "Updating password..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}