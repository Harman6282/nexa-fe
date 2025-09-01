"use client"

import React from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Box,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6">
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

      {/* Quick Actions */}
      <section className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/admin/orders">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <ShoppingCart className="w-8 h-8 text-blue-600" />
                      <div>
                        <div className="font-medium">Manage Orders</div>
                        <div className="text-sm text-gray-500">View and process orders</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/admin/products">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Box className="w-8 h-8 text-green-600" />
                      <div>
                        <div className="font-medium">Manage Products</div>
                        <div className="text-sm text-gray-500">Add, edit, or remove products</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/admin/customers">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Users className="w-8 h-8 text-purple-600" />
                      <div>
                        <div className="font-medium">Manage Customers</div>
                        <div className="text-sm text-gray-500">View customer information</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
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
    </div>
  );
};

export default AdminDashboard;
