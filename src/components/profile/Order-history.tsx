"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Package } from "lucide-react"

interface Order {
  id: string
  date: string
  status: string
  total: string
  items: number
}

interface OrderHistoryProps {
  orders: Order[]
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
        <Button variant="outline" className="border-gray-300 text-gray-700 bg-transparent">
          <Eye className="w-4 h-4 mr-2" />
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">
                      {order.date} • {order.items} items
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={order.status === "Delivered" ? "default" : "outline"}
                    className={
                      order.status === "Delivered" ? "bg-gray-900 text-white" : "border-gray-300 text-gray-700"
                    }
                  >
                    {order.status}
                  </Badge>
                  <p className="font-semibold text-gray-900">{order.total}</p>
                  <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 bg-transparent">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
