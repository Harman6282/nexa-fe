"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  Loader2,
} from "lucide-react";
import { ProductSchema } from "@/lib/store";
import axios from "axios";
import { toast } from "sonner";

// Mock data for orders

export type ordersSchema = {
  id: string;
  name: string;
  email: string;
  items: ProductSchema[];
  paymentStatus: string;
  total: string;
  status: string;
  createdAt: string;
};

const OrdersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orders, setOrders] = useState<ordersSchema[]>();
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // const [orders, setOrders] = useState<OrderHistoryProps[]>([]);
  // const cartId = userStore((state) => state.user?.cart[0].id);

  const normalizeStatus = (status: string) => status?.trim().toLowerCase();

  const getallOrders = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllOrders`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success === true) {
        setOrders(
          res.data.data?.map((order: ordersSchema) => ({
            ...order,
            status: normalizeStatus(order.status),
          }))
        );
      }
    } catch (error) {
      // setOrders([]);
    }
    return;
  };

  useEffect(() => {
    getallOrders();
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      delivered: { variant: "primary", text: "Delivered" },
      pending: { variant: "secondary", text: "Pending" },
      processing: { variant: "outline", text: "Processing" },
      shipped: { variant: "outline", text: "Shipped" },
      cancelled: { variant: "destructive", text: "Cancelled" },
    };

    const normalized = normalizeStatus(status);
    const config =
      statusConfig[normalized as keyof typeof statusConfig] ||
      statusConfig.pending;
    return <Badge variant={config.variant as any}>{config.text}</Badge>;
  };

  const getPaymentBadge = (payment: string) => {
    const paymentConfig = {
      PAID: { variant: "default", text: "Paid" },
      PENDING: { variant: "secondary", text: "Pending" },
      FAILED: { variant: "destructive", text: "failed" },
    };

    const config =
      paymentConfig[payment as keyof typeof paymentConfig] ||
      paymentConfig.PENDING;
    return <Badge variant={config.variant as any}>{config.text}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    const normalized = normalizeStatus(status);
    switch (normalized) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "processing":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "shipped":
        return <Truck className="w-4 h-4 text-purple-600" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredOrders = orders?.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      normalizeStatus(order.status) === normalizeStatus(statusFilter);

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      setIsUpdatingStatus(true);
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/updateStatus/${orderId}`,
        { status: normalizeStatus(newStatus) },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.success === true) {
        toast.success("status updated");
      }

      setOrders(
        orders?.map((order) =>
          order.id === orderId
            ? { ...order, status: normalizeStatus(newStatus) }
            : order
        )
      );

    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(orders?.filter((order) => order.id !== orderId));
  };

  const getAvailableStatuses = (currentStatus: string) => {
    const allStatuses = [
      {
        value: "pending",
        label: "pending",
        icon: <Clock className="w-4 h-4" />,
      },
      {
        value: "processing",
        label: "processing",
        icon: <Clock className="w-4 h-4" />,
      },
      {
        value: "shipped",
        label: "shipped",
        icon: <Truck className="w-4 h-4" />,
      },
      {
        value: "delivered",
        label: "delivered",
        icon: <CheckCircle className="w-4 h-4" />,
      },
      {
        value: "cancelled",
        label: "Cancelled",
        icon: <XCircle className="w-4 h-4" />,
      },
    ];

    // Filter out current status and show only valid transitions
    return allStatuses.filter(
      (status) => status.value !== normalizeStatus(currentStatus)
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Orders Management</h1>
        <Button>
          <Eye className="w-4 h-4 mr-2" />
          View All Orders
        </Button>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders?.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{order.email}</div>
                        {/* <div className="text-gray-500">{order.phone}</div> */}
                      </div>
                    </TableCell>
                    <TableCell>{order.items.length}</TableCell>
                    <TableCell>₹{order.total.toLocaleString()}</TableCell>
                    <TableCell>
                      {isUpdatingStatus ? (
                        <Loader2 className="animate-spin [animation-duration:0.5s]" />
                      ) : (
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.status)}
                          {getStatusBadge(order.status)}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {getPaymentBadge(order?.paymentStatus)}
                    </TableCell>
                    <TableCell>{order?.createdAt}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <div className="px-2 py-1.5 text-sm font-semibold text-gray-700">
                            Change Status
                          </div>

                          {getAvailableStatuses(order.status).map((status) => (
                            <DropdownMenuItem
                              key={status.value}
                              onClick={() =>
                                handleStatusChange(order.id, status.value)
                              }
                              className="flex items-center"
                            >
                              {status.icon}
                              <span className="ml-2">
                                Mark as {status.label}
                              </span>
                            </DropdownMenuItem>
                          ))}

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={() => handleDeleteOrder(order.id)}
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

          {filteredOrders?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No orders found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersPage;
