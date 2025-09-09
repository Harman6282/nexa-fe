"use client";

import jwt from "jsonwebtoken";
import React, { useState, useEffect } from "react";
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
import { userStore } from "@/lib/store";
import UnauthorizedAccess from "@/components/admin/UnauthorizedAccess";
import axios from "axios";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser } = userStore();

  // Check user role and authorization
  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        // If user is not loaded, try to fetch it
        if (!user) {
          const response = await axios.get("/api/me", { 
            validateStatus: () => true 
          });
          
          if (response.status === 200 && response.data?.user) {
            const userData = response.data.user?.data ?? response.data.user;
            setUser(userData);
            
            // Check if user has admin role
            if (userData?.role === "ADMIN") {
              setIsAuthorized(true);
            } else {
              setIsAuthorized(false);
            }
          } else {
            setIsAuthorized(false);
          }
        } else {
          // Check if current user has admin role
          if (user?.role === "ADMIN") {
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
          }
        }
      } catch (error) {
        console.error("Error checking admin access:", error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAccess();
  }, [user, setUser]);

  // Show loading state while checking authorization
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking access...</p>
        </div>
      </div>
    );
  }

  // Show unauthorized access page if user is not admin
  if (!isAuthorized) {
    return <UnauthorizedAccess />;
  }

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

  const SidebarContent = () => (
    <>
      <div className="p-6 text-2xl font-bold">NexaBuy Admin</div>
      <nav className="flex-1 px-4 space-y-2">
        <Link href="/admin">
          <Button
            variant={pathname === "/admin" ? "default" : "ghost"}
            className="w-full justify-start cursor-pointer"
          >
            <LayoutDashboard className="w-5 h-5 mr-2" />
            Dashboard
          </Button>
        </Link>
        <Link href="/admin/orders">
          <Button
            variant={pathname === "/admin/orders" ? "default" : "ghost"}
            className="w-full justify-start cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Orders
          </Button>
        </Link>
        <Link href="/admin/products">
          <Button
            variant={pathname === "/admin/products" ? "default" : "ghost"}
            className="w-full justify-start cursor-pointer"
          >
            <Box className="w-5 h-5 mr-2" />
            Products
          </Button>
        </Link>
        <Link href="/admin/customers">
          <Button
            variant={pathname === "/admin/customers" ? "default" : "ghost"}
            className="w-full justify-start cursor-pointer"
          >
            <Users className="w-5 h-5 mr-2" />
            Customers
          </Button>
        </Link>
      </nav>
      
      {/* Logout Button */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
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
