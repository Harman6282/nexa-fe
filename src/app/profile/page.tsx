"use client";

import { AccountSettings } from "@/components/profile/Account-settings";
import { AddressBook } from "@/components/profile/Address-book";
import { OrderHistory } from "@/components/profile/Order-history";
import { ProfileHeader } from "@/components/profile/Profile-header";
import { Wishlist } from "@/components/profile/Whishlist";
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

const wishlistData = [
  {
    name: "Wireless Headphones",
    price: "$199.99",
    image:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/APRIL/12/ipUGC2Eu_d0a66ec6d0ba4849af9742225dfc0040.jpg",
  },
  {
    name: "Smart Watch",
    price: "$299.99",
    image:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/APRIL/12/ipUGC2Eu_d0a66ec6d0ba4849af9742225dfc0040.jpg",
  },
  {
    name: "Laptop Stand",
    price: "$79.99",
    image:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/APRIL/12/ipUGC2Eu_d0a66ec6d0ba4849af9742225dfc0040.jpg",
  },
  {
    name: "Coffee Maker",
    price: "$149.99",
    image:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/APRIL/12/ipUGC2Eu_d0a66ec6d0ba4849af9742225dfc0040.jpg",
  },
];

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

export interface AddressBookProps {
  addresses: Address[];
}

export default function ProfilePage() {
  const [orders, setOrders] = useState<OrderHistoryProps[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);

  const user = userStore((state) => state.user);

  // const cartId = userStore((state) => state.user?.cart[0].id);

  const getAddresses = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/address`,
        {
          withCredentials: true,
        }
      );
      setAddresses(res.data.data);
    } catch (_error) {
      setAddresses([]);
    }
  };

  const getOrders = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/myorders`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setOrders(res.data.data.items);
    } catch (error) {
      setOrders([]);
    }
    return;
  };

  useEffect(() => {
    getOrders();
    getAddresses();
  }, []);

  return (
    orders && (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {user && <ProfileHeader name={user?.name} email={user?.email} />}

          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 mb-8 ">
              <TabsTrigger
                value="orders"
                className="data-[state=active]:bg-white cursor-pointer data-[state=active]:text-gray-900 "
              >
                <Package className="w-4 h-4 mr-2" />
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="wishlist"
                className="data-[state=active]:bg-white cursor-pointer data-[state=active]:text-gray-900"
              >
                <Heart className="w-4 h-4 mr-2" />
                Wishlist
              </TabsTrigger>
              <TabsTrigger
                value="addresses"
                className="data-[state=active]:bg-white cursor-pointer data-[state=active]:text-gray-900"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Addresses
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <OrderHistory order={orders} />
            </TabsContent>

            <TabsContent value="wishlist">
              <Wishlist items={wishlistData} />
            </TabsContent>

            <TabsContent value="addresses">
              <AddressBook addresses={addresses} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  );
}
