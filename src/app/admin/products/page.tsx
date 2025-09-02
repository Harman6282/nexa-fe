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
  Package,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { adminProductsSchema, useProductStore } from "@/lib/store";

// Mock data for products
// const mockProducts = [
//   {
//     id: "PROD-001",
//     name: "Wireless Bluetooth Headphones",
//     category: "Electronics",
//     price: 2499,
//     stock: 45,
//     image:
//       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
//     sku: "WH-001",
//     description: "High-quality wireless headphones with noise cancellation",
//   },
//   {
//     id: "PROD-002",
//     name: "Smart Fitness Watch",
//     category: "Electronics",
//     price: 8999,
//     stock: 23,
//     image:
//       "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
//     sku: "SW-001",
//     description: "Advanced fitness tracking with heart rate monitor",
//   },
//   {
//     id: "PROD-003",
//     name: "Organic Cotton T-Shirt",
//     category: "Clothing",
//     price: 899,
//     stock: 67,
//     image:
//       "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
//     sku: "CT-001",
//     description: "Comfortable organic cotton t-shirt",
//   },
//   {
//     id: "PROD-004",
//     name: "Stainless Steel Water Bottle",
//     category: "Home & Garden",
//     price: 599,
//     stock: 89,
//     image:
//       "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop",
//     sku: "WB-001",
//     description: "Insulated stainless steel water bottle",
//   },
//   {
//     id: "PROD-005",
//     name: "Yoga Mat Premium",
//     category: "Sports",
//     price: 1299,
//     stock: 12,
//     image:
//       "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop",
//     sku: "YM-001",
//     description: "Non-slip premium yoga mat",
//   },
//   {
//     id: "PROD-006",
//     name: "Wireless Charger",
//     category: "Electronics",
//     price: 1499,
//     stock: 0,
//     image:
//       "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop",
//     sku: "WC-001",
//     description: "Fast wireless charging pad for smartphones",
//   },
// ];

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  // const [statusFilter, setStatusFilter] = useState("all");
  const [products, setProducts] = useState<adminProductsSchema[]>();

  const { adminProducts, setAdminProducts } = useProductStore();
  useEffect(() => {
    setProducts(adminProducts);
  }, [products]);

  // const getStatusBadge = (status: string) => {
  //   const statusConfig = {
  //     active: { variant: "default", text: "Active" },
  //     "low-stock": { variant: "secondary", text: "Low Stock" },
  //     "out-of-stock": { variant: "destructive", text: "Out of Stock" },
  //     inactive: { variant: "outline", text: "Inactive" },
  //   };

  //   const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  //   return <Badge variant={config.variant as any}>{config.text}</Badge>;
  // };

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (stock <= 20) {
      return <Badge variant="secondary">Low Stock</Badge>;
    } else {
      return <Badge variant="default">{stock} in Stock</Badge>;
    }
  };

  const filteredProducts = products?.filter((product) => {
    const matchesSearch =
      product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    // const matchesStatus = statusFilter === "all" || product.status === statusFilter;

    return matchesSearch && matchesCategory;
  });

  const handleDeleteProduct = (productId: string) => {
    setProducts(products?.filter((product) => product.id !== productId));
  };

  const totalValue = products?.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );
  const lowStockCount = products?.filter(
    (p) => p.stock <= 20 && p.stock > 0
  ).length;
  const outOfStockCount = products?.filter((p) => p.stock === 0).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products Management</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {products?.length}
                </div>
                <div className="text-sm text-gray-500">Total Products</div>
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
                  ₹{totalValue?.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Inventory Value</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {lowStockCount}
                </div>
                <div className="text-sm text-gray-500">Low Stock</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-8 h-8 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {outOfStockCount}
                </div>
                <div className="text-sm text-gray-500">Out of Stock</div>
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
                  placeholder="Search products by name, SKU, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="men">men</SelectItem>
                  <SelectItem value="women">women</SelectItem>
                  <SelectItem value="kids">kids</SelectItem>
                </SelectContent>
              </Select>
              {/* <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select> */}
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts?.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">
                            {product.description.slice(0, 10)}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>₹{product.price.toLocaleString()}</TableCell>
                    <TableCell>{getStockBadge(product.stock)}</TableCell>
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
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteProduct(product.id)}
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

          {filteredProducts?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No products found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsPage;
