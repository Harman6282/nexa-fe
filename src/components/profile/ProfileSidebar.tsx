"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  User,
  Package2,
  MapPin,
  Heart,
  LogOut,
} from "lucide-react";
import { userStore } from "@/lib/store";
import axios from "axios";
import { toast } from "sonner";

export function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser } = userStore();

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
      toast.success("Logged out successfully");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Failed to logout");
    }
  };

  const navItems = [
    {
      href: "/profile#personal-info",
      icon: User,
      label: "Personal Info",
      path: "/profile#personal-info",
    },
    {
      href: "/profile#recent-orders",
      icon: Package2,
      label: "Recent Orders",
      path: "/profile#recent-orders",
    },
    {
      href: "/profile#saved-addresses",
      icon: MapPin,
      label: "Addresses",
      path: "/profile#saved-addresses",
    },
    {
      href: "/wishlist",
      icon: Heart,
      label: "Wishlist",
      path: "/wishlist",
    },
  ];

  const isActive = (path: string) => {
    const base = path.split("#")[0];
    if (base === "/profile") {
      return pathname === "/profile" && path.includes("personal-info");
    }
    return pathname?.startsWith(base);
  };

  return (
    <aside className="lg:col-span-3">
      <div className="bg-white rounded-xl shadow-sm border border-[#D6C0B3] overflow-hidden sticky top-24">
        <div className="p-6 border-b border-[#D6C0B3]/50 flex flex-col items-center text-center gap-3">
          <div className="size-20 rounded-full bg-[#E4E0E1] overflow-hidden ring-4 ring-[#E4E0E1] shadow-sm">
            {user ? (
              <Image
                src=""
                alt="User profile picture"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#D6C0B3] flex items-center justify-center text-2xl font-bold text-text-main">
               "userName"
              </div>
            )}
          </div>
          <div>
            <h2 className="text-base font-bold text-text-main">
              {user?.name || "User"}
            </h2>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent mt-1">
              Gold Member
            </span>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  active
                    ? "bg-[#E4E0E1] text-text-main shadow-sm ring-1 ring-[#D6C0B3]/50"
                    : "text-text-muted hover:bg-[#E4E0E1] hover:text-text-main"
                }`}
              >
                <Icon
                  className={`text-[20px] ${active ? "fill-current" : ""}`}
                />
                {item.label}
              </Link>
            );
          })}

          <div className="h-px bg-[#D6C0B3] my-2 mx-3" />

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-text-muted hover:text-red-700 hover:bg-red-50 transition-colors"
          >
            <LogOut className="text-[20px]" />
            Sign Out
          </button>
        </nav>
      </div>
    </aside>
  );
}

