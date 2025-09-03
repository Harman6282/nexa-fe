"use client";

import jwt from "jsonwebtoken";
import React, { useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Box,
  LogOut,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    // Clear cookies and redirect to login
    alert("admin logged out")
  };

  const SidebarContent = () => (
    <>
      <div className="p-6 text-2xl font-bold">NexaBuy Admin</div>
      <nav className="flex-1 px-4 space-y-2">
        <Link href="/admin">
          <Button
            variant={pathname === "/admin" ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <LayoutDashboard className="w-5 h-5 mr-2" />
            Dashboard
          </Button>
        </Link>
        <Link href="/admin/orders">
          <Button
            variant={pathname === "/admin/orders" ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Orders
          </Button>
        </Link>
        <Link href="/admin/products">
          <Button
            variant={pathname === "/admin/products" ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <Box className="w-5 h-5 mr-2" />
            Products
          </Button>
        </Link>
        <Link href="/admin/customers">
          <Button
            variant={pathname === "/admin/customers" ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <Users className="w-5 h-5 mr-2" />
            Customers
          </Button>
        </Link>
      </nav>
      <div className="p-4 border-t">
        <Button
          variant="destructive"
          className="w-full flex justify-start"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen relative bg-gray-100">
      {/* Sidebar for large screens */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r shadow">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="absolute  left-4 lg:hidden z-50"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 ">
          <SheetTitle />
          <SidebarContent />
          <SheetDescription />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto mt-9 lg:mt-0">{children}</main>
    </div>
  );
};

export default AdminLayout;
