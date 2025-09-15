"use client";

import { AddressBook } from "@/components/profile/Address-book";
import { OrderHistory } from "@/components/profile/Order-history";
import { ProfileHeader } from "@/components/profile/Profile-header";
import { Wishlist } from "@/components/profile/Whishlist";
import ProfileShimmer from "@/components/shimmer/Profile_shimmer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { userStore } from "@/lib/store";
import axios from "axios";
import { Heart, MapPin, Package, User } from "lucide-react";
import { useEffect, useState } from "react";

export interface OrderHistoryProps {
  orderId: string;
  status: string;
  total: number;
  date: string;
  address: string;
  itemId: string;
  quantity: number;
  price: number;
  productId: string;
  productName: string;
  image: string;
  variantId: string;
  size: string;
  stock: number;
  createdAt: Date;
}

export interface Address {
  city: string;
  country: string;
  createdAt: string;
  id: string;
  lineOne: string;
  lineTwo: string;
  pincode: string;
  state: string;
  updatedAt: string;
  userId: string;
}

export default function ProfilePage() {
  const [orders, setOrders] = useState<OrderHistoryProps[]>([]);

  const user = userStore((state) => state.user);

  // const cartId = userStore((state) => state.user?.cart[0].id);

  const getOrders = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/myorders`,
        {
          withCredentials: true,
        }
      );
      setOrders(res.data.data.items);
    } catch (error) {
      setOrders([]);
    }
    return;
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (user === null || user === undefined) {
    return <ProfileShimmer />;
  }

  return (
    orders && (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {user && <ProfileHeader name={user?.name} email={user?.email} />}

          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 mb-8 ">
              <TabsTrigger
                value="orders"
                className="data-[state=active]:text-white cursor-pointer data-[state=active]:bg-stone-800 "
              >
                <Package className="w-4 h-4 mr-2" />
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="wishlist"
                className="data-[state=active]:text-white cursor-pointer data-[state=active]:bg-stone-800"
              >
                <Heart className="w-4 h-4 mr-2" />
                Wishlist
              </TabsTrigger>
              <TabsTrigger
                value="addresses"
                className="data-[state=active]:text-white cursor-pointer data-[state=active]:bg-stone-800"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Addresses
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <OrderHistory order={orders} />
            </TabsContent>

            <TabsContent value="wishlist">
              <Wishlist />
            </TabsContent>

            <TabsContent value="addresses">
              <AddressBook />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  );
}
