"use client"

import React, { useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Box,
  LogOut,
  Menu,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for large screens */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r shadow">
        <div className="p-6 text-2xl font-bold">NexaBuy Admin</div>
        <nav className="flex-1 px-4 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
          >
            <LayoutDashboard className="w-5 h-5 mr-2" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Orders
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
          >
            <Box className="w-5 h-5 mr-2" />
            Products
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
          >
            <Users className="w-5 h-5 mr-2" />
            Customers
          </Button>
        </nav>
        <div className="p-4 border-t">
          <Button
            variant="destructive"
            className="w-full flex justify-start"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="absolute top-4 left-4 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <div className="p-6 text-2xl font-bold">NexaBuy Admin</div>
          <nav className="flex flex-col px-4 space-y-2">
            <Button
              variant="ghost"
              className="justify-start"
            >
              <LayoutDashboard className="w-5 h-5 mr-2" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="justify-start"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Orders
            </Button>
            <Button
              variant="ghost"
              className="justify-start"
            >
              <Box className="w-5 h-5 mr-2" />
              Products
            </Button>
            <Button
              variant="ghost"
              className="justify-start"
            >
              <Users className="w-5 h-5 mr-2" />
              Customers
            </Button>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="font-medium">Admin</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">1,245</p>
              <p className="text-sm text-gray-500">+5% this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹82,500</p>
              <p className="text-sm text-gray-500">+12% this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">324</p>
              <p className="text-sm text-gray-500">+3% this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">58</p>
              <p className="text-sm text-gray-500">+1 new added</p>
            </CardContent>
          </Card>
        </section>

        {/* Recent Orders Table */}
        <section className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-sm font-semibold">Order ID</th>
                      <th className="px-4 py-2 text-sm font-semibold">Customer</th>
                      <th className="px-4 py-2 text-sm font-semibold">Amount</th>
                      <th className="px-4 py-2 text-sm font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-2">#123456</td>
                      <td className="px-4 py-2">John Doe</td>
                      <td className="px-4 py-2">₹2,499</td>
                      <td className="px-4 py-2 text-green-600">Completed</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">#123457</td>
                      <td className="px-4 py-2">Jane Smith</td>
                      <td className="px-4 py-2">₹1,199</td>
                      <td className="px-4 py-2 text-yellow-600">Pending</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
