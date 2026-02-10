"use client";

import Link from "next/link";
import Image from "next/image";
import { OrderHistoryProps } from "@/app/profile/page";

interface RecentOrdersProps {
  orders: OrderHistoryProps[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  // Group orders by orderId and get the first 2
  const groupedOrders = orders.reduce((acc, item) => {
    if (!acc[item.orderId]) {
      acc[item.orderId] = {
        orderId: item.orderId,
        status: item.status,
        total: item.total,
        date: item.date,
        items: [],
      };
    }
    acc[item.orderId].items.push({
      name: item.productName,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    });
    return acc;
  }, {} as any);

  const recentOrders = Object.values(groupedOrders).slice(0, 2);

  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "delivered") {
      return {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-100",
        dot: "bg-emerald-500",
        label: "Delivered",
      };
    } else if (statusLower === "shipped") {
      return {
        bg: "bg-sky-50",
        text: "text-sky-700",
        border: "border-sky-100",
        dot: "bg-sky-500",
        label: "Shipped",
      };
    } else {
      return {
        bg: "bg-gray-50",
        text: "text-gray-700",
        border: "border-gray-100",
        dot: "bg-gray-500",
        label: status,
      };
    }
  };

  return (
    <section id="recent-orders" className="flex flex-col gap-5">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-bold text-text-main">Recent Orders</h3>
        <Link
          href="/profile#recent-orders"
          className="text-sm font-medium text-accent hover:text-text-main transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {recentOrders.length > 0 ? (
          recentOrders.map((order: any) => {
            const firstItem = order.items[0];
            const statusBadge = getStatusBadge(order.status);
            const itemCount = order.items.reduce(
              (sum: number, item: any) => sum + item.quantity,
              0
            );

            return (
              <div
                key={order.orderId}
                className="bg-white rounded-xl shadow-sm border border-[#D6C0B3] p-4 flex gap-4 transition-all hover:border-accent/30 hover:shadow-md cursor-pointer group"
              >
                <div className="w-16 h-20 flex-shrink-0 bg-[#E4E0E1] rounded-md overflow-hidden border border-[#D6C0B3]/30">
                  <Image
                    src={firstItem.image || "/card1.jpg"}
                    alt={firstItem.name}
                    width={64}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-text-main line-clamp-1 group-hover:text-accent transition-colors">
                        {firstItem.name}
                      </h4>
                      <span className="text-sm font-medium text-text-main">
                        ₹{order.total.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted mt-1">
                      Order #{order.orderId.slice(-6)} • {itemCount}{" "}
                      {itemCount === 1 ? "item" : "items"}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${statusBadge.bg} ${statusBadge.text} border ${statusBadge.border}`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${statusBadge.dot}`}
                      />
                      {statusBadge.label}
                    </span>
                    <button className="text-xs font-medium text-text-muted hover:text-text-main transition-colors">
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-[#D6C0B3] p-8 text-center">
            <p className="text-text-muted">No recent orders found.</p>
          </div>
        )}
      </div>
    </section>
  );
}

