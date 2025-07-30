"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag, Trash2 } from "lucide-react"
import Image from "next/image"

interface WishlistItem {
  name: string
  price: string
  image: string
}

interface WishlistProps {
  items: WishlistItem[]
}

export function Wishlist({ items }: WishlistProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
        <p className="text-gray-600">{items.length} items</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <Card key={index} className="border-gray-200 group hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg?height=200&width=200"}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-lg font-bold text-gray-900 mb-4">{item.price}</p>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-gray-900 text-white hover:bg-gray-800">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 bg-transparent">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
