"use client"

import { useEffect, useState } from "react"

const sweetEmojis = ["🍭", "🍬", "🍫", "🍩", "🧁", "🍰", "🎂", "🍪", "🍮", "🍡", "🍧", "🍨", "🍦", "🧇", "🥧", "🍓", "🍒", "🍑", "🍉", "🍇"]

type Sweet = {
  id: number
  emoji: string
  left: number
  duration: number
  delay: number
  size: number
  rotation: number
}

export default function SweetsBackground() {
  const [sweets, setSweets] = useState<Sweet[]>([])

  useEffect(() => {
    const generateSweets = () => {
      const newSweets: Sweet[] = []
      for (let i = 0; i < 30; i++) {
        newSweets.push({
          id: i,
          emoji: sweetEmojis[Math.floor(Math.random() * sweetEmojis.length)],
          left: Math.random() * 100,
          duration: 15 + Math.random() * 20,
          delay: Math.random() * 10,
          size: 30 + Math.random() * 30,
          rotation: Math.random() * 360
        })
      }
      setSweets(newSweets)
    }

    generateSweets()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]" aria-hidden="true">
      {sweets.map((sweet) => (
        <div
          key={sweet.id}
          className="absolute animate-float opacity-40"
          style={{
            left: `${sweet.left}%`,
            fontSize: `${sweet.size}px`,
            animationDuration: `${sweet.duration}s`,
            animationDelay: `${sweet.delay}s`,
            transform: `rotate(${sweet.rotation}deg)`,
            bottom: '-50px'
          }}
        >
          {sweet.emoji}
        </div>
      ))}
    </div>
  )
}