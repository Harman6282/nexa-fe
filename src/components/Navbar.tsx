"use client";

import Link from "next/link";
import { Search, Heart, ShoppingBag, User, Shirt, Menu } from "lucide-react";
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
import { useRouter } from "next/navigation";

const categories = [
  { name: "Men", href: "/products?category=men" },
  { name: "Women", href: "/products?category=women" },
  { name: "Kids", href: "/products?category=kids" },
  { name: "Sale", href: "/products?category=sale" },
];

export const Navbar = () => {
  const { setProducts, setTotalPages } = useProductStore();
  const { cartItems, setUser, user, setAddresses } = userStore();

  const router = useRouter();

  const getUser = async () => {
    try {
      const res = await axios.get(`/api/me`, { validateStatus: () => true });
      if (res.status === 200 && res.data?.user) {
        const payload = res.data.user?.data ?? res.data.user;
        setUser(payload);
        setAddresses(payload?.address);
      } else {
        setUser(null as any);
      }
    } catch (_error) {
      setUser(null as any);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null as any);
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#D6C0B3]">
      <div className="px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 text-text-main">
            <div className="size-9 rounded-lg bg-accent flex items-center justify-center text-white shadow-sm">
              <Shirt className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-black leading-tight tracking-tight hidden sm:block text-text-main">
              Nexa Fashion
            </h2>
          </Link>
        </div>

        {/* Search Bar - Center */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <label className="relative w-full group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-muted/60 group-focus-within:text-accent">
              <Search className="h-5 w-5" />
            </div>
            <Input
              type="text"
              placeholder="Search for products..."
              className="block w-full py-2.5 pl-10 pr-3 text-sm text-text-main bg-[#E4E0E1] border border-transparent hover:border-[#D6C0B3] focus:bg-white rounded-lg focus:ring-1 focus:ring-accent focus:border-accent placeholder:text-text-muted/50 transition-all font-medium shadow-sm"
            />
          </label>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 mr-4">
            {categories.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className="text-sm font-bold uppercase tracking-wide text-text-muted hover:text-text-main transition-colors"
              >
                {tab.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex gap-3">
            <Link href="/whishlist">
              <button className="flex items-center justify-center size-10 rounded-lg hover:bg-[#E4E0E1] text-text-main transition-all relative group">
                <Heart className="h-6 w-6" />
              </button>
            </Link>

            <Link href="/cart" className="relative">
              <button className="flex items-center justify-center size-10 rounded-lg hover:bg-[#E4E0E1] text-text-main transition-all relative group">
                <ShoppingBag className="h-6 w-6" />
                {cartItems && cartItems?.length > 0 && (
                  <span className="absolute top-1 right-0 size-4 bg-accent text-white text-[10px] font-bold flex items-center justify-center rounded-lg shadow-sm">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </Link>

            {user ? (
              <>
                {user?.role === "ADMIN" && (
                  <Link href={"/admin"}>
                    <Button
                      variant={"default"}
                      className="hidden sm:inline-flex"
                    >
                      Dashboard
                    </Button>
                  </Link>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center justify-center size-10 rounded-lg hover:bg-[#E4E0E1] text-text-main transition-all relative group">
                      <User className="h-6 w-6" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="bg-white border-none shadow-sm"
                    align="end"
                  >
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-gray-100 duration-300"
                      asChild
                    >
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 duration-300">
                      Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-gray-100 duration-300"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link href="/login">
                <button className="flex items-center justify-center size-10 rounded-lg hover:bg-[#E4E0E1] text-text-main transition-all relative group">
                  <User className="h-6 w-6" />
                </button>
              </Link>
            )}

            <button className="lg:hidden flex items-center justify-center size-10 rounded-lg hover:bg-[#E4E0E1] text-text-main transition-all">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
