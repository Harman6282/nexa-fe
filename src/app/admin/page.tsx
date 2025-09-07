"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ShoppingCart, Users, Box } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import axios from "axios";

type DashboardDataSchema = {
  totalOrders: number;
  totalSales: number;
  totalCustomers: number;
  totalProducts: number;
};

const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardDataSchema>();

  const getDashboard = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`,
        {
          withCredentials: true,
        }
      );
      setDashboardData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dashboardData?.totalOrders}</p>
            <p className="text-sm text-gray-500">+5% this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dashboardData?.totalSales}</p>
            <p className="text-sm text-gray-500">+12% this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {dashboardData?.totalCustomers}
            </p>
            <p className="text-sm text-gray-500">+3% this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dashboardData?.totalProducts}</p>
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
                        <div className="text-sm text-gray-500">
                          View and process orders
                        </div>
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
                        <div className="text-sm text-gray-500">
                          Add, edit, or remove products
                        </div>
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
                        <div className="text-sm text-gray-500">
                          View customer information
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AdminDashboard;
