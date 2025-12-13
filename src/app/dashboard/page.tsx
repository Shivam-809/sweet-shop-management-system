"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"

type Sweet = {
  id: string
  name: string
  description: string
  price: string
  category: string
  image_url: string
  stock: number
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [sweets, setSweets] = useState<Sweet[]>([])
  const [loading, setLoading] = useState(true)
  const [purchaseLoading, setPurchaseLoading] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function init() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push("/login")
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setUser(profile)
      
      if (profile?.role === 'admin') {
        router.push("/admin")
        return
      }

      const res = await fetch("/api/sweets")
      if (res.ok) {
        const data = await res.json()
        setSweets(data)
      }
      setLoading(false)
    }
    
    init()
  }, [])

  async function fetchProducts() {
    setLoading(true)
    const res = await fetch("/api/sweets")
    if (res.ok) {
      const data = await res.json()
      setSweets(data)
    }
    setLoading(false)
  }

  async function handlePurchase(sweetId: string) {
    setPurchaseLoading(sweetId)
    
    const res = await fetch(`/api/sweets/${sweetId}/purchase`, {
      method: "POST"
    })

    if (res.ok) {
      alert("Purchase successful! 🎉")
      fetchProducts()
    } else {
      const data = await res.json()
      alert(data.error || "Purchase failed")
    }
    
    setPurchaseLoading(null)
  }

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  const chocolates = sweets.filter(s => s.category === "chocolate")
  const otherSweets = sweets.filter(s => s.category !== "chocolate")

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-amber-50">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-rose-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
            🍭 Sweet Shop
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user?.full_name || user?.email}</span>
            <Button onClick={handleLogout} variant="outline" className="border-rose-200 hover:bg-rose-50">
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 bg-clip-text text-transparent">
            Your Sweet Shop
          </h1>
          <p className="text-xl text-gray-600">
            Browse and purchase your favorite treats!
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍬</div>
            <p className="text-gray-600">Loading delicious treats...</p>
          </div>
        ) : (
          <>
            <section className="mb-16">
              <h2 className="text-4xl font-bold text-rose-600 mb-8">🍬 Sweets Collection</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {otherSweets.map((sweet) => (
                  <Card key={sweet.id} className="border-rose-200 hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-6xl mb-4 text-center">{sweet.image_url}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{sweet.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{sweet.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-rose-600">${sweet.price}</span>
                        <span className="text-sm text-gray-500">Stock: {sweet.stock}</span>
                      </div>
                      <Button
                        onClick={() => handlePurchase(sweet.id)}
                        disabled={sweet.stock === 0 || purchaseLoading === sweet.id}
                        className="w-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600"
                      >
                        {purchaseLoading === sweet.id ? "Processing..." : sweet.stock === 0 ? "Out of Stock" : "Purchase"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {otherSweets.length === 0 && (
                <p className="text-center text-gray-500 py-10">No sweets available at the moment</p>
              )}
            </section>

            <section>
              <h2 className="text-4xl font-bold text-amber-600 mb-8">🍫 Chocolate Collection</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {chocolates.map((chocolate) => (
                  <Card key={chocolate.id} className="border-amber-200 hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-6xl mb-4 text-center">{chocolate.image_url}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{chocolate.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{chocolate.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-amber-600">${chocolate.price}</span>
                        <span className="text-sm text-gray-500">Stock: {chocolate.stock}</span>
                      </div>
                      <Button
                        onClick={() => handlePurchase(chocolate.id)}
                        disabled={chocolate.stock === 0 || purchaseLoading === chocolate.id}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      >
                        {purchaseLoading === chocolate.id ? "Processing..." : chocolate.stock === 0 ? "Out of Stock" : "Purchase"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {chocolates.length === 0 && (
                <p className="text-center text-gray-500 py-10">No chocolates available at the moment</p>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}