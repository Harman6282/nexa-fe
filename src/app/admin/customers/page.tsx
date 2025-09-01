"use client"

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  MapPin
} from "lucide-react";

// Mock data for customers
const mockCustomers = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    status: "active",
    joinDate: "2023-01-15",
    totalOrders: 12,
    totalSpent: 24999,
    lastOrder: "2024-01-10",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: "CUST-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+91 98765 43211",
    location: "Delhi, NCR",
    status: "active",
    joinDate: "2023-03-20",
    totalOrders: 8,
    totalSpent: 18999,
    lastOrder: "2024-01-12",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: "CUST-003",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+91 98765 43212",
    location: "Bangalore, Karnataka",
    status: "active",
    joinDate: "2023-06-10",
    totalOrders: 15,
    totalSpent: 35999,
    lastOrder: "2024-01-15",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    id: "CUST-004",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+91 98765 43213",
    location: "Chennai, Tamil Nadu",
    status: "inactive",
    joinDate: "2023-02-05",
    totalOrders: 3,
    totalSpent: 5999,
    lastOrder: "2023-12-20",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
  {
    id: "CUST-005",
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "+91 98765 43214",
    location: "Hyderabad, Telangana",
    status: "active",
    joinDate: "2023-08-15",
    totalOrders: 6,
    totalSpent: 12999,
    lastOrder: "2024-01-08",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    id: "CUST-006",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+91 98765 43215",
    location: "Pune, Maharashtra",
    status: "active",
    joinDate: "2023-11-30",
    totalOrders: 4,
    totalSpent: 8999,
    lastOrder: "2024-01-14",
    avatar: "https://i.pravatar.cc/100?img=6",
  },
  {
    id: "CUST-007",
    name: "Robert Miller",
    email: "robert.miller@example.com",
    phone: "+91 98765 43216",
    location: "Kolkata, West Bengal",
    status: "inactive",
    joinDate: "2023-04-12",
    totalOrders: 2,
    totalSpent: 3999,
    lastOrder: "2023-11-15",
    avatar: "https://i.pravatar.cc/100?img=7",
  },
  {
    id: "CUST-008",
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    phone: "+91 98765 43217",
    location: "Ahmedabad, Gujarat",
    status: "active",
    joinDate: "2023-07-08",
    totalOrders: 9,
    totalSpent: 21999,
    lastOrder: "2024-01-16",
    avatar: "https://i.pravatar.cc/100?img=8",
  },
];

const CustomersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [customers, setCustomers] = useState(mockCustomers);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: "default", text: "Active" },
      inactive: { variant: "secondary", text: "Inactive" },
      suspended: { variant: "destructive", text: "Suspended" },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return <Badge variant={config.variant as any}>{config.text}</Badge>;
  };

  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent >= 30000) {
      return <Badge variant="default" className="bg-purple-600">Premium</Badge>;
    } else if (totalSpent >= 15000) {
      return <Badge variant="default" className="bg-blue-600">Gold</Badge>;
    } else if (totalSpent >= 5000) {
      return <Badge variant="default" className="bg-green-600">Silver</Badge>;
    } else {
      return <Badge variant="outline">Bronze</Badge>;
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    const matchesLocation = locationFilter === "all" || customer.location.includes(locationFilter);
    
    return matchesSearch && matchesStatus && matchesLocation;
  });

  const handleDeleteCustomer = (customerId: string) => {
    setCustomers(customers.filter(customer => customer.id !== customerId));
  };

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === "active").length;
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const avgOrderValue = totalRevenue / customers.reduce((sum, customer) => sum + customer.totalOrders, 0);

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
                <div className="text-2xl font-bold text-blue-600">{totalCustomers}</div>
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
                <div className="text-2xl font-bold text-green-600">{activeCustomers}</div>
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
                  ₹{totalRevenue.toLocaleString()}
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
                  ₹{Math.round(avgOrderValue).toLocaleString()}
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
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
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
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
                  <TableHead>Status</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={customer.avatar}
                          alt={customer.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{customer.email}</div>
                        <div className="text-gray-500">{customer.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{customer.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(customer.status)}</TableCell>
                    <TableCell>{getCustomerTier(customer.totalSpent)}</TableCell>
                    <TableCell>{customer.totalOrders}</TableCell>
                    <TableCell>₹{customer.totalSpent.toLocaleString()}</TableCell>
                    <TableCell>{customer.lastOrder}</TableCell>
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
                          <DropdownMenuItem
                            onClick={() => handleDeleteCustomer(customer.id)}
                            className="text-red-600"
                          >
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
          
          {filteredCustomers.length === 0 && (
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
