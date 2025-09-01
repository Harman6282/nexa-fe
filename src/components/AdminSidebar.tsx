import { Link } from "lucide-react";
import React from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Box,
  LogOut,
  Menu,
} from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const AdminSidebar = () => {
  const handleLogout = () => {
    const router = useRouter();
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };
  return (
    <>
      <div className="p-6 text-2xl font-bold">NexaBuy Admin</div>
      <nav className="flex-1 px-4 space-y-2">
        <Link href="/admin">
          <Button variant="ghost" className="w-full justify-start">
            <LayoutDashboard className="w-5 h-5 mr-2" />
            Dashboard
          </Button>
        </Link>
        <Link href="/admin/orders">
          <Button variant="ghost" className="w-full justify-start">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Orders
          </Button>
        </Link>
        <Link href="/admin/products">
          <Button variant="ghost" className="w-full justify-start">
            <Box className="w-5 h-5 mr-2" />
            Products
          </Button>
        </Link>
        <Link href="/admin/customers">
          <Button variant="ghost" className="w-full justify-start">
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
};

export default AdminSidebar;
