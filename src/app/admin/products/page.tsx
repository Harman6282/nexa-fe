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
import {
  adminProductsSchema,
  ProductSchema,
  useProductStore,
} from "@/lib/store";
import axios from "axios";

function shortDescription(description: string, wordCount: number = 3): string {
  return description.split(" ").slice(0, wordCount).join(" ") + "...";
}

const formatProductsData = (products: ProductSchema[]) => {
  const formated = products.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.categoryName,
    price: item.price,
    description: shortDescription(item.description, 3),
    stock: item.variants.reduce((acc, v) => acc + (v.stock ?? 0), 0),
    image: item.images[0].url,
  }));

  return formated;
};

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { setAdminProducts, adminProducts } = useProductStore();
  const [isFetching, setIsFetching] = useState(false);

  const [productsData, setProductsData] = useState<adminProductsSchema[]>();

  const getProducts = async () => {
    try {
      setIsFetching(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );
      setProductsData(response.data.data.products);
      setAdminProducts(formatProductsData(response.data.data.products));
    } catch (_error) {
    } finally {
      setIsFetching(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (stock <= 20) {
      return <Badge variant="secondary">Low Stock</Badge>;
    } else {
      return <Badge variant="default">{stock} in Stock</Badge>;
    }
  };

  const filteredProducts = adminProducts?.filter((product) => {
    const matchesSearch =
      product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    // const matchesStatus = statusFilter === "all" || product.status === statusFilter;

    return matchesSearch && matchesCategory;
  });

  const handleDeleteProduct = (productId: string) => {
    setProductsData(
      filteredProducts?.filter((product) => product.id !== productId)
    );
  };

  const totalValue = filteredProducts?.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );
  const lowStockCount = filteredProducts?.filter(
    (p) => p.stock <= 20 && p.stock > 0
  ).length;
  const outOfStockCount = filteredProducts?.filter((p) => p.stock === 0).length;

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
                  {filteredProducts?.length}
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
                    <TableCell>{product?.category}</TableCell>
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
