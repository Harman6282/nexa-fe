"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Minus,
  Plus,
  X,
  ShoppingBag,
  ArrowLeft,
  Heart,
  Truck,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CartItems,
  ProductSchema,
  useCartStore,
  useProductStore,
  userStore,
} from "@/lib/store";
import axios from "axios";
import Image from "next/image";
import { toast } from "sonner";
import CartShimmer from "@/components/shimmer/Cart_shimmer";
import OrderSummary from "@/components/OrderSummary";

export default function Cart() {
  const cartItems = userStore((state) => state.cartItems);
  const {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    setCartItems,
    setWishlist,
    wishlist,
  } = userStore();
  const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { setOrderDetails } = useCartStore();

  const subtotal = cartItems?.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const originalTotal = cartItems?.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discount =
    cartItems?.reduce(
      (sum, item) => sum + (item.product.discount ?? 0) * item.quantity,
      0
    ) ?? 0;
  const deliveryCharges = subtotal! > 500 ? 0 : 60;
  const total = subtotal! + deliveryCharges - discount;

  const getCart = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        withCredentials: true,
      });
      setCartItems(res.data.data.items);
    } catch (_error) {
      // Optionally show a toast: toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const orderDetails = {
    cartItems,
    originalTotal: originalTotal ?? 0,
    discount,
    deliveryCharges,
    total,
  };

  useEffect(() => {
    if (
      cartItems?.length &&
      originalTotal !== null &&
      discount !== null &&
      deliveryCharges !== null &&
      total !== null
    ) {
      setOrderDetails(orderDetails);
    }
  }, [
    cartItems,
    originalTotal,
    discount,
    deliveryCharges,
    total,
    setOrderDetails,
  ]);

  async function removeItem(id: string) {
    removeFromCart(id);
    toast.success("Item removed");

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/cart/delete/${id}`,
        {
          withCredentials: true,
        }
      );
    } catch (_error) {
      // Optionally show a toast: toast.error("Failed to remove item");
    }
  }

  function increaseItemQty(itemId: string, qty: number, variantId: string) {
    const previousQty = qty;
    const newQty = qty + 1;
    increaseQuantity(itemId, newQty);
    let data = {
      quantity: newQty,
      variantId,
    };
    if (timeRef.current) clearTimeout(timeRef.current);
    timeRef.current = setTimeout(async () => {
      try {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/update/${itemId}`,
          data,
          {
            withCredentials: true,
          }
        );
      } catch (_error) {
        increaseQuantity(itemId, previousQty);
      }
    }, 1300);
  }

  function decreaseItemQty(itemId: string, qty: number, variantId: string) {
    const previousQty = qty;
    const newQty = qty - 1;
    decreaseQuantity(itemId, newQty);
    let data = {
      quantity: newQty,
      variantId,
    };
    if (timeRef.current) clearTimeout(timeRef.current);
    timeRef.current = setTimeout(async () => {
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/cart/update/${itemId}`,
          data,
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
      } catch (_error) {
        increaseQuantity(itemId, previousQty);
      }
    }, 1300);
  }

  if (cartItems === null || cartItems === undefined) {
    return <CartShimmer />;
  }

  if (cartItems?.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <ArrowLeft className="w-6 h-6 mr-4 cursor-pointer" />
            <h1 className="text-2xl font-bold">Shopping Bag</h1>
          </div>

          <div className="flex flex-col items-center justify-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-300 mb-6" />
            <h2 className="text-2xl font-semibold mb-2">Your bag is empty</h2>
            <p className="text-gray-600 mb-6">Add items to it now.</p>
            <Button className=" px-8 py-3 rounded-lg transition-colors">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToWishlist = async (id: string) => {
    if (id) {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/wishlist`,
          {
            productId: id,
          },
          {
            withCredentials: true,
          }
        );
        toast.success(res?.data?.message);
      } catch (error) {
        toast.error("Something went wrong, try again");
      }
    }
  };

  return cartItems ? (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <ArrowLeft className="w-6 h-6 mr-4 cursor-pointer hover:text-gray-600" />
          <h1 className="text-2xl font-bold">Shopping Bag</h1>
          <span className="text-gray-600 ml-2">
            ({cartItems?.length} items)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-600 mb-6">
                  <Truck className="w-4 h-4 mr-2" />
                  <span>Get it by </span>
                  <span className="font-semibold ml-1">Mon, Jan 29</span>
                </div>

                <div className="space-y-6">
                  {cartItems.map((item: any, index) => (
                    <div
                      key={item.product.id + index}
                      className="flex gap-4 pb-6 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="w-20 h-28 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          width={100}
                          height={100}
                          src={item.product.images[0].url}
                          alt={"images"}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {item.product.brand}
                            </h3>
                            <p className="text-sm text-gray-600 mb-1">
                              {item.product.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Size: {item.variant.size}
                            </p>
                          </div>
                          <Button
                            onClick={() => removeItem(item.id)}
                            className=" p-1"
                          >
                            <X className="w-5 h-5" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-lg font-bold">
                              ₹{item.product.price}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center  justify-between mt-4">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              onClick={() => {
                                decreaseItemQty(
                                  item.id,
                                  item.quantity,
                                  item.variantId
                                );
                              }}
                              className="p-2 disabled:opacity-50 cursor-pointer"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="px-4 py-2 font-semibold">
                              {item.quantity}
                            </span>
                            <Button
                              onClick={() =>
                                increaseItemQty(
                                  item.id,
                                  item.quantity,
                                  item.variantId
                                )
                              }
                              disabled={item.quantity === item.variant.stock}
                              className="p-2  cursor-pointer"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="flex gap-4">
                            <Button
                              className="flex items-center text-sm "
                              onClick={() => handleAddToWishlist(item?.id)}
                            >
                              <Heart className="w-4 h-4 mr-1" />
                              <span className="hidden md:inline">WISHLIST</span>
                            </Button>
                            <Button
                              onClick={() => removeItem(item.id)}
                              className="text-sm   flex items-center"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              <span className="hidden md:inline">REMOVE</span>
                            </Button>
                          </div>
                        </div>

                        {!item.variant.stock && (
                          <div className="mt-3 p-3 bg-red-50 rounded-lg">
                            <p className="text-sm text-red-600">
                              <span className="font-semibold">
                                Out of Stock!
                              </span>{" "}
                              This item is currently unavailable.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <OrderSummary
            cartItems={cartItems}
            originalTotal={originalTotal!}
            discount={discount}
            total={total}
            btnName="Checkout"
          />
        </div>
      </div>
    </div>
  ) : (
    <CartShimmer />
  );
}
