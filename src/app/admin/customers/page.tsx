"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Users,
  TrendingUp,
  Star,
  MapPin,
} from "lucide-react";
import axios from "axios";
import { formatDate } from "@/utils";

// Mock data for customers

type customersSchema = {
  id: string;
  avatar:
    | string
    | "https://imgs.search.brave.com/zMHdiWHkzhpWvwSuznZrhKA_X-P3omVlmVrR_Id4hf8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE2LzA1LzQ1LzM2/LzM2MF9GXzE2MDU0/NTM2MTlfZGxOUWFl/ZjNCbmEwdTdKRTVV/blpmUmp6clRxeVlr/WWguanBn";
  name: string;
  email: string;
  ordersCount: number;
  totalSpent: number;
  lastOrder: Date;
  address: {
    city: string;
    country: string;
  };
};

type CustomersDetailsType = {
  avgOrderValue: number;
  revenue: number;
  totalCustomers: number;
  customers: customersSchema[];
};

const CustomersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [customers, setCustomers] = useState();
  const [customersDetails, setCustomersDetails] =
    useState<CustomersDetailsType>();

  const filteredCustomers = customersDetails?.customers?.filter((customer) => {
    const matchesSearch =
      customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const getCustomersDetails = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/customers`,
        {
          withCredentials: true,
        }
      );
      setCustomersDetails(res.data.data);
    } catch (_error) {}
  };

  useEffect(() => {
    getCustomersDetails();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customers Management</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {customersDetails?.totalCustomers}
                </div>
                <div className="text-sm text-gray-500">Total Customers</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {customersDetails?.totalCustomers}
                </div>
                <div className="text-sm text-gray-500">Active Customers</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="w-8 h-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  ₹{customersDetails?.revenue}
                </div>
                <div className="text-sm text-gray-500">Total Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  ₹{customersDetails?.avgOrderValue}
                </div>
                <div className="text-sm text-gray-500">Avg Order Value</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search customers by name, email, phone, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Chennai">Chennai</SelectItem>
                  <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="Pune">Pune</SelectItem>
                  <SelectItem value="Kolkata">Kolkata</SelectItem>
                  <SelectItem value="Ahmedabad">Ahmedabad</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customers List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers?.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={
                            customer.avatar ||
                            "https://cdn-icons-png.flaticon.com/128/847/847969.png"
                          }
                          alt={customer.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-gray-500">
                            {customer.id}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{customer.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{`${
                          customer.address.city || "N/A"
                        }, ${customer.address.country || ""}`}</span>
                      </div>
                    </TableCell>

                    <TableCell>{customer?.ordersCount}</TableCell>
                    <TableCell>₹{customer?.totalSpent}</TableCell>
                    <TableCell>{formatDate(customer?.lastOrder)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Customer
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Orders
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCustomers?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No customers found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersPage;
