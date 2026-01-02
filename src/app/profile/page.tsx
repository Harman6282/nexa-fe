"use client";

import { useEffect, useState } from "react";
import { userStore } from "@/lib/store";
import axios from "axios";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { PersonalInformation } from "@/components/profile/PersonalInformation";
import { RecentOrders } from "@/components/profile/RecentOrders";
import { SavedAddresses } from "@/components/profile/SavedAddresses";
import ProfileShimmer from "@/components/shimmer/Profile_shimmer";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
export interface Address {
  id: string;
  lineOne: string;
  lineTwo?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

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

export default function ProfilePage() {
  const [orders, setOrders] = useState<OrderHistoryProps[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const user = userStore((state) => state.user);

  const getOrders = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/myorders`,
        {
          withCredentials: true,
        }
      );
      setOrders(res.data.data.items || []);
    } catch (error) {
      setOrders([]);
    }
  };

  const getAddresses = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/address`,
        {
          withCredentials: true,
        }
      );
      setAddresses(res.data.data || []);
    } catch (error) {
      setAddresses([]);
    }
  };

  useEffect(() => {
    getOrders();
    getAddresses();
  }, []);

  if (user === null || user === undefined) {
    return <ProfileShimmer />;
  }

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex mb-8">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-text-muted hover:text-accent transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="text-text-muted text-sm mx-1 h-4 w-4" />
              <span className="text-sm font-medium text-text-main">
                My Profile
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <ProfileSidebar />

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-8">
          {/* Personal Information */}
          <PersonalInformation />

          {/* Recent Orders and Saved Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RecentOrders orders={orders} />
            <SavedAddresses
              addresses={addresses}
              onRefresh={getAddresses}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
