"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type Sweet = {
  id: string
  name: string
  description: string
  price: string
  category: string
  image_url: string
  stock: number
}

export default function HomePage() {
  const [sweets, setSweets] = useState<Sweet[]>([])
  const [chocolates, setChocolates] = useState<Sweet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/sweets")
        const data = await res.json()
        
        setSweets(data.filter((s: Sweet) => s.category !== "chocolate"))
        setChocolates(data.filter((s: Sweet) => s.category === "chocolate"))
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-amber-50 relative">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-rose-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
            🍭 Sweet Shop
          </Link>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline" className="border-rose-200 hover:bg-rose-50">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 bg-clip-text text-transparent">
            Welcome to Sweet Shop
          </h1>
          <p className="text-xl text-gray-600">
            Discover our delicious collection of handcrafted sweets and chocolates
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
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-bold text-rose-600">🍬 Sweets Collection</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sweets.map((sweet) => (
                  <Card key={sweet.id} className="border-rose-200 hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="relative w-full h-48 mb-4 bg-gradient-to-br from-rose-100 to-pink-100 rounded-md overflow-hidden flex items-center justify-center">
                        {sweet.image_url && !sweet.image_url.match(/[\u{1F300}-\u{1F9FF}]/u) ? (
                          <Image 
                            src={sweet.image_url} 
                            alt={sweet.name}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div className="text-6xl">{sweet.image_url || "🍬"}</div>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{sweet.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{sweet.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-rose-600">${sweet.price}</span>
                        <span className="text-sm text-gray-500">Stock: {sweet.stock}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {sweets.length === 0 && (
                <p className="text-center text-gray-500 py-10">No sweets available at the moment</p>
              )}
            </section>

            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-bold text-amber-600">🍫 Chocolate Collection</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {chocolates.map((chocolate) => (
                  <Card key={chocolate.id} className="border-amber-200 hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="relative w-full h-48 mb-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-md overflow-hidden flex items-center justify-center">
                        {chocolate.image_url && !chocolate.image_url.match(/[\u{1F300}-\u{1F9FF}]/u) ? (
                          <Image 
                            src={chocolate.image_url} 
                            alt={chocolate.name}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div className="text-6xl">{chocolate.image_url || "🍫"}</div>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{chocolate.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{chocolate.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-amber-600">${chocolate.price}</span>
                        <span className="text-sm text-gray-500">Stock: {chocolate.stock}</span>
                      </div>
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

        <div className="mt-20 text-center">
          <p className="text-gray-600 mb-4">Ready to order?</p>
          <Link href="/register">
            <Button size="lg" className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-lg px-8">
              Create Account & Start Shopping
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}