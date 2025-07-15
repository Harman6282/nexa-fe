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

const categories = [
  { name: "MEN", href: "/men" },
  { name: "WOMEN", href: "/women" },
  { name: "KIDS", href: "/kids" },
  { name: "HOME & LIVING", href: "/home-living" },
  { name: "BEAUTY", href: "/beauty" },
];

export const Navbar = () => {
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
