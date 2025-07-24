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
  { name: "HOME & LIVING", href: "/products?category=home&living" },
  { name: "BEAUTY", href: "/products?category=beauty" },
];

export const Navbar = () => {
  const { setProducts } = useProductStore();
  const { setUser } = userStore();

  const getProducts = async () => {
    const response = await axios.get("http://localhost:3001/api/products");
    setProducts(response.data.data);
    console.log(response.data.data)
  };

  const getUser = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      withCredentials: true,
    });
    console.log(res.data.data);
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
          className="text-xl font-extrabold text-black tracking-wide"
        >
          NEXA
        </Link>

        {/* Category Tabs */}
        <div className="hidden lg:flex gap-6 text-sm font-medium tracking-wide">
          {categories.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className="text-gray-700 hover:text-black transition"
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
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>

          {/* Bag */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <ShoppingBag className="h-5 w-5 cursor-pointer" />
            </Button>
          </Link>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/profile.jpg" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Orders</DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert("Logging out...")}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
