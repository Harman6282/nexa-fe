"use client"

import { AccountSettings } from "@/components/profile/Account-settings"
import { AddressBook } from "@/components/profile/Address-book"
import { OrderHistory } from "@/components/profile/Order-history"
import { ProfileHeader } from "@/components/profile/Profile-header"
import { Wishlist } from "@/components/profile/Whishlist"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MapPin, Package, User } from "lucide-react"

// Mock data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  phone: "+1 (555) 123-4567",
  badges: ["Premium Member", "Verified Account"],
}

const ordersData = [
  {
    id: "#ORD-001",
    date: "Dec 15, 2023",
    status: "Delivered",
    total: "$129.99",
    items: 3,
  },
  {
    id: "#ORD-002",
    date: "Dec 10, 2023",
    status: "Shipped",
    total: "$89.50",
    items: 2,
  },
  {
    id: "#ORD-003",
    date: "Dec 5, 2023",
    status: "Processing",
    total: "$199.99",
    items: 1,
  },
]

const wishlistData = [
  {
    name: "Wireless Headphones",
    price: "$199.99",
    image: "/placeholder.svg?height=200&width=200&text=Headphones",
  },
  {
    name: "Smart Watch",
    price: "$299.99",
    image: "/placeholder.svg?height=200&width=200&text=Smart+Watch",
  },
  {
    name: "Laptop Stand",
    price: "$79.99",
    image: "/placeholder.svg?height=200&width=200&text=Laptop+Stand",
  },
  {
    name: "Coffee Maker",
    price: "$149.99",
    image: "/placeholder.svg?height=200&width=200&text=Coffee+Maker",
  },
]

const addressesData = [
  {
    type: "Home",
    name: "John Doe",
    address: "123 Main Street, Apt 4B",
    city: "New York, NY 10001",
    phone: "+1 (555) 123-4567",
    isDefault: true,
  },
  {
    type: "Work",
    name: "John Doe",
    address: "456 Business Ave, Suite 200",
    city: "New York, NY 10002",
    phone: "+1 (555) 987-6543",
    isDefault: false,
  },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <ProfileHeader name={userData.name} email={userData.email} badges={userData.badges} />

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 mb-8 ">
            <TabsTrigger value="orders" className="data-[state=active]:bg-white cursor-pointer data-[state=active]:text-gray-900 ">
              <Package className="w-4 h-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="data-[state=active]:bg-white cursor-pointer data-[state=active]:text-gray-900">
              <Heart className="w-4 h-4 mr-2" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="addresses" className="data-[state=active]:bg-white cursor-pointer data-[state=active]:text-gray-900">
              <MapPin className="w-4 h-4 mr-2" />
              Addresses
            </TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <OrderHistory orders={ordersData} />
          </TabsContent>

          <TabsContent value="wishlist">
            <Wishlist items={wishlistData} />
          </TabsContent>

          <TabsContent value="addresses">
            <AddressBook addresses={addressesData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
