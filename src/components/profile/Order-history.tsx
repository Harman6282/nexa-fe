"use client";

import { OrderHistoryProps } from "@/app/profile/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Package } from "lucide-react";
import Image from "next/image";



export function OrderHistory({ order }: { order: OrderHistoryProps[] }) {
  if (!order || order.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500">No orders found.</div>
    );
  }

  // --- DATA TRANSFORMATION STEP ---
  // Group the flat array of items into orders by `orderId`
  const groupedOrders = order.reduce((acc, item) => {
    const { orderId, status, total, date, ...itemDetails } = item;

    // If this orderId hasn't been seen before, initialize it
    if (!acc[orderId]) {
      acc[orderId] = {
        id: orderId,
        status: status,
        total: total,
        createdAt: date,
        items: [],
      };
    }

    // Add the current item to its corresponding order
    acc[orderId].items.push({
      id: itemDetails.itemId,
      quantity: itemDetails.quantity,
      price: itemDetails.price,
      image: itemDetails.image,
      product: {
        name: itemDetails.productName,
      },
      variant: {
        size: itemDetails.size,
      },
    });

    return acc;
  }, {} as any);

  // Convert the grouped object back into an array for mapping
  const ordersToRender = Object.values(groupedOrders);


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
        <Button
          variant="outline"
          className="border-gray-300 text-gray-700 bg-transparent"
        >
          <Eye className="w-4 h-4 mr-2" />
          View All
        </Button>
      </div>

      <div className="space-y-6">
        {/* Now, map over the newly created `ordersToRender` array */}
        {ordersToRender.map((ord: any) => (
          <Card key={ord.id} className="border-gray-200">
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Order ID: {ord.id}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={
                      ord.status === "DELIVERED" ? "default" : "outline"
                    }
                    className={
                      ord.status === "DELIVERED"
                        ? "bg-green-500 text-white font-bold"
                        : "border-gray-300 text-gray-700" 
                    }
                  >
                    {ord.status}
                  </Badge>
                  <p className="font-semibold text-gray-900">₹{ord.total}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-gray-700 bg-transparent cursor-pointer"
                  >
                    View Details
                  </Button>
                </div>
              </div>

              {/* This inner loop now works correctly because it's looping over `ord.items` */}
              <div className="space-y-3">
                {ord.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border rounded-md p-3 hover:bg-gray-50 transition-all"
                  >
                    <Image
                      src={item.image || "/placeholder.png"}
                      alt={item.product?.name || "Product image"}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.product?.name || "Product Name"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Size: {item.variant?.size || "-"}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity} • ₹{item.price} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}