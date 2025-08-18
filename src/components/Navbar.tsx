"use client";

import Link from "next/link";
import { Search, Heart, ShoppingBag, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useEffect } from "react";
import { useProductStore, userStore } from "@/lib/store";

const categories = [
  { name: "MEN", href: "/products?category=men" },
  { name: "WOMEN", href: "/products?category=women" },
  { name: "KIDS", href: "/products?category=kids" },
];

export const Navbar = () => {
  const { setProducts } = useProductStore();
  const { cartItems, setUser, user } = userStore();

  const getProducts = async () => {
    const response = await axios.get("http://localhost:3001/api/products");
    setProducts(response.data.data);
  };

  const getUser = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      withCredentials: true,
    });
    setUser(res.data.data);
  };

  useEffect(() => {
    getProducts();
    getUser();
  }, []);


  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-black tracking-wide cursor-pointer"
        >
          NEXA
        </Link>

        {/* Category Tabs */}
        <div className="hidden lg:flex gap-6 text-sm font-medium tracking-wide">
          {categories.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className="text-gray-700 hover:text-black transition cursor-pointer"
            >
              {tab.name}
            </Link>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          {/* Search bar (hidden on small) */}
          <div className="hidden md:block w-64">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search for products, brands and more"
                className="pl-10 text-sm rounded-sm border-gray-300"
              />
            </div>
          </div>

          {/* Wishlist */}
          <Link href="/whishlist">
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>

          {/* Bag */}
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <ShoppingBag className="h-5 w-5 cursor-pointer" />
              {cartItems && cartItems?.length > 0 && (
                <span className="absolute -top-1 -right-0 bg-gray-800 text-white text-xs rounded-full px-1 min-w-[14px] flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>
          </Link>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar className="h-6 w-6 cursor-pointer  duration-300 border-none">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-white border-none shadow-sm"
              align="end"
            >
              <DropdownMenuItem
                className="cursor-pointer hover:bg-gray-100 duration-300"
                asChild
              >
                <Link href="/profile" className="cursor-pointer  rounded-none">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer  hover:bg-gray-100 duration-300 border-b-gray-200 rounded-none">
                Orders
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer hover:bg-gray-100 duration-300 rounded-none"
                onClick={() => alert("Logging out...")}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
